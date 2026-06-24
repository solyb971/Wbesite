# Audit du projet — SolYB (site vitrine + CRM)

> Document généré le **24 juin 2026** par analyse statique du code source.
> Branche analysée : `main` — dernier commit `7581259`.
> Ce document est un état des lieux technique. Les points juridiques signalés doivent être validés par un professionnel du droit.

---

## 1. Présentation générale

### Objet
**SolYB** est le site de l'agence digitale guadeloupéenne de Yacine Bouhassoun. Le projet réunit **deux applications dans un même dépôt** :

1. **Un site vitrine public** (`solyb.fr`) — génération de leads pour l'agence et pour deux produits dérivés :
   - **FactuGP** — landing dédiée à la facturation électronique 2026 (`/facturation-electronique`)
   - **ResaGP** — landing dédiée à la gestion de réservations/restaurant (`/resagp`)
2. **Un CRM interne** (`/admin/*`) — pipeline de leads, scoring automatique, planning, analytics, séquences email, templates. Le `package.json` nomme d'ailleurs le projet `solyb-crm`.

### Stack technique

| Couche | Technologie |
|---|---|
| Framework | **Next.js 15.1** (App Router) + **React 19** |
| Langage | **TypeScript 5.7** |
| Styling | **Tailwind CSS 3.4**, CSS Modules (landings), `globals.css` |
| UI | Radix UI, shadcn-style (`components/ui`), Phosphor/Lucide/Tabler icons |
| Animations | **Framer Motion 12**, Lenis (smooth scroll), canvas maison (constellations) |
| Base de données | **Supabase** (PostgreSQL + Auth + RLS) |
| Email transactionnel | **Brevo** (API v3) |
| Chat live | **Crisp** (`crisp-sdk-web`) |
| Formulaires | React Hook Form + **Zod** |
| PDF | jsPDF |
| Drag & drop | dnd-kit (kanban) |
| Graphiques | Recharts |
| Hébergement | **Vercel** (`output: standalone`, crons Vercel) |

### Type de projet
**Hybride** : site vitrine marketing (statique/SSR, orienté SEO) **+** application web métier (CRM authentifié) **+** quelques endpoints API REST.

### Public cible
- **Site public** : TPE/PME, commerçants, restaurateurs et indépendants de Guadeloupe cherchant un site web, une solution de facturation électronique (échéance 2026) ou un outil de réservation.
- **CRM** : usage interne unique (le fondateur), pour piloter sa prospection.

---

## 2. Périmètre fonctionnel

### ✅ Fonctionnalités présentes et a priori complètes

**Site public**
- Page d'accueil riche (Hero, Services, Process, About, Pricing, FAQ, Contact, Testimonials, Realisations, Stats, Ticker, TrustBadges…)
- Landings dédiées **FactuGP** et **ResaGP** (layout + charte propre, countdown, plans de salle, comparatifs)
- Page services, blog (3 articles SEO), page application web Guadeloupe
- Pages légales : **mentions légales** et **politique de confidentialité**
- SEO : 3 schémas JSON-LD (LocalBusiness, FAQPage, Organization), `sitemap.xml`, `robots`, `opengraph-image`, redirections, headers de sécurité
- Animations soignées (splash, reveal au scroll, typewriter, curseur custom, grain, wipe)
- Formulaire de contact validé (Zod) → création de lead + email de bienvenue
- Formulaire « intérêt » produit (`/api/interest`) pour FactuGP/ResaGP
- Bouton WhatsApp, popup exit-intent, bannière d'urgence, compteur d'offre de lancement
- Chat Crisp intégré

**CRM `/admin`**
- Authentification Supabase + protection des routes par middleware
- Dashboard (stats + kanban pipeline par produit)
- Liste leads + filtres, détail lead (score, notes, rentabilité, quick actions)
- Analytics (funnel de conversion, CA, sources)
- Planning hebdomadaire + indicateur de capacité + création d'événement
- Templates email (liste + éditeur)
- Settings (scoring, tarifs, planning, email)
- Scoring automatique des leads (pondéré, configurable via settings)
- Export CSV/JSON des leads

**Back-office automatisé**
- 3 crons Vercel : séquences email (J0/J3/J7/J10), alertes quotidiennes, snapshot analytics
- Webhook Brevo (tracking ouvertures/clics)
- Schéma DB complet : 9 tables, triggers (score, estimations, compteur offre), vues SQL, RLS activée

### 🟡 Partiellement implémentées / fragiles

| Élément | Problème |
|---|---|
| **Fonction RPC `increment`** | Appelée dans `/api/emails/send` et `/api/webhooks/brevo`, mais **aucune migration ne la définit**. Les compteurs `usage_count`, `email_opens`, `email_clicks` ne s'incrémenteront jamais (échec silencieux). |
| **Notification admin nouveau lead** | `sendAdminNotification()` existe dans `brevo.ts` mais **n'est jamais appelée** dans `/api/leads`. Le fondateur n'est pas prévenu des nouveaux leads par email. |
| **Upload de fichiers** | Table `files` créée, mais aucun composant/route d'upload détecté. |
| **Tags leads** | Colonne `tags TEXT[]` présente, pas d'UI de gestion. |
| **Export ERP** | Colonnes `exported_to_erp`, `erp_id` présentes, aucune intégration. |
| **Réinitialisation mot de passe** | `resetPassword()` utilise `NEXT_PUBLIC_APP_URL` qui n'est **pas dans `.env.example`** → lien de reset potentiellement cassé. |
| **Mode mock** | Branches `NEXT_PUBLIC_USE_MOCK` un peu partout : pratique en dev mais multiplie les chemins de code non testés en prod. |

### 📋 Déclarées mais non développées
- Gestion documentaire (devis/contrats/maquettes liés au lead) — schéma seulement.
- Séquence email réellement déclenchée : la création de lead met `email_sequence_step = 0` ; c'est le cron qui avance — flow jamais validé de bout en bout (voir §5).
- Le « produit » FactuGP/ResaGP lui-même n'existe pas : ce sont des **landings de captation**, pas des applicatifs livrés.

---

## 3. Avancement global estimé

### Estimation globale : **≈ 70 %**

Justification : le **site vitrine est quasi terminé et déployé** (très abouti visuellement, SEO solide). Le **CRM est structurellement complet** (toutes les pages, hooks, schéma DB existent) mais souffre d'angles morts : sécurité d'API, fonctions DB manquantes, et **absence totale de tests / validation de bout en bout**. C'est un MVP fonctionnel sur le papier, pas encore durci pour la production.

| Section | Avancement | Commentaire |
|---|---:|---|
| Site vitrine public | **90 %** | Déployé, SEO ok. Reste : consentement cookies, contenus légaux à finaliser. |
| Landings FactuGP / ResaGP | **85 %** | Très abouties. Claims marketing à valider (cf. §6). |
| Formulaires & captation leads | **80 %** | Fonctionne ; manque notif admin + double opt-in / consentement. |
| Authentification CRM | **75 %** | Login/middleware ok ; reset password incertain, fail-open en l'absence de config. |
| CRM — Pipeline & leads | **75 %** | Riche ; non validé en conditions réelles. |
| CRM — Analytics | **65 %** | Dépend du cron snapshot jamais exécuté/validé. |
| CRM — Planning | **60 %** | UI présente, peu de validation. |
| CRM — Templates & séquences email | **55 %** | Logique présente mais `increment` cassé, flow email non testé. |
| API & sécurité backend | **45 %** | Endpoints sensibles non protégés (cf. §6). |
| Tests & QA | **5 %** | Aucun test automatisé. |
| Conformité légale | **40 %** | Pages créées mais placeholders + pas de cookie consent. |

---

## 4. Ce qui reste à faire

### 🔴 Bloquant (avant tout déploiement public sérieux / tests utilisateurs)
1. **Sécuriser `/api/export`** — aucune vérification d'authentification : **n'importe qui peut télécharger tous les leads (fuite de données personnelles)**.
2. **Sécuriser `/api/emails/send`** — aucune authentification : n'importe qui peut envoyer des emails via le compte Brevo (abus/spam, blacklist du domaine).
3. **Authentifier/signer le webhook Brevo** — aucune vérification : un tiers peut modifier les statuts d'emails et désactiver des séquences.
4. **Créer la fonction SQL `increment`** (ou remplacer les appels RPC) — sinon compteurs d'emails et d'usage cassés.
5. **Compléter les mentions légales** — SIRET, forme juridique, TVA (obligation légale pour un site commercial).

### 🟠 Important (avant exploitation réelle)
6. Brancher `sendAdminNotification()` dans `/api/leads` (sinon les leads passent inaperçus).
7. Ajouter le **consentement cookies** (Crisp dépose des cookies) + bandeau RGPD.
8. Ajouter une **case de consentement** au formulaire de contact (collecte de données).
9. Corriger le **fail-open du middleware** (si Supabase non configuré, `/admin` devient accessible).
10. Ajouter `NEXT_PUBLIC_APP_URL` à la config (reset password) et durcir l'échappement CSV (injection de formules).
11. Tester le **flow email complet** (séquence J0→J10) en conditions réelles.

### 🟢 Nice-to-have
- Upload de fichiers par lead, gestion des tags, export ERP.
- Rate-limiting sur les formulaires publics (anti-spam) + captcha/honeypot.
- Tests automatisés (unitaires + e2e).
- Monitoring/alerting (Sentry, logs structurés).

---

## 5. Points non testés / non validés

| Domaine | Constat |
|---|---|
| **Tests automatisés** | **Aucun** fichier `.test.*` / `.spec.*`. Pas de Jest/Vitest/Playwright configuré (Playwright n'est utilisé que manuellement pour des captures). Couverture = 0 %. |
| **Flow lead → email** | La création de lead, l'email de bienvenue, puis la séquence (cron J3/J7/J10) n'ont vraisemblablement jamais tourné de bout en bout en prod. Dépend de Brevo réellement configuré. |
| **Crons Vercel** | Les 3 crons (`vercel.json`) requièrent `CRON_SECRET` (✔ vérifié). Mais leur exécution réelle (snapshot analytics, alertes) n'est pas validée — l'onglet Analytics dépend de données jamais générées. |
| **Fonction `increment`** | Référencée mais non définie → échec garanti, non détecté faute de tests. |
| **Intégrations tierces** | Brevo, Crisp, Supabase : fonctionnent en « mode dégradé/mock » sans clés. Le comportement réel (clés de prod) n'est pas garanti vérifié. |
| **Webhook Brevo** | Nécessite une config côté Brevo (URL) + correspondance `brevo_message_id` ; non validé. |
| **Gestion d'erreurs** | Beaucoup de `catch` renvoient le message d'erreur brut au client (`error.message`) → fuite d'info technique. Cas limites (DB indispo, quota Brevo) non couverts. |
| **Performance / charge** | Non testée. Page d'accueil très lourde en animations/canvas — impact mobile/LCP à mesurer (Lighthouse). `/api/leads` GET limité à 20 résultats. |
| **RLS** | Policy initiale `auth.role() = 'authenticated'` très permissive (tout authentifié = accès total). Acceptable pour 1 seul utilisateur, à revoir si multi-comptes. |

---

## 6. Conformité légale et réglementaire — à valider

> ⚠️ À faire valider par un juriste. Les points ci-dessous sont des **drapeaux**, pas des conclusions juridiques.

### RGPD / données personnelles
- ❌ **Pas de bandeau de consentement cookies** alors que **Crisp** (et potentiellement des stats) déposent des cookies/traceurs → obligation CNIL.
- ❌ **Pas de case de consentement explicite** sur le formulaire de contact.
- 🟡 **Mentions légales incomplètes** : SIRET, forme juridique, TVA encore en placeholders.
- 🟡 **Politique de confidentialité** présente mais auto-générée : liste des sous-traitants (Supabase, Brevo, Crisp, Vercel), durées de conservation et droits (accès, rectification, oubli, portabilité) à valider.
- 🟡 **Localisation des données** : Supabase/Vercel — vérifier la **région d'hébergement** (UE souhaitable). À documenter dans la politique.
- 🟡 Pas de procédure outillée pour le **droit à l'effacement** (suppression d'un lead à la demande).

### CGV / CGU
- ❌ Le site affiche des **prix** (offre de lancement, tarifs) et vend des prestations → des **CGV** sont attendues. Non détectées.

### Facturation électronique (FactuGP)
- ⚠️ La landing communique sur l'**échéance 2026** et la conformité. Si SolYB se positionne comme **fournisseur d'une solution de facturation électronique**, les exigences sont lourdes : norme **EN 16931**, formats (Factur-X / UBL / CII), statut **PDP (Plateforme de Dématérialisation Partenaire)** ou raccordement au **PPF/Chorus Pro**. **Vérifier que les promesses marketing sont tenables** et n'engagent pas juridiquement au-delà du réel (le produit n'existe pas encore en code).

### ResaGP / restauration
- 🟡 Si le produit gère de la réservation restaurant : pas d'enjeu hygiène/allergènes au niveau du site marketing, mais attention aux **claims** sur les fonctionnalités. RGPD s'applique aux données des convives.

### Accessibilité (WCAG / RGAA)
- 🟡 Site très animé (curseur custom, canvas, parallax). À auditer : contrastes, navigation clavier, `prefers-reduced-motion`, alternatives textuelles. Le **RGAA** peut s'appliquer selon le statut.

### Sécurité
- 🔴 Endpoints API sensibles non protégés (`/api/export`, `/api/emails/send`) — cf. §4.
- 🔴 Webhook non signé.
- 🟡 Middleware **fail-open** (accès admin si env manquante).
- 🟡 Messages d'erreur techniques renvoyés au client.
- ✅ Headers de sécurité présents (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) — manque éventuel d'une **CSP**.
- ✅ Crons protégés par secret. Secrets via variables d'environnement (pas en dur).

---

## 7. Améliorations faisables dès maintenant (sans refonte)

### UX/UI
- Ajouter `prefers-reduced-motion` pour désactiver animations lourdes (perf + accessibilité).
- États de chargement/erreur explicites sur les formulaires (au-delà du toast).
- Bandeau cookies non bloquant + lien vers la politique.

### Performances
- Mesurer et optimiser le LCP mobile (le canvas constellations + Framer Motion sont coûteux) ; envisager `dynamic import` / lazy pour le below-the-fold.
- Le dépôt contient **des dizaines de captures PNG/JPEG en racine** (plusieurs Mo) — les déplacer hors du repo (gonfle le clone et potentiellement le déploiement).
- Vérifier que les images servies passent bien par `next/image` (config AVIF/WebP déjà en place ✔).

### Sécurité
- Protéger les 2 endpoints exposés + signer le webhook (quelques lignes chacun).
- Ajouter un honeypot / rate-limit sur `/api/leads` et `/api/interest`.
- Ne plus renvoyer `error.message` brut au client.
- Ajouter une CSP.

### Maintenabilité
- Créer la migration `increment` (ou remplacer par un `update` atomique).
- Centraliser le « mode mock » et réduire les branches conditionnelles.
- Factoriser les longs templates HTML d'email (actuellement en chaînes inline dans `brevo.ts`).
- Ajouter au moins quelques tests sur le scoring (`lib/utils/scoring.ts`) et la validation Zod.

### Monitoring & logs
- Remplacer les `console.log`/`console.error` par un logger structuré.
- Brancher Sentry (ou équivalent) sur les routes API et les crons.
- Activer le suivi d'échec des crons côté Vercel.

---

## 8. Recommandations & priorités

### Ordre recommandé
1. **Sprint sécurité (urgent)** : protéger `/api/export` et `/api/emails/send`, signer le webhook, corriger le fail-open middleware, créer `increment`. *(~1–2 j)*
2. **Conformité minimale légale** : compléter mentions légales (SIRET/forme), bandeau cookies, consentement formulaire, ajouter CGV. *(~1–2 j + relecture juriste)*
3. **Fiabiliser la captation** : brancher la notif admin, tester le flow email complet avec vraies clés Brevo. *(~1 j)*
4. **Valider le CRM en réel** : exécuter les crons, vérifier analytics, parcourir chaque page admin avec données réelles. *(~1–2 j)*
5. **Durcissement** : tests automatisés ciblés, monitoring, nettoyage du repo (captures). *(~2–3 j)*

### Risques en cas de mise en production sans traiter ces points
- **Fuite de données personnelles** (export non protégé) → risque RGPD + réputationnel majeur.
- **Abus du compte Brevo** (endpoint d'envoi ouvert) → blacklist du domaine d'envoi.
- **Non-conformité RGPD/cookies** → mise en demeure CNIL possible.
- **Leads perdus silencieusement** (pas de notif, compteurs cassés) → perte de business directe.
- **Engagement marketing FactuGP** non tenable → risque de publicité trompeuse.

### Charge restante estimée
| Lot | Estimation (j-homme) |
|---|---|
| Sécurité API & correctifs bloquants | 1–2 |
| Conformité légale (hors juriste) | 1–2 |
| Fiabilisation captation + email | 1 |
| Validation CRM en conditions réelles | 1–2 |
| Tests + monitoring + nettoyage | 2–3 |
| **Total pour un MVP production-ready** | **≈ 6 à 10 j-homme** |

---

*Fin de l'audit. Recommandation prioritaire : traiter le « sprint sécurité » avant toute campagne de trafic vers le site.*
