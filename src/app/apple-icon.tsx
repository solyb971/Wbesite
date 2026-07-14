import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Icône iOS / écran d'accueil — même « S » Fraunces, format 180×180 plein
// cadre (Apple applique lui-même le masque arrondi).
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const fraunces900 = readFileSync(
  join(process.cwd(), 'src/assets/fonts/Fraunces-900.ttf'),
)

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#C4472A',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Fraunces',
            fontWeight: 900,
            fontSize: 150,
            color: '#F5F2ED',
            lineHeight: 1,
            marginTop: -6,
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Fraunces', data: fraunces900, weight: 900, style: 'normal' }],
    },
  )
}
