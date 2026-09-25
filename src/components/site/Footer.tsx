import Link from "next/link"
import Image from "next/image"

const WHATSAPP_URL =
  "https://wa.me/590690426792?text=" +
  encodeURIComponent("Bonjour ! Je souhaite des informations sur vos services.")

const columns = [
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Site vitrine" },
      { href: "/#services", label: "E-commerce" },
      { href: "/#services", label: "Application métier" },
      { href: "/#services", label: "Maintenance" },
    ],
  },
  {
    title: "SolYB",
    links: [
      { href: "/#apropos", label: "L'histoire" },
      { href: "/#realisations", label: "Nos projets" },
      { href: "/blog", label: "Blog" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "Outils maison",
    links: [
      { href: "/resagp", label: "ResaGP" },
      { href: "/facturation-electronique", label: "FactuGP" },
    ],
  },
]

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/cgv", label: "CGV" },
]

const muted = { color: "var(--syb-on-dark-muted)" }
const linkClass =
  "text-[13.5px] text-[var(--syb-on-dark-muted)] transition-colors hover:text-[var(--syb-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--syb-rust-light)] rounded-sm"

/* Pied de page des pages du site (l'accueil a le sien, voir components/voyage),
   sur fond ink (.site-footer dans globals.css). */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer leading-[1.6]">
      <div className="max-w-[1180px] mx-auto px-6 min-[720px]:px-10 py-12">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-[260px]">
            <Link href="/" className="flex items-center gap-2.5 mb-2.5 w-fit rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--syb-rust-light)]" aria-label="SolYB — accueil">
              <Image src="/logo/syb-orange.png" alt="" width={160} height={160} className="h-8 w-auto" />
              <span aria-hidden className="font-display font-black leading-none text-[21px]" style={{ color: "var(--syb-cream)" }}>
                SolYB
              </span>
            </Link>
            <p className="text-[13.5px] leading-relaxed" style={muted}>
              Fait en Guadeloupe. Pensé pour durer. Agence digitale basée à Petit-Bourg.
            </p>
            <div className="flex flex-col gap-1.5 mt-4">
              <a href="mailto:solyb971@gmail.com" className={linkClass}>
                solyb971@gmail.com
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp · +590 690 42 67 92
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          </div>

          <nav aria-label="Pied de page" className="flex flex-wrap gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.06em] mt-[19px] mb-3.5" style={muted}>
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          className="mt-10 pt-6 flex flex-wrap justify-between gap-3 text-[12.5px]"
          style={{ ...muted, borderTop: "1px solid var(--syb-border-dark)" }}
        >
          <span>© {currentYear} SolYB — Guadeloupe</span>
          <span className="flex flex-wrap gap-x-2">
            {legalLinks.map((l, i) => (
              <span key={l.href}>
                {i > 0 && <span aria-hidden>· </span>}
                <Link href={l.href} className={linkClass.replace("text-[13.5px] ", "")}>
                  {l.label}
                </Link>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
