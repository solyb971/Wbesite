/**
 * Types générés depuis le schéma Supabase
 * Correspond à la structure définie dans supabase/migrations/001_initial_schema.sql
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead
        Insert: LeadInsert
        Update: LeadUpdate
      }
      notes: {
        Row: Note
        Insert: NoteInsert
        Update: NoteUpdate
      }
      files: {
        Row: File
        Insert: FileInsert
        Update: FileUpdate
      }
      email_templates: {
        Row: EmailTemplate
        Insert: EmailTemplateInsert
        Update: EmailTemplateUpdate
      }
      email_logs: {
        Row: EmailLog
        Insert: EmailLogInsert
        Update: EmailLogUpdate
      }
      planning_events: {
        Row: PlanningEvent
        Insert: PlanningEventInsert
        Update: PlanningEventUpdate
      }
      launch_offer_tracking: {
        Row: LaunchOfferTracking
        Insert: LaunchOfferTrackingInsert
        Update: LaunchOfferTrackingUpdate
      }
      analytics_snapshots: {
        Row: AnalyticsSnapshot
        Insert: AnalyticsSnapshotInsert
        Update: AnalyticsSnapshotUpdate
      }
      settings: {
        Row: Setting
        Insert: SettingInsert
        Update: SettingUpdate
      }
    }
    Views: {
      v_realtime_stats: {
        Row: RealtimeStats
      }
      v_pipeline_by_activity: {
        Row: PipelineByActivity
      }
      v_conversion_rates: {
        Row: ConversionRates
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// ============================================
// TABLE: leads
// ============================================

export type LeadStatus = 'nouveau' | 'contact' | 'devis' | 'gagne' | 'perdu'
export type ProjectType = 'vitrine' | 'ecommerce' | 'content' | 'custom'
export type Urgency = 'low' | 'normal' | 'high' | 'urgent'
export type ActivityType = 'digital' | 'animation' | 'distribution'
export type LeadSource = 'linkedin' | 'site-web' | 'bouche-a-oreille' | 'referral' | 'autre'

export interface Lead {
  id: string
  created_at: string
  updated_at: string

  // Informations contact
  name: string
  email: string
  phone: string | null
  company: string | null

  // Projet
  project_type: ProjectType
  budget: number | null
  description: string | null
  urgency: Urgency

  // Statut & Workflow
  status: LeadStatus
  activity_type: ActivityType

  // Scoring automatique
  score_total: number
  score_budget: number
  score_clarity: number
  score_urgency: number
  score_fit: number
  score_responsiveness: number
  score_source: number

  // Tracking
  source: LeadSource | null
  source_details: string | null
  first_contact_date: string | null
  last_contact_date: string | null

  // Offre lancement
  is_launch_offer: boolean
  launch_offer_position: number | null

  // Estimation projet
  estimated_hours: number | null
  estimated_rate: number | null
  estimated_profit: number | null

  // Séquences email
  email_sequence_active: boolean
  email_sequence_step: number
  email_sequence_last_sent: string | null
  email_opens: number
  email_clicks: number

  // Tags
  tags: string[] | null

  // Export
  exported_to_erp: boolean
  exported_at: string | null
  erp_id: string | null

  // Metadata
  metadata: Json
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'score_total' | 'estimated_hours' | 'estimated_rate' | 'estimated_profit'>
export type LeadUpdate = Partial<LeadInsert>

// ============================================
// TABLE: notes
// ============================================

export type NoteType = 'note' | 'call' | 'email' | 'meeting' | 'task'

export interface Note {
  id: string
  lead_id: string
  created_at: string
  updated_at: string

  content: string
  type: NoteType

  // Pour les tâches
  is_task: boolean
  task_completed: boolean
  task_due_date: string | null

  metadata: Json
}

export type NoteInsert = Omit<Note, 'id' | 'created_at' | 'updated_at'>
export type NoteUpdate = Partial<NoteInsert>

// ============================================
// TABLE: files
// ============================================

export type FileCategory = 'devis' | 'contrat' | 'maquette' | 'autre' | 'general'

export interface File {
  id: string
  lead_id: string
  created_at: string

  filename: string
  file_url: string
  file_type: string | null
  file_size: number | null

  category: FileCategory

  metadata: Json
}

export type FileInsert = Omit<File, 'id' | 'created_at'>
export type FileUpdate = Partial<FileInsert>

// ============================================
// TABLE: email_templates
// ============================================

export type EmailTemplateCategory = 'sequence' | 'quick-reply' | 'custom'

export interface EmailTemplate {
  id: string
  created_at: string
  updated_at: string

  name: string
  subject: string
  body: string

  category: EmailTemplateCategory | null
  sequence_step: number | null

  variables: string[] | null

  is_active: boolean
  usage_count: number

  metadata: Json
}

export type EmailTemplateInsert = Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>
export type EmailTemplateUpdate = Partial<EmailTemplateInsert>

// ============================================
// TABLE: email_logs
// ============================================

export type EmailStatus = 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed'

export interface EmailLog {
  id: string
  created_at: string

  lead_id: string | null
  template_id: string | null

  to_email: string
  subject: string | null
  body: string | null

  status: EmailStatus

  brevo_message_id: string | null

  opened_at: string | null
  clicked_at: string | null

  metadata: Json
}

export type EmailLogInsert = Omit<EmailLog, 'id' | 'created_at'>
export type EmailLogUpdate = Partial<EmailLogInsert>

// ============================================
// TABLE: planning_events
// ============================================

export type EventType = 'projet' | 'appel' | 'animation' | 'distribution' | 'cdd' | 'blocked'
export type EventStatus = 'planned' | 'in-progress' | 'completed' | 'cancelled'

export interface PlanningEvent {
  id: string
  created_at: string
  updated_at: string

  title: string
  description: string | null

  start_time: string
  end_time: string

  event_type: EventType
  activity_type: ActivityType | null

  lead_id: string | null

  status: EventStatus

  estimated_hours: number | null
  actual_hours: number | null

  location: string | null

  metadata: Json
}

export type PlanningEventInsert = Omit<PlanningEvent, 'id' | 'created_at' | 'updated_at'>
export type PlanningEventUpdate = Partial<PlanningEventInsert>

// ============================================
// TABLE: launch_offer_tracking
// ============================================

export interface LaunchOfferTracking {
  id: string
  created_at: string

  total_slots: number
  slots_filled: number
  slots_remaining: number

  total_revenue: number
  conversion_rate: number

  projected_completion_date: string | null

  is_active: boolean
  completed_at: string | null

  metadata: Json
}

export type LaunchOfferTrackingInsert = Omit<LaunchOfferTracking, 'id' | 'created_at'>
export type LaunchOfferTrackingUpdate = Partial<LaunchOfferTrackingInsert>

// ============================================
// TABLE: analytics_snapshots
// ============================================

export interface AnalyticsSnapshot {
  id: string
  snapshot_date: string
  created_at: string

  // Leads
  total_leads: number
  leads_nouveau: number
  leads_contact: number
  leads_devis: number
  leads_gagne: number
  leads_perdu: number

  // Conversions
  conversion_rate_contact: number | null
  conversion_rate_devis: number | null
  conversion_rate_gagne: number | null
  conversion_rate_global: number | null

  // CA
  revenue_month: number
  revenue_projected: number

  // Temps
  avg_time_to_contact: number | null
  avg_time_to_quote: number | null
  avg_time_to_close: number | null

  // Par activité
  digital_leads: number
  digital_revenue: number
  animation_leads: number
  animation_revenue: number
  distribution_leads: number
  distribution_revenue: number

  metadata: Json
}

export type AnalyticsSnapshotInsert = Omit<AnalyticsSnapshot, 'id' | 'created_at'>
export type AnalyticsSnapshotUpdate = Partial<AnalyticsSnapshotInsert>

// ============================================
// TABLE: settings
// ============================================

export interface Setting {
  id: string
  created_at: string
  updated_at: string

  key: string
  value: Json

  category: string | null
  description: string | null
}

export type SettingInsert = Omit<Setting, 'id' | 'created_at' | 'updated_at'>
export type SettingUpdate = Partial<SettingInsert>

// ============================================
// VIEWS
// ============================================

export interface RealtimeStats {
  leads_nouveau: number
  leads_contact: number
  leads_devis: number
  leads_gagne: number
  leads_perdu: number
  revenue_realise: number
  revenue_pipeline: number
  avg_score: number
  leads_this_week: number
  deals_this_month: number
}

export interface PipelineByActivity {
  activity_type: ActivityType
  status: LeadStatus
  count: number
  total_budget: number
  avg_score: number
}

export interface ConversionRates {
  rate_contact: number
  rate_devis: number
  rate_gagne: number
  rate_global: number
}
