/**
 * Middleware Next.js pour gérer l'authentification Supabase
 * Rafraîchit automatiquement les sessions utilisateur
 * Protège les routes /admin/*
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // En mode mock, skip l'authentification Supabase
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

  if (useMock) {
    // En mode développement avec mock, autoriser l'accès à toutes les routes
    return response
  }

  // Vérifier que les variables d'environnement Supabase sont configurées
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey ||
      supabaseUrl.includes('your-project-url') ||
      supabaseKey.includes('your-anon-key')) {
    console.warn('⚠️  Supabase non configuré')
    // Fail-closed : sans config d'auth, on ne laisse PAS passer /admin.
    // (Le mode dev sans Supabase reste possible via NEXT_PUBLIC_USE_MOCK=true.)
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options: any }>) {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: any }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: any }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Rafraîchir la session si elle existe
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protéger les routes /admin/*
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    // Redirect vers login si pas authentifié
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
