import type { FC, PropsWithChildren } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html>
    <head>
      <title>Memo App</title>
      <link href="/public/styles.css" rel="stylesheet" />

      <script
        type="module"
        src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.0-beta.11/bundles/datastar.js"
      />
    </head>
    <body className="flex justify-center py-10 font-sans">
      <div className="max-w-2xl w-full">
        <div data-on-load="@get('/memos/stream')" />
        {children}
      </div>
    </body>
  </html>
)
