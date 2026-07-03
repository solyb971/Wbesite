import { renderBlogOg } from '@/lib/blog-og'

export const alt = 'Facturation électronique 2026 en Guadeloupe — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Facturation électronique 2026 en Guadeloupe',
    category: 'Conformité 2026',
    accent: '#2E8C92',
    tags: ['TVA DOM 8,5 %', 'Format Factur-X', 'Obligatoire sept. 2026'],
  })
}
