/**
 * Supabase Client pour le navigateur (Client Components)
 * Utilise @supabase/ssr pour gérer les cookies de session
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
