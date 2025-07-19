import React from 'react'
import { TodoForm } from '@/components/TodoForm'
import { TodoItem } from '@/components/TodoItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { todos } from '@/db/schema'
import { ds } from '@/lib/datastar'

type Todo = typeof todos.$inferSelect

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div id="todo-app" className="max-w-2xl mx-auto p-4" data-signals="{ filter: 'all' }">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo List</h1>
        <p className="text-gray-600">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>

      <TodoForm />

      <div data-show="$loading" className="flex items-center justify-center py-4 text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading...</span>
      </div>

      {totalCount > 0 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" data-on-click={ds.actions.todos.toggleAll()}>
                Toggle All
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-on-click={ds.actions.todos.deleteCompleted()}
                className="text-red-600 hover:text-red-700"
              >
                Clear Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-on-click={ds.actions.todos.deleteAll()}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div id="todo-list" className="space-y-2">
        {todos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 text-lg mb-2">No todos yet!</p>
              <p className="text-gray-400">Add your first todo above to get started.</p>
            </CardContent>
          </Card>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              data-show={
                (ds.signals.todos.setFilter('all') + ds.signals.todos.setFilter('active') &&
                  !todo.completed) ||
                (ds.signals.todos.setFilter('completed') && todo.completed)
              }
            >
              <TodoItem todo={todo} />
            </div>
          ))
        )}
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex gap-2 justify-center">
            <Button variant="ghost" size="sm" data-on-click={ds.signals.todos.setFilter('all')}>
              All ({totalCount})
            </Button>
            <Button variant="ghost" size="sm" data-on-click={ds.signals.todos.setFilter('active')}>
              Active ({totalCount - completedCount})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-on-click={ds.signals.todos.setFilter('completed')}
            >
              Completed ({completedCount})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
