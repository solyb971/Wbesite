import Image from "next/image"
import { BASSE_TERRE, DEPENDANCES, GRANDE_TERRE } from "./guadeloupe"

/**
 * Final, juste avant le contact : le papillon traverse l'écran, ses ailes
 * deviennent Basse-Terre et Grande-Terre, l'archipel se forme, puis le logo et
 * « SolYB » s'écrivent (chorégraphie dans VoyageController).
 * Rendu serveur : la carte déjà formée (.is-map), lisible sans script et en
 * mouvement réduit. Le script repose le papillon au départ de son vol.
 */
export default function Finale() {
  return (
    <section className="finale plain" data-scene="5" aria-label="Vos objectifs. Nos solutions.">
      <div className="finale-stage">
        <div className="finale-text">
          <div className="sign" aria-label="SolYB">
            {/* Le vrai logo remplace le rond provisoire « SYB » de la maquette ;
                le cercle rouille, lui, se trace toujours autour. */}
            <span className="lm" aria-hidden="true">
              <svg viewBox="0 0 80 80">
                <circle className="lm-ring" cx="40" cy="40" r="36" fill="none" stroke="#C4472A" strokeWidth="4" strokeLinecap="round" transform="rotate(-90 40 40)" />
              </svg>
              <Image className="lm-img" src="/logo/syb-orange.png" alt="" width={160} height={160} />
            </span>
            <span className="sign-name" aria-hidden="true">
              <span>S</span>
              <span>o</span>
              <span>l</span>
              <span className="r">Y</span>
              <span className="r">B</span>
              <i className="caret" />
            </span>
          </div>
          <h2>
            Vos objectifs. <em>Nos solutions.</em>
          </h2>
          <p>Fait en Guadeloupe. Pensé pour durer.</p>
        </div>

        <svg className="gp is-map" viewBox="0 0 600 534" aria-hidden="true">
          <defs>
            <filter id="bglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
              <feGaussianBlur className="halo2" in="SourceGraphic" stdDeviation="14" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="bfly" filter="url(#bglow)">
            <g className="wings">
              <path className="w-l" fill="#C4472A" stroke="#F08A6C" strokeWidth="1.6" strokeLinejoin="round" d={BASSE_TERRE} />
              <path className="w-r" fill="#C4472A" stroke="#F08A6C" strokeWidth="1.6" strokeLinejoin="round" d={GRANDE_TERRE} />
              <g className="spots" fill="#B8760A">
                <circle cx="85" cy="115" r="17" />
                <circle cx="315" cy="115" r="17" />
                <circle cx="100" cy="300" r="11" />
                <circle cx="300" cy="300" r="11" />
              </g>
            </g>
            <g className="body" style={{ fill: "var(--site-fg)" }}>
              <ellipse cx="200" cy="222" rx="7" ry="58" />
              <path d="M197 170 Q185 130 160 118 M203 170 Q215 130 240 118" style={{ stroke: "var(--site-fg)" }} strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          </g>
          <g className="isles" fill="#C4472A" stroke="#F08A6C" strokeWidth="1.6" strokeLinejoin="round" filter="url(#bglow)">
            {DEPENDANCES.map((ile) => <path key={ile.nom} d={ile.d} />)}
          </g>
        </svg>

        <a className="next" href="#contact">
          <span className="next-q">
            Vous avez un projet <em>en tête ?</em>
          </span>
          <span className="next-arrow" aria-hidden="true">
            <svg className="na" viewBox="0 0 80 120">
              <circle className="na-halo" cx="40" cy="92" r="30" fill="#B8760A" />
              <rect x="29" y="4" width="22" height="70" rx="11" fill="#C4472A" />
              <path className="na-flow" d="M40 14 V64" stroke="#F5F2ED" strokeWidth="4" strokeLinecap="round" strokeDasharray="9 13" fill="none" />
              <path d="M10 60 Q40 55 70 60 Q62 78 40 108 Q18 78 10 60Z" fill="#C4472A" />
              <path d="M22 64 Q40 62 58 64" stroke="#E0694B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
