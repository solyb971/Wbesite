-- ============================================
-- 002 — Segmentation multi-produits des leads
-- Ajoute la colonne product_source utilisée par le CRM (Pipeline / Analytics)
-- pour distinguer les leads SolYB Agence / FactuGP / ResaGP.
-- ============================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS product_source VARCHAR(50) DEFAULT 'solyb_agency';

-- Contrainte de valeurs autorisées (sans casser les lignes existantes)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_product_source_check'
  ) THEN
    ALTER TABLE leads
      ADD CONSTRAINT leads_product_source_check
      CHECK (product_source IN ('solyb_agency', 'factu_gp', 'resa_gp'));
  END IF;
END $$;

-- Backfill : tout l'existant rattaché à l'agence
UPDATE leads SET product_source = 'solyb_agency' WHERE product_source IS NULL;

-- Index pour le filtrage par produit
CREATE INDEX IF NOT EXISTS idx_leads_product_source ON leads(product_source);
