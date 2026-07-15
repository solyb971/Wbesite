import { renderBlogOg } from '@/lib/blog-og'
import { blogTags } from '@/lib/blog-meta'

export const alt = 'Être visible sur Google en Guadeloupe — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Être visible sur Google en Guadeloupe',
    category: 'Guides',
    accent: '#0E7C6B',
    tags: blogTags['etre-visible-sur-google-guadeloupe'],
  })
}
