import Link from "next/link"

const solutions = [
  {
    num: "01",
    name: "ResaGP",
    tagline: "Réservations restaurants — sans commission",
    description: "Réservations en ligne, plan de salle, rappels SMS automatiques et fiches clients. Tout ce dont votre restaurant a besoin, dans un seul outil.",
    status: "Disponible",
    statusColor: "#16A34A",
    highlights: ["Essai 14 jours gratuit", "Sans commission par couvert", "Restaurants & bars 971"],
    cta: { label: "Voir ResaGP", href: "/resagp" },
  },
  {
    num: "02",
    name: "FactuGP",
    tagline: "Facturation électronique conforme 2026",
    description: "À partir de septembre 2026, toutes les entreprises doivent émettre leurs factures électroniquement. FactuGP gère la conformité DGFiP pour vous.",
    status: "Bientôt disponible",
    statusColor: "#B8760A",
    highlights: ["TVA Guadeloupe préconfigurée", "Transmission DGFiP automatique", "TPE & PME 971"],
    cta: { label: "En savoir plus", href: "/facturation-electronique" },
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
            Outils clés<br />
            <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>en main</em>
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((s) => (
            <div
              key={s.name}
              className="group rounded-xl p-7 flex flex-col transition-all duration-250 hover:-translate-y-1"
              style={{ background: '#FFFFFF', border: '0.5px solid #DDD5C8' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.statusColor }} />
                <span className="text-xs tracking-wide" style={{ color: s.statusColor }}>{s.status}</span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display font-thin text-4xl leading-none" style={{ color: '#DDD5C8' }}>
                  {s.num}
                </span>
                <h3 className="font-display font-bold text-2xl" style={{ color: '#0E0D0B' }}>
                  {s.name}
                </h3>
              </div>

              <p className="text-sm font-medium mb-3" style={{ color: '#C4472A' }}>{s.tagline}</p>
              <p className="text-xs font-light leading-relaxed flex-1 mb-5" style={{ color: '#7A7268', lineHeight: 1.65 }}>
                {s.description}
              </p>

              <ul className="flex flex-col gap-1.5 mb-5">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-light" style={{ color: '#B0A89E' }}>
                    <span className="w-px h-3 flex-shrink-0" style={{ background: s.statusColor, opacity: 0.5 }} />
                    {h}
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '0.5px solid #DDD5C8', paddingTop: '1.25rem' }}>
                <Link
                  href={s.cta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-light transition-colors hover:text-[#C4472A]"
                  style={{ color: '#7A7268' }}
                >
                  {s.cta.label}
                  <span style={{ color: '#C4472A' }}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
