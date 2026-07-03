import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page introuvable — SolYB',
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 md:p-12">
          <div className="w-20 h-20 bg-coral/10 border border-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 text-coral" />
          </div>

          <p className="font-display text-6xl md:text-7xl font-black text-[#F0EDE8] mb-2" style={{ letterSpacing: '-2px' }}>
            404
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#F0EDE8] mb-4">
            Page introuvable
          </h1>
          <p className="text-[#8B8B9E] mb-10">
            Cette page n&apos;existe pas ou a été déplacée. Pas de panique, on vous ramène.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-coral hover:bg-coral-600 text-white rounded-xl font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/#contact"
              className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] rounded-xl font-semibold transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#8B8B9E] mt-6">
          Une question ?{' '}
          <a href="mailto:contact@solyb.fr" className="text-coral hover:underline font-semibold">
            contact@solyb.fr
          </a>
        </p>
      </div>
    </main>
  )
}
