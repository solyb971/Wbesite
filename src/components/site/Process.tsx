'use client'

import { Phone, Palette, Code, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import { RevealSection } from "@/components/ui/RevealSection"
import { staggerContainer, staggerItem } from "@/lib/animations"

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Audit Gratuit",
    description: "Un appel de 30 minutes pour comprendre vos besoins, vos objectifs et votre cible en Guadeloupe.",
    duration: "Jour 1",
    details: [
      "Analyse de vos besoins",
      "Définition de l'arborescence",
      "Choix du design",
    ],
    color: "text-coral",
    accentColor: "#FF6B47",
    bg: "bg-coral/10",
    border: "border-coral/20",
  },
  {
    icon: Palette,
    number: "02",
    title: "Proposition",
    description: "Conception du design sur mesure avec 2 allers-retours — nous vous présentons une solution adaptée à votre activité.",
    duration: "Jours 2-5",
    details: [
      "Design unique, sans template",
      "2 révisions incluses",
      "Validation par vous",
    ],
    color: "text-solar",
    accentColor: "#F5A623",
    bg: "bg-solar/10",
    border: "border-solar/20",
  },
  {
    icon: Code,
    number: "03",
    title: "Développement",
    description: "Intégration, fonctionnalités et tests sur tous les appareils. Vous validez à chaque étape.",
    duration: "Jours 6-12",
    details: [
      "Code optimisé et sécurisé",
      "Responsive mobile/tablette",
      "Tests multi-navigateurs",
    ],
    color: "text-turquoise",
    accentColor: "#00D4AA",
    bg: "bg-turquoise/10",
    border: "border-turquoise/20",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Livraison & Suivi",
    description: "Mise en ligne, formation complète et support 3 mois inclus. Nous restons disponibles.",
    duration: "Jours 13-14",
    details: [
      "Formation 1h en visio",
      "Documentation complète",
      "Support 3 mois inclus",
    ],
    color: "text-violet",
    accentColor: "#8B5CF6",
    bg: "bg-violet/10",
    border: "border-violet/20",
  },
]

export default function Process() {
  return (
    <section className="py-16 md:py-24 bg-[#0D0D14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealSection className="mb-10 md:mb-16 text-center" delay={100}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl mx-auto">
            Un processus simple et transparent en 4 étapes — de l&apos;audit gratuit à la livraison en 2 à 3 semaines.
          </p>
        </RevealSection>

        {/* Steps grid */}
        <div className="relative">
          {/* Ligne de connexion */}
          <div
            className="connection-line absolute hidden lg:block pointer-events-none"
            style={{
              top: "3.5rem", left: "10%", right: "10%", height: "1px",
              background: "linear-gradient(to right, transparent, rgba(255,107,71,0.2) 20%, rgba(255,107,71,0.2) 80%, transparent)",
            }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className={`group relative bg-[#13131A] border ${step.border} rounded-2xl p-7 flex flex-col items-center text-center overflow-hidden`}
                  style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${step.accentColor}18` }}
                >
                  {/* Top accent bar */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(to right, ${step.accentColor}, ${step.accentColor}88)`, originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                  />

                  {/* Ghost number */}
                  <div
                    className="absolute bottom-3 right-3 font-display font-bold pointer-events-none select-none"
                    style={{
                      fontSize: "4rem",
                      lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1px ${step.accentColor}28`,
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center w-full">
                    <div className={`w-12 h-12 ${step.bg} rounded-xl flex items-center justify-center mb-5`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>

                    <div
                      className={`text-xs font-bold uppercase ${step.color} mb-2`}
                      style={{ letterSpacing: "3px" }}
                    >
                      {step.duration}
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#F0EDE8] mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-[#8B8B9E] mb-5 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-1.5 w-full">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center justify-center gap-2 text-xs text-[#8B8B9E]">
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: step.accentColor }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <RevealSection className="bg-[#13131A] border border-coral/20 rounded-2xl p-8 text-center max-w-2xl mx-auto" delay={200}>
          <h3 className="font-display text-2xl font-bold text-[#F0EDE8] mb-3">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="text-[#8B8B9E] mb-6">
            De la conception à la livraison en 2 à 3 semaines pour un site vitrine.
          </p>
          <a
            href="/#contact"
            className="btn-studio inline-block bg-coral text-white px-8 py-4 font-semibold shadow-lg shadow-coral/20"
          >
            <span className="relative z-10">Commencer maintenant</span>
          </a>
        </RevealSection>
      </div>
    </section>
  )
}
