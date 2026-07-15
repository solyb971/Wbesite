import { renderBlogOg } from '@/lib/blog-og'
import { blogTags } from '@/lib/blog-meta'

export const alt = 'Combien coûte une application métier ? — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Combien coûte une application métier ?',
    category: 'Prix & Tarifs',
    accent: '#B8760A',
    tags: blogTags['prix-application-metier-guadeloupe'],
  })
}
