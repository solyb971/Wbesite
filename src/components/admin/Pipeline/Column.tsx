import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import LeadCard from "./LeadCard"
import { Lead, LeadStatus } from "@/hooks/useLeads"

interface ColumnProps {
  id: LeadStatus
  title: string
  color: string
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
}

export default function Column({ id, title, color, leads, onLeadClick }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div className="flex-shrink-0 w-72 sm:w-80">
      <div className={`bg-[#0A0F1E] border rounded-2xl h-full transition-colors ${isOver ? "border-coral/30 bg-coral/[0.02]" : "border-white/[0.06]"}`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.05]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#C8D4E8] text-sm flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              {title}
            </h3>
            <span className="bg-white/[0.06] text-[#6B7A99] px-2 py-0.5 rounded-full text-xs font-semibold">
              {leads.length}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={setNodeRef}
          className="p-3 space-y-2.5 min-h-[400px]"
        >
          <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
            {leads.map(lead => (
              <LeadCard key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
            ))}
          </SortableContext>

          {leads.length === 0 && (
            <div className="text-center text-[#2E3A55] py-10">
              <p className="text-sm">Aucun lead</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
