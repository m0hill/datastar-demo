import { Loader2, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { todos } from '@/db/schema'
import { ds } from '@/lib/datastar'

type Todo = typeof todos.$inferSelect

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const deletingSignal = `deleting_${todo.id}`

  return (
    <Card id={`todo-${todo.id}`} className="mb-2" data-signals={`{ '${deletingSignal}': false }`}>
      <CardContent className="flex items-center gap-3 p-4">
        <Checkbox
          checked={todo.completed ?? undefined}
          data-on-click={ds.actions.todos.toggle(todo.id)}
          className="cursor-pointer"
        />

        <span
          className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
        >
          {todo.content}
        </span>

        <span className="text-sm text-gray-400">
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>

        <Button
          variant="ghost"
          size="sm"
          data-on-click={ds.actions.todos.deleteById(todo.id)}
          data-indicator={deletingSignal}
          data-attr-disabled={`$${deletingSignal}`}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <div data-show={`$${deletingSignal}`} className="animate-spin">
            <Loader2 className="h-4 w-4" />
          </div>
          <div data-show={`!$${deletingSignal}`}>
            <Trash2 className="h-4 w-4" />
          </div>
        </Button>
      </CardContent>
    </Card>
  )
}
