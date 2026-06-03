import { Lead } from "@/hooks/useLeads"
import {
  getProfitabilityEstimate,
  getTimeEstimate,
  getComplexityInfo,
  getMarginHealth,
} from "@/lib/utils/time-estimate"
import { DollarSign, Clock, TrendingUp, AlertTriangle } from "lucide-react"

interface ProfitabilityProps {
  lead: Lead
}

export default function Profitability({ lead }: ProfitabilityProps) {
  const profitability = getProfitabilityEstimate(lead, 50) // 50€/h hourly rate
  const timeEstimate = getTimeEstimate(lead)
  const complexity = getComplexityInfo(profitability.complexity)
  const marginHealth = getMarginHealth(profitability.profitMargin)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        <span>Rentabilité & Estimations</span>
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Revenue */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Revenu Estimé</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {profitability.estimatedRevenue.toLocaleString("fr-FR")}€
          </p>
        </div>

        {/* Hours */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Heures Estimées</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{profitability.estimatedHours}h</p>
          <p className="text-xs text-purple-700 mt-1">{timeEstimate.days} jours au total</p>
        </div>
      </div>

      {/* Margin Health */}
      <div className={`p-4 rounded-lg mb-6 ${marginHealth.color}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{marginHealth.label}</h4>
            <p className="text-sm opacity-90">{marginHealth.recommendation}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{profitability.profitMargin}%</p>
            <p className="text-xs opacity-75">Marge</p>
          </div>
        </div>

        {/* Margin Bar */}
        <div className="w-full bg-white/30 rounded-full h-2 mt-3">
          <div
            className={`h-2 rounded-full ${
              profitability.profitMargin >= 40
                ? "bg-green-600"
                : profitability.profitMargin >= 20
                ? "bg-blue-600"
                : profitability.profitMargin >= 0
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
            style={{
              width: `${Math.max(0, Math.min(100, profitability.profitMargin))}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Complexity Badge */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Complexité du projet</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${complexity.color}`}>
            {complexity.label}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 text-sm">Détails Financiers</h4>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Taux horaire</span>
          <span className="font-semibold text-gray-900">{profitability.hourlyRate}€/h</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Coût de la main d'œuvre</span>
          <span className="font-semibold text-gray-900">
            {(profitability.estimatedHours * profitability.hourlyRate).toLocaleString("fr-FR")}€
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Budget client</span>
          <span className="font-semibold text-gray-900">
            {profitability.estimatedRevenue.toLocaleString("fr-FR")}€
          </span>
        </div>

        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
          <span className="text-gray-900 font-semibold">Marge nette</span>
          <span
            className={`font-bold ${
              profitability.profitMargin >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {(
              profitability.estimatedRevenue -
              profitability.estimatedHours * profitability.hourlyRate
            ).toLocaleString("fr-FR")}
            €
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 text-sm mb-3">Timeline Estimée</h4>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Début estimé</span>
            <span className="text-gray-900">{timeEstimate.formattedDeadline.split(" ")[0]}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Durée totale</span>
            <span className="text-gray-900">{timeEstimate.days} jours</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Livraison prévue</span>
            <span className="font-semibold text-primary">{timeEstimate.formattedDeadline}</span>
          </div>
        </div>
      </div>

      {/* Warning if low margin */}
      {profitability.profitMargin < 20 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold mb-1">Attention : Marge faible</p>
              <p>
                Envisagez de négocier le budget à la hausse ou de réduire le scope du projet pour
                améliorer la rentabilité.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
