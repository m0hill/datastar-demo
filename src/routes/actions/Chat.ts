import { type Context, Hono } from 'hono'
import { ds } from '@/lib/datastar'

const actions = new Hono<{ Bindings: Env }>()

const getChatStub = (c: Context<{ Bindings: Env }>) => {
  const id = c.env.CHAT_RESOURCE.idFromName(ds.resources.chat)
  return c.env.CHAT_RESOURCE.get(id)
}

actions.post('/chat/messages', async c => {
  const body = await c.req.parseBody()
  const stub = getChatStub(c)
  c.executionCtx.waitUntil(stub.addMessage(body['username'] as string, body['content'] as string))
  return c.newResponse(null, 204)
})

export { actions as chatActions }
