"use client"

import { useState } from "react"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import HoneypotField from "@/components/site/HoneypotField"
import s from "./accueil.module.css"

const badges = [
  { Icon: MapPin, label: "Localisation", value: "Guadeloupe" },
  { Icon: Clock, label: "Réponse garantie", value: "Sous 24h en semaine" },
  { Icon: CalendarDays, label: "Devis", value: "Gratuit et sans engagement" },
]

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const fd = new FormData(form)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          project_type: fd.get("project_type"),
          description: fd.get("description"),
          source: "site-web",
          urgency: "normal",
          company_website: fd.get("company_website"),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      form.reset()
      setTimeout(() => { window.location.href = "/merci" }, 1800)
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className={s.section}>
      <div className={s.wrap}>
        <div className={`${s.panel} ${s.contactShell}`}>
          <div className={s.contactInfo}>
            <span className={`${s.eyebrow} ${s.eyebrowOnPanel}`}>Prendre contact</span>
            <h2>
              Parlons <em>de votre projet.</em>
            </h2>
            <p>45 minutes pour comprendre votre besoin. Gratuit, sans engagement. Devis envoyé sous 24h.</p>
            <ul className={s.badges}>
              {badges.map(({ Icon, label, value }) => (
                <li key={label} className={s.badge}>
                  <Icon size={18} strokeWidth={1.8} aria-hidden />
                  <div>
                    <p className={s.badgeKey}>{label}</p>
                    <p className={s.badgeValue}>{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {status === "success" ? (
            <div className={s.success} role="status">
              <p aria-hidden style={{ fontSize: 32 }}>✓</p>
              <h3>Demande envoyée !</h3>
              <p>On vous recontacte sous 24h maximum.</p>
            </div>
          ) : (
            <form className={s.form} onSubmit={handleSubmit}>
              <HoneypotField />
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="contact-name">Prénom &amp; nom</label>
                  <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Ex. Marie Laurent" />
                </div>
                <div className={s.field}>
                  <label htmlFor="contact-phone">Téléphone (WhatsApp bienvenu)</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="0690 00 00 00" />
                </div>
              </div>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="vous@exemple.fr" />
                </div>
                <div className={s.field}>
                  <label htmlFor="contact-type">Type de projet</label>
                  <select id="contact-type" name="project_type" required defaultValue="">
                    <option value="" disabled>Sélectionnez...</option>
                    <option value="vitrine">Site vitrine</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="application">Application métier</option>
                    <option value="facturation">Facturation électronique</option>
                    <option value="custom">Autre</option>
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="contact-need">Votre besoin</label>
                <textarea
                  id="contact-need"
                  name="description"
                  required
                  placeholder="Décrivez votre activité et ce que vous cherchez à construire..."
                />
              </div>
              <label className={s.consent}>
                <input type="checkbox" name="consent" required />
                <span>
                  J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à
                  la <a href="/confidentialite">politique de confidentialité</a>.
                </span>
              </label>
              {status === "error" && (
                <p className={s.formError} role="alert">
                  Une erreur est survenue. Réessayez ou contactez-nous directement.
                </p>
              )}
              <button type="submit" className={`${s.btn} ${s.btnPrimary}`} disabled={status === "sending"}>
                {status === "sending" ? "Envoi en cours..." : "Recevoir mon devis gratuit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
