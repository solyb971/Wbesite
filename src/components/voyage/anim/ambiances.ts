import gsap from "gsap"
import { rnd } from "./decor"

/**
 * Vie de chaque paysage (valeurs de la maquette), en boucles en pause : seul le
 * paysage à l'écran joue la sienne (voir allerA dans VoyageController).
 * En mouvement réduit, les boucles restent vides.
 */
export function creerAmbiances(S: HTMLElement[], reduce: boolean): gsap.core.Timeline[] {
  const ambiances = S.map(() => gsap.timeline({ paused: true }))
  if (reduce) return ambiances
  const q = (i: number, sel: string) => S[i].querySelector(sel)
  const qa = (i: number, sel: string) => S[i].querySelectorAll(sel)
  const pivot = (e: Element) => `${(e as HTMLElement).dataset.ox} ${(e as HTMLElement).dataset.oy}`

  // L'île : nuages, fumée du volcan, oiseaux de droite à gauche, soleil qui respire.
  ambiances[0]
    .to(qa(0, ".drift use"), { x: "+=90", duration: 24, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 3 }, 0)
    .to(q(0, ".smoke"), { x: 25, scaleX: 1.08, transformOrigin: "50% 50%", duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    .fromTo(q(0, ".birds"), { x: 700, y: 0 }, { x: -800, y: -60, duration: 22, ease: "none", repeat: -1 }, 0)
    .to(q(0, ".a-sun"), { attr: { r: 86 }, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)

  // La plage : nuages, bateau, vagues, écume, rivage, palmiers.
  ambiances[1]
    .to(qa(1, ".drift use"), { x: "+=120", duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 4 }, 0)
    .to(q(1, ".boat"), { y: 4, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    .to(qa(1, ".waves path"), { x: 60, opacity: 0.15, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.6 }, 0)
    .to(q(1, ".foamline"), { y: 10, opacity: 0.4, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    .to(q(1, ".shore"), { y: 6, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  qa(1, ".palm").forEach((p, k) =>
    ambiances[1].to(p.querySelector(".crown"), { rotation: k ? -5 : 4, svgOrigin: pivot(p), duration: 3 + k, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  )

  // La rivière : cascade, brume, ronds dans l'eau, feuillages.
  ambiances[2]
    .to(qa(2, ".fall path"), { strokeDashoffset: -160, duration: 0.9, ease: "none", repeat: -1 }, 0)
    .to(qa(2, ".mist ellipse"), { scaleX: 1.2, opacity: 0.15, transformOrigin: "50% 50%", duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.5 }, 0)
    .fromTo(qa(2, ".ripples ellipse"), { scale: 0.4, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 2.6, opacity: 0, duration: 3, ease: "power1.out", repeat: -1, stagger: 1 }, 0)
  qa(2, ".sway").forEach((g, k) =>
    ambiances[2].to(g, { rotation: k ? -4 : 4, svgOrigin: pivot(g), duration: 3.5 + k, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  )

  // La canne : fumée de la cheminée, tracteur tourné vers la gauche (roues qui
  // tournent), canne qui ondule.
  qa(3, ".smoke-d circle").forEach((c, k) =>
    ambiances[3].fromTo(c, { attr: { cy: 312, r: 12 }, opacity: 0.75, x: 0 }, { attr: { cy: 190, r: 34 }, opacity: 0, x: 40, duration: 5, ease: "sine.out", repeat: -1, delay: k }, 0)
  )
  ambiances[3]
    .fromTo(q(3, ".tractor"), { x: 0 }, { x: -2000, duration: 40, ease: "none", repeat: -1 }, 0)
    .to(q(3, ".tractor"), { y: -2, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
    .to(qa(3, ".tractor .wheel"), { rotation: 360, transformOrigin: "50% 50%", duration: 1.6, ease: "none", repeat: -1 }, 0)
  qa(3, ".stalk").forEach((s) => {
    const { x, y } = (s as SVGGElement).dataset
    ambiances[3].to(s, { rotation: rnd(2, 4.5), svgOrigin: `${x} ${y}`, duration: rnd(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1, delay: Number(x) / 900 }, 0)
  })

  // Deshaies au couchant : reflets, soleil, palmier.
  ambiances[4]
    .to(qa(4, ".glints rect"), { scaleX: 0.4, opacity: 0.4, transformOrigin: "50% 50%", duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.25, from: "random" } }, 0)
    .to(q(4, ".e-sun"), { attr: { r: 128 }, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)
  const palmier = q(4, ".palm")
  if (palmier)
    ambiances[4].to(palmier.querySelector(".crown"), { rotation: 3, svgOrigin: pivot(palmier), duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)

  // La nuit : étoiles, lumières des maisons, lucioles, feuillage.
  ambiances[5]
    .to(qa(5, ".stars circle"), { opacity: 0.15, duration: () => rnd(1, 2.6), ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.03, from: "random" } }, 0)
    .to(qa(5, ".lights circle"), { opacity: 0.4, duration: () => rnd(0.8, 1.8), ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.2, from: "random" } }, 0)
  qa(5, ".flies circle").forEach((f) =>
    ambiances[5].to(f, { x: () => rnd(-80, 80), y: () => rnd(-60, 40), opacity: () => rnd(0.2, 1), duration: () => rnd(2.5, 4.5), ease: "sine.inOut", yoyo: true, repeat: -1, repeatRefresh: true }, 0)
  )
  const feuillage = q(5, ".sway")
  if (feuillage)
    ambiances[5].to(feuillage, { rotation: -3, svgOrigin: pivot(feuillage), duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0)

  return ambiances
}
