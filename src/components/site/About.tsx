export default function About() {
  return (
    <section
      id="apropos"
      className="py-28 md:py-36 scroll-mt-20"
      style={{ background: 'var(--syb-cream)' }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <p
          className="reveal font-medium mb-4"
          style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--syb-rust)' }}
        >
          À propos de SolYB
        </p>
        <h2
          className="reveal font-display font-black mb-4"
          style={{
            fontSize: 'clamp(30px, 4.2vw, 56px)',
            letterSpacing: '-1.5px',
            color: 'var(--syb-ink)',
            lineHeight: 1.15,
            maxWidth: '820px',
          }}
        >
          La Guadeloupe m&apos;a construit.<br />
          <span style={{ fontWeight: 900, color: 'var(--syb-rust)' }}>
            J&apos;ai envie de lui rendre la pareille.
          </span>
        </h2>
        <p
          className="reveal mb-12"
          style={{ fontSize: '14px', letterSpacing: '0.3px', color: 'var(--syb-stone-light)' }}
        >
          Fondateur — Yacine Bouhassoun · Petit-Bourg, Guadeloupe
        </p>

        <div
          className="reveal flex flex-col gap-5 text-left"
          style={{ maxWidth: '640px' }}
        >
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            Je m&apos;appelle Yacine. J&apos;ai grandi en Guadeloupe, une île magnifique, avec une
            énergie entrepreneuriale qui ne ressemble à aucune autre.
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            J&apos;ai eu l&apos;occasion de travailler dans différents corps de métier ici, et le même
            constat revenait sans cesse&nbsp;: des professionnels compétents, sérieux, reconnus sur le
            terrain — mais invisibles en ligne. Un exemple m&apos;a marqué&nbsp;: un restaurant sur la
            plage de Deshaies, plein en haute saison, quasiment vide en basse saison, au point que les
            gérants ont fini par revendre. Les repreneurs, eux, ont fait quelques travaux, rouvert dès
            la basse saison, et investi dans un vrai site bien référencé. Aujourd&apos;hui, ils
            tournent quasiment complets midi et soir même en basse saison, là où d&apos;autres
            établissements de la même plage ne font pas 40 couverts sur la semaine. Même emplacement,
            même clientèle potentielle.{' '}
            <span style={{ color: 'var(--syb-ink)' }}>La différence&nbsp;: ils ont existé sur Google.</span>
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            Et ce n&apos;est qu&apos;un exemple parmi tant d&apos;autres — j&apos;en ai vu des dizaines,
            dans tous les secteurs, où le savoir-faire ne suffit plus s&apos;il ne se voit pas en ligne.
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            C&apos;est simple&nbsp;: avant de se déplacer, on cherche en ligne. Et en Guadeloupe, qui
            accueille plus d&apos;un million de visiteurs par an — touristes de séjour et croisiéristes
            — en plus de sa clientèle locale, ne pas y être vu, c&apos;est ne pas exister. Peu importe
            la qualité du travail derrière.
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            C&apos;est pour ça qu&apos;est née SolYB&nbsp;: une agence digitale locale, à l&apos;écoute
            réelle de chaque client, qui cherche à chaque fois le meilleur compromis entre prix et
            efficacité —{' '}
            <span style={{ color: 'var(--syb-ink)' }}>pour que le savoir-faire d&apos;ici se voie enfin autant en ligne qu&apos;il le mérite.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
