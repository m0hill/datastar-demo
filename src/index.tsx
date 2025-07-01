import { createHash } from 'node:crypto'
import { ServerSentEventGenerator } from 'datastar-sdk/web'
import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { bus } from './bus'
import { db } from './db'
import { memos } from './db/schema'

type Memo = typeof memos.$inferSelect

const app = new Hono()

const Layout: FC = props => (
  <html>
    <head>
      <title>Memo App</title>
      <script src="https://cdn.tailwindcss.com" />
      <script
        type="module"
        src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.0-beta.11/bundles/datastar.js"
      />
    </head>
    <body class="bg-gray-100 flex justify-center py-10 font-sans">
      <div class="max-w-2xl w-full">
        <div data-on-load="@get('/memos/stream')" />
        {props.children}
      </div>
    </body>
  </html>
)

const MemoForm: FC = () => (
  <form
    class="mb-6 bg-white p-4 rounded-lg shadow"
    data-on-submit="@post('/memos', { contentType: 'form' })"
    data-on-end="$refs.newMemo.value = ''"
    data-indicator="isAdding"
  >
    <textarea
      name="content"
      ref="newMemo"
      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Write a new memo..."
      rows={3}
    />
    <button
      type="submit"
      class="mt-3 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
      data-attr-disabled="$isAdding"
    >
      <span data-show="!$isAdding">Add Memo</span>
      <span data-show="$isAdding">Adding...</span>
    </button>
  </form>
)

const MemoItem: FC<{ memo: Memo }> = ({ memo }) => (
  <div
    id={`memo-${memo.id}`}
    class="bg-white p-4 rounded-lg shadow-sm mb-3 flex justify-between items-start"
  >
    <p class="text-gray-800 break-words whitespace-pre-wrap flex-1">{memo.content}</p>
    <div class="text-right ml-4">
      <div class="text-xs text-gray-400">{new Date(memo.createdAt).toLocaleString()}</div>
      <button
        class="text-red-500 hover:text-red-700 hover:underline text-sm font-medium mt-1"
        data-on-click={`@post('/memos/delete/${memo.id}')`}
      >
        Delete
      </button>
    </div>
  </div>
)

const MemoList: FC<{ memos: Memo[] }> = ({ memos }) => (
  <div id="memo-list">
    {memos.length > 0 ? (
      memos.map(memo => <MemoItem memo={memo} />)
    ) : (
      <p class="text-center text-gray-500 py-4">No memos yet. Add one above!</p>
    )}
  </div>
)

app.get('/memos/stream', c => {
  let off: (() => void) | undefined
  let lastHash = c.req.header('Last-Event-ID')

  return ServerSentEventGenerator.stream(
    async stream => {
      const push = async () => {
        const all = await db.select().from(memos).orderBy(desc(memos.createdAt)).all()
        const html = (<MemoList memos={all} />).toString()
        const newHash = createHash('sha256').update(html).digest('hex')

        if (newHash !== lastHash) {
          stream.mergeFragments(html, {
            selector: '#memo-list',
            mergeMode: 'inner',
            eventId: newHash,
          })
          lastHash = newHash
        }
      }

      await push()

      const handler = () => void push().catch()
      bus.on('memos:changed', handler)
      off = () => bus.off('memos:changed', handler)
    },
    {
      keepalive: true,
      onAbort: () => off?.(),
    }
  )
})

app.get('/', async c => {
  const allMemos = await db.select().from(memos).orderBy(desc(memos.createdAt)).all()

  return c.html(
    <Layout>
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Memo App</h1>
      <MemoForm />
      <MemoList memos={allMemos} />
    </Layout>
  )
})

app.post('/memos', async c => {
  const { content } = await c.req.parseBody()

  if (typeof content === 'string' && content.trim()) {
    await db.insert(memos).values({ content: content.trim() })

    bus.emit('memos:changed')
    return c.body(null, 204)
  }

  return c.body(null, 400)
})

app.post('/memos/delete/:id', async c => {
  const id = Number.parseInt(c.req.param('id'), 10)
  await db.delete(memos).where(eq(memos.id, id))

  bus.emit('memos:changed')
  return c.body(null, 204)
})

export default app
