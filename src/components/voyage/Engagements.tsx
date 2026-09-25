const ENGAGEMENTS = [
  ["Un seul interlocuteur", "Vous parlez directement à la personne qui code. Pas d'intermédiaire."],
  ["Devis clair sous 24h", "Un prix ferme et détaillé, sans surprise."],
  ["Paiement en deux fois", "50% pour démarrer, 50% à la livraison."],
  ["On reste après la livraison", "Hébergement 1 an et support inclus. On ne disparaît pas."],
] as const

export default function Engagements() {
  return (
    <section className="chapter" data-scene="3">
      <div className="wrap">
        <div className="card">
          <h2>
            Pas de promesses. <em>Des engagements.</em>
          </h2>
          <ul className="promise-list">
            {ENGAGEMENTS.map(([titre, texte]) => (
              <li key={titre}>
                <h3>{titre}</h3>
                <p>{texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
