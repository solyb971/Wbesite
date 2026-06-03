"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { EmailTemplate, EmailTemplateInsert, EmailTemplateUpdate } from "@/types/database.types"

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true"

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: "1", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Premier contact", subject: "Votre projet digital en Guadeloupe — SolYB",
    body: "Bonjour {{firstName}},\n\nMerci pour votre intérêt. Je serais ravi d'échanger sur votre projet.\n\nCordialement,\nYacine — SolYB",
    category: "sequence", sequence_step: 1, variables: ["firstName"], is_active: true, usage_count: 0, metadata: {},
  },
  {
    id: "2", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Relance J+3", subject: "Suite à notre échange — SolYB",
    body: "Bonjour {{firstName}},\n\nJe reviens vers vous concernant votre projet. Avez-vous eu le temps d'y réfléchir ?\n\nCordialement,\nYacine",
    category: "sequence", sequence_step: 2, variables: ["firstName"], is_active: true, usage_count: 0, metadata: {},
  },
  {
    id: "3", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Envoi devis", subject: "Votre devis SolYB — {{projectType}}",
    body: "Bonjour {{firstName}},\n\nVeuillez trouver ci-joint votre devis pour {{projectType}}.\n\nN'hésitez pas si vous avez des questions.\n\nCordialement,\nYacine",
    category: "quick-reply", sequence_step: null, variables: ["firstName", "projectType"], is_active: true, usage_count: 0, metadata: {},
  },
  {
    id: "4", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Relance devis J+7", subject: "Votre devis — Avez-vous des questions ?",
    body: "Bonjour {{firstName}},\n\nJe reviens sur le devis envoyé il y a quelques jours. Avez-vous eu l'occasion de le consulter ?\n\nJe reste disponible pour tout ajustement.\n\nCordialement,\nYacine",
    category: "sequence", sequence_step: 3, variables: ["firstName"], is_active: true, usage_count: 0, metadata: {},
  },
  {
    id: "5", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Confirmation projet", subject: "C'est parti ! Votre projet démarre — SolYB",
    body: "Bonjour {{firstName}},\n\nExcellente nouvelle ! Je confirme le démarrage de votre projet.\n\nProchaine étape : {{nextStep}}.\n\nHâte de travailler avec vous !\n\nYacine",
    category: "quick-reply", sequence_step: null, variables: ["firstName", "nextStep"], is_active: true, usage_count: 0, metadata: {},
  },
  {
    id: "6", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Clôture sans suite", subject: "Votre projet — SolYB",
    body: "Bonjour {{firstName}},\n\nSans retour de votre part, je ferme ce dossier pour le moment.\n\nN'hésitez pas à me recontacter quand le moment sera venu.\n\nCordialement,\nYacine",
    category: "sequence", sequence_step: 4, variables: ["firstName"], is_active: true, usage_count: 0, metadata: {},
  },
]

export function useEmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTemplates = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      // Charger depuis localStorage si disponible, sinon utiliser les defaults
      try {
        const stored = localStorage.getItem("solyb_email_templates")
        setTemplates(stored ? JSON.parse(stored) : DEFAULT_TEMPLATES)
      } catch {
        setTemplates(DEFAULT_TEMPLATES)
      }
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .order("sequence_step", { ascending: true, nullsFirst: false })

      if (error) throw error
      // Si la table est vide, initialiser avec les defaults
      if (!data || data.length === 0) {
        setTemplates(DEFAULT_TEMPLATES)
      } else {
        setTemplates(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement")
      setTemplates(DEFAULT_TEMPLATES)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTemplates() }, [fetchTemplates])

  const saveTemplates = useCallback((updated: EmailTemplate[]) => {
    setTemplates(updated)
    if (USE_MOCK) {
      localStorage.setItem("solyb_email_templates", JSON.stringify(updated))
    }
  }, [])

  const createTemplate = useCallback(async (template: EmailTemplateInsert) => {
    if (USE_MOCK) {
      const newT: EmailTemplate = { ...template, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), usage_count: 0, metadata: template.metadata || {} }
      const updated = [...templates, newT]
      saveTemplates(updated)
      return newT
    }
    const supabase = createClient()
    const { data, error } = await supabase.from("email_templates").insert(template).select().single()
    if (error) throw error
    setTemplates(prev => [...prev, data])
    return data
  }, [templates, saveTemplates])

  const updateTemplate = useCallback(async (id: string, updates: EmailTemplateUpdate) => {
    const updated = templates.map(t => t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t)
    saveTemplates(updated)

    if (!USE_MOCK) {
      const supabase = createClient()
      const { error } = await supabase.from("email_templates").update(updates).eq("id", id)
      if (error) throw error
    }
  }, [templates, saveTemplates])

  const deleteTemplate = useCallback(async (id: string) => {
    const updated = templates.filter(t => t.id !== id)
    saveTemplates(updated)

    if (!USE_MOCK) {
      const supabase = createClient()
      const { error } = await supabase.from("email_templates").delete().eq("id", id)
      if (error) throw error
    }
  }, [templates, saveTemplates])

  const sequenceTemplates = templates.filter(t => t.category === "sequence").sort((a, b) => (a.sequence_step || 0) - (b.sequence_step || 0))
  const quickReplyTemplates = templates.filter(t => t.category === "quick-reply")

  return { templates, sequenceTemplates, quickReplyTemplates, loading, error, createTemplate, updateTemplate, deleteTemplate, refetch: fetchTemplates }
}
