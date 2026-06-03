"use client"

import { Search, Filter, X } from "lucide-react"
import { useState } from "react"
import { LeadStatus, LeadUrgency, ActivityType } from "@/hooks/useLeads"

interface FilterBarProps {
  onFilterChange: (filters: {
    search?: string
    status?: LeadStatus[]
    urgency?: LeadUrgency[]
    activity_type?: ActivityType[]
    is_launch_offer?: boolean
  }) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus[]>([])
  const [selectedUrgency, setSelectedUrgency] = useState<LeadUrgency[]>([])
  const [selectedActivity, setSelectedActivity] = useState<ActivityType[]>([])
  const [isLaunchOffer, setIsLaunchOffer] = useState<boolean | undefined>()

  const handleSearchChange = (value: string) => {
    setSearch(value)
    applyFilters({ search: value })
  }

  const toggleStatus = (status: LeadStatus) => {
    const newStatuses = selectedStatus.includes(status)
      ? selectedStatus.filter((s) => s !== status)
      : [...selectedStatus, status]
    setSelectedStatus(newStatuses)
    applyFilters({ status: newStatuses })
  }

  const toggleUrgency = (urgency: LeadUrgency) => {
    const newUrgencies = selectedUrgency.includes(urgency)
      ? selectedUrgency.filter((u) => u !== urgency)
      : [...selectedUrgency, urgency]
    setSelectedUrgency(newUrgencies)
    applyFilters({ urgency: newUrgencies })
  }

  const toggleActivity = (activity: ActivityType) => {
    const newActivities = selectedActivity.includes(activity)
      ? selectedActivity.filter((a) => a !== activity)
      : [...selectedActivity, activity]
    setSelectedActivity(newActivities)
    applyFilters({ activity_type: newActivities })
  }

  const toggleLaunchOffer = () => {
    const newValue = isLaunchOffer === true ? undefined : true
    setIsLaunchOffer(newValue)
    applyFilters({ is_launch_offer: newValue })
  }

  const applyFilters = (updates: Record<string, any> = {}) => {
    const currentFilters = {
      search,
      status: selectedStatus.length > 0 ? selectedStatus : undefined,
      urgency: selectedUrgency.length > 0 ? selectedUrgency : undefined,
      activity_type: selectedActivity.length > 0 ? selectedActivity : undefined,
      is_launch_offer: isLaunchOffer,
      ...updates,
    }

    onFilterChange(currentFilters)
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedStatus([])
    setSelectedUrgency([])
    setSelectedActivity([])
    setIsLaunchOffer(undefined)
    onFilterChange({})
  }

  const hasActiveFilters =
    selectedStatus.length > 0 ||
    selectedUrgency.length > 0 ||
    selectedActivity.length > 0 ||
    isLaunchOffer !== undefined

  return (
    <div className="bg-[#0F1628] border border-white/[0.06] rounded-2xl p-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3A4560]" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Rechercher un lead (nom, email, entreprise...)"
            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl text-[#C8D4E8] placeholder-[#2E3A55] text-sm focus:outline-none focus:border-coral/40 focus:bg-white/[0.06] transition-all"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            showFilters || hasActiveFilters
              ? "bg-coral/10 text-coral border-coral/30"
              : "bg-white/[0.04] text-[#6B7A99] border-white/[0.07] hover:bg-white/[0.07] hover:text-[#A0AABF]"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden md:inline">Filtres</span>
          {hasActiveFilters && (
            <span className="bg-coral text-white rounded-full px-1.5 py-0.5 text-[10px] font-bold">
              {selectedStatus.length + selectedUrgency.length + selectedActivity.length + (isLaunchOffer ? 1 : 0)}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/[0.07] text-[#6B7A99] hover:text-[#C8D4E8] hover:bg-white/[0.04] transition-all text-sm"
          >
            <X className="w-4 h-4" />
            <span className="hidden md:inline">Réinit.</span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-4">
          {/* Status */}
          <div>
            <label className="block text-[10px] font-semibold text-[#3A4560] uppercase tracking-widest mb-2">Statut</label>
            <div className="flex flex-wrap gap-1.5">
              {(["nouveau", "contact", "devis", "gagne", "perdu"] as LeadStatus[]).map((status) => (
                <button key={status} onClick={() => toggleStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedStatus.includes(status)
                      ? "bg-coral/15 text-coral border border-coral/30"
                      : "bg-white/[0.04] text-[#6B7A99] border border-white/[0.06] hover:bg-white/[0.07]"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-[10px] font-semibold text-[#3A4560] uppercase tracking-widest mb-2">Urgence</label>
            <div className="flex flex-wrap gap-1.5">
              {([
                { v: "urgent", label: "Très urgent", color: "bg-red-500/15 text-red-400 border-red-500/30" },
                { v: "high",   label: "Urgent",      color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
                { v: "normal", label: "Normal",      color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
                { v: "low",    label: "Pas urgent",  color: "bg-white/[0.05] text-[#6B7A99] border-white/[0.08]" },
              ] as const).map(({ v, label, color }) => (
                <button key={v} onClick={() => toggleUrgency(v as LeadUrgency)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedUrgency.includes(v as LeadUrgency) ? color : "bg-white/[0.04] text-[#6B7A99] border-white/[0.06] hover:bg-white/[0.07]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div>
            <label className="block text-[10px] font-semibold text-[#3A4560] uppercase tracking-widest mb-2">Type d'activité</label>
            <div className="flex flex-wrap gap-1.5">
              {(["digital", "content", "consulting"] as ActivityType[]).map((a) => (
                <button key={a} onClick={() => toggleActivity(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedActivity.includes(a)
                      ? "bg-coral/15 text-coral border-coral/30"
                      : "bg-white/[0.04] text-[#6B7A99] border-white/[0.06] hover:bg-white/[0.07]"
                  }`}
                >
                  {a === "digital" ? "Digital" : a === "content" ? "Contenu" : "Consulting"}
                </button>
              ))}
            </div>
          </div>

          {/* Launch Offer */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={toggleLaunchOffer}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                isLaunchOffer ? "bg-coral border-coral" : "bg-white/[0.04] border-white/[0.12] group-hover:border-white/20"
              }`}
            >
              {isLaunchOffer && <span className="text-white text-[10px] font-bold">✓</span>}
            </div>
            <span className="text-sm font-medium text-[#6B7A99] group-hover:text-[#A0AABF] transition-colors">
              Offre de lancement uniquement
            </span>
          </label>
        </div>
      )}
    </div>
  )
}
