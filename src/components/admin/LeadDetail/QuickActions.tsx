"use client"

import { Lead } from "@/hooks/useLeads"
import { FileText, Mail, Phone, Trash2, Download } from "lucide-react"
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
    if (lead.phone) {
      window.location.href = `tel:${lead.phone}`
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h3>

      <div className="space-y-3">
        {/* Generate PDF Quote */}
        <button
          onClick={handleGeneratePDF}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span>Générer Devis PDF</span>
        </button>

        {/* Send Email */}
        <button
          onClick={handleSendEmail}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>Envoyer Email</span>
        </button>

        {/* Call */}
        {lead.phone && (
          <button
            onClick={handleCall}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Appeler</span>
          </button>
        )}

        {/* Download Data */}
        <button
          onClick={() => {
            const dataStr = JSON.stringify(lead, null, 2)
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
            const exportFileDefaultName = `lead_${lead.id}.json`
            const linkElement = document.createElement('a')
            linkElement.setAttribute('href', dataUri)
            linkElement.setAttribute('download', exportFileDefaultName)
            linkElement.click()
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Exporter Données</span>
        </button>

        {/* Delete Lead */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Supprimer Lead</span>
          </button>
        )}
      </div>
    </div>
  )
}
