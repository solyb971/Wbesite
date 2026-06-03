import { redirect } from 'next/navigation'

// /contact redirige vers la section contact de la homepage
export default function ContactPage() {
  redirect('/#contact')
}

export const metadata = {
  robots: { index: false, follow: false },
}
