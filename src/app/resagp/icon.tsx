import { ImageResponse } from 'next/og'

// Favicon ResaGP — charte « Lagon » (marque « table vue de dessus »).
// Remplace l'ancien icon.png (logo SolYB bleu, hors charte).
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64, height: 64, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#0E7C7B', borderRadius: 14,
        }}
      >
        <svg width="42" height="42" viewBox="0 0 88 88" fill="none">
          <rect x="2" y="2" width="84" height="84" rx="4" stroke="#F4F2E8" strokeWidth="5" />
          <rect x="26" y="40" width="36" height="8" rx="2.5" fill="#F4F2E8" />
          <rect x="29" y="22" width="12" height="5" rx="2" fill="#F4F2E8" opacity="0.7" />
          <rect x="47" y="22" width="12" height="5" rx="2" fill="#F4F2E8" opacity="0.7" />
          <rect x="29" y="61" width="12" height="5" rx="2" fill="#F4F2E8" opacity="0.7" />
          <rect x="47" y="61" width="12" height="5" rx="2" fill="#F4F2E8" opacity="0.7" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
