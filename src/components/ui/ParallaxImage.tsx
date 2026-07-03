'use client'

import { ReactNode, useEffect, useRef } from 'react'

/**
 * Applique un léger décalage vertical (parallax) à son contenu en fonction de la
 * position de scroll. Le contenu doit être légèrement sur-dimensionné (scale)
 * pour que le décalage ne révèle pas les bords. Respecte prefers-reduced-motion.
 */
export default function ParallaxImage({
  children,
  intensity = 24,
  className,
}: {
  children: ReactNode
  intensity?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress ≈ -1 (élément sous le viewport) → 1 (au-dessus)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      el.style.setProperty('--parallax', `${(-progress * intensity).toFixed(1)}px`)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [intensity])

  return (
    <div ref={ref} className={className} style={{ height: '100%' }}>
      {children}
    </div>
  )
}
