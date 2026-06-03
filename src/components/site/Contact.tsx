'use client'
import { useState } from "react"

const contactInfo = [
  { label: "Localisation", value: "Baie-Mahault, Guadeloupe 971" },
  { label: "Réponse garantie", value: "Sous 24h en semaine" },
  { label: "Devis", value: "Gratuit et sans engagement" },
]

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          project_type: fd.get('project_type'),
          description: fd.get('description'),
          source: 'site-web',
          urgency: 'normal',
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => { window.location.href = '/merci' }, 1800)
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '0.5px solid #DDD5C8',
    borderRadius: '7px',
    padding: '12px 16px',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 300,
    color: '#2E2A25',
    outline: 'none',
    width: '100%',
    transition: 'border-color .2s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#B0A89E',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <section id="contact" className="py-24 scroll-mt-20" style={{ background: '#F5F2ED' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-xs tracking-[3px] uppercase" style={{ color: '#C4472A' }}>
              <span className="w-5 h-px" style={{ background: '#C4472A' }} />
              Contact
            </div>
            <h2
              className="font-display font-black leading-none mb-5"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
            >
              Parlons<br />
              <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>de votre projet.</em>
            </h2>
            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: '#7A7268', lineHeight: 1.75 }}>
              45 minutes pour comprendre votre besoin. Gratuit, sans engagement. Devis envoyé sous 24h.
            </p>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#C4472A' }} />
                  <div>
                    <span className="block text-xs uppercase tracking-wide font-normal" style={{ color: '#B0A89E', letterSpacing: '0.5px' }}>
                      {item.label}
                    </span>
                    <span className="text-sm font-light" style={{ color: '#2E2A25' }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div className="rounded-xl p-10 text-center" style={{ background: '#FFFFFF', border: '0.5px solid #DDD5C8' }}>
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: '#0E0D0B' }}>Demande envoyée !</h3>
                <p className="text-sm font-light" style={{ color: '#7A7268' }}>Je vous recontacte sous 24h maximum.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label style={labelStyle}>Prénom & Nom</label>
                    <input name="name" type="text" required placeholder="Marie Dupont" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C4472A')}
                      onBlur={e => (e.target.style.borderColor = '#DDD5C8')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone</label>
                    <input name="phone" type="tel" placeholder="0690 00 00 00" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C4472A')}
                      onBlur={e => (e.target.style.borderColor = '#DDD5C8')} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" required placeholder="marie@monentreprise.gp" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C4472A')}
                    onBlur={e => (e.target.style.borderColor = '#DDD5C8')} />
                </div>
                <div>
                  <label style={labelStyle}>Type de projet</label>
                  <select name="project_type" required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderColor = '#C4472A')}
                    onBlur={e => (e.target.style.borderColor = '#DDD5C8')}>
                    <option value="">Sélectionnez...</option>
                    <option value="vitrine">Site vitrine</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="application">Application métier</option>
                    <option value="facturation">Facturation électronique</option>
                    <option value="custom">Autre</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Votre besoin</label>
                  <textarea name="description" required placeholder="Décrivez votre activité et ce que vous recherchez..."
                    style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
                    onFocus={e => (e.target.style.borderColor = '#C4472A')}
                    onBlur={e => (e.target.style.borderColor = '#DDD5C8')} />
                </div>
                {status === 'error' && (
                  <p className="text-xs" style={{ color: '#C4472A' }}>Une erreur est survenue. Réessayez ou contactez-nous directement.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 text-white text-sm font-normal rounded transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: '#C4472A', marginTop: '4px' }}
                >
                  {status === 'sending' ? 'Envoi...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
