'use client'

import { useEffect, useRef } from 'react'
import type QRCodeStyling from 'qr-code-styling'
import { Download } from 'lucide-react'

interface StyledQRCodeProps {
  url: string
  size?: number
}

// Fond blanc + points foncés : c'est le choix le plus fiable au scan.
// Un QR inversé (fond sombre) ou trop de couleurs entre les modules et le
// fond dégrade la lecture par certaines apps d'appareil photo — on garde
// un vrai contraste, et on réserve la couleur de marque aux coins et au
// logo central plutôt qu'aux modules eux-mêmes.
export default function StyledQRCode({ url, size = 260 }: StyledQRCodeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    let cancelled = false

    import('qr-code-styling').then(({ default: QRCodeStylingCtor }) => {
      if (cancelled || !ref.current) return

      const qrCode = new QRCodeStylingCtor({
        width: size,
        height: size,
        data: url,
        margin: 8,
        qrOptions: { errorCorrectionLevel: 'H' },
        image: '/logo/syb-orange.png',
        imageOptions: { crossOrigin: 'anonymous', margin: 8, imageSize: 0.28 },
        dotsOptions: { color: '#1A1A22', type: 'rounded' },
        backgroundOptions: { color: '#FFFFFF' },
        cornersSquareOptions: { color: '#C4472A', type: 'extra-rounded' },
        cornersDotOptions: { color: '#00BFA5', type: 'dot' },
      })

      ref.current.innerHTML = ''
      qrCode.append(ref.current)
      qrRef.current = qrCode
    })

    return () => { cancelled = true }
  }, [url, size])

  const handleDownload = () => {
    qrRef.current?.download({ name: 'solyb-qr-code', extension: 'png' })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={ref} className="rounded-2xl overflow-hidden shadow-lg" style={{ width: size, height: size }} />
      <button
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] rounded-xl font-semibold text-sm transition-all"
      >
        <Download className="w-4 h-4" />
        Télécharger le QR code
      </button>
    </div>
  )
}
