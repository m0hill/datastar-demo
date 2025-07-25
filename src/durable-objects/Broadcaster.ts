import { DurableObject } from 'cloudflare:workers'

interface PatchElementsPayload {
  elements: string
  selector?: string
  mode?: 'outer' | 'inner' | 'replace' | 'prepend' | 'append' | 'before' | 'after' | 'remove'
  useViewTransition?: boolean
  eventId?: string
  retryDuration?: number
}

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
      const patchPayload = payload as PatchElementsPayload
      if (typeof patchPayload.elements !== 'string') return

      const dataLines: string[] = []
      if (patchPayload.selector) dataLines.push(`data: selector ${patchPayload.selector}`)
      if (patchPayload.mode) dataLines.push(`data: mode ${patchPayload.mode}`)
      if (patchPayload.useViewTransition) dataLines.push(`data: useViewTransition true`)

      for (const line of patchPayload.elements.split('\n')) {
        dataLines.push(`data: elements ${line}`)
      }

      const eventIdLine = patchPayload.eventId ? `id: ${patchPayload.eventId}\n` : ''
      const retryLine = patchPayload.retryDuration ? `retry: ${patchPayload.retryDuration}\n` : ''

      message = `event: ${eventType}\n${eventIdLine}${retryLine}${dataLines.join('\n')}\n\n`
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
