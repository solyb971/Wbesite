"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, Check, CalendarCheck } from "lucide-react"

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Pas d'exit-intent sur mobile (pas d'événement mouseout)
    if (window.innerWidth < 768) return

    const popupShown = sessionStorage.getItem("exitPopupShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem("exitPopupShown", "true")
      }
    }

    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (lastScrollY > 500 && currentScrollY < lastScrollY - 100 && !hasShown) {
        setTimeout(() => {
          if (!hasShown && !sessionStorage.getItem("exitPopupShown")) {
            setIsVisible(true)
            setHasShown(true)
            sessionStorage.setItem("exitPopupShown", "true")
          }
        }, 500)
      }
      lastScrollY = currentScrollY
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasShown])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsVisible(false)}
      />

      {/* Popup */}
      <div className="relative bg-[#13131A] border border-[#2A2A38] rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden">
        {/* Close */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-[#8B8B9E] hover:text-[#F0EDE8] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-coral to-solar p-6 text-center">
          <div className="w-14 h-14 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CalendarCheck className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            Avant de partir...
          </h3>
          <p className="text-white/85 text-sm">
            Réservez votre audit digital gratuit — 30 minutes, sans engagement
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <ul className="space-y-3 mb-6">
            {[
              "Analyse de votre présence en ligne actuelle",
              "Vérification de votre conformité facturation 2026",
              "Recommandations concrètes adaptées à votre activité",
              "Réponse sous 24h — disponible dans tout le 971",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#8B8B9E]">
                <Check className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="mailto:contact@solyb.fr?subject=Demande%20d%27audit%20digital%20gratuit"
            className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-xl font-semibold text-base transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-coral/20"
          >
            Nous écrire pour l&apos;audit
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="text-center text-xs text-[#8B8B9E]/60 mt-4">
            Sans engagement — appel de 30 min en visio ou téléphone
          </p>
        </div>
      </div>
    </div>
  )
}
