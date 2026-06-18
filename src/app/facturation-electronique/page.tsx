import { Metadata } from 'next'
import FacturationPage from './FacturationPage'

export const metadata: Metadata = {
  title: 'SolYB Facturation — Logiciel de Facturation Électronique Guadeloupe DOM',
  description: 'Logiciel de facturation électronique au format DGFiP (Factur-X EN 16931) pour les TPE/PME de Guadeloupe et des DOM. TVA DOM 8,5 % / 2,1 %, export FEC. Agrément Plateforme Agréée en cours. Dès 29 €/mois.',
  keywords: ['facturation électronique Guadeloupe','logiciel facturation DOM','Chorus Pro Guadeloupe','TVA DOM 8,5%','Factur-X 971','FEC DGFiP Guadeloupe','ISCA NF 525'],
  alternates: { canonical: 'https://solyb.fr/facturation-electronique' },
  openGraph: {
    title: 'SolYB Facturation — Logiciel de Facturation Électronique DOM',
    description: 'Facturation au format DGFiP pour les TPE/PME de Guadeloupe. TVA DOM 8,5 % / 2,1 %, Factur-X EN 16931, export FEC. Agrément Plateforme Agréée en cours. Dès 29 €/mois.',
    url: 'https://solyb.fr/facturation-electronique',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SolYB Facturation Électronique Guadeloupe' }],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FactuGP',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://solyb.fr/facturation-electronique',
  description: 'Logiciel de facturation électronique au format DGFiP pour les TPE/PME de Guadeloupe et des DOM : Factur-X EN 16931, TVA DOM 8,5 % / 2,1 %, export FEC. Compatible format Chorus Pro DOM ; agrément Plateforme Agréée (PA) et e-reporting en cours d\'obtention.',
  inLanguage: 'fr',
  provider: { '@type': 'Organization', name: 'SolYB', url: 'https://solyb.fr' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Guadeloupe' },
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '29', priceCurrency: 'EUR', category: 'Abonnement mensuel' },
    { '@type': 'Offer', name: 'Pro', price: '49', priceCurrency: 'EUR', category: 'Abonnement mensuel' },
    { '@type': 'Offer', name: 'Expert', price: '79', priceCurrency: 'EUR', category: 'Abonnement mensuel' },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://solyb.fr' },
    { '@type': 'ListItem', position: 2, name: 'Facturation électronique', item: 'https://solyb.fr/facturation-electronique' },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FacturationPage />
    </>
  )
}
