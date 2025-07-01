import type { FC } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Textarea } from '../ui/textarea'

export const MemoForm: FC = () => (
  <Card className="mb-6">
    <form
      data-on-submit="@post('/memos', { contentType: 'form' })"
      data-on-end="$refs.newMemo.value = ''"
      data-indicator="isAdding"
    >
      <CardContent className="p-4">
        <Textarea
          name="content"
          // @ts-expect-error
          ref="newMemo"
          placeholder="Write a new memo..."
          rows={3}
        />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button type="submit" className="w-full" data-attr-disabled="$isAdding">
          <span data-show="!$isAdding">Add Memo</span>
          <span data-show="$isAdding">Adding...</span>
        </Button>
      </CardFooter>
    </form>
  </Card>
)
