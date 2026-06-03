import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Connexion - SolYB CRM",
  description: "Accédez au dashboard CRM SolYB",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
