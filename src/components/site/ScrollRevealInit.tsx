"use client"

import { useEffect } from "react"

export default function ScrollRevealInit() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))

    const revealAll = () => elements.forEach((el) => el.classList.add("visible"))

    // Reduced motion ou IntersectionObserver indisponible → tout afficher direct.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      revealAll()
      return
    }

    // Filet de sécurité : si l'observer ne s'est pas déclenché (cas rare), on
    // force l'affichage de tout après un délai — jamais de section bloquée à 0.
    const failsafe = setTimeout(revealAll, 3000)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = parseInt(el.dataset.revealIndex ?? "0", 10)
          setTimeout(() => {
            el.classList.add("visible")
          }, index * 80)
          observer.unobserve(el)
        })
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  return null
}
