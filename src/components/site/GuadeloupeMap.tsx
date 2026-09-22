import type { CSSProperties } from "react"
import { COMMUNES, GUADELOUPE_HEIGHT, GUADELOUPE_VIEWBOX, GUADELOUPE_WIDTH, ILES } from "./guadeloupe-map"
import s from "./accueil.module.css"

/**
 * Silhouette de la Guadeloupe, en deux exemplaires qui se relaient :
 * - "canvas" : posée sur le canevas fixe (écrans larges uniquement). Le contour se
 *   trace au fil du défilement pendant qu'elle glisse vers la gauche, sans silhouette
 *   de fond : on ne la découvre en entier qu'à l'arrivée, quand le cadre du portrait
 *   d'« À propos » remonte jusqu'à elle ;
 * - "portrait" : dans ce cadre. Sur écran large, elle prend le relais pile à l'endroit
 *   où la première s'est arrêtée (elle défile alors avec la page, sans décalage) et
 *   scintille ; puis, au fil du défilement, elle descend un peu en se resserrant
 *   pendant qu'un cœur, du même trait que la côte, se trace autour d'elle. Sur téléphone, sans JavaScript
 *   ou en mouvement réduit, elle y est affichée dans cet état final, immobile.
 * Petit-Bourg (où est basé SolYB) reste allumé en or.
 *
 * Performance : couches graphiques propres, points en HTML animés en transform / opacity.
 */

// Délais volontairement irréguliers : les pulsations ne se synchronisent jamais.
const PINGS: { at: keyof typeof COMMUNES; delay: number }[] = [
  { at: "pointeAPitre", delay: 0 },
  { at: "deshaies", delay: 1.7 },
  { at: "leMoule", delay: 0.9 },
  { at: "basseTerre", delay: 3.1 },
  { at: "sainteAnne", delay: 4.3 },
  { at: "grandBourg", delay: 2.4 },
  { at: "sainteRose", delay: 5.2 },
  { at: "saintFrancois", delay: 3.7 },
]

const contourId = (id: string) => `gp-${id}`

// Cœur autour de l'île (repère 1 000 × 870, il en déborde largement) : au moins
// ~150 unités d'air entre lui et la côte partout — creux au-dessus de Grande-Terre,
// lobes au large de Basse-Terre et de la Désirade, flancs bien au-dessous des Saintes
// et de Marie-Galante. Boîte : x −240 → 1 320, y −220 → 1 300.
const COEUR =
  "M560 60C560 -80 430 -220 250 -220C40 -220 -240 -60 -240 230C-240 640 150 1000 560 1300" +
  "C970 1000 1320 640 1320 230C1320 -60 1080 -220 870 -220C690 -220 560 -80 560 60Z"

const percent = ([x, y]: readonly [number, number]) => ({
  left: `${(x / GUADELOUPE_WIDTH) * 100}%`,
  top: `${(y / GUADELOUPE_HEIGHT) * 100}%`,
})

/**
 * Le tracé, défini une seule fois dans la page et partagé par les deux exemplaires :
 * un chemin par île (pathLength 1), pour que le trait les parcoure l'une après l'autre.
 */
export function GuadeloupeSprite() {
  return (
    <svg className={s.mapSprite} aria-hidden focusable="false">
      <defs>
        {ILES.map((ile) => (
          <path key={ile.id} id={contourId(ile.id)} d={ile.d} pathLength={1} />
        ))}
      </defs>
    </svg>
  )
}

export default function GuadeloupeMap({ variant }: { variant: "canvas" | "portrait" }) {
  const [px, py] = COMMUNES.petitBourg
  return (
    <div
      className={`${s.map} ${variant === "canvas" ? s.mapCanvas : s.mapPortrait}`}
      data-map={variant}
      aria-hidden
    >
      <svg className={s.mapSvg} viewBox={GUADELOUPE_VIEWBOX} focusable="false">
        {/* Trait qui se dessine au scroll, île après île (--a / --b : part du tracé
            total occupée par l'île) ; la silhouette pleine et Petit-Bourg
            n'apparaissent qu'une fois le contour bouclé. */}
        <g className={s.mapReveal}>
          {ILES.map((ile) => (
            <use key={`f-${ile.id}`} href={`#${contourId(ile.id)}`} className={s.mapGhost} />
          ))}
        </g>
        {ILES.map((ile) => (
          <use
            key={`t-${ile.id}`}
            href={`#${contourId(ile.id)}`}
            className={s.mapDraw}
            style={{ "--a": ile.debut, "--b": ile.fin } as CSSProperties}
          />
        ))}
        <g className={s.mapReveal}>
          <circle className={s.mapHomeHalo} cx={px} cy={py} r={16} />
          <circle className={s.mapHome} cx={px} cy={py} r={8} />
        </g>
        {/* Dans le cadre seulement : le cœur qui se trace autour de l'île (--heart). */}
        {variant === "portrait" && <path className={s.mapHeart} d={COEUR} pathLength={1} />}
      </svg>
      <span className={s.mapHomePulse} style={percent(COMMUNES.petitBourg)} />
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
