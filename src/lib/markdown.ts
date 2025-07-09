import { marked } from 'marked'

// Configure marked for safe HTML rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

export function parseMarkdown(content: string): string {
  return marked.parse(content) as string
}
