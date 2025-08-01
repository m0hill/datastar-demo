import { type Context, Hono } from 'hono'
import { ds } from '@/lib/datastar'

const actions = new Hono<{ Bindings: Env }>()

const getTodoStub = (c: Context<{ Bindings: Env }>) => {
  const id = c.env.TODO_RESOURCE.idFromName(ds.resources.todos)
  return c.env.TODO_RESOURCE.get(id)
}

actions.post('/todos', async c => {
  const body = await c.req.parseBody()
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.addTodo(body['text'] as string))
  return c.newResponse(null, 204)
})

actions.post('/todos/:id/update', async c => {
  const { id } = c.req.param()
  const body = await c.req.parseBody()
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.updateTodo(id, body['content'] as string))
  return c.newResponse(null, 204)
})

actions.post('/todos/:id/toggle', async c => {
  const { id } = c.req.param()
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.toggleTodo(id))
  return c.newResponse(null, 204)
})

actions.post('/todos/toggle-all', async c => {
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.toggleAllTodos())
  return c.newResponse(null, 204)
})

actions.delete('/todos/completed', async c => {
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.deleteCompletedTodos())
  return c.newResponse(null, 204)
})

actions.delete('/todos', async c => {
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.deleteAllTodos())
  return c.newResponse(null, 204)
})

actions.delete('/todos/:id', async c => {
  const { id } = c.req.param()
  const stub = getTodoStub(c)
  c.executionCtx.waitUntil(stub.deleteTodo(id))
  return c.newResponse(null, 204)
})

export { actions as todoActions }
