import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { renderToReadableStream } from 'react-dom/server'
import { ChatForm } from './components/chat/form'
import { MessageList } from './components/chat/list'
import { ConversationSidebar } from './components/chat/sidebar'
import { Layout } from './components/layout'
import { db } from './db'
import { conversations, messages } from './db/schema'
import { messagesRouter } from './routes/messages'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './' }))

app.route('/messages', messagesRouter)

app.get('/', async c => {
  // Get conversation ID from query parameter or use default
  const conversationId = c.req.query('conversation') || 'default-conversation'

  let conversation = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .get()

  if (!conversation) {
    ;[conversation] = await db
      .insert(conversations)
      .values({
        id: conversationId,
        title:
          conversationId === 'default-conversation'
            ? 'Chat Conversation'
            : `Chat ${new Date().toLocaleDateString()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
  }

  const allMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt)
    .all()

  // Get all conversations for sidebar
  const allConversations = await db
    .select()
    .from(conversations)
    .orderBy(desc(conversations.updatedAt))
    .all()

  const stream = await renderToReadableStream(
    <Layout conversationId={conversationId}>
      <div className="flex gap-6 h-screen">
        <div className="w-80 flex-shrink-0 py-4">
          <ConversationSidebar
            conversations={allConversations}
            currentConversationId={conversationId}
          />
        </div>
        <div className="flex-1 flex flex-col py-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">AI Chat</h1>
          <div className="flex-1 flex flex-col">
            <MessageList messages={allMessages} />
            <div className="mt-4">
              <ChatForm conversationId={conversationId} />
            </div>
          </div>
        </div>
      </div>
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
