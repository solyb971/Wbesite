import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { UserPlus, MessageCircle, BookOpen, Globe } from 'lucide-react'
import StyledQRCode from '@/components/site/StyledQRCode'

export const metadata: Metadata = {
  title: 'Carte de visite — Yacine Bouhassoun',
  description: 'Ajoutez-moi à vos contacts, contactez-moi sur WhatsApp, ou découvrez mon catalogue et mon site.',
}

const CARD_URL = 'https://solyb.fr/carte'
const WHATSAPP_URL = 'https://wa.me/590690426792?text=' + encodeURIComponent('Bonjour, je vous ai trouvé via votre carte de visite.')

const actions = [
  {
    href: '/api/vcard',
    icon: UserPlus,
    label: 'Ajouter aux contacts',
    desc: 'Enregistre ma fiche dans vos contacts',
    color: 'coral' as const,
    download: true,
  },
  {
    href: WHATSAPP_URL,
    icon: MessageCircle,
    label: 'WhatsApp',
    desc: 'M’écrire directement',
    color: 'turquoise' as const,
    external: true,
  },
  {
    href: '/catalogue',
    icon: BookOpen,
    label: 'Voir le catalogue',
    desc: 'Nos produits, sans engagement',
    color: 'solar' as const,
  },
  {
    href: '/',
    icon: Globe,
    label: 'Voir le site',
    desc: 'solyb.fr',
    color: 'violet' as const,
  },
]

const colorClasses: Record<string, string> = {
  coral: 'bg-coral/10 border-coral/20 text-coral',
  turquoise: 'bg-turquoise/10 border-turquoise/20 text-turquoise',
  solar: 'bg-solar/10 border-solar/20 text-solar',
  violet: 'bg-violet/10 border-violet/20 text-violet',
}

export default function CartePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 md:p-10 text-center">
          <Image
            src="/logo/syb-orange.png"
            alt="SolYB"
            width={64}
            height={64}
            className="mx-auto mb-5"
          />

          <h1 className="font-display text-2xl md:text-3xl font-bold text-coral mb-1">
            Yacine Bouhassoun
          </h1>
          <p className="text-sm text-[#8B8B9E] uppercase tracking-widest mb-8" style={{ letterSpacing: '2px' }}>
            Fondateur — SolYB
          </p>

          <div className="space-y-3 mb-8">
            {actions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                target={a.external ? '_blank' : undefined}
                rel={a.external ? 'noopener noreferrer' : undefined}
                download={a.download}
                className="flex items-center gap-4 bg-[#0D0D14] border border-[#2A2A38] hover:border-[#3A3A48] rounded-xl p-4 text-left transition-all"
              >
                <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 ${colorClasses[a.color]}`}>
                  <a.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-[#F0EDE8] text-sm">{a.label}</div>
                  <div className="text-xs text-[#8B8B9E]">{a.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-[#2A2A38]">
            <p className="text-xs text-[#8B8B9E] mb-4">Ou scannez pour partager cette carte</p>
            <StyledQRCode url={CARD_URL} />
          </div>
        </div>
      </div>
    </main>
  )
}
