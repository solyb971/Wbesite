import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, BookOpen, FileText, Tag, GitCompare } from 'lucide-react'
import Breadcrumbs from '@/components/site/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Blog Création Site Web Guadeloupe — Conseils & Actualités',
  description: 'Guides pratiques et conseils pour créer votre site web en Guadeloupe. Prix, comparatifs, tutoriels pour entrepreneurs guadeloupéens.',
  keywords: ['blog web Guadeloupe', 'création site web conseils', 'prix site web 971', 'guide entrepreneur Guadeloupe'],
  alternates: { canonical: 'https://solyb.fr/blog' },
  openGraph: {
    title: 'Blog Création Site Web Guadeloupe | SolYB',
    description: 'Guides et conseils pour entrepreneurs guadeloupéens souhaitant créer leur site web.',
    url: 'https://solyb.fr/blog',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
  },
}

const articles = [
  {
    slug: 'facturation-electronique-2026-guadeloupe',
    title: 'Facturation Électronique 2026 en Guadeloupe : le guide TPE/PME',
    excerpt: 'Dates, entreprises concernées, TVA DOM (8,5 % / 2,1 %), Chorus Pro, sanctions… Tout ce que les TPE/PME guadeloupéennes doivent savoir sur la réforme 2026.',
    date: '2026-06-17',
    readTime: '9 min',
    category: 'Conformité 2026',
    accent: '#2E8C92',     // pétrole (rappel FactuGP) — couverture/icônes
    textAccent: '#1F6E73', // pétrole assombri pour texte (AA sur crème)
    Icon: FileText,
  },
  {
    slug: 'prix-site-web-guadeloupe',
    title: 'Prix Création Site Web en Guadeloupe : le guide complet 2026',
    excerpt: 'Découvrez les vrais prix du marché guadeloupéen. Comparatif complet des agences, freelances et solutions DIY. De 599€ à 15 000€.',
    date: '2026-05-12',
    readTime: '12 min',
    category: 'Prix & Tarifs',
    accent: '#B8760A',     // or éditorial — couverture/icônes
    textAccent: '#96600A', // or assombri pour texte (AA sur crème)
    Icon: Tag,
  },
  {
    slug: 'application-web-vs-site-web-guadeloupe',
    title: 'Application web vs site web : quelle différence en Guadeloupe ?',
    excerpt: 'Site web ou application web ? Découvrez les différences, avantages et inconvénients pour faire le bon choix pour votre entreprise.',
    date: '2026-04-22',
    readTime: '10 min',
    category: 'Guides',
    accent: '#0E7C6B',     // teal caraïbe — couverture/icônes
    textAccent: '#0E7C6B', // teal (déjà AA sur crème : 4,57)
    Icon: GitCompare,
  },
]

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog SolYB - Création Site Web Guadeloupe',
    description: 'Conseils et guides pour créer son site web en Guadeloupe',
    url: 'https://solyb.fr/blog',
    publisher: { '@type': 'Organization', name: 'SolYB', address: { '@type': 'PostalAddress', addressLocality: 'Baie-Mahault', addressRegion: 'Guadeloupe', addressCountry: 'GP' } },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: 'var(--syb-warm)' }}>

        <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />

        {/* Hero */}
        <section className="pt-8 md:pt-10 pb-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-[11px] tracking-[2px] uppercase font-medium"
              style={{ background: 'rgba(196,71,42,0.08)', border: '0.5px solid rgba(196,71,42,0.2)', color: 'var(--syb-rust)' }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Ressources & guides
            </span>
            <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}>
              Blog création site web<br />
              <span style={{ color: 'var(--syb-rust)' }}>en Guadeloupe</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--syb-stone)' }}>
              Guides pratiques, comparatifs et conseils pour les entrepreneurs guadeloupéens qui souhaitent se lancer sur le web.
            </p>
          </div>
        </section>

        {/* Articles */}
        <section className="pb-16 px-6">
          <div className="reveal-stagger max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="group rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
                style={{ background: 'var(--syb-cream)', border: '0.5px solid var(--syb-border)' }}
              >
                {/* Couverture stylisée */}
                <Link href={`/blog/${a.slug}`} className="relative block h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${a.accent}, ${a.accent}bb)` }}>
                  <a.Icon
                    className="absolute -right-4 -bottom-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ width: 132, height: 132, color: 'rgba(255,255,255,0.16)' }}
                    strokeWidth={1.2}
                  />
                  <span className="absolute left-5 top-5 inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                    {a.category}
                  </span>
                  <a.Icon className="absolute left-5 bottom-5 w-7 h-7" style={{ color: 'rgba(255,255,255,0.9)' }} strokeWidth={1.6} />
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display font-bold mb-2 leading-snug transition-colors" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>
                    {a.title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed mb-5 flex-1" style={{ color: 'var(--syb-stone)', lineHeight: 1.6 }}>{a.excerpt}</p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--syb-stone-light)' }}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {a.readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${a.slug}`} className="inline-flex items-center gap-1.5 font-medium text-sm transition-transform hover:translate-x-0.5" style={{ color: a.textAccent }}>
                      Lire <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ background: 'var(--syb-cream)', borderTop: '0.5px solid var(--syb-border)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--syb-ink)' }}>Prêt à créer votre site web ?</h2>
            <p className="mb-8 font-light" style={{ color: 'var(--syb-stone)' }}>Site professionnel livré en 2 semaines, à partir de 599€.</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-medium text-base transition-transform hover:-translate-y-px"
              style={{ background: 'var(--syb-rust)', color: '#fff', padding: '15px 32px', borderRadius: '4px' }}
            >
              Demander un devis gratuit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
