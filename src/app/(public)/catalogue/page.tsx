import type { Metadata } from 'next'
import { PackageSearch } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Catalogue produits',
  description: 'Découvrez notre gamme de produits.',
}

interface ProduitPublic {
  reference: string
  nom: string
  description: string | null
  categorie: string | null
  famille: string | null
  image_data: string | null
}

// Server-only : jamais exposée au navigateur. Vitrine sans prix ni stock —
// voir backend/src/controllers/publicController.js (vente-terrain-app).
const API_URL = process.env.VENTE_TERRAIN_API_URL || 'https://vente-terrain-api.onrender.com'

async function getCatalogue(): Promise<ProduitPublic[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/catalogue`, {
      next: { revalidate: 300 }, // 5 min : vitrine, pas besoin de temps réel
    })
    if (!res.ok) return []
    const json = await res.json()
    return json?.data?.produits || []
  } catch {
    return []
  }
}

function groupByCategorie(produits: ProduitPublic[]) {
  const groups: Record<string, ProduitPublic[]> = {}
  for (const p of produits) {
    const cat = p.categorie || 'Autres'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(p)
  }
  return groups
}

export default async function CataloguePage() {
  const produits = await getCatalogue()
  const groups = groupByCategorie(produits)
  const categories = Object.keys(groups).sort((a, b) => a.localeCompare(b, 'fr'))

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-3">
            Notre catalogue
          </h1>
          <p className="text-[#8B8B9E]">
            Une sélection de nos produits — contactez-nous pour les tarifs et la disponibilité.
          </p>
        </div>

        {produits.length === 0 ? (
          <div className="text-center py-20">
            <PackageSearch className="w-12 h-12 text-[#2A2A38] mx-auto mb-4" />
            <p className="text-[#8B8B9E]">Catalogue momentanément indisponible, réessayez plus tard.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <section key={cat} className="mb-14">
              <h2 className="font-display text-xl font-bold text-[#F0EDE8] mb-6 pb-3 border-b border-[#2A2A38]">
                {cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {groups[cat].map((p) => (
                  <div
                    key={p.reference}
                    className="bg-[#13131A] border border-[#2A2A38] rounded-xl overflow-hidden"
                  >
                    <div className="aspect-square bg-gradient-to-br from-coral/10 to-solar/10 flex items-center justify-center overflow-hidden">
                      {p.image_data ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image_data} alt={p.nom} className="w-full h-full object-contain p-4" />
                      ) : (
                        <PackageSearch className="w-10 h-10 text-[#2A2A38]" />
                      )}
                    </div>
                    <div className="p-4">
                      {p.famille && (
                        <div className="text-[10px] uppercase tracking-widest text-turquoise mb-1" style={{ letterSpacing: '1.5px' }}>
                          {p.famille}
                        </div>
                      )}
                      <h3 className="font-semibold text-[#F0EDE8] text-sm mb-1">{p.nom}</h3>
                      {p.description && (
                        <p className="text-xs text-[#8B8B9E] line-clamp-3">{p.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  )
}
