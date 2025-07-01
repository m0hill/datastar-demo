# Real-time Memo App

A modern, real-time CRUD application for managing memos that showcases the power of **Datastar's SSE + SSR architecture**. Experience instant updates across all connected clients through server-rendered HTML fragments streamed over Server-Sent Events.

## Features

- **Real-time UI** - Instant updates across all clients without page refresh
- **Server-Side Rendering** - Fast initial loads and SEO-friendly
- **Optimistic Updates** - Immediate feedback on user actions
- **Efficient Bandwidth** - Hash-based checks prevent unnecessary updates

## Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Database:** SQLite with Drizzle ORM
- **Real-time:** Datastar (Server-Sent Events)
- **UI:** React (SSR) + Tailwind CSS + Shadcn/ui

## Datastar SSE + SSR Architecture

This app demonstrates **Datastar's revolutionary approach** to real-time web applications:

### Traditional SSR + Real-time Updates
- **Initial Load:** Complete HTML page rendered on server via React's `renderToReadableStream`
- **SSE Connection:** Datastar automatically establishes persistent connection via `data-on-load` attribute
- **HTML Over the Wire:** Server pushes pre-rendered HTML fragments (not JSON) over SSE
- **DOM Morphing:** Client intelligently merges new HTML into existing DOM

### The Datastar Flow
1. **User Action** → Standard form POST to server
2. **Server Processing** → Update database + publish event to in-memory bus
3. **SSE Stream Handler** → Catches event, re-renders React component with `renderToString`
4. **HTML Fragment Push** → Complete HTML sent over SSE to all connected clients
5. **Client Update** → Datastar morphs DOM with zero client-side JavaScript

### Why This Matters
- **No JSON APIs** - Server sends ready-to-use HTML
- **No Client State Management** - Server is the single source of truth
- **Minimal JavaScript** - Declarative interactivity via HTML attributes
- **Real-time by Default** - Every change instantly propagates

## Quick Start

```bash
# Clone and install
git clone https://github.com/m0hill/datastar-demo.git
cd datastar-demo
bun install

# Setup database
bun run db:migrate

# Build CSS
bun run build:css

# Start development server
bun run dev
```

Visit `http://localhost:3000`

## Scripts

- `bun run dev` - Development server with hot-reload
- `bun run start` - Production server
- `bun run build:css` - Compile Tailwind CSS
- `bun run db:generate` - Generate migrations
- `bun run db:migrate` - Run migrations
- `bun run lint` - Lint code
- `bun run format` - Format code