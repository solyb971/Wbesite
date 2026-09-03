'use client'

import Link from 'next/link'
import { UserPlus, MessageCircle, BookOpen, Globe } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/590690426792?text=' +
  encodeURIComponent('Bonjour, je vous ai trouvé via votre carte de visite.')

const colorClasses: Record<string, string> = {
  coral: 'bg-coral/10 border-coral/20 text-coral',
  turquoise: 'bg-turquoise/10 border-turquoise/20 text-turquoise',
  solar: 'bg-solar/10 border-solar/20 text-solar',
  violet: 'bg-violet/10 border-violet/20 text-violet',
}

const itemClass =
  'flex items-center gap-4 bg-[#0D0D14] border border-[#2A2A38] hover:border-[#3A3A48] rounded-xl p-4 text-left transition-all w-full'

// Partage la vCard via la feuille de partage native (Contacts, WhatsApp, Mail...)
// quand elle existe. iOS Safari n'honore pas l'attribut download sur les liens
// blob — un clic classique n'y déclenchait rien. En repli (desktop, ou support
// absent), on retombe sur le telechargement direct du .vcf.
async function handleAddContact() {
  try {
    const res = await fetch('/api/vcard')
    const blob = await res.blob()
    const file = new File([blob], 'yacine-bouhassoun.vcf', { type: 'text/vcard' })
    if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Yacine Bouhassoun' })
      return
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return
  }
  window.location.href = '/api/vcard'
}

export default function CardActions() {
  return (
    <div className="space-y-3 mb-8">
      <button type="button" onClick={handleAddContact} className={itemClass}>
        <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 ${colorClasses.coral}`}>
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-[#F0EDE8] text-sm">Ajouter aux contacts</div>
          <div className="text-xs text-[#8B8B9E]">Enregistre ma fiche dans vos contacts</div>
        </div>
      </button>

      <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={itemClass}>
        <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 ${colorClasses.turquoise}`}>
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-[#F0EDE8] text-sm">WhatsApp</div>
          <div className="text-xs text-[#8B8B9E]">M’écrire directement</div>
        </div>
      </Link>

      <Link href="/catalogue" className={itemClass}>
        <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 ${colorClasses.solar}`}>
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-[#F0EDE8] text-sm">Voir le catalogue</div>
          <div className="text-xs text-[#8B8B9E]">Nos produits, sans engagement</div>
        </div>
      </Link>

      <Link href="/" className={itemClass}>
        <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 ${colorClasses.violet}`}>
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-[#F0EDE8] text-sm">Voir le site</div>
          <div className="text-xs text-[#8B8B9E]">solyb.fr</div>
        </div>
      </Link>
    </div>
  )
}
