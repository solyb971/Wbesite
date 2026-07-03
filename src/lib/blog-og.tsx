import { ImageResponse } from 'next/og'

/**
 * Vignette de partage / miniature pour les articles de blog.
 * DA « SolYB v3 » : fond dark caribéen, glow d'accent par rubrique, titre
 * éditorial, mot-symbole SolYB. Générée statiquement au build (runtime Node).
 *
 * Sert d'og:image (partage réseaux) ET se télécharge en PNG à l'URL
 * /blog/<slug>/opengraph-image pour republier sur LinkedIn / Facebook.
 */

export const blogOgSize = { width: 1200, height: 630 }
export const blogOgContentType = 'image/png'

export function renderBlogOg({
  title,
  category,
  accent,
}: {
  title: string
  category: string
  accent: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 60%, #1C1C26 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow d'accent (couleur de la rubrique) */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-140px',
            left: '-100px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,71,42,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Haut : rubrique + domaine */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: `1px solid ${accent}66`,
              background: `${accent}1A`,
              borderRadius: '4px',
              padding: '8px 18px',
              fontSize: '15px',
              color: accent,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              fontWeight: 600,
            }}
          >
            <div style={{ width: '18px', height: '2px', background: accent }} />
            {category}
          </div>
          <div style={{ color: '#6B645A', fontSize: '15px', letterSpacing: '2px', fontFamily: 'sans-serif' }}>
            solyb.fr / blog
          </div>
        </div>

        {/* Titre de l'article */}
        <div
          style={{
            display: 'flex',
            fontSize: '62px',
            fontWeight: 700,
            color: '#F0EDE8',
            lineHeight: 1.08,
            letterSpacing: '-1.5px',
            maxWidth: '960px',
          }}
        >
          {title}
        </div>

        {/* Bas : mot-symbole + accroche */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, color: '#F0EDE8', lineHeight: 1, letterSpacing: '-1.5px' }}>Sol</span>
            <span style={{ fontSize: '40px', fontWeight: 700, color: '#C4472A', lineHeight: 1, letterSpacing: '-1.5px' }}>YB</span>
            <span style={{ fontSize: '17px', color: '#8B8B9E', fontStyle: 'italic', marginLeft: '14px', fontFamily: 'sans-serif' }}>
              Agence digitale · Guadeloupe
            </span>
          </div>
          <div
            style={{
              fontSize: '15px',
              color: accent,
              fontFamily: 'sans-serif',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            Devis gratuit sous 24 h →
          </div>
        </div>
      </div>
    ),
    { ...blogOgSize }
  )
}
