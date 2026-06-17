import Navigation from "@/components/site/Navigation"
import Footer from "@/components/site/Footer"
import ScrollProgress from "@/components/site/ScrollProgress"
import { ClientBackground, ClientFooterExtras } from "@/components/site/ClientOnlyComponents"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientBackground />
      <ScrollProgress />

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
