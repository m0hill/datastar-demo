import { MessageCircle } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ds } from '@/lib/datastar'
import { messages } from '../../drizzle/schemas/chat.schema'

type Message = typeof messages.$inferSelect

export const ChatRoom: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div
      id="chat-resource"
      className="max-w-2xl mx-auto p-4"
      data-signals="{ _username: '', _message: '' }"
      data-on-load={`@get('/rt/chat/${ds.resources.chat}/stream')`}
      data-effect="el.querySelector('#messages-list')?.scrollTo(0, el.querySelector('#messages-list').scrollHeight)"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            <CardTitle>Real-time Chat</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div data-show="!$_username" className="flex flex-col gap-2 items-center">
            <p className="text-muted-foreground">Please enter a nickname to join the chat</p>
            <form
              data-on-submit="$_username = el.querySelector('input').value"
              className="flex gap-2 w-full max-w-sm"
            >
              <Input name="nickname" placeholder="Your nickname..." required autoComplete="off" />
              <Button type="submit">Join Chat</Button>
            </form>
          </div>

          <div data-show="$_username" className="space-y-4">
            <div
              id="messages-list"
              className="h-96 overflow-y-auto pr-4 space-y-3 border rounded-md p-4"
            >
              {messages.map(msg => (
                <div key={msg.id} className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-sm">{msg.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{msg.content}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-muted-foreground text-center">No messages yet. Say hi!</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter data-show="$_username">
          <form
            data-on-submit={`${ds.actions.chat.createMessage()}; $_message = ''`}
            className="flex gap-2 w-full"
          >
            <Input type="hidden" name="username" data-attr-value="$_username" />
            <Input
              name="content"
              placeholder="Type a message..."
              required
              autoComplete="off"
              data-bind="_message"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
