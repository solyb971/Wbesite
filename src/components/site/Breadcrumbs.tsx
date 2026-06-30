import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type Crumb = { name: string; href: string }

const BASE = 'https://solyb.fr'

/**
 * Fil d'Ariane — rendu visuel discret + données structurées JSON-LD
 * (schema.org BreadcrumbList) pour les rich results Google.
 * Le premier élément est toujours « Accueil » ; ne pas l'inclure dans `items`.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'Accueil', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.href === '/' ? '' : c.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Fil d'Ariane" className="max-w-5xl mx-auto px-6 pt-24 md:pt-28">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs" style={{ color: 'var(--syb-stone-light)' }}>
          {all.map((c, i) => {
            const last = i === all.length - 1
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" style={{ color: 'var(--syb-stone)' }}>{c.name}</span>
                ) : (
                  <Link href={c.href} className="transition-colors hover:underline" style={{ color: 'var(--syb-stone-light)' }}>
                    {c.name}
                  </Link>
                )}
                {!last && <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--syb-border)' }} />}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
