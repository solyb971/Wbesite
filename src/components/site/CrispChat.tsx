"use client"

import { useEffect } from "react"
import { Crisp, ChatboxColors } from "crisp-sdk-web"
import { hasConsent, CONSENT_EVENT } from "@/components/site/CookieConsent"

// Get your Website ID from Crisp Dashboard > Settings > Website Settings
const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || ""

export default function CrispChat() {
  useEffect(() => {
    if (!CRISP_WEBSITE_ID) {
      console.warn("Crisp: Missing NEXT_PUBLIC_CRISP_WEBSITE_ID in environment variables")
      return
    }

    let loaded = false
    const loadCrisp = () => {
      if (loaded) return
      loaded = true
      Crisp.configure(CRISP_WEBSITE_ID)
      Crisp.setColorTheme(ChatboxColors.DeepOrange)
    }

    // RGPD : ne charger Crisp (cookies/traceurs) qu'après consentement.
    if (hasConsent()) {
      loadCrisp()
      return
    }

    // Sinon, attendre l'acceptation du bandeau de cookies.
    window.addEventListener(CONSENT_EVENT, loadCrisp)
    return () => window.removeEventListener(CONSENT_EVENT, loadCrisp)
  }, [])

  return null
}
