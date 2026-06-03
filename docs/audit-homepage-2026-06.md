# Audit Homepage SolYB — Juin 2026
> Document de référence pour la refonte visuelle. Critique reçue : "fait geek, peu accessible, pas assez épuré."

---

## 1. Contexte & identité actuelle

**Agence :** SolYB — agence digitale Guadeloupe (Baie-Mahault, 971)  
**Cible :** TPE/PME guadeloupéennes, peu tech-savvy, besoin de confiance et de proximité  
**Stack visuel actuel :** Dark Caribbean — fond quasi-noir, accents coral/solar/turquoise/violet  
**Fonts :** Syne (display) + Plus Jakarta Sans (body)  
**Critique principale :** Le site ressemble à un portfolio de développeur, pas à une agence de confiance pour entrepreneurs locaux

---

## 2. Architecture actuelle de la homepage (13 sections)

| # | Section | Problème identifié |
|---|---------|-------------------|
| 1 | **Hero** | Trop d'éléments simultanés, animations de dev |
| 2 | **Ticker** | Termes trop techniques, rythme anxiogène |
| 3 | **StatsSection** | Redondant avec les mini-stats du Hero |
| 4 | **Services** | Dense, trop de détails dans chaque carte |
| 5 | **FacturationElectronique** | Déjà présente dans Services + section dédiée = doublon |
| 6 | **Pricing** | Bien structuré mais badges "places limitées" = fausse urgence |
| 7 | **TrustBadges** | Contenu répété ailleurs (livraison, paiement, support) |
| 8 | **Process** | CTA dupliqué en bas, ligne de connexion décorative inutile |
| 9 | **Solutions** | Pertinente mais arrive trop loin dans le scroll |
| 10 | **About** | Bio trop longue, skills techniques visibles (Next.js, React...) |
| 11 | **Réalisations** | Seulement 2 projets + 1 placeholder = crédibilité faible |
| 12 | **FAQ** | Correcte |
| 13 | **Contact** | Correcte |

**Diagnostic principal :** 13 sections = fatigue de scroll. Minimum 4 sections pourraient être fusionnées ou supprimées.

---

## 3. Problème #1 — "Fait geek"

### 3.1 Animations Hero (trop de techniques de dev)
- **Split-char animation** : chaque lettre du H1 tombe individuellement depuis le bas (`splitCharIn`). Très courant sur les portfolios de développeurs, jamais vu sur un site d'agence pour PME. Impression de "démo technique".
- **TypewriterWord** : mot qui se tape/efface en boucle (Digital → Rayonnement → Univers → Avenir). Tendance dev/startup, pas agence locale de confiance.
- **WebkitTextStroke** (texte outlined) sur "un [Digital]" : esthétique design studio / agence créative international. Décalé avec la cible guadeloupéenne.
- **Vertical decorative bar** à gauche (desktop) avec animation `borderGrow` : detail d'architecture graphique = signature portfolio.
- **Scroll indicator** animé en bas à droite : micro-détail geek.

### 3.2 Curseur custom
- Le curseur coral avec ring qui s'agrandit sur les éléments interactifs est **le signal le plus fort d'un site de développeur**. 100% des visiteurs qui ne sont pas dans le milieu web ne remarquent pas ou trouvent ça perturbant.
- Suppression = gain d'accessibilité + moins de charge "geek".

### 3.3 Film grain overlay
- `grain-overlay` avec `animation: grainShift 0.12s steps(2) infinite` — effet de grain animé sur toute la page. Signature de la scène "design indépendant / agence créative Brooklyn". Invisible pour beaucoup mais ressenti inconsciemment comme "pas pro" par des TPE.

### 3.4 Grille de fond Hero
- `backgroundImage: linear-gradient(#F0EDE8 1px, transparent 1px)` à 4% d'opacité. Grid technique, vocabulaire visuel des agences interactives/studios.

### 3.5 Watermark numbers sur les cartes
- Services : ghost number "01", "02", "03" en bas de chaque carte (WebkitTextStroke, quasi-invisible).
- Process : ghost number en bas à droite de chaque étape.
- Signature typique de la tendance "editorial dark portfolio". Invisible en valeur ajoutée pour une TPE.

### 3.6 Tilt 3D sur les cartes Services
- Effect `perspective(900px) rotateX rotateY` + glow directionnel au curseur. Impressionnant techniquement, donne un effet "wow" à un développeur. Pour un restaurateur ou un artisan guadeloupéen, ça ne signifie rien et peut paraître instable.

### 3.7 Skills techniques dans About
- La section About expose : "Next.js, React, WordPress, WooCommerce, Shopify, SEO Local, Facturation Électronique, DGFiP, Applications Métier". 
- Les noms de frameworks (Next.js, React) **n'ont aucune valeur** pour la cible. Pire, ils renforcent le côté geek/incompréhensible. À remplacer par des bénéfices clients.

### 3.8 Bouton `.btn-studio` avec clip-path
- `clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px...)` = coin coupé de style "design studio Awwwards". Très typé agence créative internationale, pas agence de proximité Guadeloupe.

---

## 4. Problème #2 — "Peu accessible"

### 4.1 Contraste et lisibilité
- **Texte muted `#8B8B9E` sur fond `#0A0A0F`** : ratio de contraste ~3.8:1. WCAG AA requiert 4.5:1 pour texte normal. Borderline.
- **Fond ultra-sombre `#0A0A0F`** : quasi-noir pur. Fatigue visuelle sur de longs textes (section About notamment, avec 5 paragraphes).
- **Texte outlined** (WebkitTextStroke, "un Digital") : contraste minimal par définition, difficile à lire.

### 4.2 Surcharge cognitive à l'arrivée
En moins de 3 secondes sur la homepage, l'utilisateur est exposé à simultanément :
1. Blobs flottants (3 animations)
2. Grille de fond statique
3. Barre verticale animée
4. Lettres qui tombent une par une (H1)
5. Cursor custom qui apparaît
6. Grain animé sur toute la page
→ **6 sources de mouvement simultané** avant même de lire le titre. Pour un entrepreneur local habitué à des sites simples, c'est déstabilisant.

### 4.3 Contenu plié dans les animations
- Le H1 "Votre entreprise mérite un [X] qui lui ressemble" n'est **visible qu'après** la fin de l'animation split-char (~800ms). Si JS lent, le titre n'apparaît pas immédiatement.
- Sur mobile avec JS lent, l'expérience se dégrade.

### 4.4 Longueur de la page
- 13 sections = ~8000px de scroll en desktop. Pour une TPE qui consulte sur mobile (majorité de la cible), c'est une page qui ne finit jamais.
- Pas d'ancre de navigation claire en dehors du menu.

### 4.5 CTA dispersés
- "Découvrir nos services" → "Demander un devis" (x3 Services) → "Audit gratuit" (Services) → "Choisir Starter/Business/Abonner" (Pricing) → "Contactez-nous" → "Commencer maintenant" (Process) → "Démarrer un projet" (Réalisations)...
- **9 CTAs différents** avec des wording différents. Confusion sur l'action principale attendue.

---

## 5. Problème #3 — "Pas assez épuré"

### 5.1 Répétitions de contenu
| Information | Apparaît dans |
|-------------|--------------|
| "Devis gratuit sous 24h" | Hero trust line + Hero CTA "Audit gratuit" + Services card + Process |
| "Livraison 2-3 semaines" | Hero mini-stats + Pricing info-cards + Process |
| "Paiement 2x" | Hero — non, Pricing + TrustBadges |
| "100% sur-mesure" | Hero mini-stats + About stats + About values |
| "Support inclus" | Pricing + TrustBadges + About values |
| Facturation électronique | Services (grande card) + Section FacturationElectronique dédiée |

**→ Au moins 3 sections doublonnent systématiquement le contenu des autres.**

### 5.2 Densité par section

**Hero** : 8 éléments distincts (H1, sous-titre, localisation, 2 CTAs, 3 mini-stats, trust line, scroll indicator)  
**Services** : 3 cartes (chacune avec icône, tag, prix, titre, description, 4 features, séparateur, CTA) + 1 grande card featured avec badge urgence, description, 4 tags, 2 CTAs  
**About** : Founder tag + Nom + Titre + 5 paragraphes bio + 9 skills tags + 4 stat-cards + 4 value-cards  
**Process** : 4 étapes (chacune avec icône, numéro, durée, titre, description, 3 détails) + ligne décorative + bottom CTA  

### 5.3 Palette de couleurs surchargée
- **5 couleurs d'accent actives simultanément** : Coral (#FF6B47), Solar (#F5A623), Turquoise (#00D4AA), Violet (#8B5CF6), Lime (dans TrustBadges)
- Sur la section About seule : coral, solar, turquoise, violet (4 couleurs pour 4 stat-cards)
- Sur la section Process : coral, solar, turquoise, violet (4 couleurs pour 4 étapes)
- Résultat : pas de hiérarchie visuelle claire, l'œil ne sait pas où aller

### 5.4 Typographie saturée
- **Tracking excessif** : de nombreux labels utilisent `letterSpacing: "3px"` ou `tracking-[4px]` en uppercase (StatsSection, tags services, étiquettes process)
- **Uppercase partout** : PROJETS LIVRÉS, RÉPONSE GARANTIE, RÉFORME EN COURS, FONDATEUR, JOUR 1, CONFORME DGFIP... → perd de l'impact quand tout crie

---

## 6. Ce qui fonctionne — à conserver

- **Le message principal** : "Votre entreprise mérite un digital qui lui ressemble" — pertinent et humain
- **L'ancrage local** : Baie-Mahault, 971, Guadeloupe — fort et différenciant
- **La section Pricing** : structure claire, prix visibles, plan recommandé en évidence
- **La section Process** : les 4 étapes sont logiques et rassurent le client
- **La FAQ** : bien pensée, répond aux vraies questions
- **Le formulaire Contact** : multi-step, fluide
- **L'urgency sur facturation électronique** : crédible et différenciant
- **Les couleurs principales** : Coral + fond sombre = identité mémorisable
- **La police Syne** : distinctive sans être illisible

---

## 7. Recommandations pour la refonte

### 7.1 Réduction des sections (de 13 à 8 max)

| Actuel | Nouvelle section |
|--------|-----------------|
| Hero | Hero (simplifié) |
| Ticker | Intégrer dans Hero ou supprimer |
| StatsSection | Fusionner avec Hero ou supprimer |
| Services + FacturationElectronique | Services (1 section unifiée) |
| Pricing | Pricing (inchangé) |
| TrustBadges + Process | Processus & Garanties (1 section) |
| Solutions | Solutions (remonter) |
| About | About (simplifié, sans bio longue) |
| Réalisations | Réalisations |
| FAQ + Contact | FAQ + Contact |

### 7.2 Direction visuelle recommandée

**Problème central** : le site essaie d'être deux choses incompatibles — un studio créatif dark/premium ET une agence de proximité rassurante pour des PME.

**Option A — Clarifier le dark Caribbean, retirer les codes "dev"**  
Garder le fond sombre mais retirer tous les marqueurs geek (curseur, grain, split-char, grille, tilt, outlined text, clip-path). Remplacer par des animations discrètes et du whitespace généreux. Résultat attendu : premium sans être intimidant.

**Option B — Aller vers un design plus clair et accessible**  
Fond blanc ou gris très clair en version day mode, avec des touches de coral. Plus proche des standards des agences locales "de confiance". Sacrifie l'originalité mais gagne en accessibilité et en première impression.

**Option C — Hybride : hero dark, suite claire**  
Hero impactant en dark (coral fort), puis sections suivantes sur fond blanc/off-white. Contraste marqué = impact visuel + lisibilité.

**Recommandation : Option A** — les fondamentaux sont bons (couleurs, fonts, message). Le problème n'est pas le dark, c'est la densité et les codes visuels de dev portfolio.

### 7.3 Animations à retirer

| Animation | Raison |
|-----------|--------|
| Grain overlay animé | Geek, invisible, pénalise perf |
| Split-char H1 (lettre par lettre) | Trop lent, dev portfolio |
| TypewriterWord | Cliché, génère de la confusion sur le message |
| Custom cursor + ring | Intimidant, dev signature |
| Tilt 3D cartes | Instabilité perçue |
| Outlined text WebkitTextStroke | Lisibilité, geek |
| Grid de fond Hero | Dev aesthetics |
| Barres de connexion Process | Décoration inutile |
| Watermark numbers | Invisible, dev pattern |

### 7.4 Animations à garder / simplifier

| Animation | Action |
|-----------|--------|
| Blobs flottants | Garder, mais moins nombreux (2 max) |
| Fade-in au scroll | Garder, simplifier (opacity only, pas de translateY) |
| Hover sur cartes | Garder un scale(1.02) subtil |
| Ticker | Garder, réviser le contenu |
| Compteurs StatsSection | Garder |
| Bouton CTA hover | Simplifier (supprimer le clip-path, garder le fill) |

### 7.5 Contenu à simplifier

- **Hero** : retirer les mini-stats (en doublon), garder H1 + sous-titre + 2 CTAs + trust line seulement
- **About** : bio réduite à 2 paragraphes max, retirer les tags techniques (Next.js, React), remplacer par bénéfices ("Site livré en 14 jours", "3 mois de support inclus")
- **Services** : retirer les features listes (4 items par carte = chargé), garder description + 1 CTA
- **CTA** : unifier sur un seul wording → "Demander un devis gratuit"
- **Badges** : retirer "Tarif de lancement — places limitées" (x3), fausse urgence détecté par les clients

### 7.6 Palette à simplifier

**Réduire à 3 couleurs actives max :**
- **Coral `#FF6B47`** : couleur principale, CTAs, accents forts
- **Solar `#F5A623`** : facturation électronique uniquement (différenciation claire)
- **Texte / Neutre** : `#F0EDE8` / `#8B8B9E`

Supprimer Turquoise et Violet comme accents de section. Les réserver pour les checkmarks et détails mineurs.

---

## 8. Résumé exécutif

| Dimension | Note actuelle | Objectif refonte |
|-----------|--------------|-----------------|
| Lisibilité | 6/10 | 9/10 |
| Accessibilité | 5/10 | 8/10 |
| Épuration | 4/10 | 8/10 |
| Crédibilité PME locale | 5/10 | 9/10 |
| Performance perçue | 6/10 | 8/10 |
| Mémorabilité | 8/10 | 8/10 (à conserver) |

**Le site a une identité forte. Le travail de refonte est un élagage, pas une reconstruction.**  
Retirer ~40% des éléments visuels, unifier la palette sur 2 couleurs actives, supprimer les codes "dev portfolio", et réduire à 8 sections — le site devient accessible sans perdre son caractère.

---

*Fichier généré le 2026-06-02 — à utiliser comme brief pour la session de refonte*
