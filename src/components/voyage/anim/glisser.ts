import gsap from "gsap"
import type Lenis from "lenis"

/**
 * Curseur main (souris uniquement) : on attrape la page pour la faire défiler,
 * avec de l'élan au relâchement ; sur les réalisations, un glisser horizontal
 * fait avancer la bande. Liens, boutons et champs gardent leur comportement,
 * et rien ne change au doigt. Renvoie de quoi tout débrancher.
 */
export function activerGlisser(lenis: Lenis | null): () => void {
  const html = document.documentElement
  html.classList.add("drag-ready")
  const ignorer = (t: EventTarget | null) =>
    t instanceof Element && !!t.closest("a,button,input,textarea,select,label,summary,.rail,.nav")

  type Prise = { x: number; y: number; start: number; lx: number; ly: number; t: number; v: number; moved: boolean; work: boolean }
  let prise: Prise | null = null
  let vientDeGlisser = false
  const position = () => (lenis ? lenis.scroll : window.scrollY)

  const appui = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || ignorer(e.target)) return
    e.preventDefault()
    const work = e.target instanceof Element && !!e.target.closest(".work")
    prise = { x: e.clientX, y: e.clientY, start: position(), lx: e.clientX, ly: e.clientY, t: performance.now(), v: 0, moved: false, work }
  }

  const deplacement = (e: PointerEvent) => {
    if (!prise) return
    const dx = e.clientX - prise.x
    const dy = e.clientY - prise.y
    if (!prise.moved) {
      if (Math.hypot(dx, dy) < 5) return
      prise.moved = true
      html.classList.add("dragging")
    }
    const horiz = prise.work && Math.abs(dx) > Math.abs(dy)
    const d = horiz ? dx * 1.3 : dy
    const now = performance.now()
    prise.v = -(horiz ? (e.clientX - prise.lx) * 1.3 : e.clientY - prise.ly) / Math.max(8, now - prise.t)
    prise.t = now
    prise.lx = e.clientX
    prise.ly = e.clientY
    const cible = prise.start - d
    if (lenis) lenis.scrollTo(cible, { immediate: true, force: true })
    else window.scrollTo(0, cible)
  }

  const fin = () => {
    if (!prise) return
    if (prise.moved) {
      html.classList.remove("dragging")
      vientDeGlisser = true
      window.setTimeout(() => (vientDeGlisser = false), 0)
      const elan = gsap.utils.clamp(-1400, 1400, prise.v * 380)
      const cible = position() + elan
      if (lenis) lenis.scrollTo(cible, { duration: 1.1 })
      else window.scrollTo({ top: cible, behavior: "smooth" })
    }
    prise = null
  }

  // Un glisser ne doit pas finir en clic sur ce qui se trouvait sous la souris.
  const clic = (e: MouseEvent) => {
    if (vientDeGlisser) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
  const pasDeGlisserNatif = (e: DragEvent) => e.preventDefault()

  window.addEventListener("pointerdown", appui)
  window.addEventListener("pointermove", deplacement)
  window.addEventListener("pointerup", fin)
  window.addEventListener("pointercancel", fin)
  window.addEventListener("click", clic, true)
  window.addEventListener("dragstart", pasDeGlisserNatif)

  return () => {
    window.removeEventListener("pointerdown", appui)
    window.removeEventListener("pointermove", deplacement)
    window.removeEventListener("pointerup", fin)
    window.removeEventListener("pointercancel", fin)
    window.removeEventListener("click", clic, true)
    window.removeEventListener("dragstart", pasDeGlisserNatif)
    html.classList.remove("drag-ready", "dragging")
  }
}
