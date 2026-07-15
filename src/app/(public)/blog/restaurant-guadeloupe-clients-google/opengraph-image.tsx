import { renderBlogOg } from '@/lib/blog-og'
import { blogTags } from '@/lib/blog-meta'

export const alt = 'Restaurateurs en Guadeloupe : vos clients vous cherchent avant d’atterrir — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Vos clients vous cherchent avant d’atterrir',
    category: 'Secteurs',
    accent: '#C4472A',
    tags: blogTags['restaurant-guadeloupe-clients-google'],
  })
}
