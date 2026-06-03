import Navigation from "@/components/site/Navigation"
import Footer from "@/components/site/Footer"
import UrgencyBanner from "@/components/site/UrgencyBanner"
import GrainOverlay from "@/components/site/GrainOverlay"
import { ClientBackground, ClientFooterExtras } from "@/components/site/ClientOnlyComponents"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientBackground />
      <GrainOverlay />

      <div className="sticky top-0 z-50" data-sticky-header>
        {/* <UrgencyBanner /> */}
        <Navigation />
      </div>
      {children}
      <Footer />
      <ClientFooterExtras />
    </>
  )
}
