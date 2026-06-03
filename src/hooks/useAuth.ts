"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_USE_MOCK === "true"

// Mock user for development
const MOCK_USER = {
  id: "mock-user-id",
  email: "admin@solyb.fr",
  role: "admin",
  created_at: new Date().toISOString(),
  aud: "authenticated",
  app_metadata: {},
  user_metadata: {},
} as User

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock mode: always return mock user
    if (IS_MOCK_MODE) {
      setUser(MOCK_USER)
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Récupérer l'utilisateur initial
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
  }
}
