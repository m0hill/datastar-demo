import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './drizzle/schemas/chat.schema.ts',
  out: './migrations/chat',
  dialect: 'sqlite',
  driver: 'durable-sqlite',
})
