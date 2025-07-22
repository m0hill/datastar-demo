import { Edit, Loader2, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { todos } from '@/db/schema'
import { ds } from '@/lib/datastar'

type Todo = typeof todos.$inferSelect

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const deletingSignal = `_deleting_${todo.id}`
  const editingSignal = `_editing_${todo.id}`

  return (
    <Card
      id={`todo-${todo.id}`}
      className="mb-2"
      data-signals={`{ '${deletingSignal}': false, '${editingSignal}': false }`}
      data-effect={`if($${editingSignal}) setTimeout(() => el.querySelector('input[name="content"]')?.focus(), 0)`}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div data-show={`!$${editingSignal}`} className="flex-1 flex items-center gap-3">
          <Checkbox
            checked={todo.completed ?? undefined}
            data-on-click={ds.actions.todos.toggle(todo.id)}
            className="cursor-pointer"
          />
          <span
            className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
            data-on-dblclick={`$${editingSignal} = true`}
          >
            {todo.content}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
          <Button variant="ghost" size="sm" data-on-click={`$${editingSignal} = true`}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <form
          data-show={`$${editingSignal}`}
          className="flex-1 flex items-center gap-2"
          data-on-submit={`${ds.actions.todos.update(todo.id)}; $${editingSignal} = false`}
          data-on-keydown={`if (evt.key === 'Escape') { evt.preventDefault(); $${editingSignal} = false }`}
        >
          <Checkbox checked={todo.completed ?? undefined} disabled />
          <Input
            name="content"
            defaultValue={todo.content}
            className="flex-1"
            autoComplete="off"
            required
          />
          <Button type="submit" size="sm">
            Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-on-click={`$${editingSignal} = false`}
          >
            Cancel
          </Button>
        </form>

        <Button
          variant="ghost"
          size="sm"
          data-on-click={ds.actions.todos.deleteById(todo.id)}
          data-indicator={deletingSignal}
          data-attr-disabled={`$${deletingSignal} || $${editingSignal}`}
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
