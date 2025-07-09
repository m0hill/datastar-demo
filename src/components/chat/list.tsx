import type { FC } from 'react'
import type { Message } from '../../db/schema'
import { MessageItem } from './item'

export const MessageList: FC<{ messages: Message[] }> = ({ messages }) => (
  <div className="flex-1 flex flex-col border rounded-lg bg-white shadow-sm">
    <div
      className="flex-1 overflow-y-auto p-4"
      // @ts-expect-error
      ref="messageContainer"
      data-on-load="setTimeout(() => $refs.messageContainer.scrollTop = $refs.messageContainer.scrollHeight, 100)"
    >
      <div id="message-list" className="space-y-4">
        {messages.length > 0 ? (
          messages.map(message => <MessageItem key={message.id} message={message} />)
        ) : (
          <div className="text-center text-gray-500 py-12">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start a conversation by typing a message below!</p>
          </div>
        )}
      </div>
    </div>
  </div>
)
