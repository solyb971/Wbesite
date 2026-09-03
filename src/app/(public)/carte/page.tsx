import type { Metadata } from 'next'
import Image from 'next/image'
import CardActions from '@/components/site/CardActions'
import StyledQRCode from '@/components/site/StyledQRCode'

export const metadata: Metadata = {
  title: 'Carte de visite — Yacine Bouhassoun',
  description: 'Ajoutez-moi à vos contacts, contactez-moi sur WhatsApp, ou découvrez mon catalogue et mon site.',
}

const CARD_URL = 'https://solyb.fr/carte'

export default function CartePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-start justify-center px-4 py-10">
      <div className="max-w-md w-full">
        <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 md:p-10 text-center">
          <Image
            src="/logo/syb-orange.png"
            alt="SolYB"
            width={96}
            height={96}
            className="mx-auto mb-4"
          />

          <h1 className="font-display text-2xl md:text-3xl font-bold text-coral mb-1">
            Yacine Bouhassoun
          </h1>
          <p className="text-sm text-[#8B8B9E] uppercase tracking-widest mb-6" style={{ letterSpacing: '2px' }}>
            Fondateur — SolYB
          </p>

          <CardActions />

          <div className="pt-6 border-t border-[#2A2A38]">
            <p className="text-xs text-[#8B8B9E] mb-4">Ou scannez pour partager cette carte</p>
            <StyledQRCode url={CARD_URL} />
          </div>
        </div>
      </div>
    </main>
  )
}
