import { desc } from 'drizzle-orm'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { renderToReadableStream } from 'react-dom/server'
import { Layout } from './components/layout'
import { MemoForm } from './components/memo/form'
import { MemoList } from './components/memo/list'
import { db } from './db'
import { memos } from './db/schema'
import { memosRouter } from './routes/memos'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './' }))

app.route('/memos', memosRouter)

app.get('/', async _c => {
  const allMemos = await db.select().from(memos).orderBy(desc(memos.createdAt)).all()

  const stream = await renderToReadableStream(
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Memo App</h1>
      <MemoForm />
      <MemoList memos={allMemos} />
    </Layout>
  )

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' },
  })
})

export default {
  port: 3000,
  idleTimeout: 255,
  fetch: app.fetch,
}
