import { createClient } from "@supabase/supabase-js"

/**
 * Client Supabase **service-role** (contourne RLS).
 *
 * À n'utiliser QUE côté serveur (routes API, cron jobs) où il n'y a pas de
 * session utilisateur — typiquement les crons, qui s'exécutent en contexte
 * anonyme et seraient sinon bloqués par les policies RLS au moment de lire les
 * tables (`leads`, `analytics_snapshots`, …).
 *
 * ⚠️ Ne jamais importer ce module dans du code client : la clé service-role
 * donne un accès total à la base.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase service-role non configuré (NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant)"
    )
  }
  return createClient(url, serviceKey)
}
