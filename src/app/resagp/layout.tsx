import { Fraunces, Outfit, Space_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
})

const mono = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

export default function ResaGPLayout({ children }: { children: ReactNode }) {
  return <div className={`${fraunces.variable} ${outfit.variable} ${mono.variable}`}>{children}</div>
}
