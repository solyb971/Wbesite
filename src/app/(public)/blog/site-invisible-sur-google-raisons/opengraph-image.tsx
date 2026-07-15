import { renderBlogOg } from '@/lib/blog-og'
import { blogTags } from '@/lib/blog-meta'

export const alt = 'Mon site n’apparaît pas sur Google : les 7 vraies raisons — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Mon site n’apparaît pas sur Google : pourquoi ?',
    category: 'Guides',
    accent: '#0E7C6B',
    tags: blogTags['site-invisible-sur-google-raisons'],
  })
}
