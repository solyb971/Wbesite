'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Trace côté serveur/client pour le débogage (remplacé par Sentry plus tard).
    console.error('Erreur applicative:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 md:p-12">
          <div className="w-20 h-20 bg-coral/10 border border-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-coral" />
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#F0EDE8] mb-4">
            Une erreur est survenue
          </h1>
          <p className="text-[#8B8B9E] mb-10">
            Quelque chose s&apos;est mal passé de notre côté. Vous pouvez réessayer ou revenir à
            l&apos;accueil.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-coral hover:bg-coral-600 text-white rounded-xl font-semibold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Réessayer
            </button>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] rounded-xl font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Accueil
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#8B8B9E] mt-6">
          Si le problème persiste :{' '}
          <a href="mailto:contact@solyb.fr" className="text-coral hover:underline font-semibold">
            contact@solyb.fr
          </a>
        </p>
      </div>
    </main>
  )
}
