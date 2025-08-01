import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './drizzle/schemas/grid.schema.ts',
  out: './migrations/grid',
  dialect: 'sqlite',
  driver: 'durable-sqlite',
})
