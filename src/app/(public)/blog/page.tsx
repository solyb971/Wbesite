import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog Création Site Web Guadeloupe - Conseils & Actualités | SolYB',
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
    slug: 'prix-site-web-guadeloupe',
    title: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
    excerpt: 'Découvrez les vrais prix du marché guadeloupéen. Comparatif complet des agences, freelances et solutions DIY. De 599€ à 15 000€.',
    date: '2024-12-27',
    readTime: '12 min',
    category: 'Prix & Tarifs',
    accentColor: 'text-solar',
    accentBg: 'bg-solar/10',
    borderColor: 'border-solar/20',
  },
  {
    slug: 'application-web-vs-site-web-guadeloupe',
    title: 'Application Web vs Site Web : Quelle Différence en Guadeloupe ?',
    excerpt: 'Site web ou application web ? Découvrez les différences, avantages et inconvénients pour faire le bon choix pour votre entreprise.',
    date: '2024-12-27',
    readTime: '10 min',
    category: 'Guides',
    accentColor: 'text-turquoise',
    accentBg: 'bg-turquoise/10',
    borderColor: 'border-turquoise/20',
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
      <main className="min-h-screen bg-[#0A0A0F]">

        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-coral/10 border border-coral/20 text-coral px-4 py-2 rounded-full mb-8 text-sm font-semibold">
              <BookOpen className="w-4 h-4" />
              Ressources & Guides
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#F0EDE8] mb-6">
              Blog Création Site Web<br />
              <span className="text-coral">en Guadeloupe</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8B8B9E] max-w-2xl mx-auto">
              Guides pratiques, comparatifs et conseils pour entrepreneurs guadeloupéens
              qui souhaitent se lancer sur le web.
            </p>
          </div>
        </section>

        {/* Articles */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((a, i) => (
              <article key={i} className={`bg-[#13131A] border ${a.borderColor} rounded-2xl overflow-hidden hover:border-coral/30 transition-all group`}>
                {/* Image placeholder */}
                <div className={`h-48 ${a.accentBg} flex items-center justify-center border-b border-[#2A2A38]`}>
                  <BookOpen className={`w-16 h-16 ${a.accentColor} opacity-30`} />
                </div>

                <div className="p-7">
                  <span className={`inline-block ${a.accentBg} ${a.accentColor} border ${a.borderColor} px-3 py-1 rounded-full text-xs font-semibold mb-4`}>
                    {a.category}
                  </span>

                  <h2 className="font-display text-xl font-bold text-[#F0EDE8] mb-3 leading-snug group-hover:text-coral transition-colors">
                    {a.title}
                  </h2>

                  <p className="text-sm text-[#8B8B9E] leading-relaxed mb-5">{a.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#8B8B9E]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {a.readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${a.slug}`} className="inline-flex items-center gap-1.5 text-coral hover:text-coral-400 font-semibold text-sm transition-colors">
                      Lire <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D14] border-t border-[#2A2A38] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-[#F0EDE8] mb-4">Prêt à créer votre site web ?</h2>
            <p className="text-[#8B8B9E] mb-8">Site professionnel livré en 2 semaines à partir de 599€.</p>
            <Link href="/#contact" className="btn-studio inline-flex items-center gap-2 bg-coral text-white px-8 py-4 font-bold text-lg shadow-xl shadow-coral/20">
              <span className="relative z-10 flex items-center gap-2">Demander un devis gratuit <ArrowRight className="w-5 h-5" /></span>
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
