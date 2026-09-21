import type { CSSProperties } from "react"
import { COMMUNES, GUADELOUPE_HEIGHT, GUADELOUPE_VIEWBOX, GUADELOUPE_WIDTH, ILES } from "./guadeloupe-map"
import s from "./accueil.module.css"

/**
 * Silhouette de la Guadeloupe qui se dessine au fil du défilement (--draw, piloté
 * par ScrollChoreography), puis des points qui s'allument ici et là, comme des
 * recherches en temps réel. Petit-Bourg (où est basé SolYB) reste allumé en or.
 *
 * Posée sur le canevas fixe, à droite, là où aucun texte ne passe : écrans larges
 * uniquement (≥ 1 100 px). Sur téléphone et tablette, une carte fixe passerait
 * derrière chaque ligne de texte, et un bloc dans le flux ne serait vu qu'un instant :
 * elle n'y est pas affichée. Masquée aussi sans JavaScript (elle ne saurait pas
 * s'effacer à temps avant « À propos »).
 *
 * Performance : couche graphique propre, points en HTML animés en transform / opacity.
 * Mouvement réduit : contour entièrement tracé, points fixes, aucune animation.
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

const contourId = (id: string) => `gp-${id}`

const percent = ([x, y]: readonly [number, number]) => ({
  left: `${(x / GUADELOUPE_WIDTH) * 100}%`,
  top: `${(y / GUADELOUPE_HEIGHT) * 100}%`,
})

export default function GuadeloupeMap() {
  const [px, py] = COMMUNES.petitBourg
  return (
    <div className={s.map} data-map aria-hidden>
      <svg className={s.mapSvg} viewBox={GUADELOUPE_VIEWBOX} focusable="false">
        {/* Un chemin par île (pathLength 1), pour que le trait les parcoure l'une après l'autre. */}
        <defs>
          {ILES.map((ile) => (
            <path key={ile.id} id={contourId(ile.id)} d={ile.d} pathLength={1} />
          ))}
        </defs>
        {/* Filigrane toujours visible, puis trait lumineux qui se dessine au scroll,
            île après île (--a / --b : part du tracé total occupée par l'île) */}
        {ILES.map((ile) => (
          <use key={`f-${ile.id}`} href={`#${contourId(ile.id)}`} className={s.mapGhost} />
        ))}
        {ILES.map((ile) => (
          <use
            key={`t-${ile.id}`}
            href={`#${contourId(ile.id)}`}
            className={s.mapDraw}
            style={{ "--a": ile.debut, "--b": ile.fin } as CSSProperties}
          />
        ))}
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
