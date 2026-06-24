import { describe, it, expect } from 'vitest'
import type { Lead } from '@/hooks/useLeads'
import {
  getScoreColor,
  getScoreBgColor,
  getPriorityColor,
  getScoreBreakdown,
  getScoreRecommendations,
} from './scoring'

/** Construit un Lead minimal avec des valeurs par défaut surchargées. */
function makeLead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: 'test-id',
    name: 'Test',
    email: 'test@example.com',
    project_type: 'vitrine',
    budget: 1500,
    description: 'Une description de projet suffisamment détaillée pour les tests.',
    urgency: 'normal',
    status: 'nouveau',
    source: 'site-web',
    score_total: 70,
    score_budget: 15,
    score_clarity: 12,
    score_urgency: 10,
    score_fit: 15,
    score_responsiveness: 0,
    score_source: 8,
    is_launch_offer: false,
    launch_offer_position: null,
    created_at: new Date().toISOString(),
    ...overrides,
  } as Lead
}

describe('getScoreColor', () => {
  it('renvoie vert pour un score élevé', () => {
    expect(getScoreColor(85)).toContain('green')
  })
  it('renvoie rouge pour un score faible', () => {
    expect(getScoreColor(30)).toContain('red')
  })
  it('gère les seuils (60 = jaune)', () => {
    expect(getScoreColor(60)).toContain('yellow')
  })
})

describe('getScoreBgColor', () => {
  it('cohérent avec le niveau de score', () => {
    expect(getScoreBgColor(90)).toContain('green')
    expect(getScoreBgColor(20)).toContain('red')
  })
})

describe('getPriorityColor', () => {
  it('mappe chaque priorité à une classe', () => {
    expect(getPriorityColor('high')).toContain('red')
    expect(getPriorityColor('medium')).toContain('yellow')
    expect(getPriorityColor('low')).toContain('gray')
  })
})

describe('getScoreBreakdown', () => {
  it('calcule le pourcentage total', () => {
    const b = getScoreBreakdown(makeLead({ score_total: 70 }))
    expect(b.total.percentage).toBe(70)
  })
  it('reflète les sous-scores du lead', () => {
    const b = getScoreBreakdown(makeLead({ score_budget: 18 }))
    expect(b.budget.score).toBe(18)
    expect(b.budget.max).toBe(20)
  })
})

describe('getScoreRecommendations', () => {
  it('classe en priorité haute si urgence urgente', () => {
    const r = getScoreRecommendations(makeLead({ urgency: 'urgent', score_total: 40 }))
    expect(r.priority).toBe('high')
  })

  it('classe en priorité haute si score >= 80', () => {
    const r = getScoreRecommendations(makeLead({ score_total: 85 }))
    expect(r.priority).toBe('high')
  })

  it('classe en priorité basse si score faible + urgence basse', () => {
    const r = getScoreRecommendations(makeLead({ score_total: 30, urgency: 'low' }))
    expect(r.priority).toBe('low')
  })

  it('recommande un contact rapide pour un nouveau lead prioritaire', () => {
    const r = getScoreRecommendations(makeLead({ status: 'nouveau', score_total: 90 }))
    expect(r.actions.join(' ')).toMatch(/2h/)
  })

  it('signale un budget insuffisant comme préoccupation', () => {
    const r = getScoreRecommendations(makeLead({ score_budget: 5 }))
    expect(r.concerns.join(' ')).toMatch(/[Bb]udget/)
  })
})
