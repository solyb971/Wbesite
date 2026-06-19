/**
 * Brevo (formerly Sendinblue) Email Integration
 *
 * Handles transactional email sending via Brevo API v3
 * Includes degraded mode for development without Brevo configured
 */

interface EmailRecipient {
  email: string
  name?: string
}

interface EmailParams {
  to: EmailRecipient[]
  subject: string
  htmlContent: string
  sender?: EmailRecipient
  replyTo?: EmailRecipient
  params?: Record<string, string | number>
}

interface BrevoResponse {
  messageId?: string
  error?: string
}

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

const DEFAULT_SENDER: EmailRecipient = {
  email: "contact@solyb.fr",
  name: "SolYB - Yacine Bouhassoun",
}

/**
 * Send transactional email via Brevo API
 */
export async function sendTransactionalEmail(
  params: EmailParams
): Promise<BrevoResponse> {
  // Degraded mode: Brevo not configured
  if (!BREVO_API_KEY || BREVO_API_KEY === "your_brevo_api_key_here") {
    console.log("📧 [BREVO MOCK MODE] Email would be sent:")
    console.log("  To:", params.to.map((r) => r.email).join(", "))
    console.log("  Subject:", params.subject)
    console.log("  Content:", params.htmlContent.substring(0, 200) + "...")
    console.log("  Params:", params.params)

    return {
      messageId: `mock-${Date.now()}`,
    }
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: params.sender || DEFAULT_SENDER,
        to: params.to,
        subject: params.subject,
        htmlContent: params.htmlContent,
        replyTo: params.replyTo || DEFAULT_SENDER,
        params: params.params,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("❌ Brevo API Error:", errorData)
      throw new Error(errorData.message || "Erreur lors de l'envoi de l'email")
    }

    const data = await response.json()
    console.log("✅ Email sent successfully:", data.messageId)

    return {
      messageId: data.messageId,
    }
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return {
      error: error instanceof Error ? error.message : "Erreur inconnue",
    }
  }
}

/**
 * Send welcome email to new lead
 */
export async function sendWelcomeEmail(
  email: string,
  name: string,
  projectType: string
): Promise<BrevoResponse> {
  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 10px;
    }
    .tagline {
      color: #6b7280;
      font-size: 14px;
    }
    h1 {
      color: #1f2937;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .highlight {
      background-color: #dbeafe;
      border-left: 4px solid #2563eb;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
      text-align: center;
    }
    .contact-info {
      background-color: #f3f4f6;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SolYB</div>
      <div class="tagline">Solutions digitales en Guadeloupe</div>
    </div>

    <h1>Bonjour ${name} 👋</h1>

    <p>Merci pour votre confiance et votre intérêt pour mes services !</p>

    <p>J'ai bien reçu votre demande concernant votre projet <strong>${projectType}</strong> et je suis ravi de pouvoir vous accompagner.</p>

    <div class="highlight">
      <strong>🎯 Prochaines étapes :</strong>
      <ol style="margin: 10px 0; padding-left: 20px;">
        <li>J'analyse en détail votre demande</li>
        <li>Je prépare une première proposition adaptée</li>
        <li>Je vous recontacte sous 24h maximum</li>
      </ol>
    </div>

    <div class="contact-info">
      <p style="margin: 0; font-weight: 600;">📞 Besoin d'échanger rapidement ?</p>
      <p style="margin: 10px 0 0 0;">
        Email : <a href="mailto:contact@solyb.fr" style="color: #2563eb;">contact@solyb.fr</a><br>
        Téléphone : +590 690 42 67 92<br>
        Disponibilité : Lun-Ven 18h-21h, Sam-Dim 10h-18h
      </p>
    </div>

    <p>En attendant, n'hésitez pas à consulter mes <a href="https://solyb.fr" style="color: #2563eb;">réalisations</a> et à préparer toutes vos questions.</p>

    <p>À très bientôt,<br>
    <strong>Yacine Bouhassoun</strong><br>
    Fondateur SolYB</p>

    <div class="footer">
      <p>SolYB - Solutions digitales en Guadeloupe<br>
      Antilles Françaises<br>
      <a href="mailto:contact@solyb.fr" style="color: #2563eb;">contact@solyb.fr</a></p>
      <p style="margin-top: 10px; font-size: 12px; color: #9ca3af;">
        Vous recevez cet email suite à votre demande sur solyb.fr
      </p>
    </div>
  </div>
</body>
</html>
  `

  return sendTransactionalEmail({
    to: [{ email, name }],
    subject: `${name}, votre demande a bien été reçue !`,
    htmlContent,
    params: {
      name,
      projectType,
    },
  })
}

/**
 * Simple email send function (alias for sendTransactionalEmail)
 */
export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
): Promise<BrevoResponse> {
  return sendTransactionalEmail({
    to: [{ email: to }],
    subject,
    htmlContent,
  })
}

/**
 * Send notification email to admin when new lead is created
 */
export async function sendAdminNotification(
  leadData: {
    name: string
    email: string
    phone?: string
    company?: string
    project_type: string
    budget: string
    description: string
    urgency: string
  }
): Promise<BrevoResponse> {
  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 30px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .badge-urgent { background-color: #fee2e2; color: #991b1b; }
    .badge-high { background-color: #fef3c7; color: #92400e; }
    .badge-normal { background-color: #dbeafe; color: #1e40af; }
    .badge-low { background-color: #f3f4f6; color: #374151; }
    .info-grid {
      display: grid;
      gap: 12px;
      margin: 20px 0;
    }
    .info-row {
      padding: 12px;
      background-color: #f9fafb;
      border-radius: 6px;
    }
    .info-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .info-value {
      color: #1f2937;
      font-size: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="margin: 0 0 20px 0; color: #1f2937;">🎯 Nouveau Lead Reçu</h2>

    <div class="badge badge-${leadData.urgency}">${
      leadData.urgency === "urgent" ? "🔴 Très urgent" :
      leadData.urgency === "high" ? "🟠 Urgent" :
      leadData.urgency === "normal" ? "🟢 Normal" :
      "⚪ Pas urgent"
    }</div>

    <div class="info-grid">
      <div class="info-row">
        <div class="info-label">Nom</div>
        <div class="info-value">${leadData.name}</div>
      </div>

      <div class="info-row">
        <div class="info-label">Email</div>
        <div class="info-value"><a href="mailto:${leadData.email}">${leadData.email}</a></div>
      </div>

      ${leadData.phone ? `
      <div class="info-row">
        <div class="info-label">Téléphone</div>
        <div class="info-value"><a href="tel:${leadData.phone}">${leadData.phone}</a></div>
      </div>
      ` : ''}

      ${leadData.company ? `
      <div class="info-row">
        <div class="info-label">Entreprise</div>
        <div class="info-value">${leadData.company}</div>
      </div>
      ` : ''}

      <div class="info-row">
        <div class="info-label">Type de projet</div>
        <div class="info-value">${leadData.project_type}</div>
      </div>

      <div class="info-row">
        <div class="info-label">Budget</div>
        <div class="info-value">${leadData.budget}€</div>
      </div>

      <div class="info-row">
        <div class="info-label">Description</div>
        <div class="info-value">${leadData.description}</div>
      </div>
    </div>

    <p style="margin-top: 20px; padding: 16px; background-color: #dbeafe; border-radius: 6px; color: #1e40af;">
      <strong>Action requise :</strong> Répondre sous 24h maximum
    </p>
  </div>
</body>
</html>
  `

  return sendTransactionalEmail({
    to: [{ email: "contact@solyb.fr", name: "SolYB Admin" }],
    subject: `🎯 Nouveau lead : ${leadData.name} - ${leadData.project_type}`,
    htmlContent,
  })
}
