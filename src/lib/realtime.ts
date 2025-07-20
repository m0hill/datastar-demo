import { type Context, Hono } from 'hono'
import { renderToString } from 'react-dom/server'

export const createRealtimeRouter = (bindingKey: keyof Env) => {
  const router = new Hono<{ Bindings: Env }>()

  router.get('/:resourceId/stream', c => {
    const ns = c.env[bindingKey] as unknown as DurableObjectNamespace
    const resourceId = c.req.param('resourceId')
    const colo = (c.req.raw.cf as any)?.colo || 'default'
    const coloAwareId = `${colo}-${resourceId}`
    const id = ns.idFromName(coloAwareId)
    const stub = ns.get(id)

    const url = new URL(c.req.url)
    url.pathname = '/stream'
    return stub.fetch(url.toString(), c.req.raw)
  })

  router.post('/:resourceId/broadcast', async c => {
    const ns = c.env[bindingKey] as unknown as DurableObjectNamespace
    const resourceId = c.req.param('resourceId')
    const colo = (c.req.raw.cf as any)?.colo || 'default'
    const coloAwareId = `${colo}-${resourceId}`
    const id = ns.idFromName(coloAwareId)
    const stub = ns.get(id)

    const url = new URL(c.req.url)
    url.pathname = '/broadcast'
    return stub.fetch(url.toString(), {
      method: 'POST',
      body: await c.req.raw.text(),
      headers: { 'Content-Type': 'application/json' },
    })
  })

  return router
}

export const broadcastRefresh = async (
  c: Context<{ Bindings: Env }>,
  resourceId: string,
  component: React.ReactElement
) => {
  const componentHtml = renderToString(component)

  const colo = (c.req.raw.cf as any)?.colo || 'default'
  const coloAwareId = `${colo}-${resourceId}`
  const doId = c.env.BROADCASTER.idFromName(coloAwareId)
  const stub = c.env.BROADCASTER.get(doId)

  const url = new URL(c.req.url)
  url.pathname = '/broadcast'

  return stub.fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({
      eventType: 'datastar-patch-elements',
      payload: { html: componentHtml },
    }),
  })
}
