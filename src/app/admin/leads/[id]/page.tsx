"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { useLeads } from "@/hooks/useLeads"
import LeadInfo from "@/components/admin/LeadDetail/LeadInfo"
import ScoreCard from "@/components/admin/LeadDetail/ScoreCard"
import Notes from "@/components/admin/LeadDetail/Notes"
import Profitability from "@/components/admin/LeadDetail/Profitability"
import QuickActions from "@/components/admin/LeadDetail/QuickActions"
import { ArrowLeft } from "lucide-react"
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

  const handleUpdate = async (updates: any) => {
    if (!lead) return

    // If only status changed, use the optimized status update
    if (Object.keys(updates).length === 1 && updates.status) {
      await updateLeadStatus(lead.id, updates.status)
      return
    }

    // Full update for other fields
    const result = await updateLead(lead.id, updates)
    if (!result.success) {
      console.error("Erreur mise à jour:", result.error)
    }
  }

  const handleDelete = async () => {
    if (!lead) return

    const result = await deleteLead(lead.id)
    if (result.success) {
      router.push("/admin")
    }
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lead introuvable</h2>
          <Link
            href="/admin"
            className="inline-flex items-center space-x-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au pipeline</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour au pipeline</span>
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Info */}
          <LeadInfo lead={lead} onUpdate={handleUpdate} />

          {/* Notes */}
          <Notes leadId={lead.id} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <QuickActions
            lead={lead}
            onDelete={() => setShowDeleteConfirm(true)}
          />

          {/* Score Card */}
          <ScoreCard lead={lead} />

          {/* Profitability */}
          <Profitability lead={lead} />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer le lead <strong>{lead.name}</strong> ? Cette
              action est irréversible et supprimera également toutes les notes, fichiers et
              historiques associés.
            </p>

            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
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
