# FactuGP — Charte graphique

> Système de design « **Ink / Pétrole / Sable** » — extrait de la page `/facturation-electronique` du site SolYB.
> À utiliser pour aligner l'application FactuGP sur le même rendu visuel.
> Version du document : 2026-06-18.

---

## 1. Principe

Interface sombre, sobre et institutionnelle, qui inspire confiance sur un sujet fiscal anxiogène.
Trois familles de couleur :

- **Ink** (fonds sombres bleu-vert très foncé) — la base.
- **Pétrole / teal** (accent froid) — éléments techniques, icônes, « tags ».
- **Sable / ocre** (accent chaud) — accents éditoriaux, CTA principal, mots mis en italique.

Le **sable** ne sert qu'aux moments forts (titres en italique, bouton principal, prix, rubans). Le **pétrole** porte tout le reste de la signalétique (puces, icônes, chips). Le corps de texte est sur fond sombre, en **paper** (blanc cassé chaud).

---

## 2. Couleurs

### Fonds (Ink & surfaces)
| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0A1316` | Fond principal de la page, footer |
| `--ink-soft` | `#0E1B1E` | Sections alternées, cartes de fonctionnalités |
| `--surface` | `#132226` | Cartes (tarifs, taux TVA), surfaces surélevées |
| `--surface-2` | `#182B30` | Carte mise en avant (plan recommandé) |

### Texte (Paper)
| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#F3EFE6` | Texte principal, titres |
| `--paper-dim` | `#C9C3B3` | Texte secondaire, descriptions (lede) |
| `--muted` | `#8FA39F` | Texte tertiaire, labels, mentions légales |

### Accent froid (Pétrole / teal)
| Token | Hex | Usage |
|---|---|---|
| `--petrol` | `#2E8C92` | Bordures actives, icônes pleines, surbrillance carte |
| `--petrol-2` | `#5FBDBE` | Icônes, puces, liens d'accent, « eyebrow » |
| `--petrol-deep` | `#143C3F` | Fond du bandeau défilant (ticker) |

### Accent chaud (Sable / ocre)
| Token | Hex | Usage |
|---|---|---|
| `--sand` | `#E2A565` | Accent principal : titres italiques, prix, CTA |
| `--sand-2` | `#C9824A` | Dégradé du CTA, bordure « urgent », rubans |
| `--sand-soft` | `#F0CE9C` | Variante claire (réserve) |

### Lignes / séparateurs
| Token | Valeur | Usage |
|---|---|---|
| `--line` | `rgba(243,239,230,.10)` | Bordures discrètes, séparateurs |
| `--line-strong` | `rgba(243,239,230,.18)` | Bordures plus marquées, contours d'icônes |

> **Carte « facture » (claire) :** fond `#F3EFE6` (paper), texte `#1C2421`, texte secondaire `#5C665F`, surlignage total `rgba(226,165,101,.16)`. C'est le seul bloc clair, par contraste avec le fond sombre.

---

## 3. Typographie

Trois familles (chargées via Google Fonts) :

| Rôle | Police | Token | Graisses utilisées |
|---|---|---|---|
| **Display** (titres) | **Fraunces** | `--ff-display` | 500 (italique), 600 |
| **Corps** | **Inter** | `--ff-body` | 400, 600 |
| **Données / labels** | **IBM Plex Mono** | `--ff-mono` | 400, 600 |

Caractéristiques constantes :
- Les titres `Fraunces` sont en **600**, `line-height` ~1.08–1.14, `letter-spacing: -.01em`.
- Les mots accentués sont en **italique 500** couleur `--sand` (`em` dans les titres).
- Le mono (`IBM Plex Mono`) sert à tout ce qui est « technique » : pills, eyebrows, tags, prix au m², numéros, labels de badge, footer légal — toujours `text-transform: uppercase` + `letter-spacing` 0.06–0.14em.

### Échelle typographique
| Élément | Taille | Police |
|---|---|---|
| Titre hero | `clamp(2.6rem, 5.4vw, 4.3rem)` | Fraunces 600 |
| Titre de section | `clamp(1.9rem, 4vw, 2.7rem)` | Fraunces 600 |
| Titre CTA final | `clamp(2.3rem, 5vw, 3.8rem)` | Fraunces 600 |
| Prix | `2.7rem` | Fraunces 600 |
| Stat (chiffre) | `clamp(2.2rem, 4vw, 3rem)` | Fraunces 600 |
| Lede / chapô | `1.02–1.08rem` | Inter 400, couleur `--paper-dim` |
| Corps | `0.89–0.94rem` | Inter 400 |
| Eyebrow / tag / pill | `0.68–0.72rem` uppercase | IBM Plex Mono |

### Import des polices (CSS simple)
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
```
### Import des polices (Next.js / `next/font`)
```ts
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
export const fraunces = Fraunces({ subsets:['latin'], weight:['500','600'], style:['normal','italic'], variable:'--font-fraunces' })
export const inter    = Inter({ subsets:['latin'], weight:['400','600'], variable:'--font-inter' })
export const mono     = IBM_Plex_Mono({ subsets:['latin'], weight:['400','600'], variable:'--font-mono' })
```

---

## 4. Formes, espacements, ombres

| Token | Valeur | Usage |
|---|---|---|
| `--radius-s` | `10px` | Petits éléments, icônes carrées |
| `--radius-m` | `16px` | Cartes taux/secteurs |
| `--radius-l` | `24px` | Grandes cartes, panneaux, plans |
| Boutons | `999px` | Pleinement arrondis (pilule) |
| Chips / tags | `6px` | — |
| `--container` | `1180px` | Largeur max de contenu |
| Gouttière page | `0 32px` (mobile `0 20px`) | Padding latéral du conteneur |
| Espacement section | `padding: 110px 0` | Rythme vertical |

**Ombres types :**
- CTA sable (hover) : `0 16px 32px -10px rgba(226,165,101,.45)`
- Carte facture : `0 50px 90px -24px rgba(0,0,0,.6), 0 0 0 1px rgba(0,0,0,.04)`
- Plan recommandé : `0 32px 64px -22px rgba(226,165,101,.2)`

**Lueurs radiales (ambiance) :** halos `radial-gradient` flous (`filter: blur`) en pétrole (`rgba(46,140,146,.2–.35)`) et sable (`rgba(226,165,101,.16–.18)`), placés derrière le hero, la carte facture et le CTA final.

---

## 5. Composants

### Eyebrow (sur-titre de section)
Mono, uppercase, `0.72rem`, couleur `--petrol-2` (ou `--sand` via `.eyebrowSand`), précédé d'une **puce ronde de 6px** de la couleur courante.

### Boutons
- **Principal (`.btnSand`)** : fond `linear-gradient(135deg, var(--sand), var(--sand-2))`, texte `--ink`, pilule, `padding: 14px 26px`, poids 600. Hover : `translateY(-2px)` + ombre sable.
- **Secondaire (`.btnGhost`)** : transparent, bordure `--line-strong`, texte `--paper`. Hover : bordure + texte passent en `--petrol-2`.

### Pills (hero)
Mono uppercase `0.72rem`, bordure `--line-strong`, pilule, `padding: 7px 14px`, couleur `--paper-dim`.
Variante urgente : bordure `--sand-2`, texte `--sand`.

### Cartes de fonctionnalités
Grille 3 colonnes soudées par des séparateurs `1px` (`gap:1px; background:var(--line)`), conteneur arrondi `--radius-l`. Chaque carte : fond `--ink-soft`, centrée, icône ronde Ø44 contour `--line-strong` couleur `--petrol-2`, tag mono sable, titre Fraunces, description `--paper-dim`, chips en bas.

### Chip / tag
Mono `0.66rem`, fond `rgba(255,255,255,.04)`, bordure `--line`, rayon 6px, texte `--muted`.

### Cartes « taux TVA »
Fond `--surface`, bordure `--line`, rayon `--radius-m`, padding 28px. Valeur en Fraunces `2.5rem`. Variante mise en avant : bordure `--petrol` + `box-shadow: 0 0 0 1px var(--petrol) inset`. Référence légale en mono `--muted`.
Encadré légal : filet gauche `3px solid var(--sand)`, titre mono sable uppercase.

### Cartes secteurs
Bordure `--line`, rayon `--radius-m`, centrées, icône carrée Ø40 rayon 10px. Hover : bordure `--petrol-2`, `translateY(-4px)`, fond `--surface`.

### Badges de conformité (« tampons »)
Cercle Ø74 à **bordure pointillée** `2px dashed var(--petrol-2)`, double anneau (pseudo-élément `inset:8px` bordure `--line-strong`), label mono uppercase `--paper-dim` (`white-space: pre-line` pour le retour à la ligne).
> Convention adoptée : deux groupes — **« Déjà respecté »** (pleine opacité) et **« En cours d'agrément PA »** (`opacity: .62`).

### Tarifs (plans)
Carte `--surface`, bordure `--line`, rayon `--radius-l`. Plan **recommandé** : bordure `--sand`, fond `--surface-2`, `translateY(-14px)`, ombre sable, **ruban** en haut à droite (dégradé sable, mono uppercase). Prix Fraunces `2.7rem` + suffixe `/mois` en Inter `--muted`. Liste : items séparés par `1px solid --line`, coche `--petrol-2`. Option non incluse : `--muted`, `opacity:.6`, `line-through`.

### Bandeau défilant (ticker)
Fond `--petrol-deep`, items mono `--petrol-2` uppercase, séparateur `·` en `--sand`, défilement `translateX(0 → -50%)` en boucle (42s).

### Compte à rebours
Panneau bordure `--sand-2`, rayon `--radius-l`, fond `linear-gradient(135deg, rgba(226,165,101,.08), rgba(46,140,146,.06))`. Chiffres mono sable sur pavé sombre `rgba(0,0,0,.28)`.

### Nav
Sticky, `backdrop-filter: blur(14px)`, fond `rgba(10,19,22,.74)`, filet bas `--line`. Logo Fraunces avec `GP` en italique sable + point pétrole. Liens masqués < 860px.

### Footer
Fond `--ink`, grille `2fr 1fr 1fr 1fr`. Titres de colonne mono uppercase sable. Liens `--paper-dim`, hover `--petrol-2`. Bas de page mono `--muted`.

---

## 6. Animations & accessibilité

- **Reveal au scroll** : `opacity 0 → 1`, `translateY(18px → 0)`, transition 0.7s.
- **Hover** : élévation `translateY(-2px à -4px)` + ombre/bordure d'accent.
- **Ticker** : défilement linéaire infini.
- **`prefers-reduced-motion`** : toutes les animations sont désactivées (reveal forcé visible, pas de défilement/rotation). À conserver impérativement.
- **Contraste** : `--paper` sur `--ink` et accents respectent un ratio AA. Éviter `--muted` sur `--surface` pour du texte essentiel.

---

## 7. Tokens prêts à coller

```css
:root {
  /* Fonds */
  --ink:#0A1316;
  --ink-soft:#0E1B1E;
  --surface:#132226;
  --surface-2:#182B30;
  /* Texte */
  --paper:#F3EFE6;
  --paper-dim:#C9C3B3;
  --muted:#8FA39F;
  /* Accent froid — pétrole */
  --petrol:#2E8C92;
  --petrol-2:#5FBDBE;
  --petrol-deep:#143C3F;
  /* Accent chaud — sable */
  --sand:#E2A565;
  --sand-2:#C9824A;
  --sand-soft:#F0CE9C;
  /* Lignes */
  --line: rgba(243,239,230,.10);
  --line-strong: rgba(243,239,230,.18);
  /* Formes */
  --radius-s:10px;
  --radius-m:16px;
  --radius-l:24px;
  --container:1180px;
  /* Typo */
  --ff-display: 'Fraunces', Georgia, serif;
  --ff-body: 'Inter', system-ui, sans-serif;
  --ff-mono: 'IBM Plex Mono', monospace;
}

body {
  background: var(--ink);
  color: var(--paper);
  font-family: var(--ff-body);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
```

### Snippets composants

```css
/* Bouton principal */
.btn-sand {
  display:inline-flex; align-items:center; gap:10px;
  padding:14px 26px; border-radius:999px; font-weight:600; font-size:.94rem;
  background:linear-gradient(135deg, var(--sand), var(--sand-2)); color:var(--ink);
  text-decoration:none; transition:transform .25s, box-shadow .25s;
}
.btn-sand:hover { transform:translateY(-2px); box-shadow:0 16px 32px -10px rgba(226,165,101,.45); }

/* Bouton secondaire */
.btn-ghost {
  display:inline-flex; align-items:center; gap:10px;
  padding:14px 26px; border-radius:999px; font-weight:600; font-size:.94rem;
  border:1px solid var(--line-strong); color:var(--paper);
  text-decoration:none; transition:border-color .25s, color .25s;
}
.btn-ghost:hover { border-color:var(--petrol-2); color:var(--petrol-2); }

/* Sur-titre */
.eyebrow {
  font-family:var(--ff-mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
  color:var(--petrol-2); display:inline-flex; gap:8px; align-items:center;
}
.eyebrow::before { content:''; width:6px; height:6px; border-radius:50%; background:currentColor; }

/* Titre de section */
.section-title {
  font-family:var(--ff-display); font-weight:600;
  font-size:clamp(1.9rem,4vw,2.7rem); line-height:1.14; letter-spacing:-.01em; color:var(--paper);
}
.section-title em { font-style:italic; font-weight:500; color:var(--sand); }

/* Carte standard */
.card {
  background:var(--surface); border:1px solid var(--line);
  border-radius:var(--radius-m); padding:28px;
}
```

---

## 8. Récapitulatif express (à retenir)

- **Fond :** `#0A1316` · **Texte :** `#F3EFE6`
- **Accent froid :** `#2E8C92` / `#5FBDBE` (technique, icônes, puces)
- **Accent chaud :** `#E2A565` (CTA, titres italiques, prix) — usage parcimonieux
- **Polices :** Fraunces (titres) · Inter (corps) · IBM Plex Mono (labels/données, uppercase)
- **Rayons :** 10 / 16 / 24 px · boutons en pilule
- **Ton :** sombre, sobre, institutionnel ; accents chauds réservés aux moments clés
