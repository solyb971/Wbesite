import { Metadata } from 'next'
import Link from "next/link"
import { ArrowRight, Check, Sparkles, ShoppingCart, FileText, Zap, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: 'Services Web & Applications - SolYB Guadeloupe 971',
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
    images: [{ url: '/logo/SolYB_PNG_PACK_FINAL/03_Color_On_White/og-image.jpg', width: 1200, height: 630, alt: 'Services Web SolYB Guadeloupe' }],
  },
}

const services = [
  {
    icon: FileText,
    name: "Site Vitrine",
    tagline: "Votre carte de visite digitale",
    price: "599€",
    originalPrice: "999€",
    accentColor: "text-turquoise",
    borderColor: "border-turquoise/30",
    iconBg: "bg-turquoise/10",
    iconColor: "text-turquoise",
    description: "Un site web professionnel pour présenter votre activité, vos services et gagner en crédibilité auprès de vos clients en Guadeloupe.",
    features: ["Design unique, aucun template", "5 pages personnalisées", "Formulaire de contact", "SEO local Guadeloupe inclus", "Hébergement + domaine 1 an inclus", "Formation 2h en visio", "3 mois de support"],
    idealFor: ["Artisans", "Consultants", "Professions libérales", "Associations"],
    deliveryTime: "10-14 jours",
  },
  {
    icon: ShoppingCart,
    name: "Boutique E-commerce",
    tagline: "Vendez en ligne 24h/24",
    price: "999€",
    originalPrice: "1 699€",
    accentColor: "text-coral",
    borderColor: "border-coral/50",
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
    description: "Une boutique en ligne complète pour vendre vos produits en Guadeloupe et au-delà, avec paiement sécurisé intégré.",
    features: ["Tout du site vitrine +", "Catalogue produits illimité", "Paiement sécurisé (Stripe)", "Gestion des stocks", "Suivi des commandes", "Livraison configurable", "Formation e-commerce 4h"],
    idealFor: ["Commerces", "Artisans créateurs", "Producteurs locaux", "Boutiques"],
    deliveryTime: "14-21 jours",
    popular: true,
  },
  {
    icon: Sparkles,
    name: "Contenu IA",
    tagline: "Gagnez du temps sur vos contenus",
    price: "150€/mois",
    originalPrice: "250€/mois",
    accentColor: "text-solar",
    borderColor: "border-solar/30",
    iconBg: "bg-solar/10",
    iconColor: "text-solar",
    description: "Génération automatique de contenu optimisé pour vos réseaux sociaux, blog et newsletters — adapté au marché guadeloupéen.",
    features: ["20 posts réseaux sociaux/mois", "4 articles de blog/mois", "Calendrier éditorial", "Optimisé pour votre audience", "Relecture et validation", "Images générées", "Statistiques mensuelles"],
    idealFor: ["E-commerces", "Blogs", "Entreprises actives sur les réseaux"],
    deliveryTime: "Démarrage immédiat",
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
      <main className="min-h-screen bg-[#0A0A0F]">

        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-coral/10 border border-coral/20 text-coral px-4 py-2 rounded-full mb-8 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Offre de lancement — places limitées
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#F0EDE8] mb-6">
              Nos Services <span className="text-coral">Digitaux</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8B8B9E] max-w-2xl mx-auto">
              Des solutions web complètes et accessibles pour les TPE/PME guadeloupéennes.
              Formation, hébergement et support inclus.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className={`relative bg-[#13131A] border-2 ${s.borderColor} rounded-2xl p-8 flex flex-col ${s.popular ? 'lg:scale-[1.03]' : ''}`}>
                  {s.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-coral text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-coral/30">Plus populaire</span>
                    </div>
                  )}

                  <div className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>

                  <h2 className={`font-display text-2xl font-bold ${s.accentColor} mb-1`}>{s.name}</h2>
                  <p className="text-sm text-[#8B8B9E] mb-6">{s.tagline}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl font-bold text-[#F0EDE8]">{s.price}</span>
                      <span className="text-[#8B8B9E] line-through text-sm">{s.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-[#8B8B9E]" />
                      <span className="text-xs text-[#8B8B9E]">Livraison {s.deliveryTime}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#8B8B9E] leading-relaxed mb-6">{s.description}</p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#8B8B9E]">
                        <Check className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {s.idealFor.map((t, j) => (
                      <span key={j} className={`text-xs px-2 py-1 rounded-full border ${s.iconBg} ${s.accentColor} border-current/20`}>{t}</span>
                    ))}
                  </div>

                  <Link
                    href="/#contact"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      s.popular ? 'bg-coral hover:bg-coral-600 text-white shadow-lg shadow-coral/20' : 'bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] hover:border-coral/30'
                    }`}
                  >
                    Démarrer mon projet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D14] border-t border-[#2A2A38] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-4">Besoin d&apos;un projet sur mesure ?</h2>
            <p className="text-[#8B8B9E] mb-8">Je propose également des solutions personnalisées adaptées à vos besoins spécifiques.</p>
            <Link href="/#contact" className="btn-studio inline-flex items-center gap-2 bg-coral text-white px-8 py-4 font-bold text-lg shadow-xl shadow-coral/20">
              <span className="relative z-10 flex items-center gap-2">Discutons de votre projet <ArrowRight className="w-5 h-5" /></span>
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
