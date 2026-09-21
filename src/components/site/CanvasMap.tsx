import type { CSSProperties } from "react"
import { COMMUNES, GUADELOUPE_HEIGHT, GUADELOUPE_PATH, GUADELOUPE_VIEWBOX, GUADELOUPE_WIDTH } from "./guadeloupe-map"
import s from "./accueil.module.css"

/**
 * Silhouette de la Guadeloupe posée sur le canevas fixe de l'accueil.
 * Elle se dessine au fil du défilement (--draw, piloté par ScrollChoreography),
 * puis des points s'allument ici et là, comme des recherches en temps réel.
 * Petit-Bourg (où est basé SolYB) reste allumé en permanence.
 *
 * Performance : le conteneur a sa propre couche graphique (le fond du canevas
 * n'est jamais repeint) et les points qui pulsent sont en HTML, animés en
 * transform / opacity, donc hors du thread principal.
 *
 * Masquée sans JavaScript : fixe à l'écran, elle ne saurait pas s'effacer avant
 * la section « À propos » dont le texte passerait dessus.
 * Mouvement réduit : contour entièrement tracé, points fixes, aucune animation.
 * Décorative : le canevas parent est aria-hidden.
 */

// Délais volontairement irréguliers : les pulsations ne se synchronisent jamais,
// 2 à 4 points visibles à la fois sur un cycle de 6 s.
const PINGS: { at: keyof typeof COMMUNES; delay: number }[] = [
  { at: "pointeAPitre", delay: 0 },
  { at: "deshaies", delay: 1.7 },
  { at: "leMoule", delay: 0.9 },
  { at: "basseTerre", delay: 3.1 },
  { at: "sainteAnne", delay: 4.3 },
  { at: "grandBourg", delay: 2.4 },
  { at: "sainteRose", delay: 5.2 },
]

const percent = ([x, y]: readonly [number, number]) => ({
  left: `${(x / GUADELOUPE_WIDTH) * 100}%`,
  top: `${(y / GUADELOUPE_HEIGHT) * 100}%`,
})

export default function CanvasMap() {
  const [px, py] = COMMUNES.petitBourg
  return (
    <div className={s.canvasMap} data-canvas-map>
      <svg className={s.mapSvg} viewBox={GUADELOUPE_VIEWBOX} focusable="false">
        <defs>
          <path id="gp-contour" d={GUADELOUPE_PATH} pathLength={1} />
        </defs>
        {/* Filigrane toujours visible, puis trait lumineux qui se dessine au scroll */}
        <use href="#gp-contour" className={s.mapGhost} />
        <use href="#gp-contour" className={s.mapDraw} />
        <circle className={s.mapHomeHalo} cx={px} cy={py} r={16} />
        <circle className={s.mapHome} cx={px} cy={py} r={8} />
      </svg>
      {PINGS.map(({ at, delay }) => (
        <span
          key={at}
          className={s.mapPing}
          style={{ ...percent(COMMUNES[at]), "--pd": `${delay}s` } as CSSProperties}
        />
      ))}
    </div>
  )
}
