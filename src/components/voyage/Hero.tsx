export default function Hero() {
  return (
    <section className="chapter hero" data-scene="0">
      <div className="wrap">
        <div className="card hero-card">
          <h1>
            Votre clientèle <em>vous cherche déjà.</em>
          </h1>
          <p className="lede hero-in">
            Chaque jour, des clients tapent une recherche pensant vous trouver et tombent sur un concurrent mieux
            référencé. On construit des outils digitaux pour les entrepreneurs d&apos;ici : sites, applications,
            systèmes pensés pour être <strong>trouvés</strong>, pas juste pour exister.
          </p>
          <div className="cta hero-in">
            <a className="btn btn--brand" href="#contact">Demander un devis gratuit</a>
            <a className="btn btn--ghost" href="#services">Voir les services →</a>
          </div>
          <ul className="promises hero-in">
            <li>Devis gratuit sous 24h</li>
            <li>Sans engagement</li>
            <li>1 an d&apos;hébergement inclus</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
