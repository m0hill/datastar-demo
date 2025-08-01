import { blob, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const chunks = sqliteTable('chunks', {
  id: integer('id').primaryKey(),
  cells: blob('cells', { mode: 'json' }).$type<number[]>().notNull(),
})

export type Chunk = typeof chunks.$inferSelect
