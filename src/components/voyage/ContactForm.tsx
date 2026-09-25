"use client"

import { useState } from "react"

/** Libellés de la maquette → valeurs attendues par /api/leads (contact-schema). */
const TYPES = [
  ["vitrine", "Site vitrine"],
  ["ecommerce", "E-commerce"],
  ["application", "Application métier"],
  ["facturation", "Facturation électronique"],
  ["custom", "Autre"],
] as const

type Etat = "repos" | "envoi" | "succes" | "erreur" | "incomplet"

const MESSAGES: Record<Etat, string> = {
  repos: "",
  envoi: "Envoi en cours...",
  succes: "Demande envoyée\u00a0! On vous recontacte sous 24h maximum.",
  erreur: "Une erreur est survenue. Réessayez ou contactez-nous directement.",
  incomplet: "Renseignez votre nom, votre email, le type de projet et cochez la case de consentement.",
}

/**
 * Formulaire de la maquette, branché sur l'envoi déjà en place (/api/leads,
 * même corps que l'ancien formulaire de l'accueil) : même champ piège
 * (company_website), même source, puis la page /merci comme avant.
 */
export default function ContactForm() {
  const [etat, setEtat] = useState<Etat>("repos")

  const envoyer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) return setEtat("incomplet")
    setEtat("envoi")
    const fd = new FormData(form)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("nom"),
          email: fd.get("email"),
          phone: fd.get("tel"),
          project_type: fd.get("type"),
          description: fd.get("besoin"),
          source: "site-web",
          urgency: "normal",
          company_website: fd.get("company_website"),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setEtat("succes")
      form.reset()
      window.setTimeout(() => {
        window.location.href = "/merci"
      }, 1800)
    } catch {
      setEtat("erreur")
    }
  }

  return (
    <form id="quote" noValidate onSubmit={envoyer}>
      <label className="hp" aria-hidden="true">
        Ne pas remplir ce champ
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="row">
        <label>
          Prénom &amp; nom
          <input name="nom" autoComplete="name" required />
        </label>
        <label>
          Téléphone (WhatsApp bienvenu)
          <input name="tel" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Type de projet
        <select name="type" required defaultValue="">
          <option value="">Sélectionnez...</option>
          {TYPES.map(([valeur, libelle]) => (
            <option key={valeur} value={valeur}>{libelle}</option>
          ))}
        </select>
      </label>
      <label>
        Votre besoin
        <textarea name="besoin" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required /> J&apos;accepte que mes données soient utilisées pour traiter
        ma demande, conformément à la politique de confidentialité.
      </label>
      <button className="btn btn--brand" type="submit" disabled={etat === "envoi"}>
        Recevoir mon devis gratuit
      </button>
      <p className="form-msg" role="status" aria-live="polite">
        {MESSAGES[etat]}
      </p>
    </form>
  )
}
