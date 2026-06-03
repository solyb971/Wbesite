"use client"

import { Monitor, Smartphone, FileCheck, Cloud, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, type MouseEvent, type ReactNode } from "react"
import { motion } from "framer-motion"
import { RevealSection } from "@/components/ui/RevealSection"
import { staggerContainer, staggerItem } from "@/lib/animations"

const services = [
  {
    icon: Monitor,
    number: "01",
    contactParam: "vitrine",
    title: "Sites Web Sur-Mesure",
    tag: "À partir de 599€",
    tagColor: "text-turquoise",
    accentColor: "#00D4AA",
    accentRgb: "0,212,170",
    description: "Un site qui donne envie d'appeler, de réserver, d'acheter — optimisé pour être trouvé sur Google par vos clients locaux.",
    features: [
      "Design unique, aucun template",
      "Référencement local inclus (votre ville, votre quartier)",
      "Hébergement 1 an offert",
      "Formation complète incluse",
    ],
    iconBg: "bg-turquoise/10",
    iconColor: "text-turquoise",
    borderColor: "border-turquoise/20",
  },
  {
    icon: Smartphone,
    number: "02",
    contactParam: "application",
    title: "Applications Métier",
    tag: "Sur devis",
    tagColor: "text-coral",
    accentColor: "#FF6B47",
    accentRgb: "255,107,71",
    description: "Des outils digitaux taillés pour votre activité — gestion, réservation, commande, fidélisation. Conçus pour les entreprises guadeloupéennes.",
    features: [
      "Application web ou mobile",
      "Interface adaptée à votre métier",
      "Gestion des données en temps réel",
      "Formation & support inclus",
    ],
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
    borderColor: "border-coral/20",
  },
  {
    icon: Cloud,
    number: "03",
    contactParam: "saas",
    title: "SaaS & Marketplace",
    tag: "Sur devis",
    tagColor: "text-solar",
    accentColor: "#F5A623",
    accentRgb: "245,166,35",
    description: "Vous avez une idée de plateforme ? Nous la construisons de A à Z — de la maquette au déploiement, optimisée pour la Caraïbe.",
    features: [
      "Architecture SaaS scalable",
      "Marketplace multi-vendeurs",
      "Paiements sécurisés intégrés",
      "Tableau de bord analytics",
    ],
    iconBg: "bg-solar/10",
    iconColor: "text-solar",
    borderColor: "border-solar/20",
  },
]

function TiltCard({
  children,
  className = "",
  accentRgb = "255,107,71",
}: {
  children: ReactNode
  className?: string
  accentRgb?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    // Angle ±8° — ressenti "poids" naturel sans exagération
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    const mx = (x / rect.width) * 100
    const my = (y / rect.height) * 100

    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px) scale(1.02)`

    // Ombre directionnelle : suit le tilt comme une vraie source de lumière
    const intensity = Math.sqrt(rotX * rotX + rotY * rotY) / 11
    const shadowX = rotY * 3
    const shadowY = rotX * -3
    el.style.boxShadow = [
      `${shadowX}px ${shadowY + 18}px ${35 + intensity * 25}px rgba(0,0,0,0.65)`,
      `${shadowX * 0.6}px ${shadowY * 0.6}px ${20 + intensity * 35}px rgba(${accentRgb},${0.18 + intensity * 0.4})`,
      `0 0 0 1px rgba(${accentRgb},${0.12 + intensity * 0.28})`,
    ].join(', ')

    // Reflet de curseur interne
    const glow = el.querySelector<HTMLDivElement>(".tilt-glow")
    if (glow) {
      glow.style.opacity = "1"
      glow.style.background = `radial-gradient(ellipse at ${mx}% ${my}%, rgba(${accentRgb},0.22) 0%, transparent 55%)`
    }
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ""
    el.style.boxShadow = ""
    const glow = el.querySelector<HTMLDivElement>(".tilt-glow")
    if (glow) glow.style.opacity = "0"
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#0D0D14] scroll-mt-20 md:scroll-mt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealSection className="mb-10 md:mb-16 text-center" delay={100}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            4 expertises,{" "}
            <span className="text-coral">1 seule agence</span>
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl mx-auto">
            Un seul interlocuteur pour tout ce dont votre entreprise a besoin.
            Site web, application mobile, facturation électronique, outils de gestion — nous construisons, nous accompagnons, et nous répondons quand vous appelez.
          </p>
        </RevealSection>

        {/* 3 standard services — stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div key={index} variants={staggerItem}>
              <TiltCard
                accentRgb={service.accentRgb}
                className={`group relative bg-[#13131A] border ${service.borderColor} rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden card-shadow h-full`}
              >
                {/* Tilt glow highlight */}
                <div
                  className="tilt-glow absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,107,71,0.07) 0%, transparent 60%)`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                />

                {/* Watermark number */}
                <div
                  className="absolute bottom-[-1rem] right-[-0.5rem] font-display font-bold pointer-events-none select-none transition-all duration-300"
                  style={{
                    fontSize: "7rem",
                    color: "transparent",
                    WebkitTextStroke: `1px rgba(255,107,71,0.06)`,
                    lineHeight: 1,
                  }}
                >
                  {service.number}
                </div>

                <div className="relative z-10 flex flex-col items-center text-center w-full">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>

                  {/* Tag — style éditorial avec border-left */}
                  <div
                    className={`flex items-center gap-2 mb-3 px-3 py-1.5 ${service.iconBg}`}
                    style={{
                      borderLeft: `2px solid ${service.accentColor}`,
                      letterSpacing: "3px",
                    }}
                  >
                    <span className={`text-xs font-semibold uppercase ${service.tagColor}`}>
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#F0EDE8] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-[#8B8B9E] text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 w-full">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start justify-center gap-2 text-sm text-[#8B8B9E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-turquoise mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Prix + CTA */}
                  <div className="border-t border-[#2A2A38] pt-5 w-full flex items-center justify-between mt-auto">
                    <span
                      className={`font-display text-base font-bold ${service.tagColor}`}
                    >
                      {service.tag}
                    </span>
                    <Link
                      href={`/?service=${service.contactParam}#contact`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#F0EDE8] hover:text-coral transition-colors group-hover:gap-3"
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Facturation Électronique — featured card */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
        <TiltCard accentRgb="245,166,35" className="relative bg-gradient-to-br from-solar-900/50 via-[#1C1C26] to-coral-900/20 border border-solar/40 rounded-2xl p-8 md:p-10 overflow-hidden card-shadow">
          <div className="tilt-glow absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(245,166,35,0.07) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s" }} />
          <div className="absolute top-0 right-0 w-64 h-64 bg-solar/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-solar/10 border border-solar/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-7 h-7 text-solar" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <span
                    className="bg-coral/10 text-coral border border-coral/20 text-xs font-bold px-3 py-1 uppercase"
                    style={{ letterSpacing: "2px" }}
                  >
                    ⚡ RÉFORME EN COURS
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F0EDE8] mb-3">
                Facturation Électronique Conforme
              </h3>

              <p className="text-[#8B8B9E] leading-relaxed mb-4 max-w-2xl">
                La réforme arrive, et beaucoup de TPE guadeloupéennes ne savent pas encore par où commencer.
                C&apos;est normal — c&apos;est technique, c&apos;est nouveau, et les informations circulent mal.{" "}
                <span className="text-[#F0EDE8] font-medium">Nous traduisons ces obligations en actions concrètes,</span>{" "}
                adaptées à votre secteur et à votre taille.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Conforme DGFiP", "Intégration système", "Audit gratuit", "Accompagnement 971"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-solar/10 text-solar border border-solar/20 px-3 py-1"
                    style={{ borderLeft: "2px solid #F5A623", letterSpacing: "1px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/facturation-electronique"
                  className="btn-studio inline-flex items-center justify-center bg-solar text-[#0A0A0F] px-8 py-4 font-bold text-base shadow-xl shadow-solar/20 whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Voir FactuGP
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <Link
                  href="/?service=facturation#contact"
                  className="inline-flex items-center justify-center gap-2 border border-solar/30 text-solar hover:bg-solar/10 px-8 py-3 font-semibold text-sm rounded-xl transition-all whitespace-nowrap"
                >
                  Audit gratuit — sans engagement
                </Link>
              </div>
            </div>
          </div>
        </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
