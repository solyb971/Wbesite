/**
 * Types pour les activités, notes et planning
 */

import { Note, NoteType, PlanningEvent, EventType, EventStatus, ActivityType } from './database.types'

// ============================================
// NOTES & TIMELINE
// ============================================

export interface NoteWithMeta extends Note {
  author_name?: string
  lead_name?: string
}

export interface CreateNoteData {
  lead_id: string
  content: string
  type?: NoteType
  is_task?: boolean
  task_due_date?: string
}

export interface UpdateNoteData {
  content?: string
  type?: NoteType
  is_task?: boolean
  task_completed?: boolean
  task_due_date?: string
}

// ============================================
// TÂCHES
// ============================================

export interface Task extends Note {
  is_task: true
  task_completed: boolean
  task_due_date: string | null
}

export interface TaskFilters {
  lead_id?: string
  completed?: boolean
  overdue?: boolean
  due_today?: boolean
  due_this_week?: boolean
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  overdue: number
  due_today: number
  completion_rate: number
}

// ============================================
// PLANNING & CALENDRIER
// ============================================

export interface PlanningEventWithLead extends PlanningEvent {
  lead?: {
    id: string
    name: string
    company: string | null
    project_type: string
  }
}

export interface CreateEventData {
  title: string
  description?: string
  start_time: string
  end_time: string
  event_type: EventType
  activity_type?: ActivityType
  lead_id?: string
  estimated_hours?: number
  location?: string
}

export interface UpdateEventData {
  title?: string
  description?: string
  start_time?: string
  end_time?: string
  event_type?: EventType
  activity_type?: ActivityType
  lead_id?: string
  status?: EventStatus
  estimated_hours?: number
  actual_hours?: number
  location?: string
}

// ============================================
// CALENDRIER
// ============================================

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: EventType
  color: string
  lead_id?: string
  description?: string
}

export interface CalendarDay {
  date: Date
  events: CalendarEvent[]
  isToday: boolean
  isWeekend: boolean
  hasEvents: boolean
  eventCount: number
  totalHours: number
}

export interface CalendarWeek {
  weekNumber: number
  days: CalendarDay[]
  totalEvents: number
  totalHours: number
  capacity: number
  isOverloaded: boolean
}

export interface CalendarMonth {
  month: number
  year: number
  weeks: CalendarWeek[]
}

// ============================================
// GESTION DE CAPACITÉ
// ============================================

export interface CapacitySettings {
  weekly_hours: number
  alert_threshold: number
  work_schedule: {
    weekdays: {
      start: string
      end: string
    }
    weekend: {
      saturday: {
        start: string
        end: string
        distribution: boolean
      }
      saturday_pm: {
        start: string
        end: string
        animation: boolean
      }
      sunday: {
        start: string
        end: string
      }
    }
  }
}

export interface CapacityStatus {
  period: 'day' | 'week' | 'month'
  available_hours: number
  used_hours: number
  remaining_hours: number
  usage_percent: number
  is_overloaded: boolean
  is_near_limit: boolean
}

export interface WeeklyCapacity {
  week_start: Date
  week_end: Date

  capacity: {
    digital: number
    animation: number
    distribution: number
    cdd: number
    total: number
  }

  used: {
    digital: number
    animation: number
    distribution: number
    cdd: number
    total: number
  }

  remaining: {
    digital: number
    animation: number
    distribution: number
    total: number
  }

  status: 'available' | 'normal' | 'busy' | 'overloaded'
  alerts: string[]
  suggestions: string[]
}

// ============================================
// DISPONIBILITÉS
// ============================================

export interface TimeSlot {
  start: Date
  end: Date
  duration_minutes: number
  is_available: boolean
  reason?: string
}

export interface DayAvailability {
  date: Date
  is_work_day: boolean
  total_available_hours: number
  used_hours: number
  remaining_hours: number
  time_slots: TimeSlot[]
}

// ============================================
// SUGGESTIONS & ALERTES
// ============================================

export interface CapacityAlert {
  type: 'warning' | 'error' | 'info'
  message: string
  date: Date
  action_required?: string
  suggestions?: string[]
}

export interface ScheduleSuggestion {
  title: string
  description: string
  proposed_date: Date
  proposed_time: string
  reason: string
  priority: 'low' | 'medium' | 'high'
}

// ============================================
// FILTRES PLANNING
// ============================================

export interface EventFilters {
  event_type?: EventType | EventType[]
  activity_type?: ActivityType
  status?: EventStatus
  lead_id?: string

  start_after?: string
  start_before?: string

  search?: string
}

// ============================================
// STATISTIQUES PLANNING
// ============================================

export interface PlanningStats {
  total_events: number

  by_type: {
    projet: number
    appel: number
    animation: number
    distribution: number
    cdd: number
    blocked: number
  }

  by_status: {
    planned: number
    in_progress: number
    completed: number
    cancelled: number
  }

  total_hours: {
    estimated: number
    actual: number
  }

  completion_rate: number
  average_event_duration: number
}
