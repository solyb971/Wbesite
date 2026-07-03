-- ============================================
-- 003 — Privilèges de table (GRANT) + accès public au formulaire
-- Corrige l'erreur « permission denied for table … » (42501) : sur ce projet,
-- les rôles Supabase anon / authenticated / service_role n'avaient pas les
-- privilèges de table par défaut. Sans cela, même un utilisateur connecté ne
-- peut rien lire/écrire (l'admin renvoie 403).
-- ============================================

-- Accès au schéma + privilèges sur les tables/séquences existantes
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;

-- Privilèges par défaut pour les futures tables/séquences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated, service_role;

-- ── Formulaire public : création de lead en anonyme + lecture du compteur d'offre ──
GRANT INSERT ON public.leads TO anon;
GRANT SELECT ON public.launch_offer_tracking TO anon;

DROP POLICY IF EXISTS "Public peut creer un lead" ON public.leads;
CREATE POLICY "Public peut creer un lead" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Public peut lire l offre de lancement" ON public.launch_offer_tracking;
CREATE POLICY "Public peut lire l offre de lancement" ON public.launch_offer_tracking
  FOR SELECT TO anon USING (true);
