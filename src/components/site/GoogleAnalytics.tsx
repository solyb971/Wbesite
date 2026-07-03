'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { hasConsent, CONSENT_EVENT } from '@/components/site/CookieConsent'

// ID de mesure GA4 (format G-XXXXXXXXXX). Défini → GA actif ; absent → rien.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Google Analytics 4 — RGPD-friendly.
 *
 * Ne charge le script GA qu'APRÈS consentement (bandeau CookieConsent), avec
 * anonymisation IP. Tant que l'utilisateur n'a pas accepté, aucun traceur GA
 * n'est injecté. Une fois chargé, `window.gtag` est disponible pour le suivi
 * d'événements (ex: `generate_lead` dans les formulaires de contact).
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!GA_ID) return
    if (hasConsent()) {
      setEnabled(true)
      return
    }
    const onConsent = () => setEnabled(true)
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  if (!GA_ID || !enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
