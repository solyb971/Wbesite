"use client"

import { Shield, Award, Clock, CreditCard, Headphones, CheckCircle } from "lucide-react"

const badges = [
  { icon: Shield,      title: "Paiement Sécurisé",     description: "Paiement sécurisé",       iconColor: "text-coral",     iconBg: "bg-coral/10" },
  { icon: Award,       title: "Satisfaction Garantie", description: "3 révisions incluses",     iconColor: "text-solar",     iconBg: "bg-solar/10" },
  { icon: Clock,       title: "Livraison Rapide",       description: "2 à 3 semaines",           iconColor: "text-turquoise", iconBg: "bg-turquoise/10" },
  { icon: CreditCard,  title: "Paiement en 2x",         description: "50% à la commande",        iconColor: "text-violet",    iconBg: "bg-violet/10" },
  { icon: Headphones,  title: "Support Inclus",          description: "3 mois d'assistance",     iconColor: "text-rose",      iconBg: "bg-rose/10" },
  { icon: CheckCircle, title: "Ancré en Guadeloupe",     description: "Guadeloupe · 971",      iconColor: "text-lime",      iconBg: "bg-lime/10" },
]

interface TrustBadgesProps {
  variant?: "full" | "compact" | "inline"
  className?: string
}

export default function TrustBadges({ variant = "full", className = "" }: TrustBadgesProps) {
  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
        {badges.slice(0, 4).map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-[#8B8B9E]">
            <badge.icon className={`w-4 h-4 ${badge.iconColor}`} />
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={`bg-[#0D0D14] py-6 border-y border-[#2A2A38] ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {badges.map((badge, index) => (
              <div key={index} className="reveal flex items-center gap-3" data-reveal-index={String(index + 1)}>
                <div className={`w-10 h-10 ${badge.iconBg} rounded-full flex items-center justify-center`}>
                  <badge.icon className={`w-5 h-5 ${badge.iconColor}`} />
                </div>
                <div>
                  <p className="font-semibold text-[#F0EDE8] text-sm">{badge.title}</p>
                  <p className="text-xs text-[#8B8B9E]">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`py-14 bg-[#0D0D14] border-y border-[#2A2A38] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal" data-reveal-index="0">
          <h3 className="font-display text-2xl font-bold text-[#F0EDE8]">Pourquoi nous choisir ?</h3>
          <p className="text-[#8B8B9E] mt-2">Des garanties concrètes pour votre tranquillité</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group reveal bg-[#13131A] border border-[#2A2A38] rounded-xl p-4 text-center hover:border-coral/30 transition-colors card-elevation"
              data-reveal-index={String(index + 1)}
            >
              <div className={`w-12 h-12 ${badge.iconBg} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <badge.icon className={`w-6 h-6 ${badge.iconColor} group-hover:rotate-6 transition-transform duration-300`} />
              </div>
              <h4 className="font-semibold text-[#F0EDE8] text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-[#8B8B9E]">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
