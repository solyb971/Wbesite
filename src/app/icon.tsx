import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Favicon SolYB — « S » massif Fraunces sur pastille terre-cuite.
// Remplace l'ancien monogramme SYB dégradé, illisible < 48px. Généré au
// build (Satori) pour rester net à toutes les tailles (16 → 256px).
export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

const fraunces900 = readFileSync(
  join(process.cwd(), 'src/assets/fonts/Fraunces-900.ttf'),
)

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 256,
          height: 256,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#C4472A',
          borderRadius: 56,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Fraunces',
            fontWeight: 900,
            fontSize: 210,
            color: '#F5F2ED',
            lineHeight: 1,
            marginTop: -8,
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
