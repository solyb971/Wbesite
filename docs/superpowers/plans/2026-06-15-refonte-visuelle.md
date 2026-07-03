# Refonte visuelle SolYB — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Monter en gamme la page d'accueil publique (hero dark premium, cartes Services à barre d'accent, Process sans emoji, À propos manifeste, Réalisations en étude de cas unique) via un système de tokens `--syb-*`, sans toucher à l'admin.

**Architecture :** Édition ciblée des composants `src/components/site/*` de la page d'accueil. Ajout de variables CSS de marque (`--syb-*`) dans `globals.css` (additif, ne touche pas aux variables `hsl(var(--…))` / `primary` de l'admin), adoptées par les composants réécrits via `style={{ … 'var(--syb-…)' }}`.

**Tech Stack :** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, polices Fraunces + DM Sans.

**Approche de test :** ce projet n'a **pas** de runner de tests unitaires (aucun script `test` dans `package.json`). Pour une refonte purement visuelle, la vérification se fait par : (1) `npm run build` qui passe, (2) `npm run lint` sans nouvelle erreur, (3) capture visuelle via le serveur de dev + Playwright MCP en desktop (1440px) **et** mobile (390px), (4) `/admin` toujours rendu correctement (régression CSS). Le serveur de dev tourne déjà sur http://localhost:3000.

**Décisions validées (rappel) :** Hero = C (dark premium) · Process = A (chiffres serif) · Services = B (barre d'accent + tag) · À propos = B (manifeste centré) · Réalisations = A (étude de cas unique). Hors périmètre : structure de Process (à rebrainstormer), palette fantôme (utilisée ailleurs, conservée), watermark 971 (conservé), pages secondaires, admin.

---

## Task 1 : Tokens de marque `--syb-*`

**Files:**
- Modify: `src/app/globals.css` (ajout d'un bloc `:root` additif, après les directives `@tailwind`)

- [ ] **Step 1 : Ajouter le bloc de tokens**

Ajouter ce bloc juste après la dernière directive `@tailwind …;` en tête de `src/app/globals.css`. **Ne PAS modifier** les `:root` existants ni les variables `--background`, `--foreground`, `hsl(var(--…))` (utilisées par l'admin).

```css
/* ── Tokens de marque site public (ne pas utiliser dans /admin) ── */
:root {
  --syb-cream: #F5F2ED;
  --syb-ink: #0E0D0B;
  --syb-stone: #7A7268;
  --syb-stone-light: #B0A89E;
  --syb-rust: #C4472A;
  --syb-rust-light: #E8845F;
  --syb-dark: #1a1410;
  --syb-dark-soft: #2a2420;
  --syb-gold: #B8760A;
  --syb-border: #DDD5C8;
}
```

- [ ] **Step 2 : Vérifier le build**

Run: `npm run build`
Expected: build réussi, aucune erreur CSS.

- [ ] **Step 3 : Vérifier que l'admin n'est pas cassé**

Avec le serveur de dev (http://localhost:3000), naviguer sur `/admin` via Playwright MCP et prendre une capture.
Expected: l'admin s'affiche normalement (palette bleue intacte).

- [ ] **Step 4 : Commit**

```bash
git add src/app/globals.css
git commit -m "feat(ui): tokens de marque --syb-* pour le site public"
```

---

## Task 2 : Hero — direction C (dark premium inversé)

**Files:**
- Modify: `src/components/site/Hero.tsx` (remplacement complet)

- [ ] **Step 1 : Remplacer le contenu de `Hero.tsx`**

```tsx
import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--syb-dark)' }}
    >
      {/* Lueurs rust */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 75% 25%, rgba(196,71,42,0.28) 0%, transparent 55%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 8% 92%, rgba(196,71,42,0.10) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 md:px-12 pt-32 pb-24">
        {/* Tag */}
        <div
          className="flex items-center gap-3 mb-8 text-xs tracking-[3px] uppercase"
          style={{ color: 'var(--syb-rust-light)', animation: 'fadeUp 0.6s 0.1s ease both' }}
        >
          <span className="w-6 h-px flex-shrink-0" style={{ background: 'var(--syb-rust)' }} />
          Agence digitale locale
        </div>

        {/* H1 */}
        <h1
          className="font-display font-black leading-none mb-8"
          style={{
            fontSize: 'clamp(52px, 7vw, 104px)',
            letterSpacing: '-3px',
            color: 'var(--syb-cream)',
            animation: 'fadeUp 0.7s 0.25s ease both',
          }}
          aria-label="Votre entreprise en ligne"
        >
          Votre<br />entreprise<br />
          <em
            className="italic block"
            style={{ fontWeight: 300, color: 'var(--syb-rust-light)', fontSize: '0.85em', letterSpacing: '-2px' }}
          >
            en ligne.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-light leading-relaxed mb-10 max-w-md"
          style={{ fontSize: '16px', color: '#b8ab9c', lineHeight: 1.8, animation: 'fadeUp 0.7s 0.4s ease both' }}
        >
          Sites vitrine, e-commerce et applications sur mesure pour les{' '}
          <span style={{ color: 'var(--syb-cream)' }}>TPE et PME de Guadeloupe</span>. Livré en 2–3 semaines.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-5" style={{ animation: 'fadeUp 0.7s 0.55s ease both' }}>
          <Link
            href="/#contact"
            className="inline-block text-white text-sm font-normal transition-transform hover:-translate-y-px"
            style={{ background: 'var(--syb-rust)', padding: '14px 30px', borderRadius: '4px', letterSpacing: '0.3px' }}
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/#services"
            className="flex items-center gap-1.5 text-sm font-light transition-colors hover:text-white"
            style={{ color: '#b8ab9c' }}
          >
            Voir les services →
          </Link>
        </div>

        {/* Label localisation */}
        <div className="mt-16 text-xs tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Baie-Mahault · Guadeloupe · 971
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2 : Vérifier desktop**

Via Playwright MCP : resize 1440×900, `browser_navigate` http://localhost:3000, attendre 3s, capture du hero.
Expected: hero plein écran sombre, titre crème, « en ligne. » en italique rust clair, lueur rust en haut-droite, CTA rust.

- [ ] **Step 3 : Vérifier mobile**

Via Playwright MCP : resize 390×844, recharger, capture.
Expected: pas de grand vide en haut, contenu centré verticalement, titre lisible, le bouton WhatsApp flottant (bas-gauche) ne recouvre PAS les CTA (les CTA sont hauts dans le flux). Si recouvrement constaté, le noter pour la Task 7.

- [ ] **Step 4 : Commit**

```bash
git add src/components/site/Hero.tsx
git commit -m "feat(hero): direction dark premium inversé, fix vide mobile"
```

---

## Task 3 : Services — direction B (barre d'accent + tag catégorie)

**Files:**
- Modify: `src/components/site/Services.tsx` (données + carte ; le header et la bannière facturation restent inchangés)

- [ ] **Step 1 : Remplacer le tableau `services` (haut du fichier)**

```tsx
const services = [
  {
    title: "Site Vitrine",
    tag: "Le plus demandé",
    accent: "#C4472A",
    description: "Présence en ligne professionnelle, pensée pour votre clientèle locale. Rapide, lisible sur mobile, optimisé pour Google.",
    contactParam: "vitrine",
  },
  {
    title: "E-commerce",
    tag: "Vente en ligne",
    accent: "#E8845F",
    description: "Boutique complète avec paiement sécurisé et tableau de bord simple à prendre en main.",
    contactParam: "ecommerce",
  },
  {
    title: "Application Métier",
    tag: "Sur mesure",
    accent: "#9A5A3A",
    description: "Outil sur mesure pour votre activité. Ce dont vous avez besoin, rien de plus.",
    contactParam: "application",
  },
]
```

- [ ] **Step 2 : Remplacer le bloc `{services.map(...)}` (la carte)**

Remplacer tout le contenu du `<div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">…</div>` par :

```tsx
<div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
  {services.map((s) => (
    <div
      key={s.title}
      className="group rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
      style={{ border: '0.5px solid var(--syb-border)', background: '#FFFFFF' }}
    >
      {/* Barre d'accent */}
      <div style={{ height: '4px', background: s.accent }} />

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="text-[11px] tracking-[2px] uppercase mb-4" style={{ color: 'var(--syb-stone-light)' }}>
          {s.tag}
        </div>
        <h3 className="font-display font-bold mb-2" style={{ fontSize: '22px', color: 'var(--syb-ink)' }}>
          {s.title}
        </h3>
        <p className="text-xs font-light leading-relaxed mb-5 flex-1" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>
          {s.description}
        </p>
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
          <span className="text-xs font-light" style={{ color: 'var(--syb-stone-light)' }}>
            Sur devis
          </span>
          <Link
            href={`/?service=${s.contactParam}#contact`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-transform hover:scale-110"
            style={{ background: 'var(--syb-rust)' }}
          >
            →
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
```

- [ ] **Step 3 : Vérifier desktop + mobile**

Playwright MCP : scroller jusqu'à `#services`, capture en 1440px puis 390px.
Expected: plus de bloc gris ; filet de couleur en tête (rust / rust clair / brun), étiquette uppercase, titre, description, pied avec flèche rust. 3 colonnes desktop, 1 colonne mobile.

- [ ] **Step 4 : Commit**

```bash
git add src/components/site/Services.tsx
git commit -m "feat(services): cartes à barre d'accent + tag, suppression bloc image vide"
```

---

## Task 4 : Process — icônes direction A (grands chiffres serif)

**Files:**
- Modify: `src/components/site/Process.tsx`

- [ ] **Step 1 : Remplacer le tableau `steps`**

```tsx
const steps = [
  { num: "01", title: "Échange découverte", description: "45 minutes pour comprendre votre activité, vos clients et vos objectifs.", duration: "Jour 1 · Gratuit" },
  { num: "02", title: "Devis & validation", description: "Devis clair envoyé sous 24h. Vous validez, on commence.", duration: "Jour 2" },
  { num: "03", title: "Conception & livraison", description: "Design, développement, tests. Vous validez chaque étape.", duration: "2 à 3 semaines" },
  { num: "04", title: "Support & suivi", description: "3 mois de support inclus après la mise en ligne.", duration: "3 mois inclus" },
]
```

- [ ] **Step 2 : Remplacer le contenu de la carte (`{steps.map(...)}`)**

Remplacer le `<div key={step.num} …>…</div>` complet par (supprime l'ancien « ghost number » bas-droite ET la puce emoji) :

```tsx
<div
  key={step.num}
  className="group rounded-xl p-7 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
  style={{ background: '#FFFFFF', border: '0.5px solid var(--syb-border)' }}
>
  {/* Numéro d'étape serif (visuel principal) */}
  <div
    className="font-display font-black leading-none mb-5"
    style={{ fontSize: '44px', color: 'var(--syb-rust)', lineHeight: 1 }}
  >
    {step.num}
  </div>
  <p className="text-sm font-medium mb-2" style={{ color: 'var(--syb-ink)' }}>
    {step.title}
  </p>
  <p className="text-xs font-light leading-relaxed mb-4" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>
    {step.description}
  </p>
  <p className="text-xs" style={{ color: 'var(--syb-rust)' }}>
    {step.duration}
  </p>
</div>
```

- [ ] **Step 3 : Vérifier**

Playwright MCP : scroller jusqu'à `#process`, capture 1440px.
Expected: plus aucun emoji ; chaque carte commence par un grand numéro `01–04` en Fraunces rust.

- [ ] **Step 4 : Commit**

```bash
git add src/components/site/Process.tsx
git commit -m "feat(process): remplacement emoji par chiffres serif (direction A)"
```

---

## Task 5 : À propos — direction B (manifeste centré, sans photo)

**Files:**
- Modify: `src/components/site/About.tsx` (remplacement complet)

- [ ] **Step 1 : Remplacer le contenu de `About.tsx`**

```tsx
const figures = [
  { value: "5+", label: "ans d'expérience" },
  { value: "14j", label: "livraison moyenne" },
  { value: "971", label: "Guadeloupe" },
]

export default function About() {
  return (
    <section
      id="apropos"
      className="py-28 md:py-36 scroll-mt-20"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <div
          className="reveal flex items-center justify-center gap-2.5 mb-6 text-xs tracking-[3px] uppercase"
          style={{ color: 'var(--syb-rust)' }}
        >
          <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
          À propos
        </div>

        <h2
          className="reveal font-display font-black mb-12 mx-auto"
          style={{
            fontSize: 'clamp(30px, 4.2vw, 56px)',
            letterSpacing: '-1.5px',
            color: 'var(--syb-ink)',
            lineHeight: 1.15,
            maxWidth: '780px',
          }}
        >
          Une agence locale qui{' '}
          <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>livre vraiment</em>
          {' '}— du premier échange à la mise en ligne.
        </h2>

        <div
          className="reveal grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          style={{ borderTop: '0.5px solid var(--syb-border)' }}
        >
          {figures.map((f) => (
            <div key={f.label} className="pt-8">
              <div
                className="font-display font-black leading-none mb-2"
                style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--syb-rust)' }}
              >
                {f.value}
              </div>
              <div className="text-xs font-light tracking-wide" style={{ color: 'var(--syb-stone)' }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2 : Vérifier desktop + mobile**

Playwright MCP : scroller jusqu'à `#apropos`, capture 1440px puis 390px.
Expected: plus de carré gris ; phrase forte centrée en gros serif avec « livre vraiment » en italique rust ; 3 chiffres (5+, 14j, 971) séparés par un filet en haut. Lisible et centré sur mobile.

- [ ] **Step 3 : Commit**

```bash
git add src/components/site/About.tsx
git commit -m "feat(about): manifeste centré sans photo (direction B)"
```

---

## Task 6 : Réalisations — direction A (étude de cas unique)

**Files:**
- Modify: `src/lib/realisations-data.ts` (ajout du champ `url`)
- Modify: `src/components/site/Realisations.tsx` (remplacement complet)

- [ ] **Step 1 : Ajouter l'URL du projet dans les données**

Dans `src/lib/realisations-data.ts`, ajouter la ligne `url` dans l'objet Liberty Drive (juste avant `accentColor`) :

```tsx
    image: "/realisations/lds.jpg",
    url: "https://libertydriveserenity.com/",
    accentColor: "#F59E0B",
```

- [ ] **Step 2 : Remplacer le contenu de `Realisations.tsx`**

```tsx
import Image from "next/image"
import Link from "next/link"
import { realisations } from "@/lib/realisations-data"

export default function Realisations() {
  const project = realisations[0]

  return (
    <section
      id="realisations"
      className="py-24 md:py-28 scroll-mt-20 overflow-hidden"
      style={{ background: '#E8DDD0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: 'var(--syb-rust)' }}>
              <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
              Réalisations
            </div>
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}
            >
              Un projet,<br />
              <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>livré pour de vrai</em>
            </h2>
          </div>
          <Link
            href="/#contact"
            className="text-sm font-light transition-colors hover:text-[#0E0D0B]"
            style={{ color: 'var(--syb-stone)' }}
          >
            Démarrer un projet →
          </Link>
        </div>

        {/* Étude de cas */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/11', background: '#0e0c0a', border: '0.5px solid var(--syb-border)' }}
          >
            <Image src={project.image} alt={project.client} fill className="object-cover object-top" />
          </div>
          <div>
            <div className="text-xs tracking-[2px] uppercase mb-3" style={{ color: 'var(--syb-rust)' }}>
              {project.sector}
            </div>
            <h3
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--syb-ink)', lineHeight: 1.05 }}
            >
              {project.client}
            </h3>
            <p className="text-sm font-light leading-relaxed mb-6" style={{ color: 'var(--syb-stone)', lineHeight: 1.8 }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-light rounded-full px-3 py-1"
                  style={{ border: '0.5px solid var(--syb-border)', color: 'var(--syb-stone)' }}
                >
                  {t}
                </span>
              ))}
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white text-sm font-normal transition-transform hover:-translate-y-px"
                style={{ background: 'var(--syb-rust)', padding: '12px 26px', borderRadius: '4px' }}
              >
                Voir le projet →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3 : Vérifier desktop + mobile**

Playwright MCP : scroller jusqu'à `#realisations`, capture 1440px puis 390px.
Expected: plus de case « Votre projet ici » ; une étude de cas unique — grand visuel Liberty Drive à gauche, secteur + titre + description + tags + bouton « Voir le projet » à droite. Empilé verticalement sur mobile.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/realisations-data.ts src/components/site/Realisations.tsx
git commit -m "feat(realisations): étude de cas unique Liberty Drive (direction A)"
```

---

## Task 7 : Vérification finale (build, lint, mobile flottants, admin)

**Files:** aucun (sauf ajustement conditionnel ci-dessous)

- [ ] **Step 1 : Lint**

Run: `npm run lint`
Expected: aucune nouvelle erreur introduite par les tâches précédentes.

- [ ] **Step 2 : Build de production**

Run: `npm run build`
Expected: build réussi, aucune erreur TypeScript/CSS.

- [ ] **Step 3 : Capture pleine page desktop**

Playwright MCP 1440px : parcourir toute la home (hero → contact) par paliers, captures.
Expected: cohérence d'ensemble — entrée sombre (hero) → ticker sombre → corps clair → footer sombre. Aucun bloc gris vide résiduel, aucun emoji.

- [ ] **Step 4 : Vérifier les boutons flottants sur mobile (390px)**

Playwright MCP 390px sur le hero : confirmer que le bouton WhatsApp (`fixed bottom-20 sm:bottom-6 left-6`, dans `WhatsAppButton.tsx`) ne recouvre aucun CTA du hero. (Rappel : le bouton noir « N » vu en dev est l'indicateur Next.js, absent en prod.)

Ajustement conditionnel — **seulement si** un recouvrement est constaté : dans `src/components/site/Hero.tsx`, augmenter le padding bas du conteneur (`pb-24` → `pb-32`) pour dégager l'espace. Re-capturer pour confirmer.

- [ ] **Step 5 : Vérifier l'admin (non-régression CSS)**

Playwright MCP : naviguer sur http://localhost:3000/admin, capture.
Expected: l'admin s'affiche normalement (palette bleue intacte, aucune fuite des tokens `--syb-*`).

- [ ] **Step 6 : Commit (si ajustement à la Step 4)**

```bash
git add src/components/site/Hero.tsx
git commit -m "fix(hero): padding bas mobile pour dégager le bouton flottant"
```

---

## Self-Review (couverture du spec)

- Hero C → Task 2 ✓
- Services B → Task 3 ✓
- Process A → Task 4 ✓
- À propos B → Task 5 ✓
- Réalisations A → Task 6 ✓
- Tokens `--syb-*` → Task 1 ✓
- Fix flottants mobile → Task 7 (vérif + ajustement conditionnel) ✓
- Non-régression admin → Task 1 Step 3 + Task 7 Step 5 ✓
- Palette fantôme : volontairement hors périmètre (utilisée par 13 fichiers) — documenté dans l'en-tête.
- Watermark 971 : volontairement conservé — documenté dans l'en-tête.
- Stats / Ticker / Facturation / FAQ / Contact / Solutions : conservés tels quels (déjà cohérents) ; adoptent visuellement les mêmes valeurs sans réécriture nécessaire.
