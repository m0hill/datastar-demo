import { Hono } from 'hono'
import { todoActions } from '@/routes/actions/Todo'
import { todoPages } from '@/routes/pages/Todo'
import { realtimeRouter } from '@/routes/realtime'

export { Broadcaster } from '@/durable-objects/Broadcaster'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', realtimeRouter)

app.route('/', todoPages)
app.route('/api', todoActions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
