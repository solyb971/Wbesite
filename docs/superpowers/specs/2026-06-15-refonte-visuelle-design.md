# Refonte visuelle SolYB — Spec de design

**Date :** 2026-06-15
**Base :** `2026-06-15-audit-graphique-refonte.md`
**Ampleur retenue :** *Monter en gamme* — affiner la DA éditoriale + système de tokens + micro-interactions soignées.
**Contrainte images :** captures de projets uniquement (pas de photo perso/studio). Hero et À propos conçus **sans photographie**.
**Contrainte technique :** l'admin (`/admin`) utilise une palette `primary` bleue distincte → toute modif de `globals.css` / `tailwind.config.ts` doit être **testée sur `/admin`**.

---

## 1. Objectif

Le site a une bonne direction artistique (éditorial, Fraunces + crème chaud + terre cuite) mais une exécution qui fait « non terminé » : placeholders gris vides, emoji, boutons flottants qui se chevauchent. Cette refonte **comble les trous d'exécution et monte en gamme**, sans changer le registre.

---

## 2. Système de design (tokens)

> Aujourd'hui les valeurs sont en `style={{…}}` inline, dispersées. On les centralise en **CSS variables** dédiées au site public (préfixe `--syb-`) dans `globals.css`, et on expose les couleurs de marque dans `tailwind.config.ts`. **On ne touche pas** aux variables `primary`/`hsl(var(--…))` de l'admin.

### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `--syb-cream` | `#F5F2ED` | Fond clair principal |
| `--syb-ink` | `#0E0D0B` | Texte titres |
| `--syb-stone` | `#7A7268` | Texte courant |
| `--syb-stone-light` | `#B0A89E` | Labels, méta |
| `--syb-rust` | `#C4472A` | Accent principal |
| `--syb-rust-light` | `#E8845F` | Accent sur fond sombre |
| `--syb-dark` | `#1a1410` | Fonds sombres (hero, panneaux) |
| `--syb-dark-soft` | `#2a2420` | Surface sombre secondaire |
| `--syb-gold` | `#B8862F` | Accent facturation (conservé, isolé) |

**Nettoyage :** la palette fantôme `turquoise / violet / rose / lime / sky` de `tailwind.config.ts` est supprimée **après vérification** qu'aucun composant ne la référence (grep préalable). Si utilisée, on garde uniquement ce qui sert.

### Typographie
- Titres : **Fraunces** — `900` (black) pour les mots forts, `300 italic` pour l'accent rust.
- Corps : **DM Sans** — `300/400/500`.
- Échelle titres fluide : `clamp()` conservé, harmonisée en tokens (`--syb-h1`, `--syb-h2`, `--syb-h3`).
- Labels de section : uppercase, `letter-spacing 2-3px`, rust, précédés d'un filet.

### Radius / ombres / motion
- Radius : `4px` (boutons), `8px` (cartes).
- Ombres : **subtiles** — jamais `opacity > 0.5`.
- Motion (inchangé, validé) : reveal `translateY 22px`, `≥1.1s`, `cubic-bezier(0.22,1,0.36,1)` ; hover cartes `translateY` max `-4px` ; tilt `±8°` ; ticker toujours animé.

---

## 3. Décisions par section

### 3.1 Hero — **direction C : dark premium inversé**
- Remplace le split 50/50 avec panneau photo vide par un **hero plein, fond `--syb-dark`** avec lueur radiale rust (`radial-gradient` en haut-droite).
- Titre Fraunces crème (`Votre entreprise` + `en ligne.` en italique `--syb-rust-light`).
- Sous-titre `--syb-stone` clair, tag « Agence digitale locale », CTA rust + lien secondaire.
- **Mobile :** plus de panneau qui disparaît → le fond sombre occupe tout l'écran, contenu centré verticalement, padding top corrigé (fini le grand vide).
- Enchaînement : hero sombre → ticker sombre (déjà là) → corps clair. Cohérent.

### 3.2 Ticker
- Conservé (défile toujours). Harmonisé avec les tokens dark.

### 3.3 Services — **direction B : barre d'accent + tag catégorie**
- Bloc image gris **supprimé**.
- 3 cartes : filet de couleur en tête (rust / rust-light / brun rust), étiquette uppercase (« Le plus demandé », « Vente en ligne », « Sur mesure »), titre Fraunces, description, pied (« Sur devis » + flèche rust).
- Tilt `±8°` + glow directionnel conservés (validés).

### 3.4 Facturation électronique 2026
- Bandeau conservé, accent `--syb-gold` (seul endroit où le doré vit). Cohérence des tokens.

### 3.5 Stats
- Bloc rust plein conservé (point fort). Retirer le watermark « 971 » résiduel (cohérence : pas de chiffres fantômes en fond).

### 3.6 Process — **icônes direction A : grands chiffres serif**
- Emoji `🤝📋🎨🛟` **supprimés**, remplacés par les numéros d'étape `01–04` en Fraunces rust.
- ⚠️ **Réserve notée :** Yacine n'est pas convaincu par la section Process en l'état. La présente refonte applique a minima A (retire les emoji). **La structure de la section pourra être repensée dans un second temps** (hors périmètre de ce spec, à rebrainstormer si souhaité).

### 3.7 Outils clés (ResaGP / FactuGP)
- Conservé. Harmonisation tokens + cohérence des cartes avec le nouveau style Services.

### 3.8 À propos — **direction B : manifeste centré**
- Carré gris **supprimé**.
- Phrase forte centrée en gros Fraunces (« Une agence locale qui *livre vraiment* — du premier échange à la mise en ligne ») + 3 chiffres clés (`5+` ans, `14j` livraison, `971` Guadeloupe).
- Pas de blockquote signé (règle validée).

### 3.9 Réalisations — **direction A : étude de cas unique**
- Case « Votre projet ici » **supprimée**.
- Mise en avant unique de **Liberty Drive Serenity** : grand visuel réel (`public/realisations/liberty-drive-serenity.png` capturé depuis le site live + `lds.jpg` existant), méta « Transport & Santé », tags (« Site vitrine », « App réservation »), description, lien « Voir le projet ».
- Honnête et premium pour un studio qui démarre (qualité > quantité). Structure extensible quand d'autres projets arriveront.

### 3.10 FAQ
- Accordéon conservé, harmonisé aux tokens.

### 3.11 Contact
- Formulaire conservé (déjà propre). Harmonisation tokens.

### 3.12 Boutons flottants — **fix**
- WhatsApp + Crisp ne doivent plus se chevaucher ni masquer le contenu.
- Empilement vertical avec espacement défini, position cohérente, **z-index** maîtrisé, et offset pour ne pas couvrir les CTA (notamment « Voir les services » en mobile).

---

## 4. Périmètre

**Inclus :** page d'accueil publique (toutes sections ci-dessus), tokens `globals.css` + `tailwind.config.ts` (couleurs marque), composants `src/components/site/*` concernés, fix flottants, fix hero mobile, nettoyage palette fantôme.

**Exclus :** refonte structurelle de la section Process (réserve notée 3.6), pages secondaires (`/tarifs`, `/services`, landings dédiées) — à traiter ensuite si souhaité, **tout l'admin** (`/admin`).

---

## 5. Risques & garde-fous

1. **Casser l'admin** via `globals.css` → tokens préfixés `--syb-`, ne pas toucher aux variables `hsl(var(--…))`/`primary`. Tester `/admin` après chaque modif CSS globale.
2. **Suppression palette fantôme** → grep préalable obligatoire ; ne retirer que le non-référencé.
3. **Régression mobile** → vérifier hero + flottants sur 390px après refonte.
4. **Cohérence dark/clair** → contrôler le contraste du texte crème sur dark (accessibilité).

---

## 6. Décisions validées (récap)

| Section | Choix |
|---|---|
| Hero | C — dark premium inversé |
| Process (icônes) | A — grands chiffres serif (structure à revoir + tard) |
| Services | B — barre d'accent + tag catégorie |
| À propos | B — manifeste centré |
| Réalisations | A — étude de cas unique (Liberty Drive, visuel réel) |
| Images | captures projets uniquement, hero + à propos sans photo |
| Ampleur | monter en gamme (tokens + micro-interactions) |
