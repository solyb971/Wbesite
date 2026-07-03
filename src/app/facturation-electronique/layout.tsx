import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

export default function FacturationLayout({ children }: { children: ReactNode }) {
  return <div className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>{children}</div>
}
