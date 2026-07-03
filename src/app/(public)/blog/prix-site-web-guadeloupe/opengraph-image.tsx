import { renderBlogOg } from '@/lib/blog-og'

export const alt = 'Prix création site web en Guadeloupe — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Combien coûte un site web en Guadeloupe ?',
    category: 'Prix & Tarifs',
    accent: '#B8760A',
    tags: ['Site dès 599 €', 'Livré en 2-3 sem.', 'Devis sous 24 h'],
  })
}
