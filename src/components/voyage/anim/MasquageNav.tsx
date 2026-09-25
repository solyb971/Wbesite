"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

gsap.registerPlugin(useGSAP)

/** Défilement (px) à partir duquel un changement de sens compte : ignore les tremblements. */
const SEUIL = 8
/** En deçà (px), tout en haut de la page, la barre reste toujours là. */
const HAUT = 80

/**
 * La barre de navigation s'efface quand on descend, pour laisser les scènes et les
 * cartes occuper l'écran, et revient dès qu'on remonte. Elle reste visible en haut
 * de page et quand le focus clavier y entre.
 */
export default function MasquageNav() {
  useGSAP(() => {
    const nav = document.querySelector<HTMLElement>(".voyage .nav")
    if (!nav) return
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Même centrage que la chorégraphie de l'accueil : GSAP garde la main sur le transform.
    gsap.set(nav, { xPercent: -50, x: 0 })

    let cachee = false
    const basculer = (cacher: boolean) => {
      if (cacher === cachee) return
      cachee = cacher
      gsap.to(nav, {
        yPercent: cacher ? -160 : 0,
        duration: reduit ? 0 : cacher ? 0.35 : 0.5,
        ease: cacher ? "power2.in" : "expo.out",
        overwrite: "auto",
      })
    }

    let dernier = window.scrollY
    let image = 0
    const lire = () => {
      image = 0
      const y = window.scrollY
      if (y < HAUT) {
        basculer(false)
        dernier = y
        return
      }
      if (Math.abs(y - dernier) < SEUIL) return
      basculer(y > dernier && !nav.contains(document.activeElement))
      dernier = y
    }
    const surDefilement = () => {
      if (!image) image = requestAnimationFrame(lire)
    }
    const surFocus = () => basculer(false)

    window.addEventListener("scroll", surDefilement, { passive: true })
    nav.addEventListener("focusin", surFocus)
    return () => {
      cancelAnimationFrame(image)
      window.removeEventListener("scroll", surDefilement)
      nav.removeEventListener("focusin", surFocus)
    }
  })
  return null
}
