"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LaunchOfferCounter() {
  const [slotsRemaining, setSlotsRemaining] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOfferStatus() {
      // Mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        setSlotsRemaining(23) // Example: 23 slots remaining out of 30
        setIsLoading(false)
        return
      }

      try {
        const supabase = createClient()

        const { data, error } = await supabase
          .from("launch_offer_tracking")
          .select("slots_filled, total_slots")
          .eq("is_active", true)
          .single()

        if (error) {
          console.error("Error fetching launch offer:", error)
          setSlotsRemaining(null)
        } else {
          const remaining = data.total_slots - data.slots_filled
          setSlotsRemaining(remaining)
        }
      } catch (error) {
        console.error("Error:", error)
        setSlotsRemaining(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOfferStatus()

    // Subscribe to realtime updates
    if (process.env.NEXT_PUBLIC_USE_MOCK !== "true") {
      const supabase = createClient()

      const channel = supabase
        .channel("launch_offer_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "launch_offer_tracking",
          },
          (payload) => {
            if (payload.new && typeof payload.new === "object" && "slots_filled" in payload.new && "total_slots" in payload.new) {
              const newData = payload.new as { slots_filled: number; total_slots: number }
              const remaining = newData.total_slots - newData.slots_filled
              setSlotsRemaining(remaining)
            }
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
        <span>Chargement...</span>
      </div>
    )
  }

  if (slotsRemaining === null || slotsRemaining <= 0) {
    return (
      <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span>Offre de lancement terminée</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>
        {slotsRemaining === 1
          ? "Dernière place disponible !"
          : `Plus que ${slotsRemaining} places disponibles`}
      </span>
    </div>
  )
}
