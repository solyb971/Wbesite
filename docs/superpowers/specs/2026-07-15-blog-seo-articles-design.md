# Blog SEO — 3 nouveaux articles (2026-07-15)

## Objectif
Renforcer le référencement de solyb.fr avec du contenu utile, sans promotion directe des services. Mention de SolYB uniquement en conclusion, naturelle.

## Articles
1. `etre-visible-sur-google-guadeloupe` — « Être visible sur Google en Guadeloupe : le guide de la fiche d'établissement ». Rubrique **Guides**. Requêtes : référencement Google Guadeloupe, fiche Google entreprise. Contenu : créer/optimiser Google Business Profile, avis, photos, horaires, erreurs courantes.
2. `site-invisible-sur-google-raisons` — « Mon site n'apparaît pas sur Google : les 7 vraies raisons ». Rubrique **Guides**. Checklist vérifiable (indexation, Search Console, domaine neuf, robots/noindex, contenu, concurrence, patience).
3. `restaurant-guadeloupe-clients-google` — « Restaurateurs en Guadeloupe : vos clients vous cherchent avant d'atterrir ». Nouvelle rubrique **Secteurs**. Angle touristes/croisiéristes qui recherchent avant le séjour.

## Format (identique aux 3 articles existants)
- Page TSX autonome dans `src/app/(public)/blog/<slug>/page.tsx` (~300 lignes), metadata complètes (title, description, canonical, OG).
- `opengraph-image.tsx` par article via `renderBlogOg` (`src/lib/blog-og.tsx`).
- Tags dans `src/lib/blog-meta.ts`.
- Carte sur l'index `/blog` + entrée sitemap (date 2026-07-15).
- Encadrés : puces accent-dot uniformes (règle établie PR #78).
- Chiffres vérifiés, ton factuel, pas d'invention.

## Hors scope
- Pas de CMS ; pas de refonte de l'index blog au-delà de l'ajout des cartes/rubrique « Secteurs ».
