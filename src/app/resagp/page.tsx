import { Metadata } from 'next'
import ResaGPPage from './ResaGPPage'

export const metadata: Metadata = {
  title: 'ResaGP — Plateforme de Gestion Restaurant Guadeloupe | Sans Commission',
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
    images: [{ url: '/logo/SolYB_PNG_PACK_FINAL/03_Color_On_White/og-image.jpg', width: 1200, height: 630, alt: 'ResaGP — Gestion Restaurant Guadeloupe' }],
  },
}

export default function Page() {
  return <ResaGPPage />
}
