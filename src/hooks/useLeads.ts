"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"

export type LeadStatus = "nouveau" | "contact" | "devis" | "gagne" | "perdu"
export type LeadUrgency = "low" | "normal" | "high" | "urgent"
export type ActivityType = "digital" | "content" | "consulting"

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  project_type: string
  budget: number
  description: string
  status: LeadStatus
  urgency: LeadUrgency
  activity_type: ActivityType
  source: string
  source_details?: string
  score_total: number
  score_budget: number
  score_clarity: number
  score_urgency: number
  score_fit: number
  score_responsiveness: number
  score_source: number
  is_launch_offer: boolean
  launch_offer_position?: number
  first_contact_date?: string
  last_contact_date?: string
  estimated_revenue?: number
  estimated_hours?: number
  notes_count?: number
  files_count?: number
  product_source?: "solyb_agency" | "factu_gp" | "resa_gp"
  created_at: string
  updated_at: string
}

export interface LeadFilters {
  status?: LeadStatus[]
  urgency?: LeadUrgency[]
  activity_type?: ActivityType[]
  search?: string
  min_score?: number
  is_launch_offer?: boolean
  product_source?: "solyb_agency" | "factu_gp" | "resa_gp"
}

export function useLeads(filters?: LeadFilters) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch leads with filters
  const fetchLeads = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        // Mock data
        const mockLeads: Lead[] = [
          {
            id: "1",
            name: "Jean Dupont",
            email: "jean@exemple.gp",
            phone: "+590690123456",
            company: "Restaurant Le Soleil",
            project_type: "vitrine",
            budget: 750,
            description: "Site vitrine pour mon restaurant avec menu en ligne",
            status: "nouveau",
            urgency: "normal",
            activity_type: "digital",
            source: "bouche-a-oreille",
            score_total: 75,
            score_budget: 20,
            score_clarity: 15,
            score_urgency: 10,
            score_fit: 15,
            score_responsiveness: 0,
            score_source: 15,
            is_launch_offer: true,
            launch_offer_position: 12,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Marie Martin",
            email: "marie@boutique.gp",
            company: "Boutique Créole",
            project_type: "ecommerce",
            budget: 1500,
            description: "Boutique en ligne pour vendre mes créations artisanales",
            status: "contact",
            urgency: "high",
            activity_type: "digital",
            source: "site-web",
            score_total: 82,
            score_budget: 20,
            score_clarity: 15,
            score_urgency: 15,
            score_fit: 15,
            score_responsiveness: 10,
            score_source: 7,
            is_launch_offer: true,
            launch_offer_position: 8,
            first_contact_date: new Date(Date.now() - 86400000).toISOString(),
            created_at: new Date(Date.now() - 172800000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ]

        // Apply filters
        let filtered = mockLeads

        if (filters?.status && filters.status.length > 0) {
          filtered = filtered.filter((lead) => filters.status!.includes(lead.status))
        }
        if (filters?.urgency && filters.urgency.length > 0) {
          filtered = filtered.filter((lead) => filters.urgency!.includes(lead.urgency))
        }
        if (filters?.activity_type && filters.activity_type.length > 0) {
          filtered = filtered.filter((lead) => filters.activity_type!.includes(lead.activity_type))
        }
        if (filters?.is_launch_offer !== undefined) {
          filtered = filtered.filter((lead) => lead.is_launch_offer === filters.is_launch_offer)
        }
        if (filters?.product_source) {
          filtered = filtered.filter((lead) => (lead.product_source ?? "solyb_agency") === filters.product_source)
        }
        if (filters?.search) {
          const search = filters.search.toLowerCase()
          filtered = filtered.filter(
            (lead) =>
              lead.name.toLowerCase().includes(search) ||
              lead.email.toLowerCase().includes(search) ||
              lead.company?.toLowerCase().includes(search)
          )
        }

        setLeads(filtered)
        setIsLoading(false)
        return
      }

      // Real Supabase query
      const supabase = createClient()
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })

      // Apply filters
      if (filters?.status && filters.status.length > 0) {
        query = query.in("status", filters.status)
      }

      if (filters?.urgency && filters.urgency.length > 0) {
        query = query.in("urgency", filters.urgency)
      }

      if (filters?.activity_type && filters.activity_type.length > 0) {
        query = query.in("activity_type", filters.activity_type)
      }

      if (filters?.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
        )
      }

      if (filters?.min_score) {
        query = query.gte("score_total", filters.min_score)
      }

      if (filters?.is_launch_offer !== undefined) {
        query = query.eq("is_launch_offer", filters.is_launch_offer)
      }

      const { data, error: queryError } = await query

      if (queryError) {
        console.error("Supabase error details:", {
          message: queryError.message,
          details: queryError.details,
          hint: queryError.hint,
          code: queryError.code,
        })
        throw new Error(queryError.message || "Erreur Supabase")
      }

      setLeads(data || [])
    } catch (err: any) {
      console.error("Error fetching leads:", err?.message || err)
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des leads")
    } finally {
      setIsLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)])

  // Update lead status (for Kanban drag & drop)
  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === leadId
              ? { ...lead, status: newStatus, updated_at: new Date().toISOString() }
              : lead
          )
        )
        return { success: true }
      }

      const supabase = createClient()

      const { error: updateError } = await supabase
        .from("leads")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", leadId)

      if (updateError) throw updateError

      // Update local state optimistically
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? { ...lead, status: newStatus, updated_at: new Date().toISOString() }
            : lead
        )
      )

      return { success: true }
    } catch (err) {
      console.error("Error updating lead status:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la mise à jour",
      }
    }
  }

  // Create new lead
  const createLead = async (leadData: Partial<Lead>) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        const newLead: Lead = {
          id: `mock-${Date.now()}`,
          name: leadData.name || "",
          email: leadData.email || "",
          phone: leadData.phone,
          company: leadData.company,
          project_type: leadData.project_type || "vitrine",
          budget: leadData.budget || 0,
          description: leadData.description || "",
          status: leadData.status || "nouveau",
          urgency: leadData.urgency || "normal",
          activity_type: leadData.activity_type || "digital",
          source: leadData.source || "manuel",
          score_total: 50,
          score_budget: 10,
          score_clarity: 10,
          score_urgency: 10,
          score_fit: 10,
          score_responsiveness: 0,
          score_source: 10,
          is_launch_offer: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setLeads((prev) => [newLead, ...prev])
        return { success: true, lead: newLead }
      }

      const supabase = createClient()

      const { data, error: insertError } = await supabase
        .from("leads")
        .insert([leadData])
        .select()
        .single()

      if (insertError) throw insertError

      setLeads((prev) => [data, ...prev])
      return { success: true, lead: data }
    } catch (err) {
      console.error("Error creating lead:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la création",
      }
    }
  }

  // Update lead (full update)
  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === leadId
              ? { ...lead, ...updates, updated_at: new Date().toISOString() }
              : lead
          )
        )
        return { success: true }
      }

      const supabase = createClient()

      const { data, error: updateError } = await supabase
        .from("leads")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", leadId)
        .select()
        .single()

      if (updateError) throw updateError

      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? data : lead
        )
      )

      return { success: true, lead: data }
    } catch (err) {
      console.error("Error updating lead:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la mise à jour",
      }
    }
  }

  // Delete lead
  const deleteLead = async (leadId: string) => {
    try {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        setLeads((prev) => prev.filter((lead) => lead.id !== leadId))
        return { success: true }
      }

      const supabase = createClient()

      const { error: deleteError } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId)

      if (deleteError) throw deleteError

      setLeads((prev) => prev.filter((lead) => lead.id !== leadId))
      return { success: true }
    } catch (err) {
      console.error("Error deleting lead:", err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur lors de la suppression",
      }
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Realtime subscriptions
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return

    let supabase: ReturnType<typeof createClient>
    try {
      supabase = createClient()
    } catch {
      return
    }

    const channel = supabase
      .channel("leads_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setLeads((prev) => [payload.new as Lead, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setLeads((prev) =>
              prev.map((lead) =>
                lead.id === (payload.new as Lead).id ? (payload.new as Lead) : lead
              )
            )
          } else if (payload.eventType === "DELETE") {
            setLeads((prev) => prev.filter((lead) => lead.id !== (payload.old as Lead).id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    leads,
    isLoading,
    error,
    refetch: fetchLeads,
    updateLeadStatus,
    updateLead,
    createLead,
    deleteLead,
  }
}
