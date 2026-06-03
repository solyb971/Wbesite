"use client"

import { useState } from "react"
import { Lead, LeadStatus, LeadUrgency } from "@/hooks/useLeads"
import { Mail, Phone, Building2, DollarSign, Calendar, Edit2, Save, X } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface LeadInfoProps {
  lead: Lead
  onUpdate: (updates: Partial<Lead>) => Promise<void>
}

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

  const getStatusColor = (status: LeadStatus) => {
    const colors: Record<LeadStatus, string> = {
      nouveau: "bg-blue-100 text-blue-800",
      contact: "bg-yellow-100 text-yellow-800",
      devis: "bg-purple-100 text-purple-800",
      gagne: "bg-green-100 text-green-800",
      perdu: "bg-gray-100 text-gray-800",
    }
    return colors[status]
  }

  const getUrgencyColor = (urgency: LeadUrgency) => {
    const colors: Record<LeadUrgency, string> = {
      urgent: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      normal: "bg-blue-100 text-blue-800",
      low: "bg-gray-100 text-gray-800",
    }
    return colors[urgency]
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-2xl font-bold text-gray-900 border-b-2 border-primary focus:outline-none w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
            )}

            {isEditing && formData.company ? (
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="text-gray-600 mt-1 border-b border-gray-300 focus:outline-none"
                placeholder="Entreprise"
              />
            ) : (
              lead.company && (
                <p className="text-gray-600 mt-1 flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>{lead.company}</span>
                </p>
              )
            )}
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-1 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Enregistrement..." : "Enregistrer"}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  <span>Annuler</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Modifier</span>
              </button>
            )}
          </div>
        </div>

        {/* Status & Urgency Badges */}
        <div className="flex items-center space-x-3 mt-4">
          {isEditing ? (
            <>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Pas urgent</option>
                <option value="normal">Normal</option>
                <option value="high">Urgent</option>
                <option value="urgent">Très urgent</option>
              </select>
            </>
          ) : (
            <>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(lead.status)}`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(lead.urgency)}`}>
                {lead.urgency === "urgent" ? "Très urgent" : lead.urgency === "high" ? "Urgent" : lead.urgency === "normal" ? "Normal" : "Pas urgent"}
              </span>
              {lead.is_launch_offer && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  🎯 Offre lancement #{lead.launch_offer_position}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-primary"
              />
            ) : (
              <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                {lead.email}
              </a>
            )}
          </div>

          {(isEditing || lead.phone) && (
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 border-b border-gray-300 focus:outline-none focus:border-primary"
                  placeholder="+590690123456"
                />
              ) : (
                <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                  {lead.phone}
                </a>
              )}
            </div>
          )}

          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-primary"
              />
            ) : (
              <span className="font-semibold text-gray-900">{lead.budget}€</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Créé le</p>
              <p className="font-medium text-gray-900">
                {format(new Date(lead.created_at), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
              </p>
            </div>
          </div>

          {lead.first_contact_date && (
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Premier contact</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(lead.first_contact_date), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Description du Projet</h3>
        {isEditing ? (
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{lead.description}</p>
        )}
      </div>
    </div>
  )
}
