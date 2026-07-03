'use client'

import { useEffect } from 'react'

/**
 * Îlot client : observe les éléments portant `revealClass` et leur ajoute
 * `revealedClass` quand ils entrent dans le viewport. Permet de garder la page
 * en server component tout en conservant l'animation d'apparition au scroll.
 * Les classes (hashées par CSS Modules) sont passées depuis le server component.
 */
export default function RevealOnScroll({
  revealClass,
  revealedClass,
  threshold = 0.12,
}: {
  revealClass: string
  revealedClass: string
  threshold?: number
}) {
  useEffect(() => {
    if (!revealClass) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(revealedClass)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold }
    )
    document.querySelectorAll('.' + revealClass).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [revealClass, revealedClass, threshold])

  return null
}
