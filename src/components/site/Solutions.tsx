import Link from "next/link"
import { ArrowRight } from "lucide-react"

const solutions = [
  {
    num: "01",
    name: "ResaGP",
    tagline: "Réservations pour restaurants — sans commission",
    description: "Réservations en ligne, plan de salle, rappels SMS automatiques et fiches clients. Tout ce dont votre restaurant a besoin, dans un seul outil.",
    status: "Disponible",
    statusColor: "#00D4AA",
    highlights: ["Essai 14 jours gratuit", "Sans commission par couvert", "Restaurants & bars 971"],
    cta: { label: "Voir ResaGP", href: "/resagp" },
    featured: false,
  },
  {
    num: "02",
    name: "FactuGP",
    tagline: "Facturation électronique conforme 2026",
    description: "À partir de septembre 2026, toutes les entreprises doivent émettre leurs factures électroniquement. FactuGP s'occupe de la conformité DGFiP pour vous.",
    status: "Bientôt disponible",
    statusColor: "#F5A623",
    highlights: ["TVA Guadeloupe préconfigurée", "Transmission DGFiP automatique", "TPE & PME 971"],
    cta: { label: "En savoir plus", href: "/facturation-electronique" },
    featured: true,
  },
]

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="py-20 md:py-28 scroll-mt-20"
      style={{ background: "#0A0A0F" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="reveal mb-12">
          <p className="text-xs tracking-[3px] uppercase mb-3" style={{ color: "#FF6B47" }}>
            Nos outils
          </p>
          <h2 className="font-display text-3xl md:text-[2.6rem] font-normal leading-tight text-[#F0EDE8]">
            Des outils <em className="italic" style={{ color: "#FF6B47" }}>clés en main</em><br />
            pour la Guadeloupe
          </h2>
        </div>

        {/* Cards */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((s) => (
            <div
              key={s.name}
              className="group rounded-2xl p-8 flex flex-col transition-all duration-250 hover:-translate-y-1"
              style={{
                background: s.featured ? "#14130F" : "#111110",
                border: `0.5px solid ${s.featured ? "rgba(245,166,35,0.25)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {/* Status */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: s.statusColor }}
                />
                <span className="text-xs tracking-wide" style={{ color: s.statusColor }}>
                  {s.status}
                </span>
              </div>

              {/* Number + Name */}
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="font-display text-4xl font-normal leading-none"
                  style={{ color: "rgba(255,255,255,0.06)" }}
                >
                  {s.num}
                </span>
                <h3 className="font-display text-2xl font-normal text-[#F0EDE8]">
                  {s.name}
                </h3>
              </div>

              <p className="text-sm font-medium mb-3" style={{ color: s.statusColor }}>
                {s.tagline}
              </p>

              <p className="text-sm font-light leading-relaxed flex-1 mb-6" style={{ color: "#7A7870" }}>
                {s.description}
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-2 mb-6">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-light" style={{ color: "#5A5750" }}>
                    <span className="w-px h-3 flex-shrink-0" style={{ background: s.statusColor, opacity: 0.5 }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}>
                <Link
                  href={s.cta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-light transition-colors hover:text-coral"
                  style={{ color: "#9E9A92" }}
                >
                  {s.cta.label}
                  <ArrowRight className="w-4 h-4 text-coral" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
