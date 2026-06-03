/**
 * Types pour les analytics et le reporting
 */

import { LeadStatus, ActivityType, ProjectType, LeadSource } from './database.types'

// ============================================
// MÉTRIQUES PRINCIPALES
// ============================================

export interface DashboardMetrics {
  // Leads
  total_leads: number
  new_leads_this_week: number
  new_leads_this_month: number

  // Statuts
  leads_by_status: {
    nouveau: number
    contact: number
    devis: number
    gagne: number
    perdu: number
  }

  // Revenus
  revenue: {
    realized: number
    pipeline: number
    this_month: number
    this_week: number
    projected: number
  }

  // Conversion
  conversion_rates: {
    lead_to_contact: number
    contact_to_quote: number
    quote_to_won: number
    global: number
  }

  // Score moyen
  average_score: number

  // Offre de lancement
  launch_offer: {
    total_slots: number
    filled: number
    remaining: number
    revenue: number
    completion_percent: number
  }
}

// ============================================
// FUNNEL DE CONVERSION
// ============================================

export interface ConversionFunnelStage {
  stage: LeadStatus
  label: string
  count: number
  percentage: number
  conversion_rate?: number
  avg_time_in_stage?: number
}

export interface ConversionFunnel {
  stages: ConversionFunnelStage[]
  total_leads: number
  global_conversion_rate: number
  avg_cycle_time: number
}

// ============================================
// ANALYSE PAR SOURCE
// ============================================

export interface SourcePerformance {
  source: LeadSource
  label: string

  metrics: {
    total_leads: number
    won_deals: number
    conversion_rate: number
    avg_deal_size: number
    total_revenue: number
  }

  trend: {
    direction: 'up' | 'down' | 'stable'
    change_percent: number
  }

  quality_score: number
}

export interface SourcesAnalysis {
  by_source: SourcePerformance[]
  best_source: LeadSource
  worst_source: LeadSource
  recommendation: string
}

// ============================================
// ANALYSE PAR ACTIVITÉ
// ============================================

export interface ActivityPerformance {
  activity_type: ActivityType
  label: string

  leads: {
    total: number
    nouveau: number
    contact: number
    devis: number
    gagne: number
    perdu: number
  }

  revenue: {
    realized: number
    pipeline: number
    avg_deal_size: number
  }

  time: {
    total_hours: number
    avg_hours_per_lead: number
    avg_hourly_rate: number
  }

  profitability: {
    is_profitable: boolean
    profit_margin: number
    roi: number
  }
}

export interface ActivityAnalysis {
  by_activity: ActivityPerformance[]
  most_profitable: ActivityType
  recommendations: string[]
}

// ============================================
// ANALYSE PAR TYPE DE PROJET
// ============================================

export interface ProjectTypePerformance {
  project_type: ProjectType
  label: string

  metrics: {
    total_leads: number
    won_deals: number
    conversion_rate: number
    avg_deal_size: number
    total_revenue: number
  }

  time: {
    avg_hours: number
    avg_rate: number
  }

  demand: {
    trend: 'increasing' | 'decreasing' | 'stable'
    growth_rate: number
  }
}

// ============================================
// ÉVOLUTION TEMPORELLE
// ============================================

export interface TimeSeriesDataPoint {
  date: string
  value: number
  label?: string
}

export interface RevenueTrend {
  period: 'daily' | 'weekly' | 'monthly'
  data: TimeSeriesDataPoint[]

  total: number
  average: number
  trend: 'up' | 'down' | 'stable'
  growth_rate: number

  projection: {
    next_period: number
    confidence: number
  }
}

export interface LeadsTrend {
  period: 'daily' | 'weekly' | 'monthly'
  data: TimeSeriesDataPoint[]

  total: number
  average: number
  trend: 'up' | 'down' | 'stable'
  growth_rate: number
}

// ============================================
// TEMPS & VÉLOCITÉ
// ============================================

export interface TimeMetrics {
  avg_time_to_first_contact: number // heures
  avg_time_to_quote: number // jours
  avg_time_to_close: number // jours
  avg_cycle_time: number // jours

  targets: {
    first_contact: number
    quote: number
    close: number
  }

  performance: {
    first_contact: 'good' | 'warning' | 'poor'
    quote: 'good' | 'warning' | 'poor'
    close: 'good' | 'warning' | 'poor'
  }
}

export interface Velocity {
  leads_per_week: number
  deals_per_week: number
  revenue_per_week: number

  trend_vs_last_period: {
    leads: number
    deals: number
    revenue: number
  }
}

// ============================================
// MEILLEURS MOMENTS
// ============================================

export interface BestTimes {
  by_day: {
    day: string
    success_rate: number
    total_contacts: number
  }[]

  by_hour: {
    hour: number
    success_rate: number
    total_contacts: number
  }[]

  recommendations: string[]
}

// ============================================
// PRÉVISIONS
// ============================================

export interface Forecast {
  period: 'week' | 'month' | 'quarter' | 'year'

  revenue: {
    current: number
    projected: number
    confidence: number
    min: number
    max: number
  }

  leads: {
    expected: number
    needed_for_target: number
  }

  deals: {
    expected: number
    needed_for_target: number
  }

  on_track: boolean
  gap_to_target: number
  recommendations: string[]
}

// ============================================
// OBJECTIFS & TARGETS
// ============================================

export interface Target {
  name: string
  period: 'week' | 'month' | 'quarter' | 'year'

  metric: 'revenue' | 'leads' | 'deals' | 'conversion_rate'
  target_value: number
  current_value: number

  progress_percent: number
  on_track: boolean

  deadline: string
  days_remaining: number
}

export interface TargetsDashboard {
  targets: Target[]
  overall_progress: number
  at_risk_count: number
  achieved_count: number
}

// ============================================
// RAPPORTS
// ============================================

export interface ReportPeriod {
  start_date: string
  end_date: string
  label: string
}

export interface PerformanceReport {
  period: ReportPeriod

  summary: {
    total_leads: number
    total_deals: number
    total_revenue: number
    conversion_rate: number
    avg_deal_size: number
  }

  trends: {
    leads: LeadsTrend
    revenue: RevenueTrend
  }

  sources: SourcesAnalysis
  activities: ActivityAnalysis

  time_metrics: TimeMetrics
  velocity: Velocity

  highlights: string[]
  areas_of_concern: string[]
  recommendations: string[]
}

// ============================================
// EXPORT
// ============================================

export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf' | 'excel'
  include: {
    leads?: boolean
    notes?: boolean
    files?: boolean
    events?: boolean
    analytics?: boolean
  }
  filters?: {
    date_range?: {
      start: string
      end: string
    }
    status?: LeadStatus[]
    activity_type?: ActivityType[]
  }
}

export interface ExportResult {
  filename: string
  size: number
  url: string
  created_at: string
}

// ============================================
// FILTRES ANALYTICS
// ============================================

export interface AnalyticsFilters {
  period?: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom'
  date_range?: {
    start: string
    end: string
  }
  activity_type?: ActivityType
  project_type?: ProjectType
  source?: LeadSource
  compare_to_previous?: boolean
}

// ============================================
// COMPARAISON
// ============================================

export interface PeriodComparison {
  current: {
    period: ReportPeriod
    metrics: DashboardMetrics
  }

  previous: {
    period: ReportPeriod
    metrics: DashboardMetrics
  }

  changes: {
    leads: { value: number; percent: number; trend: 'up' | 'down' | 'stable' }
    revenue: { value: number; percent: number; trend: 'up' | 'down' | 'stable' }
    conversion: { value: number; percent: number; trend: 'up' | 'down' | 'stable' }
  }
}
