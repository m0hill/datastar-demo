import { DurableObject } from 'cloudflare:workers'

export class TodoList extends DurableObject {
  private sessions: WritableStream[] = []

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
  }

  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.endsWith('/stream')) {
      return this.handleSSEConnection(request)
    }

    if (url.pathname.endsWith('/broadcast') && request.method === 'POST') {
      const { type, payload } = await request.json<any>()
      this.broadcastUpdate(type, payload)
      return new Response('Broadcast successful', { status: 200 })
    }

    return new Response('Not found', { status: 404 })
  }

  private handleSSEConnection(request: Request): Response {
    const { readable, writable } = new TransformStream()
    this.sessions.push(writable)

    request.signal.addEventListener('abort', () => {
      this.sessions = this.sessions.filter(stream => stream !== writable)
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  }

  private formatSseMessage(eventType: string, dataLines: string[]): Uint8Array {
    let message = `event: ${eventType}\n`
    for (const line of dataLines) {
      message += `${line}\n`
    }
    message += '\n'
    return new TextEncoder().encode(message)
  }

  private broadcastUpdate(
    type: 'new' | 'update' | 'delete',
    payload: { id: string; html?: string }
  ) {
    const eventType = 'datastar-patch-elements'
    const dataLines: string[] = []

    switch (type) {
      case 'new':
        dataLines.push('data: mode append')
        dataLines.push('data: selector #todo-list')
        payload.html!.split('\n').forEach(line => {
          if (line.trim()) dataLines.push(`data: elements ${line}`)
        })
        break
      case 'update':
        dataLines.push('data: mode morph')
        dataLines.push(`data: selector #todo-${payload.id}`)
        payload.html!.split('\n').forEach(line => {
          if (line.trim()) dataLines.push(`data: elements ${line}`)
        })
        break
      case 'delete':
        dataLines.push('data: mode remove')
        dataLines.push(`data: selector #todo-${payload.id}`)
        break
    }

    if (dataLines.length === 0) {
      return
    }

    const event = this.formatSseMessage(eventType, dataLines)

    this.sessions = this.sessions.filter(stream => {
      try {
        const writer = stream.getWriter()
        writer.write(event)
        writer.releaseLock()
        return true
      } catch (e) {
        console.error('Failed to write to a closed stream:', e)
        return false
      }
    })
  }
}
