import Image from 'next/image'

/**
 * Couverture visuelle d'article — reproduit en HTML/CSS le look de la
 * vignette de partage (fond dark caribéen, logo SYB, barre + glow d'accent,
 * tags thématiques), SANS le titre (le H1 est affiché à côté). Responsive
 * et léger, contrairement à l'image OG (réservée au partage externe).
 *
 * - variant "header" : bande pleine largeur en tête d'article
 * - variant "card"   : couverture compacte des cartes de l'index /blog
 */

const DARK = 'linear-gradient(135deg, #0A0A0F 0%, #13131A 55%, #1C1C26 100%)'

export function BlogCover({
  category,
  accent,
  tags = [],
  variant = 'header',
}: {
  category: string
  accent: string
  tags?: string[]
  variant?: 'header' | 'card'
}) {
  if (variant === 'card') {
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: DARK }}>
        <span className="absolute left-0 top-0 bottom-0" style={{ width: 5, background: accent }} />
        <div className="absolute" style={{ top: -70, right: -50, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${accent}40 0%, transparent 68%)` }} />
        <div className="relative h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <span
              className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[1.5px]"
              style={{ border: `1px solid ${accent}66`, background: `${accent}1f`, color: accent }}
            >
              {category}
            </span>
            <Image src="/logo/syb-white.png" alt="" width={30} height={30} className="opacity-90" />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
                style={{ border: '1px solid rgba(240,237,232,0.16)', background: 'rgba(240,237,232,0.05)', color: '#D8D3CC' }}
              >
                <span className="rounded-full" style={{ width: 5, height: 5, background: accent }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // variant "header"
  return (
    <div className="relative overflow-hidden" style={{ background: DARK, minHeight: 'clamp(170px, 24vw, 220px)' }}>
      <span className="absolute left-0 top-0 bottom-0" style={{ width: 7, background: accent }} />
      <div className="absolute" style={{ top: -140, right: -90, width: 460, height: 460, borderRadius: '50%', background: `radial-gradient(circle, ${accent}33 0%, transparent 68%)` }} />
      <div className="absolute" style={{ bottom: -160, left: -100, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,71,42,0.12) 0%, transparent 68%)' }} />
      <div className="relative max-w-5xl mx-auto px-6 py-8 flex flex-col justify-between h-full" style={{ minHeight: 'clamp(170px, 24vw, 220px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo/syb-white.png" alt="" width={40} height={40} />
            <span className="font-display font-black" style={{ fontSize: 26, letterSpacing: '-0.5px', color: '#F0EDE8' }}>SolYB</span>
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px]"
            style={{ border: `1px solid ${accent}66`, background: `${accent}1f`, color: accent }}
          >
            {category}
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm"
              style={{ border: '1px solid rgba(240,237,232,0.16)', background: 'rgba(240,237,232,0.05)', color: '#D8D3CC' }}
            >
              <span className="rounded-full" style={{ width: 6, height: 6, background: accent }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
