/**
 * Bande « manifeste » — casse délibérément le rythme des sections claires
 * (audit M1) : fond nuit + typographie surdimensionnée. Renforce le
 * positionnement « local + durable » (écho au « Mais ça tient » de À propos).
 */
export default function Manifesto() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'var(--syb-dark)' }}
    >
      {/* Lueur turquoise discrète (ancrage caraïbe) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 85% 110%, rgba(0,191,165,0.12) 0%, transparent 55%)' }}
      />
      <div className="reveal relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">
        <h2
          className="title-reveal font-display font-black"
          style={{
            fontSize: 'clamp(40px, 6.5vw, 96px)',
            letterSpacing: '-3px',
            lineHeight: 1.0,
            color: 'var(--syb-cream)',
          }}
        >
          Fait en Guadeloupe.<br />
          <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust-light)' }}>
            Pensé pour durer.
          </em>
        </h2>
      </div>
    </section>
  )
}
