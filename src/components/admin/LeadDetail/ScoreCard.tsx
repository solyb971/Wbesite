import { Lead } from "@/hooks/useLeads"
import { getScoreBreakdown, getScoreRecommendations } from "@/lib/utils/scoring"
import { Star, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

interface ScoreCardProps {
  lead: Lead
}

function scoreTone(score: number) {
  if (score >= 80) return { text: "text-emerald-300", bar: "bg-emerald-500", ring: "border-emerald-500/30 bg-emerald-500/10" }
  if (score >= 60) return { text: "text-amber-300", bar: "bg-amber-500", ring: "border-amber-500/30 bg-amber-500/10" }
  if (score >= 40) return { text: "text-orange-300", bar: "bg-orange-500", ring: "border-orange-500/30 bg-orange-500/10" }
  return { text: "text-red-300", bar: "bg-red-500", ring: "border-red-500/30 bg-red-500/10" }
}

const priorityTone: Record<string, string> = {
  high: "bg-red-500/15 text-red-300 border-red-500/20",
  medium: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  low: "bg-white/[0.06] text-[#9A8C78] border-white/[0.08]",
}

export default function ScoreCard({ lead }: ScoreCardProps) {
  const breakdown = getScoreBreakdown(lead)
  const recommendations = getScoreRecommendations(lead)
  const tone = scoreTone(breakdown.total.score)

  return (
    <div className="bg-[#1F1813] rounded-2xl border border-white/[0.06] p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-[#F5EDD8] flex items-center gap-2">
          <Star className="w-4 h-4 text-coral" />
          Score &amp; analyse
        </h3>
        <div className={`px-3 py-1.5 rounded-xl border flex items-baseline gap-1 ${tone.ring}`}>
          <span className={`text-xl font-bold ${tone.text}`}>{breakdown.total.score}</span>
          <span className="text-[10px] text-[#7E715E]">/100</span>
        </div>
      </div>

      {/* Priorité */}
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border mb-5 ${priorityTone[recommendations.priority]}`}
      >
        <AlertCircle className="w-3.5 h-3.5" />
        Priorité {recommendations.priority === "high" ? "haute" : recommendations.priority === "medium" ? "moyenne" : "basse"}
      </span>

      {/* Détail du score */}
      <div className="space-y-3 mb-5">
        {[
          { key: "budget", label: "Budget" },
          { key: "clarity", label: "Clarté" },
          { key: "urgency", label: "Urgence" },
          { key: "fit", label: "Adéquation" },
          { key: "responsiveness", label: "Réactivité" },
          { key: "source", label: "Source" },
        ].map(({ key, label }) => {
          const item = breakdown[key as keyof Omit<typeof breakdown, "total">]
          if (typeof item === "object" && "score" in item && "label" in item) {
            const pct = (item.score / item.max) * 100
            const t = scoreTone(pct)
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#A89880]">{label}</span>
                  <span className="text-xs font-semibold text-[#E8DDC8]">
                    {item.score}/{item.max}
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all ${t.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Actions recommandées */}
      {recommendations.actions.length > 0 && (
        <div className="mb-4 p-3.5 bg-coral/[0.07] border border-coral/15 rounded-xl">
          <h4 className="font-semibold text-[#F5EDD8] text-xs mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-coral" />
            Actions recommandées
          </h4>
          <ul className="space-y-1.5">
            {recommendations.actions.map((action, i) => (
              <li key={i} className="text-xs text-[#C2B79E] flex items-start gap-2">
                <span className="text-coral mt-px">→</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Points forts */}
      {recommendations.strengths.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-[#F5EDD8] text-xs mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Points forts
          </h4>
          <ul className="space-y-1.5">
            {recommendations.strengths.map((s, i) => (
              <li key={i} className="text-xs text-[#C2B79E] flex items-start gap-2">
                <span className="text-emerald-400 mt-px">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Points d'attention */}
      {recommendations.concerns.length > 0 && (
        <div className="p-3.5 bg-amber-500/[0.07] border border-amber-500/15 rounded-xl">
          <h4 className="font-semibold text-[#F5EDD8] text-xs mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Points d&apos;attention
          </h4>
          <ul className="space-y-1.5">
            {recommendations.concerns.map((c, i) => (
              <li key={i} className="text-xs text-[#C2B79E] flex items-start gap-2">
                <span className="text-amber-400 mt-px">⚠</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
