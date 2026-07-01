import type { Metadata } from "next"
import { Fraunces, DM_Sans } from "next/font/google"
import { Analytics } from '@vercel/analytics/next'
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["100", "300", "700", "900"],
  style: ["normal", "italic"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solyb.fr'),
  title: {
    // 55 chars max pour ne pas être tronqué par Google
    default: 'SolYB — Agence Digitale Guadeloupe 971',
    template: '%s | SolYB'
  },
  description: 'Agence digitale à Baie-Mahault, Guadeloupe. Sites web sur-mesure, applications métier et facturation électronique 2026 pour TPE/PME. Devis gratuit sous 24h.',
  keywords: [
    'agence digitale Guadeloupe',
    'création site web Guadeloupe',
    'site internet 971',
    'facturation électronique Guadeloupe',
    'facturation électronique 2026',
    'conformité DGFiP Guadeloupe',
    'application métier Guadeloupe',
    'développeur web Baie-Mahault',
    'site vitrine Guadeloupe',
    'agence web Antilles',
    'SaaS Guadeloupe',
    'digitalisation TPE Guadeloupe',
    'e-commerce Guadeloupe',
  ],
  authors: [{ name: 'Yacine Bouhassoun', url: 'https://solyb.fr' }],
  creator: 'SolYB',
  publisher: 'SolYB',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',                          // fr_GP non standard — fr_FR mieux reconnu
    url: 'https://solyb.fr',
    siteName: 'SolYB Guadeloupe',
    title: 'SolYB — Agence Digitale Guadeloupe 971',
    description: 'Sites web, applications métier et facturation électronique 2026 pour TPE/PME guadeloupéennes. Agence basée à Baie-Mahault. Devis gratuit sous 24h.',
    images: [
      {
        // Image OG dédiée 1200×630 à créer dans /public/og-image.jpg
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SolYB — Agence Digitale Guadeloupe — Sites Web, Applications, Facturation',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolYB — Agence Digitale Guadeloupe 971',
    description: 'Sites web sur-mesure, applications métier, facturation électronique 2026. Agence guadeloupéenne basée à Baie-Mahault.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://solyb.fr',
  },
  // Vérification Google Search Console : colle ton code dans la variable
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Vercel). Absente = pas de balise.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SolYB",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF6B47",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${dmSans.variable} font-sans`}>
        {/* Pose la classe `.js` avant le rendu des sections : l'état masqué des
            animations `.reveal` n'est appliqué que si JS est actif. Sans JS
            (désactivé / bundle en échec), le contenu reste visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
