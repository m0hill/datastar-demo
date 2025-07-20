import { Hono } from 'hono'
import { actions as todoActions } from '@/actions/Todo'
import { createRealtimeRouter } from '@/lib/realtime'
import { pages as todoPages } from '@/pages/Todo'

export { Broadcaster } from '@/durable-objects/Broadcaster'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', createRealtimeRouter())

app.route('/', todoPages)
app.route('/api', todoActions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
