# 🚀 Guide de Configuration Supabase - SolYB CRM

## 📋 Vue d'ensemble

Ce guide vous accompagne **pas à pas** pour configurer votre base de données Supabase pour le CRM SolYB.

⏱️ **Temps estimé** : 15-20 minutes

---

## 🎯 Étape 1 : Créer un compte et un projet Supabase

### 1.1 Créer un compte

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur **Start your project**
3. Connectez-vous avec GitHub (recommandé) ou Email
4. Confirmez votre email si nécessaire

### 1.2 Créer un nouveau projet

1. Dans le dashboard, cliquez sur **New Project**
2. Remplissez les informations :
   - **Organization** : Créez-en une si besoin (ex: "SolYB")
   - **Name** : `solyb-crm` (ou votre choix)
   - **Database Password** : Générez un mot de passe fort (⚠️ **GARDEZ-LE PRÉCIEUSEMENT**)
   - **Region** : Choisissez la plus proche (ex: `Europe West (Ireland)`)
   - **Pricing Plan** : **Free** (gratuit)
3. Cliquez sur **Create new project**
4. ⏳ Patientez 1-2 minutes pendant la création

---

## 🔑 Étape 2 : Récupérer les clés API

### 2.1 Accéder aux paramètres

1. Une fois le projet créé, allez dans **Settings** (⚙️ icône engrenage)
2. Cliquez sur **API** dans le menu latéral

### 2.2 Copier les clés

Vous verrez plusieurs informations. **Copiez** :

✅ **Project URL** (commence par `https://`)
```
Exemple: https://abcdefghijklmnop.supabase.co
```

✅ **anon/public key** (longue clé commençant par `eyJ...`)
```
Exemple: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3...
```

⚠️ **service_role key** (optionnel, pour l'instant)

### 2.3 Configurer les variables d'environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez les valeurs par défaut :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc... (optionnel)

# Brevo (ex-Sendinblue) Configuration
BREVO_API_KEY=votre-brevo-api-key (à configurer plus tard)

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Sauvegardez** le fichier

---

## 🗄️ Étape 3 : Créer le schéma de base de données

### 3.1 Accéder au SQL Editor

1. Dans le dashboard Supabase, cliquez sur **SQL Editor** (icône 📝)
2. Cliquez sur **New query**

### 3.2 Exécuter le schéma complet

1. Ouvrez le fichier `supabase/migrations/001_initial_schema.sql` du projet
2. **Copiez TOUT le contenu** du fichier
3. **Collez** dans l'éditeur SQL de Supabase
4. Cliquez sur **Run** (ou `Ctrl/Cmd + Enter`)
5. ✅ Vous devriez voir : **Success. No rows returned**

### 3.3 Vérifier les tables créées

1. Allez dans **Table Editor** (icône 🗃️)
2. Vous devriez voir **9 tables** :
   - ✅ `leads`
   - ✅ `notes`
   - ✅ `files`
   - ✅ `email_templates`
   - ✅ `email_logs`
   - ✅ `planning_events`
   - ✅ `launch_offer_tracking`
   - ✅ `analytics_snapshots`
   - ✅ `settings`

### 3.4 Vérifier les vues créées

1. Dans le SQL Editor, exécutez :
```sql
SELECT * FROM v_realtime_stats;
SELECT * FROM v_conversion_rates;
```
2. ✅ Devrait retourner des résultats (vides pour l'instant)

---

## 👤 Étape 4 : Créer l'utilisateur admin

### 4.1 Accéder à Authentication

1. Cliquez sur **Authentication** (icône 🔐)
2. Cliquez sur **Users**

### 4.2 Créer l'utilisateur

1. Cliquez sur **Add user** → **Create new user**
2. Remplissez :
   - **Email** : `admin@solyb.gp` (ou votre email)
   - **Password** : Choisissez un mot de passe **fort** (12+ caractères)
   - **Auto Confirm User** : ✅ **Activé** (important!)
3. Cliquez sur **Create user**
4. ✅ L'utilisateur apparaît dans la liste

---

## 🌱 Étape 5 : Insérer les données de test (optionnel)

### 5.1 Seed data pour tester

1. Dans SQL Editor, exécutez le fichier `supabase/seed.sql`
2. Ou créez manuellement quelques leads :

```sql
-- Insérer un lead de test
INSERT INTO leads (
  name,
  email,
  phone,
  company,
  project_type,
  budget,
  description,
  status,
  source
) VALUES (
  'Jean Dupont',
  'jean.dupont@example.com',
  '+590 690 12 34 56',
  'Restaurant Le Créole',
  'vitrine',
  599,
  'Site vitrine pour restaurant avec menu en ligne',
  'nouveau',
  'linkedin'
);

-- Vérifier
SELECT * FROM leads;
```

### 5.2 Insérer les templates d'emails par défaut

```sql
-- Template 1: Email de bienvenue
INSERT INTO email_templates (
  name,
  subject,
  body,
  category,
  sequence_step,
  is_active
) VALUES (
  'Email de bienvenue (J+0)',
  'Bienvenue chez SolYB - Votre projet {{type_projet}}',
  'Bonjour {{prenom}},

Merci pour votre demande concernant votre projet {{type_projet}} pour {{company}}.

Je suis Yacine, développeur web en Guadeloupe, et je suis ravi de pouvoir vous accompagner.

🎯 Prochaines étapes :
1. J''analyse votre demande en détail
2. Je vous recontacte sous 24h avec un devis personnalisé
3. Nous discutons ensemble de vos besoins

💡 Disponible pour échanger : +590 690 XX XX XX

À très vite,
Yacine - SolYB

---

https://solyb.gp',
  'sequence',
  1,
  true
);
```

---

## 🔒 Étape 6 : Configurer la sécurité (RLS)

### 6.1 Vérifier que RLS est activé

Le schéma SQL a déjà activé RLS sur toutes les tables. Vérifiez :

1. Dans Table Editor, cliquez sur une table (ex: `leads`)
2. Allez dans l'onglet **RLS** (Row Level Security)
3. ✅ Vous devriez voir "Row Level Security is enabled"

### 6.2 Tester les policies

Les policies créées permettent l'accès complet aux utilisateurs authentifiés.

En SQL Editor :
```sql
-- Vérifier les policies
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

---

## ✅ Étape 7 : Tester la connexion

### 7.1 Redémarrer le serveur Next.js

1. Arrêtez le serveur (`Ctrl+C`)
2. Relancez : `npm run dev`
3. Le warning "Supabase non configuré" devrait **disparaître**

### 7.2 Tester l'authentification

1. Allez sur `http://localhost:3000/login`
2. Connectez-vous avec :
   - **Email** : `admin@solyb.gp`
   - **Mot de passe** : Celui que vous avez choisi
3. ✅ Vous devriez être redirigé vers `/admin`

### 7.3 Tester l'accès aux données

1. Dans le dashboard admin, vérifiez que les données s'affichent
2. Si vous avez inséré des leads de test, ils devraient apparaître dans le Pipeline

---

## 🔧 Dépannage

### ❌ "Supabase non configuré"

**Cause** : Variables d'environnement incorrectes

**Solution** :
1. Vérifiez `.env.local`
2. Assurez-vous que les valeurs ne contiennent pas `your-project-url`
3. Redémarrez le serveur

### ❌ "Invalid login credentials"

**Cause** : Utilisateur non créé ou non confirmé

**Solution** :
1. Allez dans Supabase → Authentication → Users
2. Vérifiez que l'utilisateur existe
3. Vérifiez que `email_confirmed_at` n'est **pas** null
4. Si null, éditez l'utilisateur et cochez "Auto Confirm User"

### ❌ "relation 'leads' does not exist"

**Cause** : Schéma SQL non exécuté

**Solution** :
1. Retournez à l'Étape 3
2. Exécutez le fichier `001_initial_schema.sql`
3. Vérifiez dans Table Editor que les tables existent

### ❌ Erreur de connexion à la base

**Cause** : Projet Supabase en pause (inactif >7 jours sur plan gratuit)

**Solution** :
1. Allez dans le dashboard Supabase
2. Cliquez sur **Restore project**
3. Patientez quelques minutes

---

## 📊 Étape 8 : Configuration avancée (optionnel)

### 8.1 Configurer les webhooks (pour emails)

Dans Supabase → Database → Webhooks :
1. Créez un webhook pour `email_logs` (INSERT)
2. URL : `https://votre-domaine.com/api/webhooks/brevo`
3. Activez-le

### 8.2 Configurer les Edge Functions (optionnel)

Pour les cron jobs de séquences email automatiques.

### 8.3 Configurer le Storage

1. Allez dans **Storage**
2. Créez un bucket `lead-files` (public)
3. Configurez les policies d'upload

---

## 📋 Checklist finale

- [ ] Projet Supabase créé
- [ ] Variables d'environnement configurées
- [ ] Schéma SQL exécuté (9 tables créées)
- [ ] Utilisateur admin créé et confirmé
- [ ] Connexion testée avec succès
- [ ] Dashboard accessible
- [ ] Données de test insérées (optionnel)
- [ ] RLS activé et policies vérifiées

---

## 🚀 Étapes suivantes

Une fois Supabase configuré :

1. ✅ **Configurer Brevo** pour les emails
2. ✅ **Tester le formulaire de contact** sur le site vitrine
3. ✅ **Créer des leads** via le dashboard
4. ✅ **Tester les séquences email**
5. ✅ **Déployer sur Vercel**

---

## 📞 Support

**Problèmes persistants ?**

1. Vérifiez la [documentation Supabase](https://supabase.com/docs)
2. Consultez les logs dans Supabase → Logs
3. Vérifiez la console du navigateur (F12)
4. Vérifiez les logs du serveur Next.js

---

## 🎓 Ressources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

---

**Version** : 1.0.0
**Dernière mise à jour** : Décembre 2025
**Auteur** : SolYB CRM Team
