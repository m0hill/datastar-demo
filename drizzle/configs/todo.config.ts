import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './drizzle/schemas/todo.schema.ts',
  out: './migrations/todo',
  dialect: 'sqlite',
  driver: 'durable-sqlite',
})
