import type { CSSProperties } from "react"
import { COMMUNES, GUADELOUPE_PATH, GUADELOUPE_VIEWBOX } from "./guadeloupe-map"
import s from "./accueil.module.css"

/**
 * Silhouette de la Guadeloupe qui se trace au chargement, puis des points qui
 * s'allument ici et là, comme des recherches en temps réel : l'accroche du hero,
 * illustrée. Petit-Bourg (où est basé SolYB) reste allumé en permanence.
 *
 * Pur CSS : aucun JavaScript, ne bloque ni le H1 ni l'accroche.
 * Mouvement réduit : contour déjà tracé, points fixes, sans pulsation.
 * Décoratif : masqué aux lecteurs d'écran.
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

export default function HeroMap() {
  const [px, py] = COMMUNES.petitBourg
  return (
    <svg className={s.heroMap} viewBox={GUADELOUPE_VIEWBOX} aria-hidden focusable="false">
      <path className={s.mapShape} d={GUADELOUPE_PATH} pathLength={1} />
      {PINGS.map(({ at, delay }) => {
        const [x, y] = COMMUNES[at]
        return (
          <g key={at} className={s.mapPing} style={{ "--pd": `${delay}s` } as CSSProperties}>
            <circle className={s.mapRing} cx={x} cy={y} r={9} />
            <circle className={s.mapDot} cx={x} cy={y} r={6} />
          </g>
        )
      })}
      <circle className={s.mapHomeHalo} cx={px} cy={py} r={16} />
      <circle className={s.mapHome} cx={px} cy={py} r={8} />
    </svg>
  )
}
