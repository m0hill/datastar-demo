import type { FC } from 'react'
import type { Message } from '../../db/schema'
import { parseMarkdown } from '../../lib/markdown'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

export const MessageItem: FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <Card
        id={`message-${message.id}`}
        className={`max-w-[80%] ${isUser ? 'bg-blue-50' : 'bg-gray-50'}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isUser ? 'bg-blue-500' : 'bg-green-500'}`} />
            <span className="text-xs font-medium text-gray-600">
              {isUser ? 'You' : 'Assistant'}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
          {isAssistant ? (
            <div
              className="prose prose-sm max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
            />
          ) : (
            <p className="text-gray-800 break-words whitespace-pre-wrap">{message.content}</p>
          )}
        </CardContent>
        {isUser && (
          <CardFooter className="p-4 pt-0 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              data-on-click={`@post('/messages/delete/${message.id}')`}
            >
              Delete
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
