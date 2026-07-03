"use client"

import { useState } from "react"
import { Lead, LeadStatus, LeadUrgency } from "@/hooks/useLeads"
import { Mail, Phone, Building2, Banknote, Calendar, Edit2, Save, X, Target } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface LeadInfoProps {
  lead: Lead
  onUpdate: (updates: Partial<Lead>) => Promise<void>
}

const inputCls =
  "bg-[#15110B] border border-white/[0.1] text-[#F5EDD8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-coral transition-colors"

export default function LeadInfo({ lead, onUpdate }: LeadInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    phone: lead.phone || "",
    company: lead.company || "",
    budget: lead.budget,
    status: lead.status,
    urgency: lead.urgency,
    description: lead.description,
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating lead:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
      company: lead.company || "",
      budget: lead.budget,
      status: lead.status,
      urgency: lead.urgency,
      description: lead.description,
    })
    setIsEditing(false)
  }

  const statusColor: Record<LeadStatus, string> = {
    nouveau: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    contact: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    devis: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    gagne: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    perdu: "bg-white/[0.06] text-[#9A8C78] border-white/[0.08]",
  }

  const urgencyColor: Record<LeadUrgency, string> = {
    urgent: "bg-red-500/15 text-red-300 border-red-500/20",
    high: "bg-orange-500/15 text-orange-300 border-orange-500/20",
    normal: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    low: "bg-white/[0.06] text-[#9A8C78] border-white/[0.08]",
  }

  const urgencyLabel = (u: LeadUrgency) =>
    u === "urgent" ? "Très urgent" : u === "high" ? "Urgent" : u === "normal" ? "Normal" : "Pas urgent"

  const initials = lead.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()

  return (
    <div className="bg-[#1F1813] rounded-2xl border border-white/[0.06] overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-white/[0.06]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-coral/60 flex items-center justify-center shrink-0 shadow-lg shadow-coral/20">
              <span className="text-white font-bold text-base">{initials}</span>
            </div>
            <div className="min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-xl font-bold text-[#F5EDD8] bg-transparent border-b-2 border-coral focus:outline-none w-full"
                />
              ) : (
                <h2 className="text-xl font-bold text-[#F5EDD8] truncate">{lead.name}</h2>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="text-sm text-[#A89880] mt-1 bg-transparent border-b border-white/[0.1] focus:outline-none focus:border-coral"
                  placeholder="Entreprise"
                />
              ) : (
                lead.company && (
                  <p className="text-sm text-[#A89880] mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{lead.company}</span>
                  </p>
                )
              )}
            </div>
          </div>

          {/* Edit/Save */}
          <div className="flex items-center gap-2 shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-3 py-2 bg-coral hover:bg-coral/90 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">{isSaving ? "..." : "Enregistrer"}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="p-2 bg-white/[0.05] hover:bg-white/[0.08] text-[#A89880] rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.05] hover:bg-white/[0.08] text-[#A89880] hover:text-[#F5EDD8] rounded-lg text-sm font-medium transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span className="hidden sm:inline">Modifier</span>
              </button>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {isEditing ? (
            <>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                className={inputCls}
              >
                <option value="nouveau">Nouveau</option>
                <option value="contact">Contact</option>
                <option value="devis">Devis</option>
                <option value="gagne">Gagné</option>
                <option value="perdu">Perdu</option>
              </select>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value as LeadUrgency })}
                className={inputCls}
              >
                <option value="low">Pas urgent</option>
                <option value="normal">Normal</option>
                <option value="high">Urgent</option>
                <option value="urgent">Très urgent</option>
              </select>
            </>
          ) : (
            <>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor[lead.status]}`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${urgencyColor[lead.urgency]}`}>
                {urgencyLabel(lead.urgency)}
              </span>
              {lead.is_launch_offer && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-coral/15 text-coral border-coral/20 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Offre lancement #{lead.launch_offer_position}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Coordonnées — grille compacte */}
      <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <InfoRow icon={<Mail className="w-4 h-4" />} label="Email">
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`${inputCls} w-full`}
            />
          ) : (
            <a href={`mailto:${lead.email}`} className="text-coral hover:underline text-sm break-all">
              {lead.email}
            </a>
          )}
        </InfoRow>

        <InfoRow icon={<Phone className="w-4 h-4" />} label="Téléphone">
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`${inputCls} w-full`}
              placeholder="+590690…"
            />
          ) : lead.phone ? (
            <a href={`tel:${lead.phone}`} className="text-coral hover:underline text-sm">
              {lead.phone}
            </a>
          ) : (
            <span className="text-[#574C3D] text-sm">—</span>
          )}
        </InfoRow>

        <InfoRow icon={<Banknote className="w-4 h-4" />} label="Budget">
          {isEditing ? (
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
              className={`${inputCls} w-full`}
            />
          ) : (
            <span className="font-semibold text-[#F5EDD8] text-sm">{lead.budget.toLocaleString("fr-FR")}€</span>
          )}
        </InfoRow>

        <InfoRow icon={<Calendar className="w-4 h-4" />} label="Créé le">
          <span className="text-[#E8DDC8] text-sm">
            {format(new Date(lead.created_at), "dd MMM yyyy 'à' HH:mm", { locale: fr })}
          </span>
        </InfoRow>
      </div>

      {/* Description */}
      <div className="p-5 sm:p-6 border-t border-white/[0.06]">
        <h3 className="font-semibold text-[#F5EDD8] text-sm mb-3">Description du projet</h3>
        {isEditing ? (
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
            className={`${inputCls} w-full resize-none`}
          />
        ) : (
          <p className="text-[#C2B79E] text-sm whitespace-pre-wrap leading-relaxed">
            {lead.description || <span className="text-[#574C3D]">Aucune description fournie.</span>}
          </p>
        )}
      </div>
    </div>
  )
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-[#7E715E] shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-[#574C3D] font-semibold mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  )
}
