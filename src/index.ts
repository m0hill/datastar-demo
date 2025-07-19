import { Hono } from 'hono'
import { actions } from '@/actions/Todo'
import { createRealtimeRouter } from '@/lib/realtime'
import { pages } from '@/pages/Todo'

export { Broadcaster } from '@/durable-objects/Broadcaster'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', createRealtimeRouter('BROADCASTER'))

app.route('/', pages)
app.route('/api', actions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
