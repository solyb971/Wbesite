import type { Metadata } from 'next'
import Link from "next/link"
import { ArrowRight, Check, X, Sparkles, Clock, Shield, Headphones, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Tarifs Création Site Web Guadeloupe — Offre de Lancement | SolYB",
  description: "Sites vitrines dès 599€, e-commerce dès 999€ en Guadeloupe. Offre de lancement -40%, aucun frais caché, formation et support inclus. Devis gratuit.",
  keywords: [
    'tarifs site web Guadeloupe',
    'prix création site 971',
    'offre lancement agence digitale',
    'devis site web Guadeloupe',
    'tarif développement web Antilles',
    'site vitrine 599€ Guadeloupe',
  ],
  alternates: { canonical: 'https://solyb.fr/tarifs' },
  openGraph: {
    title: 'Tarifs Site Web Guadeloupe — Dès 599€ | SolYB',
    description: 'Sites vitrines dès 599€, e-commerce dès 999€. Offre de lancement -40% pour les TPE guadeloupéennes.',
    url: 'https://solyb.fr/tarifs',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{
      url: '/opengraph-image',
      width: 1000, height: 1000,
      alt: 'SolYB — Tarifs création site web Guadeloupe',
    }],
  },
  robots: { index: true, follow: true },
}

const plans = [
  {
    name: "Site Vitrine",
    description: "Pour présenter votre activité",
    price: "599",
    originalPrice: "999",
    accentColor: "text-turquoise",
    borderColor: "border-turquoise/30",
    glowColor: "shadow-turquoise/10",
    popular: false,
    features: [
      "Design unique, aucun template",
      "5 pages personnalisées",
      "Formulaire de contact",
      "SEO local Guadeloupe inclus",
      "Hébergement + domaine 1 an inclus",
      "Formation 2h en visio",
      "3 mois support inclus",
    ],
    notIncluded: ["Paiement en ligne", "Gestion produits"],
  },
  {
    name: "E-commerce",
    description: "Pour vendre en ligne",
    price: "999",
    originalPrice: "1699",
    accentColor: "text-coral",
    borderColor: "border-coral/50",
    glowColor: "shadow-coral/15",
    popular: true,
    features: [
      "Tout du Site Vitrine +",
      "Boutique en ligne complète",
      "Paiement sécurisé (Stripe)",
      "Gestion catalogue produits",
      "Suivi des commandes",
      "Configuration livraison Guadeloupe",
      "Formation e-commerce 4h",
      "3 mois support inclus",
    ],
    notIncluded: [],
  },
  {
    name: "Maintenance",
    description: "Gardez votre site à jour",
    price: "39",
    originalPrice: "69",
    period: "/mois",
    accentColor: "text-solar",
    borderColor: "border-solar/30",
    glowColor: "shadow-solar/10",
    popular: false,
    features: [
      "Mises à jour sécurité",
      "Sauvegardes automatiques",
      "Monitoring 24/7",
      "Corrections bugs",
      "Support prioritaire",
      "Jusqu'à 1h de modifications/mois",
      "Rapport mensuel",
    ],
    notIncluded: ["Refonte graphique", "Nouvelles fonctionnalités majeures"],
  },
]

const extras = [
  { name: "SEO Local Guadeloupe", price: "199€/mois", desc: "Optimisation pour apparaître dans les recherches Google locales" },
  { name: "Contenu IA", price: "150€/mois", desc: "20 posts réseaux sociaux + 4 articles blog par mois" },
  { name: "Formation WordPress", price: "299€", desc: "Formation complète 6h pour gérer votre site en autonomie" },
  { name: "Refonte graphique", price: "399€", desc: "Nouveau design pour votre site existant" },
]

const faqs = [
  { q: "Y a-t-il des frais cachés ?", a: "Non. Le prix inclut design, développement, hébergement 1 an, formation et 3 mois de support. Seul le nom de domaine (~15€/an) est à prévoir si vous n'en avez pas." },
  { q: "Quels sont les délais de livraison ?", a: "Site vitrine : 10-14 jours. E-commerce : 14-21 jours. Ces délais sont garantis dès validation du brief et réception des contenus." },
  { q: "Comment se passe le paiement ?", a: "50% à la validation du devis, 50% à la livraison. Paiement par virement ou carte (Stripe)." },
  { q: "L'offre de lancement est valable combien de temps ?", a: "Limitée aux 30 premiers clients. Contactez-nous vite pour en profiter !" },
]

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">

      {/* Hero */}
      <section className="pt-20 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-solar/10 border border-solar/20 text-solar px-4 py-2 rounded-full mb-8 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Offre de lancement — places limitées
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#F0EDE8] mb-6">
            Tarifs <span className="text-coral">Transparents</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8B8B9E] max-w-2xl mx-auto">
            Le prix annoncé est le prix final — formation et support inclus. Aucun frais caché.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-[#13131A] border-2 ${plan.borderColor} rounded-2xl p-8 flex flex-col shadow-xl ${plan.glowColor} ${plan.popular ? 'md:scale-[1.04]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-coral text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-coral/30">
                    Plus populaire
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className={`font-display text-2xl font-bold ${plan.accentColor} mb-1`}>{plan.name}</h2>
                <p className="text-sm text-[#8B8B9E]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-[#F0EDE8]">{plan.price}€</span>
                  {plan.period && <span className="text-[#8B8B9E]">{plan.period}</span>}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#8B8B9E] line-through text-sm">{plan.originalPrice}€{plan.period}</span>
                  <span className="text-xs text-solar font-semibold">Tarif de lancement</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#8B8B9E]">
                    <Check className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#8B8B9E]/40">
                    <X className="w-4 h-4 text-[#8B8B9E]/30 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/#contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-coral hover:bg-coral-600 text-white shadow-lg shadow-coral/20'
                    : 'bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] hover:border-coral/30'
                }`}
              >
                Choisir {plan.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D14] border-y border-[#2A2A38]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0EDE8] text-center mb-10">
            Nos Garanties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, color: 'text-turquoise', bg: 'bg-turquoise/10', title: 'Livraison Garantie', text: 'Votre site livré dans les délais annoncés ou remboursé' },
              { icon: Shield, color: 'text-coral', bg: 'bg-coral/10', title: 'Satisfaction 100%', text: 'Modifications illimitées jusqu\'à validation complète' },
              { icon: Headphones, color: 'text-solar', bg: 'bg-solar/10', title: 'Support Inclus', text: '3 mois de support technique inclus après livraison' },
            ].map((g, i) => (
              <div key={i} className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-6 text-center hover:border-coral/20 transition-colors">
                <div className={`w-12 h-12 ${g.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <g.icon className={`w-6 h-6 ${g.color}`} />
                </div>
                <h3 className="font-display font-bold text-[#F0EDE8] mb-2">{g.title}</h3>
                <p className="text-sm text-[#8B8B9E]">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services complémentaires */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0EDE8] text-center mb-10">
            Services Complémentaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {extras.map((e, i) => (
              <div key={i} className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-5 flex items-start gap-4 hover:border-coral/20 transition-colors">
                <div className="w-8 h-8 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-coral" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-[#F0EDE8] text-sm">{e.name}</span>
                    <span className="font-display font-bold text-coral text-sm whitespace-nowrap">{e.price}</span>
                  </div>
                  <p className="text-xs text-[#8B8B9E]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D14] border-t border-[#2A2A38]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0EDE8] text-center mb-10">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-6 hover:border-coral/20 transition-colors">
                <h3 className="font-display font-bold text-[#F0EDE8] mb-2">{f.q}</h3>
                <p className="text-sm text-[#8B8B9E] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-[#8B8B9E] mb-8">
            Demandez votre devis gratuit — réponse sous 24h, sans engagement.
          </p>
          <Link
            href="/#contact"
            className="btn-studio inline-flex items-center gap-2 bg-coral text-white px-8 py-4 font-bold text-lg shadow-xl shadow-coral/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Obtenir mon devis gratuit
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </section>

    </main>
  )
}
