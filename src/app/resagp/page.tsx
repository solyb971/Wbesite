import { Metadata } from 'next'
import ResaGPPage from './ResaGPPage'

export const metadata: Metadata = {
  title: 'ResaGP — Réservations Restaurant Guadeloupe, sans commission',
  description: 'Logiciel de réservation en ligne pour restaurants en Guadeloupe. Sans commission par couvert, conforme RGPD, opérationnel en 5 minutes. Alternative française à Zenchef / TheFork. Essai gratuit 14 jours.',
  keywords: ['réservation restaurant Guadeloupe','logiciel restauration DOM','gestion restaurant sans commission','alternative TheFork Guadeloupe','CRM restaurant','plan de salle restaurant','widget réservation'],
  alternates: { canonical: 'https://solyb.fr/resagp' },
  openGraph: {
    title: 'ResaGP — Gestion Restaurant Tout-en-Un | Sans Commission',
    description: 'Alternative française à Zenchef / TheFork Manager. Sans commission, conforme RGPD, opérationnel en moins de 5 minutes. Essai gratuit 14 jours sans carte bancaire.',
    url: 'https://solyb.fr/resagp',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ResaGP — Gestion Restaurant Guadeloupe' }],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ResaGP',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://solyb.fr/resagp',
  description: 'Plateforme de gestion de restaurant pour la Guadeloupe : réservation en ligne, plan de salle interactif, CRM clients, encaissement. Sans commission par couvert, conforme RGPD.',
  inLanguage: 'fr',
  provider: { '@type': 'Organization', name: 'SolYB', url: 'https://solyb.fr' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Guadeloupe' },
  offers: [
    { '@type': 'Offer', name: 'Essentiel', price: '59', priceCurrency: 'EUR', category: 'Abonnement mensuel' },
    { '@type': 'Offer', name: 'Pro', price: '99', priceCurrency: 'EUR', category: 'Abonnement mensuel' },
    { '@type': 'Offer', name: 'Business', price: '149', priceCurrency: 'EUR', category: 'Abonnement mensuel' },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://solyb.fr' },
    { '@type': 'ListItem', position: 2, name: 'ResaGP', item: 'https://solyb.fr/resagp' },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ResaGPPage />
    </>
  )
}
