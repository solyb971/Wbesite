'use client'
import dynamic from 'next/dynamic'

const SmoothScroll    = dynamic(() => import('@/components/ui/SmoothScroll'),        { ssr: false })
const WhatsAppButton  = dynamic(() => import('@/components/site/WhatsAppButton'),    { ssr: false })
const CookieConsent   = dynamic(() => import('@/components/site/CookieConsent'),     { ssr: false })
const GoogleAnalytics = dynamic(() => import('@/components/site/GoogleAnalytics'),   { ssr: false })

export function ClientBackground() {
  return <SmoothScroll />
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
