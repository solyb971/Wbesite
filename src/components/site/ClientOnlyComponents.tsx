'use client'
import dynamic from 'next/dynamic'

const SmoothScroll    = dynamic(() => import('@/components/ui/SmoothScroll'),        { ssr: false })
const WhatsAppButton  = dynamic(() => import('@/components/site/WhatsAppButton'),    { ssr: false })
const CookieConsent   = dynamic(() => import('@/components/site/CookieConsent'),     { ssr: false })
const GoogleAnalytics = dynamic(() => import('@/components/site/GoogleAnalytics'),   { ssr: false })

export function ClientBackground() {
  return <SmoothScroll />
}

/**
 * Accueil : la page porte son propre défilement (Lenis) et son contact, donc ni
 * défilement global ni bulle WhatsApp — mais le consentement et la mesure restent.
 */
export function ClientLegalExtras() {
  return (
    <>
      <CookieConsent />
      <GoogleAnalytics />
    </>
  )
}

export function ClientFooterExtras() {
  return (
    <>
      <WhatsAppButton />
      <CookieConsent />
      <GoogleAnalytics />
    </>
  )
}
