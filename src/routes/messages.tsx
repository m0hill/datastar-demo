import { createHash } from 'node:crypto'
import { google } from '@ai-sdk/google'
import { convertToModelMessages, streamText } from 'ai'
import { ServerSentEventGenerator } from 'datastar-sdk/web'
import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { type ChangePayload, NOTIFY_CHANGE_EVENT, notifyChanges, refreshBus } from '../bus'
import { MessageItem } from '../components/chat/item'
import { MessageList } from '../components/chat/list'
import { db } from '../db'
import { conversations, type Message, messages } from '../db/schema'

// Helper function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Helper function to get or create default conversation
async function getOrCreateDefaultConversation(): Promise<string> {
  const conversationId = 'default-conversation'

  // Check if conversation exists
  const existing = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .get()

  if (!existing) {
    await db.insert(conversations).values({
      id: conversationId,
      title: 'Chat Conversation',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return conversationId
}

export const messagesRouter = new Hono()

// Route to create a new conversation
messagesRouter.get('/conversations/new', async c => {
  const conversationId = generateId()
  const title = `Chat ${new Date().toLocaleDateString()}`

  const [conversation] = await db
    .insert(conversations)
    .values({
      id: conversationId,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()

  if (!conversation) {
    return c.body('Failed to create conversation', 500)
  }

  notifyChanges({ type: 'conversation.created', data: conversation })

  // Redirect to the new conversation
  return c.redirect(`/?conversation=${conversationId}`)
})

// Route to get all conversations
messagesRouter.get('/conversations', async c => {
  const allConversations = await db
    .select()
    .from(conversations)
    .orderBy(desc(conversations.updatedAt))
    .all()

  return c.json(allConversations)
})

messagesRouter.get('/stream/:conversationId', c => {
  let off: (() => void) | undefined
  const conversationId = c.req.param('conversationId')

  return ServerSentEventGenerator.stream(
    async stream => {
      const all = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(messages.createdAt)
        .all()

      const html = renderToString(<MessageList messages={all} />)
      const newHash = createHash('sha256').update(html).digest('hex')
      stream.mergeFragments(html, {
        selector: '#message-list',
        mergeMode: 'morph',
        eventId: newHash,
      })

      const handler = (payload: ChangePayload) => {
        switch (payload.type) {
          case 'message.created': {
            if (payload.data.conversationId === conversationId) {
              const newMessageHtml = renderToString(<MessageItem message={payload.data} />)
              stream.mergeFragments(newMessageHtml, {
                selector: '#message-list',
                mergeMode: 'append',
              })
            }
            break
          }
          case 'message.deleted': {
            stream.removeFragments(`#message-${payload.data.id}`)
            break
          }
          case 'message.updated': {
            if (payload.data.conversationId === conversationId) {
              const updatedMessageHtml = renderToString(<MessageItem message={payload.data} />)
              stream.mergeFragments(updatedMessageHtml, {
                selector: `#message-${payload.data.id}`,
                mergeMode: 'morph',
              })
            }
            break
          }
        }
      }

      refreshBus.on(NOTIFY_CHANGE_EVENT, handler)
      off = () => refreshBus.off(NOTIFY_CHANGE_EVENT, handler)
    },
    {
      keepalive: true,
      onAbort: () => off?.(),
    }
  )
})

messagesRouter.post('/', async c => {
  const body = await c.req.parseBody()
  const userMessage = body.content
  const providedConversationId = body.conversationId

  if (typeof userMessage !== 'string' || !userMessage.trim()) {
    return c.body(null, 400)
  }

  // Get or create conversation
  const conversationId =
    (typeof providedConversationId === 'string' && providedConversationId) ||
    (await getOrCreateDefaultConversation())

  // Get conversation history for context
  const conversationHistory = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt)
    .all()

  // Create user message
  const userMsgId = generateId()
  const [userMsg] = await db
    .insert(messages)
    .values({
      id: userMsgId,
      conversationId,
      role: 'user',
      content: userMessage.trim(),
      createdAt: new Date(),
    })
    .returning()

  if (!userMsg) {
    return c.body('Failed to create user message', 500)
  }

  notifyChanges({ type: 'message.created', data: userMsg })

  // Create assistant message with placeholder
  const assistantMsgId = generateId()
  const [assistantMsg] = await db
    .insert(messages)
    .values({
      id: assistantMsgId,
      conversationId,
      role: 'assistant',
      content: '...',
      createdAt: new Date(),
    })
    .returning()

  if (!assistantMsg) {
    return c.body('Failed to create assistant message', 500)
  }

  notifyChanges({ type: 'message.created', data: assistantMsg })

  // Convert conversation history to model messages format
  const allMessages = [...conversationHistory, userMsg]
  const modelMessages = convertToModelMessages(
    allMessages.map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      parts: [{ type: 'text' as const, text: msg.content }],
      createdAt: msg.createdAt,
    }))
  )

  // Stream AI response with conversation context
  const result = streamText({
    model: google('gemini-2.0-flash'),
    messages: modelMessages,
    system: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses.',
  })

  let finalContent = ''
  for await (const textPart of result.textStream) {
    finalContent += textPart
    const updatedMessage: Message = {
      ...assistantMsg,
      content: finalContent,
    }
    await db.update(messages).set({ content: finalContent }).where(eq(messages.id, assistantMsg.id))
    notifyChanges({ type: 'message.updated', data: updatedMessage })
  }

  // Update conversation timestamp
  await db
    .update(conversations)
    .set({ updatedAt: new Date() })
    .where(eq(conversations.id, conversationId))

  return c.body(null, 204)
})

messagesRouter.post('/delete/:id', async c => {
  const id = c.req.param('id')

  await db.writeTransaction(
    async tx => {
      return tx.delete(messages).where(eq(messages.id, id))
    },
    { type: 'message.deleted', data: { id } }
  )

  return c.body(null, 204)
})
