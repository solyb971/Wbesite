'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'loading' | 'form' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Supabase envoie le token dans le hash — on l'échange contre une session
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStatus('form')
      }
    })

    // Déclencher la vérification du hash
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus('form')
      else setStatus('form') // on affiche le form de toute façon
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (password.length < 8) { setError('Minimum 8 caractères.'); return }

    const supabase = createClient()
    const { error: err } = await supabase.auth.updateUser({ password })

    if (err) { setError(err.message); return }

    setStatus('success')
    setTimeout(() => router.push('/login'), 2500)
  }

  if (status === 'loading') return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#999' }}>Vérification en cours…</p>
    </div>
  )

  if (status === 'success') return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <p style={{ color: '#fff', fontSize: '1.1rem' }}>Mot de passe mis à jour !</p>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>Redirection vers la connexion…</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Nouveau mot de passe</h1>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>Choisissez un mot de passe sécurisé.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimum 8 caractères"
              required
              style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Répéter le mot de passe"
              required
              style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

          <button
            type="submit"
            style={{ width: '100%', padding: '0.85rem', background: '#FF6B47', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Mettre à jour le mot de passe
          </button>
        </form>
      </div>
    </div>
  )
}
