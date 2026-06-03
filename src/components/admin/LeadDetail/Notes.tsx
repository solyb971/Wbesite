"use client"

import { useState } from "react"
import { useNotes, Note, NoteType } from "@/hooks/useNotes"
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

export default function Notes({ leadId }: NotesProps) {
  const { notes, isLoading, createNote, updateNote, deleteNote, toggleTaskCompletion } =
    useNotes(leadId)

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

    // Reset form
    setNewNoteData({
      content: "",
      type: "note",
      is_task: false,
      task_due_date: "",
    })
    setShowNewNote(false)
  }

  const getNoteIcon = (type: NoteType) => {
    switch (type) {
      case "note":
        return <MessageSquare className="w-4 h-4" />
      case "task":
        return <CheckSquare className="w-4 h-4" />
      case "call":
        return <Phone className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      case "meeting":
        return <CalendarIcon className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getNoteTypeColor = (type: NoteType) => {
    switch (type) {
      case "note":
        return "text-gray-600 bg-gray-100"
      case "task":
        return "text-blue-600 bg-blue-100"
      case "call":
        return "text-green-600 bg-green-100"
      case "email":
        return "text-purple-600 bg-purple-100"
      case "meeting":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTypeLabel = (type: NoteType) => {
    const labels: Record<NoteType, string> = {
      note: "Note",
      task: "Tâche",
      call: "Appel",
      email: "Email",
      meeting: "Réunion",
    }
    return labels[type]
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Notes & Tâches</h3>
        <button
          onClick={() => setShowNewNote(!showNewNote)}
          className="flex items-center space-x-1 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </button>
      </div>

      {/* New Note Form */}
      {showNewNote && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-3">
            {/* Type Selection */}
            <div className="flex flex-wrap gap-2">
              {(["note", "task", "call", "email", "meeting"] as NoteType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setNewNoteData({ ...newNoteData, type, is_task: type === "task" })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    newNoteData.type === type
                      ? getNoteTypeColor(type)
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    {getNoteIcon(type)}
                    <span>{getTypeLabel(type)}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Content Textarea */}
            <textarea
              value={newNoteData.content}
              onChange={(e) => setNewNoteData({ ...newNoteData, content: e.target.value })}
              rows={3}
              placeholder={`Ajouter une ${getTypeLabel(newNoteData.type).toLowerCase()}...`}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />

            {/* Task Due Date */}
            {newNoteData.is_task && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={newNoteData.task_due_date}
                  onChange={(e) => setNewNoteData({ ...newNoteData, task_due_date: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowNewNote(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateNote}
                disabled={!newNoteData.content.trim()}
                className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Aucune note pour le moment</p>
            <p className="text-sm mt-1">Ajoutez une note pour commencer à suivre ce lead</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`border-l-4 pl-4 py-3 ${
                note.is_task && !note.task_completed
                  ? "border-blue-500 bg-blue-50"
                  : note.is_task && note.task_completed
                  ? "border-green-500 bg-green-50 opacity-60"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNoteTypeColor(note.type)}`}>
                      <span className="flex items-center space-x-1">
                        {getNoteIcon(note.type)}
                        <span>{getTypeLabel(note.type)}</span>
                      </span>
                    </span>

                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(note.created_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>

                    {note.task_due_date && (
                      <span className="text-xs text-gray-600 flex items-center space-x-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>
                          Échéance : {format(new Date(note.task_due_date), "dd MMM yyyy", { locale: fr })}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <p
                    className={`text-gray-700 whitespace-pre-wrap ${
                      note.task_completed ? "line-through" : ""
                    }`}
                  >
                    {note.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  {note.is_task && (
                    <button
                      onClick={() => toggleTaskCompletion(note.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        note.task_completed
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={note.task_completed ? "Marquer comme non terminé" : "Marquer comme terminé"}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
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
