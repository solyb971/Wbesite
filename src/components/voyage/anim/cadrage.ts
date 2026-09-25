/**
 * Cadrage des paysages selon l'écran. Écran étroit (mise en page mobile, sous
 * 900 px) : on ne voit qu'une bande du dessin 1600×900, et les cartes, calées en
 * bas, en couvrent la plus grande part. Chaque paysage est donc recadré autour de
 * son point d'intérêt (data-foyer), borné aux limites du dessin, et remonté si ce
 * point est dessiné trop bas (data-foyer-y) : il vient à 23 % de la hauteur, au
 * milieu de la bande libre entre la navigation et le haut des cartes. Le sol
 * prolongé sous y = 900 comble alors le bas. Au-delà de 900 px, cadrage de la
 * maquette : centré, calé en bas.
 * Recadre tout de suite et à chaque redimensionnement ; renvoie de quoi arrêter.
 */
const HAUT_LIBRE = 0.23 * 900 // en unités du dessin, quelle que soit la hauteur d'écran

export function cadrerPaysages(stage: HTMLElement, scenes: HTMLElement[]): () => void {
  const cadrer = () => {
    const etroit = window.innerWidth < 900
    const largeur = Math.min(1600, (900 * stage.clientWidth) / Math.max(1, stage.clientHeight))
    scenes.forEach((scene) => {
      const svg = scene.querySelector("svg")
      if (!svg) return
      const foyer = Number(scene.dataset.foyer)
      if (!etroit || !foyer || largeur >= 1600) {
        svg.setAttribute("viewBox", "0 0 1600 900")
      } else {
        const x = Math.min(1600 - largeur, Math.max(0, foyer - largeur / 2))
        const hauteur = Number(scene.dataset.foyerY)
        const y = hauteur ? Math.min(360, Math.max(0, hauteur - HAUT_LIBRE)) : 0
        svg.setAttribute("viewBox", `${x.toFixed(1)} ${y.toFixed(1)} ${largeur.toFixed(1)} 900`)
      }
      svg.setAttribute("preserveAspectRatio", "xMidYMax slice")
    })
  }
  cadrer()
  window.addEventListener("resize", cadrer)
  return () => window.removeEventListener("resize", cadrer)
}
