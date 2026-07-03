import type { MetadataRoute } from 'next'

const BASE = 'https://solyb.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Pages principales — priorité haute, mises à jour fréquentes
  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/facturation-electronique`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/resagp`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contact`,                    lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ]

  // Blog — index + articles
  const blog: MetadataRoute.Sitemap = [
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/blog/facturation-electronique-2026-guadeloupe`, lastModified: new Date('2026-06-17'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/prix-site-web-guadeloupe`,                 lastModified: new Date('2026-05-12'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog/application-web-vs-site-web-guadeloupe`,   lastModified: new Date('2026-04-22'), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Pages légales — priorité basse
  const legal: MetadataRoute.Sitemap = [
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/confidentialite`,  lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/cgv`,              lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  return [...core, ...blog, ...legal]
}
