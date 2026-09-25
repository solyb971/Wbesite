import { describe, it, expect } from 'vitest'
import { contactSchema } from './contact-schema'

const valid = {
  name: 'Marie Dupont',
  email: 'marie@example.com',
  project_type: 'vitrine',
  description: 'Je souhaite un site vitrine pour mon commerce.',
}

describe('contactSchema', () => {
  it('accepte une demande minimale valide', () => {
    const r = contactSchema.safeParse(valid)
    expect(r.success).toBe(true)
  })

  it('applique les valeurs par défaut (urgency, source)', () => {
    const r = contactSchema.parse(valid)
    expect(r.urgency).toBe('normal')
    expect(r.source).toBe('site-web')
  })

  it('met l\'email en minuscules', () => {
    const r = contactSchema.parse({ ...valid, email: 'Marie@EXEMPLE.COM' })
    expect(r.email).toBe('marie@exemple.com')
  })

  it('accepte un budget absent (formulaire court de la home)', () => {
    // Régression : budget était obligatoire et faisait échouer la home.
    const r = contactSchema.safeParse(valid)
    expect(r.success).toBe(true)
  })

  it('accepte un budget valide quand il est fourni', () => {
    const r = contactSchema.parse({ ...valid, budget: '1000-2000' })
    expect(r.budget).toBe('1000-2000')
  })

  it('rejette un budget hors énumération', () => {
    const r = contactSchema.safeParse({ ...valid, budget: '5000' })
    expect(r.success).toBe(false)
  })

  it('rejette un email invalide', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'pas-un-email' })
    expect(r.success).toBe(false)
  })

  it('accepte une description courte ou absente (chaîne vide par défaut)', () => {
    expect(contactSchema.safeParse({ ...valid, description: 'Un site' }).success).toBe(true)
    const sansDescription: Partial<typeof valid> = { ...valid }
    delete sansDescription.description
    const r = contactSchema.parse(sansDescription)
    expect(r.description).toBe('')
  })

  it('rejette une description de plus de 2000 caractères', () => {
    const r = contactSchema.safeParse({ ...valid, description: 'x'.repeat(2001) })
    expect(r.success).toBe(false)
  })

  it('rejette un nom trop court', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'M' })
    expect(r.success).toBe(false)
  })

  it('accepte un téléphone guadeloupéen valide', () => {
    const r = contactSchema.safeParse({ ...valid, phone: '0690123456' })
    expect(r.success).toBe(true)
  })

  it('accepte un téléphone vide', () => {
    const r = contactSchema.safeParse({ ...valid, phone: '' })
    expect(r.success).toBe(true)
  })

  it('rejette un téléphone au format invalide', () => {
    const r = contactSchema.safeParse({ ...valid, phone: '0123456789' })
    expect(r.success).toBe(false)
  })

  it('rejette un type de projet inconnu', () => {
    const r = contactSchema.safeParse({ ...valid, project_type: 'inconnu' })
    expect(r.success).toBe(false)
  })
})
