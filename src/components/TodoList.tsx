import React from 'react'
import { TodoForm } from '@/components/TodoForm'
import { TodoItem } from '@/components/TodoItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { todos } from '@/db/schema'

type Todo = typeof todos.$inferSelect

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="max-w-2xl mx-auto p-4">
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
              <Button variant="outline" size="sm" data-on-click="@post('/api/todos/toggle-all')">
                Toggle All
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-on-click="@delete('/api/todos/completed')"
                className="text-red-600 hover:text-red-700"
              >
                Clear Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-on-click="@delete('/api/todos')"
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
          todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex gap-2 justify-center">
            <Button
              variant="ghost"
              size="sm"
              data-on-click="@get('/api/todos?filter=all')"
              data-indicator="loading"
            >
              All ({totalCount})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-on-click="@get('/api/todos?filter=active')"
              data-indicator="loading"
            >
              Active ({totalCount - completedCount})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-on-click="@get('/api/todos?filter=completed')"
              data-indicator="loading"
            >
              Completed ({completedCount})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
