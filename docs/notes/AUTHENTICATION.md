# 🔐 Guide d'Authentification - SolYB CRM

## 📋 Vue d'ensemble

Le système d'authentification de SolYB CRM utilise **Supabase Auth** pour sécuriser l'accès au dashboard administrateur.

### Fonctionnalités implémentées

✅ Page de connexion (`/login`)
✅ Déconnexion depuis le dashboard
✅ Protection automatique des routes `/admin/*`
✅ Redirection automatique si déjà connecté
✅ Gestion de session persistante
✅ Hook `useAuth()` pour accéder à l'utilisateur courant

---

## 🚀 Configuration

### 1. Créer un utilisateur admin dans Supabase

Une fois votre projet Supabase configuré :

1. Allez dans **Authentication** → **Users**
2. Cliquez sur **Add user** → **Create new user**
3. Entrez :
   - **Email** : `admin@solyb.gp` (ou votre email)
   - **Password** : Choisissez un mot de passe sécurisé
   - **Auto Confirm User** : ✅ (activé)
4. Cliquez sur **Create user**

### 2. Variables d'environnement

Assurez-vous que votre `.env.local` contient :

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🔑 Utilisation

### Se connecter

1. Allez sur `http://localhost:3000/login`
2. Entrez vos identifiants :
   - Email : `admin@solyb.gp`
   - Mot de passe : Votre mot de passe
3. Cliquez sur **Se connecter**
4. → Redirection automatique vers `/admin`

### Se déconnecter

Depuis n'importe quelle page admin :
1. Cliquez sur votre **avatar/nom** (coin supérieur droit)
2. Cliquez sur **Déconnexion**
3. → Redirection vers `/login`

---

## 🛡️ Protection des routes

### Routes protégées

Toutes les routes commençant par `/admin/*` sont **automatiquement protégées** :

- `/admin` - Dashboard principal
- `/admin/leads/[id]` - Détail lead
- `/admin/planning` - Planning
- `/admin/analytics` - Analytics
- `/admin/templates` - Templates
- `/admin/settings` - Paramètres

### Middleware

Le middleware (`src/middleware.ts`) :
- Vérifie l'authentification sur toutes les routes `/admin/*`
- Redirige vers `/login` si non authentifié
- Conserve l'URL demandée via `?redirect=`
- Rafraîchit automatiquement la session

### Mode développement

Si Supabase n'est pas configuré, le système fonctionne en **mode développement** :
- Accès autorisé sans authentification
- Warning dans la console : `⚠️ Supabase non configuré`

---

## 🧩 Utilisation dans le code

### Hook `useAuth()`

Utilisez le hook pour accéder à l'utilisateur courant :

```tsx
import { useAuth } from "@/hooks/useAuth"

function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) return <div>Chargement...</div>

  if (!isAuthenticated) return <div>Non connecté</div>

  return <div>Bonjour {user.email}</div>
}
```

### Actions serveur

Actions disponibles dans `@/lib/auth/actions` :

```tsx
import { login, logout, getCurrentUser, resetPassword } from "@/lib/auth/actions"

// Connexion
const result = await login(email, password)
if (result.error) console.error(result.error)

// Déconnexion
await logout()

// Utilisateur courant (server-side)
const user = await getCurrentUser()

// Réinitialisation mot de passe
await resetPassword(email)
```

---

## 🔧 Personnalisation

### Modifier les identifiants par défaut

1. Dans Supabase Dashboard → Authentication → Users
2. Modifiez l'email/mot de passe de votre utilisateur

### Ajouter d'autres utilisateurs

1. Créez de nouveaux utilisateurs dans Supabase
2. Ils pourront se connecter avec leurs identifiants

### Personnaliser la page de login

Éditez `src/app/login/page.tsx` :
- Changer les couleurs
- Ajouter un logo
- Modifier les textes

---

## 🐛 Dépannage

### "Email ou mot de passe incorrect"

- Vérifiez que l'utilisateur existe dans Supabase
- Vérifiez que le mot de passe est correct
- Assurez-vous que l'utilisateur est confirmé (`email_confirmed_at` non null)

### Redirection infinie

- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont correctement configurés
- Videz le cache du navigateur
- Supprimez les cookies Supabase

### "Supabase non configuré"

- Créez un projet Supabase
- Copiez l'URL et la clé dans `.env.local`
- Redémarrez le serveur de développement

---

## 🔒 Sécurité

### Bonnes pratiques

✅ **Mots de passe forts** : Minimum 12 caractères, majuscules, minuscules, chiffres, symboles
✅ **HTTPS uniquement** : Activé automatiquement sur Vercel
✅ **Session timeout** : Géré automatiquement par Supabase (1 heure par défaut)
✅ **Rate limiting** : Activé sur Supabase Auth
✅ **Cookies HttpOnly** : Utilisés par Supabase SSR

### Ne JAMAIS

❌ Committer les fichiers `.env.local`
❌ Partager les clés API publiquement
❌ Utiliser des mots de passe faibles
❌ Désactiver HTTPS en production

---

## 📚 Ressources

- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Middleware Next.js](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

## ✅ Checklist de déploiement

Avant de déployer en production :

- [ ] Créer un utilisateur admin dans Supabase production
- [ ] Configurer les variables d'environnement sur Vercel
- [ ] Tester la connexion/déconnexion
- [ ] Vérifier la protection des routes
- [ ] Activer l'authentification à deux facteurs (optionnel)
- [ ] Configurer les politiques de mot de passe dans Supabase

---

**Version** : 1.0.0
**Dernière mise à jour** : Décembre 2025
