import { Hono } from 'hono'

const router = new Hono<{ Bindings: Env }>()

router.get('/:resourceId/stream', c => {
  const resourceId = c.req.param('resourceId')
  const colo = c.req.raw.cf?.colo || 'default'
  const coloAwareId = `${colo}-${resourceId}`
  const id = c.env.BROADCASTER.idFromName(coloAwareId)
  const stub = c.env.BROADCASTER.get(id)

  const url = new URL(c.req.url)
  url.pathname = '/stream'
  return stub.fetch(url.toString(), c.req.raw)
})

router.post('/:resourceId/broadcast', async c => {
  const resourceId = c.req.param('resourceId')
  const colo = c.req.raw.cf?.colo || 'default'
  const coloAwareId = `${colo}-${resourceId}`
  const id = c.env.BROADCASTER.idFromName(coloAwareId)
  const stub = c.env.BROADCASTER.get(id)

  const url = new URL(c.req.url)
  url.pathname = '/broadcast'
  return stub.fetch(url.toString(), {
    method: 'POST',
    body: await c.req.raw.text(),
    headers: { 'Content-Type': 'application/json' },
  })
})

export { router as realtimeRouter }
