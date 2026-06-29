import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import type { ReactNode } from 'react'

// DA « Lagon » — Bricolage Grotesque (display) + Figtree (corps). Aucun monospace.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '500', '600', '700'],
})

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700'],
})

export default function ResaGPLayout({ children }: { children: ReactNode }) {
  return <div className={`${bricolage.variable} ${figtree.variable}`}>{children}</div>
}
