import { Hono } from 'hono'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { GridContainer } from '@/components/GridContainer'
import { ds } from '@/lib/datastar'

const pages = new Hono<{ Bindings: Env }>()

pages.get('/', async c => {
  const Page = (
    <html>
      <head>
        <title>One Million Checkboxes</title>
        <link href="/styles.css" rel="stylesheet" />
        <script
          type="module"
          src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"
        ></script>
      </head>
      <body className="bg-gray-100 font-sans p-4">
        <div data-on-load={`@get('/rt/grid/${ds.resources.grid}/stream', {openWhenHidden: true})`}>
          <GridContainer />
        </div>
      </body>
    </html>
  )
  return c.html(renderToString(Page))
})

export { pages as gridPages }