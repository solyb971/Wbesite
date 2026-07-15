import { renderBlogOg } from '@/lib/blog-og'
import { blogTags } from '@/lib/blog-meta'

export const alt = 'Locations de voitures & gîtes : passer à la réservation en ligne — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Locations & gîtes : réserver en ligne',
    category: 'Secteurs',
    accent: '#C4472A',
    tags: blogTags['location-voiture-gite-reservation-en-ligne'],
  })
}
