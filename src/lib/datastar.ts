export const ds = {
  resources: {
    todos: 'todo-list-global',
  },
  actions: {
    todos: {
      create: () => `@post('/api/todos', {contentType: 'form'})`,
      toggle: (id: string) => `@post('/api/todos/${id}/toggle')`,
      deleteById: (id: string) => `@delete('/api/todos/${id}')`,
      deleteAll: () => `@delete('/api/todos')`,
      deleteCompleted: () => `@delete('/api/todos/completed')`,
      toggleAll: () => `@post('/api/todos/toggle-all')`,
    },
  },
}
