import Link from "next/link"
import Logo from "./Logo"
import { LienSection, type PageVoyage } from "./Nav"

export default function Footer({ page = "accueil" }: { page?: PageVoyage }) {
  const accueil = page === "accueil"
  return (
    <footer>
      <div className="wrap">
        <div className="card">
          <div className="foot-grid">
            <div>
              {accueil ? (
                <a className="logo" href="#top" aria-label="SolYB, retour en haut">
                  <Logo />
                </a>
              ) : (
                <Link prefetch={false} className="logo" href="/" aria-label="SolYB, accueil">
                  <Logo />
                </Link>
              )}
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
                <li><LienSection id="services" accueil={accueil}>Site vitrine</LienSection></li>
                <li><LienSection id="services" accueil={accueil}>E-commerce</LienSection></li>
                <li><LienSection id="services" accueil={accueil}>Application métier</LienSection></li>
                <li><LienSection id="services" accueil={accueil}>Maintenance</LienSection></li>
              </ul>
            </div>
            <div>
              <h4>SolYB</h4>
              <ul>
                <li><LienSection id="apropos" accueil={accueil}>L&apos;histoire</LienSection></li>
                <li><LienSection id="realisations" accueil={accueil}>Nos projets</LienSection></li>
                <li><Link prefetch={false} href="/blog">Blog</Link></li>
                <li><LienSection id="faq" accueil={accueil}>FAQ</LienSection></li>
                <li><LienSection id="contact" accueil={accueil}>Contact</LienSection></li>
              </ul>
            </div>
            <div>
              <h4>Outils maison</h4>
              <ul>
                <li><Link prefetch={false} href="/resagp">ResaGP</Link></li>
                <li><Link prefetch={false} href="/facturation-electronique">FactuGP</Link></li>
              </ul>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 SolYB, Guadeloupe</span>
            <Link prefetch={false} href="/mentions-legales">Mentions légales</Link>
            <Link prefetch={false} href="/confidentialite">Politique de confidentialité</Link>
            <Link prefetch={false} href="/cgv">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
