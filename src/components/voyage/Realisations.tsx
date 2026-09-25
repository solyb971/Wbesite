import Link from "next/link"

/** Planning ResaGP : une ligne par créneau, une colonne par table (b1 à b3 : réservé). */
const CRENEAUX = [
  ["12h", ["b1", "", "b2", "b1", ""]],
  ["13h", ["b1", "b3", "b2", "", "b3"]],
  ["19h", ["", "b2", "b1", "b1", "b2"]],
  ["20h", ["b3", "b1", "", "b2", "b1"]],
  ["21h", ["b2", "", "b3", "b1", ""]],
] as const

const FACTURES = [
  ["F-2026-0142", "Transmise"],
  ["F-2026-0141", "Transmise"],
  ["F-2026-0140", "En attente"],
  ["F-2026-0139", "Transmise"],
] as const

/**
 * Réalisations : une bande horizontale, épinglée et pilotée par le défilement
 * vertical (VoyageController). Sans script, elle se fait défiler au doigt.
 */
export default function Realisations() {
  return (
    <section className="work chapter-h" id="realisations" data-scene="1">
      <div className="track">
        <div className="card work-intro">
          <h2>
            Nos <em>créations</em>
          </h2>
          <p className="lede">
            Un projet client livré et en ligne, ainsi que nos deux outils maison conçus pour la Guadeloupe.
          </p>
          <p className="counter">
            <span>
              <b className="count-now">1</b> / 3 projets, continuez à défiler
            </span>
            <i aria-hidden="true">→</i>
          </p>
        </div>

        <article className="card proj">
          <div className="browser" aria-hidden="true">
            <div className="bbar"><i /><i /><i /><span>libertydriveserenity.com</span></div>
            <div className="bbody m-lds">
              <div className="list">
                <div className="row on"><b>Tournée du matin</b>4 patients</div>
                <div className="row"><b>Consultation</b>Aller-retour</div>
                <div className="row"><b>Soin à domicile</b>Devis envoyé</div>
              </div>
              <div className="map">
                <svg viewBox="0 0 200 150">
                  <path d="M20 130 C60 110 40 60 90 60 S150 90 170 30" fill="none" stroke="#C4472A" strokeWidth="4" strokeLinecap="round" />
                  <g fill="#00BFA5"><circle cx="20" cy="130" r="6" /><circle cx="90" cy="60" r="6" /><circle cx="170" cy="30" r="6" /></g>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <div className="tags">
              <span className="tag tag--live">Projet réel · en ligne</span>
              <span className="tag">Transport &amp; Santé</span>
            </div>
            <h3>Liberty Drive Serenity</h3>
            <p>
              Une plateforme qui met en relation des soignants et des chauffeurs professionnels pour organiser leurs
              tournées du quotidien. Un espace professionnel de santé, un espace chauffeur, avec devis en ligne et
              gestion des rendez-vous.
            </p>
            <ul>
              <li>En ligne et active au quotidien</li>
              <li>Espace soignants + espace chauffeurs</li>
              <li>Devis et rendez-vous intégrés</li>
            </ul>
            <a className="link" href="https://libertydriveserenity.com/" target="_blank" rel="noopener">
              Voir le projet → (nouvel onglet)
            </a>
          </div>
        </article>

        <article className="card proj">
          <div className="browser" aria-hidden="true">
            <div className="bbar"><i /><i /><i /><span>solyb.fr/resagp</span></div>
            <div className="bbody m-resa">
              <span className="h" />
              {["T1", "T2", "T3", "T4", "T5"].map((t) => <span key={t} className="h">{t}</span>)}
              {CRENEAUX.map(([heure, tables]) => [
                <span key={heure} className="h">{heure}</span>,
                ...tables.map((b, i) => <span key={`${heure}-${i}`} className={b || undefined} />),
              ])}
            </div>
          </div>
          <div>
            <div className="tags">
              <span className="tag tag--brand">Bientôt disponible</span>
              <span className="tag">Outil maison</span>
            </div>
            <h3>ResaGP</h3>
            <p>Réservations restaurant, sans commission. Plan de salle, rappels SMS automatiques, fiches clients.</p>
            <ul>
              <li>Aucune commission par couvert</li>
              <li>Pensé pour restaurants et bars</li>
            </ul>
            <Link className="link" href="/resagp">Rejoindre la liste d&apos;attente →</Link>
          </div>
        </article>

        <article className="card proj">
          <div className="browser" aria-hidden="true">
            <div className="bbar"><i /><i /><i /><span>solyb.fr/facturation-electronique</span></div>
            <div className="bbody m-factu">
              <div className="kpis">
                <div className="kpi">Factures<b>Suivies</b></div>
                <div className="kpi">TVA 8,5 %<b>Auto</b></div>
                <div className="kpi">DGFiP<b>Conforme</b></div>
              </div>
              <div className="lines">
                {FACTURES.map(([numero, etat]) => (
                  <div key={numero} className="line">
                    <span>{numero}</span>
                    <span className={etat === "En attente" ? "pill o" : "pill"}>{etat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="tags">
              <span className="tag tag--brand">Disponible sept. 2026</span>
              <span className="tag">Outil maison</span>
            </div>
            <h3>FactuGP</h3>
            <p>Facturation électronique conforme 2026. TVA Guadeloupe préconfigurée, envoi automatique aux impôts.</p>
            <ul>
              <li>Conforme réforme DGFiP 2026</li>
              <li>Pensé pour TPE/PME du 971</li>
            </ul>
            <Link className="link" href="/facturation-electronique">Rejoindre la liste d&apos;attente →</Link>
          </div>
        </article>
      </div>
    </section>
  )
}
