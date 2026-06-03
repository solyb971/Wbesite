"use client"

import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, Users, Target, Zap, FileCheck, UtensilsCrossed, ArrowUpRight, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type ProductTab = "all" | "solyb_agency" | "factu_gp" | "resa_gp"

const PRODUCTS = [
  { id: "all" as ProductTab,          label: "Vue globale",    icon: Users,            color: "#6B7A99", textClass: "text-[#8090AA]", bgClass: "bg-white/[0.05]",    borderClass: "border-white/10",      ringClass: "ring-white/10" },
  { id: "solyb_agency" as ProductTab, label: "SolYB Agence",  icon: Zap,              color: "#FF6B47", textClass: "text-coral",     bgClass: "bg-coral/10",        borderClass: "border-coral/20",      ringClass: "ring-coral/20" },
  { id: "factu_gp" as ProductTab,     label: "FactuGP",        icon: FileCheck,        color: "#10B981", textClass: "text-emerald-400", bgClass: "bg-emerald-500/10", borderClass: "border-emerald-500/20", ringClass: "ring-emerald-500/20" },
  { id: "resa_gp" as ProductTab,      label: "ResaGP",         icon: UtensilsCrossed,  color: "#F97316", textClass: "text-orange-400",  bgClass: "bg-orange-500/10",  borderClass: "border-orange-500/20",  ringClass: "ring-orange-500/20" },
]

interface LeadData {
  status: string
  budget: number
  source?: string
  product_source?: string
  created_at: string
}

interface Metrics {
  total: number
  nouveau: number
  contact: number
  devis: number
  gagne: number
  perdu: number
  revenue: number
  pipeline: number
  convRate: number
  sources: Record<string, number>
}

function computeMetrics(leads: LeadData[]): Metrics {
  const total   = leads.length
  const nouveau = leads.filter(l => l.status === "nouveau").length
  const contact = leads.filter(l => l.status === "contact").length
  const devis   = leads.filter(l => l.status === "devis").length
  const gagne   = leads.filter(l => l.status === "gagne").length
  const perdu   = leads.filter(l => l.status === "perdu").length
  const revenue = leads.filter(l => l.status === "gagne").reduce((s, l) => s + (Number(l.budget) || 0), 0)
  const pipeline = leads.filter(l => ["nouveau","contact","devis"].includes(l.status)).reduce((s, l) => s + (Number(l.budget) || 0), 0)
  const convRate = total > 0 ? Math.round((gagne / total) * 100) : 0
  const sources: Record<string, number> = {}
  leads.forEach(l => { const k = l.source || "autre"; sources[k] = (sources[k] || 0) + 1 })
  return { total, nouveau, contact, devis, gagne, perdu, revenue, pipeline, convRate, sources }
}

function MetricCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string | number; sub?: string; color: string; icon: React.ElementType
}) {
  return (
    <div className="bg-[#0F1628] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all group overflow-hidden relative">
      <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" style={{ background: `${color}25` }} />
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-[#4B5870] text-xs font-medium">{label}</span>
      </div>
      <div className="text-[#E2E8F8] text-2xl font-bold">{value}</div>
      {sub && <div className="text-[#2E3A55] text-xs mt-1">{sub}</div>}
    </div>
  )
}

function FunnelBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 text-[#6B7A99] text-sm font-medium shrink-0">{label}</div>
      <div className="flex-1 bg-white/[0.04] rounded-full h-5 overflow-hidden">
        <div
          className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
          style={{ width: `${Math.max(pct, pct > 0 ? 4 : 0)}%`, background: color }}
        >
          {count > 0 && <span className="text-white text-xs font-semibold">{count}</span>}
        </div>
      </div>
      <div className="w-10 text-right text-[#4B5870] text-xs font-medium">{pct}%</div>
    </div>
  )
}

function ProductPanel({ product, metrics, isLoading }: {
  product: typeof PRODUCTS[number]
  metrics: Metrics
  isLoading: boolean
}) {
  const Icon = product.icon
  if (isLoading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="w-6 h-6 animate-spin text-[#4B5870]" />
    </div>
  )

  const funnelSteps = [
    { label: "Nouveau", count: metrics.nouveau, color: product.color },
    { label: "Contact", count: metrics.contact, color: `${product.color}CC` },
    { label: "Devis", count: metrics.devis, color: `${product.color}99` },
    { label: "Gagné", count: metrics.gagne, color: "#10B981" },
    { label: "Perdu", count: metrics.perdu, color: "#EF4444" },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      {product.id !== "all" && (
        <div className={`flex items-center gap-3 px-4 py-3 bg-[#0A0F1E] border ${product.borderClass} rounded-xl`}>
          <div className={`w-8 h-8 ${product.bgClass} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${product.textClass}`} />
          </div>
          <div>
            <div className={`text-sm font-semibold ${product.textClass}`}>{product.label}</div>
            <div className="text-[#3A4560] text-xs">{metrics.total} leads enregistrés</div>
          </div>
          {metrics.total === 0 && product.id !== "solyb_agency" && (
            <div className={`ml-auto text-[10px] font-medium ${product.textClass} bg-current/10 px-2.5 py-1 rounded-full opacity-70`}>
              En attente
            </div>
          )}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <MetricCard label="Total leads" value={metrics.total} color={product.color} icon={Users} />
        <MetricCard label="CA réalisé" value={`${metrics.revenue.toLocaleString("fr-FR")}€`} sub="leads gagnés" color="#10B981" icon={DollarSign} />
        <MetricCard label="Pipeline" value={`${metrics.pipeline.toLocaleString("fr-FR")}€`} sub="en cours" color="#0EA5E9" icon={TrendingUp} />
        <MetricCard label="Taux conv." value={`${metrics.convRate}%`} sub={`${metrics.gagne} gagnés`} color="#8B5CF6" icon={Target} />
        <MetricCard label="Gagnés" value={metrics.gagne} color="#10B981" icon={ArrowUpRight} />
      </div>

      {/* Funnel + Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#0F1628] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="text-[#E2E8F8] font-semibold text-sm mb-4">Funnel de conversion</h3>
          <div className="space-y-3">
            {funnelSteps.map(s => (
              <FunnelBar key={s.label} label={s.label} count={s.count} total={metrics.total} color={s.color} />
            ))}
          </div>
        </div>

        <div className="bg-[#0F1628] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="text-[#E2E8F8] font-semibold text-sm mb-4">Sources des leads</h3>
          {Object.keys(metrics.sources).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(metrics.sources)
                .sort(([,a],[,b]) => b - a)
                .map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between py-2.5 px-3 bg-white/[0.03] rounded-xl">
                    <span className="text-[#8090AA] text-sm capitalize">{source.replace(/-/g, " ")}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 rounded-full" style={{ width: `${Math.max(24, (count / Math.max(...Object.values(metrics.sources))) * 80)}px`, background: product.color }} />
                      <span className="text-[#E2E8F8] text-sm font-semibold w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-[#3A4560]">
              <div className="text-2xl mb-2">∅</div>
              <p className="text-xs">Aucune donnée disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<ProductTab>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [allLeads, setAllLeads] = useState<LeadData[]>([])

  useEffect(() => {
    async function fetch() {
      setIsLoading(true)
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
          setAllLeads([
            { status: "gagne", budget: 1200, source: "site-web", product_source: "solyb_agency", created_at: new Date().toISOString() },
            { status: "contact", budget: 800, source: "bouche-a-oreille", product_source: "solyb_agency", created_at: new Date().toISOString() },
            { status: "nouveau", budget: 500, source: "site-web", product_source: "factu_gp", created_at: new Date().toISOString() },
          ])
          return
        }
        const supabase = createClient()
        const { data } = await supabase.from("leads").select("status,budget,source,product_source,created_at")
        setAllLeads(data ?? [])
      } catch { /* silently fail */ }
      finally { setIsLoading(false) }
    }
    fetch()
  }, [])

  const leadsForTab = activeTab === "all"
    ? allLeads
    : allLeads.filter(l => (l.product_source ?? "solyb_agency") === activeTab)

  const metrics = computeMetrics(leadsForTab)
  const activeProduct = PRODUCTS.find(p => p.id === activeTab)!

  // Global overview cards
  const globalRevenue = allLeads.filter(l => l.status === "gagne").reduce((s, l) => s + (Number(l.budget) || 0), 0)
  const globalPipeline = allLeads.filter(l => ["nouveau","contact","devis"].includes(l.status)).reduce((s, l) => s + (Number(l.budget) || 0), 0)
  const globalConv = allLeads.length > 0 ? Math.round((allLeads.filter(l => l.status === "gagne").length / allLeads.length) * 100) : 0

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#E2E8F8] text-2xl font-bold">Analytics</h1>
          <p className="text-[#3A4560] text-sm mt-0.5">Performances multi-produits en temps réel</p>
        </div>
      </div>

      {/* Global summary — always visible */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Leads totaux" value={allLeads.length} sub="tous produits" color="#FF6B47" icon={Users} />
        <MetricCard label="CA total réalisé" value={`${globalRevenue.toLocaleString("fr-FR")}€`} color="#10B981" icon={DollarSign} />
        <MetricCard label="Pipeline global" value={`${globalPipeline.toLocaleString("fr-FR")}€`} color="#0EA5E9" icon={TrendingUp} />
        <MetricCard label="Conv. globale" value={`${globalConv}%`} color="#8B5CF6" icon={Target} />
      </div>

      {/* Per-product quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRODUCTS.filter(p => p.id !== "all").map(p => {
          const pLeads = allLeads.filter(l => (l.product_source ?? "solyb_agency") === p.id)
          const pGagne = pLeads.filter(l => l.status === "gagne").length
          const pConv  = pLeads.length > 0 ? Math.round((pGagne / pLeads.length) * 100) : 0
          const PIcon  = p.icon
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`group text-left relative bg-[#0F1628] border ${activeTab === p.id ? p.borderClass + " ring-1 " + p.ringClass : "border-white/[0.06] hover:border-white/[0.12]"} rounded-2xl p-4 transition-all overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `linear-gradient(135deg, ${p.color}08, transparent)` }} />
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-7 h-7 ${p.bgClass} rounded-lg flex items-center justify-center`}>
                  <PIcon className={`w-3.5 h-3.5 ${p.textClass}`} />
                </div>
                <span className={`text-sm font-semibold ${p.textClass}`}>{p.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[#E2E8F8] text-xl font-bold">{pLeads.length}</div>
                  <div className="text-[#3A4560] text-[10px] uppercase tracking-wide font-medium">leads</div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${p.textClass}`}>{pConv}%</div>
                  <div className="text-[#3A4560] text-[10px] uppercase tracking-wide font-medium">conv.</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#0A0F1E] border border-white/[0.05] rounded-xl overflow-x-auto scrollbar-none w-full sm:w-fit">
        {PRODUCTS.map(p => {
          const Icon = p.icon
          const isActive = activeTab === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? `${p.bgClass} ${p.textClass} ring-1 ${p.ringClass}`
                  : "text-[#4B5870] hover:text-[#8090AA] hover:bg-white/[0.03]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Product panel */}
      <ProductPanel product={activeProduct} metrics={metrics} isLoading={isLoading} />
    </div>
  )
}
