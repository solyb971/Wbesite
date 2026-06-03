import type { Metadata } from 'next'
import Link from "next/link"
import { CheckCircle, Mail, Clock, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Merci pour votre demande - SolYB",
  description: "Votre demande a été envoyée avec succès. Je vous recontacte sous 24h maximum.",
  robots: { index: false, follow: false },
}

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full">

        {/* Card principale */}
        <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 md:p-12 text-center">
          {/* Icône succès */}
          <div className="w-20 h-20 bg-turquoise/10 border border-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-turquoise" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-4">
            Demande envoyée !
          </h1>
          <p className="text-lg text-[#8B8B9E] mb-10">
            Merci pour votre confiance. Je vous recontacte sous{" "}
            <span className="text-[#F0EDE8] font-semibold">24h maximum.</span>
          </p>

          {/* Étapes */}
          <div className="bg-[#0D0D14] border border-[#2A2A38] rounded-xl p-6 mb-8 text-left space-y-5">
            <h2 className="font-display font-bold text-[#F0EDE8] text-sm uppercase tracking-widest text-center mb-4" style={{ letterSpacing: '3px' }}>
              La suite
            </h2>
            {[
              { n: '1', title: 'Email de confirmation', desc: 'Vous recevez un email dans quelques minutes' },
              { n: '2', title: 'Analyse de votre projet', desc: 'Je prépare une première proposition adaptée' },
              { n: '3', title: 'Contact sous 24h', desc: 'On discute ensemble de votre projet' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-sm">
                  {s.n}
                </div>
                <div>
                  <div className="font-semibold text-[#F0EDE8] text-sm mb-0.5">{s.title}</div>
                  <div className="text-xs text-[#8B8B9E]">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#0D0D14] border border-[#2A2A38] rounded-xl p-4 text-center">
              <Mail className="w-5 h-5 text-coral mx-auto mb-2" />
              <p className="text-xs text-[#8B8B9E]">Vérifiez vos spams si vous ne recevez rien</p>
            </div>
            <div className="bg-[#0D0D14] border border-[#2A2A38] rounded-xl p-4 text-center">
              <Clock className="w-5 h-5 text-turquoise mx-auto mb-2" />
              <p className="text-xs text-[#8B8B9E]">Réponse garantie sous 24h ouvrées</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-coral hover:bg-coral-600 text-white rounded-xl font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <Link
              href="/#services"
              className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] rounded-xl font-semibold transition-all"
            >
              Nos services
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#8B8B9E] mt-6">
          Une question urgente ?{" "}
          <a href="mailto:contact@solyb.fr" className="text-coral hover:underline font-semibold">
            contact@solyb.fr
          </a>
        </p>
      </div>
    </main>
  )
}
