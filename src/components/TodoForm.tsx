import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const TodoForm: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <form data-on-submit="@post('/api/todos', {contentType: 'form'})" className="flex gap-2">
          <Input
            name="text"
            placeholder="Add a new todo..."
            required
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Todo
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
