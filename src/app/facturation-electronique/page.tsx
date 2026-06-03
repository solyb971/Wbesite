import { Metadata } from 'next'
import FacturationPage from './FacturationPage'

export const metadata: Metadata = {
  title: 'SolYB Facturation — Logiciel de Facturation Électronique Guadeloupe DOM',
  description: 'Logiciel de facturation électronique conforme DGFiP pour les TPE/PME de Guadeloupe et des DOM. Chorus Pro, TVA DOM 8,5 %, Factur-X EN 16931, FEC. À partir de 0 €.',
  keywords: ['facturation électronique Guadeloupe','logiciel facturation DOM','Chorus Pro Guadeloupe','TVA DOM 8,5%','Factur-X 971','FEC DGFiP Guadeloupe','ISCA NF 525'],
  alternates: { canonical: 'https://solyb.fr/facturation-electronique' },
  openGraph: {
    title: 'SolYB Facturation — Logiciel de Facturation Électronique DOM',
    description: 'Facturation conforme DGFiP pour les TPE/PME de Guadeloupe. Chorus Pro, TVA DOM 8,5 % / 2,1 %, Factur-X EN 16931, FEC DGFiP. Plans dès 0 €.',
    url: 'https://solyb.fr/facturation-electronique',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{ url: '/logo/SolYB_PNG_PACK_FINAL/03_Color_On_White/og-image.jpg', width: 1200, height: 630, alt: 'SolYB Facturation Électronique Guadeloupe' }],
  },
}

export default function Page() {
  return <FacturationPage />
}
