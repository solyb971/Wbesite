import { Cormorant_Garamond, IBM_Plex_Mono, DM_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

const sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
})

export default function FacturationLayout({ children }: { children: ReactNode }) {
  return <div className={`${cormorant.variable} ${mono.variable} ${sans.variable}`}>{children}</div>
}
