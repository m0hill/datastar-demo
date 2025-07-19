import { Hono } from 'hono'
import { createRealtimeRouter } from '@/lib/realtime'
import { actions } from '@/routes/action'
import { pages } from '@/routes/pages'

export { Broadcaster } from '@/durable-objects/Broadcaster'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', createRealtimeRouter('BROADCASTER'))

app.route('/', pages)
app.route('/api', actions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
