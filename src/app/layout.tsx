import type { Metadata } from "next"
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solyb.fr'),
  title: {
    // 55 chars max pour ne pas être tronqué par Google
    default: 'SolYB — Agence Digitale Guadeloupe 971',
    template: '%s | SolYB Guadeloupe'
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
  // Ajoute ton vrai code après avoir créé le compte sur search.google.com/search-console
  // verification: { google: 'TON_CODE_ICI' },
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
      <body className={`${playfair.variable} ${jakarta.variable} font-sans`}>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var path = window.location.pathname;
              var isPrivate = path.startsWith('/admin') || path.startsWith('/login') || path.startsWith('/auth');
              if (isPrivate) return;
              var done = sessionStorage.getItem('splash_done');
              var isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
              if (!done && !isMobile) {
                var el = document.createElement('div');
                el.id = 'splash-block';
                el.style.cssText = 'position:fixed;inset:0;background:#0a0a0f;z-index:99999;';
                document.documentElement.appendChild(el);
              }
            } catch(e) {}
          })();
        `}} />
        {children}
      </body>
    </html>
  )
}
