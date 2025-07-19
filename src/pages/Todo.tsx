import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { TodoList } from '@/components/TodoList'
import { createDB } from '@/db'
import { todos } from '@/db/schema'
import { ds } from '@/lib/datastar'

const pages = new Hono<{ Bindings: Env }>()

pages.get('/', async c => {
  const db = createDB(c.env)
  const allTodos = await db.select().from(todos).orderBy(todos.createdAt).all()

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
        <TodoList todos={allTodos} />
        <div data-on-load={`@get('/rt/${ds.resources.todos}/stream')`}></div>
      </body>
    </html>
  )

  return c.html(renderToString(Page))
})

export { pages }
