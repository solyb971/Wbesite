import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SolYB — Agence Digitale Guadeloupe'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 60%, #1C1C26 100%)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow de fond */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,71,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '0', right: '0',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)',
        }} />

        {/* Badge top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            border: '1px solid rgba(255,107,71,0.4)',
            background: 'rgba(255,107,71,0.1)',
            borderRadius: '4px', padding: '6px 16px',
            fontSize: '12px', color: '#C4472A',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>
            GUADELOUPE · 971
          </div>
          <div style={{ color: '#5A5A6E', fontSize: '12px', letterSpacing: '2px' }}>solyb.fr</div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Logo text */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '96px', fontWeight: 700, color: '#F0EDE8', lineHeight: 1, letterSpacing: '-4px' }}>Sol</span>
            <span style={{ fontSize: '96px', fontWeight: 700, color: '#C4472A', lineHeight: 1, letterSpacing: '-4px' }}>YB</span>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: '26px', color: '#8B8B9E', fontStyle: 'italic', letterSpacing: '0.5px' }}>
            Agence Digitale Guadeloupe — Baie-Mahault
          </div>

          {/* Services pills */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {[
              { label: 'Sites Web Sur-Mesure', color: '#C4472A' },
              { label: 'Applications Métier', color: '#00D4AA' },
              { label: 'Facturation Élec. 2026', color: '#F5A623' },
            ].map(s => (
              <div key={s.label} style={{
                border: `1px solid ${s.color}50`,
                background: `${s.color}15`,
                borderRadius: '4px', padding: '8px 18px',
                fontSize: '14px', color: s.color, fontWeight: 600,
                fontFamily: 'sans-serif',
              }}>{s.label}</div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{
            background: '#C4472A', borderRadius: '6px',
            padding: '14px 32px', fontSize: '16px', fontWeight: 700,
            color: '#fff', fontFamily: 'sans-serif', letterSpacing: '0.5px',
          }}>
            Devis gratuit sous 24h →
          </div>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { n: '2-3 sem.', l: 'Livraison', c: '#C4472A' },
              { n: '100%', l: 'Sur-mesure', c: '#00D4AA' },
              { n: '24H', l: 'Réponse', c: '#F5A623' },
            ].map(s => (
              <div key={s.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '30px', fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.n}</span>
                <span style={{ fontSize: '11px', color: '#5A5A6E', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: '4px' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
