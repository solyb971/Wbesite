import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  sub?: string
  change?: { value: number; trend: "up" | "down" }
  icon: LucideIcon
  accent?: string        // hex color for the icon glow
  accentClass?: string   // tailwind text color class
  accentBg?: string      // tailwind bg class for icon container
}

export default function StatsCard({
  title,
  value,
  sub,
  change,
  icon: Icon,
  accent = "#C4472A",
  accentClass = "text-coral",
  accentBg = "bg-coral/10",
}: StatsCardProps) {
  return (
    <div className="group relative bg-[#1F1813] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-[#241C16] transition-all duration-200 overflow-hidden">
      {/* Subtle glow on hover */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: `${accent}20` }}
      />

      <div className="relative">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 ${accentBg} rounded-xl flex items-center justify-center border border-white/[0.05]`}>
            <Icon className={`w-5 h-5 ${accentClass}`} />
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
              change.trend === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}>
              {change.trend === "up"
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />}
              {Math.abs(change.value)}%
            </div>
          )}
        </div>

        {/* Value */}
        <div className="space-y-0.5">
          <p className="text-2xl font-bold text-[#F5EDD8] tracking-tight">{value}</p>
          <p className="text-sm font-medium text-[#7E715E]">{title}</p>
          {sub && <p className="text-xs text-[#574C3D]">{sub}</p>}
        </div>
      </div>
    </div>
  )
}
