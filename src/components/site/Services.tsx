import Link from "next/link"

const services = [
  {
    num: "01",
    title: "Site Vitrine",
    description: "Présence en ligne professionnelle, pensée pour votre clientèle locale. Rapide, lisible sur mobile, optimisé pour Google.",
    contactParam: "vitrine",
    wide: true,
  },
  {
    num: "02",
    title: "E-commerce",
    description: "Boutique complète avec paiement sécurisé et tableau de bord simple à prendre en main.",
    contactParam: "ecommerce",
    wide: false,
  },
  {
    num: "03",
    title: "Application Métier",
    description: "Outil sur mesure pour votre activité. Ce dont vous avez besoin, rien de plus.",
    contactParam: "application",
    wide: false,
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
                Ce qu&apos;on<br />
                <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>construit</em>
              </h2>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: '#7A7268' }}>
              Des solutions sur mesure pour votre réalité locale. Pas de template revendu — chaque projet est unique.
            </p>
          </div>

          {/* Cards grid */}
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.num}
                className="group rounded-xl overflow-hidden flex flex-col"
                style={{ border: '0.5px solid #DDD5C8' }}
              >
                {/* Image placeholder */}
                <div
                  className="h-52 relative overflow-hidden"
                  style={{
                    background: s.num === "01"
                      ? 'linear-gradient(135deg, #E8DDD0, #C8BFB5)'
                      : s.num === "02"
                      ? 'linear-gradient(135deg, #D0C8BE, #B8B0A6)'
                      : 'linear-gradient(135deg, #B8B0A6, #A0988E)',
                  }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(14,13,11,0.5) 100%)' }}
                  />
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1" style={{ background: '#F5F2ED' }}>
                  <div
                    className="font-display font-thin leading-none mb-4"
                    style={{ fontSize: '48px', color: '#DDD5C8', lineHeight: 1 }}
                  >
                    {s.num}
                  </div>
                  <h3
                    className="font-display font-bold mb-2"
                    style={{ fontSize: '22px', color: '#0E0D0B' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed mb-5 flex-1" style={{ color: '#7A7268', lineHeight: 1.65 }}>
                    {s.description}
                  </p>
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '0.5px solid #DDD5C8' }}
                  >
                    <span className="text-xs font-light" style={{ color: '#B0A89E' }}>
                      Sur devis
                    </span>
                    <Link
                      href={`/?service=${s.contactParam}#contact`}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-transform hover:scale-110"
                      style={{ background: '#C4472A' }}
                    >
                      →
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
              style={{ background: 'rgba(184,118,10,0.1)', border: '0.5px solid rgba(184,118,10,0.3)', color: '#C49A20' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C49A20', animation: 'pulse 2s infinite' }} />
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
            style={{ background: '#B8760A' }}
          >
            Vérifier ma conformité
          </Link>
        </div>
      </div>
    </>
  )
}
