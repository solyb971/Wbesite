import Link from "next/link"

const services = [
  {
    title: "Site Vitrine",
    tag: "Le plus demandé",
    accent: "var(--syb-rust)",
    description: "Présence en ligne professionnelle, pensée pour votre clientèle locale. Rapide, lisible sur mobile, optimisé pour Google.",
    price: "Dès 599€",
    contactParam: "vitrine",
  },
  {
    title: "E-commerce",
    tag: "Vente en ligne",
    accent: "var(--syb-rust-light)",
    description: "Boutique complète avec paiement sécurisé et tableau de bord simple à prendre en main.",
    price: "Dès 999€",
    contactParam: "ecommerce",
  },
  {
    title: "Application Métier",
    tag: "Sur mesure",
    accent: "var(--syb-rust-deep)",
    description: "Outil sur mesure pour votre activité. Ce dont vous avez besoin, rien de plus.",
    price: "Sur devis",
    contactParam: "application",
  },
]

export default function Services() {
  return (
    <>
      <section
        id="services"
        className="py-24 md:py-28 scroll-mt-20"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: '#C4472A' }}>
                <span className="w-5 h-px" style={{ background: '#C4472A' }} />
                Services
              </div>
              <h2
                className="font-display font-black leading-none"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
              >
                On crée<br />
                <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>l&apos;outil qu&apos;il vous faut</em>
              </h2>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: '#7A7268' }}>
              Pas de template recyclé. On part de votre métier, de vos clients, de votre quotidien — et on construit ce qui va vraiment vous servir.
            </p>
          </div>

          {/* Cards grid */}
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
                style={{ border: '0.5px solid var(--syb-border)', background: 'var(--syb-cream)' }}
              >
                {/* Barre d'accent */}
                <div style={{ height: '4px', background: s.accent }} />

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[11px] tracking-[2px] uppercase mb-4" style={{ color: 'var(--syb-stone-light)' }}>
                    {s.tag}
                  </div>
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: '22px', color: 'var(--syb-ink)' }}>
                    {s.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed mb-5 flex-1" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>
                    {s.description}
                  </p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
                    <span className="font-display font-bold text-sm" style={{ color: 'var(--syb-ink)' }}>
                      {s.price}
                    </span>
                    <Link
                      href={`/?service=${s.contactParam}#contact`}
                      className="cta-arrow inline-flex items-center gap-1.5 text-xs font-normal transition-colors hover:text-[var(--syb-rust)]"
                      style={{ color: 'var(--syb-stone)' }}
                    >
                      Demander un devis <span className="arrow" style={{ color: 'var(--syb-rust)' }}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facturation banner */}
      <div
        className="border-y"
        style={{ background: '#F5F2ED', borderColor: '#DDD5C8', padding: '2.5rem 0' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase rounded-full px-3 py-1 mb-2"
              style={{ background: 'rgba(196,71,42,0.08)', border: '0.5px solid rgba(196,71,42,0.28)', color: '#C4472A' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C4472A', animation: 'pulse 2s infinite' }} />
              Obligation 2026
            </div>
            <p className="font-display font-bold text-lg" style={{ color: '#0E0D0B' }}>
              Facturation électronique — Êtes-vous conforme ?
            </p>
            <p className="text-sm font-light mt-0.5" style={{ color: '#7A7268' }}>
              Mise en conformité DGFiP rapide, adaptée aux entreprises guadeloupéennes.
            </p>
          </div>
          <Link
            href="/?service=facturation#contact"
            className="whitespace-nowrap text-sm font-normal px-5 py-2.5 rounded transition-opacity hover:opacity-80 flex-shrink-0 text-white"
            style={{ background: '#C4472A' }}
          >
            Vérifier ma conformité
          </Link>
        </div>
      </div>
    </>
  )
}
