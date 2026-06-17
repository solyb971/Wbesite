import { Metadata } from 'next'
import Hero from "@/components/site/Hero"
import ScrollRevealInit from "@/components/site/ScrollRevealInit"
import Stakes from "@/components/site/Stakes"
import Services from "@/components/site/Services"
import FeatureStats from "@/components/site/FeatureStats"
import Process from "@/components/site/Process"
import LaunchPricing from "@/components/site/LaunchPricing"
import Solutions from "@/components/site/Solutions"
import About from "@/components/site/About"
import Realisations from "@/components/site/Realisations"
import Engagements from "@/components/site/Engagements"
import FAQ from "@/components/site/FAQ"
import Contact from "@/components/site/Contact"
import { faqs } from "@/lib/faq-data"

export const metadata: Metadata = {
  // 54 chars — sans le suffixe template, affiché en entier dans Google
  title: { absolute: 'Agence Web Guadeloupe — Sites, Apps & Facturation 2026' },
  description: 'Agence digitale à Baie-Mahault (971). Sites web dès 599€, applications métier & facturation électronique 2026. Devis gratuit sous 24h.',
  keywords: [
    'agence digitale Guadeloupe',
    'création site web Guadeloupe',
    'facturation électronique Guadeloupe 2026',
    'application métier Guadeloupe',
    'développeur web Baie-Mahault',
    'site vitrine Guadeloupe 971',
    'conformité DGFiP Guadeloupe',
    'digitalisation TPE Guadeloupe',
  ],
  alternates: { canonical: 'https://solyb.fr' },
  openGraph: {
    title: 'Agence Web Guadeloupe — Sites, Apps & Facturation 2026',
    description: 'Sites web sur-mesure, applications métier et facturation électronique 2026 pour TPE/PME guadeloupéennes. Agence basée à Baie-Mahault. Devis gratuit.',
    url: 'https://solyb.fr',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SolYB — Agence Digitale Guadeloupe' }],
  },
}

export default function HomePage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SolYB — Agence Digitale Guadeloupe',
    image: 'https://solyb.fr/opengraph-image',
    '@id': 'https://solyb.fr',
    url: 'https://solyb.fr',
    telephone: '+590690711769',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Impasse la coulée verte, Moudong Nord',
      addressLocality: 'Baie-Mahault',
      addressRegion: 'Guadeloupe',
      postalCode: '97122',
      addressCountry: 'GP'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.2667,
      longitude: -61.5833
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/solyb',
      'https://www.linkedin.com/company/solyb'
    ],
    description: 'Agence digitale en Guadeloupe. Création de sites web sur-mesure, applications métier, facturation électronique obligatoire 2026 et SaaS pour TPE/PME. Ancrée à Baie-Mahault.',
    areaServed: [
      { '@type': 'City', name: 'Pointe-à-Pitre' },
      { '@type': 'City', name: 'Basse-Terre' },
      { '@type': 'City', name: 'Les Abymes' },
      { '@type': 'City', name: 'Baie-Mahault' },
      { '@type': 'City', name: 'Marie-Galante' },
      { '@type': 'AdministrativeArea', name: 'Guadeloupe' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Digitaux Guadeloupe',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Création de site web sur-mesure Guadeloupe',
            description: 'Conception de sites web professionnels pour TPE/PME en Guadeloupe. Design responsive, SEO local, hébergement inclus.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '599',
            priceCurrency: 'EUR',
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Facturation électronique conforme DGFiP Guadeloupe',
            description: 'Intégration et mise en conformité avec la réforme de facturation électronique obligatoire 2026. Solution PDP agréée pour entreprises guadeloupéennes.',
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Développement application métier Guadeloupe',
            description: 'Applications web et mobiles sur-mesure pour les entreprises de Guadeloupe. Gestion, réservation, commande, fidélisation.',
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Création SaaS et Marketplace Guadeloupe',
            description: 'Développement de plateformes SaaS et marketplaces de A à Z pour entrepreneurs guadeloupéens.',
          }
        },
      ]
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SolYB',
    url: 'https://solyb.fr',
    logo: 'https://solyb.fr/logo/syb-orange.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+590690711769',
      contactType: 'customer service',
      availableLanguage: 'French',
      areaServed: 'GP'
    },
    foundingDate: '2024',
    founders: [{ '@type': 'Person', name: 'Yacine Bouhassoun' }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Baie-Mahault',
      addressRegion: 'Guadeloupe',
      postalCode: '97122',
      addressCountry: 'GP'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="min-h-screen bg-[#0A0A0F]">
        <ScrollRevealInit />
        <Hero />
        <Stakes />
        <Services />
        <FeatureStats />
        <Process />
        <LaunchPricing />
        <Solutions />
        <About />
        <Realisations />
        <Engagements />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
