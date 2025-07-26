import { Hono } from 'hono'
import { chatActions } from '@/routes/actions/Chat'
import { todoActions } from '@/routes/actions/Todo'
import { chatPages } from '@/routes/pages/Chat'
import { todoPages } from '@/routes/pages/Todo'
import { realtimeRouter } from '@/routes/realtime'

export { ChatResource } from '@/durable-objects/resources/ChatResource'
export { TodoResource } from '@/durable-objects/resources/TodoResource'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', realtimeRouter)

app.route('/', todoPages)
app.route('/', chatPages)
app.route('/api', todoActions)
app.route('/api', chatActions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
