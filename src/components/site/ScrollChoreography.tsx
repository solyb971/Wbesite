"use client"

import { useEffect } from "react"

/**
 * Chorégraphie de l'accueil :
 * - révélation au défilement des blocs marqués [data-reveal]
 *   (valeur "stagger" : cascade de STAGGER_MS entre éléments arrivés ensemble) ;
 * - tracé du parcours des réalisations ([data-timeline] / [data-timeline-seg]) ;
 * - dessin de la carte de la Guadeloupe posée sur le canevas ([data-canvas-map]).
 *
 * Garde-fous :
 * - rien n'est masqué tant que ce code n'a pas tourné : la classe html.reveal-on
 *   n'est posée qu'ici, après avoir laissé visible tout ce qui est déjà atteint ;
 *   sans JS, la page reste entièrement lisible et le parcours déjà tracé ;
 * - prefers-reduced-motion : ni révélation ni parcours (pas d'observer, pas d'écouteur) ;
 *   seule la carte est gérée, entièrement tracée et sans animation, pour qu'elle
 *   s'efface quand même avant « À propos » ;
 * - filet de sécurité : chaque seconde, tout bloc bien entré à l'écran mais pas encore
 *   révélé (observer défaillant, mesure faussée…) est révélé quand même.
 */
const STAGGER_MS = 90

export default function ScrollChoreography() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const stopMap = startMap(reduce)
    if (reduce) return stopMap

    const root = document.documentElement
    const pending = new Set<HTMLElement>()
    const reveal = (el: HTMLElement, delay = 0) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`)
      el.setAttribute("data-revealed", "")
      pending.delete(el)
    }

    // 1. Ce qui est déjà atteint (à l'écran, ou au-dessus après un lien /#contact) reste visible.
    const vh = window.innerHeight
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.setAttribute("data-revealed", "")
      else pending.add(el)
    })

    // 2. Alors seulement, l'état masqué devient possible pour le reste.
    root.classList.add("reveal-on")

    let io: IntersectionObserver | null = null
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          let order = 0
          entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
            .forEach((e) => {
              const el = e.target as HTMLElement
              reveal(el, el.dataset.reveal === "stagger" ? order++ * STAGGER_MS : 0)
              io?.unobserve(el)
            })
        },
        { rootMargin: "0px 0px -8% 0px" }
      )
      pending.forEach((el) => io?.observe(el))
    }

    // 3. Filet de sécurité
    const safety = window.setInterval(() => {
      if (!pending.size) return window.clearInterval(safety)
      const limit = window.innerHeight * 0.85
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          reveal(el)
          io?.unobserve(el)
        }
      })
    }, 1000)
    const revealAll = () => pending.forEach((el) => reveal(el))
    window.addEventListener("beforeprint", revealAll)

    const stopTimeline = startTimeline()

    return () => {
      io?.disconnect()
      window.clearInterval(safety)
      window.removeEventListener("beforeprint", revealAll)
      stopTimeline()
      stopMap()
      root.classList.remove("reveal-on")
    }
  }, [])

  return null
}

/** Trace le parcours Liberty → ResaGP → FactuGP au fil du défilement. */
function startTimeline(): () => void {
  const grid = document.querySelector<HTMLElement>("[data-timeline]")
  const segs = grid ? Array.from(grid.querySelectorAll<HTMLElement>("[data-timeline-seg]")) : []
  if (!grid || !segs.length) return () => {}

  const wide = window.matchMedia("(min-width: 860px)")
  const clamp = (n: number) => Math.min(1, Math.max(0, n))
  let raf = 0

  const update = () => {
    raf = 0
    const vh = window.innerHeight
    // Toutes les lectures d'abord, puis les écritures : pas de recalcul forcé entre les deux.
    let values: number[]
    if (wide.matches) {
      // Cartes sur une rangée : le trait avance de carte en carte pendant que la grille
      // monte de 85 % à 35 % de la hauteur de l'écran.
      const p = clamp((vh * 0.85 - grid.getBoundingClientRect().top) / (vh * 0.5))
      values = segs.map((_, i) => clamp(p * segs.length - i))
    } else {
      // Cartes empilées : chaque segment se trace en passant la ligne des 60 % de l'écran.
      values = segs.map((seg) => {
        const r = seg.getBoundingClientRect()
        return clamp((vh * 0.6 - r.top) / r.height)
      })
    }
    segs.forEach((seg, i) => seg.style.setProperty("--s", values[i].toFixed(3)))
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  // N'écoute le défilement que lorsque la section est proche de l'écran.
  let listening = false
  const near = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", schedule, { passive: true })
        listening = true
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", schedule)
        listening = false
      }
      schedule()
    },
    { rootMargin: "25% 0px" }
  )
  near.observe(grid)
  wide.addEventListener("change", schedule)
  window.addEventListener("resize", schedule, { passive: true })
  update()

  return () => {
    near.disconnect()
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", schedule)
    wide.removeEventListener("change", schedule)
    if (raf) cancelAnimationFrame(raf)
  }
}

/**
 * Carte de la Guadeloupe sur le canevas : se dessine sur les deux premiers écrans
 * de défilement (10 % déjà tracés en haut de page), puis s'efface avant « À propos ».
 * Les calculs n'utilisent que scrollY et des positions mesurées au redimensionnement :
 * aucune lecture de mise en page pendant le défilement.
 */
function startMap(reduce: boolean): () => void {
  const map = document.querySelector<HTMLElement>("[data-canvas-map]")
  if (!map) return () => {}
  const root = document.documentElement
  const about = document.getElementById("apropos")
  const wide = window.matchMedia("(min-width: 1100px)")
  const clamp = (n: number) => Math.min(1, Math.max(0, n))
  let aboutTop = Infinity
  let raf = 0

  const measure = () => {
    aboutTop = about ? about.getBoundingClientRect().top + window.scrollY : Infinity
  }
  const update = () => {
    raf = 0
    if (!wide.matches) return
    const y = window.scrollY
    const vh = window.innerHeight
    const draw = reduce ? 1 : clamp(0.1 + (0.9 * y) / (1.8 * vh))
    // Opaque jusqu'à 1,4 écran avant « À propos », invisible quand la section arrive à 90 %.
    const fade = clamp((aboutTop - vh * 0.9 - y) / (vh * 0.5))
    map.style.setProperty("--draw", draw.toFixed(3))
    map.style.setProperty("--map-o", fade.toFixed(3))
    // Les points ne pulsent qu'une fois le contour complet, et jamais carte effacée.
    if (!reduce) map.toggleAttribute("data-drawn", draw >= 1 && fade > 0)
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  const remeasure = () => {
    measure()
    schedule()
  }

  measure()
  update()
  root.classList.add("map-on")
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", remeasure, { passive: true })
  wide.addEventListener("change", remeasure)
  // La hauteur de page bouge (polices, images, FAQ ouverte) : on remesure.
  const ro = new ResizeObserver(remeasure)
  ro.observe(document.body)

  return () => {
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", remeasure)
    wide.removeEventListener("change", remeasure)
    ro.disconnect()
    if (raf) cancelAnimationFrame(raf)
    root.classList.remove("map-on")
  }
}
