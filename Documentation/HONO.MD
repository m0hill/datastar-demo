# Hono

> Hono - means flame🔥 in Japanese - is a small, simple, and ultrafast web framework built on Web Standards. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda, Lambda@Edge, and Node.js.

## Docs

- [Full Docs](https://hono.dev/llms-full.txt) Full documentation of Hono. (without examples)
- [Tiny Docs](https://hono.dev/llms-small.txt): Tiny documentation of Hono. (includes only desciption of core)

## Examples

- [Examples](https://github.com/honojs/website/tree/main/examples): List of example files.

## Optional

- [Index](https://hono.dev/docs/index)
- [Third Party](https://hono.dev/docs/middleware/third-party)
- [Basic Auth](https://hono.dev/docs/middleware/builtin/basic-auth)
- [Bearer Auth](https://hono.dev/docs/middleware/builtin/bearer-auth)
- [Body Limit](https://hono.dev/docs/middleware/builtin/body-limit)
- [Cache](https://hono.dev/docs/middleware/builtin/cache)
- [Combine](https://hono.dev/docs/middleware/builtin/combine)
- [Compress](https://hono.dev/docs/middleware/builtin/compress)
- [Context Storage](https://hono.dev/docs/middleware/builtin/context-storage)
- [Cors](https://hono.dev/docs/middleware/builtin/cors)
- [Csrf](https://hono.dev/docs/middleware/builtin/csrf)
- [Etag](https://hono.dev/docs/middleware/builtin/etag)
- [Ip Restriction](https://hono.dev/docs/middleware/builtin/ip-restriction)
- [Jsx Renderer](https://hono.dev/docs/middleware/builtin/jsx-renderer)
- [Jwk](https://hono.dev/docs/middleware/builtin/jwk)
- [Jwt](https://hono.dev/docs/middleware/builtin/jwt)
- [Language](https://hono.dev/docs/middleware/builtin/language)
- [Logger](https://hono.dev/docs/middleware/builtin/logger)
- [Method Override](https://hono.dev/docs/middleware/builtin/method-override)
- [Pretty Json](https://hono.dev/docs/middleware/builtin/pretty-json)
- [Request Id](https://hono.dev/docs/middleware/builtin/request-id)
- [Secure Headers](https://hono.dev/docs/middleware/builtin/secure-headers)
- [Timeout](https://hono.dev/docs/middleware/builtin/timeout)
- [Timing](https://hono.dev/docs/middleware/builtin/timing)
- [Trailing Slash](https://hono.dev/docs/middleware/builtin/trailing-slash)
- [Accepts](https://hono.dev/docs/helpers/accepts)
- [Adapter](https://hono.dev/docs/helpers/adapter)
- [Conninfo](https://hono.dev/docs/helpers/conninfo)
- [Cookie](https://hono.dev/docs/helpers/cookie)
- [Css](https://hono.dev/docs/helpers/css)
- [Dev](https://hono.dev/docs/helpers/dev)
- [Factory](https://hono.dev/docs/helpers/factory)
- [Html](https://hono.dev/docs/helpers/html)
- [Jwt](https://hono.dev/docs/helpers/jwt)
- [Proxy](https://hono.dev/docs/helpers/proxy)
- [Route](https://hono.dev/docs/helpers/route)
- [Ssg](https://hono.dev/docs/helpers/ssg)
- [Streaming](https://hono.dev/docs/helpers/streaming)
- [Testing](https://hono.dev/docs/helpers/testing)
- [Websocket](https://hono.dev/docs/helpers/websocket)
- [Best Practices](https://hono.dev/docs/guides/best-practices)
- [Examples](https://hono.dev/docs/guides/examples)
- [Faq](https://hono.dev/docs/guides/faq)
- [Helpers](https://hono.dev/docs/guides/helpers)
- [Jsx Dom](https://hono.dev/docs/guides/jsx-dom)
- [Jsx](https://hono.dev/docs/guides/jsx)
- [Middleware](https://hono.dev/docs/guides/middleware)
- [Others](https://hono.dev/docs/guides/others)
- [Rpc](https://hono.dev/docs/guides/rpc)
- [Testing](https://hono.dev/docs/guides/testing)
- [Validation](https://hono.dev/docs/guides/validation)
- [Ali Function-Compute](https://hono.dev/docs/getting-started/ali-function-compute)
- [Aws Lambda](https://hono.dev/docs/getting-started/aws-lambda)
- [Azure Functions](https://hono.dev/docs/getting-started/azure-functions)
- [Basic](https://hono.dev/docs/getting-started/basic)
- [Bun](https://hono.dev/docs/getting-started/bun)
- [Cloudflare Pages](https://hono.dev/docs/getting-started/cloudflare-pages)
- [Cloudflare Workers](https://hono.dev/docs/getting-started/cloudflare-workers)
- [Deno](https://hono.dev/docs/getting-started/deno)
- [Fastly](https://hono.dev/docs/getting-started/fastly)
- [Google Cloud-Run](https://hono.dev/docs/getting-started/google-cloud-run)
- [Lambda Edge](https://hono.dev/docs/getting-started/lambda-edge)
- [Netlify](https://hono.dev/docs/getting-started/netlify)
- [Nodejs](https://hono.dev/docs/getting-started/nodejs)
- [Service Worker](https://hono.dev/docs/getting-started/service-worker)
- [Supabase Functions](https://hono.dev/docs/getting-started/supabase-functions)
- [Vercel](https://hono.dev/docs/getting-started/vercel)
- [Benchmarks](https://hono.dev/docs/concepts/benchmarks)
- [Developer Experience](https://hono.dev/docs/concepts/developer-experience)
- [Middleware](https://hono.dev/docs/concepts/middleware)
- [Motivation](https://hono.dev/docs/concepts/motivation)
- [Routers](https://hono.dev/docs/concepts/routers)
- [Stacks](https://hono.dev/docs/concepts/stacks)
- [Web Standard](https://hono.dev/docs/concepts/web-standard)
- [Context](https://hono.dev/docs/api/context)
- [Exception](https://hono.dev/docs/api/exception)
- [Hono](https://hono.dev/docs/api/hono)
- [Index](https://hono.dev/docs/api/index)
- [Presets](https://hono.dev/docs/api/presets)
- [Request](https://hono.dev/docs/api/request)
- [Routing](https://hono.dev/docs/api/routing)

Title: Cloudflare Durable Objects - Hono

URL Source: https://hono.dev/examples/cloudflare-durable-objects

Markdown Content:
Cloudflare Durable Objects cannot handle HTTP requests directly. Instead, they work through a two-step process:

1.   A Worker receives HTTP fetch requests from clients
2.   The Worker makes RPC (Remote Procedure Call) invocations to the Durable Object
3.   The Durable Object processes the RPC and returns the result to the Worker
4.   The Worker sends the HTTP response back to the client

You can use Hono as the router in your Cloudflare Worker, calling RPCs (Remote Procedure Calls) to interact with [Durable Objects](https://developers.cloudflare.com/durable-objects/). This is the recommended approach as of Cloudflare Workers compatibility date `2024-04-03`.

Example: Counter Durable Object [​](https://hono.dev/examples/cloudflare-durable-objects#example-counter-durable-object)
------------------------------------------------------------------------------------------------------------------------

ts

```
import { DurableObject } from 'cloudflare:workers'
import { Hono } from 'hono'

export class Counter extends DurableObject {
  // In-memory state
  value = 0

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)

    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    ctx.blockConcurrencyWhile(async () => {
      // After initialization, future reads do not need to access storage.
      this.value = (await ctx.storage.get('value')) || 0
    })
  }

  async getCounterValue() {
    return this.value
  }

  async increment(amount = 1): Promise<number> {
    this.value += amount
    await this.ctx.storage.put('value', this.value)
    return this.value
  }

  async decrement(amount = 1): Promise<number> {
    this.value -= amount
    await this.ctx.storage.put('value', this.value)
    return this.value
  }
}

// Create a new Hono app to handle incoming HTTP requests
type Bindings = {
  COUNTER: DurableObjectNamespace<Counter>
}

const app = new Hono<{ Bindings: Bindings }>()

// Add routes to interact with the Durable Object
app.get('/counter', async (c) => {
  const env = c.env
  const id = env.COUNTER.idFromName('counter')
  const stub = env.COUNTER.get(id)
  const counterValue = await stub.getCounterValue()
  return c.text(counterValue.toString())
})

app.post('/counter/increment', async (c) => {
  const env = c.env
  const id = env.COUNTER.idFromName('counter')
  const stub = env.COUNTER.get(id)
  const value = await stub.increment()
  return c.text(value.toString())
})

app.post('/counter/decrement', async (c) => {
  const env = c.env
  const id = env.COUNTER.idFromName('counter')
  const stub = env.COUNTER.get(id)
  const value = await stub.decrement()
  return c.text(value.toString())
})

// Export the Hono app as the Worker's fetch handler
export default app
```

`wrangler.jsonc`:

jsonc

```
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "durable",
  "main": "src/index.ts",
  "compatibility_date": "2025-04-14",
  "migrations": [
    {
      "new_sqlite_classes": ["Counter"],
      "tag": "v1",
    },
  ],
  "durable_objects": {
    "bindings": [
      {
        "class_name": "Counter",
        "name": "COUNTER",
      },
    ],
  },
  "observability": {
    "enabled": true,
  },
}
```

Now you have a fully functional Hono application that interfaces with your Durable Object! The Hono router provides a clean API interface to interact with and expose your Durable Object's methods.