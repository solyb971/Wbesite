const OFFRES = [
  {
    genre: "Le plus demandé",
    chaud: true,
    titre: "Site Vitrine",
    prix: "Dès 599€",
    detail:
      "Site 5 pages adapté au mobile, référencement local Guadeloupe, hébergement + domaine 1 an, formation 1h, 3 révisions.",
  },
  {
    genre: "Vente en ligne",
    titre: "E-commerce",
    prix: "Dès 999€",
    detail:
      "Boutique complète et autonome, paiement en ligne sécurisé, gestion de la livraison en GP, formation 1h30, support 2 mois.",
  },
  {
    genre: "Sur mesure",
    titre: "Application Métier",
    prix: "Sur devis",
    detail: "Cahier des charges sur-mesure, conçu pour votre métier, évolutif dans le temps. Devis détaillé sous 24h.",
  },
]

const MAINTENANCE = ["Mises à jour et sécurité", "Sauvegarde quotidienne", "Support prioritaire", "1h de modifications par mois"]

export default function Services() {
  return (
    <section className="chapter" id="services" data-scene="2">
      <div className="wrap">
        <div className="card">
          <h2>
            Trois façons d&apos;exister <em>en ligne</em>, choisies pour votre marché.
          </h2>
          <p className="lede muted">
            Chaque projet repart de zéro. On part de vous : votre marché, votre clientèle, votre logique métier et
            ensemble, nous construisons la solution la plus adaptée pour votre activité.
          </p>
          <div className="offers">
            {OFFRES.map((o) => (
              <a key={o.titre} className="offer" href="#contact">
                <span className={o.chaud ? "kind hot" : "kind"}>{o.genre}</span>
                <h3>{o.titre}</h3>
                <span className="price">{o.prix}</span>
                <p>{o.detail}</p>
              </a>
            ))}
          </div>
          <div className="maint">
            <div className="maint-head">
              <span className="maint-q">Et après la livraison ?</span>
              <span className="maint-price">
                Maintenance <b>39€/mois</b>
              </span>
            </div>
            <ul className="maint-list">
              {MAINTENANCE.map((m) => <li key={m}>{m}</li>)}
            </ul>
            <a className="link" href="#contact">S&apos;abonner à la maintenance →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
