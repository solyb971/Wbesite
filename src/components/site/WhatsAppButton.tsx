"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber = "590690426792",
  message = "Bonjour ! Je suis intéressé(e) par vos services de création de site web.",
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Afficher le tooltip uniquement sur desktop, après 4 secondes
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return
    const show = setTimeout(() => setShowTooltip(true), 4000)
    const hide = setTimeout(() => setShowTooltip(false), 9000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-50">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-full right-0 mb-3 animate-bounce">
            <div className="bg-[#13131A] border border-[#2A2A38] rounded-xl shadow-lg p-3 pr-8 text-sm max-w-[200px] relative">
              <button
                onClick={() => setShowTooltip(false)}
                aria-label="Fermer l'infobulle"
                className="absolute top-1 right-1 text-[#8B8B9E] hover:text-[#F0EDE8]"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-[#F0EDE8] font-semibold">Besoin d'aide ?</p>
              <p className="text-[#8B8B9E] text-xs mt-1">Contactez-moi sur WhatsApp !</p>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#13131A] border-b border-r border-[#2A2A38] transform rotate-45"></div>
            </div>
          </div>
        )}

        {/* Expanded Chat Box */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 max-w-[calc(100vw-3rem)] bg-[#13131A] border border-[#2A2A38] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-coral p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">SolYB</h4>
                    <p className="text-sm text-white/70">Généralement répond en 1h</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#0A0A0F]">
              <div className="bg-[#1C1C26] border border-[#2A2A38] rounded-xl p-3">
                <p className="text-[#F0EDE8] text-sm">
                  Bonjour ! Je suis Yacine de SolYB. Comment puis-je vous aider avec votre projet web ?
                </p>
                <p className="text-xs text-[#8B8B9E] mt-2">Aujourd'hui</p>
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 border-t border-[#2A2A38] bg-[#13131A]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-coral hover:bg-coral-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Démarrer la conversation
              </a>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le contact WhatsApp" : "Contacter par WhatsApp"}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isOpen ? "bg-[#2A2A38]" : "bg-coral hover:bg-coral-600"
          }`}
        >
          {isOpen ? (
            <X className={`w-7 h-7 text-white transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          )}
        </button>

        {/* Pulse Animation — pointer-events-none : ne doit pas intercepter les clics du bouton */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-coral animate-ping opacity-25 pointer-events-none"></span>
        )}
      </div>
    </>
  )
}
