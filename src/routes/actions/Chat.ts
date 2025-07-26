import { Hono } from 'hono'
import { ds } from '@/lib/datastar'

const actions = new Hono<{ Bindings: Env }>()

const getChatStub = (c: any) => {
  const id = c.env.CHAT_RESOURCE.idFromName(ds.resources.chat)
  return c.env.CHAT_RESOURCE.get(id)
}

actions.post('/chat/messages', async c => {
  const body = await c.req.parseBody()
  const stub = getChatStub(c)
  await stub.addMessage(body['username'] as string, body['content'] as string)
  return c.newResponse(null, 204)
})

export { actions as chatActions }
