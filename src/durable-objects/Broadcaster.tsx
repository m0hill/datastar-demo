import { DurableObject } from 'cloudflare:workers'
import { eq, not } from 'drizzle-orm'

import { DrizzleSqliteDODatabase, drizzle as drizzleDO } from 'drizzle-orm/durable-sqlite'
import { migrate as migrateDO } from 'drizzle-orm/durable-sqlite/migrator'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { TodoList } from '@/components/TodoList'
import * as schema from '@/db/schema'
import { todos } from '@/db/schema'
import migrations from '../../migrations/migrations.js'

interface PatchElementsPayload {
  elements: string
  selector?: string
  mode?: 'outer' | 'inner' | 'replace' | 'prepend' | 'append' | 'before' | 'after' | 'remove'
  useViewTransition?: boolean
  eventId?: string
  retryDuration?: number
}

export class Broadcaster extends DurableObject {
  private sessions = new Map<string, WritableStream>()
  private db: DrizzleSqliteDODatabase<typeof schema>

  constructor(
    public override ctx: DurableObjectState,
    env: Env
  ) {
    super(ctx, env)

    this.db = drizzleDO(this.ctx.storage, { schema, logger: true })

    this.ctx.blockConcurrencyWhile(async () => {
      await migrateDO(this.db, migrations)
    })
  }

  async addTodo(content: string) {
    if (typeof content !== 'string' || content.trim() === '') {
      throw new Error('Invalid todo content')
    }
    await this.db.insert(todos).values({
      id: crypto.randomUUID(),
      content: content,
      createdAt: new Date(),
    })
    await this.broadcastFullState()
  }

  async toggleTodo(id: string) {
    await this.db
      .update(todos)
      .set({ completed: not(todos.completed) })
      .where(eq(todos.id, id))
    await this.broadcastFullState()
  }

  async updateTodo(id: string, content: string) {
    if (typeof content !== 'string' || content.trim() === '') {
      throw new Error('Invalid todo content')
    }
    await this.db.update(todos).set({ content }).where(eq(todos.id, id))
    await this.broadcastFullState()
  }

  async deleteTodo(id: string) {
    await this.db.delete(todos).where(eq(todos.id, id))
    await this.broadcastFullState()
  }

  async deleteAllTodos() {
    await this.db.delete(todos)
    await this.broadcastFullState()
  }

  async deleteCompletedTodos() {
    await this.db.delete(todos).where(eq(todos.completed, true))
    await this.broadcastFullState()
  }

  async toggleAllTodos() {
    const allTodos = await this.db.select({ completed: todos.completed }).from(todos)
    const allCompleted = allTodos.length > 0 && allTodos.every(t => t.completed)
    await this.db.update(todos).set({ completed: !allCompleted })
    await this.broadcastFullState()
  }

  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/stream') {
      return this.startStream(request)
    }
    return new Response('Not Found', { status: 404 })
  }

  private async broadcastFullState() {
    const allTodos = await this.db.query.todos.findMany({
      orderBy: (todos, { asc }) => [asc(todos.createdAt)],
    })
    const componentHtml = renderToString(<TodoList todos={allTodos} />)

    this.broadcast('datastar-patch-elements', {
      elements: componentHtml,
      mode: 'outer',
      selector: '#todo-app',
    })
  }

  private startStream(request: Request): Response {
    const { readable, writable } = new TransformStream()
    const sessionId = crypto.randomUUID()

    this.sessions.set(sessionId, writable)

    request.signal.addEventListener('abort', () => {
      this.sessions.delete(sessionId)
    })

    this.ctx.waitUntil(
      (async () => {
        const allTodos = await this.db.query.todos.findMany({
          orderBy: (todos, { asc }) => [asc(todos.createdAt)],
        })
        const componentHtml = renderToString(<TodoList todos={allTodos} />)

        const payload = {
          elements: componentHtml,
          mode: 'outer',
          selector: '#todo-app',
        }

        const message = this.createSseMessage('datastar-patch-elements', payload)
        if (message) {
          const writer = writable.getWriter()
          await writer.write(new TextEncoder().encode(message))
          writer.releaseLock()
        }
      })()
    )

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  private createSseMessage(eventType: string, payload: unknown): string | null {
    if (!eventType || payload === undefined) {
      console.warn('Invalid broadcast parameters')
      return null
    }

    if (eventType === 'datastar-patch-elements') {
      const patchPayload = payload as PatchElementsPayload
      if (typeof patchPayload.elements !== 'string') return null

      const dataLines: string[] = []
      if (patchPayload.selector) dataLines.push(`data: selector ${patchPayload.selector}`)
      if (patchPayload.mode) dataLines.push(`data: mode ${patchPayload.mode}`)
      if (patchPayload.useViewTransition) dataLines.push(`data: useViewTransition true`)

      for (const line of patchPayload.elements.split('\n')) {
        dataLines.push(`data: elements ${line}`)
      }

      const eventIdLine = patchPayload.eventId ? `id: ${patchPayload.eventId}\n` : ''
      const retryLine = patchPayload.retryDuration ? `retry: ${patchPayload.retryDuration}\n` : ''

      return `event: ${eventType}\n${eventIdLine}${retryLine}${dataLines.join('\n')}\n\n`
    } else {
      const json = JSON.stringify(payload)
      return `event: ${eventType}\ndata: ${json}\n\n`
    }
  }

  private broadcast(eventType: string, payload: unknown) {
    const message = this.createSseMessage(eventType, payload)
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
