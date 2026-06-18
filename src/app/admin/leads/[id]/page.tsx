"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { useLeads } from "@/hooks/useLeads"
import LeadInfo from "@/components/admin/LeadDetail/LeadInfo"
import ScoreCard from "@/components/admin/LeadDetail/ScoreCard"
import Notes from "@/components/admin/LeadDetail/Notes"
import Profitability from "@/components/admin/LeadDetail/Profitability"
import QuickActions from "@/components/admin/LeadDetail/QuickActions"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function LeadDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { leads, updateLeadStatus, updateLead, deleteLead } = useLeads()

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const lead = leads.find((l) => l.id === resolvedParams.id)

  const handleUpdate = async (updates: Partial<typeof lead>) => {
    if (!lead) return

    if (updates && Object.keys(updates).length === 1 && updates.status) {
      await updateLeadStatus(lead.id, updates.status)
      return
    }

    const result = await updateLead(lead.id, updates as Parameters<typeof updateLead>[1])
    if (!result.success) {
      console.error("Erreur mise à jour:", result.error)
    }
  }

  const handleDelete = async () => {
    if (!lead) return
    const result = await deleteLead(lead.id)
    if (result.success) router.push("/admin")
  }

  if (!lead) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4">Lead introuvable</h2>
          <Link href="/admin" className="inline-flex items-center gap-2 text-coral hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au pipeline</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-[#7E715E] hover:text-[#F5EDD8] transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au pipeline</span>
      </Link>

      {/* Grid : 12 colonnes pour une meilleure densité */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Colonne principale */}
        <div className="lg:col-span-8 space-y-5">
          <LeadInfo lead={lead} onUpdate={handleUpdate} />
          <Notes leadId={lead.id} />
        </div>

        {/* Colonne latérale */}
        <div className="lg:col-span-4 space-y-5">
          <QuickActions lead={lead} onDelete={() => setShowDeleteConfirm(true)} />
          <ScoreCard lead={lead} />
          <Profitability lead={lead} />
        </div>
      </div>

      {/* Confirmation suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1F1813] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-[#F5EDD8]">Confirmer la suppression</h3>
            </div>
            <p className="text-[#A89880] text-sm mb-6 leading-relaxed">
              Supprimer le lead <strong className="text-[#F5EDD8]">{lead.name}</strong> ? Cette action est
              irréversible et supprimera aussi ses notes, fichiers et historiques.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2.5 border border-white/[0.1] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.04] rounded-xl text-sm font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
