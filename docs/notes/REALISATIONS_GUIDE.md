# Guide — Ajouter une réalisation sur SolYB

Ce document explique comment ajouter ou modifier un projet dans la section Réalisations du site.
Tout se passe dans un seul fichier de données — pas de code à toucher.

---

## Fichier de données

**Chemin :** `src/lib/realisations-data.ts`

C'est ici que tu ajoutes chaque nouveau projet. La structure est simple et commentée.

---

## Modèle d'une réalisation

```typescript
{
  id: "nom-unique-du-projet",        // identifiant unique, sans espaces ni accents
  title: "Site vitrine — Mon Client", // titre affiché sur la carte
  client: "Mon Client",              // nom du client ou du projet
  category: "vitrine",               // voir les catégories ci-dessous
  sector: "Coiffure",                // secteur d'activité du client
  year: 2025,                        // année de livraison
  description: "...",                // 1-2 phrases max, ce que tu as fait et l'impact
  image: "/realisations/nom-fichier.jpg", // chemin vers l'image (voir section Images)
  tags: ["SEO local", "Responsive"], // 2 à 4 tags max (voir liste recommandée)
  url: "https://...",                // lien vers le site en production (optionnel)
  featured: true,                    // true = apparaît sur la homepage (3 max)
}
```

---

## Catégories disponibles

| Valeur        | Libellé affiché      | Couleur   |
|---------------|----------------------|-----------|
| `"vitrine"`   | Site vitrine         | Coral     |
| `"ecommerce"` | E-commerce           | Solar     |
| `"app"`       | Application métier   | Turquoise |
| `"facturation"` | Facturation élec. | Coral     |

---

## Tags recommandés

Utilise ces tags pour rester cohérent. Tu peux en créer de nouveaux si nécessaire.

**SEO & visibilité**
- `SEO local`
- `Google My Business`
- `Référencement Guadeloupe`

**Technique**
- `Responsive`
- `Next.js`
- `WordPress`
- `Paiement en ligne`
- `Gestion de stock`
- `Espace client`
- `Multi-langue`

**Contexte**
- `Guadeloupe`
- `Marie-Galante`
- `Saint-Martin`
- `Livraison DOM`

---

## Images — règles à suivre

**Dossier :** `public/realisations/`

**Nommage :** `nom-du-projet.jpg` (minuscules, tirets, pas d'espaces)
Exemple : `coiffure-marie-guadeloupe.jpg`

**Format recommandé :** JPG ou WebP
**Dimensions :** 1200 × 800 px minimum (ratio 3:2)
**Poids max :** 300 Ko (compresse sur [squoosh.app](https://squoosh.app) si nécessaire)

**Que mettre comme image ?**
- Option 1 : screenshot de la homepage du site livré (le plus simple)
- Option 2 : mockup du site sur un MacBook ou iPhone (plus professionnel)
- Option 3 : visuel personnalisé si le site n'est pas encore en ligne

---

## Ajouter un projet — étapes concrètes

### 1. Prépare l'image
- Fais un screenshot de la homepage du site livré
- Redimensionne à 1200 × 800 px
- Compresse si nécessaire
- Nomme le fichier : `nom-projet.jpg`
- Copie-le dans `public/realisations/`

### 2. Ouvre le fichier de données
```
src/lib/realisations-data.ts
```

### 3. Ajoute ton projet dans le tableau
Copie ce modèle et remplis les champs :

```typescript
{
  id: "coiffure-marie",
  title: "Site vitrine — Coiffure Marie",
  client: "Coiffure Marie",
  category: "vitrine",
  sector: "Beauté & bien-être",
  year: 2025,
  description: "Site vitrine avec galerie photos et prise de rendez-vous en ligne. Référencement local ciblé Pointe-à-Pitre.",
  image: "/realisations/coiffure-marie.jpg",
  tags: ["SEO local", "Responsive", "Guadeloupe"],
  url: "https://coiffure-marie.gp",
  featured: false,
},
```

### 4. Vérifie
Lance le site (`npm run dev`) et visite `/realisations` pour voir le résultat.

---

## Mettre un projet en avant sur la homepage

La homepage affiche au maximum **3 projets** (les plus récents avec `featured: true`).

Pour mettre un projet en avant :
```typescript
featured: true,
```

Pour le retirer de la homepage sans le supprimer :
```typescript
featured: false,
```

---

## Exemple complet — fichier `realisations-data.ts`

```typescript
export type Realisation = {
  id: string
  title: string
  client: string
  category: "vitrine" | "ecommerce" | "app" | "facturation"
  sector: string
  year: number
  description: string
  image: string
  tags: string[]
  url?: string
  featured?: boolean
}

export const realisations: Realisation[] = [
  {
    id: "boulangerie-karukera",
    title: "E-commerce — Boulangerie Karukera",
    client: "Boulangerie Karukera",
    category: "ecommerce",
    sector: "Alimentaire",
    year: 2025,
    description: "Boutique en ligne avec commande à emporter et livraison sur Grande-Terre. Paiement sécurisé intégré.",
    image: "/realisations/boulangerie-karukera.jpg",
    tags: ["Paiement en ligne", "Livraison DOM", "Responsive"],
    url: "https://boulangerie-karukera.gp",
    featured: true,
  },
  {
    id: "cabinet-conseil-abymes",
    title: "Application métier — Cabinet de conseil",
    client: "Cabinet XYZ",
    category: "app",
    sector: "Services B2B",
    year: 2026,
    description: "Espace client sécurisé avec gestion de dossiers et signature électronique de devis.",
    image: "/realisations/cabinet-conseil.jpg",
    tags: ["Espace client", "Guadeloupe", "Next.js"],
    featured: true,
  },
]
```

---

## Ce qu'il ne faut pas mettre

- Un projet sans permission explicite du client
- Une description de plus de 2 phrases (trop long pour une carte)
- Plus de 4 tags par projet (ça perd de la lisibilité)
- Une image floue, trop petite ou trop lourde

---

## Checklist avant de publier un nouveau projet

- [ ] L'image est dans `public/realisations/` et fait moins de 300 Ko
- [ ] Le `id` est unique dans le tableau
- [ ] La description fait 1-2 phrases
- [ ] Maximum 4 tags
- [ ] L'URL est vérifiée (le site est bien en ligne)
- [ ] Si `featured: true`, il y a au maximum 3 projets featured au total
