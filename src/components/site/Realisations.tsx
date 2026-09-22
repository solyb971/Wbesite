import Image from "next/image"
import { realisations } from "@/lib/realisations-data"
import s from "./accueil.module.css"

const lds = realisations[0]

type Card = {
  name: string
  status: string
  live: boolean
  sub: string
  description: string
  points: string[]
  image: string
  alt: string
  /** Fond visible le temps que la capture charge. */
  tint: string
  cta: { label: string; href: string; external?: boolean }
  sizes: string
}

const cards: Card[] = [
  {
    name: lds.client,
    status: "Projet réel · en ligne",
    live: true,
    sub: lds.sector,
    description:
      "Une plateforme qui met en relation des soignants et des chauffeurs professionnels pour organiser leurs tournées du quotidien. Un espace pro de santé, un espace chauffeur — devis en ligne et gestion des rendez-vous.",
    points: ["En ligne et active au quotidien", "Espace soignants + espace chauffeurs", "Devis et rendez-vous intégrés"],
    image: lds.image,
    alt: "Page d'accueil de Liberty Drive Serenity, plateforme de transport pour les tournées de soins",
    tint: "linear-gradient(155deg, #20323C, #0E1B21)",
    cta: { label: "Voir le projet", href: lds.url ?? "#contact", external: true },
    sizes: "(min-width: 860px) 420px, 100vw",
  },
  {
    name: "ResaGP",
    status: "Bientôt disponible",
    live: false,
    sub: "Outil maison",
    description: "Réservations restaurant — sans commission. Plan de salle, rappels SMS automatiques, fiches clients.",
    points: ["Aucune commission par couvert", "Pensé pour restaurants et bars"],
    image: "/resagp/demo/02_planning.png",
    alt: "Planning des réservations dans ResaGP, l'outil de réservation pour restaurants",
    tint: "linear-gradient(155deg, #3A2216, #1A1410)",
    cta: { label: "Rejoindre la liste d'attente", href: "/resagp" },
    sizes: "(min-width: 860px) 330px, 100vw",
  },
  {
    name: "FactuGP",
    status: "Disponible sept. 2026",
    live: false,
    sub: "Outil maison",
    description: "Facturation électronique conforme 2026. TVA Guadeloupe préconfigurée, envoi automatique aux impôts.",
    points: ["Conforme réforme DGFiP 2026", "Pensé pour TPE/PME du 971"],
    image: "/factugp/demo/demo-02-dashboard.jpeg",
    alt: "Tableau de bord de FactuGP, l'outil de facturation électronique",
    tint: "linear-gradient(155deg, #1E2A20, #101810)",
    cta: { label: "Rejoindre la liste d'attente", href: "/facturation-electronique" },
    sizes: "(min-width: 860px) 330px, 100vw",
  },
]

export default function Realisations() {
  return (
    <section id="realisations" className={s.section}>
      <div className={s.wrap}>
        <div className={s.sectionHead} data-reveal>
          <span className={s.eyebrow}>Nos réalisations</span>
          <h2>
            Ce qu&apos;on a <em>déjà construit.</em>
          </h2>
          <p>Un projet client livré et en ligne — et nos deux outils maison, conçus pour la Guadeloupe.</p>
        </div>

        <div className={s.realGrid} data-timeline>
          {cards.map((card, i) => (
            <article key={card.name} className={`${s.panel} ${s.realCard} ${s.lift}`} data-reveal="stagger">
              {/* Parcours Liberty → ResaGP → FactuGP, tracé au défilement */}
              <span className={s.tlDot} data-live={card.live} aria-hidden />
              {i < cards.length - 1 && (
                <span className={s.tlTrack} data-timeline-seg aria-hidden>
                  <span className={s.tlFill} />
                </span>
              )}
              <div className={s.realVisual} style={{ background: card.tint }}>
                <div className={s.chrome} aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={s.shot}>
                  <Image src={card.image} alt={card.alt} fill sizes={card.sizes} />
                </div>
              </div>

              <div className={s.realBody}>
                <span className={`${s.status} ${card.live ? s.statusLive : s.statusSoon}`}>
                  <span className={`${s.dot} ${card.live ? s.dotLive : s.dotSoon}`} aria-hidden />
                  {card.status}
                </span>
                <span className={s.sub}>{card.sub}</span>
                <h3>{card.name}</h3>
                <p className={s.desc}>{card.description}</p>
                <ul className={s.dashList}>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <a
                  className={s.cardLink}
                  href={card.cta.href}
                  {...(card.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {card.cta.label} <span aria-hidden>→</span>
                  {card.cta.external && <span className="sr-only"> (nouvel onglet)</span>}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
