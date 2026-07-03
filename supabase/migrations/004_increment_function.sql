-- ============================================
-- 004 — Fonction RPC `increment`
-- Utilisée par /api/emails/send (email_templates.usage_count) et
-- /api/webhooks/brevo (leads.email_opens / email_clicks).
-- Ces appels échouaient silencieusement faute de fonction définie.
--
-- Signature attendue côté app :
--   supabase.rpc("increment", { table_name, row_id, column_name })
-- ============================================

CREATE OR REPLACE FUNCTION public.increment(
  table_name  TEXT,
  row_id      UUID,
  column_name TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  -- Liste blanche : seules ces combinaisons table/colonne sont autorisées.
  allowed BOOLEAN := (table_name, column_name) IN (
    ('email_templates', 'usage_count'),
    ('leads',           'email_opens'),
    ('leads',           'email_clicks')
  );
BEGIN
  IF NOT allowed THEN
    RAISE EXCEPTION 'increment: couple table/colonne non autorisé (%, %)', table_name, column_name;
  END IF;

  -- %I échappe les identifiants ; la whitelist ci-dessus protège déjà l'injection.
  EXECUTE format(
    'UPDATE public.%I SET %I = COALESCE(%I, 0) + 1 WHERE id = $1',
    table_name, column_name, column_name
  ) USING row_id;
END;
$$;

-- Autoriser l'appel depuis les rôles applicatifs.
-- (anon nécessaire car le webhook Brevo n'est pas authentifié)
GRANT EXECUTE ON FUNCTION public.increment(TEXT, UUID, TEXT) TO authenticated, service_role, anon;
