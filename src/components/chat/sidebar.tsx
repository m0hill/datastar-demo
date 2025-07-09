import type { FC } from 'react'
import type { Conversation } from '../../db/schema'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface ConversationSidebarProps {
  conversations: Conversation[]
  currentConversationId: string
}

export const ConversationSidebar: FC<ConversationSidebarProps> = ({
  conversations,
  currentConversationId,
}) => (
  <Card className="h-full shadow-sm">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">Conversations</CardTitle>
      </div>
      <a href="/messages/conversations/new" className="w-full">
        <Button className="w-full mt-3" size="sm" variant="outline">
          + New Chat
        </Button>
      </a>
    </CardHeader>
    <CardContent className="p-0 flex-1">
      <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
        {conversations.map(conversation => (
          <a
            key={conversation.id}
            href={`/?conversation=${conversation.id}`}
            className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-l-2 ${
              conversation.id === currentConversationId
                ? 'bg-blue-50 border-l-blue-500 text-blue-700'
                : 'text-gray-700 border-l-transparent hover:border-l-gray-300'
            }`}
          >
            <div className="truncate font-medium mb-1">{conversation.title || 'Untitled Chat'}</div>
            <div className="text-xs text-gray-500">
              {new Date(conversation.updatedAt).toLocaleDateString()}
            </div>
          </a>
        ))}
        {conversations.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            <div className="text-2xl mb-2">🗨️</div>
            <p>No conversations yet.</p>
            <p>Click "New Chat" to start!</p>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
)
