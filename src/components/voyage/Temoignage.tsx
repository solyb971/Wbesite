/** Deshaies au couchant : le même paysage que « À propos », qu'il prolonge. */
export default function Temoignage() {
  return (
    <section className="chapter" data-scene="4">
      <div className="wrap">
        <div className="card">
          <blockquote className="quote">
            « Un restaurant sur la plage de Deshaies, plein en haute saison, quasiment vide en basse saison, au point
            d&apos;être revendu. Les repreneurs ont investi dans un vrai site référencé et aujourd&apos;hui, ils
            affichent presque complet midi et soir en basse saison.{" "}
            <strong className="plain-strong">Même emplacement, même clientèle. La différence :</strong>{" "}
            <strong>ils existent sur Google.</strong> »
          </blockquote>
          <p className="muted" style={{ marginTop: "1.2rem" }}>
            En Guadeloupe, qui accueille plus d&apos;un million de visiteurs par an en plus de sa clientèle locale, ne
            pas être vu en ligne, c&apos;est ne pas exister. Peu importe la qualité du travail derrière.
          </p>
          <p className="muted">
            C&apos;est pour ça qu&apos;est née SolYB : une agence digitale locale, à l&apos;écoute réelle de chaque
            client, qui cherche à chaque fois le meilleur compromis entre prix et efficacité.
          </p>
        </div>
      </div>
    </section>
  )
}
