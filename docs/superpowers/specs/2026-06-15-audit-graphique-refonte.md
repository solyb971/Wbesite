# Audit graphique SolYB & base de refonte visuelle

**Date :** 2026-06-15
**Périmètre :** site public (`solyb.fr`) — page d'accueil, desktop + mobile
**Objectif :** établir une base factuelle pour une refonte visuelle plus aboutie, sans perdre le caractère professionnel actuel.

---

## 1. Direction artistique actuelle

Le site repose sur un parti pris **éditorial / studio** plutôt que « template SaaS ». C'est une bonne fondation à conserver.

| Élément | Valeur actuelle |
|---|---|
| Police titres | **Fraunces** (serif) — black `900` + italique `300` en accent |
| Police corps | **DM Sans** (sans-serif, weights 300/400/500) |
| Fond principal | Crème chaud `#F5F2ED` |
| Texte | Quasi-noir `#0E0D0B`, gris chaud `#7A7268` |
| Accent | Terracotta / rust `#C4472A` (et `#FF6B47` côté config) |
| Section inversée | Bloc stats en rust plein, texte crème |
| Mise en page | Asymétrique, généreuse en espaces, hero split 50/50 |

**Verdict : la direction est juste.** Chaleureuse, locale (palette « caraïbe terre cuite »), différenciante. Le problème n'est pas le style — c'est l'exécution.

---

## 2. Problèmes identifiés (par priorité)

### 🔴 Bloquants — donnent une impression « site non terminé »

1. **Placeholders d'images vides partout**
   - Hero : panneau gauche (50% écran desktop) = simple dégradé sombre, aucune vraie photo.
   - Services : bloc gris en haut de chaque carte → ressemble à une image cassée.
   - À propos : grand carré gris non rempli.
   - Réalisations : **un seul** projet réel (Liberty Drive) + une case « Votre projet ici » vide → section creuse.

2. **Icônes emoji dans la section Process** (`🤝 📋 🎨 🛟`)
   - Jurent frontalement avec la typo éditoriale. Détail le plus « cheap » du site.
   - Source : `src/components/site/Process.tsx`.

3. **Boutons flottants qui se chevauchent et masquent du contenu**
   - WhatsApp (orange) + Crisp (« N » noir) empilés en bas à gauche.
   - Sur mobile, ils recouvrent le lien « Voir les services ».

### 🟠 Importants — qualité perçue

4. **Hero mobile mal calibré** — le panneau photo disparaît, laissant un grand vide en haut avant le titre.

5. **Hiérarchie d'accent monotone** — tout l'accent passe par le même rust. Pas de second niveau de couleur/ton pour rythmer (sauf le doré du bandeau facturation, isolé).

6. **Cartes Services peu différenciées** — trois cartes quasi identiques, seul le numéro change. Peu de hiérarchie visuelle, pas de mise en avant.

### 🟡 Cohérence / dette

7. **Palette config fantôme** — `tailwind.config.ts` embarque turquoise, violet, rose, lime, sky (ancienne version). Le live n'utilise que rust/crème/dark. À nettoyer.

8. **Watermark « 971 »** réapparu en fond de la section stats (les watermarks numérotés avaient été retirés ailleurs — incohérence).

9. **Styles inline massifs** — la plupart des composants utilisent `style={{…}}` en dur plutôt que des classes/tokens. Rend toute refonte globale fastidieuse et incohérente.

---

## 3. Inventaire des sections (page d'accueil)

1. Navigation (transparente → ?) + CTA « Devis gratuit »
2. Hero split 50/50 (titre serif / panneau photo vide)
3. Ticker défilant sombre (mots-clés services)
4. Services — 3 cartes numérotées
5. Bandeau « Facturation électronique 2026 » (accent doré)
6. Stats — bloc rust plein (14j / 24h / 3 mois / 100%)
7. Process — 4 étapes (icônes emoji)
8. Outils clés — ResaGP / FactuGP
9. À propos — « Un studio guadeloupéen » + carré photo vide
10. Réalisations — 1 projet + placeholder
11. FAQ — accordéon
12. Contact — formulaire + infos
13. Footer sombre

---

## 4. Ce qu'il faut préserver (acquis validés)

> Issus des préférences déjà exprimées — à ne PAS casser lors de la refonte.

- Effets de survol cartes **subtils** : jamais `translateY < -4px`, jamais d'ombre `opacity > 0.5`.
- Tilt 3D **± 8° max** avec glow directionnel (effet « poids », pas décoratif).
- Pas de numéros de section en watermark de fond.
- Pas d'éléments géométriques orange transparents ni d'annotations latérales dans le hero.
- Animations **douces** : reveal `translateY 22px`, durée ≥ 1.1s, `cubic-bezier(0.22,1,0.36,1)`.
- Ticker toujours animé (pas de blocage `prefers-reduced-motion`).
- Pas de citation/attribution personnelle dans « À propos ».
- L'admin (`/admin`) utilise une palette `primary` bleue distincte → **toute modif de `globals.css` doit être testée sur `/admin`**.

---

## 5. Axes de refonte proposés

> Détaillés et arbitrés dans la phase de design qui suit ce document.

- **A. Affiner l'existant (recommandé)** : garder la DA éditoriale, combler les trous (vraies images / traitement assumé de l'absence d'images), remplacer les emoji par des icônes cohérentes, fixer les flottants et le hero mobile, nettoyer la dette de tokens.
- **B. Monter en gamme** : A + introduire une vraie grille de design tokens, micro-interactions plus travaillées, et un système d'images/illustrations cohérent.
- **C. Repositionnement visuel** : changer de registre (ex. plus minimal/luxe ou plus tech/dark). À ne retenir que si la DA actuelle est rejetée.

---

## 6. Questions ouvertes à trancher avant la refonte

1. **Images** : Yacine dispose-t-il de vraies photos (lui, lieu, projets) ou faut-il assumer un design sans photographie (typo + texture + couleur) ?
2. **Ampleur** : affiner l'existant (A) ou monter en gamme avec système de tokens (B) ?
3. **Réalisations** : un seul projet réel — assumer (1 cas mis en valeur) ou retravailler la section pour ne pas paraître vide ?
