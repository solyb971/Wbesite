import { Lead } from "@/hooks/useLeads"
import {
  getProfitabilityEstimate,
  getTimeEstimate,
  getComplexityInfo,
  getMarginHealth,
} from "@/lib/utils/time-estimate"
import { Banknote, Clock, TrendingUp, AlertTriangle } from "lucide-react"

interface ProfitabilityProps {
  lead: Lead
}

function marginTone(margin: number) {
  if (margin >= 40) return { text: "text-emerald-300", bar: "bg-emerald-500", ring: "border-emerald-500/20 bg-emerald-500/[0.07]" }
  if (margin >= 20) return { text: "text-sky-300", bar: "bg-sky-500", ring: "border-sky-500/20 bg-sky-500/[0.07]" }
  if (margin >= 0) return { text: "text-amber-300", bar: "bg-amber-500", ring: "border-amber-500/20 bg-amber-500/[0.07]" }
  return { text: "text-red-300", bar: "bg-red-500", ring: "border-red-500/20 bg-red-500/[0.07]" }
}

export default function Profitability({ lead }: ProfitabilityProps) {
  const profitability = getProfitabilityEstimate(lead, 50)
  const timeEstimate = getTimeEstimate(lead)
  const complexity = getComplexityInfo(profitability.complexity)
  const marginHealth = getMarginHealth(profitability.profitMargin)
  const tone = marginTone(profitability.profitMargin)
  const laborCost = profitability.estimatedHours * profitability.hourlyRate
  const netMargin = profitability.estimatedRevenue - laborCost

  return (
    <div className="bg-[#1F1813] rounded-2xl border border-white/[0.06] p-5">
      <h3 className="text-sm font-bold text-[#F5EDD8] mb-5 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-coral" />
        Rentabilité &amp; estimations
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 mb-1.5 text-[#7E715E]">
            <Banknote className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Revenu</span>
          </div>
          <p className="text-lg font-bold text-[#F5EDD8]">
            {profitability.estimatedRevenue.toLocaleString("fr-FR")}€
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 mb-1.5 text-[#7E715E]">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Charge</span>
          </div>
          <p className="text-lg font-bold text-[#F5EDD8]">{profitability.estimatedHours}h</p>
          <p className="text-[10px] text-[#7E715E] mt-0.5">{timeEstimate.days} jours</p>
        </div>
      </div>

      {/* Marge */}
      <div className={`p-4 rounded-xl border mb-5 ${tone.ring}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className={`font-semibold text-sm ${tone.text}`}>{marginHealth.label}</h4>
            <p className="text-xs text-[#A89880] mt-0.5">{marginHealth.recommendation}</p>
          </div>
          <div className="text-right shrink-0">
            <p className={`text-2xl font-bold ${tone.text}`}>{profitability.profitMargin}%</p>
            <p className="text-[10px] text-[#7E715E]">Marge</p>
          </div>
        </div>
        <div className="w-full bg-white/[0.08] rounded-full h-1.5 mt-3">
          <div
            className={`h-1.5 rounded-full ${tone.bar}`}
            style={{ width: `${Math.max(0, Math.min(100, profitability.profitMargin))}%` }}
          />
        </div>
      </div>

      {/* Complexité */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-[#A89880]">Complexité du projet</span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-[#E8DDC8] border border-white/[0.08]">
          {complexity.label}
        </span>
      </div>

      {/* Détails financiers */}
      <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
        <h4 className="font-semibold text-[#F5EDD8] text-xs mb-1">Détails financiers</h4>
        <Row label="Taux horaire" value={`${profitability.hourlyRate}€/h`} />
        <Row label="Coût main d'œuvre" value={`${laborCost.toLocaleString("fr-FR")}€`} />
        <Row label="Budget client" value={`${profitability.estimatedRevenue.toLocaleString("fr-FR")}€`} />
        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06]">
          <span className="text-[#F5EDD8] font-semibold">Marge nette</span>
          <span className={`font-bold ${netMargin >= 0 ? "text-emerald-300" : "text-red-300"}`}>
            {netMargin.toLocaleString("fr-FR")}€
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2.5">
        <h4 className="font-semibold text-[#F5EDD8] text-xs mb-1">Timeline estimée</h4>
        <Row label="Durée totale" value={`${timeEstimate.days} jours`} />
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#A89880]">Livraison prévue</span>
          <span className="font-semibold text-coral">{timeEstimate.formattedDeadline}</span>
        </div>
      </div>

      {/* Alerte marge faible */}
      {profitability.profitMargin < 20 && (
        <div className="mt-5 p-3.5 bg-amber-500/[0.07] border border-amber-500/15 rounded-xl flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-[#C2B79E]">
            <p className="font-semibold text-amber-300 mb-0.5">Marge faible</p>
            <p>Négociez le budget à la hausse ou réduisez le scope pour améliorer la rentabilité.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-[#A89880]">{label}</span>
      <span className="font-semibold text-[#E8DDC8]">{value}</span>
    </div>
  )
}
