import Link from "next/link"
import { Globe, ShoppingCart, Smartphone, Check } from "lucide-react"

const services = [
  {
    title: "Site Vitrine",
    tag: "Le plus demandé",
    accent: "var(--syb-rust)",
    Icon: Globe,
    description: "Un site pensé pour votre clientèle locale. Rapide, lisible sur mobile, référencé pour cibler votre région et étendre votre identité.",
    price: "Dès 599€",
    features: [
      "Site 5 pages, adapté au mobile",
      "Référencement local Guadeloupe",
      "Hébergement + domaine 1 an",
      "Formation 1h · 3 révisions",
    ],
    contactParam: "vitrine",
  },
  {
    title: "E-commerce",
    tag: "Vente en ligne",
    accent: "var(--syb-rust-light)",
    Icon: ShoppingCart,
    description: "Votre boutique en ligne, aux couleurs de votre marque. Vous la gérez en autonomie — paiement sécurisé, livraison, catalogue.",
    price: "Dès 999€",
    features: [
      "Boutique complète, autonome",
      "Paiement en ligne sécurisé",
      "Gestion de la livraison en GP",
      "Formation 1h30 · support 2 mois",
    ],
    contactParam: "ecommerce",
  },
  {
    title: "Application Métier",
    tag: "Sur mesure",
    accent: "var(--syb-rust-deep)",
    Icon: Smartphone,
    description: "Un logiciel fait pour votre métier, pas pour le métier d'un autre. Cahier des charges, architecture, intégrations — on construit tout de zéro pour votre logique.",
    price: "Sur devis",
    features: [
      "Cahier des charges sur-mesure",
      "Conçu pour votre métier",
      "Évolutif dans le temps",
      "Devis détaillé sous 24h",
    ],
    contactParam: "application",
  },
]

const maintenance = {
  price: "39€/mois",
  features: ["Mises à jour & sécurité", "Sauvegarde quotidienne", "Support prioritaire", "1h de modifs/mois"],
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-28 scroll-mt-20"
      style={{ background: 'var(--syb-warm)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
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

        {/* Ancre tarifs (la grille porte aussi le rôle "tarifs") */}
        <div id="tarifs" className="scroll-mt-24" />

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

                {/* Prix */}
                <div className="font-display font-black mb-3" style={{ fontSize: '30px', color: 'var(--syb-ink)', letterSpacing: '-1px' }}>
                  {s.price}
                </div>

                <p className="text-xs font-light leading-relaxed mb-4" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>
                  {s.description}
                </p>

                {/* Inclus */}
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs font-light" style={{ color: 'var(--syb-stone)', lineHeight: 1.4 }}>
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--syb-rust-light)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/?service=${s.contactParam}#contact`}
                  className="inline-flex items-center justify-center w-full text-sm font-normal transition-transform hover:-translate-y-px"
                  style={{ background: 'var(--syb-rust)', color: '#fff', padding: '11px 22px', borderRadius: '4px' }}
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance — prolongement après livraison (pas une 4e offre) */}
        <div
          className="reveal mt-4 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: 'var(--syb-cream)', border: '0.5px solid var(--syb-border)' }}
        >
          <div>
            <div className="text-[11px] tracking-[2px] uppercase mb-1.5" style={{ color: 'var(--syb-teal-deep)' }}>
              Et après la livraison ?
            </div>
            <p className="font-display font-bold mb-1" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>
              Maintenance — {maintenance.price}
            </p>
            <p className="text-xs font-light" style={{ color: 'var(--syb-stone)' }}>
              {maintenance.features.join(' · ')}. Pour ne jamais vous en occuper.
            </p>
          </div>
          <Link
            href="/?service=maintenance#contact"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-normal flex-shrink-0 transition-transform hover:-translate-y-px"
            style={{ background: 'transparent', color: 'var(--syb-ink)', border: '0.5px solid var(--syb-ink)', padding: '10px 22px', borderRadius: '4px' }}
          >
            S&apos;abonner
          </Link>
        </div>

        {/* Réassurance */}
        <p className="reveal mt-8 text-xs font-light text-center" style={{ color: 'var(--syb-stone-light)' }}>
          Paiement en 2 fois (50 % à la commande, 50 % à la livraison) · Devis gratuit · Sans engagement
        </p>
      </div>
    </section>
  )
}
