import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { ChatRoom } from '@/components/ChatRoom'
import { ds } from '@/lib/datastar'

const pages = new Hono<{ Bindings: Env }>()

pages.get('/chat', async c => {
  const Page = (
    <html>
      <head>
        <title>Real-time Chat App</title>
        <link href="/styles.css" rel="stylesheet" />
        <script
          type="module"
          src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"
        ></script>
      </head>
      <body className="bg-gray-100 font-sans">
        <div data-on-load={`@get('/rt/chat/${ds.resources.chat}/stream')`}>
          <ChatRoom messages={[]} />
        </div>
      </body>
    </html>
  )
  return c.html(renderToString(Page))
})

export { pages as chatPages }
