import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/site/Breadcrumbs'

type CtaLink = { label: string; href: string }

/**
 * Coquille éditoriale partagée par les articles de blog.
 * Reprend la DA « SolYB v3 » de la home (crème chaud + tokens --syb-*,
 * font-display, prose mappée sur les couleurs de marque). Aucun emoji,
 * aucune couleur générique : tout passe par les tokens.
 */
export function ArticleShell({
  category,
  accent,
  accentInk,
  title,
  date,
  readTime,
  crumbLabel,
  crumbHref,
  children,
  cta,
}: {
  /** Libellé de la rubrique (badge). */
  category: string
  /** Accent vif de l'article (trait + pastille). */
  accent: string
  /** Variante foncée de l'accent, lisible en texte sur crème (AA). */
  accentInk: string
  title: ReactNode
  /** Date ISO (YYYY-MM-DD). */
  date: string
  readTime: string
  crumbLabel: string
  crumbHref: string
  children: ReactNode
  cta?: {
    heading: string
    text: string
    primary: CtaLink
    secondary?: CtaLink
  }
}) {
  const articleVars = {
    '--article-accent': accent,
    '--article-link': accentInk,
  } as CSSProperties

  return (
    <main className="min-h-screen" style={{ background: 'var(--syb-warm)' }}>
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: crumbLabel, href: crumbHref }]} />

      {/* Header éditorial */}
      <header className="px-6 pt-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-center gap-2.5 mb-5 text-xs tracking-[2px] uppercase font-medium"
            style={{ color: accentInk }}
          >
            <span className="w-5 h-px" style={{ background: accent }} />
            {category}
          </div>
          <h1
            className="font-display font-black leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 54px)', letterSpacing: '-1.5px', color: 'var(--syb-ink)' }}
          >
            {title}
          </h1>
          <div className="flex items-center gap-6 text-sm font-light" style={{ color: 'var(--syb-stone)' }}>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readTime} de lecture
            </span>
          </div>
        </div>
      </header>

      {/* Corps rédactionnel */}
      <div className="px-6 pb-16">
        <div className="article-body max-w-3xl mx-auto" style={articleVars}>
          {children}
        </div>
      </div>

      {cta && (
        <section
          className="py-20 px-6 text-center"
          style={{ background: 'var(--syb-cream)', borderTop: '0.5px solid var(--syb-border)' }}
        >
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--syb-ink)' }}
            >
              {cta.heading}
            </h2>
            <p className="mb-8 font-light" style={{ color: 'var(--syb-stone)', lineHeight: 1.7 }}>
              {cta.text}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center gap-2 font-medium text-base transition-transform hover:-translate-y-px"
                style={{ background: 'var(--syb-rust)', color: '#fff', padding: '15px 32px', borderRadius: '4px' }}
              >
                {cta.primary.label} <ArrowRight className="w-4 h-4" />
              </Link>
              {cta.secondary && (
                <Link
                  href={cta.secondary.href}
                  className="inline-flex items-center gap-2 font-medium text-base transition-colors"
                  style={{
                    color: 'var(--syb-ink)',
                    padding: '15px 32px',
                    borderRadius: '4px',
                    border: '0.5px solid var(--syb-border)',
                  }}
                >
                  {cta.secondary.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

/**
 * Encadré éditorial (remplace les blocs blancs/gris génériques).
 * Fond crème + filet ; l'accent est passé par l'article.
 */
export function ArticleCallout({
  accent,
  children,
}: {
  accent: string
  children: ReactNode
}) {
  return (
    <div
      className="not-prose rounded-2xl p-6 my-8"
      style={{ background: 'var(--syb-cream)', border: `0.5px solid ${accent}33` }}
    >
      {children}
    </div>
  )
}
