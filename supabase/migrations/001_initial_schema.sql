-- ============================================
-- SYSTÈME CRM SOLYB - SCHÉMA INITIAL
-- ============================================
-- Version: 1.0.0
-- Date: Décembre 2025
-- Description: Schéma complet pour le CRM SolYB (leads, notes, fichiers, planning, analytics, templates email)

-- ============================================
-- TABLES PRINCIPALES
-- ============================================

-- Table: leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Informations contact
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),

  -- Projet
  project_type VARCHAR(50) NOT NULL, -- 'vitrine', 'ecommerce', 'content', 'custom'
  budget DECIMAL(10,2),
  description TEXT,
  urgency VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'

  -- Statut & Workflow
  status VARCHAR(50) DEFAULT 'nouveau', -- 'nouveau', 'contact', 'devis', 'gagne', 'perdu'
  activity_type VARCHAR(50) DEFAULT 'digital', -- 'digital', 'animation', 'distribution'

  -- Scoring automatique
  score_total INTEGER DEFAULT 0, -- Score global sur 100
  score_budget INTEGER DEFAULT 0,
  score_clarity INTEGER DEFAULT 0,
  score_urgency INTEGER DEFAULT 0,
  score_fit INTEGER DEFAULT 0,
  score_responsiveness INTEGER DEFAULT 0,
  score_source INTEGER DEFAULT 0,

  -- Tracking
  source VARCHAR(100), -- 'linkedin', 'site-web', 'bouche-a-oreille', 'referral'
  source_details TEXT, -- Détails sur la source
  first_contact_date TIMESTAMP WITH TIME ZONE,
  last_contact_date TIMESTAMP WITH TIME ZONE,

  -- Offre lancement
  is_launch_offer BOOLEAN DEFAULT TRUE,
  launch_offer_position INTEGER, -- Position dans les 30 premiers (1-30)

  -- Estimation projet
  estimated_hours DECIMAL(5,2),
  estimated_rate DECIMAL(10,2),
  estimated_profit DECIMAL(10,2),

  -- Séquences email
  email_sequence_active BOOLEAN DEFAULT TRUE,
  email_sequence_step INTEGER DEFAULT 0, -- 0-4
  email_sequence_last_sent TIMESTAMP WITH TIME ZONE,
  email_opens INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,

  -- Tags
  tags TEXT[],

  -- Export
  exported_to_erp BOOLEAN DEFAULT FALSE,
  exported_at TIMESTAMP WITH TIME ZONE,
  erp_id VARCHAR(100),

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index pour performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_score ON leads(score_total DESC);
CREATE INDEX idx_leads_activity ON leads(activity_type);
CREATE INDEX idx_leads_email_sequence ON leads(email_sequence_active, email_sequence_step);

-- ============================================

-- Table: notes
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'note', -- 'note', 'call', 'email', 'meeting', 'task'

  -- Pour les tâches
  is_task BOOLEAN DEFAULT FALSE,
  task_completed BOOLEAN DEFAULT FALSE,
  task_due_date TIMESTAMP WITH TIME ZONE,

  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_notes_lead ON notes(lead_id, created_at DESC);
CREATE INDEX idx_notes_tasks ON notes(is_task, task_completed, task_due_date);

-- ============================================

-- Table: files
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,

  category VARCHAR(50) DEFAULT 'general', -- 'devis', 'contrat', 'maquette', 'autre'

  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_files_lead ON files(lead_id);

-- ============================================

-- Table: email_templates
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  name VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,

  category VARCHAR(50), -- 'sequence', 'quick-reply', 'custom'
  sequence_step INTEGER, -- Pour séquences auto (1-4)

  variables TEXT[], -- Variables dynamiques disponibles

  is_active BOOLEAN DEFAULT TRUE,
  usage_count INTEGER DEFAULT 0,

  metadata JSONB DEFAULT '{}'::jsonb
);

-- ============================================

-- Table: email_logs
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,

  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  body TEXT,

  status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'delivered', 'opened', 'clicked', 'failed'

  brevo_message_id VARCHAR(255),

  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,

  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_email_logs_lead ON email_logs(lead_id, created_at DESC);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- ============================================

-- Table: planning_events
CREATE TABLE planning_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  title VARCHAR(255) NOT NULL,
  description TEXT,

  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,

  event_type VARCHAR(50) NOT NULL, -- 'projet', 'appel', 'animation', 'distribution', 'cdd', 'blocked'
  activity_type VARCHAR(50), -- 'digital', 'animation', 'distribution'

  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,

  status VARCHAR(50) DEFAULT 'planned', -- 'planned', 'in-progress', 'completed', 'cancelled'

  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),

  location VARCHAR(255),

  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_planning_events_date ON planning_events(start_time, end_time);
CREATE INDEX idx_planning_events_type ON planning_events(event_type);
CREATE INDEX idx_planning_events_lead ON planning_events(lead_id);

-- ============================================

-- Table: launch_offer_tracking
CREATE TABLE launch_offer_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  total_slots INTEGER DEFAULT 30,
  slots_filled INTEGER DEFAULT 0,
  slots_remaining INTEGER DEFAULT 30,

  total_revenue DECIMAL(10,2) DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,

  projected_completion_date DATE,

  is_active BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP WITH TIME ZONE,

  metadata JSONB DEFAULT '{}'::jsonb
);

-- Seed initial
INSERT INTO launch_offer_tracking (id) VALUES (gen_random_uuid());

-- ============================================

-- Table: analytics_snapshots
-- Pour stocker des snapshots quotidiens des metrics
CREATE TABLE analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Leads
  total_leads INTEGER DEFAULT 0,
  leads_nouveau INTEGER DEFAULT 0,
  leads_contact INTEGER DEFAULT 0,
  leads_devis INTEGER DEFAULT 0,
  leads_gagne INTEGER DEFAULT 0,
  leads_perdu INTEGER DEFAULT 0,

  -- Conversions
  conversion_rate_contact DECIMAL(5,2),
  conversion_rate_devis DECIMAL(5,2),
  conversion_rate_gagne DECIMAL(5,2),
  conversion_rate_global DECIMAL(5,2),

  -- CA
  revenue_month DECIMAL(10,2) DEFAULT 0,
  revenue_projected DECIMAL(10,2) DEFAULT 0,

  -- Temps
  avg_time_to_contact DECIMAL(10,2), -- en heures
  avg_time_to_quote DECIMAL(10,2), -- en jours
  avg_time_to_close DECIMAL(10,2), -- en jours

  -- Par activité
  digital_leads INTEGER DEFAULT 0,
  digital_revenue DECIMAL(10,2) DEFAULT 0,
  animation_leads INTEGER DEFAULT 0,
  animation_revenue DECIMAL(10,2) DEFAULT 0,
  distribution_leads INTEGER DEFAULT 0,
  distribution_revenue DECIMAL(10,2) DEFAULT 0,

  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_analytics_snapshots_date ON analytics_snapshots(snapshot_date DESC);

-- ============================================

-- Table: settings
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,

  category VARCHAR(100),
  description TEXT
);

-- Seed settings par défaut
INSERT INTO settings (key, value, category, description) VALUES
('capacity_weekly_hours', '20', 'planning', 'Heures disponibles par semaine'),
('capacity_alert_threshold', '0.9', 'planning', 'Seuil alerte surcharge (90%)'),
('scoring_weights', '{"budget":20,"clarity":15,"urgency":20,"fit":15,"responsiveness":15,"source":15}', 'scoring', 'Poids des critères de scoring'),
('launch_offer_prices', '{"vitrine":599,"ecommerce":999,"maintenance":29}', 'pricing', 'Prix offre de lancement'),
('normal_prices', '{"vitrine":899,"ecommerce":1499,"maintenance":29}', 'pricing', 'Prix normaux après offre'),
('email_sequence_delays', '{"step1":0,"step2":3,"step3":7,"step4":10}', 'email', 'Délais entre emails (en jours)'),
('work_schedule', '{"weekdays":{"start":"18:00","end":"21:00"},"weekend":{"saturday":{"start":"06:00","end":"11:00","distribution":true},"saturday_pm":{"start":"14:00","end":"18:00","animation":true},"sunday":{"start":"10:00","end":"16:00"}}}', 'planning', 'Horaires de travail'),
('hourly_rate_target', '60', 'business', 'Taux horaire cible (€/h)'),
('time_estimates', '{"vitrine":10,"ecommerce":17,"content":3,"custom":20}', 'business', 'Estimations temps par type projet (heures)');

-- ============================================
-- FONCTIONS & TRIGGERS
-- ============================================

-- Fonction: Mise à jour automatique updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_planning_events_updated_at BEFORE UPDATE ON planning_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================

-- Fonction: Calcul automatique du score lead
CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
DECLARE
  weights JSONB;
  total_score INTEGER := 0;
BEGIN
  -- Récupérer les poids depuis settings
  SELECT value INTO weights FROM settings WHERE key = 'scoring_weights';

  -- Calculer score total
  total_score :=
    COALESCE(NEW.score_budget, 0) +
    COALESCE(NEW.score_clarity, 0) +
    COALESCE(NEW.score_urgency, 0) +
    COALESCE(NEW.score_fit, 0) +
    COALESCE(NEW.score_responsiveness, 0) +
    COALESCE(NEW.score_source, 0);

  NEW.score_total := total_score;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_lead_score_trigger BEFORE INSERT OR UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION calculate_lead_score();

-- ============================================

-- Fonction: Update compteur offre lancement
CREATE OR REPLACE FUNCTION update_launch_offer_counter()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'gagne' AND NEW.is_launch_offer = TRUE THEN
    UPDATE launch_offer_tracking
    SET
      slots_filled = slots_filled + 1,
      slots_remaining = total_slots - (slots_filled + 1),
      total_revenue = total_revenue + NEW.budget,
      updated_at = NOW()
    WHERE is_active = TRUE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_launch_offer_counter_trigger AFTER UPDATE ON leads
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'gagne')
  EXECUTE FUNCTION update_launch_offer_counter();

-- ============================================

-- Fonction: Calcul estimations projet
CREATE OR REPLACE FUNCTION calculate_project_estimates()
RETURNS TRIGGER AS $$
DECLARE
  time_estimates JSONB;
  estimated_hours DECIMAL(5,2);
  hourly_rate DECIMAL(10,2);
BEGIN
  -- Récupérer estimations depuis settings
  SELECT value INTO time_estimates FROM settings WHERE key = 'time_estimates';
  SELECT value::decimal INTO hourly_rate FROM settings WHERE key = 'hourly_rate_target';

  -- Estimer heures selon type projet
  estimated_hours := (time_estimates->>NEW.project_type)::decimal;

  NEW.estimated_hours := estimated_hours;
  NEW.estimated_rate := NEW.budget / estimated_hours;
  NEW.estimated_profit := NEW.budget - (estimated_hours * (hourly_rate * 0.3)); -- 30% charges

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_project_estimates_trigger BEFORE INSERT OR UPDATE ON leads
  FOR EACH ROW
  WHEN (NEW.project_type IS NOT NULL AND NEW.budget IS NOT NULL)
  EXECUTE FUNCTION calculate_project_estimates();

-- ============================================
-- VUES UTILES
-- ============================================

-- Vue: Statistiques temps réel
CREATE OR REPLACE VIEW v_realtime_stats AS
SELECT
  COUNT(*) FILTER (WHERE status = 'nouveau') as leads_nouveau,
  COUNT(*) FILTER (WHERE status = 'contact') as leads_contact,
  COUNT(*) FILTER (WHERE status = 'devis') as leads_devis,
  COUNT(*) FILTER (WHERE status = 'gagne') as leads_gagne,
  COUNT(*) FILTER (WHERE status = 'perdu') as leads_perdu,
  SUM(budget) FILTER (WHERE status = 'gagne') as revenue_realise,
  SUM(budget) FILTER (WHERE status IN ('nouveau', 'contact', 'devis')) as revenue_pipeline,
  AVG(score_total) as avg_score,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as leads_this_week,
  COUNT(*) FILTER (WHERE status = 'gagne' AND updated_at > NOW() - INTERVAL '30 days') as deals_this_month
FROM leads;

-- Vue: Pipeline par activité
CREATE OR REPLACE VIEW v_pipeline_by_activity AS
SELECT
  activity_type,
  status,
  COUNT(*) as count,
  SUM(budget) as total_budget,
  AVG(score_total) as avg_score
FROM leads
WHERE status NOT IN ('gagne', 'perdu')
GROUP BY activity_type, status
ORDER BY activity_type,
  CASE status
    WHEN 'nouveau' THEN 1
    WHEN 'contact' THEN 2
    WHEN 'devis' THEN 3
  END;

-- Vue: Taux de conversion
CREATE OR REPLACE VIEW v_conversion_rates AS
SELECT
  COUNT(*) FILTER (WHERE status != 'nouveau') * 100.0 / NULLIF(COUNT(*), 0) as rate_contact,
  COUNT(*) FILTER (WHERE status IN ('devis', 'gagne', 'perdu')) * 100.0 / NULLIF(COUNT(*) FILTER (WHERE status != 'nouveau'), 0) as rate_devis,
  COUNT(*) FILTER (WHERE status = 'gagne') * 100.0 / NULLIF(COUNT(*) FILTER (WHERE status IN ('devis', 'gagne', 'perdu')), 0) as rate_gagne,
  COUNT(*) FILTER (WHERE status = 'gagne') * 100.0 / NULLIF(COUNT(*), 0) as rate_global
FROM leads;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE planning_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE launch_offer_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies (pour l'instant: accès complet pour utilisateur authentifié)
-- À ajuster selon besoins futurs

CREATE POLICY "Enable all for authenticated users" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON notes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON files
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON email_templates
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON email_logs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON planning_events
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON launch_offer_tracking
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON analytics_snapshots
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON settings
  FOR ALL USING (auth.role() = 'authenticated');
