import { Metadata } from 'next'
import Link from "next/link"
import { ArrowRight, Check, Globe, ShoppingCart, Smartphone } from "lucide-react"
import Breadcrumbs from "@/components/site/Breadcrumbs"

export const metadata: Metadata = {
  title: 'Services Web & Applications en Guadeloupe 971',
  description: 'Sites vitrines (599€), e-commerce (999€), applications web sur mesure en Guadeloupe. Technologie React/Next.js. Livraison 2 semaines. Devis gratuit.',
  keywords: ['services web Guadeloupe', 'création site vitrine 971', 'e-commerce Guadeloupe', 'application web sur mesure', 'développement web Guadeloupe'],
  alternates: { canonical: 'https://solyb.fr/services' },
  openGraph: {
    title: 'Services Web & Applications - SolYB Guadeloupe',
    description: 'Sites vitrines dès 599€, e-commerce dès 999€, applications sur mesure. Développement web professionnel en Guadeloupe.',
    url: 'https://solyb.fr/services',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Services Web SolYB Guadeloupe' }],
  },
}

const services = [
  {
    Icon: Globe,
    name: "Site Vitrine",
    tagline: "Votre carte de visite digitale",
    accent: "var(--syb-rust)",
    price: "599€",
    originalPrice: "999€",
    description: "Un site professionnel pour présenter votre activité et gagner en crédibilité auprès de votre clientèle locale.",
    features: ["Design unique, aucun template", "5 pages personnalisées", "Référencement local Guadeloupe", "Hébergement + domaine 1 an inclus", "Formation 2h en visio", "3 mois de support"],
    idealFor: ["Artisans", "Consultants", "Professions libérales", "Associations"],
    deliveryTime: "10–14 jours",
    href: "/?service=vitrine#contact",
    cta: "Demander un devis gratuit",
  },
  {
    Icon: ShoppingCart,
    name: "Boutique E-commerce",
    tagline: "Vendez en ligne 24h/24",
    accent: "var(--syb-rust-light)",
    price: "999€",
    originalPrice: "1 699€",
    description: "Une boutique en ligne complète pour vendre en Guadeloupe et au-delà, avec paiement sécurisé intégré.",
    features: ["Tout du site vitrine, inclus", "Catalogue produits illimité", "Paiement sécurisé (Stripe)", "Gestion des stocks & commandes", "Livraison configurable en GP", "Formation e-commerce 4h"],
    idealFor: ["Commerces", "Artisans créateurs", "Producteurs locaux", "Boutiques"],
    deliveryTime: "14–21 jours",
    href: "/?service=ecommerce#contact",
    cta: "Demander un devis gratuit",
    popular: true,
  },
  {
    Icon: Smartphone,
    name: "Application Métier",
    tagline: "Un logiciel fait pour votre métier",
    accent: "var(--syb-rust-deep)",
    price: "Sur devis",
    originalPrice: null,
    description: "CRM, réservation, portail, e-learning… On construit de zéro la solution qui correspond exactement à votre logique métier.",
    features: ["Cahier des charges sur-mesure", "Architecture React / Next.js", "Base de données robuste", "Intégrations (paiement, email…)", "Évolutif dans le temps", "Devis détaillé sous 24h"],
    idealFor: ["TPE/PME", "Réseaux & franchises", "Secteurs réglementés"],
    deliveryTime: "Selon le projet",
    href: "/application-web-guadeloupe",
    cta: "Découvrir les applications",
  },
]

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Création de site web',
    provider: { '@type': 'LocalBusiness', name: 'SolYB', address: { '@type': 'PostalAddress', addressLocality: 'Baie-Mahault', addressRegion: 'Guadeloupe', postalCode: '97122', addressCountry: 'GP' } },
    areaServed: { '@type': 'Place', name: 'Guadeloupe' },
    offers: [
      { '@type': 'Offer', name: 'Site Vitrine Professionnel', price: '599', priceCurrency: 'EUR', description: 'Site vitrine responsive avec hébergement' },
      { '@type': 'Offer', name: 'Site E-commerce', price: '999', priceCurrency: 'EUR', description: 'Boutique en ligne complète avec paiement sécurisé' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: 'var(--syb-warm)' }}>

        <Breadcrumbs items={[{ name: 'Services', href: '/services' }]} />

        {/* Hero */}
        <section className="pt-8 md:pt-10 pb-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-[11px] tracking-[2px] uppercase font-medium"
              style={{ background: 'rgba(196,71,42,0.08)', border: '0.5px solid rgba(196,71,42,0.2)', color: 'var(--syb-rust)' }}
            >
              Offre de lancement — places limitées
            </span>
            <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}>
              Nos services <span style={{ color: 'var(--syb-rust)' }}>digitaux</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--syb-stone)' }}>
              Des solutions web complètes pour les TPE/PME guadeloupéennes. Formation, hébergement et support inclus — vous restez propriétaire à 100 %.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="pb-16 px-6">
          <div className="reveal-stagger max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {services.map((s) => (
              <div
                key={s.name}
                className="service-card group rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
                style={{ border: s.popular ? '0.5px solid rgba(196,71,42,0.4)' : '0.5px solid var(--syb-border)', background: 'var(--syb-cream)' }}
              >
                <div className="service-accent" style={{ height: '4px', background: s.accent }} />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(196,71,42,0.08)', border: '0.5px solid rgba(196,71,42,0.18)', color: s.accent }}
                    >
                      <s.Icon size={20} strokeWidth={1.6} />
                    </span>
                    {s.popular ? (
                      <span className="text-[10px] tracking-[1.5px] uppercase rounded-full px-2.5 py-1 font-medium" style={{ background: 'var(--syb-rust)', color: '#fff' }}>
                        Plus populaire
                      </span>
                    ) : (
                      <span className="text-[11px] tracking-[2px] uppercase" style={{ color: 'var(--syb-stone-light)' }}>
                        {s.tagline}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display font-bold mb-1" style={{ fontSize: '22px', color: 'var(--syb-ink)' }}>{s.name}</h2>
                  {s.popular && (
                    <p className="text-[11px] tracking-[2px] uppercase mb-3" style={{ color: 'var(--syb-stone-light)' }}>{s.tagline}</p>
                  )}

                  {/* Prix */}
                  <div className="flex items-baseline gap-2 mb-1 mt-2">
                    <span className="font-display font-black" style={{ fontSize: '32px', color: 'var(--syb-ink)', letterSpacing: '-1px' }}>{s.price}</span>
                    {s.originalPrice && (
                      <span className="line-through text-sm" style={{ color: 'var(--syb-stone-light)' }}>{s.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-xs mb-4" style={{ color: 'var(--syb-stone-light)' }}>Livraison {s.deliveryTime}</p>

                  <p className="text-xs font-light leading-relaxed mb-5" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>{s.description}</p>

                  <ul className="flex flex-col gap-2 mb-5 flex-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs font-light" style={{ color: 'var(--syb-stone)', lineHeight: 1.45 }}>
                        <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--syb-rust-light)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.idealFor.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-1 rounded-full" style={{ background: 'rgba(196,71,42,0.06)', border: '0.5px solid var(--syb-border)', color: 'var(--syb-stone)' }}>{t}</span>
                    ))}
                  </div>

                  <Link
                    href={s.href}
                    className="inline-flex items-center justify-center gap-2 w-full text-sm font-normal transition-transform hover:-translate-y-px"
                    style={
                      s.popular
                        ? { background: 'var(--syb-rust)', color: '#fff', padding: '11px 22px', borderRadius: '4px' }
                        : { background: 'transparent', color: 'var(--syb-ink)', border: '0.5px solid var(--syb-ink)', padding: '11px 22px', borderRadius: '4px' }
                    }
                  >
                    {s.cta} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Réassurance */}
          <p className="reveal mt-8 text-xs font-light text-center" style={{ color: 'var(--syb-stone-light)' }}>
            Paiement en 2 fois (50 % à la commande, 50 % à la livraison) · Devis gratuit · Sans engagement
          </p>
        </section>

        {/* CTA final */}
        <section className="py-20 px-6 text-center" style={{ background: 'var(--syb-cream)', borderTop: '0.5px solid var(--syb-border)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--syb-ink)' }}>
              Besoin d&apos;un projet sur mesure ?
            </h2>
            <p className="mb-8 font-light" style={{ color: 'var(--syb-stone)' }}>
              On part de vous, de votre marché et de votre métier pour construire la solution la plus adaptée à vos besoins.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-medium text-base transition-transform hover:-translate-y-px"
              style={{ background: 'var(--syb-rust)', color: '#fff', padding: '15px 32px', borderRadius: '4px' }}
            >
              Discutons de votre projet <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
