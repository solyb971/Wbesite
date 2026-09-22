# Audit Animation — SolYB.fr

> Réécrit le 20 septembre 2026, après l'élagage du code mort.
> La version précédente (30 mai 2026) décrivait ~40 « systèmes » dont la plupart
> n'étaient déjà plus montés, ou dont les composants n'existaient plus.
> **Ce fichier décrit uniquement ce qui tourne réellement.**

---

## 1. Ce qui reste — 3 keyframes, 8 classes

### Keyframes (`src/app/globals.css`)

| Keyframe | Rôle | Où |
|---|---|---|
| `fadeUp` | Montée douce à l'apparition | Reveal au scroll |
| `float` | Oscillation verticale lente | Éléments décoratifs |
| `pulse` | Battement d'opacité | Points de statut (badge « en ligne ») |

### Classes utilitaires (`src/app/globals.css`)

| Classe | Rôle |
|---|---|
| `.js .reveal` / `.reveal.visible` | Fade-up au scroll — **l'animation principale du site** |
| `.reveal-stagger > *` | Cascade des enfants directs |
| `.title-reveal` | Révélation des titres par masque |
| `.btn-studio` | Remplissage du bouton au survol |
| `.card-elevation` | Élévation au survol (ombre multi-plans) |
| `.service-card` | Variante de carte, section Services |
| `.cta-arrow` | Flèche qui avance au survol |
| `.admin-shell` / `.login-shell` / `.article-body` | Enveloppes de mise en page (non animées) |

---

## 2. Le mécanisme de reveal

Un seul composant pilote tout : **`src/components/site/ScrollRevealInit.tsx`**.

Il observe `.reveal`, `.reveal-stagger` et `.title-reveal` via un `IntersectionObserver`
et ajoute la classe `.visible`. Deux filets de sécurité sont en place :

1. `prefers-reduced-motion: reduce` ou `IntersectionObserver` indisponible → tout
   s'affiche immédiatement.
2. Un `setTimeout` de 3 s force l'affichage si l'observer ne s'est jamais déclenché.

L'état masqué n'est appliqué que sous le sélecteur `.js` (classe posée tôt sur `<html>`).
**Sans JavaScript, le contenu reste visible** — aucune section ne peut rester blanche.

Autres briques de mouvement, hors `globals.css` :

- `SmoothScroll.tsx` — défilement lissé (Lenis), monté via `ClientBackground`
- `ScrollProgress.tsx` — barre de progression en haut de page (`#scroll-progress`)
- `ParallaxImage.tsx` — parallaxe sur les visuels de réalisations
- `facturation.module.css` — animation `scrollX`, propre à la page facturation
- `resagp.module.css` — animations propres à la page ResaGP

---

## 3. Ce qui a été supprimé le 20/09/2026

**Composants jamais montés** (importés dans `ClientOnlyComponents.tsx` mais jamais rendus) :
`ConstellationsCanvas`, `SplashScreen`, `CustomCursor`, `ExitIntentPopup`.

**Composants orphelins** (aucune référence dans `src/`) :
`GrainOverlay`, `LiquidWipe`, `Ticker`, `TickerV3`, `AnimatedText`, `TypewriterWord`,
`ContactForm`, `ContactFormMultiStep`, `FacturationElectronique`, `FeatureStats`,
`LaunchOfferCounter`, `Process`, `StatsSection`, `Testimonials`, `TrustBadges`,
`Pricing`, `UrgencyBanner`, `LogoAnimation`, `CountUp`, `RevealSection`,
`RevenueChart`, `SourcesChart`, et la pile toast Radix inutilisée
(`toast`, `toaster`, `use-toast`) — l'application n'affiche aucun toast.

**Hooks orphelins :** `useScrollReveal`, `useEmailTemplates`, `useIsMobile`.

**CSS mort :** 13 keyframes (`blobDrift`, `borderDraw`, `borderGrow`, `fp-wIn`, `fp-wOut`,
`processContentReveal`, `scrollDrop`, `splitCharIn`, `successBounce`, `tickerScroll`,
`twGradShift`, `twUniversGlow`, `typewriterBlink`) et 9 règles
(`.split-char`, `.ticker-track`, `.ticker-track-v3`, `.splash-active`, `.tilt-card`,
`.card-shadow`, `.card-elevation-solar`, `.card-elevation-turquoise`, `.skill-reveal`),
plus le bloc `.cursor-dot` / `.cursor-ring`.

---

## 4. Règle de travail

Avant d'ajouter une animation, vérifier qu'elle ne double pas une des trois existantes.
Avant de supprimer un composant, confirmer qu'il est bien orphelin :

```bash
grep -rl "\bNomDuComposant\b" src --include=*.tsx --include=*.ts
```

Ce fichier doit être mis à jour à chaque ajout ou retrait — c'est précisément
son décalage avec le code qui l'avait rendu inutilisable.
