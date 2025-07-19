import { Hono } from 'hono'

const sse = new Hono<{ Bindings: Env }>()

sse.get('/stream', c => {
  const doId = c.env.TODO_LIST.idFromName('global-list')
  const stub = c.env.TODO_LIST.get(doId)

  const url = new URL(c.req.url)
  url.pathname = '/stream'

  return stub.fetch(url.toString(), c.req.raw)
})

export { sse }
