"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"

export default function UrgencyBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem("urgencyBannerDismissed")
    if (dismissed) setIsDismissed(true)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem("urgencyBannerDismissed", "true")
  }

  if (isDismissed) return null

  return (
    <div className="relative bg-gradient-to-r from-solar-700 via-coral to-coral-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-2 font-semibold min-w-0">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Facturation électronique : la réforme est en cours — anticipez dès maintenant</span>
          <span className="hidden min-[375px]:inline sm:hidden text-xs truncate">Facturation électronique 2026 — anticipez !</span>
          <span className="inline min-[375px]:hidden text-xs">Factu. élec. 2026</span>
        </div>

        <a
          href="#facturation"
          className="bg-white text-coral px-2 min-[375px]:px-3 py-1 rounded-full text-xs font-bold hover:bg-[#F0EDE8] transition-colors whitespace-nowrap flex-shrink-0"
        >
          En savoir plus →
        </a>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
