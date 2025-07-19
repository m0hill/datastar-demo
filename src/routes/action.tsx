import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { TodoItem } from '@/components/TodoItem'
import { createDB } from '@/db'
import { todos } from '@/db/schema'

const actions = new Hono<{ Bindings: Env }>()

const notifyDO = (c: any, type: string, payload: any) => {
  const doId = c.env.TODO_LIST.idFromName('global-list')
  const stub = c.env.TODO_LIST.get(doId)
  const url = new URL(c.req.url)
  url.pathname = '/broadcast'
  return stub.fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({ type, payload }),
  })
}

actions.post('/todos', async c => {
  const db = createDB(c.env)
  const { text } = await c.req.parseBody()

  if (typeof text !== 'string' || !text) {
    return c.text('Content is required', 400)
  }

  const newTodo = {
    id: randomUUID(),
    content: text,
    completed: false,
    createdAt: new Date(),
  }

  await db.insert(todos).values(newTodo)

  const html = renderToString(<TodoItem todo={newTodo} />)
  await notifyDO(c, 'new', { id: newTodo.id, html })

  return c.body(null, 204)
})

actions.post('/todos/:id/delete', async c => {
  const db = createDB(c.env)
  const id = c.req.param('id')

  await db.delete(todos).where(eq(todos.id, id))
  await notifyDO(c, 'delete', { id })

  return c.body(null, 204)
})

actions.post('/todos/:id/toggle', async c => {
  const db = createDB(c.env)
  const id = c.req.param('id')

  const currentTodo = await db.query.todos.findFirst({ where: eq(todos.id, id) })
  if (!currentTodo) return c.notFound()

  const updatedTodo = {
    ...currentTodo,
    completed: !currentTodo.completed,
  }

  await db.update(todos).set({ completed: updatedTodo.completed }).where(eq(todos.id, id))

  const html = renderToString(<TodoItem todo={updatedTodo} />)
  await notifyDO(c, 'update', { id: updatedTodo.id, html })

  return c.body(null, 204)
})

export { actions }
