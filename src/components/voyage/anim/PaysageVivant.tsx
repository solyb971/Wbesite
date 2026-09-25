"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { creerAmbiances } from "./ambiances"
import { cadrerPaysages } from "./cadrage"
import { genererDecor } from "./decor"

gsap.registerPlugin(useGSAP)

/**
 * Décor des pages de lecture (merci, blog) : un seul paysage, fixe, qui vit
 * (nuages, vagues, reflets…), sans rien de ce qui alourdit l'accueil — ni
 * changement de paysage au défilement, ni défilement lissé, ni épinglage, ni
 * curseur main. Recadré sur mobile comme sur l'accueil, figé en mouvement réduit,
 * à l'arrêt quand l'onglet est caché. Tout est défait au démontage.
 */
export default function PaysageVivant() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".voyage")
    const stage = root?.querySelector<HTMLElement>(".stage")
    if (!root || !stage) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const scenes = Array.from(stage.querySelectorAll<HTMLElement>(".scene"))
    const defaire = [genererDecor(root), cadrerPaysages(stage, scenes)]
    creerAmbiances(scenes, reduce).forEach((tl) => tl.play())
    const visibilite = () => (document.hidden ? gsap.ticker.sleep() : gsap.ticker.wake())
    document.addEventListener("visibilitychange", visibilite)
    defaire.push(() => document.removeEventListener("visibilitychange", visibilite))
    return () => defaire.reverse().forEach((f) => f())
  })
  return null
}
