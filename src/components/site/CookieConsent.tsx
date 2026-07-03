'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * Bandeau de consentement cookies (RGPD).
 *
 * Tant que l'utilisateur n'a pas choisi, les services déposant des cookies/traceurs
 * (chat Crisp) ne sont PAS chargés. Le choix est mémorisé dans localStorage.
 *
 * - Accepter → `solyb_cookie_consent = "accepted"` + event `solyb-consent-accepted`
 *   (écouté par CrispChat pour s'initialiser sans rechargement).
 * - Refuser  → `solyb_cookie_consent = "refused"` (aucun traceur chargé).
 */
export const CONSENT_KEY = 'solyb_cookie_consent'
export const CONSENT_EVENT = 'solyb-consent-accepted'

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(CONSENT_KEY) === 'accepted'
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // N'afficher que si aucun choix n'a encore été fait
    if (!window.localStorage.getItem(CONSENT_KEY)) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted')
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setVisible(false)
  }

  const refuse = () => {
    window.localStorage.setItem(CONSENT_KEY, 'refused')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 9999,
        maxWidth: 720,
        margin: '0 auto',
        background: '#1A1816',
        color: '#F0EDE8',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12,
        padding: '18px 20px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 14,
        fontSize: 14,
      }}
    >
      <p style={{ flex: '1 1 280px', margin: 0, lineHeight: 1.55, color: '#CFC9C0' }}>
        Nous utilisons des cookies pour le bon fonctionnement du site et la mesure
        d&apos;audience. Vous pouvez accepter ou refuser ces traceurs.{' '}
        <Link href="/confidentialite" style={{ color: '#E8845C', textDecoration: 'underline' }}>
          En savoir plus
        </Link>
        .
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={refuse}
          style={{
            background: 'transparent',
            color: '#CFC9C0',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding: '9px 16px',
            fontSize: 14,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          Refuser
        </button>
        <button
          onClick={accept}
          style={{
            background: '#C4472A',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '9px 18px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  )
}
