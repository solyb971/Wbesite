# SolYB CRM - Système de Gestion Client

> Système CRM complet avec site vitrine pour Solutions by Yacine Bouhassoun (SolYB)

## 🎯 Description

SolYB CRM est un système complet de gestion de la relation client conçu pour les services digitaux en Guadeloupe. Il combine un site vitrine public avec un dashboard administrateur puissant pour gérer leads, projets, planning et analytics.

## 🏗️ Stack Technique

- **Frontend**: Next.js 14 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Email**: Brevo API (ex-Sendinblue)
- **Hosting**: Vercel
- **Contrainte**: 100% gratuit (free tiers)

## 📦 Dépendances Principales

- `@supabase/supabase-js` - Client Supabase
- `@dnd-kit/core` - Drag & drop pour Kanban
- `react-hook-form` + `zod` - Gestion formulaires
- `recharts` - Graphiques analytics
- `jspdf` - Génération PDF (devis)
- `react-hot-toast` - Notifications
- `lucide-react` - Icons
- `date-fns` - Manipulation dates

## 🚀 Démarrage Rapide

### 1. Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local
```

### 2. Configuration Supabase

1. Créer un compte gratuit sur [Supabase](https://supabase.com)
2. Créer un nouveau projet
3. Récupérer l'URL et les clés API (Settings → API)
4. Mettre à jour `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. Exécuter le schéma de base de données:
   - Aller dans SQL Editor de Supabase
   - Exécuter le contenu de `supabase/migrations/001_initial_schema.sql`
   - Exécuter le contenu de `supabase/seed.sql` pour les données de test

6. Créer un utilisateur admin:
   - Aller dans Authentication → Users
   - Créer un utilisateur avec email: `admin@solyb.gp`

### 3. Configuration Brevo

1. Créer un compte gratuit sur [Brevo](https://www.brevo.com)
2. Créer une clé API (Settings → API Keys)
3. Mettre à jour `.env.local`:
   ```env
   BREVO_API_KEY=your-brevo-api-key
   ```

### 4. Lancer l'Application

```bash
# Mode développement
npm run dev

# Build production
npm run build
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
solyb-crm/
├── public/                    # Fichiers statiques
│   ├── manifest.json         # PWA manifest
│   └── [icons]
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (public)/         # Routes publiques
│   │   ├── admin/           # Dashboard CRM
│   │   ├── api/             # API Routes
│   │   ├── login/           # Authentification
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Styles globaux
│   ├── components/
│   │   ├── site/            # Composants site vitrine
│   │   ├── admin/           # Composants CRM
│   │   └── ui/              # shadcn/ui components
│   ├── lib/
│   │   ├── supabase/        # Clients Supabase
│   │   ├── email/           # Gestion emails
│   │   ├── utils/           # Fonctions utilitaires
│   │   └── validations/     # Schemas Zod
│   ├── hooks/               # Custom hooks React
│   └── types/               # Types TypeScript
├── supabase/
│   ├── migrations/          # Migrations SQL
│   ├── functions/           # Edge Functions
│   └── seed.sql            # Données de test
└── ...
```

## 🎨 Fonctionnalités

### Site Vitrine (Public)
- ✅ Homepage avec sections Hero, Services, Process, Tarifs
- ✅ Formulaire de contact avec validation
- ✅ Compteur offre de lancement en temps réel
- ✅ Pages Services et Tarifs détaillées
- ✅ Responsive mobile-first
- ✅ SEO optimisé

### Dashboard CRM (Admin)
- ✅ Pipeline Kanban drag & drop (5 colonnes)
- ✅ Fiche lead détaillée avec:
  - Scoring automatique (6 critères)
  - Timeline d'activités
  - Notes et tâches
  - Upload de fichiers
  - Générateur de devis PDF
  - Suivi séquence email
- ✅ Planning avec gestion de capacité
- ✅ Analytics et reporting:
  - Funnel de conversion
  - Évolution CA
  - Sources performantes
  - Temps moyens
- ✅ Templates d'emails personnalisables
- ✅ Séquences email automatiques
- ✅ Export CSV/JSON
- ✅ Settings configurables

### Automations & Cron Jobs
- ✅ **Séquences Email** (J+0, J+3, J+7, J+10) - Cron quotidien 9h00
- ✅ **Alertes Quotidiennes** - Cron 8h00 (leads non contactés, devis bloqués, surcharge)
- ✅ **Snapshots Analytics** - Cron 1h00 (historique métriques quotidiennes)
- ✅ Calcul automatique du score lead (triggers DB)
- ✅ Compteur offre de lancement automatique
- ✅ Alertes capacité planning
- ✅ Webhooks Brevo (tracking ouvertures/clics emails)
- ✅ Génération PDF automatique (devis professionnels)

## 🔧 Scripts Disponibles

```bash
npm run dev         # Démarrage serveur développement
npm run dev:clean   # Clean .next et démarrage
npm run build       # Build production
npm run start       # Démarrage serveur production
npm run lint        # Linter ESLint
npm run clean       # Nettoyer le cache .next
```

## ⏰ Cron Jobs Vercel

Le projet utilise Vercel Cron Jobs configurés dans `vercel.json`:

| Endpoint | Schedule | Description |
|----------|----------|-------------|
| `/api/cron/email-sequences` | `0 9 * * *` | Envoi séquences emails automatiques (9h daily) |
| `/api/cron/alerts` | `0 8 * * *` | Génération alertes admin (8h daily) |
| `/api/cron/analytics-snapshot` | `0 1 * * *` | Snapshot métriques quotidiennes (1h daily) |

**Security**: Tous les cron endpoints nécessitent un header `Authorization: Bearer ${CRON_SECRET}`

## 🌐 Déploiement Vercel

1. Connecter votre repo GitHub à Vercel
2. Configurer les variables d'environnement (Settings → Environment Variables)
3. Déployer automatiquement à chaque push sur `main`

## 📊 Phases de Développement

- [x] **Phase 0**: Setup Projet & Infrastructure
- [x] **Phase 1**: Base de Données & Authentification
- [x] **Phase 2**: Site Vitrine Public
- [x] **Phase 3**: Dashboard Core & Pipeline Kanban
- [x] **Phase 4**: Lead Detail & Gestion Avancée
- [x] **Phase 5**: Planning & Gestion Charge
- [x] **Phase 6**: Analytics & Reporting
- [x] **Phase 7**: Templates Email & Automations
- [x] **Phase 8**: Settings & Configuration
- [x] **Phase 9**: Authentification & Sécurité
- [x] **Phase 10**: Polish & Optimisations
- [x] **Phase 11**: PWA & Automation Cron Jobs

## 📝 Notes de Développement

### Mode Mock (sans Supabase/Brevo)
Pour développer sans configurer Supabase/Brevo, activer le mode mock:
```env
NEXT_PUBLIC_USE_MOCK=true
```

### Limites Free Tier
- **Supabase**: 500MB DB + 1GB storage + 50k requêtes/mois
- **Brevo**: 300 emails/jour
- **Vercel**: 100GB bandwidth/mois

## 🔐 Sécurité

- Row Level Security (RLS) activé sur toutes les tables Supabase
- Validation Zod sur tous les formulaires
- Middleware d'authentification sur routes `/admin/*`
- Variables sensibles jamais committées (`.gitignore`)
- HTTPS uniquement (enforced par Vercel)

## 📄 Licence

Propriétaire - SolYB (Solutions by Yacine Bouhassoun)

## 🆘 Support

Pour toute question ou problème:
- Email: contact@solyb.gp
- LinkedIn: [Yacine Bouhassoun]

---

**Version**: 1.0.0
**Dernière mise à jour**: Décembre 2025
**Auteur**: Yacine Bouhassoun (SolYB)
