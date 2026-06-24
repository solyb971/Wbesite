'use client'

import { forwardRef } from 'react'

/**
 * Champ-piège anti-spam (honeypot).
 *
 * Invisible pour un humain (déporté hors écran, masqué aux lecteurs d'écran,
 * exclu de la tabulation), mais souvent rempli par les bots qui remplissent
 * automatiquement tous les champs. Côté serveur (/api/leads, /api/interest),
 * une soumission où `company_website` est rempli est ignorée silencieusement.
 *
 * - Formulaires FormData : la valeur passe via `name="company_website"`.
 * - Formulaires react-hook-form : lire la valeur via la `ref` au submit.
 */
const HoneypotField = forwardRef<HTMLInputElement>(function HoneypotField(_props, ref) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label htmlFor="company_website">Ne pas remplir ce champ</label>
      <input
        ref={ref}
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  )
})

export default HoneypotField
