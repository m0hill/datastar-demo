import type { FC, PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {
  conversationId?: string
}

export const Layout: FC<LayoutProps> = ({ children, conversationId = 'default-conversation' }) => (
  <html>
    <head>
      <title>AI Chat</title>
      <link href="/public/styles.css" rel="stylesheet" />

      <script
        type="module"
        src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.0-beta.11/bundles/datastar.js"
      />
    </head>
    <body className="font-sans bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white min-h-screen">
        <div data-on-load={`@get('/messages/stream/${conversationId}')`} />
        {children}
      </div>
    </body>
  </html>
)
