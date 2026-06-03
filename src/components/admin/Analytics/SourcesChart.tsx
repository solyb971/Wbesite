"use client"

export default function SourcesChart() {
  const sources = [
    { label: "Bouche-à-oreille", leads: 8, conversion: 25, color: "bg-green-500" },
    { label: "LinkedIn", leads: 12, conversion: 15, color: "bg-blue-500" },
    { label: "Site web", leads: 3, conversion: 10, color: "bg-purple-500" },
  ]

  const maxLeads = Math.max(...sources.map((s) => s.leads))

  return (
    <div className="space-y-6">
      {sources.map((source, index) => (
        <div key={source.label}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{index + 1}.</span>
              <span className="font-medium text-gray-900">{source.label}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">{source.leads} leads</span>
              <span className="font-semibold text-primary">{source.conversion}% conv</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className={`h-full ${source.color} transition-all duration-500`}
                style={{ width: `${(source.leads / maxLeads) * 100}%` }}
              />
            </div>
            <div className="w-16 text-right text-sm font-medium text-gray-700">{source.conversion}%</div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="text-sm text-green-900">
          💡 <strong>Insight:</strong> Focus sur bouche-à-oreille = meilleur ROI (25% conversion vs 15% moyenne)
        </div>
      </div>
    </div>
  )
}
