"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Users, TrendingUp, DollarSign, Target, Plus, Zap, FileCheck, UtensilsCrossed, ArrowRight } from "lucide-react"
import { useLeads, LeadFilters } from "@/hooks/useLeads"
import StatsCard from "@/components/admin/Shared/StatsCard"
import FilterBar from "@/components/admin/Shared/FilterBar"
import KanbanBoard from "@/components/admin/Pipeline/KanbanBoard"
import NewLeadDialog from "@/components/admin/Pipeline/NewLeadDialog"

type ProductSource = "all" | "solyb_agency" | "factu_gp" | "resa_gp"

const PRODUCTS: {
  id: ProductSource
  label: string
  icon: React.ElementType
  color: string
  textClass: string
  borderClass: string
  bgClass: string
  ringClass: string
  dotClass: string
}[] = [
  {
    id: "all",
    label: "Tous",
    icon: Users,
    color: "#6B7A99",
    textClass: "text-[#8090AA]",
    borderClass: "border-white/10",
    bgClass: "bg-white/[0.04]",
    ringClass: "ring-white/10",
    dotClass: "bg-[#6B7A99]",
  },
  {
    id: "solyb_agency",
    label: "SolYB Agence",
    icon: Zap,
    color: "#FF6B47",
    textClass: "text-coral",
    borderClass: "border-coral/20",
    bgClass: "bg-coral/10",
    ringClass: "ring-coral/20",
    dotClass: "bg-coral",
  },
  {
    id: "factu_gp",
    label: "FactuGP",
    icon: FileCheck,
    color: "#10B981",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/10",
    ringClass: "ring-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
  {
    id: "resa_gp",
    label: "ResaGP",
    icon: UtensilsCrossed,
    color: "#F97316",
    textClass: "text-orange-400",
    borderClass: "border-orange-500/20",
    bgClass: "bg-orange-500/10",
    ringClass: "ring-orange-500/20",
    dotClass: "bg-orange-500",
  },
]

function ProductOverviewCard({
  product, leads,
}: {
  product: typeof PRODUCTS[number]
  leads: ReturnType<typeof useLeads>["leads"]
}) {
  const router = useRouter()
  const Icon = product.icon

  const filtered = product.id === "all"
    ? leads
    : leads.filter(l => (l.product_source ?? "solyb_agency") === product.id)

  const gagnes = filtered.filter(l => l.status === "gagne")
  const pipeline = filtered
    .filter(l => ["nouveau","contact","devis"].includes(l.status))
    .reduce((s, l) => s + (l.budget || 0), 0)
  const revenue = gagnes.reduce((s, l) => s + (l.estimated_revenue || l.budget || 0), 0)
  const convRate = filtered.length > 0 ? Math.round((gagnes.length / filtered.length) * 100) : 0

  if (product.id === "all") return null

  return (
    <div
      className={`relative group bg-[#0F1628] border ${product.borderClass} rounded-2xl p-5 hover:border-opacity-50 transition-all duration-200 cursor-pointer overflow-hidden`}
      onClick={() => router.push("/admin/analytics")}
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
        style={{ background: `${product.color}15` }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center gap-2.5`}>
          <div className={`w-8 h-8 ${product.bgClass} rounded-lg flex items-center justify-center border border-white/[0.05]`}>
            <Icon className={`w-4 h-4 ${product.textClass}`} />
          </div>
          <span className={`text-sm font-semibold ${product.textClass}`}>{product.label}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#2E3A55] group-hover:text-[#4B5870] transition-colors" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-[#E2E8F8] text-xl font-bold">{filtered.length}</div>
          <div className="text-[#3A4560] text-[10px] font-medium uppercase tracking-wide mt-0.5">Leads</div>
        </div>
        <div>
          <div className={`text-xl font-bold ${product.textClass}`}>{convRate}%</div>
          <div className="text-[#3A4560] text-[10px] font-medium uppercase tracking-wide mt-0.5">Conv.</div>
        </div>
        <div>
          <div className="text-[#E2E8F8] text-xl font-bold">{(revenue / 1000).toFixed(1)}k</div>
          <div className="text-[#3A4560] text-[10px] font-medium uppercase tracking-wide mt-0.5">CA €</div>
        </div>
      </div>

      {product.id !== "solyb_agency" && filtered.length === 0 && (
        <div className={`mt-3 text-[10px] font-medium ${product.textClass} opacity-60`}>
          En attente des premières inscriptions
        </div>
      )}
    </div>
  )
}

export default function PipelinePage() {
  const router = useRouter()
  const [activeProduct, setActiveProduct] = useState<ProductSource>("all")
  const [filters, setFilters] = useState<LeadFilters>({})
  const [showNewLead, setShowNewLead] = useState(false)

  const baseFilters: LeadFilters = useMemo(() => {
    if (activeProduct === "all") return filters
    return { ...filters, product_source: activeProduct }
  }, [filters, activeProduct])

  const { leads, isLoading, updateLeadStatus, createLead } = useLeads(baseFilters)
  const { leads: allLeads } = useLeads({})

  const stats = useMemo(() => {
    const total = leads.length
    const nouveaux = leads.filter(l => l.status === "nouveau").length
    const gagnes = leads.filter(l => l.status === "gagne").length
    const tauxConversion = total > 0 ? Math.round((gagnes / total) * 100) : 0
    const revenuEstime = leads
      .filter(l => l.status === "gagne")
      .reduce((sum, l) => sum + (l.estimated_revenue || l.budget || 0), 0)
    return { total, nouveaux, gagnes, tauxConversion, revenuEstime }
  }, [leads])

  const activeProductDef = PRODUCTS.find(p => p.id === activeProduct)!

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-coral/30 border-t-coral rounded-full animate-spin" />
          <p className="text-[#4B5870] text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#E2E8F8] text-2xl font-bold">Pipeline</h1>
          <p className="text-[#3A4560] text-sm mt-0.5">Gérez vos leads et opportunités</p>
        </div>
        <button
          onClick={() => setShowNewLead(true)}
          className="flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-coral/20"
        >
          <Plus className="w-4 h-4" />
          Nouveau lead
        </button>
      </div>

      {/* Product overview row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRODUCTS.filter(p => p.id !== "all").map(p => (
          <ProductOverviewCard key={p.id} product={p} leads={allLeads} />
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Total Leads"
          value={stats.total}
          sub={activeProduct !== "all" ? activeProductDef.label : "Tous produits"}
          icon={Users}
          accent="#FF6B47"
          accentClass="text-coral"
          accentBg="bg-coral/10"
        />
        <StatsCard
          title="Nouveaux"
          value={stats.nouveaux}
          sub="cette période"
          icon={Target}
          accent="#10B981"
          accentClass="text-emerald-400"
          accentBg="bg-emerald-500/10"
        />
        <StatsCard
          title="Taux Conversion"
          value={`${stats.tauxConversion}%`}
          sub={`${stats.gagnes} gagnés`}
          icon={TrendingUp}
          accent="#8B5CF6"
          accentClass="text-violet-400"
          accentBg="bg-violet-500/10"
        />
        <StatsCard
          title="CA Estimé"
          value={`${stats.revenuEstime.toLocaleString("fr-FR")}€`}
          sub="leads gagnés"
          icon={DollarSign}
          accent="#F5A623"
          accentClass="text-solar"
          accentBg="bg-solar/10"
        />
      </div>

      {/* Launch Offer — only for SolYB Agence */}
      {(activeProduct === "all" || activeProduct === "solyb_agency") && (
        <div className="relative bg-[#0F1628] border border-coral/20 rounded-2xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-coral/[0.03] to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[#E2E8F8] font-semibold text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                Offre de Lancement SolYB
              </h3>
              <p className="text-[#4B5870] text-xs mt-1">
                Objectif&nbsp;: 30 clients · {allLeads.filter(l => l.is_launch_offer).length} inscrits
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-coral">
                {30 - allLeads.filter(l => l.is_launch_offer).length}
              </div>
              <div className="text-[#4B5870] text-xs">places restantes</div>
            </div>
          </div>
          <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral to-coral/70 rounded-full transition-all duration-700"
              style={{ width: `${Math.min((allLeads.filter(l => l.is_launch_offer).length / 30) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Product tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#0A0F1E] border border-white/[0.05] rounded-xl overflow-x-auto scrollbar-none w-full sm:w-fit">
        {PRODUCTS.map(p => {
          const Icon = p.icon
          const isActive = activeProduct === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? `${p.bgClass} ${p.textClass} ring-1 ${p.ringClass}`
                  : "text-[#4B5870] hover:text-[#8090AA] hover:bg-white/[0.03]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {p.label}
            </button>
          )
        })}
      </div>

      {/* FilterBar */}
      <FilterBar onFilterChange={setFilters} />

      {/* Kanban */}
      <KanbanBoard
        leads={leads}
        onLeadMove={async (id, status) => { await updateLeadStatus(id, status) }}
        onLeadClick={(lead) => router.push(`/admin/leads/${lead.id}`)}
      />

      <NewLeadDialog
        isOpen={showNewLead}
        onClose={() => setShowNewLead(false)}
        onSubmit={async (data) => { await createLead(data) }}
      />
    </div>
  )
}
