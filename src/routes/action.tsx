import { randomUUID } from 'node:crypto'
import { asc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { TodoList } from '@/components/TodoList'
import { createDB } from '@/db'
import { todos } from '@/db/schema'
import { createRefreshMiddleware } from '@/lib/middleware'

const actions = new Hono<{ Bindings: Env }>()

const todoRefreshMiddleware = createRefreshMiddleware({
  resourceId: 'todo-list-global',
  fetchData: c => {
    const db = createDB(c.env)
    return db.query.todos.findMany({ orderBy: [asc(todos.createdAt)] })
  },
  renderComponent: data => <TodoList todos={data} />,
})

actions.use('/todos/*', todoRefreshMiddleware)
actions.use('/todos', todoRefreshMiddleware)

actions.post('/todos', async c => {
  const db = createDB(c.env)
  const { text } = await c.req.parseBody()

  if (typeof text !== 'string' || !text) {
    return c.text('Content is required', 400)
  }

  await db.insert(todos).values({
    id: randomUUID(),
    content: text,
    createdAt: new Date(),
  })

  return c.body(null, 204)
})

actions.delete('/todos/:id', async c => {
  const db = createDB(c.env)
  const id = c.req.param('id')
  await db.delete(todos).where(eq(todos.id, id))
  return c.body(null, 204)
})

actions.post('/todos/:id/toggle', async c => {
  const db = createDB(c.env)
  const id = c.req.param('id')
  const currentTodo = await db.query.todos.findFirst({ where: eq(todos.id, id) })
  if (!currentTodo) return c.notFound()

  await db.update(todos).set({ completed: !currentTodo.completed }).where(eq(todos.id, id))
  return c.body(null, 204)
})

actions.post('/todos/toggle-all', async c => {
  const db = createDB(c.env)
  const allTodos = await db.select().from(todos).all()
  if (allTodos.length === 0) return c.body(null, 204)

  const allCompleted = allTodos.every(todo => todo.completed)
  await db.update(todos).set({ completed: !allCompleted })
  return c.body(null, 204)
})

actions.delete('/todos/completed', async c => {
  const db = createDB(c.env)
  await db.delete(todos).where(eq(todos.completed, true))
  return c.body(null, 204)
})

actions.delete('/todos', async c => {
  const db = createDB(c.env)
  await db.delete(todos)
  return c.body(null, 204)
})

export { actions }
