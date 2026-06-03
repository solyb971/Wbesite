/**
 * Types spécifiques aux leads et au pipeline
 */

import { Lead, LeadStatus, ProjectType, Urgency, LeadSource, ActivityType } from './database.types'

// ============================================
// LEAD ENRICHI (avec données calculées)
// ============================================

export interface LeadWithRelations extends Lead {
  notes_count?: number
  files_count?: number
  last_note?: string
  last_activity?: string
  estimated_revenue?: number
  priority_score?: 'high' | 'medium' | 'low'
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  project_type: ProjectType
  budget: string
  description: string
  urgency: Urgency
  source?: LeadSource
  source_details?: string
}

// ============================================
// CRÉATION DE LEAD
// ============================================

export interface CreateLeadData {
  // Informations de base
  name: string
  email: string
  phone?: string
  company?: string

  // Projet
  project_type: ProjectType
  budget?: number
  description?: string
  urgency?: Urgency

  // Contexte
  source?: LeadSource
  source_details?: string
  activity_type?: ActivityType

  // Tags
  tags?: string[]

  // Offre de lancement
  is_launch_offer?: boolean
}

// ============================================
// MISE À JOUR DE LEAD
// ============================================

export interface UpdateLeadData {
  name?: string
  email?: string
  phone?: string
  company?: string

  project_type?: ProjectType
  budget?: number
  description?: string
  urgency?: Urgency

  status?: LeadStatus
  activity_type?: ActivityType

  source?: LeadSource
  source_details?: string

  tags?: string[]

  first_contact_date?: string
  last_contact_date?: string

  email_sequence_active?: boolean
  email_sequence_step?: number
}

// ============================================
// SCORING
// ============================================

export interface LeadScoreBreakdown {
  budget: number
  clarity: number
  urgency: number
  fit: number
  responsiveness: number
  source: number
  total: number
}

export interface LeadScoreWeights {
  budget: number
  clarity: number
  urgency: number
  fit: number
  responsiveness: number
  source: number
}

// ============================================
// FILTRES
// ============================================

export interface LeadFilters {
  status?: LeadStatus | LeadStatus[]
  activity_type?: ActivityType
  project_type?: ProjectType
  urgency?: Urgency

  score_min?: number
  score_max?: number

  budget_min?: number
  budget_max?: number

  source?: LeadSource

  is_launch_offer?: boolean

  tags?: string[]

  created_after?: string
  created_before?: string

  search?: string
}

// ============================================
// TRI
// ============================================

export type LeadSortField =
  | 'created_at'
  | 'updated_at'
  | 'score_total'
  | 'budget'
  | 'name'
  | 'company'
  | 'last_contact_date'

export type SortDirection = 'asc' | 'desc'

export interface LeadSort {
  field: LeadSortField
  direction: SortDirection
}

// ============================================
// PIPELINE & KANBAN
// ============================================

export interface PipelineColumn {
  id: LeadStatus
  title: string
  icon?: string
  color: string
  leads: Lead[]
  count: number
  total_budget: number
}

export interface PipelineStats {
  total: number
  nouveau: number
  contact: number
  devis: number
  gagne: number
  perdu: number

  conversion_rate: number
  avg_score: number
  total_revenue: number
  pipeline_value: number
}

// ============================================
// ACTIVITÉ & TIMELINE
// ============================================

export type TimelineActivityType =
  | 'lead_created'
  | 'status_changed'
  | 'note_added'
  | 'email_sent'
  | 'email_opened'
  | 'email_clicked'
  | 'file_uploaded'
  | 'call_made'
  | 'meeting_scheduled'
  | 'quote_sent'
  | 'deal_won'
  | 'deal_lost'

export interface Activity {
  id: string
  type: TimelineActivityType
  title: string
  description?: string
  timestamp: string
  metadata?: Record<string, any>
}

// ============================================
// RENTABILITÉ
// ============================================

export interface ProfitabilityEstimate {
  budget: number
  estimated_hours: number
  hourly_rate: number

  costs: {
    labor: number
    overhead: number
    total: number
  }

  profit: {
    gross: number
    net: number
    margin_percent: number
  }

  is_profitable: boolean
  recommendation: string
}

// ============================================
// ACTIONS RAPIDES
// ============================================

export type QuickAction =
  | 'send_email'
  | 'make_call'
  | 'schedule_meeting'
  | 'generate_quote'
  | 'send_quote'
  | 'export_to_erp'
  | 'mark_won'
  | 'mark_lost'
  | 'add_note'
  | 'add_task'
  | 'upload_file'

export interface QuickActionButton {
  action: QuickAction
  label: string
  icon: string
  color: string
  handler: () => void | Promise<void>
}
