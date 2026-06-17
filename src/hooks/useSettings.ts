"use client"

import { useCallback, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

/**
 * Persiste les réglages admin du CRM dans la table Supabase `settings`
 * (une ligne, key = 'crm_admin_settings', value = JSONB), avec cache
 * localStorage pour un affichage instantané et un fallback hors-ligne / mock.
 * La clé API Brevo n'est jamais persistée.
 */
const DB_KEY = "crm_admin_settings"
const LS_KEY = "solyb_crm_settings"

export function useSettings<T extends Record<string, unknown>>(defaults: T) {
  const [settings, setSettings] = useState<T>(defaults)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true

    // 1) cache local immédiat
    try {
      const cached = localStorage.getItem(LS_KEY)
      if (cached) setSettings((s) => ({ ...s, ...JSON.parse(cached) }))
    } catch {}

    // 2) source de vérité : Supabase
    async function load() {
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        if (active) setLoaded(true)
        return
      }
      try {
        const supabase = createClient()
        const { data } = await supabase.from("settings").select("value").eq("key", DB_KEY).single()
        if (active && data?.value && typeof data.value === "object") {
          setSettings((s) => ({ ...s, ...(data.value as Partial<T>) }))
        }
      } catch {
        /* table absente / non connecté → on garde le cache local */
      }
      if (active) setLoaded(true)
    }
    load()

    return () => { active = false }
  }, [])

  const save = useCallback(async (next: T): Promise<{ ok: boolean; local: boolean }> => {
    setSettings(next)
    const sanitized = { ...next, brevo_api_key: "" }
    try { localStorage.setItem(LS_KEY, JSON.stringify(sanitized)) } catch {}

    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return { ok: true, local: true }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("settings")
        .upsert(
          { key: DB_KEY, value: sanitized, category: "crm", description: "Réglages admin CRM" },
          { onConflict: "key" }
        )
      return { ok: !error, local: false }
    } catch {
      return { ok: false, local: true }
    }
  }, [])

  return { settings, setSettings, save, loaded }
}
