# Audit Animation — SolYB.fr
> Mis à jour le 30 mai 2026 · Build ✓ · 79+ éléments `.reveal` · 8 systèmes V2 implémentés

---

## 1. Système d'animation complet

| Type | Mécanisme | Durée / Easing | Mobile |
|------|-----------|----------------|--------|
| **Scroll Reveal** | `.reveal → .visible` IntersectionObserver | 0.9s `cubic-bezier(0.16,1,0.3,1)` stagger 80ms | ✅ |
| **Split Text H1** | `.split-char` par mot (whitespace-nowrap) stagger | 0.55s `cubic-bezier(0.22,1,0.36,1)` | ✅ |
| **TypewriterWord** | Frappe lettre par lettre + curseur clignotant | 80ms/lettre, curseur 0.7s step-end | ✅ fallback immédiat |
| **Counter** | RAF quartic-out (StatsSection) | 1600ms | ✅ |
| **3D Tilt** | `perspective(900px) rotateX/Y`, lerp JS | 0.55s `cubic-bezier(0.23,1,0.32,1)` | ❌ désactivé (hover: none) |
| **Cursor Lag** | RAF lerp 0.12 ring | continu | ❌ désactivé (hover: none) |
| **SplashScreen** | Logo "SYB" → réduit vers nav via getBoundingClientRect | 2.1s séquencé | ❌ désactivé (hover: none) |
| **Constellations** | Canvas RAF 80 particules + connexions | continu | ❌ désactivé (hover: none) |
| **Btn Fill** | `.btn-studio::before` translateX | 0.35s `cubic-bezier(0.76,0,0.24,1)` | ✅ |
| **Card Elevation** | `.card-elevation` box-shadow multi-plan + translateY(-6px) | 0.4s `cubic-bezier(0.23,1,0.32,1)` | ✅ |
| **Card Shadow** | `.card-shadow` box-shadow seulement (tilt cards) | 0.4s | ✅ |
| **Nav Hide/Show** | `translateY(-110%)` scroll down | 0.5s `cubic-bezier(0.76,0,0.24,1)` | ✅ |
| **Nav Underline** | `after:w-0 → after:w-full` hover | 0.3s | ✅ |
| **Nav Click Anims** | ripple/flash/burst/bloom/pulse par section | animate-ping/pulse Tailwind | ✅ |
| **Mobile Menu** | `max-h-0 → max-h-[500px]` + opacity | 0.3s ease-in-out | ✅ |
| **Liquid Wipe** | clip-path 4 phases | 0.5s par phase | ✅ |
| **Ticker** | `translateX(-50%)` infini | 25s linear | ✅ |
| **Ticker Pause** | `animation-play-state: paused` hover | — | N/A |
| **Grain** | `translate` shift steps(2) | 0.12s infini | ✅ |
| **Mesh Float** | `scale + translate` 3 blobs Hero | 9/12/15s alternate | ✅ (CSS only) |
| **Sun Spin** | `rotate(360deg)` SVG Hero | 120s linear | ✅ (CSS only) |
| **Barre verticale grow** | `borderGrow scaleY(0→1)` | 1.2s delay 200ms | ❌ hidden lg:block |
| **Border Grow** | `scaleY(0→1)` bordure bio About | 1.2s delay 0.6s | ✅ |
| **Float** | `translateY(-6px)` alternate | 3-6s ease-in-out | ✅ |
| **Skills Stagger** | `.skill-reveal → visible` IntersectionObserver | stagger 30ms | ✅ |
| **Connection Line** | `scaleX(0→1)` Process | 1.4s delay 0.4s | ❌ hidden lg:block |
| **Process Border Draw** | SVG `stroke-dashoffset` séquentiel | 800ms par card, chain 1400ms | ✅ |
| **Process Content Reveal** | `processContentReveal` opacity+translateY | 400ms | ✅ |
| **Success Bounce** | `successBounce scale(0→1.2→0.9→1)` | 0.6s | ✅ |
| **Hover Lift** | `hover:-translate-y-1` / card-elevation | 300-400ms | ✅ |
| **Hover Scale** | `hover:scale-105/110` | Tailwind | ✅ |
| **Hover Border** | `hover:border-coral/XX` | Tailwind | ✅ |
| **Hover Arrow** | `group-hover:translate-x-1` | 150ms | ✅ |
| **Hover Icon** | `group-hover:scale-110 rotate-6` | 300ms | ✅ |
| **Hover Underline Link** | `after:w-0 → after:w-full` | 300ms | ✅ |
| **Accent Bar Draw** | `scale-x-0 → scale-x-100` hover | 500ms | ✅ |
| **Accordion** | `max-h-0 → max-h-[500px]` | 300ms | ✅ |
| **Pulse dot** | `animate-pulse` / `animate-ping` | Tailwind infini | ✅ |

---

## 2. Audit section par section — ÉTAT FINAL

### 🔴 = absent · 🟡 = partiel · 🟢 = animé

---

### GLOBAL
| Élément | État | Note |
|---------|------|------|
| Grain overlay | 🟢 | `grainShift` 0.12s |
| Constellations canvas | 🟢 | 80 particles + connexions, désactivé mobile |
| SplashScreen "SYB" | 🟢 | 1×/session, fly vers nav, désactivé mobile |
| Custom cursor dot + ring | 🟢 | RAF lerp, désactivé mobile |
| Liquid Wipe | 🟢 | clip-path 4 phases |
| Scrollbar 3px coral | 🟢 | stylisé |
| ScrollReveal (79 éléments) | 🟢 | |

---

### URGENCY BANNER
| Élément | État | Note |
|---------|------|------|
| Dot pulse | 🟢 | |
| Texte slide-in | 🔴 | nice to have |

---

### NAVIGATION
| Élément | État |
|---------|------|
| Hide/show au scroll | 🟢 |
| Active section highlight | 🟢 |
| Hover underline links | 🟢 |
| CTA hover scale | 🟢 |
| Mobile menu slide max-h | 🟢 |
| Logo hover opacity | 🟢 |
| `id="nav-logo-ref"` pour SplashScreen | 🟢 |
| Click animations (5 variantes couleur) | 🟢 |

---

### HERO
| Élément | État | Note |
|---------|------|------|
| H1 split-char par **mot** (word-safe) | 🟢 | `whitespace-nowrap` par mot |
| TypewriterWord "digital" | 🟢 | frappe + curseur clignotant |
| Mesh float blobs (9/12/15s) | 🟢 | |
| Soleil SVG rotation 120s | 🟢 | |
| Barre verticale `borderGrow` | 🟢 | `hidden lg:block` |
| Subtitle `.reveal` | 🟢 | |
| CTAs `.reveal` | 🟢 | |
| Stats 1-col mobile / 3-col sm+ | 🟢 | `grid-cols-1 sm:grid-cols-3` |
| Trust line `.reveal` | 🟢 | |
| Scroll indicator `scrollDrop` | 🟢 | `hidden sm:flex` |
| H1 taille responsive | 🟢 | `text-4xl sm:5xl md:7xl lg:8xl` |

---

### TICKER
| Élément | État |
|---------|------|
| Défilement 25s | 🟢 |
| Pause au hover | 🟢 |
| Fade edges | 🟢 |

---

### STATS SECTION
| Élément | État |
|---------|------|
| CountUp RAF quartic-out | 🟢 |
| Hover underline width | 🟢 |
| `.reveal` + stagger 120ms sur colonnes | 🟢 |

---

### SERVICES
| Élément | État |
|---------|------|
| Section label `.reveal` | 🟢 |
| Header `.reveal` | 🟢 |
| Cards 3D tilt | 🟢 |
| `.card-shadow` (tilt compat) | 🟢 |
| Tilt glow radial | 🟢 |
| CTA ArrowRight hover | 🟢 |
| Featured card pulse dot | 🟢 |
| `.btn-studio` | 🟢 |

---

### FACTURATION ÉLECTRONIQUE
| Élément | État |
|---------|------|
| Header `.reveal` | 🟢 |
| 3 step cards `.reveal` + `.card-elevation-solar` | 🟢 |
| Bloc "Êtes-vous concerné" `.reveal` + `.card-shadow` | 🟢 |
| 7 sector cards `.reveal` stagger + `.card-shadow` | 🟢 |
| Bloc sanctions `.reveal` | 🟢 |
| "Ce qui ne change pas" `.reveal` | 🟢 |
| Bloc différenciateur `.reveal` + `.card-shadow` | 🟢 |
| CTA `.btn-studio.btn-solar` | 🟢 |

---

### PRICING (TARIFS)
| Élément | État |
|---------|------|
| Header `.reveal` | 🟢 |
| Cards `.reveal` + `.card-elevation` | 🟢 |
| Business CTA `.btn-studio` | 🟢 |
| Info cards `.reveal` + `.card-elevation` + icon hover | 🟢 |
| Bottom CTA ArrowRight hover | 🟢 |

---

### TRUST BADGES
| Élément | État |
|---------|------|
| Header `.reveal` | 🟢 |
| Badge cards `.reveal` + `.card-elevation` stagger | 🟢 |
| Icons `group-hover:scale-110 rotate-6` | 🟢 |

---

### PROCESS
| Élément | État |
|---------|------|
| Section label `.reveal` | 🟢 |
| Header `.reveal` | 🟢 |
| **Border draw SVG séquentiel** (chain 1400ms × 4) | 🟢 |
| **Content reveal** `processContentReveal` par card | 🟢 |
| `.card-elevation` sur cards | 🟢 |
| Connection line `scaleX 0→1` | 🟢 |
| CTA `.reveal` + `.btn-studio` | 🟢 |

---

### SOLUTIONS
| Élément | État |
|---------|------|
| Header `.reveal` | 🟢 |
| Cards `.reveal` stagger + `.card-elevation` | 🟢 |
| Icon `group-hover:scale-110` | 🟢 |
| Bottom note `.reveal` | 🟢 |

---

### ABOUT
| Élément | État |
|---------|------|
| Section label + watermark `.reveal` | 🟢 |
| Header `.reveal` | 🟢 |
| YACINE watermark `float 6s` | 🟢 |
| Bio `.reveal` | 🟢 |
| Bio border-left `borderGrow` | 🟢 |
| Skills stagger `skill-reveal` × 9 | 🟢 |
| Stat cards `.card-elevation` | 🟢 |
| Value cards `.card-elevation` | 🟢 |
| Quote `.reveal` + `.card-shadow` | 🟢 |

---

### RÉALISATIONS
| Élément | État |
|---------|------|
| Header `.reveal` | 🟢 |
| Cards `.reveal` stagger + `.card-elevation` | 🟢 |
| Image `group-hover:scale-105` | 🟢 |
| Overlay opacity hover | 🟢 |
| Accent bar `scaleX 0→1` hover | 🟢 |
| ComingSoonCard `.reveal` + `.card-elevation` | 🟢 |

---

### FAQ
| Élément | État |
|---------|------|
| Header icon `float 3s` | 🟢 |
| Header `.reveal` | 🟢 |
| Items `.reveal` stagger + `.card-shadow` | 🟢 |
| Accordion `max-h` transition | 🟢 |
| ChevronDown `rotate-180` | 🟢 |
| CTA `.btn-studio` | 🟢 |

---

### CONTACT
| Élément | État |
|---------|------|
| Header `.reveal` | 🟢 |
| Left column `.reveal` + `.card-elevation` | 🟢 |
| Right column `.reveal` | 🟢 |
| Info items icon hover scale | 🟢 |
| Zone / Trust cards `.card-shadow` | 🟢 |
| Form progress bar transition | 🟢 |
| Input focus ring | 🟢 |
| **Success CheckCircle `successBounce`** | 🟢 |
| Zone pills stagger | 🔴 low priority |

---

### FOOTER
| Élément | État |
|---------|------|
| 4 colonnes `.reveal` stagger | 🟢 |
| Bottom `.reveal` | 🟢 |
| Nav links hover underline | 🟢 |
| Logo hover opacity | 🟢 |
| Expert local dot pulse | 🟢 |

---

### WHATSAPP BUTTON
| Élément | État |
|---------|------|
| Pulse ring `animate-ping` | 🟢 |
| Hover scale-110 | 🟢 |
| Tooltip dark theme | 🟢 |
| Chat box dark theme | 🟢 |
| Toggle icon `rotate-90` | 🟢 |
| Bouton coral | 🟢 |

---

## 3. Optimisations mobile — état

| Élément | Comportement mobile |
|---------|-------------------|
| Custom cursor | ❌ désactivé `(hover: none)` |
| Constellations canvas | ❌ désactivé `(hover: none)` |
| SplashScreen | ❌ désactivé `(hover: none)` |
| Tilt 3D cards | ❌ inactif (mouseMove only) |
| Barre déco hero | ❌ `hidden lg:block` |
| Annotation "971" | ❌ `hidden lg:block` |
| Connection line Process | ❌ `hidden lg:block` |
| Scroll indicator hero | ❌ `hidden sm:flex` |
| Split-char H1 | ✅ word-safe (`whitespace-nowrap` par mot) |
| Stats Hero grid | ✅ `grid-cols-1 sm:grid-cols-3` |
| H1 taille | ✅ `text-4xl → sm:5xl → md:7xl → lg:8xl` |
| Scroll reveal | ✅ fonctionne sur touch |
| Nav mobile menu | ✅ slide max-h animé |
| Card elevation | ✅ shadow visible, hover transform inactif sur touch |
| `prefers-reduced-motion` | ✅ toutes animations décoratives désactivées |

---

## 4. Ce qui reste — résiduel minimal

| Élément | Fichier | Priorité |
|---------|---------|----------|
| Zone pills stagger Contact | `Contact.tsx` | 🔴 low |
| UrgencyBanner slide-in | `UrgencyBanner.tsx` | 🔴 low |
| AnimatedText sur textes de cards | Divers | 🔴 low (composant créé, usage optionnel) |
| Services icon box hover | `Services.tsx` | 🔴 low |

---

## 5. Budget performance — état final

| Catégorie | Animations | Mode desktop | Mode mobile |
|-----------|-----------|-------------|------------|
| **Always-on lourdes** | Constellations RAF, Cursor RAF | Actives | ❌ désactivées |
| **Always-on légères** | Grain, Ticker, Mesh Float, Sun Spin, Float × 2 | Actives | Actives (CSS only) |
| **Triggered scroll** | 79+ reveals, skills, borders draw, CountUp | One-shot | One-shot |
| **Triggered hover** | Tilt, btn-studio, card-elevation, icon, accent bar | Actives | Inactives (no hover) |
| **One-shot session** | SplashScreen | 1×/session | ❌ désactivé |

**Budget always-on desktop** : 2 RAF lourds (canvas + cursor) + CSS légers — dans les limites.
**Budget always-on mobile** : CSS only — compositor uniquement, aucun JS continu.

### Règles actives
- `transform + opacity` uniquement — zéro layout/paint
- `prefers-reduced-motion` : animations décoratives désactivées
- `(hover: none)` : cursor, canvas, splash désactivés
- `will-change: transform` uniquement sur cursor dot/ring et tilt cards
- `pointer-events: none` sur tous les overlays

---

## 6. Récapitulatif couverture finale

| Métrique | Avant V1 | Après V1 | Après V2 |
|----------|----------|----------|----------|
| `.reveal` éléments | 21 | 79 | 79+ |
| Sections sans animation | 6 | 0 | **0** |
| Animations continues desktop | 4 | 8 | **10** |
| Animations continues mobile | 4 | 4 | **4** (CSS only) |
| Nouveaux `@keyframes` | 3 | 8 | **15** |
| Composants avec card-elevation | 0 | 0 | **11** (54 cards) |
| Systèmes "signature" | 0 | 0 | **6** (canvas, splash, typewriter, elevation, nav-anim, border-draw) |
| Problèmes mobile | — | 2 | **0** |
