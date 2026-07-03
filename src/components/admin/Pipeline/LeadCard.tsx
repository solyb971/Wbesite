import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Mail, Phone, Building2, AlertCircle, Star, Calendar } from "lucide-react"
import { Lead } from "@/hooks/useLeads"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface LeadCardProps {
  lead: Lead
  onClick: () => void
  isDragging?: boolean
}

export default function LeadCard({ lead, onClick, isDragging = false }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({ id: lead.id })

  const urgencyColor = {
    urgent: "text-red-400 bg-red-500/10 border-red-500/20",
    high:   "text-orange-400 bg-orange-500/10 border-orange-500/20",
    normal: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    low:    "text-[#9A8C78] bg-white/[0.04] border-white/[0.08]",
  }[lead.urgency] ?? "text-[#9A8C78] bg-white/[0.04] border-white/[0.08]"

  const urgencyLabel = { urgent: "Très urgent", high: "Urgent", normal: "Normal", low: "Pas urgent" }[lead.urgency] ?? lead.urgency

  const scoreColor = lead.score_total >= 80 ? "text-emerald-400" : lead.score_total >= 60 ? "text-solar" : "text-[#7E715E]"

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`bg-[#201913] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.14] hover:bg-[#241C16] transition-all cursor-pointer select-none ${
        (isDragging || isSortableDragging) ? "opacity-40 scale-95" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[#F5EDD8] text-sm truncate">{lead.name}</h4>
          {lead.company && (
            <div className="flex items-center gap-1 text-xs text-[#7E715E] mt-0.5">
              <Building2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{lead.company}</span>
            </div>
          )}
        </div>
        <div className={`flex items-center gap-1 shrink-0 ${scoreColor}`}>
          <Star className="w-3.5 h-3.5" />
          <span className="text-sm font-bold">{lead.score_total}</span>
        </div>
      </div>

      {/* Type & Budget */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-coral/10 text-coral border border-coral/20">
          {lead.project_type}
        </span>
        <span className="text-sm font-bold text-[#F5EDD8]">{lead.budget}€</span>
      </div>

      {/* Contact */}
      <div className="space-y-1 mb-3 text-xs text-[#7E715E]">
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 shrink-0" />
          <span className="truncate">{lead.email}</span>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 shrink-0" />
            <span>{lead.phone}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.05]">
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg border ${urgencyColor}`}>
          <AlertCircle className="w-3 h-3" />
          {urgencyLabel}
        </span>
        <div className="flex items-center gap-1 text-xs text-[#6B5F4E]">
          <Calendar className="w-3 h-3" />
          <span>{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: fr })}</span>
        </div>
      </div>

      {/* Launch Offer */}
      {lead.is_launch_offer && (
        <div className="mt-2.5 pt-2.5 border-t border-white/[0.05]">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
            🎯 Offre lancement #{lead.launch_offer_position}
          </span>
        </div>
      )}
    </div>
  )
}
