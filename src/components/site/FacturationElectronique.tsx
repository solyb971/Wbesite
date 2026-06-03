'use client'
import { CheckCircle, AlertTriangle, ArrowRight, FileCheck, Building2, Zap, Wrench, UtensilsCrossed, ShoppingBag, Scissors, Briefcase, Car, Truck, XCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RevealSection } from "@/components/ui/RevealSection"
import { staggerContainer, staggerItem } from "@/lib/animations"

const steps = [
  {
    icon: AlertTriangle,
    title: "La réforme s'applique progressivement",
    description: "Réception obligatoire dès 2026 pour les grandes entreprises, émission obligatoire pour les TPE/PME à partir de 2027. Anticiper maintenant, c'est éviter la précipitation et les erreurs coûteuses.",
    color: "text-coral",
    bg: "bg-coral/10",
    borderColor: "border-coral/20",
  },
  {
    icon: Zap,
    title: "Nous intégrons une solution conforme DGFiP dans votre système",
    description: "Nous analysons votre activité, votre logiciel de facturation actuel et vos flux d'échange avec vos clients et fournisseurs. Nous choisissons ensemble la solution PDP adaptée et nous l'intégrons dans votre quotidien sans tout bouleverser.",
    color: "text-solar",
    bg: "bg-solar/10",
    borderColor: "border-solar/20",
  },
  {
    icon: CheckCircle,
    title: "Vos factures partent et arrivent automatiquement, en conformité totale",
    description: "Émission, transmission, archivage légal — tout est automatisé. Vous ne changez pas votre façon de travailler, vous êtes simplement en conformité. Et nous restons disponibles pour répondre à vos questions.",
    color: "text-turquoise",
    bg: "bg-turquoise/10",
    borderColor: "border-turquoise/20",
  },
]

const sectors = [
  {
    icon: Wrench,
    iconColor: "text-coral",
    iconBg: "bg-coral/10",
    sector: "Artisan BTP — maçon, électricien, plombier",
    text: "Le BTP est le premier secteur employeur de Guadeloupe. Dès que vous facturez une autre entreprise (promoteur, syndic, sous-traitant), vous êtes soumis à la réforme. Émission obligatoire : septembre 2027.",
  },
  {
    icon: UtensilsCrossed,
    iconColor: "text-solar",
    iconBg: "bg-solar/10",
    sector: "Restaurant, traiteur, snack",
    text: "Vous livrez des buffets d'entreprise, vous facturez des comités ou des hôtels ? Ces opérations B2B tombent sous l'obligation. Même si votre activité est majoritairement B2C, l'e-reporting s'applique.",
  },
  {
    icon: ShoppingBag,
    iconColor: "text-turquoise",
    iconBg: "bg-turquoise/10",
    sector: "Commerce de détail et grossiste",
    text: "Le commerce représente la moitié du chiffre d'affaires des entreprises en Guadeloupe. Si vous avez des clients professionnels parmi vos acheteurs, chaque facture entre assujettis à la TVA est concernée.",
  },
  {
    icon: Scissors,
    iconColor: "text-violet",
    iconBg: "bg-violet/10",
    sector: "Coiffure, esthétique, bien-être",
    text: "Vous travaillez uniquement avec des particuliers ? Pas d'obligation d'émission — mais vous devrez tout de même recevoir des factures électroniques de vos fournisseurs dès septembre 2026 et transmettre vos données via l'e-reporting.",
  },
  {
    icon: Briefcase,
    iconColor: "text-rose",
    iconBg: "bg-rose/10",
    sector: "Profession libérale — consultant, formateur, agence, comptable",
    text: "Toute prestation facturée à une entreprise assujettie à la TVA entre dans le périmètre. Devis, honoraires, missions ponctuelles — tout est concerné.",
  },
  {
    icon: Car,
    iconColor: "text-lime",
    iconBg: "bg-lime/10",
    sector: "Garage, mécanique, réparation auto",
    text: "Vous facturez des entreprises pour l'entretien de leur flotte ? Obligation pleine. Vous travaillez uniquement avec des particuliers ? E-reporting uniquement.",
  },
  {
    icon: Truck,
    iconColor: "text-sky",
    iconBg: "bg-sky/10",
    sector: "Transport, livraison, logistique",
    text: "Secteur en forte croissance aux Antilles. Toute prestation inter-entreprises est soumise à l'e-invoicing dès septembre 2027.",
  },
]

const unchanged = [
  "Vos factures aux particuliers : pas d'e-invoicing, mais e-reporting à transmettre",
  "Saint-Martin et Saint-Barthélemy : non concernés par la réforme",
  "Première infraction régularisée sous 30 jours : pas de sanction immédiate",
]

export default function FacturationElectronique() {
  return (
    <section
      id="facturation"
      className="py-16 md:py-24 relative overflow-hidden scroll-mt-20 md:scroll-mt-36"
      style={{ background: "#0A0A0F" }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-solar/50 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-solar/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 reveal" data-reveal-index="0">
          <div className="inline-flex items-center gap-2 bg-coral/10 border border-coral/20 text-coral text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Obligatoire avant septembre 2026 en Guadeloupe</span>
            <span className="sm:hidden">Obligatoire dès 2026</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4 max-w-4xl mx-auto leading-snug">
            La facturation électronique devient obligatoire.{" "}
            <span className="text-solar">SolYB vous accompagne.</span>
          </h2>

          <p className="text-base md:text-lg text-[#8B8B9E] max-w-2xl mx-auto">
            Que vous soyez coiffeur, artisan, restaurateur, prestataire de services ou que vous ne vous êtes pas encore lancé — si vous facturez d'autres professionnels, cette réforme vous concerne. Et septembre 2026, ça arrive vite.
          </p>
        </div>

        {/* 3-step process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`bg-[#13131A] border ${step.borderColor} rounded-2xl p-8 flex flex-col items-center text-center reveal transition-all duration-300 card-elevation-solar`}
                data-reveal-index={String(index + 1)}
              >
                <div className={`w-12 h-12 ${step.bg} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#F0EDE8] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[#8B8B9E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Sectors concerned — restructured */}
        <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-6 md:p-8 mb-12 reveal card-shadow" data-reveal-index="4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-solar flex-shrink-0" />
            <h3 className="font-display text-xl md:text-2xl font-bold text-[#F0EDE8]">
              Facture électronique obligatoire en Guadeloupe : êtes-vous concerné ?
            </h3>
          </div>

          <p className="text-sm text-[#8B8B9E] leading-relaxed mb-8 max-w-3xl mx-auto text-center">
            Dès septembre 2026, toutes les entreprises de Guadeloupe assujetties à la TVA devront être en mesure
            de <strong className="text-[#F0EDE8] font-medium">recevoir</strong> des factures électroniques.
            L'obligation d'<strong className="text-[#F0EDE8] font-medium">émettre</strong> interviendra ensuite
            au 1er septembre 2027 pour les TPE, PME et micro-entreprises. Si vous avez des clients
            professionnels, vous êtes concerné — quelle que soit la taille de votre structure.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          >
            {sectors.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={i} variants={staggerItem} className="flex items-start gap-3 p-4 bg-[#1C1C26] rounded-xl card-shadow">
                  <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#F0EDE8] text-sm mb-1">{item.sector}</div>
                    <div className="text-xs text-[#8B8B9E] leading-relaxed">{item.text}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Sanctions */}
          <div className="bg-coral/5 border border-coral/20 rounded-xl p-5 mb-4 reveal" data-reveal-index="12">
            <h3 className="font-display font-bold text-[#F0EDE8] mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-coral flex-shrink-0" />
              Quelles sanctions en cas de non-conformité ?
            </h3>
            <p className="text-sm text-[#8B8B9E] leading-relaxed">
              La loi de finances 2026 a précisé les amendes applicables :{" "}
              <span className="text-[#F0EDE8]">50 € par facture non conforme</span>,{" "}
              <span className="text-[#F0EDE8]">500 € puis 1 000 €</span> pour l'absence de plateforme agréée
              après mise en demeure, dans la limite de{" "}
              <span className="text-[#F0EDE8]">15 000 € par an</span>. Au-delà des amendes, un client grand
              compte peut rejeter vos factures non conformes dès septembre 2026, ce qui allonge directement vos
              délais de paiement.
            </p>
          </div>

          {/* Ce qui ne change pas */}
          <div className="bg-[#1C1C26] rounded-xl p-5 mb-5 reveal" data-reveal-index="13">
            <h3 className="font-display font-bold text-[#F0EDE8] mb-3 text-sm">Ce qui ne change pas pour vous</h3>
            <ul className="space-y-2">
              {unchanged.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#8B8B9E]">
                  <XCircle className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal note */}
          <p className="text-xs text-[#8B8B9E]/60 leading-relaxed mb-3">
            Les entreprises établies en Guadeloupe, Martinique et La Réunion sont pleinement concernées par la
            facturation électronique obligatoire et l'e-reporting, la TVA étant applicable dans ces départements.
          </p>
          <a
            href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F31808"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8B8B9E]/50 hover:text-[#8B8B9E] transition-colors underline underline-offset-2"
          >
            En savoir plus sur la réforme → service-public.fr
          </a>
        </div>

        {/* Differentiator block */}
        <div
          className="rounded-2xl p-6 md:p-12 mb-12 relative overflow-hidden reveal card-shadow"
          data-reveal-index="22"
          style={{
            background: "linear-gradient(135deg, rgba(245,166,35,0.12) 0%, rgba(28,28,38,1) 50%, rgba(255,107,71,0.08) 100%)",
            border: "1px solid rgba(245,166,35,0.25)",
          }}
        >
          <div className="absolute top-4 right-8 font-display text-8xl font-bold text-solar/5 pointer-events-none select-none">
            971
          </div>
          <div className="relative flex items-start gap-4">
            <div className="w-14 h-14 bg-solar/10 border border-solar/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-7 h-7 text-solar" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F0EDE8] mb-3">
                SolYB — l'une des rares agences en Guadeloupe à maîtriser la facturation électronique
              </h3>
              <p className="text-[#8B8B9E] leading-relaxed max-w-2xl">
                Pendant que la majorité des agences restent sur du web classique, SolYB a investi pour maîtriser
                l'intégration technique complète de la facturation électronique conforme DGFiP. Vous bénéficiez
                d'un interlocuteur local unique qui comprend à la fois le digital{" "}
                <span className="text-[#F0EDE8]">et</span> vos obligations fiscales.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#contact"
            className="btn-studio btn-solar inline-flex items-center justify-center w-full sm:w-auto bg-solar text-[#0A0A0F] px-10 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-solar/20 mb-4"
          >
            <span className="relative z-10 flex items-center gap-3">Prendre rendez-vous pour un audit gratuit<ArrowRight className="w-5 h-5" /></span>
          </Link>
          <p className="text-sm text-[#8B8B9E]">
            Réponse sous 24h — Disponible dans tout le 971 (Grande-Terre, Basse-Terre, Marie-Galante, Saint-Martin)
          </p>
        </div>
      </div>
    </section>
  )
}
