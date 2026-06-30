import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Code2, Database, Smartphone, Zap, Shield, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Application Web Sur Mesure Guadeloupe 971 | Développement',
  description: "Développement d'application web sur mesure en Guadeloupe : CRM, réservation, e-commerce avancé. React/Next.js. Hébergement local. Devis gratuit.",
  keywords: ['application web Guadeloupe', 'développement application 971', 'application sur mesure Guadeloupe', 'CRM Guadeloupe', 'logiciel web Guadeloupe'],
  alternates: { canonical: 'https://solyb.fr/application-web-guadeloupe' },
  openGraph: {
    title: 'Application Web Sur Mesure Guadeloupe 971 | SolYB',
    description: "Développement d'application web personnalisée en Guadeloupe. CRM, systèmes de réservation, plateformes e-learning.",
    url: 'https://solyb.fr/application-web-guadeloupe',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Développement Application Web Guadeloupe - SolYB' }],
  },
}

const features = [
  { icon: Code2, title: "Technologies modernes", desc: "React, Next.js, Node.js — les meilleures technologies pour des applications performantes." },
  { icon: Database, title: "Base de données robuste", desc: "PostgreSQL, Supabase — sécurité et performance garanties pour vos données." },
  { icon: Smartphone, title: "Responsive & mobile", desc: "Applications adaptées à tous les écrans — ordinateur, tablette, smartphone." },
  { icon: Shield, title: "Sécurité maximale", desc: "Authentification, chiffrement, sauvegardes automatiques." },
  { icon: Zap, title: "Performance optimale", desc: "Temps de chargement ultra-rapides, expérience utilisateur fluide." },
  { icon: TrendingUp, title: "Évolutive", desc: "Architecture modulaire permettant d'ajouter des fonctionnalités facilement." },
]

const useCases = [
  {
    title: "CRM sur mesure",
    desc: "Gestion de clients, suivi des ventes, automatisation des tâches.",
    price: "À partir de 2 500€",
    accent: "var(--syb-rust)",
    features: ["Gestion contacts & clients", "Pipeline de vente", "Tableaux de bord analytics", "Automatisation emails", "Intégration calendrier"],
  },
  {
    title: "Système de réservation",
    desc: "Réservations en ligne pour restaurants, hôtels, services.",
    price: "À partir de 1 800€",
    accent: "var(--syb-teal-deep)",
    features: ["Calendrier disponibilités", "Réservation en temps réel", "Paiement en ligne", "Notifications SMS/Email", "Gestion multi-utilisateurs"],
  },
  {
    title: "Plateforme e-learning",
    desc: "Formation en ligne, cours vidéo, quiz et certifications.",
    price: "À partir de 3 000€",
    accent: "var(--syb-gold)",
    features: ["Hébergement cours vidéo", "Quiz & évaluations", "Suivi progression", "Certificats automatiques", "Espace étudiant/formateur"],
  },
  {
    title: "Portail intranet",
    desc: "Espace collaboratif pour entreprises et associations.",
    price: "À partir de 2 000€",
    accent: "var(--syb-rust-deep)",
    features: ["Gestion documents", "Messagerie interne", "Gestion de projets", "Annuaire employés", "Permissions par rôle"],
  },
]

const steps = [
  { n: "1", title: "Analyse de vos besoins", desc: "Appel découverte gratuit de 30 min pour comprendre votre projet et vos objectifs." },
  { n: "2", title: "Devis détaillé", desc: "Proposition technique et financière sous 48h avec planning prévisionnel." },
  { n: "3", title: "Développement", desc: "Réalisation de votre application avec suivi hebdomadaire et démos régulières." },
  { n: "4", title: "Tests & formation", desc: "Tests complets, corrections, et formation de vos équipes à l'utilisation." },
  { n: "5", title: "Mise en ligne", desc: "Déploiement sur serveurs sécurisés avec support technique inclus." },
]

export default function ApplicationWebPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Application Web Sur Mesure',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '2000', priceCurrency: 'EUR', description: "Développement d'application web personnalisée" },
    creator: { '@type': 'Organization', name: 'SolYB', address: { '@type': 'PostalAddress', addressLocality: 'Baie-Mahault', addressRegion: 'Guadeloupe', postalCode: '97122', addressCountry: 'GP' } },
    areaServed: { '@type': 'Place', name: 'Guadeloupe' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: 'var(--syb-warm)' }}>

        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-[11px] tracking-[2px] uppercase font-medium"
              style={{ background: 'rgba(14,124,107,0.08)', border: '0.5px solid rgba(14,124,107,0.22)', color: 'var(--syb-teal-deep)' }}
            >
              <Code2 className="w-3.5 h-3.5" />
              Développement sur mesure
            </span>
            <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}>
              Applications web<br />
              <span style={{ color: 'var(--syb-rust)' }}>sur mesure en Guadeloupe</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-9" style={{ color: 'var(--syb-stone)' }}>
              Transformez vos processus métier avec une application web personnalisée. CRM, réservation, e-learning, portail intranet — on développe la solution qui répond exactement à vos besoins.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-medium text-base transition-transform hover:-translate-y-px"
              style={{ background: 'var(--syb-rust)', color: '#fff', padding: '15px 32px', borderRadius: '4px' }}
            >
              Demander un devis gratuit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6" style={{ background: 'var(--syb-cream)', borderTop: '0.5px solid var(--syb-border)', borderBottom: '0.5px solid var(--syb-border)' }}>
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display font-bold text-center mb-12" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--syb-ink)' }}>
              Pourquoi une application sur mesure ?
            </h2>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1" style={{ background: 'var(--syb-warm)', border: '0.5px solid var(--syb-border)' }}>
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(196,71,42,0.08)', border: '0.5px solid rgba(196,71,42,0.18)', color: 'var(--syb-rust)' }}>
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-display font-bold mb-2" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>{f.title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--syb-stone)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-6">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display font-bold text-center mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--syb-ink)' }}>
              Exemples d&apos;applications développées
            </h2>
            <p className="text-center font-light mb-12 max-w-xl mx-auto" style={{ color: 'var(--syb-stone)' }}>
              Des solutions concrètes pour des besoins réels d&apos;entreprises guadeloupéennes.
            </p>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((u) => (
                <div key={u.title} className="service-card group rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1" style={{ background: 'var(--syb-cream)', border: '0.5px solid var(--syb-border)' }}>
                  <div className="service-accent" style={{ height: '4px', background: u.accent }} />
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display font-bold mb-1" style={{ fontSize: '22px', color: 'var(--syb-ink)' }}>{u.title}</h3>
                    <p className="text-sm font-light mb-4" style={{ color: 'var(--syb-stone)' }}>{u.desc}</p>
                    <p className="font-display font-bold mb-5" style={{ fontSize: '18px', color: u.accent }}>{u.price}</p>
                    <ul className="flex flex-col gap-2 mb-6 flex-1">
                      {u.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm font-light" style={{ color: 'var(--syb-stone)', lineHeight: 1.45 }}>
                          <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: u.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 w-full text-sm font-normal transition-transform hover:-translate-y-px"
                      style={{ background: 'transparent', color: 'var(--syb-ink)', border: '0.5px solid var(--syb-ink)', padding: '11px 22px', borderRadius: '4px' }}
                    >
                      Discuter de ce projet <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-6" style={{ background: 'var(--syb-cream)', borderTop: '0.5px solid var(--syb-border)', borderBottom: '0.5px solid var(--syb-border)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-center mb-12" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--syb-ink)' }}>Comment ça marche ?</h2>
            <div className="reveal-stagger flex flex-col gap-3">
              {steps.map((s) => (
                <div key={s.n} className="flex items-start gap-5 rounded-xl p-5 transition-transform duration-300 hover:-translate-y-0.5" style={{ background: 'var(--syb-warm)', border: '0.5px solid var(--syb-border)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0" style={{ background: 'var(--syb-rust)', color: '#fff' }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display font-bold mb-1" style={{ fontSize: '17px', color: 'var(--syb-ink)' }}>{s.title}</h3>
                    <p className="text-sm font-light" style={{ color: 'var(--syb-stone)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--syb-ink)' }}>Prêt à digitaliser votre entreprise ?</h2>
            <p className="mb-8 font-light" style={{ color: 'var(--syb-stone)' }}>Discutons de votre projet lors d&apos;un appel découverte gratuit de 30 minutes.</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-medium text-base transition-transform hover:-translate-y-px"
              style={{ background: 'var(--syb-rust)', color: '#fff', padding: '15px 32px', borderRadius: '4px' }}
            >
              Réserver mon appel gratuit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
