import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="card">
          <div className="foot-grid">
            <div>
              <a className="logo" href="#top" aria-label="SolYB, retour en haut">
                <Logo />
              </a>
              <p className="muted">Fait en Guadeloupe. Pensé pour durer. Agence digitale basée à Petit-Bourg.</p>
              <p>
                <a href="mailto:solyb971@gmail.com">solyb971@gmail.com</a>
                <br />
                <a href="https://wa.me/590690426792">WhatsApp · +590 690 42 67 92</a>
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Site vitrine</a></li>
                <li><a href="#services">E-commerce</a></li>
                <li><a href="#services">Application métier</a></li>
                <li><a href="#services">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h4>SolYB</h4>
              <ul>
                <li><a href="#apropos">L&apos;histoire</a></li>
                <li><a href="#realisations">Nos projets</a></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Outils maison</h4>
              <ul>
                <li><Link href="/resagp">ResaGP</Link></li>
                <li><Link href="/facturation-electronique">FactuGP</Link></li>
              </ul>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 SolYB, Guadeloupe</span>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
            <Link href="/cgv">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
