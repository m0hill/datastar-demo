import { Hono } from 'hono'
import { actions } from './routes/action'
import { pages } from './routes/pages'
import { sse } from './routes/sse'

export { TodoList } from './durable-objects/TodoList'

const app = new Hono<{ Bindings: Env }>()

app.route('/', pages)
app.route('/', sse)
app.route('/api', actions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
