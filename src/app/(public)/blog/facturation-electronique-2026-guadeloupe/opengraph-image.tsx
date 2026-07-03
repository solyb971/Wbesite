import { renderBlogOg } from '@/lib/blog-og'
import { blogTags } from '@/lib/blog-meta'

export const alt = 'Facturation électronique 2026 en Guadeloupe — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Facturation électronique 2026 en Guadeloupe',
    category: 'Conformité 2026',
    accent: '#2E8C92',
    tags: blogTags['facturation-electronique-2026-guadeloupe'],
  })
}
