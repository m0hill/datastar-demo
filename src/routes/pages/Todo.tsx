import { todos } from '@drizzle/schemas/todo.schema'
import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { TodoList } from '@/components/TodoList'
import { ds } from '@/lib/datastar'

type Todo = typeof todos.$inferSelect

const pages = new Hono<{ Bindings: Env }>()

pages.get('/', async c => {
  const allTodos: Todo[] = []

  const Page = (
    <html>
      <head>
        <title>Real-time Todo App</title>
        <link href="/styles.css" rel="stylesheet" />
        <script
          type="module"
          src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"
        ></script>
      </head>
      <body className="bg-gray-100 font-sans">
        <div data-on-load={`@get('/rt/todos/${ds.resources.todos}/stream')`}>
          <TodoList todos={allTodos} />
        </div>
      </body>
    </html>
  )

  return c.html(renderToString(Page))
})

export { pages as todoPages }
