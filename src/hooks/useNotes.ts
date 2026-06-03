"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"

export type NoteType = "note" | "task" | "call" | "email" | "meeting"

export interface Note {
  id: string
  lead_id: string
  content: string
  type: NoteType
  is_task: boolean
  task_completed: boolean
  task_due_date?: string
  created_at: string
  updated_at: string
}

export function useNotes(leadId?: string) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch notes for a lead
  const fetchNotes = useCallback(async () => {
    if (!leadId) {
      setNotes([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        const mockNotes: Note[] = [
          {
            id: "1",
            lead_id: leadId,
            content: "Premier contact téléphonique. Client très intéressé par l'offre e-commerce.",
            type: "call",
            is_task: false,
            task_completed: false,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "2",
            lead_id: leadId,
            content: "Préparer devis détaillé avec options personnalisées",
            type: "task",
            is_task: true,
            task_completed: false,
            task_due_date: new Date(Date.now() + 172800000).toISOString(),
            created_at: new Date(Date.now() - 43200000).toISOString(),
            updated_at: new Date(Date.now() - 43200000).toISOString(),
          },
          {
            id: "3",
            lead_id: leadId,
            content: "Email de présentation envoyé avec portfolio",
            type: "email",
            is_task: false,
            task_completed: false,
            created_at: new Date(Date.now() - 3600000).toISOString(),
            updated_at: new Date(Date.now() - 3600000).toISOString(),
          },
        ]

        setNotes(mockNotes)
        setIsLoading(false)
        return
      }

      // Real Supabase query
      const supabase = createClient()

      const { data, error: queryError } = await supabase
        .from("notes")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false })

      if (queryError) throw queryError

      setNotes(data || [])
    } catch (err) {
      console.error("Error fetching notes:", err)
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des notes")
    } finally {
      setIsLoading(false)
    }
  }, [leadId])

  // Create note
  const createNote = async (noteData: Partial<Note>) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        const newNote: Note = {
          id: `mock-${Date.now()}`,
          lead_id: leadId || "",
          content: noteData.content || "",
          type: noteData.type || "note",
          is_task: noteData.is_task || false,
          task_completed: false,
          task_due_date: noteData.task_due_date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setNotes((prev) => [newNote, ...prev])
        return { success: true, note: newNote }
      }

      const supabase = createClient()

      const { data, error: insertError } = await supabase
        .from("notes")
        .insert([{ ...noteData, lead_id: leadId }])
        .select()
        .single()

      if (insertError) throw insertError

      setNotes((prev) => [data, ...prev])
      return { success: true, note: data }
    } catch (err) {
      console.error("Error creating note:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la création",
      }
    }
  }

  // Update note
  const updateNote = async (noteId: string, updates: Partial<Note>) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        setNotes((prev) =>
          prev.map((note) =>
            note.id === noteId
              ? { ...note, ...updates, updated_at: new Date().toISOString() }
              : note
          )
        )
        return { success: true }
      }

      const supabase = createClient()

      const { error: updateError } = await supabase
        .from("notes")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", noteId)

      if (updateError) throw updateError

      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? { ...note, ...updates, updated_at: new Date().toISOString() }
            : note
        )
      )

      return { success: true }
    } catch (err) {
      console.error("Error updating note:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la mise à jour",
      }
    }
  }

  // Delete note
  const deleteNote = async (noteId: string) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        setNotes((prev) => prev.filter((note) => note.id !== noteId))
        return { success: true }
      }

      const supabase = createClient()

      const { error: deleteError } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId)

      if (deleteError) throw deleteError

      setNotes((prev) => prev.filter((note) => note.id !== noteId))
      return { success: true }
    } catch (err) {
      console.error("Error deleting note:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la suppression",
      }
    }
  }

  // Toggle task completion
  const toggleTaskCompletion = async (noteId: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (!note) return { success: false, error: "Note not found" }

    return updateNote(noteId, { task_completed: !note.task_completed })
  }

  // Initial fetch
  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  // Realtime subscriptions
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true" || !leadId) return

    const supabase = createClient()

    const channel = supabase
      .channel(`notes_${leadId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
          filter: `lead_id=eq.${leadId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setNotes((prev) => [payload.new as Note, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setNotes((prev) =>
              prev.map((note) =>
                note.id === (payload.new as Note).id ? (payload.new as Note) : note
              )
            )
          } else if (payload.eventType === "DELETE") {
            setNotes((prev) => prev.filter((note) => note.id !== (payload.old as Note).id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [leadId])

  return {
    notes,
    isLoading,
    error,
    refetch: fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    toggleTaskCompletion,
  }
}
