"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { PlanningEvent, PlanningEventInsert, PlanningEventUpdate } from "@/types/database.types"

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true"

const MOCK_EVENTS: PlanningEvent[] = [
  {
    id: "1", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    title: "Site Jean Martin", description: "Refonte site vitrine",
    start_time: new Date().toISOString().replace(/T.*/, "T19:00:00"),
    end_time:   new Date().toISOString().replace(/T.*/, "T21:00:00"),
    event_type: "projet", activity_type: "digital", lead_id: null,
    status: "planned", estimated_hours: 2, actual_hours: null, location: null, metadata: {},
  },
  {
    id: "2", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    title: "Appel Marie Dupont", description: "Suivi devis application",
    start_time: new Date().toISOString().replace(/T.*/, "T18:30:00"),
    end_time:   new Date().toISOString().replace(/T.*/, "T19:00:00"),
    event_type: "appel", activity_type: null, lead_id: null,
    status: "planned", estimated_hours: 0.5, actual_hours: null, location: null, metadata: {},
  },
]

export function usePlanningEvents(weekStart: Date, weekEnd: Date) {
  const [events, setEvents] = useState<PlanningEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // On dépend des valeurs primitives (ISO) et non de l'identité des objets Date,
  // pour éviter toute boucle de refetch si un appelant recrée les Date à chaque render.
  const startISO = weekStart.toISOString()
  const endISO = weekEnd.toISOString()

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      setEvents(MOCK_EVENTS)
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("planning_events")
        .select("*")
        .gte("start_time", startISO)
        .lte("end_time", endISO)
        .order("start_time", { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }, [startISO, endISO])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const createEvent = useCallback(async (event: PlanningEventInsert) => {
    if (USE_MOCK) {
      const newEvent: PlanningEvent = { ...event, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      setEvents(prev => [...prev, newEvent])
      return newEvent
    }
    const supabase = createClient()
    const { data, error } = await supabase.from("planning_events").insert(event).select().single()
    if (error) throw error
    setEvents(prev => [...prev, data])
    return data
  }, [])

  const updateEvent = useCallback(async (id: string, updates: PlanningEventUpdate) => {
    if (USE_MOCK) {
      setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
      return
    }
    const supabase = createClient()
    const { error } = await supabase.from("planning_events").update(updates).eq("id", id)
    if (error) throw error
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
  }, [])

  const deleteEvent = useCallback(async (id: string) => {
    if (USE_MOCK) {
      setEvents(prev => prev.filter(e => e.id !== id))
      return
    }
    const supabase = createClient()
    const { error } = await supabase.from("planning_events").delete().eq("id", id)
    if (error) throw error
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  // Calcul capacité semaine (en heures)
  const weeklyStats = events.reduce(
    (acc, e) => {
      const hours = e.estimated_hours || 0
      if (e.status !== "cancelled") acc.used += hours
      return acc
    },
    { used: 0 }
  )

  return { events, loading, error, createEvent, updateEvent, deleteEvent, weeklyStats, refetch: fetchEvents }
}
