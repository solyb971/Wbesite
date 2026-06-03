"use client"

export default function ConversionFunnel() {
  const stages = [
    { label: "Leads", count: 23, percentage: 100, color: "bg-blue-500" },
    { label: "Contactés", count: 15, percentage: 65, color: "bg-green-500", conversionRate: 65 },
    { label: "Devis", count: 6, percentage: 26, color: "bg-yellow-500", conversionRate: 40 },
    { label: "Gagnés", count: 3, percentage: 13, color: "bg-purple-500", conversionRate: 50 },
  ]

  return (
    <div className="space-y-6">
      {stages.map((stage, index) => (
        <div key={stage.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="font-semibold text-gray-900">{stage.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">{stage.percentage}%</div>
              {stage.conversionRate && (
                <div className="text-xs text-gray-500">↓ {stage.conversionRate}% du précédent</div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden">
              <div
                className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-center text-white font-semibold`}
                style={{ width: `${stage.percentage}%` }}
              >
                {stage.percentage >= 20 && `${stage.count} leads`}
              </div>
            </div>
          </div>

          {index < stages.length - 1 && (
            <div className="flex items-center justify-center my-2">
              <div className="text-gray-400">↓</div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-900">
          🎯 <strong>Taux de conversion global:</strong> 13% (objectif: 15%)
        </div>
      </div>
    </div>
  )
}
