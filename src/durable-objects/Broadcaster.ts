import { DurableObject } from 'cloudflare:workers'

interface BroadcastBody {
  eventType: string
  payload: unknown
}

export class Broadcaster extends DurableObject {
  private sessions: WritableStream[] = []

  constructor(state: DurableObjectState, env: Env) {
    super(state, env)
  }

  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/stream') {
      return this.startStream(request)
    }

    if (url.pathname === '/broadcast' && request.method === 'POST') {
      const { eventType, payload } = await request.json<BroadcastBody>()
      this.broadcast(eventType, payload)
      return new Response('ok')
    }

    return new Response('Not found', { status: 404 })
  }

  private startStream(request: Request): Response {
    const { readable, writable } = new TransformStream()
    this.sessions.push(writable)

    request.signal.addEventListener('abort', () => {
      this.sessions = this.sessions.filter(s => s !== writable)
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      },
    })
  }

  private broadcast(eventType: string, payload: unknown) {
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

    this.sessions = this.sessions.filter(stream => {
      try {
        const w = stream.getWriter()
        w.write(data)
        w.releaseLock()
        return true
      } catch {
        return false
      }
    })
  }
}
