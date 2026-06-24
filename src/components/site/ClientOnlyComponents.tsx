'use client'
import dynamic from 'next/dynamic'

const ConstellationsCanvas = dynamic(() => import('@/components/ui/ConstellationsCanvas'), { ssr: false })
const SplashScreen        = dynamic(() => import('@/components/ui/SplashScreen'),        { ssr: false })
const SmoothScroll        = dynamic(() => import('@/components/ui/SmoothScroll'),        { ssr: false })
const CustomCursor        = dynamic(() => import('@/components/site/CustomCursor'),      { ssr: false })
const WhatsAppButton      = dynamic(() => import('@/components/site/WhatsAppButton'),    { ssr: false })
const CookieConsent       = dynamic(() => import('@/components/site/CookieConsent'),     { ssr: false })
const ExitIntentPopup     = dynamic(() => import('@/components/site/ExitIntentPopup'),   { ssr: false })

export function ClientBackground() {
  return (
    <>
      <SmoothScroll />
    </>
  )
}

export function ClientFooterExtras() {
  return (
    <>
      <WhatsAppButton />
      <CookieConsent />
      {/* <ExitIntentPopup /> */}
    </>
  )
}
