import { createHash } from 'node:crypto'
import { ServerSentEventGenerator } from 'datastar-sdk/web'
import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { NOTIFY_CHANGE_EVENT, refreshBus } from '../bus'
import { MemoList } from '../components/memo/list'
import { db } from '../db'
import { memos } from '../db/schema'

export const memosRouter = new Hono()

memosRouter.get('/stream', c => {
  let off: (() => void) | undefined
  let lastHash = c.req.header('Last-Event-ID')

  return ServerSentEventGenerator.stream(
    async stream => {
      const push = async () => {
        const all = await db.select().from(memos).orderBy(desc(memos.createdAt)).all()
        const html = renderToString(<MemoList memos={all} />)
        const newHash = createHash('sha256').update(html).digest('hex')

        if (newHash !== lastHash) {
          stream.mergeFragments(html, {
            selector: '#memo-list',
            mergeMode: 'morph',
            eventId: newHash,
          })
          lastHash = newHash
        }
      }

      await push()

      const handler = () => void push().catch()
      refreshBus.on(NOTIFY_CHANGE_EVENT, handler)
      off = () => refreshBus.off(NOTIFY_CHANGE_EVENT, handler)
    },
    {
      keepalive: true,
      onAbort: () => off?.(),
    }
  )
})

memosRouter.post('/', async c => {
  const { content } = await c.req.parseBody()

  if (typeof content === 'string' && content.trim()) {
    await db.writeTransaction(async tx => {
      return tx.insert(memos).values({ content: content.trim() })
    })

    return c.body(null, 204)
  }

  return c.body(null, 400)
})

memosRouter.post('/delete/:id', async c => {
  const id = Number.parseInt(c.req.param('id'), 10)

  await db.writeTransaction(async tx => {
    return tx.delete(memos).where(eq(memos.id, id))
  })

  return c.body(null, 204)
})
