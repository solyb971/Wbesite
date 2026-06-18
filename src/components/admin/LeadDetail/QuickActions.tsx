"use client"

import { Lead } from "@/hooks/useLeads"
import { FileText, Mail, Phone, Trash2, Download, Zap } from "lucide-react"
import { generateQuotePDF } from "@/lib/utils/pdf"

interface QuickActionsProps {
  lead: Lead
  onDelete?: () => void
}

export default function QuickActions({ lead, onDelete }: QuickActionsProps) {
  const handleGeneratePDF = () => {
    const pdf = generateQuotePDF(lead)
    pdf.save(`Devis_${lead.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`)
  }

  const handleSendEmail = () => {
    window.location.href = `mailto:${lead.email}?subject=Votre projet ${lead.project_type}`
  }

  const handleCall = () => {
    if (lead.phone) window.location.href = `tel:${lead.phone}`
  }

  const handleExport = () => {
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lead, null, 2))
    const link = document.createElement("a")
    link.setAttribute("href", dataUri)
    link.setAttribute("download", `lead_${lead.id}.json`)
    link.click()
  }

  return (
    <div className="bg-[#1F1813] rounded-2xl border border-white/[0.06] p-5">
      <h3 className="text-sm font-bold text-[#F5EDD8] mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4 text-coral" />
        Actions rapides
      </h3>

      {/* CTA principal pleine largeur */}
      <button
        onClick={handleGeneratePDF}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-coral hover:bg-coral/90 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-px mb-3"
      >
        <FileText className="w-4 h-4" />
        Générer le devis PDF
      </button>

      {/* Actions secondaires en grille compacte */}
      <div className="grid grid-cols-2 gap-2">
        <ActionBtn onClick={handleSendEmail} icon={<Mail className="w-4 h-4" />} label="Email" />
        {lead.phone ? (
          <ActionBtn onClick={handleCall} icon={<Phone className="w-4 h-4" />} label="Appeler" />
        ) : (
          <ActionBtn onClick={handleExport} icon={<Download className="w-4 h-4" />} label="Exporter" />
        )}
        {lead.phone && (
          <ActionBtn onClick={handleExport} icon={<Download className="w-4 h-4" />} label="Exporter" />
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

function ActionBtn({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.07] text-[#C2B79E] hover:text-[#F5EDD8] rounded-lg text-xs font-medium transition-colors"
    >
      {icon}
      {label}
    </button>
  )
}
