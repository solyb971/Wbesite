'use client'

import { CSSProperties, useState } from 'react'
import HoneypotField from '@/components/site/HoneypotField'

type Theme = {
  surface: string
  text: string
  muted: string
  border: string
  borderFocus: string
  accent: string
  accentText: string
  radius: string
  fontMono?: string
}

/**
 * Formulaire d'accès anticipé / liste d'attente — poste sur /api/leads
 * (même pipeline que le contact de la home). Thémable par page produit.
 */
export default function EarlyAccessForm({
  theme,
  source,
  projectType,
  productSource,
  productName,
  submitLabel = 'Réserver mon accès anticipé',
  successText = "On vous recontacte dès l'ouverture des accès — sous 24h en semaine.",
}: {
  theme: Theme
  source: string
  projectType: 'saas' | 'facturation' | 'application' | 'custom'
  productSource: 'solyb_agency' | 'factu_gp' | 'resa_gp'
  productName: string
  submitLabel?: string
  successText?: string
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const message = String(fd.get('message') || '').trim()
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone') || '',
          project_type: projectType,
          product_source: productSource,
          budget: '500-1000',
          urgency: 'normal',
          source,
          description: `Accès anticipé ${productName} (page produit).${message ? ' ' + message : ''}`,
          company_website: fd.get('company_website'),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
    }
  }

  const input: CSSProperties = {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    color: theme.text,
    borderRadius: theme.radius,
    padding: '11px 14px',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    transition: 'border-color .2s',
  }
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = theme.borderFocus }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = theme.border }

  if (status === 'success') {
    return (
      <div
        style={{
          maxWidth: 520, margin: '0 auto', textAlign: 'center',
          background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radius, padding: '32px 28px',
        }}
      >
        <div style={{ fontSize: 30, color: theme.accent, marginBottom: 10 }}>✓</div>
        <p style={{ color: theme.text, fontSize: 17, fontWeight: 600, marginBottom: 6 }}>C&apos;est noté, merci.</p>
        <p style={{ color: theme.muted, fontSize: 14 }}>{successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <HoneypotField />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input name="name" type="text" required placeholder="Votre nom" style={input} onFocus={onFocus} onBlur={onBlur} />
        <input name="email" type="email" required placeholder="Email" style={input} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <input name="phone" type="tel" placeholder="Téléphone (facultatif)" style={input} onFocus={onFocus} onBlur={onBlur} />
      <input name="message" type="text" placeholder="Votre activité / un mot (facultatif)" style={input} onFocus={onFocus} onBlur={onBlur} />
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: theme.muted, lineHeight: 1.5, cursor: 'pointer' }}>
        <input type="checkbox" name="consent" required style={{ marginTop: 2, accentColor: theme.accent, flexShrink: 0 }} />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à la{' '}
          <a href="/confidentialite" style={{ color: theme.accent, textDecoration: 'underline' }}>
            politique de confidentialité
          </a>. *
        </span>
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          background: theme.accent, color: theme.accentText, border: 'none', borderRadius: theme.radius,
          padding: '13px 22px', fontSize: '15px', fontWeight: 600, cursor: status === 'sending' ? 'wait' : 'pointer',
          fontFamily: 'inherit', opacity: status === 'sending' ? 0.7 : 1, transition: 'opacity .2s, transform .2s',
        }}
      >
        {status === 'sending' ? 'Envoi…' : submitLabel}
      </button>
      {status === 'error' && (
        <p style={{ color: '#F87171', fontSize: 13, textAlign: 'center' }}>
          Une erreur est survenue. Réessayez ou écrivez à contact@solyb.fr.
        </p>
      )}
      <p style={{ color: theme.muted, fontSize: 12, textAlign: 'center', fontFamily: theme.fontMono, lineHeight: 1.5 }}>
        Sans engagement · on ne partage jamais vos données.
      </p>
    </form>
  )
}
