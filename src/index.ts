import { Hono } from 'hono'
import { todoActions } from '@/actions/Todo'
import { createRealtimeRouter } from '@/lib/realtime'
import { todoPages } from '@/pages/Todo'

export { Broadcaster } from '@/durable-objects/Broadcaster'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', createRealtimeRouter('BROADCASTER'))

app.route('/', todoPages)
app.route('/api', todoActions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
