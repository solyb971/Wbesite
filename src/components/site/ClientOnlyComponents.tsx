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
 * Accueil, /merci et index du blog : ces pages portent leur propre défilement,
 * donc pas de défilement global. Consentement et mesure restent ; la bulle
 * WhatsApp n'apparaît qu'à la fin de la page (contact de l'accueil, sinon pied de
 * page), pour ne pas se superposer aux animations.
 */
export function ClientExtrasVoyage() {
  return (
    <>
      <WhatsAppButton apparitionApres="#contact, footer" />
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
