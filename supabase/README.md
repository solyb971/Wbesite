# Configuration Supabase - SolYB CRM

## 📋 Guide de Configuration

### 1. Créer un Compte Supabase

1. Aller sur [https://supabase.com](https://supabase.com)
2. Créer un compte gratuit (si pas déjà fait)
3. Cliquer sur "New Project"
4. Choisir un nom: `solyb-crm`
5. Générer un mot de passe fort (le sauvegarder!)
6. Choisir la région: **Europe West (eu-west-1)** (France)
7. Cliquer sur "Create new project"
8. Attendre ~2 minutes que le projet soit créé

### 2. Récupérer les Clés API

1. Dans votre projet Supabase, aller dans **Settings** (icône engrenage)
2. Cliquer sur **API**
3. Copier les informations suivantes:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUz...`
   - **service_role key**: `eyJhbGciOiJIUz...` (à garder PRIVÉE)

### 3. Configurer les Variables d'Environnement

1. Ouvrir le fichier `.env.local` à la racine du projet
2. Remplacer les valeurs placeholder:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUz...

# Désactiver le mode mock maintenant qu'on a Supabase
NEXT_PUBLIC_USE_MOCK=false
```

3. Sauvegarder le fichier
4. Redémarrer le serveur Next.js: `npm run dev`

### 4. Exécuter le Schéma de Base de Données

1. Dans votre projet Supabase, aller dans **SQL Editor** (icône SQL)
2. Cliquer sur **New Query**
3. Copier TOUT le contenu du fichier `migrations/001_initial_schema.sql`
4. Coller dans l'éditeur SQL
5. Cliquer sur **RUN** (bouton vert en bas)
6. Attendre ~10 secondes que tout s'exécute
7. Vérifier qu'il n'y a **pas d'erreurs** (messages verts uniquement)

✅ **Résultat attendu**:
- 9 tables créées
- 4 fonctions créées
- 4 triggers créés
- 3 vues créées
- Policies RLS activées

### 5. Insérer les Données de Test (Seed)

1. Toujours dans **SQL Editor**
2. Cliquer sur **New Query**
3. Copier TOUT le contenu du fichier `seed.sql`
4. Coller dans l'éditeur
5. Cliquer sur **RUN**
6. Attendre ~5 secondes

✅ **Résultat attendu**:
- 20 leads créés
- 8 templates email créés
- 12 notes créées
- 4 événements planning créés

### 6. Vérifier que Tout Fonctionne

#### 6.1 Vérifier les Tables

1. Aller dans **Table Editor**
2. Vous devriez voir toutes les tables:
   - leads
   - notes
   - files
   - email_templates
   - email_logs
   - planning_events
   - launch_offer_tracking
   - analytics_snapshots
   - settings

#### 6.2 Vérifier les Leads

1. Cliquer sur la table **leads**
2. Vous devriez voir **20 lignes** avec des leads fictifs
3. Vérifier que les statuts sont variés (nouveau, contact, devis, gagne, perdu)

#### 6.3 Vérifier les Settings

1. Cliquer sur la table **settings**
2. Vous devriez voir **8 lignes** avec les paramètres par défaut

### 7. Créer un Utilisateur Admin

1. Aller dans **Authentication** → **Users**
2. Cliquer sur **Add User** → **Create New User**
3. Remplir:
   - **Email**: `admin@solyb.gp` (ou votre email)
   - **Password**: Générer un mot de passe fort (le sauvegarder!)
   - Décocher **Auto Confirm User** si présent
4. Cliquer sur **Create User**

✅ Cet utilisateur pourra se connecter au dashboard admin.

### 8. Configurer le Storage (Optionnel - pour Phase 4)

Pour permettre l'upload de fichiers (devis PDF, images, etc.):

1. Aller dans **Storage**
2. Cliquer sur **Create a new bucket**
3. Nom: `solyb-files`
4. **Public bucket**: Décocher (privé)
5. Cliquer sur **Create bucket**

#### Policies Storage

1. Cliquer sur le bucket `solyb-files`
2. Aller dans **Policies**
3. Créer 2 policies:

**Policy 1: Upload**
```sql
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'solyb-files');
```

**Policy 2: Download**
```sql
CREATE POLICY "Authenticated users can download files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'solyb-files');
```

### 9. Tester la Connexion depuis l'App

1. Redémarrer Next.js si pas déjà fait: `npm run dev`
2. Ouvrir http://localhost:3000
3. Ouvrir la console développeur (F12)
4. Taper dans la console:
   ```javascript
   // Devrait afficher les leads
   fetch('http://localhost:3000/api/leads')
     .then(r => r.json())
     .then(console.log)
   ```

✅ Vous devriez voir la liste des 20 leads en JSON.

### 10. Activer Realtime (Optionnel)

Pour la synchronisation temps réel du Kanban:

1. Aller dans **Database** → **Replication**
2. Trouver la table **leads**
3. Activer **Realtime**
4. Faire pareil pour: **notes**, **planning_events**

---

## 🐛 Dépannage

### Erreur: "relation does not exist"

➡️ Le schéma n'a pas été exécuté correctement.
- Revenir à l'étape 4
- Vérifier qu'il n'y a pas d'erreurs SQL

### Erreur: "permission denied"

➡️ Les policies RLS bloquent l'accès.
- Vérifier que vous êtes authentifié
- Vérifier que les policies sont bien créées (étape 4)

### Erreur: "Invalid API key"

➡️ Les clés dans `.env.local` sont incorrectes.
- Re-vérifier Settings → API dans Supabase
- Re-copier les clés exactes
- Redémarrer Next.js

### Les données ne s'affichent pas

➡️ Le seed n'a pas été exécuté.
- Retourner à l'étape 5
- Vérifier dans Table Editor que les données sont présentes

---

## 📊 Limites Free Tier Supabase

- **Database**: 500 MB
- **Storage**: 1 GB
- **Bandwidth**: 5 GB/mois
- **Monthly Active Users**: Illimité
- **API Requests**: Illimitées

✅ Largement suffisant pour SolYB CRM !

Si dépassement, upgrade à **8$/mois** (Pro Plan).

---

## 🔐 Sécurité

**⚠️ IMPORTANT**:

1. **Jamais committer `.env.local`** (déjà dans `.gitignore`)
2. **Service Role Key** = PRIVÉE (jamais côté client)
3. **Anon Key** = Publique (protection par RLS)
4. Changer le mot de passe admin régulièrement
5. Activer 2FA sur votre compte Supabase

---

## ✅ Checklist Finale

- [ ] Compte Supabase créé
- [ ] Projet créé (région Europe)
- [ ] Clés API récupérées
- [ ] `.env.local` configuré
- [ ] Schéma SQL exécuté (001_initial_schema.sql)
- [ ] Seed data inséré (seed.sql)
- [ ] Utilisateur admin créé
- [ ] Tables visibles dans Table Editor
- [ ] 20 leads visibles dans table leads
- [ ] Storage bucket créé (optionnel)
- [ ] Connexion testée depuis l'app
- [ ] Realtime activé (optionnel)

🎉 **Configuration Supabase terminée !**

Vous pouvez maintenant développer les features du CRM avec une vraie base de données.
