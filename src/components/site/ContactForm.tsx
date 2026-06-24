"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/validations/contact-schema"
import { Send, Loader2, CheckCircle } from "lucide-react"
import HoneypotField from "@/components/site/HoneypotField"

export default function ContactForm() {
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
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      urgency: "normal",
      source: "site-web",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, company_website: honeypotRef.current?.value || "" }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Une erreur est survenue")
      }

      // Track successful lead generation in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'Demande devis',
          value: data.budget === '<500' ? 500 : data.budget === '500-1000' ? 750 : data.budget === '1000-2000' ? 1500 : 2000,
          project_type: data.project_type,
          source: data.source
        })
      }

      setIsSuccess(true)
      reset()

      // Redirect vers page merci après 2 secondes
      setTimeout(() => {
        window.location.href = "/merci"
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Demande envoyée avec succès !
        </h3>
        <p className="text-gray-600">
          Merci pour votre confiance. Je vous recontacte sous 24h maximum.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <HoneypotField ref={honeypotRef} />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Jean Dupont"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="jean@exemple.fr"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone & Company Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+590 690 12 34 56"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            Entreprise / Activité
          </label>
          <input
            {...register("company")}
            type="text"
            id="company"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Mon Entreprise SARL"
          />
        </div>
      </div>

      {/* Project Type & Budget Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Type */}
        <div>
          <label htmlFor="project_type" className="block text-sm font-semibold text-gray-700 mb-2">
            Type de projet <span className="text-red-500">*</span>
          </label>
          <select
            {...register("project_type")}
            id="project_type"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
              errors.project_type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="vitrine">Site vitrine</option>
            <option value="ecommerce">Boutique e-commerce</option>
            <option value="content">Contenu IA</option>
            <option value="custom">Projet sur mesure</option>
          </select>
          {errors.project_type && (
            <p className="mt-1 text-sm text-red-500">{errors.project_type.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
            Budget indicatif <span className="text-red-500">*</span>
          </label>
          <select
            {...register("budget")}
            id="budget"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
              errors.budget ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="<500">Moins de 500€</option>
            <option value="500-1000">500€ - 1 000€</option>
            <option value="1000-2000">1 000€ - 2 000€</option>
            <option value=">2000">Plus de 2 000€</option>
          </select>
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
          Urgence
        </label>
        <select
          {...register("urgency")}
          id="urgency"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="low">Pas urgent (flexible)</option>
          <option value="normal">Normal (1 mois)</option>
          <option value="high">Urgent (2 semaines)</option>
          <option value="urgent">Très urgent (&lt; 2 semaines)</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Description du projet <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, public cible, exemples de sites que vous aimez, etc. (minimum 50 caractères)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Minimum 50 caractères pour nous aider à comprendre votre besoin
        </p>
      </div>

      {/* Source */}
      <div>
        <label htmlFor="source" className="block text-sm font-semibold text-gray-700 mb-2">
          Comment avez-vous connu SolYB ?
        </label>
        <select
          {...register("source")}
          id="source"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="site-web">Site web (recherche Google)</option>
          <option value="linkedin">LinkedIn</option>
          <option value="bouche-a-oreille">Bouche-à-oreille</option>
          <option value="referral">Recommandation</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Envoyer ma demande</span>
            </>
          )}
        </button>
        <p className="text-sm text-gray-500 text-center mt-3">
          Je vous recontacte sous 24h maximum. Aucun engagement.
        </p>
        <label className="flex items-start gap-2 mt-3 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked)
              if (e.target.checked) setConsentError(false)
            }}
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary"
          />
          <span>
            J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à
            la{" "}
            <a href="/confidentialite" className="underline hover:text-gray-700">
              politique de confidentialité
            </a>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        {consentError && (
          <p className="mt-1 text-sm text-red-500 text-center">
            Veuillez accepter la politique de confidentialité pour continuer.
          </p>
        )}
      </div>
    </form>
  )
}
