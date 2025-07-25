# Real-time Todo App

A modern, real-time collaborative todo application built with **Datastar** and **Cloudflare Workers**.

## What's Cool About This App

### **Zero Client-Side JavaScript**
Built with [Datastar](https://data-star.dev) - a hypermedia framework that delivers reactive frontends without writing any client-side JS. All interactivity is driven by HTML attributes.

### **Real-time Collaboration**
Multiple users can collaborate on the same todo list in real-time using Server-Sent Events (SSE) and Cloudflare Durable Objects for state synchronization.

### **Edge-First Architecture**
- **Cloudflare Workers** for serverless compute at the edge
- **Durable Objects** for consistent real-time state management
- **D1 Database** for persistent storage

### **Modern Stack**
- **Datastar** for reactive UI without client JS
- **Hono** for routing
- **React** for server-side rendering
- **Tailwind CSS** for styling

## Getting Started

```bash
# Install dependencies
bun install

# Generate database schema
bun run db:generate

# Apply migrations locally
bun run db:migrate:local

# Start development server
bun run dev
```

## Deployment

```bash
bun run deploy
```

## Architecture Highlights

- **Hypermedia-driven interactions** using Datastar's `data-on-*` attributes
- **Real-time broadcasting** via Durable Objects and SSE streams
- **Server-side rendering** with React components

This showcases how modern web apps can be built with minimal complexity while delivering maximum performance and real-time capabilities.
