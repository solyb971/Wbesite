const items = [
  "Site vitrine", "E-commerce", "Application métier",
  "Facturation électronique", "SEO local", "Guadeloupe 971",
  "Livraison 14 jours", "Support 3 mois",
]

export default function TickerV3() {
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden border-t"
      style={{ background: '#0E0D0B', padding: '0.85rem 0', borderColor: '#222' }}
    >
      <div className="flex whitespace-nowrap ticker-track-v3">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-8 flex-shrink-0"
            style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5A5650' }}
          >
            <span>{item}</span>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C4472A' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
