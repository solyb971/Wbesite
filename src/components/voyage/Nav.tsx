import Link from "next/link"
import Logo from "./Logo"
import { SCENES } from "./Stage"

export default function Nav() {
  return (
    <>
      <nav className="nav" aria-label="Navigation principale">
        <a className="logo" href="#top" aria-label="SolYB, retour en haut">
          <Logo />
        </a>
        <ul>
          <li><a href="#realisations">Nos projets</a></li>
          <li><a href="#services">Services &amp; tarifs</a></li>
          <li><a href="#apropos">L&apos;histoire</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
        <a className="btn btn--brand btn--sm" href="#contact">Devis gratuit</a>
      </nav>
      {/* Un point par paysage ; le script les relie au défilement (masqué sans JS). */}
      <nav className="rail" aria-label="Paysages">
        {SCENES.map((nom, i) => (
          <button key={nom} type="button" className={i === 0 ? "on" : undefined} aria-label={`Aller au paysage : ${nom}`} />
        ))}
      </nav>
    </>
  )
}
