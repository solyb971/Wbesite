import { Check, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { solutions, type Solution } from "@/lib/solutions-data"

const colorMap = {
  coral: {
    icon: "text-coral",
    iconBg: "bg-coral/10",
    border: "border-coral/30 hover:border-coral/60",
    badge: "bg-coral/10 text-coral border border-coral/20",
    badgeLive: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    check: "text-coral",
    pricing: "text-coral",
    cta: "bg-coral hover:bg-coral/90 text-white shadow-lg shadow-coral/20",
    ctaSecondary: "border-coral/30 text-coral hover:bg-coral/10",
  },
  solar: {
    icon: "text-solar",
    iconBg: "bg-solar/10",
    border: "border-solar/30 hover:border-solar/60",
    badge: "bg-solar/10 text-solar border border-solar/20",
    badgeLive: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    check: "text-solar",
    pricing: "text-solar",
    cta: "bg-solar hover:bg-solar/90 text-[#0A0A0F] shadow-lg shadow-solar/20",
    ctaSecondary: "border-solar/30 text-solar hover:bg-solar/10",
  },
  turquoise: {
    icon: "text-turquoise",
    iconBg: "bg-turquoise/10",
    border: "border-turquoise/30 hover:border-turquoise/60",
    badge: "bg-turquoise/10 text-turquoise border border-turquoise/20",
    badgeLive: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    check: "text-turquoise",
    pricing: "text-turquoise",
    cta: "bg-turquoise hover:bg-turquoise/90 text-[#0A0A0F] shadow-lg shadow-turquoise/20",
    ctaSecondary: "border-turquoise/30 text-turquoise hover:bg-turquoise/10",
  },
}

function SolutionCard({ solution }: { solution: Solution }) {
  const colors = colorMap[solution.color]
  const isLive = solution.status === "live"

  return (
    <div className={`group relative bg-[#13131A] border-2 ${colors.border} rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col`}>

      {/* Logo + status */}
      <div className="flex items-start justify-between mb-6">
        <div>
          {solution.logo ? (
            <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white mb-3">
              <Image
                src={solution.logo}
                alt={solution.name}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mb-3`}>
              <span className={`text-2xl font-bold ${colors.icon}`}>{solution.name[0]}</span>
            </div>
          )}
          <p className="text-xs text-[#8B8B9E]">{solution.target}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${isLive ? colors.badgeLive : colors.badge}`}>
            {isLive ? "✓ " : ""}{solution.statusLabel}
          </span>
          {isLive && (
            <span className="text-xs font-medium px-2.5 py-1.5 rounded-full bg-[#1C1C26] border border-[#2A2A38] text-[#8B8B9E]">
              Essai 14 jours
            </span>
          )}
        </div>
      </div>

      {/* Name + tagline */}
      <h3 className="font-display text-2xl font-bold text-[#F0EDE8] mb-2">{solution.name}</h3>
      <p className={`text-sm font-semibold ${colors.pricing} mb-3`}>{solution.tagline}</p>

      {/* Description */}
      <p className="text-sm text-[#8B8B9E] mb-6 leading-relaxed">{solution.description}</p>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1">
        {solution.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className={`w-4 h-4 ${colors.check} mt-0.5 flex-shrink-0`} />
            <span className="text-sm text-[#8B8B9E]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Pricing */}
      <div className="border-t border-[#2A2A38] pt-4 mb-5">
        <p className={`text-sm font-bold ${colors.pricing}`}>{solution.pricing}</p>
        <p className="text-xs text-[#8B8B9E] mt-0.5">{solution.pricingDetail}</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <Link
          href={solution.ctaHref}
          className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] ${colors.cta}`}
        >
          {solution.ctaLabel}
          <ExternalLink className="w-4 h-4" />
        </Link>
        {solution.secondaryCta && (
          <Link
            href={solution.secondaryCta.href}
            className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-[1.02] ${colors.ctaSecondary}`}
          >
            {solution.secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-[#0A0A0F] scroll-mt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal" data-reveal-index="0">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            Des outils clés en main
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl mx-auto">
            En plus des projets sur-mesure, SolYB développe ses propres outils pour les entreprises guadeloupéennes —
            abonnement mensuel, prêts à l&apos;emploi, sans complexité technique.
          </p>
        </div>

        {/* Solutions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={solution.id} className="reveal" data-reveal-index={String(index + 1)}>
              <SolutionCard solution={solution} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
