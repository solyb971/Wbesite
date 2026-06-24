"use client"

import { useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, Loader2, CheckCircle, ArrowRight, ArrowLeft, User, FileText, Globe, ShoppingCart, FileCheck, Smartphone, Cloud, Target } from "lucide-react"
import HoneypotField from "@/components/site/HoneypotField"

const step1Schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  project_type: z.string().min(1, "Sélectionnez un type de projet"),
})

const step2Schema = z.object({
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1, "Sélectionnez un budget"),
  description: z.string().min(20, "Minimum 20 caractères"),
  urgency: z.string().default("normal"),
  source: z.string().default("site-web"),
})

const fullSchema = step1Schema.merge(step2Schema)
type FormData = z.infer<typeof fullSchema>

const projectTypes = [
  { value: "vitrine", label: "Site Vitrine", price: "599€", icon: Globe, iconColor: "text-turquoise" },
  { value: "ecommerce", label: "E-commerce", price: "999€", icon: ShoppingCart, iconColor: "text-coral" },
  { value: "facturation", label: "Facturation Élec.", price: "Audit gratuit", icon: FileCheck, iconColor: "text-solar" },
  { value: "application", label: "Application", price: "Sur devis", icon: Smartphone, iconColor: "text-violet" },
  { value: "saas", label: "SaaS / Marketplace", price: "Sur devis", icon: Cloud, iconColor: "text-sky" },
  { value: "custom", label: "Sur mesure", price: "Sur devis", icon: Target, iconColor: "text-lime" },
]

function ContactFormInner() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service") || ""

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: { urgency: "normal", source: "site-web", project_type: serviceParam },
  })

  const projectType = watch("project_type")

  const nextStep = async () => {
    const isValid = await trigger(["name", "email", "project_type"])
    if (isValid) setStep(2)
  }

  const onSubmit = async (data: FormData) => {
    if (!consent) {
      setConsentError(true)
      return
    }
    setConsentError(false)
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company_website: honeypotRef.current?.value || "" }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Une erreur est survenue")
      }
      setIsSuccess(true)
      reset()
      setTimeout(() => { window.location.href = "/merci" }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-turquoise/10 border border-turquoise/30 rounded-2xl p-12 text-center">
        <CheckCircle
          className="w-16 h-16 text-turquoise mx-auto mb-4"
          style={{ animation: "successBounce 0.6s cubic-bezier(0.22,1,0.36,1) forwards" }}
        />
        <h3 className="font-display text-2xl font-bold text-[#F0EDE8] mb-2">
          Demande envoyée !
        </h3>
        <p className="text-[#8B8B9E]">
          Merci pour votre confiance. Je vous recontacte sous 24h maximum.
        </p>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 bg-[#1C1C26] border border-[#2A2A38] rounded-xl text-[#F0EDE8] placeholder-[#8B8B9E] focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition text-base"
  const inputErrorClass = "w-full px-4 py-3 bg-[#1C1C26] border border-coral/60 rounded-xl text-[#F0EDE8] placeholder-[#8B8B9E] focus:ring-2 focus:ring-coral/50 focus:border-coral/50 transition text-base"

  return (
    <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#8B8B9E]">Étape {step} sur 2</span>
          <span className="text-sm text-[#8B8B9E]">{step === 1 ? "Vos informations" : "Votre projet"}</span>
        </div>
        <div className="h-1.5 bg-[#2A2A38] rounded-full overflow-hidden">
          <div
            className="h-full bg-coral transition-all duration-500"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-coral/10 border border-coral/30 text-coral rounded-xl p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <HoneypotField ref={honeypotRef} />
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-coral/10 border border-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-7 h-7 text-coral" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#F0EDE8]">Parlons de vous</h3>
              <p className="text-sm text-[#8B8B9E] mt-1">3 informations pour commencer</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#F0EDE8] mb-2">
                Votre nom <span className="text-coral">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                className={errors.name ? inputErrorClass : inputClass}
                placeholder="Jean Dupont"
              />
              {errors.name && <p className="mt-1 text-xs text-coral">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#F0EDE8] mb-2">
                Votre email <span className="text-coral">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className={errors.email ? inputErrorClass : inputClass}
                placeholder="jean@exemple.fr"
              />
              {errors.email && <p className="mt-1 text-xs text-coral">{errors.email.message}</p>}
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-semibold text-[#F0EDE8] mb-3">
                Type de projet <span className="text-coral">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {projectTypes.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-coral/50 ${
                      projectType === option.value
                        ? option.value === "facturation"
                          ? "border-solar bg-solar/10"
                          : "border-coral bg-coral/10"
                        : "border-[#2A2A38] hover:bg-[#1C1C26]"
                    }`}
                  >
                    <input
                      {...register("project_type")}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <option.icon className={`w-6 h-6 mb-2 ${option.iconColor}`} />
                    <span className="font-semibold text-[#F0EDE8] text-xs text-center leading-tight mb-1">{option.label}</span>
                    <span className={`text-xs font-medium ${
                      option.value === "facturation" ? "text-solar" : "text-coral"
                    }`}>{option.price}</span>
                  </label>
                ))}
              </div>
              {errors.project_type && (
                <p className="mt-2 text-xs text-coral">{errors.project_type.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-coral hover:bg-coral-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] flex items-center justify-center shadow-lg shadow-coral/20"
            >
              Continuer
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-coral/10 border border-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-coral" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#F0EDE8]">Décrivez votre projet</h3>
              <p className="text-sm text-[#8B8B9E] mt-1">Ces détails m'aideront à préparer votre devis</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#F0EDE8] mb-2">Téléphone</label>
                <input
                  {...register("phone")}
                  type="tel"
                  className={inputClass}
                  placeholder="+590 690..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F0EDE8] mb-2">Entreprise</label>
                <input
                  {...register("company")}
                  type="text"
                  className={inputClass}
                  placeholder="Mon Entreprise"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F0EDE8] mb-2">
                Budget indicatif <span className="text-coral">*</span>
              </label>
              <select
                {...register("budget")}
                className={errors.budget ? inputErrorClass : inputClass}
              >
                <option value="" className="bg-[#1C1C26]">-- Sélectionnez --</option>
                <option value="<500" className="bg-[#1C1C26]">Moins de 500€</option>
                <option value="500-1000" className="bg-[#1C1C26]">500€ - 1 000€</option>
                <option value="1000-2000" className="bg-[#1C1C26]">1 000€ - 2 000€</option>
                <option value=">2000" className="bg-[#1C1C26]">Plus de 2 000€</option>
              </select>
              {errors.budget && <p className="mt-1 text-xs text-coral">{errors.budget.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F0EDE8] mb-2">
                Décrivez votre projet <span className="text-coral">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className={errors.description ? inputErrorClass : inputClass}
                placeholder="Décrivez brièvement votre projet, vos objectifs..."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-coral">{errors.description.message}</p>
              )}
            </div>

            <input type="hidden" {...register("urgency")} value="normal" />
            <input type="hidden" {...register("source")} value="site-web" />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-[#1C1C26] hover:bg-[#2A2A38] text-[#8B8B9E] px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center border border-[#2A2A38]"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Retour
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-coral hover:bg-coral-600 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-coral/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer ma demande
                  </>
                )}
              </button>
            </div>
            <label className="flex items-start gap-2 mt-3 text-xs text-[#8B8B9E] leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  if (e.target.checked) setConsentError(false)
                }}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-coral"
              />
              <span>
                J&apos;accepte que mes données soient utilisées pour traiter ma demande,
                conformément à la{" "}
                <a href="/confidentialite" className="underline hover:text-[#F0EDE8]">
                  politique de confidentialité
                </a>
                . <span className="text-coral">*</span>
              </span>
            </label>
            {consentError && (
              <p className="mt-1 text-xs text-coral text-center">
                Veuillez accepter la politique de confidentialité pour continuer.
              </p>
            )}
          </div>
        )}
      </form>

      <div className="mt-6 pt-6 border-t border-[#2A2A38] flex flex-wrap items-center justify-center gap-6 text-xs text-[#8B8B9E]">
        {["Réponse sous 24h", "Devis gratuit", "Sans engagement"].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-turquoise" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ContactFormMultiStep() {
  return (
    <Suspense fallback={<div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 h-64" />}>
      <ContactFormInner />
    </Suspense>
  )
}
