import { Lead } from "@/hooks/useLeads"
import {
  getScoreBreakdown,
  getScoreRecommendations,
  getScoreColor,
  getScoreBgColor,
  getPriorityColor,
} from "@/lib/utils/scoring"
import { Star, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

interface ScoreCardProps {
  lead: Lead
}

export default function ScoreCard({ lead }: ScoreCardProps) {
  const breakdown = getScoreBreakdown(lead)
  const recommendations = getScoreRecommendations(lead)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Star className="w-5 h-5 text-primary" />
          <span>Score & Analyse</span>
        </h3>

        {/* Total Score Badge */}
        <div className={`px-4 py-2 rounded-full ${getScoreBgColor(breakdown.total.score)}`}>
          <div className="flex items-center space-x-2">
            <Star className={`w-5 h-5 ${getScoreColor(breakdown.total.score)}`} />
            <span className={`text-2xl font-bold ${getScoreColor(breakdown.total.score)}`}>
              {breakdown.total.score}
            </span>
            <span className="text-sm text-gray-600">/100</span>
          </div>
        </div>
      </div>

      {/* Priority Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(recommendations.priority)}`}>
          <AlertCircle className="w-4 h-4" />
          <span>
            Priorité {recommendations.priority === "high" ? "HAUTE" : recommendations.priority === "medium" ? "Moyenne" : "Basse"}
          </span>
        </span>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-gray-900 text-sm">Détail du Score</h4>

        {[
          { key: "budget", icon: "💰" },
          { key: "clarity", icon: "📝" },
          { key: "urgency", icon: "⏰" },
          { key: "fit", icon: "🎯" },
          { key: "responsiveness", icon: "📞" },
          { key: "source", icon: "🌟" },
        ].map(({ key, icon }) => {
          const item = breakdown[key as keyof Omit<typeof breakdown, "total">]
          if (typeof item === "object" && "score" in item && "label" in item) {
            const percentage = (item.score / item.max) * 100

            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 flex items-center space-x-2">
                    <span>{icon}</span>
                    <span className="capitalize">{item.label}</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.score}/{item.max}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      percentage >= 80
                        ? "bg-green-500"
                        : percentage >= 60
                        ? "bg-yellow-500"
                        : percentage >= 40
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Actions Recommandées */}
      {recommendations.actions.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>Actions Recommandées</span>
          </h4>
          <ul className="space-y-2">
            {recommendations.actions.map((action, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                <span className="text-primary mt-0.5">→</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Strengths */}
      {recommendations.strengths.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Points Forts</span>
          </h4>
          <ul className="space-y-2">
            {recommendations.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {recommendations.concerns.length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span>Points d'Attention</span>
          </h4>
          <ul className="space-y-2">
            {recommendations.concerns.map((concern, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                <span className="text-yellow-600 mt-0.5">⚠</span>
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
