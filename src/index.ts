import { Hono } from 'hono'
import { chatActions } from '@/routes/actions/Chat'
import { gridActions } from '@/routes/actions/Grid'
import { todoActions } from '@/routes/actions/Todo'
import { chatPages } from '@/routes/pages/Chat'
import { gridPages } from '@/routes/pages/Grid'
import { todoPages } from '@/routes/pages/Todo'
import { realtimeRouter } from '@/routes/realtime'

export { ChatResource } from '@/routes/resources/Chat'
export { GridResource } from '@/routes/resources/Grid'
export { TodoResource } from '@/routes/resources/Todo'

const app = new Hono<{ Bindings: Env }>()

app.route('/rt', realtimeRouter)

app.route('/grid', gridPages)
app.route('/', todoPages)
app.route('/', chatPages)
app.route('/api', todoActions)
app.route('/api', gridActions)
app.route('/api', chatActions)

app.get('/*', async c => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
