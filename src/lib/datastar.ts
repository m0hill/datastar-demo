export const ds = {
  resources: {
    todos: 'v1-todo-list',
    chat: 'v1-chat-room',
    grid: 'v1-grid',
  },
  actions: {
    todos: {
      create: () => `@post('/api/todos', {contentType: 'form'})`,
      update: (id: string) => `@post('/api/todos/${id}/update', { contentType: 'form' })`,
      toggle: (id: string) => `@post('/api/todos/${id}/toggle')`,
      deleteById: (id: string) => `@delete('/api/todos/${id}')`,
      deleteAll: () => `@delete('/api/todos')`,
      deleteCompleted: () => `@delete('/api/todos/completed')`,
      toggleAll: () => `@post('/api/todos/toggle-all')`,
    },
    chat: {
      createMessage: () => `@post('/api/chat/messages', {contentType: 'form'})`,
    },
    grid: {
      check: () => `@post('/api/grid/check')`,
      updateViewport: () => `@post('/api/grid/viewport', { contentType: 'json' })`,
    },
  },
}
