"use client"

import { motion } from "framer-motion"
import { Layers, Fingerprint, Zap, Anchor, MapPin, Target, Headphones } from "lucide-react"
import { RevealSection } from "@/components/ui/RevealSection"
import { staggerContainer, staggerItem, staggerItemX } from "@/lib/animations"

const stats = [
  {
    icon: Layers,            // Couches = profondeur d'expérience accumulée
    value: "5+",
    label: "Ans d'expérience",
    sub: "En développement web & apps",
    iconColor: "text-coral",
    iconBg: "bg-coral/10",
    border: "border-coral/20",
    accent: "#FF6B47",
  },
  {
    icon: Fingerprint,       // Empreinte = unique, jamais copié-collé
    value: "100%",
    label: "Sur-mesure garanti",
    sub: "Votre identité, votre solution",
    iconColor: "text-solar",
    iconBg: "bg-solar/10",
    border: "border-solar/20",
    accent: "#F5A623",
    description: "Chaque projet est conçu spécifiquement pour votre activité — design, contenu et fonctionnalités adaptés à votre réalité terrain.",
  },
  {
    icon: Zap,               // Éclair = rapidité, énergie, réactivité
    value: "< 24h",
    label: "Temps de réponse",
    sub: "Même le week-end",
    iconColor: "text-turquoise",
    iconBg: "bg-turquoise/10",
    border: "border-turquoise/20",
    accent: "#00D4AA",
  },
  {
    icon: Anchor,            // Ancre = ancré, enraciné physiquement ici
    value: "971",
    label: "Ancré en Guadeloupe",
    sub: "Basé à Baie-Mahault",
    iconColor: "text-violet",
    iconBg: "bg-violet/10",
    border: "border-violet/20",
    accent: "#8B5CF6",
  },
]

const values = [
  {
    title: "Local & Disponible",
    description: "On est en Guadeloupe, pas à Paris. On se déplace, on répond vite.",
    icon: MapPin,
    iconColor: "text-coral",
    iconBg: "bg-coral/10",
  },
  {
    title: "Tout en un",
    description: "Un seul interlocuteur pour votre site, vos apps, votre conformité fiscale 2026.",
    icon: Zap,
    iconColor: "text-solar",
    iconBg: "bg-solar/10",
  },
  {
    title: "Sur-mesure",
    description: "Aucun template. Chaque solution est construite pour votre activité.",
    icon: Target,
    iconColor: "text-turquoise",
    iconBg: "bg-turquoise/10",
  },
  {
    title: "Support Continu",
    description: "3 mois de support inclus après livraison. Je reste disponible pour vos questions.",
    icon: Headphones,
    iconColor: "text-violet",
    iconBg: "bg-violet/10",
  },
]

const skills = [
  "Next.js", "React", "WordPress", "WooCommerce", "Shopify",
  "SEO Local", "Facturation Électronique", "DGFiP", "Applications Métier",
]

export default function About() {
  return (
    <section id="apropos" className="py-16 md:py-24 bg-[#0A0A0F] scroll-mt-20 md:scroll-mt-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealSection className="mb-10 md:mb-16" delay={100}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            À Propos de SolYB
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl">
            Votre partenaire digital local en Guadeloupe
          </p>
        </RevealSection>

        {/* Asymmetric 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-16">
          {/* Left — Bio (3 of 5) */}
          <RevealSection className="lg:col-span-3" delay={150}>
            <div className="relative mb-8">
              <div className="relative z-10">
                {/* Founder tag */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <div
                    className="text-xs font-display uppercase text-coral bg-coral/10"
                    style={{
                      borderLeft: "2px solid #FF6B47",
                      padding: "4px 12px",
                      letterSpacing: "3px",
                    }}
                  >
                    FONDATEUR
                  </div>
                </div>

                <h3 className="font-display text-3xl font-bold text-[#F0EDE8] mb-1">
                  Yacine Bouhassoun
                </h3>
                <p className="text-coral font-semibold mb-6">
                  Expert Digital — Baie-Mahault, Guadeloupe
                </p>

                <div className="relative space-y-4 text-[#8B8B9E] leading-relaxed pl-6">
                  <span
                    className="absolute left-0 top-0 bottom-0 w-px bg-coral/20"
                    style={{ transformOrigin: 'top', animation: 'borderGrow 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s both' }}
                  />
                  <p>
                    Je m&apos;appelle Yacine. La Guadeloupe m&apos;a construit, et j&apos;ai envie de lui rendre la pareille.
                  </p>
                  <p>
                    Ma conviction : une île avec autant d&apos;énergie entrepreneuriale mérite une couverture numérique
                    à la hauteur. Pas des solutions importées qui ne collent pas à la réalité locale. Pas des tarifs
                    pensés pour des marchés qui n&apos;ont rien à voir avec le nôtre.
                  </p>
                  <p>
                    J&apos;ai toujours été passionné d&apos;informatique, curieux de tout, attiré par l&apos;idée de créer plutôt
                    que de subir. Et ce que j&apos;observe aujourd&apos;hui m&apos;inquiète autant qu&apos;il me motive : l&apos;IA a rendu
                    la création accessible à tout le monde. Des projets naissent en quelques heures —
                    mais sans ossature, sans analyse, sans vision réelle de ce qu&apos;il faudra faire pour tenir dans
                    six mois. Les bonnes idées deviennent des prototypes fragiles. Le temps s&apos;y perd. Et l&apos;élan,
                    souvent, aussi.
                  </p>
                  <p>
                    Ce que je propose aux TPE guadeloupéennes, c&apos;est autre chose : un regard humain sur leur projet,
                    une vraie réflexion avant d&apos;écrire la première ligne de code, et la sécurité de déléguer des
                    tâches qui semblent simples mais peuvent vite devenir un piège légal ou technique. Construire
                    moins vite, mais construire vrai.
                  </p>
                  <p>
                    L&apos;équipe SolYB intervient sur chaque projet — développement, design, intégration, conformité
                    fiscale — pour vous garantir un résultat à la hauteur, avec l&apos;ancrage local qui fait la différence.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills — FM stagger */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  variants={staggerItemX}
                  className={`px-4 py-2 text-sm font-medium border ${
                    skill === "Facturation Électronique" || skill === "DGFiP"
                      ? "bg-solar/10 text-solar border-solar/20"
                      : "bg-[#1C1C26] text-[#8B8B9E] border-[#2A2A38] hover:border-coral/30 hover:text-coral transition-colors"
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </RevealSection>

          {/* Right — Stats (2 of 5) */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className={`relative bg-[#13131A] border ${stat.border} rounded-2xl p-5 flex flex-col items-center text-center group overflow-hidden card-elevation hover:scale-[1.02] transition-transform duration-300`}
                    style={{ boxShadow: `0 0 0 0 ${stat.accent}00` }}
                  >
                    {/* Accent top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                      style={{ background: `linear-gradient(to right, ${stat.accent}, ${stat.accent}44)` }}
                    />

                    {/* Subtle bg glow */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                      style={{ background: stat.accent }}
                    />

                    {/* Icon */}
                    <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>

                    {/* Value */}
                    <div className="font-display text-3xl font-bold text-[#F0EDE8] mb-0.5 relative z-10">
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm font-semibold text-[#C8D4E8] relative z-10">
                      {stat.label}
                    </div>

                    {/* Sub */}
                    <div className={`text-xs mt-1 relative z-10`} style={{ color: `${stat.accent}BB` }}>
                      {stat.sub}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-6 hover:border-coral/30 transition-colors flex flex-col items-center text-center card-elevation"
            >
              <div className={`w-12 h-12 ${value.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <value.icon className={`w-6 h-6 ${value.iconColor}`} />
              </div>
              <h4 className="font-display font-bold text-[#F0EDE8] mb-2">{value.title}</h4>
              <p className="text-sm text-[#8B8B9E] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
