import { type Context } from 'hono'
import { renderToString } from 'react-dom/server'

type MiddlewareOptions<T> = {
  resourceId: string
  fetchData: (c: Context<{ Bindings: Env }>) => Promise<T[]>
  renderComponent: (data: T[]) => React.ReactElement
}

const broadcastRefresh = async (
  c: Context<{ Bindings: Env }>,
  resourceId: string,
  component: React.ReactElement
) => {
  const componentHtml = renderToString(component)

  const colo = c.req.raw.cf?.colo || 'default'
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

export const createRefreshMiddleware = <T>(options: MiddlewareOptions<T>) => {
  const { resourceId, fetchData, renderComponent } = options

  return async (c: Context, next: () => Promise<void>) => {
    await next()

    if (c.res.ok) {
      c.executionCtx.waitUntil(
        (async () => {
          const data = await fetchData(c)
          const component = renderComponent(data)
          await broadcastRefresh(c, resourceId, component)
        })()
      )
    }
  }
}
