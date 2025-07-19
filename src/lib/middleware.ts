import { type Context } from 'hono'
import { broadcastRefresh } from '@/lib/realtime'

type MiddlewareOptions<T> = {
  resourceId: string
  fetchData: (c: Context<{ Bindings: Env }>) => Promise<T[]>
  renderComponent: (data: T[]) => React.ReactElement
}

export const createRefreshMiddleware = <T>(options: MiddlewareOptions<T>) => {
  const { resourceId, fetchData, renderComponent } = options

  return async (c: Context, next: () => Promise<void>) => {
    await next()

    if (c.res.ok) {
      const data = await fetchData(c as Context<{ Bindings: Env }>)
      const component = renderComponent(data)
      await broadcastRefresh(c as Context<{ Bindings: Env }>, resourceId, component)
    }
  }
}
