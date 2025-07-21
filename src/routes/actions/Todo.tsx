import { eq, not } from 'drizzle-orm'
import { Hono } from 'hono'
import { TodoList } from '@/components/TodoList'
import { createDB } from '@/db'
import { todos } from '@/db/schema'
import { ds } from '@/lib/datastar'
import { createRefreshMiddleware } from '@/lib/middleware'

const actions = new Hono<{ Bindings: Env }>()

const refreshMiddleware = createRefreshMiddleware({
  resourceId: ds.resources.todos,
  fetchData: async c => {
    const db = createDB(c.env)
    return db.select().from(todos).orderBy(todos.createdAt).all()
  },
  renderComponent: allTodos => <TodoList todos={allTodos} />,
})

actions.use('*', refreshMiddleware)

actions.post('/todos', async c => {
  const db = createDB(c.env)
  const body = await c.req.parseBody()
  const content = body['text']

  if (typeof content !== 'string' || content.trim() === '') {
    return c.text('Invalid todo content', 400)
  }

  await db.insert(todos).values({
    id: crypto.randomUUID(),
    content: content,
    createdAt: new Date(),
  })
  return c.newResponse(null, 204)
})

actions.post('/todos/:id/toggle', async c => {
  const id = c.req.param('id')
  const db = createDB(c.env)
  await db
    .update(todos)
    .set({ completed: not(todos.completed) })
    .where(eq(todos.id, id))
  return c.newResponse(null, 204)
})

actions.post('/todos/toggle-all', async c => {
  const db = createDB(c.env)
  const allTodos = await db.select({ completed: todos.completed }).from(todos)
  const allCompleted = allTodos.length > 0 && allTodos.every(t => t.completed)
  await db.update(todos).set({ completed: !allCompleted })
  return c.newResponse(null, 204)
})

actions.delete('/todos/completed', async c => {
  const db = createDB(c.env)
  await db.delete(todos).where(eq(todos.completed, true))
  return c.newResponse(null, 204)
})

actions.delete('/todos', async c => {
  const db = createDB(c.env)
  await db.delete(todos)
  return c.newResponse(null, 204)
})

actions.delete('/todos/:id', async c => {
  const id = c.req.param('id')
  const db = createDB(c.env)
  await db.delete(todos).where(eq(todos.id, id))
  return c.newResponse(null, 204)
})

export { actions as todoActions }
