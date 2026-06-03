Voici le **PROMPT ULTIME** pour créer ton système complet SolYB 🚀

---

# 🎯 PROMPT COMPLET - SYSTÈME CRM SOLYB

## 📋 CONTEXTE BUSINESS

**Entreprise :** SolYB (Solutions by Yacine Bouhassoun)  
**Activité :** Services digitaux en Guadeloupe (sites web, e-commerce, contenu IA)  
**Cible :** TPE/PME guadeloupéennes  
**Modèle :** Bootstrap, entrepreneur solo, 15-20h/semaine disponibles  
**Particularités :**
- 3 activités parallèles : Digital (70%), Animation commerciale (20%), Distribution B2B (10%)
- Travail en parallèle d'un CDD commercial temps plein
- Disponibilité : soirées (18h-21h) et week-ends
- Offre de lancement : 30 premiers clients à tarifs réduits (599€ site vitrine, 999€ e-commerce)
- Objectif année 1 : 17 000€ CA

**Besoin :** Système complet (site vitrine + CRM admin) pour acquérir, gérer et convertir des leads efficacement.

---

## 🏗️ ARCHITECTURE TECHNIQUE

### **Stack obligatoire (100% gratuit)**

**Frontend** (màj 2026-05-30)
- Framework : React 19 + Next.js 15 (App Router) ✅
- Styling : Tailwind CSS 3 + shadcn/ui components ✅
- Icons : Lucide React ✅
- Charts : Recharts ✅
- Forms : React Hook Form + Zod validation ✅
- Drag & Drop : @dnd-kit/core ✅
- Notifications : Sonner / React Hot Toast
- Canvas animations : natif (ConstellationsCanvas)

**Backend & Database**
- Database : Supabase (PostgreSQL)
- Auth : Supabase Auth
- Storage : Supabase Storage (fichiers)
- Real-time : Supabase Realtime
- API : Supabase REST API auto-générée

**Emails**
- Service : Brevo (ex-Sendinblue) API
- Templates : Système de templates dynamiques
- Tracking : Ouvertures/clics via webhooks

**Hosting**
- Frontend : Vercel ✅ (domaine solyb.fr)
- Backend : Supabase ✅

**Contraintes techniques**
- ✅ 100% gratuit (aucun service payant)
- ✅ Responsive mobile-first
- ⏳ PWA — non implémenté à ce stade
- ⏳ Lighthouse >90 — à mesurer en prod
- ✅ SEO optimisé (JSON-LD, keywords locaux 971)
- ⏳ WCAG 2.1 AA — partiellement

---

## 🎨 STRUCTURE DU PROJET

```
solyb-crm/
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── manifest.json (PWA)
│
├── src/
│   ├── app/ (Next.js App Router)
│   │   ├── (public)/ (Site vitrine)
│   │   │   ├── page.tsx (Homepage)
│   │   │   ├── services/page.tsx
│   │   │   ├── tarifs/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── admin/ (Dashboard CRM)
│   │   │   ├── page.tsx (Pipeline Kanban)
│   │   │   ├── leads/[id]/page.tsx (Détail lead)
│   │   │   ├── planning/page.tsx (Calendrier)
│   │   │   ├── analytics/page.tsx (Stats)
│   │   │   ├── templates/page.tsx (Templates emails)
│   │   │   ├── settings/page.tsx (Paramètres)
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/ (API Routes)
│   │   │   ├── leads/route.ts
│   │   │   ├── emails/route.ts
│   │   │   ├── webhooks/route.ts
│   │   │   └── export/route.ts
│   │   │
│   │   └── layout.tsx (Root layout)
│   │
│   ├── components/
│   │   ├── site/ (Composants site vitrine)
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── admin/ (Composants CRM)
│   │   │   ├── Pipeline/
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── LeadCard.tsx
│   │   │   │   └── Column.tsx
│   │   │   ├── LeadDetail/
│   │   │   │   ├── LeadInfo.tsx
│   │   │   │   ├── Timeline.tsx
│   │   │   │   ├── Notes.tsx
│   │   │   │   ├── Files.tsx
│   │   │   │   └── ScoreCard.tsx
│   │   │   ├── Planning/
│   │   │   │   ├── Calendar.tsx
│   │   │   │   ├── WeekView.tsx
│   │   │   │   └── CapacityIndicator.tsx
│   │   │   ├── Analytics/
│   │   │   │   ├── ConversionFunnel.tsx
│   │   │   │   ├── SourcesChart.tsx
│   │   │   │   └── RevenueProjection.tsx
│   │   │   ├── Templates/
│   │   │   │   ├── TemplateEditor.tsx
│   │   │   │   └── TemplateList.tsx
│   │   │   └── Shared/
│   │   │       ├── LaunchOfferCounter.tsx
│   │   │       ├── QuickActions.tsx
│   │   │       ├── NotificationCenter.tsx
│   │   │       └── PDFGenerator.tsx
│   │   │
│   │   └── ui/ (shadcn/ui components)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       └── ... (autres composants shadcn)
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts (Client Supabase)
│   │   │   ├── server.ts (Server Supabase)
│   │   │   └── schema.sql (Structure DB)
│   │   ├── utils/
│   │   │   ├── scoring.ts (Calcul score leads)
│   │   │   ├── time-estimate.ts (Estimation temps)
│   │   │   ├── capacity.ts (Gestion charge)
│   │   │   ├── export.ts (Export CSV/JSON)
│   │   │   └── pdf.ts (Génération PDF)
│   │   ├── email/
│   │   │   ├── brevo.ts (API Brevo)
│   │   │   ├── templates.ts (Templates emails)
│   │   │   └── sequences.ts (Séquences auto)
│   │   └── constants.ts (Constantes globales)
│   │
│   ├── hooks/
│   │   ├── useLeads.ts
│   │   ├── useNotes.ts
│   │   ├── useAnalytics.ts
│   │   ├── usePlanning.ts
│   │   └── useNotifications.ts
│   │
│   ├── types/
│   │   ├── database.types.ts (Types Supabase auto-générés)
│   │   ├── lead.types.ts
│   │   ├── activity.types.ts
│   │   └── analytics.types.ts
│   │
│   └── styles/
│       └── globals.css
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   ├── functions/ (Edge Functions si besoin)
│   └── seed.sql (Données test)
│
├── .env.local (Variables environnement)
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md (Documentation complète)
```

---

## 🗄️ SCHÉMA BASE DE DONNÉES COMPLET

```sql
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
```

---

## 🎨 SITE VITRINE - SPÉCIFICATIONS UI/UX

### **Pages & Sections**

**1. Homepage (/) — IMPLÉMENTÉE (màj 2026-05-30)**
```
SplashScreen (intro):
- Logo SYB orange sur fond #0A0A0F
- Géré via sessionStorage (pas de replay)

Bandeau UrgencyBanner:
- "Facturation électronique — la réforme est en cours — anticipez dès maintenant"
- CTA "En savoir plus" → #facturation

Navigation:
- Logo SYB + liens sections + bouton "Audit gratuit"
- Sticky top, fond #0A0A0F, border-bottom #2A2A38

Ticker (bandeau défilant):
- Items : SITES WEB SUR-MESURE · FACTURATION ÉLECTRONIQUE 2026 · APPLICATIONS MÉTIER · etc.
- Défilement 30s, toujours actif

Section Hero:
- H1 animé (SplitLine char par char) : "Votre entreprise mérite un [typewriter] qui lui ressemble"
- Fond dark #0A0A0F + blobs coral/solar/turquoise blur-3xl
- Stats : 2-3 sem. / 100% sur-mesure / 2026
- CTA : "Découvrir nos services" + "Audit gratuit"
- Scroll indicator animé

Section Services (id="services"):
- H2 : "4 expertises, 1 seule agence"
- 3 TiltCard (±8°, glow directionnel par couleur) : Sites Web / Applications Métier / SaaS & Marketplace
- 1 featured card : Facturation Électronique (solar, badge "RÉFORME EN COURS")

Section Process (id="processus"):
- H2 : "Comment ça marche ?"
- 4 étapes cascade blur-to-sharp : Audit Gratuit / Proposition / Développement / Livraison & Suivi
- Ligne de connexion animée entre cartes

Section About (id="apropos"):
- Watermark "YACINE" en fond
- Bio Yacine + skill tags (Next.js, SEO Local, Facturation Électronique, etc.)
- Grid stats 2×2 : 5+ ans / 100% sur-mesure / <24h / 971

Section FacturationElectronique (id="facturation"):
- Section dédiée 2026 — niche SEO clé
- 3 étapes, tableau secteurs Guadeloupe concernés, FAQ, différenciateur SolYB

Section Pricing (id="tarifs"):
- 3 plans : Starter 599€ / Business 999€ / Maintenance 39€/mois
- Badge "Plus populaire" sur Business
- 3 info cards : Paiement Flexible / Livraison Rapide / Satisfaction Garantie

Section Testimonials / Réalisations / FAQ / Contact

Footer:
- Logo SYB + liens + copyright + WhatsApp button flottant
```

**Design System — IMPLÉMENTÉ (màj 2026-05-30)**
```css
/* ⚠️ SPEC INITIALE OBSOLÈTE — Palette réelle ci-dessous */

Backgrounds:
- Base:    #0A0A0F  (quasi-noir)
- Surface: #13131A  (cartes)
- Card:    #1C1C26  (cartes secondaires)
- Border:  #2A2A38  (séparateurs)

Accents:
- Coral (CTA principal): #FF6B47  — boutons, liens, highlights
- Solar (facturation/urgence): #F5A623  — badges urgence, facturation
- Turquoise (tech/checks): #00D4AA  — checkmarks, éléments tech
- Violet: #8B5CF6  — 4e accent

Texte:
- Principal: #F0EDE8
- Muted:     #8B8B9E

Typography:
- Display/titres: Syne (variable --font-syne)
- Body: Plus Jakarta Sans (variable --font-jakarta)
- H1: 4-8rem, bold
- H2: 2.5-5rem, bold

Spacing:
- Base: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

Border radius:
- Small: 8px
- Medium: 12px
- Large: 20px
- XL: 24px

Shadows:
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px rgba(0,0,0,0.1)
- lg: 0 10px 25px rgba(0,0,0,0.1)
- xl: 0 20px 50px rgba(0,0,0,0.15)
```

**Formulaire Contact (critique)**
```
Champs obligatoires:
- Nom complet *
- Email *
- Téléphone
- Entreprise/Activité
- Type de projet * (select: vitrine / e-commerce / contenu / autre)
- Budget indicatif * (select: <500€ / 500-1000€ / 1000-2000€ / >2000€)
- Description projet * (textarea, min 50 caractères)
- Urgence (select: Pas urgent / 1 mois / 2 semaines / Urgent)
- Comment avez-vous connu SolYB? (select: LinkedIn / Bouche-à-oreille / Recherche Google / Autre)

Validation:
- Temps réel avec Zod
- Messages erreur clairs en français
- Disabled submit si erreurs

Soumission:
- Loading state
- Webhook vers API /api/leads
- Création lead dans Supabase
- Envoi email confirmation prospect (template "Bienvenue")
- Notification admin (email + in-app)
- Redirect vers page "Merci" avec next steps
- Toast success: "Demande envoyée ! Je vous recontacte sous 24h"

Analytics:
- Track avec événement personnalisé
- Source tracking (UTM, referer)
```

---

## 🎛️ DASHBOARD ADMIN - SPÉCIFICATIONS DÉTAILLÉES

### **Layout général**

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] SolYB CRM        [Recherche]      [Notifs] [👤] │ <- Navbar fixe
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Sidebar  │                                              │
│          │            Contenu principal                 │
│ 📊 Pipeline│                                              │
│ 📅 Planning│                                              │
│ 📈 Analytics                                             │
│ ✉️ Templates│                                             │
│ ⚙️ Settings│                                             │
│          │                                              │
│ [Mode 🌓]│                                              │
└──────────┴──────────────────────────────────────────────┘
```

### **Page: Pipeline Kanban (/admin)**

**Layout**
```
┌────────────────────────────────────────────────────────────┐
│  📊 Pipeline                                                │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Stats rapides (4 cartes):                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │
│  │ 🆕 12│ │ 💬 5 │ │ 📄 3 │ │ ✅ 2 │                     │
│  │Nouveau│ │Contact│ │Devis │ │Gagné │                     │
│  └──────┘ └──────┘ └──────┘ └──────┘                     │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │ 🔍 [Recherche]  📅 [Cette semaine ▼]  🏷️ [Filtres]│    │
│  │ 🎯 Offre lancement: ████████░░ 12/30 (18 restantes)│    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  Kanban Board (drag & drop):                               │
│  ┌──────────┬──────────┬──────────┬──────────┬─────────┐ │
│  │ 🆕 NOUVEAU│ 💬 CONTACT│ 📄 DEVIS │ ✅ GAGNÉ │ ❌ PERDU│ │
│  │   (12)   │   (5)    │   (3)    │   (2)    │   (1)   │ │
│  ├──────────┼──────────┼──────────┼──────────┼─────────┤ │
│  │ [Cards]  │ [Cards]  │ [Cards]  │ [Cards]  │ [Cards] │ │
│  │          │          │          │          │         │ │
│  └──────────┴──────────┴──────────┴──────────┴─────────┘ │
│                                                             │
│  [+ Nouveau lead]                                          │
└────────────────────────────────────────────────────────────┘
```

**Lead Card (dans Kanban)**
```
┌─────────────────────────────┐
│ 👤 Jean Martin         🔥 85│ <- Score
├─────────────────────────────┤
│ 🏢 Restaurant Le Créole     │
│ 🌐 Site vitrine             │
│ 💰 599€ (Offre lancement)   │
│                             │
│ 📧 jean@example.com         │
│ 📱 +590 690 XX XX XX        │
│                             │
│ 🏷️ [Urgent] [Premium]       │
│                             │
│ ⏱️ Il y a 2h                │
│ 📧 Email 1/4 envoyé (ouvert)│
│                             │
│ ─────────────────────────── │
│ [👁️ Voir] [📞] [✉️] [...]   │
└─────────────────────────────┘
```

**Filtres avancés**
```
📅 Période:
- Aujourd'hui
- Cette semaine
- Ce mois
- Personnalisé

🎯 Activité:
- Digital
- Animation
- Distribution
- Toutes

🔥 Score:
- >80 (Chaud)
- 60-80 (Tiède)
- <60 (Froid)
- Tous

🏷️ Tags:
- Urgent
- Premium
- Ami
- Referral
- Custom tags

📧 Séquence email:
- Active
- Terminée
- Bloquée

💰 Budget:
- <500€
- 500-1000€
- 1000-2000€
- >2000€

Sauvegarder filtre → [Créer vue personnalisée]
```

### **Page: Lead Detail (/admin/leads/[id])**

**Layout complet**
```
┌────────────────────────────────────────────────────────────┐
│ ← Retour au pipeline              LEAD #2024-001      [×]  │
├─────────────────────┬──────────────────────────────────────┤
│                     │                                      │
│ INFORMATIONS        │ ACTIONS RAPIDES                      │
│                     │                                      │
│ 👤 Jean Martin      │ ┌─────────────────────────────────┐ │
│ 📧 jean@example.com │ │ 📧 [Envoyer email]             │ │
│ 📱 +590 690 XX XX XX│ │ 📞 [Lancer appel]              │ │
│ 🏢 Restaurant       │ │ 📄 [Générer devis PDF]         │ │
│    Le Créole        │ │ 📅 [Planifier RDV]             │ │
│                     │ │ 💾 [Exporter vers ERP]         │ │
│ 🌐 Type:            │ └─────────────────────────────────┘ │
│    Site vitrine     │                                      │
│ 💰 Budget: 599€     │ ┌─────────────────────────────────┐ │
│ ⏱️ Urgent           │ │ Statut actuel:                  │ │
│                     │ │ 💬 En contact                   │ │
│ 📅 Reçu: 15/01/26   │ │                                 │ │
│ ⏱️ Il y a 2h        │ │ [Changer statut ▼]             │ │
│                     │ │   ○ Nouveau                     │ │
│ 📍 Source:          │ │   ● En contact                  │ │
│    LinkedIn         │ │   ○ Devis envoyé                │ │
│                     │ │   ○ Gagné                       │ │
│ 🏷️ Tags:            │ │   ○ Perdu                       │ │
│ [Urgent] [Premium]  │ └─────────────────────────────────┘ │
│ [+ Ajouter tag]     │                                      │
│                     │                                      │
├─────────────────────┴──────────────────────────────────────┤
│                                                             │
│ 🔥 SCORE DÉTAILLÉ: 85/100                                  │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ Budget clair: ████████████████████░ 20/20            │ │
│ │ Besoin précis: ████████████░░░░░░░░ 12/15            │ │
│ │ Urgence: ████████████████████░ 20/20                 │ │
│ │ Fit offre: ███████████████░░░░░ 15/15                │ │
│ │ Réactivité: ████████████░░░░░░░░ 13/15               │ │
│ │ Source fiable: █████░░░░░░░░░░░░░░░ 5/15             │ │
│ └───────────────────────────────────────────────────────┘ │
│ 🎯 RECOMMANDATION: Priorité HAUTE - Rappeler sous 24h     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 💰 ESTIMATION RENTABILITÉ                                  │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ Budget: 599€                                           │ │
│ │ Temps estimé: 10h                                      │ │
│ │ Taux horaire: 59,90€/h ✅ (objectif: 60€/h)           │ │
│ │                                                         │ │
│ │ Répartition:                                           │ │
│ │ ├─ Brief & maquette: 2h                                │ │
│ │ ├─ Développement: 6h                                   │ │
│ │ ├─ Contenu & SEO: 1h                                   │ │
│ │ └─ Livraison & formation: 1h                           │ │
│ │                                                         │ │
│ │ 🎯 VERDICT: ✅ RENTABLE                                │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📝 NOTES & HISTORIQUE                [Ajouter note] [Task] │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ [_______________________________________________]      │ │
│ │                                          [💾 Sauver]   │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│ Timeline (ordre chronologique inversé):                    │
│                                                             │
│ ⏱️ 15/01/2026 - 16:30                                      │
│ 📝 NOTE (moi)                                              │
│ "Appelé Jean, très motivé. Veut lancer avant carnaval.    │
│  Budget ok. RDV visio mardi 18h pour voir maquettes."     │
│ [✏️ Modifier] [🗑️ Supprimer]                               │
│                                                             │
│ ⏱️ 15/01/2026 - 14:30                                      │
│ 📧 EMAIL AUTO                                              │
│ Email "Bienvenue" envoyé ✅                                │
│ • Ouvert: ✅ (15/01 15:20)                                 │
│ • Cliqué lien: ✅ (15/01 15:22)                            │
│ [👁️ Voir email]                                            │
│                                                             │
│ ⏱️ 15/01/2026 - 14:00                                      │
│ 🆕 CRÉATION                                                │
│ Lead créé depuis formulaire site web                       │
│ Source: LinkedIn → Post "5 erreurs TPE"                    │
│ Description complète:                                      │
│ "Je voudrais un site vitrine pour mon restaurant avec     │
│  menu en ligne et système de réservation. Budget 500-800€."│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📊 PROGRESSION SÉQUENCE EMAIL            [⏸️ Suspendre]    │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ ✅ Email 1: Bienvenue (J+0)                            │ │
│ │    Envoyé: 15/01 14:30                                 │ │
│ │    Ouvert: ✅ 15/01 15:20                              │ │
│ │    Cliqué: ✅ 15/01 15:22                              │ │
│ │                                                         │ │
│ │ ⏳ Email 2: Cas client similaire (J+3)                 │ │
│ │    Programmé: 18/01 14:00                              │ │
│ │    [📤 Envoyer maintenant] [⏭️ Passer]                │ │
│ │                                                         │ │
│ │ ⬜ Email 3: Urgence douce (J+7)                        │ │
│ │    Programmé: 22/01 14:00                              │ │
│ │                                                         │ │
│ │ ⬜ Email 4: Dernier contact (J+10)                     │ │
│ │    Programmé: 25/01 14:00                              │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📎 FICHIERS ATTACHÉS                    [📤 Upload fichier]│
│ ┌───────────────────────────────────────────────────────┐ │
│ │ 📄 Devis_Jean_Martin_15012026.pdf (généré auto)       │ │
│ │    120 KB • 15/01/2026 16:45                           │ │
│ │    [👁️ Voir] [📥 Télécharger] [🗑️]                    │ │
│ │                                                         │ │
│ │ 🖼️ Maquette_restaurant_v1.jpg                          │ │
│ │    850 KB • 15/01/2026 16:50                           │ │
│ │    [👁️ Voir] [📥 Télécharger] [🗑️]                    │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📅 ÉVÉNEMENTS PLANIFIÉS                   [+ Ajouter événement] │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ 📞 Appel de suivi                                      │ │
│ │    Mardi 18/01 - 18:00-18:30                           │ │
│ │    Statut: 🟢 Confirmé                                 │ │
│ │    [✏️] [🗑️]                                            │ │
│ │                                                         │ │
│ │ 🌐 Livraison site web                                  │ │
│ │    Vendredi 28/01 - 19:00-20:00                        │ │
│ │    Statut: 🟡 Planifié                                 │ │
│ │    [✏️] [🗑️]                                            │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
└────────────────────────────────────────────────────────────┘

           [🗑️ Supprimer lead]         [💾 Sauvegarder]
```

### **Page: Planning (/admin/planning)**

**Vue semaine**
```
┌────────────────────────────────────────────────────────────┐
│  📅 Planning                                                │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 CHARGE SEMAINE                                         │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Utilisé: 18h / 20h disponibles ████████████████░░  │   │
│  │ Marge restante: 2h (10%) ✅                        │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  [◄ Semaine précédente]  20-26 Janvier 2026  [Suivante ►] │
│                                                             │
│  ┌─────┬───────────────────────────────────────────────┐  │
│  │     │   Matin    │  Après-midi  │    Soirée        │  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ LUN │ 🚫 CDD    │  🚫 CDD      │ 🌐 Site Jean (2h) │  │
│  │ 20  │            │              │ 19:00-21:00       │  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ MAR │ 🚫 CDD    │  🚫 CDD      │ 🌐 Site Marie (3h)│  │
│  │ 21  │            │              │ 18:00-21:00       │  │
│  │     │            │              │ 📞 Jean (30min)   │  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ MER │ 🚫 CDD    │  🚫 CDD      │ 💬 Appels (1h)    │  │
│  │ 22  │            │              │ 19:00-20:00       │  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ JEU │ 🚫 CDD    │  🚫 CDD      │ 🌐 Site Jean (2h) │  │
│  │ 23  │            │              │ 19:00-21:00       │  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ VEN │ 🚫 CDD    │  🚫 CDD      │ ⚠️ LIBRE          │  │
│  │ 24  │            │              │ (ne pas surcharger│  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ SAM │ 🚚 Distrib│ 🎪 Animation │ 🌐 Site Paul (2h) │  │
│  │ 25  │ 6:00-11:00│ GMS Carrefour│ 18:00-20:00       │  │
│  │     │ (5h)      │ 14:00-18:00  │                   │  │
│  │     │           │ (4h)          │                   │  │
│  ├─────┼───────────────────────────────────────────────┤  │
│  │ DIM │ 🌐 Site   │ 🌐 Site Marie│ 📝 Admin (1h)     │  │
│  │ 26  │ Marie (3h)│ suite (2h)   │ 16:00-17:00       │  │
│  │     │ 10:00-13:00│14:00-16:00  │                   │  │
│  └─────┴───────────────────────────────────────────────┘  │
│                                                             │
│  ⚠️ ALERTE: Semaine prochaine 22h/20h → SURCHARGE!        │
│  Suggestions:                                              │
│  • Reporter "Site Paul" au dimanche                        │
│  • Déléguer animation si possible                          │
│  • Limiter prospection à 30min                             │
│                                                             │
│  [+ Ajouter événement]    [Vue mois]    [Vue liste]       │
└────────────────────────────────────────────────────────────┘
```

**Modal ajout événement**
```
┌────────────────────────────────────────┐
│  Nouvel événement                 [×]  │
├────────────────────────────────────────┤
│                                        │
│  Titre: [_________________________]   │
│                                        │
│  Type: [Projet ▼]                     │
│  • Projet                              │
│  • Appel                               │
│  • Animation                           │
│  • Distribution                        │
│  • CDD (bloqué)                        │
│  • Personnel                           │
│                                        │
│  Lead associé: [Rechercher...     ▼]  │
│                                        │
│  Date: [📅 21/01/2026]                │
│  Heure début: [19:00]                 │
│  Heure fin: [21:00]                   │
│  Durée: 2h (auto-calculé)             │
│                                        │
│  Localisation: [___________________]  │
│                                        │
│  Description:                          │
│  [________________________________]   │
│  [________________________________]   │
│                                        │
│  Récurrent: ☐                         │
│                                        │
│  [Annuler]           [Créer événement]│
└────────────────────────────────────────┘
```

### **Page: Analytics (/admin/analytics)**

```
┌────────────────────────────────────────────────────────────┐
│  📈 Analytics                          [Période: Ce mois ▼] │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 VUE D'ENSEMBLE                                         │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐ │
│  │ Leads    │ CA réalisé│ Pipeline │ Taux conv│ Taux h.  │ │
│  │ totaux   │           │          │ global   │ moyen    │ │
│  ├──────────┼──────────┼──────────┼──────────┼──────────┤ │
│  │    23    │  3.594€   │  5.391€  │   13%    │  58€/h   │ │
│  │  +15% ↗  │  +20% ↗   │  +10% ↗  │  -2% ↘   │  -3% ↘   │ │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘ │
│                                                             │
│  🎯 FUNNEL DE CONVERSION                                   │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                       │ │
│  │  23 Leads ████████████████████████████████ 100%      │ │
│  │     ↓ 65%                                             │ │
│  │  15 Contactés ████████████████████ 65%               │ │
│  │     ↓ 40%                                             │ │
│  │   6 Devis ████████ 26%                               │ │
│  │     ↓ 50%                                             │ │
│  │   3 Gagnés ████ 13%                                  │ │
│  │                                                       │ │
│  │  🎯 Taux global: 13% (objectif: 15%)                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  📈 ÉVOLUTION CA                                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Graph ligne: CA mensuel + prévisions                 │ │
│  │  [Chart Recharts]                                     │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  📍 SOURCES LES PLUS PERFORMANTES                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  1. Bouche-à-oreille    8 leads    25% conv  ████   │ │
│  │  2. LinkedIn           12 leads    15% conv  ██      │ │
│  │  3. Site web            3 leads    10% conv  █       │ │
│  │                                                       │ │
│  │  💡 Focus sur bouche-à-oreille = meilleur ROI        │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ⏱️ TEMPS MOYENS                                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Lead → 1er contact:      4h (objectif: <6h) ✅      │ │
│  │  Contact → Devis:      2 jours (objectif: <3j) ✅    │ │
│  │  Devis → Signature:    5 jours (objectif: <7j) ✅    │ │
│  │  ────────────────────────────────────────────         │ │
│  │  Cycle complet:        7 jours                        │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  💰 PRÉVISIONS                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Pipeline actuel:              5.391€                 │ │
│  │  Probabilité pondérée (50%):   2.696€                │ │
│  │  ──────────────────────────────────────               │ │
│  │  CA prévisionnel mois:         6.290€                │ │
│  │  Objectif mois:                4.250€                │ │
│  │  Statut: ✅ En avance de 48%                         │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  📅 MEILLEURS MOMENTS POUR CONTACTER                       │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Jours: Mar (35%) > Mer (30%) > Lun (20%)            │ │
│  │  Heures: 18h-20h (40%) > 10h-12h (30%)               │ │
│  │                                                       │ │
│  │  💡 Programmer appels mardi/mercredi 18h-20h         │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  🎯 PAR ACTIVITÉ                                           │
│  ┌──────────┬──────────┬──────────┬──────────┐           │
│  │ Digital  │ Animation│Distribution Total    │           │
│  ├──────────┼──────────┼──────────┼──────────┤           │
│  │ 18 leads │  3 leads │  2 leads │ 23 leads │           │
│  │ 3.195€   │  280€    │  119€    │ 3.594€   │           │
│  │ 78% CA   │  8% CA   │  3% CA   │ 100%     │           │
│  └──────────┴──────────┴──────────┴──────────┘           │
│                                                             │
│  [📥 Exporter rapport]  [📧 Envoyer par email]            │
└────────────────────────────────────────────────────────────┘
```

### **Page: Templates Emails (/admin/templates)**

```
┌────────────────────────────────────────────────────────────┐
│  ✉️ Templates d'emails                   [+ Nouveau template]│
├────────────────────────────────────────────────────────────┤
│                                                             │
│  🔍 [Rechercher...]  📁 [Tous ▼]  🏷️ [Catégorie ▼]        │
│                                                             │
│  📧 RÉPONSES RAPIDES (8 templates)                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 1️⃣ Devis site vitrine 599€                            │ │
│  │    Catégorie: Devis | Utilisé: 12 fois                │ │
│  │    [✏️ Modifier] [📤 Utiliser] [👁️ Prévisualiser]     │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 2️⃣ Devis e-commerce 999€                              │ │
│  │    Catégorie: Devis | Utilisé: 5 fois                 │ │
│  │    [✏️ Modifier] [📤 Utiliser] [👁️ Prévisualiser]     │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 3️⃣ Expliquer processus/délais                         │ │
│  │    Catégorie: Info | Utilisé: 8 fois                  │ │
│  │    [✏️ Modifier] [📤 Utiliser] [👁️ Prévisualiser]     │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 4️⃣ Demander infos complémentaires                     │ │
│  │    Catégorie: Qualification | Utilisé: 15 fois        │ │
│  │    [✏️ Modifier] [📤 Utiliser] [👁️ Prévisualiser]     │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ ... (autres templates)                                │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  🔄 SÉQUENCES AUTOMATIQUES (4 emails)                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 📧 Email 1: Bienvenue (J+0)                           │ │
│  │    Envoyé auto à tous les nouveaux leads              │ │
│  │    Taux ouverture: 75% | Taux clic: 40%               │ │
│  │    [✏️ Modifier] [👁️ Prévisualiser] [📊 Stats]        │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 📧 Email 2: Cas client similaire (J+3)                │ │
│  │    Envoyé si pas de réponse à Email 1                 │ │
│  │    Taux ouverture: 60% | Taux clic: 25%               │ │
│  │    [✏️ Modifier] [👁️ Prévisualiser] [📊 Stats]        │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 📧 Email 3: Urgence douce (J+7)                       │ │
│  │    Mention offre lancement limitée                    │ │
│  │    Taux ouverture: 45% | Taux clic: 15%               │ │
│  │    [✏️ Modifier] [👁️ Prévisualiser] [📊 Stats]        │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 📧 Email 4: Dernier contact (J+10)                    │ │
│  │    Email de clôture soft                              │ │
│  │    Taux ouverture: 30% | Taux clic: 10%               │ │
│  │    [✏️ Modifier] [👁️ Prévisualiser] [📊 Stats]        │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**Éditeur de template**
```
┌────────────────────────────────────────────────────────────┐
│  ✏️ Éditer template: Devis site vitrine                [×]  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Nom: [Devis site vitrine 599€___________________]        │
│                                                             │
│  Catégorie: [Devis        ▼]                              │
│                                                             │
│  Objet: [Votre devis site vitrine - {{company}}]          │
│                                                             │
│  Corps du message:                                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Bonjour {{prenom}},                                   │ │
│  │                                                        │ │
│  │ Merci pour votre demande de {{type_projet}}.         │ │
│  │                                                        │ │
│  │ Pour {{nom_entreprise}}, je vous propose :           │ │
│  │ • Site {{type_projet}} professionnel                 │ │
│  │ • Design moderne et responsive                        │ │
│  │ • Livraison en {{delai}} semaines                    │ │
│  │ • Prix : {{prix}}€ (offre lancement)                 │ │
│  │                                                        │ │
│  │ Disponible pour un appel de 15min ?                  │ │
│  │ → [lien_calendly]                                     │ │
│  │                                                        │ │
│  │ Yacine - SolYB                                        │ │
│  │ +590 690 XX XX XX                                     │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  Variables disponibles: (cliquer pour insérer)            │
│  [{{prenom}}] [{{nom}}] [{{email}}] [{{company}}]         │
│  [{{type_projet}}] [{{budget}}] [{{delai}}]               │
│  [{{lien_calendly}}] [{{signature}}]                      │
│                                                             │
│  ☐ Activer tracking ouvertures                            │
│  ☐ Activer tracking clics                                 │
│                                                             │
│  [👁️ Prévisualiser]    [Annuler]    [💾 Sauvegarder]      │
└────────────────────────────────────────────────────────────┘
```

### **Page: Settings (/admin/settings)**

```
┌────────────────────────────────────────────────────────────┐
│  ⚙️ Paramètres                                              │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Onglets: [Général] [Scoring] [Tarifs] [Planning] [Email] │
│                                                             │
│  ─── GÉNÉRAL ───                                           │
│                                                             │
│  Informations entreprise:                                  │
│  Nom: [SolYB - Solutions by Yacine Bouhassoun____]        │
│  Email: [contact@solyb.gp________________________]        │
│  Téléphone: [+590 690 XX XX XX___________________]        │
│  Site web: [https://solyb.gp_____________________]        │
│                                                             │
│  Localisation:                                             │
│  Adresse: [Guadeloupe, Antilles Françaises________]        │
│  Timezone: [America/Guadeloupe (UTC-4)      ▼]            │
│                                                             │
│  ─── SCORING DES LEADS ───                                 │
│                                                             │
│  Poids des critères (total = 100):                         │
│  Budget clair:        [20] points                          │
│  Besoin précis:       [15] points                          │
│  Urgence:             [20] points                          │
│  Fit avec offre:      [15] points                          │
│  Réactivité:          [15] points                          │
│  Source fiable:       [15] points                          │
│                                                             │
│  Seuils d'alerte:                                          │
│  Lead chaud (priorité):  [≥ 70] points                     │
│  Lead tiède (normal):    [50-69] points                    │
│  Lead froid (attente):   [< 50] points                     │
│                                                             │
│  ─── TARIFS ───                                            │
│                                                             │
│  Offre de lancement (30 premiers clients):                 │
│  Site vitrine:       [599] €                               │
│  E-commerce:         [999] €                               │
│  Contenu IA:         [150] €                               │
│  Maintenance:        [29] €/mois                           │
│                                                             │
│  Tarifs normaux (après offre):                             │
│  Site vitrine:       [899] €                               │
│  E-commerce:         [1499] €                              │
│  Contenu IA:         [200] €                               │
│  Maintenance:        [29] €/mois                           │
│                                                             │
│  Business:                                                 │
│  Taux horaire cible: [60] €/h                             │
│                                                             │
│  ─── PLANNING ───                                          │
│                                                             │
│  Capacité hebdomadaire:                                    │
│  Heures disponibles SolYB: [20] h/semaine                  │
│  Seuil alerte surcharge:   [90] %                          │
│                                                             │
│  Horaires travail:                                         │
│  Lun-Ven soirées:    [18:00] - [21:00]                    │
│  Samedi matin:       [06:00] - [11:00] (Distribution)     │
│  Samedi PM:          [14:00] - [18:00] (Animation)        │
│  Dimanche:           [10:00] - [16:00]                    │
│                                                             │
│  Estimation temps par projet:                              │
│  Site vitrine:       [10] heures                           │
│  E-commerce:         [17] heures                           │
│  Contenu IA:         [3] heures                            │
│  Custom:             [20] heures                           │
│                                                             │
│  ─── SÉQUENCES EMAIL ───                                   │
│                                                             │
│  Délais entre emails (en jours):                           │
│  Email 1 (Bienvenue):        J+[0] (immédiat)              │
│  Email 2 (Cas client):       J+[3]                         │
│  Email 3 (Urgence):          J+[7]                         │
│  Email 4 (Dernier contact):  J+[10]                        │
│                                                             │
│  Configuration Brevo:                                      │
│  API Key: [••••••••••••••••••••] [Tester connexion]        │
│                                                             │
│  ☑ Arrêter séquence si lead répond                         │
│  ☑ Arrêter séquence si statut change                       │
│  ☐ Envoyer copie des emails à mon adresse                  │
│                                                             │
│                                                             │
│  [Réinitialiser par défaut]          [💾 Sauvegarder tout] │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 WORKFLOWS & AUTOMATIONS

### **1. Nouveau lead depuis formulaire site**

```javascript
// Webhook endpoint: /api/leads

1. Réception données formulaire
2. Validation (Zod schema)
3. Calcul scoring automatique
4. Détection type projet → Estimation temps/budget
5. Insertion dans Supabase (table leads)
6. Attribution position offre lancement (si applicable)
7. Création note automatique "Lead créé depuis site web"
8. Envoi email confirmation prospect (template "Bienvenue")
9. Notification admin:
   - Email: "🆕 Nouveau lead: [nom]"
   - In-app notification
   - (Optionnel) SMS via Twilio free tier
10. Démarrage séquence email automatique (J+0)
11. Return success + redirect vers page "Merci"
```

### **2. Changement de statut lead**

```javascript
// Trigger: Drag & drop dans Kanban OU bouton "Changer statut"

1. Update statut dans Supabase
2. Création note automatique: "Statut changé: [ancien] → [nouveau]"
3. Update last_contact_date
4. Si statut = "gagné":
   - Update compteur offre lancement
   - Calcul CA réalisé
   - Envoi email félicitations client
   - Création événement planning "Livraison projet"
   - Stop séquence email auto
   - Notification "🎉 Deal gagné!"
5. Si statut = "perdu":
   - Stop séquence email
   - Note automatique: "Raison perte: [à remplir]"
   - Ajout à liste nurturing long terme (1 email/mois)
6. Si statut = "devis":
   - Génération PDF devis automatique
   - Envoi email avec devis attaché
   - Création reminder "Relance devis" (J+5)
7. Refresh UI temps réel (Supabase Realtime)
```

### **3. Séquence email automatique**

```javascript
// Cron job quotidien: /api/cron/email-sequences (Vercel Cron)

1. Query leads avec:
   - email_sequence_active = true
   - Calculer jours depuis last_contact ou created_at
2. Pour chaque lead:
   - Vérifier si email_sequence_step < 4
   - Vérifier si délai atteint (J+0, J+3, J+7, J+10)
   - Vérifier si lead n'a pas répondu
   - Vérifier si statut toujours dans ["nouveau", "contact"]
3. Si conditions OK:
   - Récupérer template email correspondant
   - Remplacer variables dynamiques
   - Envoyer via Brevo API
   - Logger dans email_logs
   - Incrémenter email_sequence_step
   - Update email_sequence_last_sent
4. Si lead répond (webhook Brevo):
   - Marquer email_sequence_active = false
   - Notification "💬 [Nom] a répondu!"
   - Bump priority lead
5. Si email step 4 terminé sans réponse:
   - email_sequence_active = false
   - Note auto: "Séquence terminée sans réponse"
   - Tag "Cold lead"
```

### **4. Calcul score automatique**

```javascript
// Trigger: Création/Update lead

Fonction calculate_lead_score():

1. Récupérer poids depuis settings table
2. Calculer score_budget (0-20):
   - Budget = prix offre exact: 20pts
   - Budget dans fourchette ±20%: 15pts
   - Budget approximatif: 10pts
   - Pas de budget: 0pts
3. Calculer score_clarity (0-15):
   - Description >100 chars + détails précis: 15pts
   - Description moyenne 50-100 chars: 10pts
   - Description vague <50 chars: 5pts
4. Calculer score_urgency (0-20):
   - Urgent (< 2 semaines): 20pts
   - Normal (1 mois): 15pts
   - Flexible (> 1 mois): 10pts
   - Pas précisé: 5pts
5. Calculer score_fit (0-15):
   - Type projet = offre standard: 15pts
   - Type projet custom mais faisable: 10pts
   - Hors scope: 0pts
6. Calculer score_responsiveness (0-15):
   - Réponse <4h: 15pts
   - Réponse <24h: 10pts
   - Réponse <48h: 5pts
   - Pas de réponse: 0pts
7. Calculer score_source (0-15):
   - Bouche-à-oreille/Referral: 15pts
   - LinkedIn: 10pts
   - Site web: 8pts
   - Autre: 5pts
8. Total = somme des 6 scores
9. Update lead.score_total
10. Si score ≥ 70: Notification "🔥 Lead chaud!"
```

### **5. Alertes & Notifications**

```javascript
// Cron job quotidien: /api/cron/alerts

Vérifications:

1. Leads sans contact > 3 jours:
   - Query: created_at < NOW() - INTERVAL '3 days' AND first_contact_date IS NULL
   - Notification: "⚠️ [X] leads sans contact depuis 3j"
   
2. Devis sans réponse > 5 jours:
   - Query: status = 'devis' AND updated_at < NOW() - INTERVAL '5 days'
   - Notification: "📄 Relancer devis: [noms]"
   
3. Livraisons dans 2 jours:
   - Query planning_events: event_type = 'livraison' AND start_time < NOW() + INTERVAL '2 days'
   - Notification: "🎯 Livraison [client] dans 2j"
   
4. Surcharge semaine prochaine:
   - Calculer charge semaine N+1
   - Si > seuil alerte (90%):
   - Notification: "⚠️ Surcharge prévue semaine prochaine"
   
5. Seuil offre lancement (25/30):
   - Query launch_offer_tracking
   - Si slots_filled ≥ 25:
   - Notification: "🎯 Plus que 5 places offre lancement!"
   - Action suggérée: Préparer transition tarifs
   
6. Email séquence bloquée:
   - Query: email bounced/failed
   - Notification: "📧 Email bounced pour [nom]"
```

### **6. Export vers progiciel**

```javascript
// Action manuelle: Bouton "Exporter vers ERP"

1. Sélectionner lead(s) à exporter
2. Vérifier exported_to_erp = false
3. Formatter données selon mapping:
   {
     client_nom: lead.name,
     client_email: lead.email,
     client_tel: lead.phone,
     client_entreprise: lead.company,
     projet_type: lead.project_type,
     projet_description: lead.description,
     projet_budget: lead.budget,
     statut_lead: lead.status,
     date_creation: lead.created_at,
     date_dernier_contact: lead.last_contact_date,
     score: lead.score_total,
     source: lead.source,
     tags: lead.tags,
     notes: [récupérer depuis table notes],
     // Champs custom selon ton progiciel
   }
4. Générer CSV ou JSON
5. Download fichier
6. Marquer leads:
   - exported_to_erp = true
   - exported_at = NOW()
7. Note automatique: "Exporté vers progiciel"
8. Toast success: "✅ [X] leads exportés"
```

### **7. Génération devis PDF**

```javascript
// Action: Bouton "Générer devis PDF"

1. Récupérer données lead
2. Récupérer settings (tarifs, infos entreprise)
3. Template PDF avec jsPDF:
   - En-tête: Logo SolYB + infos contact
   - Infos client: Nom, entreprise, email, tel
   - Détails projet:
     * Type de projet
     * Description
     * Features incluses (checklist)
     * Délai livraison
   - Tarification:
     * Prix (mention "Offre lancement" si applicable)
     * Conditions de paiement (50% acompte, 50% livraison)
     * Validité devis (15 jours)
   - Conditions générales
   - Signature électronique (optionnel)
   - Pied de page: SIRET, TVA, etc.
4. Générer PDF
5. Upload vers Supabase Storage
6. Créer entrée dans table files
7. Attacher à email ou download direct
8. Note automatique: "Devis généré et envoyé"
```

---

## 📱 VERSION MOBILE (PWA)

### **Spécifications PWA**

```json
// manifest.json
{
  "name": "SolYB CRM",
  "short_name": "SolYB",
  "description": "CRM pour gérer leads et projets SolYB",
  "start_url": "/admin",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Features mobile essentielles:**
- ✅ Navigation bottom bar (iOS-like)
- ✅ Swipe actions sur lead cards (swipe left: call, swipe right: email)
- ✅ Pull-to-refresh
- ✅ Offline mode (consultation)
- ✅ Push notifications (via Service Worker)
- ✅ Dictée vocale pour notes
- ✅ Scan QR codes (vCard)
- ✅ Quick actions depuis home screen

**Vue mobile simplifiée:**
```
┌─────────────────┐
│  ☰  SolYB  🔔5  │
├─────────────────┤
│                 │
│  📊 Aujourd'hui │
│  ┌───────────┐  │
│  │ 12 leads  │  │
│  │ 2 rappels │  │
│  │ 1 livraison│  │
│  └───────────┘  │
│                 │
│  🔥 Priorités   │
│  ┌───────────┐  │
│  │ Paul      │  │
│  │ 🔥 90/100 │  │
│  │ [Call]    │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │ Marie     │  │
│  │ 🔥 85/100 │  │
│  │ [Email]   │  │
│  └───────────┘  │
│                 │
│  [+ Actions]    │
├─────────────────┤
│ 📊💬📅✉️⚙️      │ ← Bottom nav
└─────────────────┘
```

---

## 🎯 LIVRABLES ATTENDUS

### **1. Documentation complète**

**README.md:**
```markdown
# SolYB CRM - Guide complet

## 🚀 Démarrage rapide
1. Prérequis
2. Installation
3. Configuration Supabase
4. Configuration Brevo
5. Déploiement Vercel
6. Premier lancement

## 📁 Structure du projet
[Arborescence détaillée]

## ⚙️ Configuration
- Variables d'environnement
- Paramètres Supabase
- Webhooks

## 🔧 Fonctionnalités
[Liste complète avec captures]

## 🐛 Troubleshooting
[FAQ et solutions]

## 📈 Roadmap
[Évolutions futures]
```

**DEPLOYMENT.md:**
- Guide déploiement Vercel step-by-step
- Configuration DNS
- Variables d'environnement
- Webhooks configuration
- Monitoring & logs

**API.md:**
- Documentation des API routes
- Webhooks disponibles
- Rate limits
- Exemples d'utilisation

### **2. Fichiers de configuration**

```
.env.example
.env.local (template)
next.config.js
tailwind.config.js
tsconfig.json
vercel.json (cron jobs)
```

### **3. Scripts SQL**

```
supabase/migrations/
├── 001_initial_schema.sql (complet ci-dessus)
├── 002_seed_data.sql (données test)
└── 003_functions.sql (fonctions utiles)
```

### **4. Assets**

```
public/
├── logo.svg (à fournir ou générer)
├── favicon.ico
├── icon-192.png (PWA)
├── icon-512.png (PWA)
└── og-image.jpg (Open Graph)
```

---

## ✅ CHECKLIST COMPLÉTUDE

### **Site vitrine** (màj 2026-05-30)
- [x] Homepage avec toutes sections (Hero, Services, Process, About, Pricing, FacturationElectronique, Testimonials, FAQ, Contact)
- [x] Navigation responsive
- [x] Formulaire contact fonctionnel (multi-step, Zod, Supabase + Brevo)
- [x] Compteur offre lancement (LaunchOfferCounter)
- [x] SEO optimisé (3 schemas JSON-LD, meta tags, keywords locaux Guadeloupe)
- [ ] Analytics (Google Analytics 4) — à connecter
- [ ] Performances Lighthouse >90 — à mesurer en prod
- [x] Design dark Caribbean theme (coral/solar/turquoise)
- [x] Constellations animées (canvas)
- [x] SplashScreen intro
- [x] Animations reveal scroll
- [x] TiltCard 3D sur cartes Services
- [x] Section FacturationElectronique 2026 (niche SEO)

### **Dashboard Admin**
- [ ] Pipeline Kanban drag & drop
- [ ] Fiche lead complète
- [ ] Scoring automatique
- [ ] Estimateur rentabilité
- [ ] Planning avec gestion charge
- [ ] Analytics complets
- [ ] Templates emails
- [ ] Générateur devis PDF
- [ ] Export CSV/JSON
- [ ] Système notifications
- [ ] Settings configurables

### **Automations**
- [ ] Formulaire → Lead → Email auto
- [ ] Séquences email (4 étapes)
- [ ] Alertes & reminders
- [ ] Calcul scores automatique
- [ ] Update compteur offre lancement
- [ ] Webhooks Brevo (tracking)

### **Mobile/PWA**
- [ ] Responsive mobile-first
- [ ] PWA installable
- [ ] Offline mode
- [ ] Push notifications
- [ ] Bottom navigation

### **Documentation**
- [ ] README complet
- [ ] Guide déploiement
- [ ] Documentation API
- [ ] Seed data pour tests

---

## 🎨 DESIGN TOKENS — RÉELS (màj 2026-05-30)

```javascript
// tailwind.config.ts — palette Caribbean dark en production

colors: {
  coral:     { DEFAULT: '#FF6B47' },   // CTA, accents principaux
  solar:     { DEFAULT: '#F5A623' },   // Facturation, urgence
  turquoise: { DEFAULT: '#00D4AA' },   // Tech, checkmarks
  violet:    { DEFAULT: '#8B5CF6' },   // 4e accent
  // primary (bleu) réservé à l'admin CRM uniquement
}

fontFamily: {
  display: ['var(--font-syne)', 'sans-serif'],   // titres, labels
  sans:    ['var(--font-jakarta)', 'sans-serif'], // body
}

// Classes utilitaires clés (globals.css) :
// .reveal            — scroll reveal (translateY 22px → 0, 1.1s)
// .tilt-card         — carte 3D avec rotation JS ±8°
// .card-elevation    — hover lift CSS (-3px)
// .card-shadow       — shadow sans lift
// .btn-studio        — bouton avec fill animation clip-path
// .ticker-track      — défilement horizontal 30s
// .skill-reveal      — stagger tags About
```

**Composants UI spécifiques au site public :**
```
src/components/ui/
├── ConstellationsCanvas.tsx  — particules canvas fixed z:5, toujours actif
├── SplashScreen.tsx          — intro logo SVG, sessionStorage
├── AnimatedText.tsx
└── TypewriterWord.tsx        — mot rotatif dans le H1 Hero

src/components/site/
├── Hero.tsx                  — SplitLine chars + TypewriterWord
├── Services.tsx              — TiltCard ±8° avec accentRgb par carte
├── Process.tsx               — cascade blur-to-sharp IntersectionObserver
├── About.tsx                 — bio Yacine, watermark YACINE, skill tags
├── Pricing.tsx               — 3 plans + 3 info cards
├── FacturationElectronique.tsx — section dédiée 2026
├── Testimonials.tsx
├── Realisations.tsx
├── FAQ.tsx
├── Contact.tsx               — formulaire multi-step
├── Ticker.tsx                — bandeau défilant
├── Navigation.tsx
├── Footer.tsx
└── ... (UrgencyBanner, WhatsAppButton, CrispChat, etc.)
```

---

## 🔐 SÉCURITÉ

**Checklist sécurité:**
- [ ] Variables env jamais commités
- [ ] RLS Supabase activé
- [ ] Validation inputs (Zod)
- [ ] Rate limiting API routes
- [ ] CORS configuré
- [ ] Headers sécurité (CSP, HSTS)
- [ ] Sanitization user inputs
- [ ] Auth Supabase pour admin
- [ ] HTTPS only

---

## 🎓 CONTRAINTES TECHNIQUES RAPPELS

1. **100% gratuit** - Aucun service payant
2. **Supabase free tier** - 500MB, 50k requêtes/mois
3. **Vercel free tier** - Déploiements illimités
4. **Brevo free** - 300 emails/jour
5. **Performance** - Lighthouse >90
6. **Mobile-first** - Responsive obligatoire
7. **PWA** - Installable, offline-ready
8. **TypeScript** - Typage strict
9. **Commentaires** - Code commenté en français
10. **Tests** - Tests unitaires critiques (optionnel mais recommandé)

---

## 📊 MÉTRIQUES DE SUCCÈS

**Performance:**
- Lighthouse: >90 (tous scores)
- First Contentful Paint: <1s
- Time to Interactive: <2s

**UX:**
- Formulaire → Lead créé: <500ms
- Changement statut: <200ms
- Chargement dashboard: <1s

**Business:**
- Taux conversion formulaire: >50%
- Taux ouverture emails: >60%
- Time-to-first-contact: <6h

---

## 🚀 PROCHAINES ÉTAPES APRÈS LIVRAISON

**Phase 1 - Immédiat:**
1. Personnalisation contenu (textes, images)
2. Configuration Brevo API
3. Configuration domaine
4. Tests utilisateur

**Phase 2 - Semaine 1:**
1. Ajout premiers leads manuellement
2. Test séquences emails
3. Ajustements scoring
4. Création templates personnalisés

**Phase 3 - Semaine 2:**
1. Publication site vitrine
2. Premiers vrais leads
3. Optimisations basées sur usage réel
4. Formation continue

---

## ❓ QUESTIONS OUVERTES — RÉPONSES (màj 2026-05-30)

1. **Logo:** ✅ Logo SVG `/logo/SYB_orange.svg` — utilisé dans SplashScreen et Navigation
2. **Photos:** En attente — section Réalisations à alimenter
3. **Calendly:** Non utilisé pour l'instant — formulaire de contact direct
4. **Progiciel:** Export CSV depuis admin CRM
5. **Auth:** ✅ Login Supabase Auth — admin protégé par middleware Next.js
6. **Domaine:** ✅ `solyb.fr` — déployé sur Vercel
7. **Branding:** ✅ Palette remplacée — dark Caribbean (coral #FF6B47, solar #F5A623, turquoise #00D4AA) — **la palette bleue est abandonnée pour le site public, conservée seulement pour l'admin CRM**

## 📌 DÉCISIONS DE DESIGN FIGÉES (ne pas revenir dessus)

- Pas de numéros de section en watermark (01/03/05 supprimés)
- Pas d'annotation latérale "GUADELOUPE · 971 · 2026" dans le hero
- Pas de forme géométrique SVG en fond du hero
- Pas de citation personnelle signée dans About
- TiltCard = ±8° max (pas plus, trop exagéré)
- Ticker = toujours animé, sans guard prefers-reduced-motion
- Constellations = toujours actives, sans guard prefers-reduced-motion

---

## 💬 CONCLUSION DU PROMPT

**Ce prompt est conçu pour générer un système CRM complet et production-ready pour SolYB incluant:**

✅ Site vitrine moderne et optimisé SEO  
✅ Dashboard admin avec toutes fonctionnalités identifiées  
✅ Base de données Supabase complète avec triggers  
✅ Automations emails et workflows  
✅ Version mobile PWA  
✅ Documentation exhaustive  
✅ 100% gratuit (Supabase + Vercel + Brevo free tiers)  

**Livrables:**
- Code source complet (React/Next.js + Tailwind + Supabase)
- Documentation (README, DEPLOYMENT, API)
- Scripts SQL (migrations + seed)
- Assets (logos, icons)
- Configuration déploiement Vercel

**Timeline estimée:** 2-3 semaines de développement

**Ce système est conçu spécifiquement pour:**
- Entrepreneur solo avec 15-20h/semaine
- 3 activités parallèles (Digital/Animation/Distribution)
- Offre de lancement (30 premiers clients)
- Travail mobile (soirées/weekends)
- Optimisation temps & rentabilité

---

**🎯 CE PROMPT EST PRÊT À ÊTRE EXÉCUTÉ !**

**Tu veux que je commence le développement maintenant ?** 🚀