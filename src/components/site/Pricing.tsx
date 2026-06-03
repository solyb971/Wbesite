'use client'
import { Check, ArrowRight, CreditCard, Zap, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RevealSection } from "@/components/ui/RevealSection"
import { staggerContainer, staggerItem } from "@/lib/animations"

const pricingPlans = [
  {
    name: "Starter",
    subtitle: "Site Vitrine",
    price: "599",
    normalPrice: null,
    customBadge: "Tarif de lancement — places limitées",
    description: "Parfait pour démarrer votre présence en ligne en Guadeloupe",
    features: [
      "Site web 5 pages responsive",
      "SEO local Guadeloupe inclus",
      "Formulaire de contact",
      "Hébergement + domaine 1 an inclus",
      "Formation 1h en visio",
      "3 révisions incluses",
      "Support 1 mois par email",
    ],
    cta: "Choisir Starter",
    accentColor: "border-turquoise/40 hover:border-turquoise/60",
    ctaClass: "bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-turquoise/30",
    popular: false,
  },
  {
    name: "Business",
    subtitle: "E-commerce",
    price: "999",
    normalPrice: null,
    customBadge: "Tarif de lancement — places limitées",
    description: "Solution complète pour vendre en ligne en Guadeloupe",
    features: [
      "Boutique en ligne complète",
      "Jusqu'à 20 produits inclus",
      "Paiement sécurisé en ligne",
      "Gestion livraison Guadeloupe",
      "Design premium responsive",
      "SEO local + Marketing",
      "Formation 1h30 gestion boutique",
      "3 révisions incluses",
      "Support 2 mois par email",
    ],
    cta: "Choisir Business",
    accentColor: "border-coral/60",
    ctaClass: "bg-coral hover:bg-coral-600 text-white shadow-lg shadow-coral/20",
    popular: true,
  },
  {
    name: "Maintenance",
    subtitle: "Support continu",
    subTitle: "Réservé aux projets réalisés par SolYB",
    price: "39",
    normalPrice: null,
    customBadge: "Tarif de lancement — places limitées",
    period: "/mois",
    description: "Votre site reste rapide, sécurisé et à jour — sans que vous ayez à vous en occuper. Inclus automatiquement dans chaque projet, ou souscrit après livraison.",
    footerNote: "* Disponible uniquement pour les sites et applications développés par SolYB.",
    features: [
      "Mises à jour sécurité",
      "Backup quotidien",
      "Support prioritaire",
      "Jusqu'à 1h de modifications/mois",
      "Monitoring automatisé 24/7",
      "Certificat SSL",
      "Rapports mensuels",
    ],
    cta: "S'abonner",
    accentColor: "border-solar/40 hover:border-solar/60",
    ctaClass: "bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-solar/30",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="tarifs" className="py-16 md:py-24 bg-[#0A0A0F] scroll-mt-20 md:scroll-mt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealSection className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            Tarifs Transparents
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl mx-auto mb-6">
            Des prix clairs, adaptés aux entreprises guadeloupéennes — aucun frais caché
          </p>
        </RevealSection>

        {/* Pricing Grid — stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`relative bg-[#13131A] border-2 ${plan.accentColor} rounded-2xl p-8 text-center card-elevation ${
                plan.popular ? "md:scale-[1.04]" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-coral text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-coral/40">
                    Plus populaire
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-[#F0EDE8] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#8B8B9E]">{plan.subtitle}</p>
                {plan.subTitle && (
                  <p className="text-xs text-[#8B8B9E]/70 mt-0.5">
                    {plan.subTitle}{plan.footerNote && <span className="text-[#8B8B9E]/50"> *</span>}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="font-display text-5xl font-bold text-[#F0EDE8]">{plan.price}€</span>
                  {plan.period && <span className="text-[#8B8B9E]">{plan.period}</span>}
                </div>
                {plan.normalPrice ? (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-[#8B8B9E]/60 line-through">{plan.normalPrice}€</span>
                      <span className="text-xs bg-turquoise/10 text-turquoise px-2 py-0.5 rounded-full font-semibold">
                        -{Math.round((1 - parseInt(plan.price) / parseInt((plan.normalPrice as string).replace(' ', ''))) * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-[#8B8B9E] mt-1">Offre de lancement</p>
                  </>
                ) : plan.customBadge ? (
                  <p className="text-xs text-solar font-semibold mt-1">{plan.customBadge}</p>
                ) : null}
              </div>

              <p className="text-sm text-[#8B8B9E] mb-6">{plan.description}</p>

              <Link
                href="/#contact"
                className={`block w-full text-center px-6 py-4 rounded-xl font-semibold transition-all mb-8 ${plan.popular ? "btn-studio bg-coral text-white shadow-lg shadow-coral/20" : plan.ctaClass}`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3 inline-block text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#8B8B9E]">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.footerNote && (
                <p className="text-xs text-[#8B8B9E]/60 mt-6 leading-relaxed">{plan.footerNote}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Info cards — stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {[
            { icon: CreditCard, iconColor: "text-turquoise", iconBg: "bg-turquoise/10", title: "Paiement Flexible", text: "50% à la commande, 50% à la livraison" },
            { icon: Zap, iconColor: "text-solar", iconBg: "bg-solar/10", title: "Livraison Rapide", text: "2 à 3 semaines selon le projet" },
            { icon: BadgeCheck, iconColor: "text-coral", iconBg: "bg-coral/10", title: "Satisfaction Garantie", text: "Révisions illimitées jusqu'à satisfaction" },
          ].map((item, i) => (
            <motion.div key={i} variants={staggerItem} className="group text-center p-6 bg-[#13131A] border border-[#2A2A38] rounded-xl hover:border-coral/30 transition-colors card-elevation">
              <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <item.icon className={`w-6 h-6 ${item.iconColor} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`} />
              </div>
              <h4 className="font-semibold text-[#F0EDE8] mb-1">{item.title}</h4>
              <p className="text-sm text-[#8B8B9E]">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-[#8B8B9E] mb-4">
            Vous avez des questions sur nos tarifs ou besoin d'un devis facturation électronique ?
          </p>
          <Link
            href="/#contact"
            className="group inline-flex items-center text-coral hover:text-coral-400 font-semibold text-lg transition-colors"
          >
            Contactez-nous pour un devis personnalisé
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
