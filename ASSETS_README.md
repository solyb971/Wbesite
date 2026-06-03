# 🎨 Guide des Assets - SolYB CRM

## 📋 Assets à ajouter

### 🎯 Priorité HAUTE (Indispensables)

#### 1. **Logo SolYB**
- **Fichier** : `/public/logo.svg` ou `/public/logo.png`
- **Dimensions** : 500x500px minimum
- **Format** : SVG (recommandé) ou PNG transparent
- **Usage** : Navbar, footer, emails, page login

**Comment créer le logo :**
- Option 1 : Utiliser Canva (gratuit) - Template "Logo moderne"
- Option 2 : Utiliser Figma (gratuit)
- Option 3 : Générateur AI (ex: Logo.com, Looka)
- Option 4 : Designer freelance Fiverr (~20€)

**Recommandation design :**
- Couleurs : Bleu (#2563eb) + Cyan (#0ea5e9)
- Style : Moderne, professionnel, épuré
- Texte : "SolYB" en lettres claires
- Baseline (optionnel) : "Solutions Digitales Guadeloupe"

---

#### 2. **Favicon**
- **Fichier** : `/public/favicon.ico`
- **Dimensions** : 32x32px
- **Format** : ICO ou PNG
- **Usage** : Onglet navigateur

**Générer rapidement** :
1. Utiliser https://realfavicongenerator.net/
2. Upload votre logo
3. Télécharger le package complet
4. Placer `favicon.ico` dans `/public/`

---

#### 3. **Icons PWA** (Progressive Web App)
Créer un dossier `/public/icons/` avec les tailles suivantes :

```
/public/icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

**Générer automatiquement** :
1. Utiliser https://www.pwabuilder.com/imageGenerator
2. Upload logo 512x512px
3. Télécharger toutes les tailles
4. Placer dans `/public/icons/`

---

### 🎨 Priorité MOYENNE (Recommandés)

#### 4. **Images Site Vitrine**
Dossier : `/public/images/`

**Images nécessaires** :
- `hero-bg.jpg` - Image hero homepage (1920x1080px)
- `about-photo.jpg` - Photo de Yacine (800x800px)
- `service-1.jpg` - Illustration Site Vitrine
- `service-2.jpg` - Illustration E-commerce
- `service-3.jpg` - Illustration Contenu IA
- `guadeloupe-map.svg` - Carte Guadeloupe (optionnel)

**Sources gratuites** :
- Unsplash : https://unsplash.com (photos HD gratuites)
- Pexels : https://pexels.com
- Pixabay : https://pixabay.com
- Undraw : https://undraw.co (illustrations SVG)

**Mots-clés recherche** :
- "digital marketing"
- "web development"
- "entrepreneur working"
- "caribbean island" (pour Guadeloupe)
- "modern office"

---

#### 5. **Open Graph Images** (SEO & Réseaux sociaux)
- **Fichier** : `/public/og-image.jpg`
- **Dimensions** : 1200x630px
- **Usage** : Aperçu liens Facebook, LinkedIn, Twitter

**Template recommandé** :
- Fond : Couleur primaire (#2563eb)
- Logo : Centré ou coin
- Texte : "SolYB - Solutions Digitales Guadeloupe"
- Style : Moderne, épuré

---

### ✨ Priorité BASSE (Optionnels)

#### 6. **Screenshots PWA** (pour stores)
- `/public/screenshots/desktop.png` (1280x720px)
- `/public/screenshots/mobile.png` (750x1334px)

**Prendre après déploiement** :
1. Screenshot du dashboard admin (desktop)
2. Screenshot du site mobile (mobile)

---

#### 7. **Illustrations**
- `/public/illustrations/` - SVG illustrations
- Ex: Process steps, services, etc.

**Sources** :
- Undraw.co (gratuit, personnalisable)
- Storyset (gratuit, style moderne)
- DrawKit (gratuit)

---

## 🚀 Installation Rapide

### Option 1 : Pack Minimal (10 minutes)

1. **Logo simple** :
```bash
# Créer un logo texte avec Canva
https://www.canva.com/create/logos/
# Télécharger en SVG ou PNG transparent
```

2. **Favicon** :
```bash
# Utiliser le générateur
https://realfavicongenerator.net/
# Upload logo → Generate → Download
```

3. **Icons PWA** :
```bash
# Utiliser PWA Builder
https://www.pwabuilder.com/imageGenerator
# Upload 512x512 → Generate all sizes
```

---

### Option 2 : Pack Complet (1-2 heures)

1. Logo professionnel (Canva Pro ou Fiverr)
2. Favicon généré
3. 8 icons PWA (toutes tailles)
4. 5-6 images site vitrine (Unsplash)
5. OG image pour SEO
6. Illustrations SVG (Undraw)

---

## 📁 Structure finale attendue

```
/public/
├── favicon.ico                 ✅ Indispensable
├── logo.svg (ou .png)         ✅ Indispensable
├── logo-white.svg             ⭐ Recommandé
├── og-image.jpg               ⭐ Recommandé
├── manifest.json              ✅ Déjà créé
├── robots.txt                 ✅ Déjà créé
│
├── icons/                     ✅ Indispensable PWA
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
│
├── images/                    ⭐ Recommandé
│   ├── hero-bg.jpg
│   ├── about-photo.jpg
│   ├── service-1.jpg
│   ├── service-2.jpg
│   └── service-3.jpg
│
├── illustrations/             ⚡ Optionnel
│   └── *.svg
│
└── screenshots/               ⚡ Optionnel
    ├── desktop.png
    └── mobile.png
```

---

## 🎨 Charte graphique recommandée

### Couleurs principales
- **Primary** : #2563eb (Bleu)
- **Secondary** : #0ea5e9 (Cyan)
- **Dark** : #0f172a (Bleu foncé)
- **Success** : #10b981 (Vert)
- **Warning** : #f59e0b (Orange)

### Typographie
- **Police** : Inter (déjà configurée)
- **Titres** : Bold, 2-4rem
- **Texte** : Regular, 1rem

### Style
- Moderne et professionnel
- Épuré (minimal)
- Couleurs vives mais pas agressives
- Inspirations : Stripe, Linear, Vercel

---

## ✅ Checklist avant déploiement

- [ ] Logo ajouté (`/public/logo.svg`)
- [ ] Favicon généré (`/public/favicon.ico`)
- [ ] 8 icons PWA créés (`/public/icons/*.png`)
- [ ] Manifest.json configuré (✅ déjà fait)
- [ ] OG image pour réseaux sociaux
- [ ] 3-5 images site vitrine
- [ ] Robots.txt configuré (✅ déjà fait)

---

## 🆘 Besoin d'aide ?

### Services recommandés (gratuits)
- **Logo** : Canva.com, Figma.com
- **Favicon** : RealFaviconGenerator.net
- **PWA Icons** : PWABuilder.com
- **Photos** : Unsplash.com, Pexels.com
- **Illustrations** : Undraw.co, Storyset.com

### Services payants (si budget)
- **Logo professionnel** : Fiverr (20-50€)
- **Photos custom** : Photographe local (~200€)
- **Design complet** : Designer freelance (300-500€)

---

## 📞 Support

Pour toute question sur les assets :
- Consultez la documentation du site
- Utilisez les outils recommandés ci-dessus

**Note** : Les assets sont la touche finale qui rend votre CRM professionnel et unique!

---

**Version** : 1.0.0
**Dernière mise à jour** : Décembre 2025
