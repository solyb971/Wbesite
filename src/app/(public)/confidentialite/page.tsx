import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalShell, LegalSection } from '@/components/site/LegalShell'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles (RGPD) du site SolYB.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://solyb.fr/confidentialite' },
}

/*
 * ⚠️ À VÉRIFIER par Yacine — cette politique reflète les outils détectés dans le projet
 * (Supabase, Brevo, Crisp, Vercel). Ajuste la liste des sous-traitants et les durées de
 * conservation si la réalité diffère. En cas de doute, faire relire par un juriste.
 */

export default function ConfidentialitePage() {
  return (
    <LegalShell eyebrow="Protection des données" titleTop="Politique de" titleAccent="confidentialité">
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées sur ce site est <strong>SolYB</strong>,
          représenté par Yacine Bouhassoun. Pour toute question relative à vos données :{' '}
          <a href="mailto:contact@solyb.fr" style={{ color: 'var(--syb-rust)' }}>contact@solyb.fr</a>.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Nous collectons uniquement les données que vous nous communiquez volontairement :</p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>via le formulaire de contact : nom, adresse email, téléphone, et le contenu de votre message ;</li>
          <li>via la messagerie instantanée : les informations que vous choisissez d&apos;y indiquer ;</li>
          <li>des données techniques de navigation (statistiques d&apos;audience anonymisées).</li>
        </ul>
      </LegalSection>

      <LegalSection title="Finalités et base légale">
        <p>
          Vos données sont traitées pour répondre à vos demandes de devis ou de contact, assurer le
          suivi de la relation commerciale et améliorer nos services. La base légale est votre
          <strong> consentement</strong> (formulaires) et l&apos;<strong>intérêt légitime</strong> de
          SolYB à répondre aux sollicitations et à mesurer l&apos;audience du site.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <p>
          Vos données ne sont jamais vendues. Elles peuvent être traitées par les prestataires
          techniques suivants, dans le strict cadre du service :
        </p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li><strong>Supabase</strong> — hébergement de la base de données ;</li>
          <li><strong>Brevo</strong> — envoi des emails transactionnels ;</li>
          <li><strong>Crisp</strong> — messagerie instantanée du site ;</li>
          <li><strong>Vercel</strong> — hébergement du site.</li>
        </ul>
        <p className="mt-2">
          Certains de ces prestataires peuvent héberger des données hors de l&apos;Union européenne,
          dans le respect de garanties appropriées (clauses contractuelles types).
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Les données issues des demandes de contact sont conservées pendant la durée nécessaire au
          traitement de votre demande, puis archivées pour une durée maximale de <strong>3 ans</strong>
          à compter du dernier contact, à des fins de prospection commerciale.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez d&apos;un droit
          d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de limitation et de
          portabilité de vos données. Vous pouvez les exercer à tout moment en écrivant à{' '}
          <a href="mailto:contact@solyb.fr" style={{ color: 'var(--syb-rust)' }}>contact@solyb.fr</a>.
        </p>
        <p className="mt-2">
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--syb-rust)' }}>
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Le site utilise des cookies nécessaires à son fonctionnement ainsi que des cookies de mesure
          d&apos;audience et de la messagerie instantanée. Vous pouvez configurer votre navigateur pour
          les refuser ; certaines fonctionnalités pourraient alors être altérées.
        </p>
      </LegalSection>

      <LegalSection title="Plus d'informations">
        <p>
          Pour les informations relatives à l&apos;éditeur et à l&apos;hébergement, consultez les{' '}
          <Link href="/mentions-legales" style={{ color: 'var(--syb-rust)' }}>mentions légales</Link>.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
