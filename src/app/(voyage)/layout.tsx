import { ClientExtrasVoyage } from "@/components/site/ClientOnlyComponents"
import "./voyage.css"

/**
 * Pages « voyage » (accueil, /merci, index du blog) : navigation, pied de page et
 * défilement propres (voir components/voyage), d'où un groupe de routes à part.
 * Bandeau de consentement, mesure d'audience et bulle WhatsApp (en fin de page).
 */
export default function AccueilLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ClientExtrasVoyage />
    </>
  )
}
