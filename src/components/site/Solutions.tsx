import Link from "next/link"

function ResaMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="2" y="2" width="84" height="84" rx="3" stroke="currentColor" strokeWidth="4" />
      <rect x="26" y="40" width="36" height="8" rx="2.5" fill="currentColor" />
      <rect x="29" y="22" width="12" height="5" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="47" y="22" width="12" height="5" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="29" y="61" width="12" height="5" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="47" y="61" width="12" height="5" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function FactuMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2h8l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9h6M9 12.5h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const solutions = [
  {
    num: "01",
    name: "ResaGP",
    Mark: ResaMark,
    accent: "#2E7D96",
    tagline: "Réservations restaurant — sans commission",
    description: "Réservations en ligne, plan de salle, rappels SMS automatiques, fiches clients. Tout ce dont un restaurant a besoin, dans un seul outil.",
    status: "Disponible",
    statusColor: "#16A34A",
    highlights: ["Essai gratuit 14 jours", "Aucune commission par couvert", "Pensé pour les restaurants et bars"],
    cta: { label: "Découvrir ResaGP", href: "/resagp" },
  },
  {
    num: "02",
    name: "FactuGP",
    Mark: FactuMark,
    accent: "#2E8C92",
    tagline: "Facturation électronique conforme 2026",
    description: "À partir de septembre 2026, toutes les entreprises devront facturer électroniquement. FactuGP gère votre conformité DGFiP à votre place.",
    status: "Disponible sept. 2026",
    statusColor: "#B8760A",
    highlights: ["TVA Guadeloupe préconfigurée", "Envoi automatique aux impôts", "Pensé pour les TPE et PME du 971"],
    cta: { label: "Rejoindre la liste d'attente", href: "/facturation-electronique" },
  },
]

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="py-24 md:py-28 scroll-mt-20"
      style={{ background: '#F5F2ED' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="reveal mb-14">
          <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: '#C4472A' }}>
            <span className="w-5 h-px" style={{ background: '#C4472A' }} />
            Nos outils
          </div>
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
          >
            ResaGP et FactuGP —<br />
            <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>nos outils, faits ici</em>
          </h2>
          <p className="text-sm font-light leading-relaxed max-w-lg mt-5" style={{ color: '#7A7268', lineHeight: 1.75 }}>
            La plupart des outils qu&apos;on recommande à nos clients sont conçus ailleurs, pour
            d&apos;autres marchés. Alors on en a créé deux, pour Guadeloupe.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((s) => (
            <div
              key={s.name}
              className="group rounded-xl p-7 flex flex-col transition-all duration-250 hover:-translate-y-1"
              style={{ background: '#FFFFFF', border: '0.5px solid #DDD5C8' }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}40`, color: s.accent }}
                >
                  <s.Mark />
                </div>
                <span className="flex items-center gap-2 text-xs tracking-wide" style={{ color: s.statusColor }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.statusColor }} />
                  {s.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl mb-2" style={{ color: '#0E0D0B' }}>
                {s.name}
              </h3>

              <p className="text-sm font-medium mb-3" style={{ color: '#C4472A' }}>{s.tagline}</p>
              <p className="text-xs font-light leading-relaxed flex-1 mb-5" style={{ color: '#7A7268', lineHeight: 1.65 }}>
                {s.description}
              </p>

              <ul className="flex flex-col gap-1.5 mb-5">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-light" style={{ color: 'var(--syb-stone)' }}>
                    <span className="w-px h-3 flex-shrink-0" style={{ background: s.statusColor, opacity: 0.5 }} />
                    {h}
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '0.5px solid #DDD5C8', paddingTop: '1.25rem' }}>
                <Link
                  href={s.cta.href}
                  className="cta-arrow inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: s.accent }}
                >
                  {s.cta.label} <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
