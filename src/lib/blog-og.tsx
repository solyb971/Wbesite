import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Vignette de partage / miniature pour les articles de blog.
 * DA « SolYB v3 » : fond dark caribéen, logo SYB, titre en Fraunces (vraie
 * police chargée), barre + glow d'accent par rubrique, tags contextuels.
 * Générée statiquement au build (runtime Node) — sert d'og:image ET se
 * télécharge en PNG à /blog/<slug>/opengraph-image.
 */

export const blogOgSize = { width: 1200, height: 630 }
export const blogOgContentType = 'image/png'

// Polices + logo chargés une fois (build-time)
const root = process.cwd()
const fraunces900 = readFileSync(join(root, 'src/assets/fonts/Fraunces-900.ttf'))
const dmSans400 = readFileSync(join(root, 'src/assets/fonts/DMSans-400.ttf'))
const dmSans600 = readFileSync(join(root, 'src/assets/fonts/DMSans-600.ttf'))
const logoUri =
  'data:image/png;base64,' +
  readFileSync(join(root, 'public/logo/syb-white.png')).toString('base64')

export function renderBlogOg({
  title,
  category,
  accent,
  tags = [],
}: {
  title: string
  category: string
  accent: string
  tags?: string[]
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 55%, #1C1C26 100%)',
          padding: '54px 64px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'DM Sans',
          color: '#F0EDE8',
        }}
      >
        {/* Glows */}
        <div style={{ position: 'absolute', top: -160, right: -120, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${accent}38 0%, transparent 68%)` }} />
        <div style={{ position: 'absolute', bottom: -190, left: -130, width: 470, height: 470, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,71,42,0.13) 0%, transparent 68%)' }} />
        {/* Barre d'accent gauche */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: accent }} />

        {/* Header : logo + marque · badge rubrique */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUri} width={50} height={50} alt="" style={{ marginRight: 15 }} />
            <span style={{ fontFamily: 'Fraunces', fontSize: 33, fontWeight: 900, letterSpacing: -1 }}>SolYB</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${accent}66`,
              background: `${accent}1F`,
              borderRadius: 6,
              padding: '9px 20px',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: accent,
            }}
          >
            {category}
          </div>
        </div>

        {/* Titre + tags (centre) */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, paddingTop: 10 }}>
          <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: 66, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 940 }}>
            {title}
          </div>
          {tags.length > 0 && (
            <div style={{ display: 'flex', marginTop: 32 }}>
              {tags.map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: 12,
                    border: '1px solid rgba(240,237,232,0.16)',
                    background: 'rgba(240,237,232,0.05)',
                    borderRadius: 100,
                    padding: '9px 18px',
                    fontSize: 18,
                    color: '#D8D3CC',
                  }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, marginRight: 10 }} />
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(240,237,232,0.10)', paddingTop: 22 }}>
          <span style={{ fontSize: 20, color: '#8B8B9E', letterSpacing: 1 }}>solyb.fr / blog</span>
          <span style={{ fontSize: 20, fontWeight: 600, color: accent, letterSpacing: 1 }}>Guadeloupe · 971</span>
        </div>
      </div>
    ),
    {
      ...blogOgSize,
      fonts: [
        { name: 'Fraunces', data: fraunces900, weight: 900, style: 'normal' },
        { name: 'DM Sans', data: dmSans400, weight: 400, style: 'normal' },
        { name: 'DM Sans', data: dmSans600, weight: 600, style: 'normal' },
      ],
    }
  )
}
