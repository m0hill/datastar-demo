import { DurableObject } from 'cloudflare:workers'

interface BroadcastBody {
  eventType: string
  payload: unknown
}

export class Broadcaster extends DurableObject {
  private sessions = new Map<string, WritableStream>()

  constructor(state: DurableObjectState, env: Env) {
    super(state, env)
  }

  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/stream') {
      return this.startStream(request)
    }

    if (url.pathname === '/broadcast' && request.method === 'POST') {
      try {
        const { eventType, payload } = await request.json<BroadcastBody>()
        this.broadcast(eventType, payload)
        return new Response('ok')
      } catch (error) {
        console.error('Failed to parse broadcast request:', error)
        return new Response('Invalid JSON', { status: 400 })
      }
    }

    return new Response('Not found', { status: 404 })
  }

  private startStream(request: Request): Response {
    const { readable, writable } = new TransformStream()
    const sessionId = crypto.randomUUID()

    this.sessions.set(sessionId, writable)

    request.signal.addEventListener('abort', () => {
      this.sessions.delete(sessionId)
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  private broadcast(eventType: string, payload: unknown) {
    if (!eventType || payload === undefined) {
      console.warn('Invalid broadcast parameters')
      return
    }

    let message = ''

    if (eventType === 'datastar-patch-elements') {
      const htmlPayload = payload as { html: string }
      if (htmlPayload?.html) {
        let dataLines = ''
        for (const line of htmlPayload.html.split('\n')) {
          dataLines += `data: elements ${line}\n`
        }
        message = `event: ${eventType}\n${dataLines}\n`
      }
    } else {
      const json = JSON.stringify(payload)
      message = `event: ${eventType}\ndata: ${json}\n\n`
    }

    if (!message) return

    const data = new TextEncoder().encode(message)
    const failedSessions: string[] = []

    for (const [sessionId, stream] of this.sessions.entries()) {
      try {
        const writer = stream.getWriter()
        writer.write(data)
        writer.releaseLock()
      } catch (error) {
        console.error(`Failed to write to session ${sessionId}:`, error)
        failedSessions.push(sessionId)
      }
    }

    for (const sessionId of failedSessions) {
      this.sessions.delete(sessionId)
    }
  }
}
