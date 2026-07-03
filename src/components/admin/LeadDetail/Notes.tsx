"use client"

import { useState } from "react"
import { useNotes, NoteType } from "@/hooks/useNotes"
import {
  Plus,
  MessageSquare,
  CheckSquare,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Trash2,
  Check,
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface NotesProps {
  leadId: string
}

const inputCls =
  "bg-[#15110B] border border-white/[0.1] text-[#F5EDD8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-coral transition-colors placeholder:text-[#574C3D]"

export default function Notes({ leadId }: NotesProps) {
  const { notes, isLoading, createNote, deleteNote, toggleTaskCompletion } = useNotes(leadId)

  const [showNewNote, setShowNewNote] = useState(false)
  const [newNoteData, setNewNoteData] = useState({
    content: "",
    type: "note" as NoteType,
    is_task: false,
    task_due_date: "",
  })

  const handleCreateNote = async () => {
    if (!newNoteData.content.trim()) return
    await createNote(newNoteData)
    setNewNoteData({ content: "", type: "note", is_task: false, task_due_date: "" })
    setShowNewNote(false)
  }

  const getNoteIcon = (type: NoteType) => {
    switch (type) {
      case "note": return <MessageSquare className="w-3.5 h-3.5" />
      case "task": return <CheckSquare className="w-3.5 h-3.5" />
      case "call": return <Phone className="w-3.5 h-3.5" />
      case "email": return <Mail className="w-3.5 h-3.5" />
      case "meeting": return <CalendarIcon className="w-3.5 h-3.5" />
      default: return <MessageSquare className="w-3.5 h-3.5" />
    }
  }

  const noteTypeColor = (type: NoteType) => {
    switch (type) {
      case "note": return "text-[#9A8C78] bg-white/[0.06] border-white/[0.08]"
      case "task": return "text-blue-300 bg-blue-500/15 border-blue-500/20"
      case "call": return "text-emerald-300 bg-emerald-500/15 border-emerald-500/20"
      case "email": return "text-violet-300 bg-violet-500/15 border-violet-500/20"
      case "meeting": return "text-amber-300 bg-amber-500/15 border-amber-500/20"
      default: return "text-[#9A8C78] bg-white/[0.06] border-white/[0.08]"
    }
  }

  const typeLabel: Record<NoteType, string> = {
    note: "Note", task: "Tâche", call: "Appel", email: "Email", meeting: "Réunion",
  }

  if (isLoading) {
    return (
      <div className="bg-[#1F1813] rounded-2xl border border-white/[0.06] p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/[0.06] rounded w-1/4" />
          <div className="h-16 bg-white/[0.06] rounded" />
          <div className="h-16 bg-white/[0.06] rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1F1813] rounded-2xl border border-white/[0.06] p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-[#F5EDD8]">Notes &amp; tâches</h3>
        <button
          onClick={() => setShowNewNote(!showNewNote)}
          className="flex items-center gap-1.5 px-3 py-2 bg-coral hover:bg-coral/90 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Nouveau */}
      {showNewNote && (
        <div className="mb-5 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] space-y-3">
          <div className="flex flex-wrap gap-2">
            {(["note", "task", "call", "email", "meeting"] as NoteType[]).map((type) => (
              <button
                key={type}
                onClick={() => setNewNoteData({ ...newNoteData, type, is_task: type === "task" })}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  newNoteData.type === type
                    ? noteTypeColor(type)
                    : "bg-white/[0.04] text-[#7E715E] border-white/[0.06] hover:text-[#A89880]"
                }`}
              >
                <span className="flex items-center gap-1">
                  {getNoteIcon(type)}
                  {typeLabel[type]}
                </span>
              </button>
            ))}
          </div>

          <textarea
            value={newNoteData.content}
            onChange={(e) => setNewNoteData({ ...newNoteData, content: e.target.value })}
            rows={3}
            placeholder={`Ajouter une ${typeLabel[newNoteData.type].toLowerCase()}…`}
            className={`${inputCls} w-full resize-none`}
          />

          {newNoteData.is_task && (
            <div>
              <label className="block text-xs font-medium text-[#A89880] mb-1">Date d&apos;échéance</label>
              <input
                type="date"
                value={newNoteData.task_due_date}
                onChange={(e) => setNewNoteData({ ...newNoteData, task_due_date: e.target.value })}
                className={inputCls}
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowNewNote(false)}
              className="px-4 py-2 text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.04] rounded-lg text-sm transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleCreateNote}
              disabled={!newNoteData.content.trim()}
              className="px-4 py-2 bg-coral hover:bg-coral/90 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Créer
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-[#3A332A]" />
            <p className="text-[#A89880] text-sm">Aucune note pour le moment</p>
            <p className="text-xs text-[#574C3D] mt-1">Ajoutez une note pour suivre ce lead</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`border-l-2 pl-4 py-3 pr-3 rounded-r-lg ${
                note.is_task && !note.task_completed
                  ? "border-blue-500 bg-blue-500/[0.06]"
                  : note.is_task && note.task_completed
                  ? "border-emerald-500 bg-emerald-500/[0.05] opacity-60"
                  : "border-white/[0.12] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${noteTypeColor(note.type)}`}>
                      <span className="flex items-center gap-1">
                        {getNoteIcon(note.type)}
                        {typeLabel[note.type]}
                      </span>
                    </span>
                    <span className="text-[10px] text-[#574C3D]">
                      {formatDistanceToNow(new Date(note.created_at), { addSuffix: true, locale: fr })}
                    </span>
                    {note.task_due_date && (
                      <span className="text-[10px] text-[#7E715E] flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {format(new Date(note.task_due_date), "dd MMM yyyy", { locale: fr })}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm text-[#C2B79E] whitespace-pre-wrap ${note.task_completed ? "line-through" : ""}`}>
                    {note.content}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {note.is_task && (
                    <button
                      onClick={() => toggleTaskCompletion(note.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        note.task_completed
                          ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                          : "bg-white/[0.05] text-[#7E715E] hover:bg-white/[0.08] hover:text-[#A89880]"
                      }`}
                      title={note.task_completed ? "Marquer non terminé" : "Marquer terminé"}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
