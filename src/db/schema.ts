import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const memos = sqliteTable('memos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
})
