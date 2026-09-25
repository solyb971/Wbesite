import { ClientLegalExtras } from "@/components/site/ClientOnlyComponents"
import "./voyage.css"

/**
 * Accueil « voyage » : sa navigation, son pied de page et son défilement lui
 * sont propres (voir components/voyage), d'où un groupe de routes à part.
 * Le bandeau de consentement et la mesure d'audience, eux, restent.
 */
export default function AccueilLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ClientLegalExtras />
    </>
  )
}
