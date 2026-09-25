import gsap from "gsap"
import type { Paysage } from "../Stage"
import { rnd } from "./decor"

type Recette = (tl: gsap.core.Timeline, q: (sel: string) => Element | null, qa: (sel: string) => NodeListOf<Element>) => void

const pivot = (e: Element) => `${(e as HTMLElement).dataset.ox} ${(e as HTMLElement).dataset.oy}`

/** Vie de chaque paysage, valeurs de la maquette, retrouvée par la clé du paysage. */
const RECETTES: Record<Paysage, Recette> = {
  // L'île : nuages, fumée du volcan, oiseaux de droite à gauche, soleil qui respire.
  ile: (tl, q, qa) => {
    tl.to(qa(".drift use"), { x: "+=90", duration: 24, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 3 }, 0)
      .to(q(".smoke"), { x: 25, scaleX: 1.08, transformOrigin: "50% 50%", duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
      .fromTo(q(".birds"), { x: 700, y: 0 }, { x: -800, y: -60, duration: 22, ease: "none", repeat: -1 }, 0)
      .to(q(".a-sun"), { attr: { r: 86 }, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  },
  // La plage : nuages, bateau, vagues, écume, rivage, palmiers.
  plage: (tl, q, qa) => {
    tl.to(qa(".drift use"), { x: "+=120", duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 4 }, 0)
      .to(q(".boat"), { y: 4, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
      .to(qa(".waves path"), { x: 60, opacity: 0.15, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.6 }, 0)
      .to(q(".foamline"), { y: 10, opacity: 0.4, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
      .to(q(".shore"), { y: 6, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    qa(".palm").forEach((p, k) =>
      tl.to(p.querySelector(".crown"), { rotation: k ? -5 : 4, svgOrigin: pivot(p), duration: 3 + k, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    )
  },
  // La rivière : cascade, brume, ronds dans l'eau, feuillages.
  riviere: (tl, q, qa) => {
    tl.to(qa(".fall path"), { strokeDashoffset: -160, duration: 0.9, ease: "none", repeat: -1 }, 0)
      .to(qa(".mist ellipse"), { scaleX: 1.2, opacity: 0.15, transformOrigin: "50% 50%", duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.5 }, 0)
      .fromTo(qa(".ripples ellipse"), { scale: 0.4, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 2.6, opacity: 0, duration: 3, ease: "power1.out", repeat: -1, stagger: 1 }, 0)
    qa(".sway").forEach((g, k) =>
      tl.to(g, { rotation: k ? -4 : 4, svgOrigin: pivot(g), duration: 3.5 + k, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    )
  },
  // La canne : fumée de la cheminée, tracteur tourné vers la gauche (roues qui
  // tournent), canne qui ondule.
  canne: (tl, q, qa) => {
    qa(".smoke-d circle").forEach((c, k) =>
      tl.fromTo(c, { attr: { cy: 312, r: 12 }, opacity: 0.75, x: 0 }, { attr: { cy: 190, r: 34 }, opacity: 0, x: 40, duration: 5, ease: "sine.out", repeat: -1, delay: k }, 0)
    )
    tl.fromTo(q(".tractor"), { x: 0 }, { x: -2000, duration: 40, ease: "none", repeat: -1 }, 0)
      .to(q(".tractor"), { y: -2, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
      .to(qa(".tractor .wheel"), { rotation: 360, transformOrigin: "50% 50%", duration: 1.6, ease: "none", repeat: -1 }, 0)
    qa(".stalk").forEach((s) => {
      const { x, y } = (s as SVGGElement).dataset
      tl.to(s, { rotation: rnd(2, 4.5), svgOrigin: `${x} ${y}`, duration: rnd(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1, delay: Number(x) / 900 }, 0)
    })
  },
  // Deshaies au couchant : reflets, soleil, palmier.
  couchant: (tl, q, qa) => {
    tl.to(qa(".glints rect"), { scaleX: 0.4, opacity: 0.4, transformOrigin: "50% 50%", duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.25, from: "random" } }, 0)
      .to(q(".e-sun"), { attr: { r: 128 }, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    const palmier = q(".palm")
    if (palmier)
      tl.to(palmier.querySelector(".crown"), { rotation: 3, svgOrigin: pivot(palmier), duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  },
  // La nuit : étoiles, lumières des maisons, lucioles, feuillage.
  nuit: (tl, q, qa) => {
    tl.to(qa(".stars circle"), { opacity: 0.15, duration: () => rnd(1, 2.6), ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.03, from: "random" } }, 0)
      .to(qa(".lights circle"), { opacity: 0.4, duration: () => rnd(0.8, 1.8), ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.2, from: "random" } }, 0)
    qa(".flies circle").forEach((f) =>
      tl.to(f, { x: () => rnd(-80, 80), y: () => rnd(-60, 40), opacity: () => rnd(0.2, 1), duration: () => rnd(2.5, 4.5), ease: "sine.inOut", yoyo: true, repeat: -1, repeatRefresh: true }, 0)
    )
    const feuillage = q(".sway")
    if (feuillage)
      tl.to(feuillage, { rotation: -3, svgOrigin: pivot(feuillage), duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  },
}

/**
 * Une boucle d'ambiance par paysage présent (même ordre que les scènes), en pause :
 * c'est l'appelant qui joue celle du paysage à l'écran. En mouvement réduit, les
 * boucles restent vides.
 */
export function creerAmbiances(scenes: HTMLElement[], reduce: boolean): gsap.core.Timeline[] {
  return scenes.map((scene) => {
    const tl = gsap.timeline({ paused: true })
    const recette = RECETTES[scene.dataset.paysage as Paysage]
    if (!reduce && recette) recette(tl, (sel) => scene.querySelector(sel), (sel) => scene.querySelectorAll(sel))
    return tl
  })
}
