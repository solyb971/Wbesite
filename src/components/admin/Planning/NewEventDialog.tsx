"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { PlanningEventInsert } from "@/types/database.types"

interface NewEventDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PlanningEventInsert) => void
  weekStart?: Date
}

const EVENT_TYPES = [
  { value: "projet",       label: "Projet" },
  { value: "appel",        label: "Appel" },
  { value: "animation",    label: "Animation" },
  { value: "distribution", label: "Distribution" },
  { value: "cdd",          label: "CDD (bloqué)" },
  { value: "personnel",    label: "Personnel" },
]

const inputCls = "w-full px-3 py-2.5 bg-[#15110B] border border-white/[0.08] rounded-xl text-[#E8DDC8] placeholder-[#574C3D] text-sm focus:outline-none focus:border-coral/40 transition-all"
const labelCls = "block text-xs font-semibold text-[#9A8C78] mb-1.5 uppercase tracking-wide"

export default function NewEventDialog({ isOpen, onClose, onSubmit }: NewEventDialogProps) {
  const [formData, setFormData] = useState({
    title: "", type: "projet", date: "",
    start_time: "", end_time: "", location: "", description: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.date || !formData.start_time || !formData.end_time) return
    onSubmit({
      title: formData.title,
      event_type: formData.type as PlanningEventInsert["event_type"],
      start_time: `${formData.date}T${formData.start_time}:00`,
      end_time:   `${formData.date}T${formData.end_time}:00`,
      description: formData.description || null,
      location: formData.location || null,
      activity_type: null, lead_id: null,
      status: "planned", estimated_hours: null, actual_hours: null, metadata: {},
    })
    setFormData({ title: "", type: "projet", date: "", start_time: "", end_time: "", location: "", description: "" })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1F1813] border border-white/[0.08] rounded-2xl w-full max-w-xl shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
          <div>
            <h3 className="text-[#F5EDD8] font-semibold">Nouvel événement</h3>
            <p className="text-[#6B5F4E] text-xs mt-0.5">Planifiez un projet, appel ou rendez-vous</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#7E715E] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className={labelCls}>Titre *</label>
            <input className={inputCls} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Site web Jean Martin" required />
          </div>

          <div>
            <label className={labelCls}>Type *</label>
            <select
              className={inputCls}
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Date *</label>
              <input className={inputCls} type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Début *</label>
              <input className={inputCls} type="time" value={formData.start_time} onChange={e => setFormData({ ...formData, start_time: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Fin *</label>
              <input className={inputCls} type="time" value={formData.end_time} onChange={e => setFormData({ ...formData, end_time: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className={labelCls}>Localisation</label>
            <input className={inputCls} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Visio Zoom, Pointe-à-Pitre…" />
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Détails de l'événement…" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.05] transition-all text-sm font-medium">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2.5 rounded-xl bg-coral hover:bg-coral/90 text-white font-semibold text-sm transition-all shadow-lg shadow-coral/20">
              Créer événement
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
