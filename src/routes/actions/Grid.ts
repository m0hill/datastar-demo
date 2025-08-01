import { type Context, Hono } from 'hono'
import { ds } from '@/lib/datastar'

const actions = new Hono<{ Bindings: Env }>()

const getGridStub = (c: Context<{ Bindings: Env }>) => {
  const id = c.env.GRID_RESOURCE.idFromName(ds.resources.grid)
  return c.env.GRID_RESOURCE.get(id)
}

actions.post('/grid/check', async c => {
  const { chunkId, cellIndex } = await c.req.json<{ chunkId: number; cellIndex: number }>()
  const stub = getGridStub(c)
  c.executionCtx.waitUntil(stub.toggleCell(chunkId, cellIndex))
  return c.newResponse(null, 204)
})

actions.post('/grid/viewport', async c => {
  const stub = getGridStub(c)
  const url = new URL(c.req.url)
  url.pathname = '/viewport'
  const doRequest = new Request(url, c.req.raw)
  return stub.fetch(doRequest)
})

export { actions as gridActions }
