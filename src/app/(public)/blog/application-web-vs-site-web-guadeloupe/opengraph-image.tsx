import { renderBlogOg } from '@/lib/blog-og'

export const alt = 'Application web ou site web en Guadeloupe — SolYB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderBlogOg({
    title: 'Site web ou application : que choisir ?',
    category: 'Guides',
    accent: '#0E7C6B',
    tags: ['Vitrine ou outil ?', 'Cas d’usage concrets', 'Bien choisir'],
  })
}
