import Link from "next/link"
import Image from "next/image"

const WHATSAPP_URL =
  "https://wa.me/590690426792?text=" +
  encodeURIComponent("Bonjour ! Je souhaite des informations sur vos services.")

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: "/#services", label: "Ce qu'on fait" },
    { href: "/#tarifs", label: "Nos tarifs" },
    { href: "/#realisations", label: "Nos projets" },
    { href: "/#apropos", label: "Qui on est" },
    { href: "/blog", label: "Blog" },
  ]

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cgv", label: "CGV" },
  ]

  return (
    <footer style={{ background: '#0E0D0B', borderTop: '0.5px solid #1a1814' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Marque + contact */}
          <div>
            <Image src="/logo/syb-white.png" alt="SolYB" width={160} height={160} className="h-9 w-auto mb-4" />
            <p className="text-sm font-light mb-5" style={{ color: '#B0A89E', lineHeight: 1.6 }}>
              Agence digitale · Baie-Mahault, Guadeloupe 971
            </p>
            <div className="flex flex-col gap-2 text-sm font-light">
              <a href="mailto:contact@solyb.fr" className="transition-colors hover:text-white" style={{ color: '#B0A89E' }}>
                contact@solyb.fr
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
                style={{ color: '#B0A89E' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                +590 690 42 67 92
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <p className="text-xs uppercase tracking-[2px] mb-4" style={{ color: '#6B645A' }}>Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-light transition-colors hover:text-white" style={{ color: '#B0A89E' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA final */}
          <div>
            <p className="font-display font-bold text-lg mb-2" style={{ color: '#F0EDE8' }}>
              Un projet en tête ?
            </p>
            <p className="text-sm font-light mb-5" style={{ color: '#B0A89E', lineHeight: 1.6 }}>
              Le code, les contenus et le domaine vous appartiennent à 100 %.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-white text-sm font-normal px-5 py-3 rounded transition-transform hover:-translate-y-px"
              style={{ background: 'var(--syb-rust)' }}
            >
              Demander un devis <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Bas de footer */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '0.5px solid #1a1814' }}
        >
          <p className="text-xs font-light" style={{ color: '#6B645A' }}>
            © {currentYear} SolYB — Agence digitale Guadeloupe
          </p>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-light transition-colors hover:text-white"
                style={{ color: '#B0A89E' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
