/**
 * Email templates for automated sequences
 */

export const EmailTemplate = {
  welcome: {
    subject: "Bienvenue ! Votre projet web en Guadeloupe",
    getHtml: (params: { name: string; projectType: string; company?: string }) => `
      <h2>Bonjour ${params.name},</h2>
      <p>Merci pour votre intérêt pour nos services de création web en Guadeloupe !</p>
      <p>Votre demande pour un projet <strong>${params.projectType}</strong> a bien été reçue.</p>
      <p>Je vous recontacte très rapidement pour discuter de votre projet.</p>
      <p>À bientôt,<br>Yacine - SolYB</p>
    `,
  },
  caseStudy: {
    subject: "Découvrez comment nous avons aidé d'autres entreprises",
    getHtml: (params: { name: string; projectType: string; company?: string }) => `
      <h2>Bonjour ${params.name},</h2>
      <p>J'espère que vous allez bien !</p>
      <p>Je voulais partager avec vous quelques exemples de projets similaires au vôtre que nous avons réalisés.</p>
      <p>Nos clients apprécient particulièrement :</p>
      <ul>
        <li>La rapidité de livraison (2 semaines)</li>
        <li>Le design moderne et responsive</li>
        <li>L'accompagnement personnalisé</li>
      </ul>
      <p>Avez-vous des questions sur votre projet ?</p>
      <p>À bientôt,<br>Yacine - SolYB</p>
    `,
  },
  urgency: {
    subject: "Profitez de l'offre de lancement avant qu'il ne soit trop tard",
    getHtml: (params: { name: string; projectType: string; company?: string }) => `
      <h2>Bonjour ${params.name},</h2>
      <p>Je me permets de vous recontacter concernant votre projet de ${params.projectType}.</p>
      <p><strong>Rappel :</strong> Notre offre de lancement (-40%) est limitée aux 30 premiers clients.</p>
      <p>Les places se remplissent rapidement ! Ne manquez pas cette opportunité.</p>
      <p>Répondez à cet email pour réserver votre place.</p>
      <p>À bientôt,<br>Yacine - SolYB</p>
    `,
  },
  finalContact: {
    subject: "Dernière relance - Votre projet web",
    getHtml: (params: { name: string; projectType: string; company?: string }) => `
      <h2>Bonjour ${params.name},</h2>
      <p>Je comprends que vous êtes probablement très occupé(e).</p>
      <p>C'est mon dernier message concernant votre projet de ${params.projectType}.</p>
      <p>Si vous êtes toujours intéressé(e), n'hésitez pas à me recontacter quand vous serez prêt(e).</p>
      <p>Je reste à votre disposition.</p>
      <p>Cordialement,<br>Yacine - SolYB</p>
    `,
  },
} as const

export type EmailTemplateKey = keyof typeof EmailTemplate
