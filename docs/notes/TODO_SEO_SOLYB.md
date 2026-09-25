# Plan d'action SEO & Lancement — SolYB Guadeloupe
**Objectif : dominer les résultats Google sur le marché digital guadeloupéen**
*Mis à jour : mai 2026*

---

## État des lieux — Ce qui est déjà en place

| Élément | Statut |
|---|---|
| Dark theme caribéen (Syne + Jakarta) | ✅ Fait |
| 3 schemas JSON-LD (LocalBusiness, FAQPage, Organization) | ✅ Fait |
| Rich results FAQ (8 questions facturation + SEO) | ✅ Fait |
| Section Facturation Électronique dédiée | ✅ Fait |
| Mentions des villes (Pointe-à-Pitre, Basse-Terre, Les Abymes…) | ✅ Fait |
| Open Graph + Twitter Cards | ✅ Fait |
| Meta title / description / keywords enrichis | ✅ Fait |
| Canonical, robots.txt, sitemap API | ✅ Fait |
| Formulaire 6 options (dont facturation, application, SaaS) | ✅ Fait |
| Responsive mobile-first | ✅ Fait |
| UrgencyBanner deadline septembre 2026 | ✅ Fait |

---

## PHASE 1 — Fondations absolues (Semaine 1-2)
> Sans ces éléments, le reste ne sert à rien. Priorité maximale.

### 🔴 1. Fiche Google My Business — PRIORITÉ ABSOLUE

Google Maps + "near me" = 60% des clics locaux. C'est gratuit et c'est la chose la plus impactante que tu peux faire aujourd'hui.

**Étapes :**
- [ ] Aller sur business.google.com → créer la fiche "SolYB"
- [ ] Catégorie principale : **"Agence de conception de sites web"**
- [ ] Catégories secondaires : "Conseil en informatique", "Développement de logiciels"
- [ ] Renseigner : nom exact, adresse (Baie-Mahault 97122), téléphone, site web (solyb.fr)
- [ ] Décrire l'activité en 750 caractères max avec les mots-clés : *agence digitale Guadeloupe, facturation électronique, création site web, applications métier*
- [ ] Ajouter 5+ photos (logo, bureau, screenshot du site)
- [ ] Choisir les horaires réels
- [ ] Vérifier la fiche (courrier Google ou appel)
- [ ] Activer les messages GMB (les prospects t'envoient des messages directs)
- [ ] Publier 1 post GMB par semaine (offre, actualité, réforme factu élec.)

**Mots-clés à placer dans la description GMB :**
> agence digitale Guadeloupe — création site web — facturation électronique 2026 — application métier — Baie-Mahault — TPE PME Guadeloupe

---

### 🔴 2. Google Search Console

Sans ça, Google ne sait pas que le site existe et tu ne vois pas tes performances.

- [ ] Aller sur search.google.com/search-console
- [ ] Ajouter la propriété `https://solyb.fr`
- [ ] Choisir méthode de vérification **"Balise HTML"**
- [ ] Remplacer `YOUR_GOOGLE_VERIFICATION_CODE` dans `src/app/layout.tsx` par le code fourni
- [ ] Rebuilder et déployer sur Vercel
- [ ] Soumettre le sitemap : `https://solyb.fr/api/sitemap`
- [ ] Demander l'indexation manuelle de la page d'accueil (outil "Inspection d'URL")
- [ ] Configurer les alertes email (erreurs de crawl, pénalités)

---

### 🔴 3. Google Analytics 4

Tu as déjà le code gtag dans le projet — il faut le configurer pour mesurer.

- [ ] Créer une propriété GA4 sur analytics.google.com
- [ ] Copier le Measurement ID (`G-XXXXXXXXXX`)
- [ ] Le renseigner dans `.env.local` : `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] Vérifier que les événements arrivent bien (onglet Temps réel dans GA4)
- [ ] Créer une conversion sur l'événement "lead soumis" (formulaire de contact)
- [ ] Connecter GA4 à Search Console (permet de voir les requêtes qui génèrent des clics)

---

### 🔴 4. Compléter les informations manquantes dans le code

Des placeholders subsistent — les moteurs et les prospects les voient.

- [ ] **Téléphone** : remplacer `+590 690 XX XX XX` par le vrai numéro dans :
  - `src/components/site/Contact.tsx`
  - `src/components/site/Footer.tsx`
  - `src/app/(public)/page.tsx` (schema.org telephone)
- [ ] **Réseaux sociaux** : remplacer les URLs Facebook/LinkedIn dans `page.tsx` schema `sameAs`
- [ ] **LinkedIn** : remplacer le lien dans `Footer.tsx`
- [ ] **Crisp** : renseigner `NEXT_PUBLIC_CRISP_WEBSITE_ID` dans `.env.local`
- [ ] **Email Brevo** : vérifier la configuration d'envoi des leads (tester le formulaire de bout en bout)

---

### 🔴 5. Image Open Graph personnalisée

Actuellement l'OG image est le logo sur fond blanc — peu engageant sur les réseaux.

- [ ] Créer une image 1200×630px : fond dark (#0A0A0F), logo SolYB, texte "Agence Digitale Guadeloupe" en Syne, accents corail/or
- [ ] La placer dans `public/og-image.jpg` (format JPG, < 200Ko)
- [ ] Mettre à jour `src/app/layout.tsx` → remplacer l'URL de l'OG image

---

## PHASE 2 — Autorité locale (Semaine 2-4)

### 🟠 6. Citations locales (NAP cohérent)

Google valide la légitimité d'un business local en croisant les informations sur plusieurs annuaires. Le NAP (Name / Address / Phone) doit être **identique partout**.

**NAP SolYB à utiliser partout sans variation :**
```
SolYB
Impasse la coulée verte, Moudong Nord
97122 Baie-Mahault
Guadeloupe
+590 690 XX XX XX
https://solyb.fr
```

**Annuaires à remplir (par ordre de priorité) :**

| Annuaire | URL | Priorité |
|---|---|---|
| Pages Jaunes | pagesjaunes.fr | 🔴 Critique |
| Societe.com | societe.com | 🔴 Critique |
| LinkedIn Company Page | linkedin.com/company | 🔴 Critique |
| Facebook Business | facebook.com/business | 🔴 Critique |
| Kompass | kompass.com | 🟠 Haute |
| Annuaire.be | annuaire.be | 🟠 Haute |
| Yelp France | yelp.fr | 🟡 Moyenne |
| Cylex France | cylex-france.fr | 🟡 Moyenne |
| Hotfrog | hotfrog.fr | 🟡 Moyenne |
| 118000.fr | 118000.fr | 🟡 Moyenne |

**Important :** même description, mêmes horaires, même catégorie partout.

---

### 🟠 7. Premiers avis clients Google

Les étoiles Google = facteur de conversion local majeur. Même 3-4 avis au départ font la différence.

- [ ] Récupérer le lien direct GMB pour laisser un avis (disponible dans le tableau de bord GMB)
- [ ] Envoyer le lien à tes 3-5 premiers clients (famille, amis entrepreneurs, anciens clients)
- [ ] Répondre à tous les avis publiquement (même positifs) — Google valorise l'engagement
- [ ] Ne jamais acheter de faux avis (pénalité GMB sévère)

---

### 🟠 8. Réseaux sociaux — Présence minimum

Pas besoin d'être actif partout — juste d'exister pour les backlinks et la confiance.

**LinkedIn (priorité 1) :**
- [ ] Créer la page LinkedIn Company "SolYB"
- [ ] Description avec mots-clés : *agence digitale Guadeloupe, facturation électronique 2026*
- [ ] Publier 1-2 posts par semaine : actualité réforme factu élec., tips SEO, avant/après clients
- [ ] Rejoindre les groupes : "Entreprises Guadeloupe", "Entrepreneurs Antilles"

**Facebook (priorité 2) :**
- [ ] Créer la page Facebook Business "SolYB — Agence Digitale Guadeloupe"
- [ ] Activer les avis Facebook
- [ ] 1 post/semaine minimum

**Instagram (optionnel, priorité 3) :**
- [ ] Compte @solyb.gp
- [ ] Reels : démos de sites, explications facturation électronique en créole

---

## PHASE 3 — Contenu & Longue Traîne (Mois 2-4)

> Le contenu est ton arme SEO principale avec 0 backlinks. Les articles de blog te positionnent sur des requêtes que personne d'autre ne cible localement.

### 🟡 9. Articles de blog — Plan éditorial

**Infrastructure déjà en place** (`/blog` existe dans le projet).

**Cadence recommandée :** 2 articles/mois, 800-1200 mots chacun, 100% en français.

**Liste des articles à écrire (par ordre de priorité SEO) :**

| # | Titre | Mot-clé cible | Volume estimé | Difficulté |
|---|---|---|---|---|
| 1 | "Facturation électronique en Guadeloupe : ce que les TPE doivent faire avant septembre 2026" | facturation électronique Guadeloupe | Élevé | Faible |
| 2 | "Combien coûte un site web en Guadeloupe en 2026 ?" | prix site web Guadeloupe | Élevé | Faible |
| 3 | "Salon de coiffure en Guadeloupe : pourquoi avoir un site web en 2026" | site web salon coiffure Guadeloupe | Moyen | Très faible |
| 4 | "Restaurant en Guadeloupe : comment attirer plus de clients grâce au digital" | restaurant site web Guadeloupe | Moyen | Très faible |
| 5 | "Application de réservation pour artisans en Guadeloupe" | application réservation Guadeloupe | Faible | Très faible |
| 6 | "E-commerce en Guadeloupe : vendre en ligne depuis le 971" | e-commerce Guadeloupe | Moyen | Faible |
| 7 | "Site web vs application mobile : que choisir pour son entreprise en Guadeloupe ?" | application web vs site web Guadeloupe | Faible | Très faible |
| 8 | "Google My Business Guadeloupe : guide complet pour les TPE" | Google My Business Guadeloupe | Moyen | Faible |
| 9 | "DGFiP facturation électronique : guide pour les PME des DOM" | DGFiP facturation électronique DOM | Moyen | Faible |
| 10 | "Agence digitale Guadeloupe vs agence parisienne : les vraies différences" | agence digitale Guadeloupe | Élevé | Faible |

**Structure de chaque article :**
- H1 avec le mot-clé exact
- H2 avec variantes du mot-clé
- Mention des villes (Pointe-à-Pitre, Basse-Terre, Baie-Mahault, Les Abymes, Marie-Galante)
- CTA vers le formulaire de contact en bas
- Schéma `BlogPosting` JSON-LD dans la page

---

### 🟡 10. Pages de destination locales (SEO géographique)

Ces pages ciblent les recherches du type "création site web + [ville]" — très peu compétitives localement.

**Pages à créer :**

- [ ] `/creation-site-web-pointe-a-pitre` — "Création Site Web Pointe-à-Pitre"
- [ ] `/creation-site-web-basse-terre` — "Création Site Web Basse-Terre"
- [ ] `/creation-site-web-les-abymes` — "Création Site Web Les Abymes"
- [ ] `/facturation-electronique-guadeloupe` — page de service dédiée (URL propre)
- [ ] `/agence-digitale-baie-mahault` — ta ville, ta base

**Contenu minimum par page ville :**
- 400-600 mots spécifiques à la ville
- Témoignage ou exemple fictif local
- Carte Google Maps intégrée (coordonnées Guadeloupe)
- CTA local : "Entrepreneur à Pointe-à-Pitre ? Contactez-nous"
- Schema `LocalBusiness` spécifique à la ville

---

## PHASE 4 — Autorité & Backlinks (Mois 3-6)

### 🟢 11. Obtenir des backlinks locaux

Un backlink local = un vote de confiance pour Google. Les backlinks guadeloupéens sont encore plus précieux.

**Sources de backlinks à cibler :**

- [ ] **Chambre de Commerce de Guadeloupe** (cci.guadeloupe.fr) — demander à être listé comme prestataire tech
- [ ] **Médias locaux** : Guadeloupe 1ère, France-Antilles, Karusite — proposer un article "La facturation électronique en Guadeloupe"
- [ ] **Associations d'entrepreneurs** : MEDEF Guadeloupe, CGPME, ADIE — être listé comme expert
- [ ] **Partenaires locaux** : comptables, avocats d'affaires, experts-comptables — échange de liens
- [ ] **Annuaire officiel des PDP** (DGFiP) — si SolYB se certifie PDP partenaire
- [ ] **Témoignages clients** sur leurs sites avec lien retour vers solyb.fr
- [ ] **Guest posts** : écrire 1 article expert sur le blog d'un partenaire (comptable, juridique)

---

### 🟢 12. Stratégie partenariats locaux

Le bouche-à-oreille digital = les meilleurs leads en Guadeloupe.

- [ ] Contacter 5 experts-comptables en Guadeloupe : "Je m'occupe de la mise en conformité digitale de vos clients, vous restez sur la fiscalité"
- [ ] Contacter des fédérations professionnelles (coiffeurs, restaurateurs, artisans) pour proposer un atelier "facturation électronique 2026"
- [ ] Proposer des webinaires gratuits : "Comprendre la réforme factu élec. en 30 min" → capture d'emails

---

## PHASE 5 — Monitoring mensuel (Ongoing)

### 🔵 13. Tableau de bord SEO — vérifications mensuelles

**Chaque semaine :**
- [ ] Search Console → nouvelles impressions, clics, positions
- [ ] GMB → vues de la fiche, appels, itinéraires, clics site
- [ ] Répondre aux messages/avis GMB sous 24h

**Chaque mois :**
- [ ] PageSpeed Insights → vérifier LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Ahrefs/Ubersuggest → positions pour les mots-clés cibles
- [ ] Vérifier les 404 dans Search Console
- [ ] Publier 2 articles de blog
- [ ] 1 nouveau post GMB

**Chaque trimestre :**
- [ ] Audit complet des citations (cohérence NAP)
- [ ] Mettre à jour le contenu des pages existantes (fraîcheur = signal SEO)
- [ ] Nouveaux backlinks obtenus ce trimestre ?
- [ ] Relancer les clients pour des avis Google

---

## Mots-clés cibles — Tableau de suivi

Coller dans un Google Sheet et suivre les positions mensuellement.

| Mot-clé | Position cible | Difficulté | Statut |
|---|---|---|---|
| agence digitale Guadeloupe | Top 3 | Faible | 🔴 À tracker |
| création site web Guadeloupe | Top 3 | Faible | 🔴 À tracker |
| facturation électronique Guadeloupe | Top 1 | Très faible | 🔴 À tracker |
| site web Guadeloupe | Top 5 | Faible | 🔴 À tracker |
| application métier Guadeloupe | Top 3 | Très faible | 🔴 À tracker |
| développeur web Baie-Mahault | Top 1 | Très faible | 🔴 À tracker |
| site vitrine Guadeloupe prix | Top 3 | Faible | 🔴 À tracker |
| facturation électronique obligatoire 2026 Guadeloupe | Top 1 | Très faible | 🔴 À tracker |
| agence web 971 | Top 3 | Très faible | 🔴 À tracker |
| site web salon coiffure Guadeloupe | Top 1 | Très faible | 🔴 À tracker |
| e-commerce Guadeloupe | Top 5 | Faible | 🔴 À tracker |
| SaaS Guadeloupe | Top 3 | Très faible | 🔴 À tracker |

---

## Récapitulatif par priorité

### Cette semaine (Critique)
1. Créer et vérifier la fiche **Google My Business**
2. Configurer **Google Search Console** + soumettre le sitemap
3. Remplacer le **numéro de téléphone** dans le code
4. Tester le **formulaire de contact** de bout en bout
5. Créer l'image **Open Graph** personnalisée

### Ce mois (Haute priorité)
6. Citations locales (Pages Jaunes, Societe.com, LinkedIn, Facebook)
7. Configurer **Google Analytics 4**
8. Demander les **3 premiers avis Google**
9. Écrire et publier les **2 premiers articles de blog**
10. Créer la page `/facturation-electronique-guadeloupe`

### Trimestre 1 (Moyen terme)
11. 8 articles de blog supplémentaires
12. 3 pages villes (Pointe-à-Pitre, Basse-Terre, Les Abymes)
13. Contacts partenaires (experts-comptables, CCI)
14. Backlinks médias locaux
15. Webinaire facturation électronique

---

## Notes techniques restantes (code)

- [ ] Vérifier que `/api/sitemap` génère bien toutes les URLs (home + blog + pages villes)
- [ ] Ajouter le schema `BlogPosting` JSON-LD dans le layout des pages blog
- [ ] Configurer `next-sitemap` ou s'assurer que le sitemap inclut les nouvelles pages villes
- [ ] Ajouter `hreflang="fr"` dans le `<head>` (déjà `lang="fr"` sur `<html>` — à vérifier)
- [ ] Vérifier le `robots.txt` accessible sur `https://solyb.fr/robots.txt`
- [ ] Compresser les images du dossier `/public/logo/` en WebP (gain LCP)
- [ ] Vérifier la Core Web Vitals avec Vercel Speed Insights (déjà configuré ?)

---

*Document maintenu à jour dans le repo. Prochaine révision : juillet 2026.*
