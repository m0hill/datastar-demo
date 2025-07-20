import { Loader2, Plus } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ds } from '@/lib/datastar'

export const TodoForm: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <form
          data-on-submit={ds.actions.todos.create()}
          data-indicator="_submitting"
          className="flex gap-2"
        >
          <Input
            name="text"
            placeholder="Add a new todo..."
            required
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" className="shrink-0" data-attr-disabled="$_submitting">
            <div data-show="$_submitting" className="animate-spin">
              <Loader2 className="h-4 w-4" />
            </div>
            <div data-show="!$_submitting">
              <Plus className="h-4 w-4 mr-2" />
            </div>
            Add Todo
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
