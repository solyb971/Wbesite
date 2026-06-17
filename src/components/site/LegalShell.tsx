import type { ReactNode } from 'react'

/** Coquille éditoriale partagée par les pages légales (crème + tokens --syb-*). */
export function LegalShell({
  eyebrow,
  titleTop,
  titleAccent,
  children,
}: {
  eyebrow: string
  titleTop: string
  titleAccent: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen pt-28 pb-24" style={{ background: 'var(--syb-cream)' }}>
      <article className="max-w-[760px] mx-auto px-6 md:px-8">
        <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: 'var(--syb-rust)' }}>
          <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
          {eyebrow}
        </div>
        <h1
          className="font-display font-black leading-none mb-10"
          style={{ fontSize: 'clamp(34px, 5vw, 56px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}
        >
          {titleTop}<br />
          <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>{titleAccent}</em>
        </h1>

        {children}

        <p className="mt-12 text-sm" style={{ color: 'var(--syb-stone-light)' }}>
          Dernière mise à jour :{' '}
          {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
        </p>
      </article>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="font-display font-bold mb-3" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>
        {title}
      </h2>
      <div
        className="text-sm font-light leading-relaxed [&_a]:underline [&_a]:underline-offset-2"
        style={{ color: 'var(--syb-stone)', lineHeight: 1.8 }}
      >
        {children}
      </div>
    </section>
  )
}
