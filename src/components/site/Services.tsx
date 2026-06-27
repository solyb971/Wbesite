import Link from "next/link"
import { Globe, ShoppingCart, Smartphone } from "lucide-react"

const services = [
  {
    title: "Site Vitrine",
    tag: "Le plus demandé",
    accent: "var(--syb-rust)",
    Icon: Globe,
    description: "Un site pensé pour votre clientèle locale. Rapide, lisible sur mobile, référencé pour cibler votre région et étendre votre identité.",
    price: "Dès 599€",
    contactParam: "vitrine",
  },
  {
    title: "E-commerce",
    tag: "Vente en ligne",
    accent: "var(--syb-rust-light)",
    Icon: ShoppingCart,
    description: "Une boutique complète, à votre image, pouvant être gérée de manière autonome, incluant les services que vous voulez mettre en place comme le paiement en ligne sécurisé ou la gestion de la livraison.",
    price: "Dès 999€",
    contactParam: "ecommerce",
  },
  {
    title: "Application Métier",
    tag: "Sur mesure",
    accent: "var(--syb-rust-deep)",
    Icon: Smartphone,
    description: "Un logiciel fait pour votre métier, pas pour le métier d'un autre. On part d'une feuille blanche et on construit ce que vous ne trouvez pas dans les solutions existantes.",
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
        style={{ background: 'var(--syb-warm)' }}
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
                Ce qu&apos;on construit<br />
                <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>pour vous</em>
              </h2>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: '#7A7268' }}>
              Chaque projet repart de zéro. On part de vous, de votre marché, de votre clientèle et de votre logique métier pour avoir la solution la plus optimisée possible à vos besoins.
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
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(196,71,42,0.08)', border: '0.5px solid rgba(196,71,42,0.18)', color: s.accent }}
                    >
                      <s.Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="text-[11px] tracking-[2px] uppercase" style={{ color: 'var(--syb-stone-light)' }}>
                      {s.tag}
                    </span>
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

      {/* Bandeau facturation électronique — GELÉ (détonnait trop). Conservé pour
          réactivation ultérieure : remettre <FacturationBanner /> dans le fragment. */}
    </>
  )
}
