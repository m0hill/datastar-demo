# Agent Guidelines

## Commands
- **Dev**: `bun run dev` (Cloudflare Workers with wrangler)
- **Build**: `bun run build:css` (Tailwind CSS build)
- **Lint**: `bun run lint`
- **Format**: `bun run format`
- **Typecheck**: `bun run typecheck`
- **DB**: `bun run db:generate`, `bun run db:migrate:local`, `bun run db:studio:local`

## Code Style
- **Formatting**: 2 spaces, 100 char line width, single quotes, semicolons as needed
- **Imports**: Use `@/` for src imports, React imports first, then external, then internal
- **Types**: Strict TypeScript, explicit React.FC types, no implicit any
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Components**: Export as named exports, use interface for props
- **Error Handling**: Use proper error boundaries, handle async errors with try/catch
- **Database**: Use Drizzle ORM with SQLite, define schemas in src/db/schema.ts

## Tech Stack
- **Runtime**: Bun (not Node.js)
- **Framework**: Hono + Cloudflare Workers
- **Frontend**: React 19 + Datastar + Tailwind CSS
- **Database**: Drizzle ORM + SQLite (D1)
- **UI**: Shadcn (Radix UI) components in src/components/ui/
