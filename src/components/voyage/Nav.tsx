import Link from "next/link"
import Logo from "./Logo"
import { SCENES } from "./Stage"

// Liens vers les autres pages sans préchargement (ici, dans les réalisations et le
// pied de page) : l'accueil ne télécharge pas six pages que le visiteur n'ouvrira
// peut-être pas, et la console reste propre (CSS préchargée mais inutilisée).

export type PageVoyage = "accueil" | "blog" | "merci"

/**
 * Lien vers une section de l'accueil : une ancre sur l'accueil (défilement lissé
 * par la scène), un lien vers /#section ailleurs.
 */
export function LienSection({
  id,
  accueil,
  className,
  children,
}: {
  id: string
  accueil: boolean
  className?: string
  children: React.ReactNode
}) {
  return accueil ? (
    <a className={className} href={`#${id}`}>
      {children}
    </a>
  ) : (
    <Link prefetch={false} className={className} href={`/#${id}`}>
      {children}
    </Link>
  )
}

/**
 * Navigation du site au style de l'accueil. Sur l'accueil, le rail relie les
 * paysages ; ailleurs (merci, blog), les liens ramènent à la bonne section de
 * l'accueil, et il n'y a pas de rail.
 */
export default function Nav({ page = "accueil" }: { page?: PageVoyage }) {
  const accueil = page === "accueil"
  return (
    <>
      <nav className="nav" aria-label="Navigation principale">
        {accueil ? (
          <a className="logo" href="#top" aria-label="SolYB, retour en haut">
            <Logo />
          </a>
        ) : (
          <Link prefetch={false} className="logo" href="/" aria-label="SolYB, accueil">
            <Logo />
          </Link>
        )}
        <ul>
          <li><LienSection id="realisations" accueil={accueil}>Nos projets</LienSection></li>
          <li><LienSection id="services" accueil={accueil}>Services &amp; tarifs</LienSection></li>
          <li><LienSection id="apropos" accueil={accueil}>L&apos;histoire</LienSection></li>
          <li><LienSection id="faq" accueil={accueil}>FAQ</LienSection></li>
          <li>
            <Link prefetch={false} href="/blog" aria-current={page === "blog" ? "page" : undefined}>
              Blog
            </Link>
          </li>
        </ul>
        <LienSection id="contact" accueil={accueil} className="btn btn--brand btn--sm">
          Devis gratuit
        </LienSection>
      </nav>
      {/* Un point par paysage ; le script les relie au défilement (masqué sans JS). */}
      {accueil && (
        <nav className="rail" aria-label="Paysages">
          {SCENES.map((nom, i) => (
            <button key={nom} type="button" className={i === 0 ? "on" : undefined} aria-label={`Aller au paysage : ${nom}`} />
          ))}
        </nav>
      )}
    </>
  )
}
