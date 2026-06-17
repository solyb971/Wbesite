'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'

/**
 * Anime un nombre de 0 vers sa valeur cible quand il entre dans le viewport.
 * Gère un préfixe/suffixe non numérique (ex. "5+", "14j", "3 mois", "100%").
 * Respecte prefers-reduced-motion (affiche directement la valeur finale).
 */
export default function CountUp({
  value,
  duration = 1400,
  className,
  style,
}: {
  value: string
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match?.[3] ?? ''

  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(match ? `${prefix}0${suffix}` : value)

  useEffect(() => {
    const node = ref.current
    if (!node || !match) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
          setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
