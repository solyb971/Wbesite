import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Aperçu de partage du site (WhatsApp, réseaux, moteurs) : la carte du hero sur
 * le paysage de l'île, capturée depuis l'accueil lui-même (src/assets/og). Servie
 * à /opengraph-image, adresse que reprennent les métadonnées des pages.
 * Générée au build (runtime Node).
 */
export const alt = 'SolYB, agence digitale en Guadeloupe : « Votre clientèle vous cherche déjà. »'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const apercu =
  'data:image/png;base64,' +
  readFileSync(join(process.cwd(), 'src/assets/og/accueil.png')).toString('base64')

export default function Image() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={apercu} width={size.width} height={size.height} alt="" />
    ),
    { ...size }
  )
}
