import type { FC } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Textarea } from '../ui/textarea'

interface ChatFormProps {
  conversationId: string
}

export const ChatForm: FC<ChatFormProps> = ({ conversationId }) => (
  <Card className="shadow-sm">
    <form
      data-on-submit="@post('/messages', { contentType: 'form' })"
      data-on-end="$refs.newMessage.value = ''; setTimeout(() => $refs.messageContainer.scrollTop = $refs.messageContainer.scrollHeight, 200)"
      data-indicator="isSending"
    >
      <input type="hidden" name="conversationId" value={conversationId} />
      <CardContent className="p-4">
        <Textarea
          name="content"
          // @ts-expect-error
          ref="newMessage"
          placeholder="Type your message..."
          rows={3}
          className="resize-none"
        />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button type="submit" className="w-full" data-attr-disabled="$isSending">
          <span data-show="!$isSending">Send Message</span>
          <span data-show="$isSending">Sending...</span>
        </Button>
      </CardFooter>
    </form>
  </Card>
)
