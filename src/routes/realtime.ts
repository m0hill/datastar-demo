import { Hono } from 'hono'

const router = new Hono<{ Bindings: Env }>()

router.get('/:resourceType/:resourceId/stream', c => {
  const { resourceType, resourceId } = c.req.param()

  switch (resourceType) {
    case 'todos': {
      const doNamespace = c.env.TODO_RESOURCE
      const id = doNamespace.idFromName(resourceId)
      const stub = doNamespace.get(id)
      const url = new URL(c.req.url)
      url.pathname = '/stream'
      return stub.fetch(url.toString(), c.req.raw)
    }
    default:
      return c.text('Resource type not found', 404)
  }
})

export { router as realtimeRouter }
