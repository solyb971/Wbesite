"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_USE_MOCK === "true"

// Mock user for development
const MOCK_USER = {
  id: "mock-user-id",
  email: "admin@solyb.fr",
  role: "admin",
  created_at: new Date().toISOString(),
}

/**
 * Connexion utilisateur
 */
export async function login(email: string, password: string) {
  // Mock mode: accept any credentials
  if (IS_MOCK_MODE) {
    console.log("🔐 [MOCK MODE] Login:", email)
    revalidatePath("/", "layout")
    return { success: true, user: { ...MOCK_USER, email } }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect"
        : error.message,
    }
  }

  revalidatePath("/", "layout")
  return { success: true, user: data.user }
}

/**
 * Déconnexion utilisateur
 */
export async function logout() {
  if (IS_MOCK_MODE) {
    console.log("🔐 [MOCK MODE] Logout")
    revalidatePath("/", "layout")
    redirect("/login")
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/login")
}

/**
 * Récupérer l'utilisateur courant
 */
export async function getCurrentUser() {
  if (IS_MOCK_MODE) {
    return MOCK_USER
  }

  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

/**
 * Vérifier si l'utilisateur est authentifié
 */
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Réinitialisation du mot de passe
 */
export async function resetPassword(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: "Email de réinitialisation envoyé" }
}

/**
 * Mise à jour du mot de passe
 */
export async function updatePassword(newPassword: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: "Mot de passe mis à jour" }
}
