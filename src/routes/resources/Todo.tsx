import * as schema from '@drizzle/schemas/todo.schema'
import { todos } from '@drizzle/schemas/todo.schema'
import migrations from '@migrations/todo/migrations'
import { eq, not } from 'drizzle-orm'
import { DrizzleSqliteDODatabase, drizzle as drizzleDO } from 'drizzle-orm/durable-sqlite'
import { migrate as migrateDO } from 'drizzle-orm/durable-sqlite/migrator'
import { renderToString } from 'react-dom/server'
import { TodoList } from '@/components/TodoList'
import { BaseResource } from '@/routes/resources'

export class TodoResource extends BaseResource {
  private db: DrizzleSqliteDODatabase<typeof schema>

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    this.db = drizzleDO(this.ctx.storage, { schema, logger: true })
    this.ctx.blockConcurrencyWhile(() => migrateDO(this.db, migrations))
  }

  protected getUiSelector(): string {
    return '#todos-resource'
  }

  protected async render(): Promise<string> {
    const allTodos = await this.db.query.todos.findMany({
      orderBy: (todos, { asc }) => [asc(todos.createdAt)],
    })
    return renderToString(<TodoList todos={allTodos} />)
  }

  async addTodo(content: string) {
    if (typeof content !== 'string' || content.trim() === '') {
      throw new Error('Invalid todo content')
    }
    await this.db.insert(todos).values({
      id: crypto.randomUUID(),
      content: content,
      createdAt: new Date(),
    })
    await this.broadcastState()
  }

  async toggleTodo(id: string) {
    await this.db
      .update(todos)
      .set({ completed: not(todos.completed) })
      .where(eq(todos.id, id))
    await this.broadcastState()
  }

  async updateTodo(id: string, content: string) {
    if (typeof content !== 'string' || content.trim() === '') {
      throw new Error('Invalid todo content')
    }
    await this.db.update(todos).set({ content }).where(eq(todos.id, id))
    await this.broadcastState()
  }

  async deleteTodo(id: string) {
    await this.db.delete(todos).where(eq(todos.id, id))
    await this.broadcastState()
  }

  async deleteAllTodos() {
    await this.db.delete(todos)
    await this.broadcastState()
  }

  async deleteCompletedTodos() {
    await this.db.delete(todos).where(eq(todos.completed, true))
    await this.broadcastState()
  }

  async toggleAllTodos() {
    const allTodos = await this.db.select({ completed: todos.completed }).from(todos)
    const allCompleted = allTodos.length > 0 && allTodos.every(t => t.completed)
    await this.db.update(todos).set({ completed: !allCompleted })
    await this.broadcastState()
  }
}
