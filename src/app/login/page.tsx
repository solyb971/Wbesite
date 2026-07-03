"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from "lucide-react"
import { login } from "@/lib/auth/actions"
import { useAuth } from "@/hooks/useAuth"

const inputBase: React.CSSProperties = {
  background: "#120F0B",
  border: "1px solid rgba(245,237,216,0.12)",
  color: "#F5EDD8",
  borderRadius: "10px",
  padding: "12px 14px 12px 42px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  transition: "border-color .2s",
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      router.push(searchParams.get("redirect") || "/admin")
    }
  }, [user, authLoading, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      window.location.href = searchParams.get("redirect") || "/admin"
      return
    }

    try {
      const result = await login(email, password)
      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }
      window.location.href = searchParams.get("redirect") || "/admin"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
      setLoading(false)
    }
  }

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#120F0B" }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#C4472A" }} />
      </div>
    )
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#C4472A" }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "rgba(245,237,216,0.12)" }

  return (
    <div className="login-shell min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "#120F0B" }}>
      {/* Lueurs terre cuite */}
      <div className="absolute pointer-events-none" style={{ top: "-200px", left: "-160px", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,71,42,0.18), transparent 70%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "-220px", right: "-160px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,71,42,0.10), transparent 70%)" }} />

      <div className="relative w-full max-w-md rounded-2xl p-8 sm:p-10" style={{ background: "#1A1511", border: "1px solid rgba(196,71,42,0.20)" }}>
        {/* Logo + titre */}
        <div className="flex flex-col items-center text-center mb-8">
          <Image src="/logo/syb-orange.png" alt="SolYB" width={160} height={160} className="h-12 w-auto mb-5" priority />
          <h1 className="font-display font-black" style={{ fontSize: "28px", color: "#F5EDD8", letterSpacing: "-0.5px" }}>
            Espace <em className="italic font-light" style={{ color: "#C4472A" }}>admin</em>
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#A89880" }}>Connectez-vous au CRM SolYB.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-3 rounded-lg p-3" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" }}>
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#F87171" }} />
              <div className="text-sm" style={{ color: "#F1B0A8" }}>{error}</div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: "#A89880" }}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7E715E" }} />
              <input id="email" type="email" placeholder="admin@solyb.fr" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} autoComplete="email" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium mb-1.5" style={{ color: "#A89880" }}>Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7E715E" }} />
              <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} autoComplete="current-password" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg font-semibold transition-transform hover:-translate-y-px"
            style={{ background: "#C4472A", color: "#fff", padding: "13px", fontSize: "15px", opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
          >
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Connexion…</>) : (<>Se connecter <ArrowRight className="w-4 h-4" /></>)}
          </button>
        </form>

        <p className="mt-7 pt-6 text-center text-xs" style={{ borderTop: "1px solid rgba(245,237,216,0.08)", color: "#7E715E" }}>
          Accès réservé aux administrateurs SolYB · Guadeloupe
        </p>
      </div>
    </div>
  )
}

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#120F0B" }}>
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#C4472A" }} />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  )
}
