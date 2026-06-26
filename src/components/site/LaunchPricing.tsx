import Link from "next/link"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    category: "Site vitrine",
    price: "599",
    period: "€",
    features: [
      "Site 5 pages, adapté au mobile",
      "Référencement local Guadeloupe inclus",
      "Hébergement + nom de domaine 1 an",
      "Formation 1h en visio",
      "3 révisions incluses",
      "Support 1 mois par email",
    ],
    cta: { label: "Choisir Starter", href: "/?service=vitrine#contact" },
    featured: false,
  },
  {
    name: "Business",
    category: "E-commerce",
    price: "999",
    period: "€",
    features: [
      "Boutique en ligne complète",
      "Jusqu'à 20 produits inclus",
      "Paiement sécurisé en ligne",
      "Gestion de la livraison en Guadeloupe",
      "Référencement local + marketing",
      "Formation 1h30 · support 2 mois",
    ],
    cta: { label: "Choisir Business", href: "/?service=ecommerce#contact" },
    featured: true,
  },
]

// La maintenance n'est pas une offre concurrente : c'est un prolongement après
// la livraison → présentée à part (cf. audit A2-6).
const maintenance = {
  price: "39",
  period: "€/mois",
  features: ["Mises à jour & sécurité", "Sauvegarde quotidienne", "Support prioritaire", "1h de modifs/mois"],
  cta: { label: "S'abonner", href: "/?service=maintenance#contact" },
}

export default function LaunchPricing() {
  return (
    <section id="tarifs" className="py-24 md:py-28 scroll-mt-20" style={{ background: 'var(--syb-warm)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal mb-12 max-w-2xl">
          <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: 'var(--syb-rust)' }}>
            <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
            Tarifs · Offre de lancement
          </div>
          <h2
            className="font-display font-black leading-none mb-5"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}
          >
            Des prix clairs,<br />
            <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>pour des projets réels</em>
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--syb-stone)', lineHeight: 1.8 }}>
            Des tarifs pensés pour les entrepreneurs guadeloupéens.{' '}
            <span style={{ color: 'var(--syb-ink)' }}>Honnêtes, détaillés, sans mauvaise surprise.</span>{' '}
            Paiement en deux fois, devis gratuit sous 24h.
          </p>
        </div>

        {/* Plans */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: plan.featured ? 'var(--syb-ink)' : 'var(--syb-cream)',
                border: plan.featured
                  ? '0.5px solid var(--syb-ink)'
                  : '0.5px solid var(--syb-border)',
              }}
            >
              {plan.featured && (
                <div
                  className="absolute top-4 right-4 text-[10px] tracking-[2px] uppercase rounded-full px-2.5 py-1"
                  style={{ background: 'var(--syb-rust)', color: '#fff' }}
                >
                  Recommandé pour démarrer
                </div>
              )}

              <div style={{ height: '4px', background: 'var(--syb-rust)' }} />

              <div className="p-7 flex flex-col flex-1">
                <div
                  className="text-[11px] tracking-[2px] uppercase mb-1"
                  style={{ color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--syb-stone-light)' }}
                >
                  {plan.category}
                </div>
                <h3
                  className="font-display font-bold mb-4"
                  style={{ fontSize: '22px', color: plan.featured ? 'var(--syb-cream)' : 'var(--syb-ink)' }}
                >
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className="font-display font-black leading-none"
                    style={{ fontSize: '46px', color: plan.featured ? '#fff' : 'var(--syb-ink)', letterSpacing: '-1.5px' }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="font-light text-lg"
                    style={{ color: plan.featured ? 'rgba(255,255,255,0.7)' : 'var(--syb-stone)' }}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-xs font-light"
                      style={{ color: plan.featured ? 'rgba(255,255,255,0.78)' : 'var(--syb-stone)', lineHeight: 1.5 }}
                    >
                      <Check
                        className="mt-0.5 flex-shrink-0"
                        size={14}
                        style={{ color: 'var(--syb-rust-light)' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta.href}
                  className="cta-arrow inline-flex items-center justify-center gap-1.5 w-full text-sm font-normal transition-transform hover:-translate-y-px"
                  style={{
                    background: plan.featured ? 'var(--syb-rust)' : 'transparent',
                    color: plan.featured ? '#fff' : 'var(--syb-ink)',
                    border: plan.featured ? 'none' : '0.5px solid var(--syb-ink)',
                    padding: '12px 24px',
                    borderRadius: '4px',
                  }}
                >
                  {plan.cta.label} <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance — prolongement après livraison (pas une 3e offre) */}
        <div
          className="reveal mt-4 max-w-3xl mx-auto rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: 'var(--syb-cream)', border: '0.5px solid var(--syb-border)' }}
        >
          <div>
            <div className="text-[11px] tracking-[2px] uppercase mb-1.5" style={{ color: 'var(--syb-teal-deep)' }}>
              Et après la livraison ?
            </div>
            <p className="font-display font-bold mb-1" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>
              Maintenance — {maintenance.price}{maintenance.period}
            </p>
            <p className="text-xs font-light" style={{ color: 'var(--syb-stone)' }}>
              {maintenance.features.join(' · ')}. Pour ne jamais vous en occuper.
            </p>
          </div>
          <Link
            href={maintenance.cta.href}
            className="cta-arrow inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-normal flex-shrink-0 transition-transform hover:-translate-y-px"
            style={{ background: 'transparent', color: 'var(--syb-ink)', border: '0.5px solid var(--syb-ink)', padding: '10px 22px', borderRadius: '4px' }}
          >
            {maintenance.cta.label} <span className="arrow">→</span>
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
