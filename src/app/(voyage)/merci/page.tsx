import type { Metadata } from "next"
import Link from "next/link"
import { voyageFonts } from "@/components/voyage/fonts"
import Stage, { SharedShapes } from "@/components/voyage/Stage"
import Nav from "@/components/voyage/Nav"
import Footer from "@/components/voyage/Footer"
import PaysageVivant from "@/components/voyage/anim/PaysageVivant"

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description: "Votre demande a été envoyée avec succès. Je vous recontacte sous 24h maximum.",
  robots: { index: false, follow: false },
}

const SUITE = [
  { titre: "Email de confirmation", texte: "Vous recevez un email dans quelques minutes" },
  { titre: "Analyse de votre projet", texte: "Je prépare une première proposition adaptée" },
  { titre: "Contact sous 24h", texte: "On discute ensemble de votre projet" },
]

/** Après l'envoi du formulaire : au style de l'accueil, sur le paysage du couchant. */
export default function MerciPage() {
  return (
    <div className={`voyage ${voyageFonts}`}>
      <SharedShapes />
      <Stage paysages={["couchant"]} />
      <Nav page="merci" />
      <main id="top">
        <section className="chapter merci">
          <div className="wrap">
            <div className="card">
              <h1>
                Demande <em>envoyée !</em>
              </h1>
              <p className="lede">
                Merci pour votre confiance. Je vous recontacte sous <strong>24h maximum.</strong>
              </p>

              <h2 className="suite">La suite</h2>
              <ol className="steps">
                {SUITE.map((etape, i) => (
                  <li key={etape.titre}>
                    <b aria-hidden="true">{i + 1}</b>
                    <div>
                      <h3>{etape.titre}</h3>
                      <p>{etape.texte}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="maint-list">
                <li>Vérifiez vos spams si vous ne recevez rien</li>
                <li>Réponse garantie sous 24h ouvrées</li>
              </ul>

              <div className="cta">
                <Link prefetch={false} className="btn btn--brand" href="/">
                  ← Retour à l&apos;accueil
                </Link>
                <Link prefetch={false} className="btn btn--ghost" href="/#services">
                  Nos services
                </Link>
              </div>

              <p className="muted urgence">
                Une question urgente ? <a className="link" href="mailto:solyb971@gmail.com">solyb971@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer page="merci" />
      <PaysageVivant />
    </div>
  )
}
