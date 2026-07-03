"use client"

interface CapacityIndicatorProps {
  total: number
  used: number
  remaining: number
  percentage: number
}

export default function CapacityIndicator({ total, used, remaining, percentage }: CapacityIndicatorProps) {
  const barColor = percentage >= 90 ? "bg-orange-500" : percentage >= 70 ? "bg-yellow-500" : "bg-green-500"
  const statusColor = percentage >= 90 ? "text-orange-400" : percentage >= 70 ? "text-yellow-400" : "text-emerald-400"
  const statusLabel = percentage >= 90 ? "Surcharge" : percentage >= 70 ? "Charge élevée" : "Normal"

  return (
    <div className="space-y-4">
      {/* Barre de progression */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#A89880]">Utilisé : {used}h / {total}h disponibles</span>
          <span className={`text-sm font-bold ${statusColor}`}>{percentage}% • {statusLabel}</span>
        </div>
        <div className="w-full bg-white/[0.06] rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-[#15110B] border border-white/[0.05] rounded-xl">
          <div className="text-2xl font-bold text-[#F5EDD8]">{total}h</div>
          <div className="text-xs text-[#6B5F4E]">Disponible</div>
        </div>
        <div className="text-center p-3 bg-[#15110B] border border-white/[0.05] rounded-xl">
          <div className={`text-2xl font-bold ${statusColor}`}>{used}h</div>
          <div className="text-xs text-[#6B5F4E]">Utilisé</div>
        </div>
        <div className="text-center p-3 bg-[#15110B] border border-white/[0.05] rounded-xl">
          <div className={`text-2xl font-bold ${statusColor}`}>{remaining}h</div>
          <div className="text-xs text-[#6B5F4E]">Restant</div>
        </div>
      </div>
    </div>
  )
}
