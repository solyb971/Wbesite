import Image from "next/image"
import Link from "next/link"
import ParallaxImage from "@/components/ui/ParallaxImage"
import { realisations } from "@/lib/realisations-data"

function ResaMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 88 88" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2h8l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9h6M9 12.5h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const tools = [
  {
    name: "ResaGP",
    Mark: ResaMark,
    accent: "#0E7C7B",          // lagon (DA ResaGP) — icônes/bordures
    textAccent: "#0C6E6D",      // lagon assombri pour texte (AA sur crème)
    preview: "/resagp/demo/02_planning.png",  // capture produit réelle
    tagline: "Réservations restaurant — sans commission",
    description: "Réservations en ligne, plan de salle, rappels SMS automatiques, fiches clients. Tout ce dont un restaurant a besoin, dans un seul outil.",
    status: "Disponible",
    statusColor: "#16A34A",   // pastille
    statusText: "#147038",    // texte statut (AA sur crème)
    highlights: ["Essai gratuit 14 jours", "Aucune commission par couvert", "Pensé pour les restaurants et bars"],
    cta: { label: "Découvrir ResaGP", href: "/resagp" },
  },
  {
    name: "FactuGP",
    Mark: FactuMark,
    accent: "#2E8C92",          // pétrole (DA FactuGP) — icônes/bordures
    textAccent: "#1F6E73",      // pétrole assombri pour texte (AA sur crème)
    preview: "/factugp/demo/demo-02-dashboard.jpeg",  // capture produit réelle
    tagline: "Facturation électronique conforme 2026",
    description: "À partir de septembre 2026, toutes les entreprises devront facturer électroniquement. FactuGP gère votre conformité à votre place.",
    status: "Disponible sept. 2026",
    statusColor: "#B8760A",   // pastille
    statusText: "#96600A",    // texte statut (AA sur crème)
    highlights: ["TVA Guadeloupe préconfigurée", "Envoi automatique aux impôts", "Pensé pour les TPE et PME du 971"],
    cta: { label: "Rejoindre la liste d'attente", href: "/facturation-electronique" },
  },
]

export default function Realisations() {
  const project = realisations[0]

  return (
    <section
      id="realisations"
      className="py-24 md:py-28 scroll-mt-20 overflow-hidden"
      style={{ background: 'var(--syb-warm)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal mb-12 max-w-2xl">
          <h2
            className="title-reveal font-display font-black leading-none mb-5"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}
          >
            Ce qu&apos;on a<br />
            <span style={{ fontWeight: 900, color: 'var(--syb-rust)' }}>déjà construit</span>
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--syb-stone)', lineHeight: 1.75 }}>
            Un projet client livré et en ligne — et nos deux outils maison, conçus pour la Guadeloupe.
          </p>
        </div>

        {/* Étude de cas */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/11', background: '#0e0c0a', border: '0.5px solid var(--syb-border)' }}
          >
            <ParallaxImage className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover object-top"
                style={{ transform: 'scale(1.12) translateY(var(--parallax, 0px))' }}
              />
            </ParallaxImage>
          </div>
          <div>
            <div
              className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase rounded-full px-3 py-1 mb-4"
              style={{ background: 'rgba(22,163,74,0.08)', border: '0.5px solid rgba(22,163,74,0.3)', color: '#147038' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#16A34A' }} />
              Projet réel · en ligne
            </div>
            <div className="text-xs tracking-[2px] uppercase mb-3" style={{ color: 'var(--syb-rust)' }}>
              {project.sector}
            </div>
            <h3
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--syb-ink)', lineHeight: 1.05 }}
            >
              {project.client}
            </h3>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--syb-stone)', lineHeight: 1.8 }}>
              {project.description}
            </p>
            {project.result && (
              <p className="text-sm font-normal leading-relaxed mb-6" style={{ color: 'var(--syb-ink)', lineHeight: 1.8 }}>
                {project.result}
              </p>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white text-sm font-normal transition-transform hover:-translate-y-px"
                style={{ background: 'var(--syb-rust)', padding: '12px 26px', borderRadius: '4px' }}
              >
                Voir le projet
              </a>
            )}
          </div>
        </div>

        {/* Sous-titre outils maison */}
        <div className="reveal mt-20 mb-8">
          <h3 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--syb-ink)', letterSpacing: '-1px' }}>
            Et nos propres outils, <span style={{ color: 'var(--syb-rust)' }}>faits ici</span>
          </h3>
          <p className="text-sm font-light leading-relaxed max-w-lg" style={{ color: 'var(--syb-stone)', lineHeight: 1.75 }}>
            La plupart des outils qu&apos;on recommande sont conçus ailleurs, pour d&apos;autres marchés.
            Alors on en a créé deux, pour la Guadeloupe.
          </p>
        </div>

        {/* Cartes outils */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((s) => (
            <div
              key={s.name}
              className="group rounded-xl overflow-hidden flex flex-col transition-all duration-250 hover:-translate-y-1"
              style={{ background: 'var(--syb-cream)', border: '0.5px solid var(--syb-border)' }}
            >
              {/* Aperçu visuel — capture produit réelle, ou header stylisé si indisponible */}
              <div
                className="relative overflow-hidden"
                style={{ height: 168, background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)` }}
              >
                {s.preview ? (
                  <Image
                    src={s.preview}
                    alt={`Aperçu ${s.name}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    <div style={{ transform: 'scale(3.2)' }}><s.Mark /></div>
                  </div>
                )}
              </div>

              <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}40`, color: s.accent }}
                >
                  <s.Mark />
                </div>
                <span className="flex items-center gap-2 text-xs tracking-wide" style={{ color: s.statusText }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.statusColor }} />
                  {s.status}
                </span>
              </div>

              <h4 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--syb-ink)' }}>
                {s.name}
              </h4>

              <p className="text-sm font-medium mb-3" style={{ color: s.textAccent }}>{s.tagline}</p>
              <p className="text-xs font-light leading-relaxed flex-1 mb-5" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>
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

              <div style={{ borderTop: '0.5px solid var(--syb-border)', paddingTop: '1.25rem' }}>
                <Link
                  href={s.cta.href}
                  className="cta-arrow inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: s.textAccent }}
                >
                  {s.cta.label} <span className="arrow">→</span>
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="reveal mt-12">
          <Link
            href="/#contact"
            className="cta-arrow inline-flex items-center gap-1.5 text-sm font-light transition-colors hover:text-[#0E0D0B]"
            style={{ color: 'var(--syb-stone)' }}
          >
            Démarrer un projet comme celui-ci <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
