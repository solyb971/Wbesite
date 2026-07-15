import { Metadata } from 'next'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'
import { blogTags } from '@/lib/blog-meta'

const ACCENT = '#B8760A'                 // or éditorial — rubrique Prix & Tarifs
const ACCENT_INK = '#96600A'             // or assombri, AA sur crème

export const metadata: Metadata = {
  title: 'Combien Coûte une Application Métier ? Le Guide des Prix 2026',
  description: 'De quelques milliers à plusieurs dizaines de milliers d’euros : ce qui fait vraiment le prix d’une application métier sur-mesure, comment lire un devis, et quand un simple tableur suffit encore.',
  keywords: [
    'prix application métier',
    'coût application sur-mesure',
    'développement logiciel sur-mesure prix',
    'application métier Guadeloupe',
    'devis application web entreprise',
    'combien coûte un logiciel sur-mesure',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/prix-application-metier-guadeloupe',
  },
  openGraph: {
    title: 'Combien coûte une application métier ? Le guide des prix 2026',
    description: 'Ce qui fait vraiment le prix d’un logiciel sur-mesure : fonctionnalités, utilisateurs, intégrations. Et comment lire un devis sans se faire avoir.',
    url: 'https://solyb.fr/blog/prix-application-metier-guadeloupe',
    type: 'article',
    publishedTime: '2026-07-15',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function PrixApplicationMetierPage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Combien coûte une application métier ? Le guide des prix 2026',
    description: 'Guide neutre des prix d’une application métier sur-mesure : ce qui fait varier un devis, les ordres de grandeur, les coûts cachés, et les questions à poser avant de signer.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
    mainEntityOfPage: 'https://solyb.fr/blog/prix-application-metier-guadeloupe',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel budget prévoir pour une application métier sur-mesure ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les ordres de grandeur du marché : un outil simple et ciblé (un processus, quelques écrans) démarre autour de 3 000 à 8 000 €. Une application complète pour une TPE/PME (plusieurs utilisateurs, gestion de données, tableaux de bord) se situe le plus souvent entre 8 000 et 25 000 €. Au-delà, on parle de projets avec intégrations complexes ou forts volumes. Le vrai déterminant n’est pas le nombre d’écrans mais la complexité de votre logique métier.' },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi une application coûte-t-elle plus cher qu’un site web ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Un site web présente de l’information ; une application manipule des données et automatise des processus : comptes utilisateurs, droits d’accès, règles de calcul, historiques, sauvegardes. Chaque règle de votre métier devient du code à concevoir, développer et tester. C’est ce travail de logique — invisible à l’écran — qui constitue l’essentiel du coût.' },
      },
      {
        '@type': 'Question',
        name: 'Vaut-il mieux un logiciel existant ou du sur-mesure ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Si un logiciel du marché couvre 90 % de votre besoin à quelques dizaines d’euros par mois, prenez-le : le sur-mesure ne se justifie pas. Le sur-mesure devient rentable quand les outils existants vous forcent à tordre votre façon de travailler, à multiplier les abonnements, ou à ressaisir les mêmes données dans trois systèmes.' },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les coûts après la livraison ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Une application vit : hébergement (souvent 20 à 100 €/mois selon l’usage), maintenance corrective, mises à jour de sécurité, et évolutions futures. Prévoyez un budget de fonctionnement annuel de l’ordre de 10 à 20 % du coût initial. Un devis sérieux mentionne ces coûts dès le départ.' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <ArticleShell
        category="Prix & Tarifs"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Combien coûte une application métier ? Le guide des prix 2026"
        date="2026-07-15"
        readTime="10 min"
        crumbLabel="Prix application métier"
        crumbHref="/blog/prix-application-metier-guadeloupe"
        tags={blogTags['prix-application-metier-guadeloupe']}
        cta={{
          heading: 'Une idée d’outil pour votre activité ?',
          text: 'Décrivez-nous votre fonctionnement actuel : on vous dit honnêtement si un logiciel existant suffit, ou si le sur-mesure se justifie — devis détaillé sous 24 h.',
          primary: { label: 'Demander un devis', href: '/#contact' },
        }}
      >
        <p className="lead">
          «&nbsp;Combien coûte une application ?&nbsp;» est la question qu&rsquo;on nous pose le plus — et la plus
          difficile à répondre en une phrase, parce que l&rsquo;écart est réel : de <strong>quelques milliers
          d&rsquo;euros</strong> pour un outil ciblé à <strong>plusieurs dizaines de milliers</strong> pour un système
          complet. Ce guide explique d&rsquo;où vient cet écart, donne les ordres de grandeur du marché, et surtout
          vous apprend à lire un devis — pour payer la bonne chose, au bon prix.
        </p>

        <h2>D&rsquo;abord : de quoi parle-t-on exactement ?</h2>
        <p>
          Une <strong>application métier</strong>, c&rsquo;est un logiciel construit autour de <em>votre</em> façon de
          travailler : gestion de planning, suivi de chantiers, réservations, devis-factures, stock, relation
          client… Contrairement à un site vitrine qui <em>présente</em> votre activité, l&rsquo;application
          <em> fait tourner</em> votre activité. Si vous hésitez encore entre les deux, on a écrit un
          {' '}<a href="/blog/application-web-vs-site-web-guadeloupe">comparatif détaillé site web vs application</a> —
          ici, on parle uniquement du prix.
        </p>

        <h2>Pourquoi les prix vont de 3 000 € à 50 000 € (et plus)</h2>
        <p>
          Le prix d&rsquo;une application ne dépend presque pas de son apparence. Il dépend de la <strong>quantité de
          logique</strong> qu&rsquo;il faut construire. Concrètement, cinq facteurs pèsent sur le devis&nbsp;:
        </p>
        <ul>
          <li><strong>Le nombre de processus couverts.</strong> «&nbsp;Gérer mes réservations&nbsp;» est un processus. «&nbsp;Gérer mes réservations, mes factures, mon stock et mes salariés&nbsp;» en est quatre — et chacun a ses écrans, ses règles et ses cas particuliers.</li>
          <li><strong>Les utilisateurs et leurs droits.</strong> Un outil pour vous seul est simple. Un outil où le gérant voit tout, les employés une partie, et les clients encore autre chose, demande une gestion fine des comptes et des permissions.</li>
          <li><strong>Les règles de votre métier.</strong> C&rsquo;est le cœur du coût. «&nbsp;Le tarif change selon la saison, sauf pour les habitués, sauf si la durée dépasse une semaine&nbsp;» : chaque «&nbsp;sauf&nbsp;» est de la logique à coder et à tester.</li>
          <li><strong>Les intégrations.</strong> Connecter l&rsquo;application au paiement en ligne, à votre comptabilité, à WhatsApp ou à un autre logiciel multiplie les points de contact — et les points de fragilité à sécuriser.</li>
          <li><strong>Les données existantes.</strong> Récupérer et nettoyer trois ans d&rsquo;historique dispersé entre Excel, carnets et boîtes mail est un vrai chantier, souvent sous-estimé dans les deux sens.</li>
        </ul>

        <h2>Les ordres de grandeur du marché</h2>
        <ArticleCallout accent={ACCENT}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `2px solid ${ACCENT}` }}>
                  <th className="text-left py-3 px-3" style={{ color: 'var(--syb-ink)' }}>Type de projet</th>
                  <th className="text-left py-3 px-3" style={{ color: 'var(--syb-ink)' }}>Fourchette indicative</th>
                  <th className="text-left py-3 px-3" style={{ color: 'var(--syb-ink)' }}>Exemple</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--syb-stone)' }}>
                <tr style={{ borderBottom: '0.5px solid var(--syb-border)' }}><td className="py-3 px-3">Outil ciblé</td><td className="py-3 px-3">3 000 € – 8 000 €</td><td className="py-3 px-3">Prise de rendez-vous, suivi de commandes simple</td></tr>
                <tr style={{ borderBottom: '0.5px solid var(--syb-border)' }}><td className="py-3 px-3">Application TPE/PME</td><td className="py-3 px-3">8 000 € – 25 000 €</td><td className="py-3 px-3">Réservations + facturation + tableaux de bord, multi-utilisateurs</td></tr>
                <tr><td className="py-3 px-3">Système complet</td><td className="py-3 px-3">25 000 € et au-delà</td><td className="py-3 px-3">Plusieurs métiers couverts, intégrations multiples, forts volumes</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 mb-0 text-sm font-semibold" style={{ color: ACCENT_INK }}>
            Ces fourchettes sont des repères, pas des devis : deux projets « de réservation » peuvent varier du simple au triple selon les règles métier derrière.
          </p>
        </ArticleCallout>
        <p>
          Un point de repère utile : le prix reflète surtout du <strong>temps de conception et de développement</strong>.
          Un devis très en dessous du marché signifie généralement moins de temps passé — donc des règles métier
          simplifiées, des tests réduits, ou un assemblage de briques toutes faites qui montrera ses limites.
        </p>

        <h2>Avant de payer du sur-mesure : la question qui économise des milliers d&rsquo;euros</h2>
        <p>
          Soyons honnêtes, quitte à surprendre venant d&rsquo;une agence : <strong>tout le monde n&rsquo;a pas besoin
          d&rsquo;une application sur-mesure</strong>. Si un logiciel existant (caisse, planning, réservation,
          facturation) couvre votre besoin pour quelques dizaines d&rsquo;euros par mois, c&rsquo;est presque toujours
          le bon choix pour commencer. Le sur-mesure se justifie quand vous cochez au moins une de ces cases&nbsp;:
        </p>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Les outils existants vous forcent à <strong style={{ color: 'var(--syb-ink)' }}>tordre votre façon de travailler</strong> pour rentrer dans leurs cases.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Vous <strong style={{ color: 'var(--syb-ink)' }}>ressaisissez les mêmes données</strong> dans plusieurs systèmes (le devis dans Excel, la facture dans un logiciel, le suivi dans WhatsApp…).</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Vous payez <strong style={{ color: 'var(--syb-ink)' }}>plusieurs abonnements</strong> qui, cumulés sur trois ans, dépassent le coût d&rsquo;un outil unique fait pour vous.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Votre fonctionnement est <strong style={{ color: 'var(--syb-ink)' }}>votre avantage concurrentiel</strong> — et aucun outil générique ne le reproduit.</span></li>
          </ul>
        </ArticleCallout>

        <h2>Le coût complet : la livraison n&rsquo;est pas la fin de l&rsquo;histoire</h2>
        <p>
          Comme pour un site web — on l&rsquo;expliquait dans notre <a href="/blog/prix-site-web-guadeloupe">guide des
          prix de sites web</a> — raisonnez en <strong>coût total</strong>, pas en prix de création. Une application a
          des frais de fonctionnement : hébergement (généralement 20 à 100 €/mois selon l&rsquo;usage), maintenance,
          mises à jour de sécurité, et les évolutions que vous demanderez forcément une fois l&rsquo;outil adopté. Un
          ordre de grandeur sain : <strong>10 à 20 % du coût initial par an</strong>. Si un devis ne mentionne ni
          hébergement ni maintenance, la question à poser est simple : «&nbsp;que se passe-t-il l&rsquo;année
          d&rsquo;après ?&nbsp;».
        </p>

        <h2>Comment lire un devis d&rsquo;application métier</h2>
        <p>Six questions à poser systématiquement, quel que soit le prestataire&nbsp;:</p>
        <ol>
          <li><strong>Y a-t-il une phase de cadrage ?</strong> Un prestataire qui chiffre sans avoir compris vos processus chiffre au hasard — souvent trop bas, avec rattrapage en cours de route.</li>
          <li><strong>Que couvre exactement le prix ?</strong> Liste des fonctionnalités, nombre d&rsquo;utilisateurs, reprise des données existantes incluse ou non.</li>
          <li><strong>Qui est propriétaire du code et des données ?</strong> Exigez que la réponse soit : vous. Sinon, vous êtes captif.</li>
          <li><strong>Comment sont facturées les évolutions futures ?</strong> Au forfait, au temps passé, via un contrat de maintenance ? Les besoins évoluent toujours.</li>
          <li><strong>Où sont hébergées les données, et qui les sauvegarde ?</strong> Vos données métier sont vitales ; leur sauvegarde ne doit pas être un post-scriptum.</li>
          <li><strong>Y a-t-il une formation et une période de rodage ?</strong> Le meilleur outil du monde échoue si l&rsquo;équipe ne se l&rsquo;approprie pas.</li>
        </ol>

        <h2>Questions fréquentes</h2>
        <h3>Peut-on commencer petit et faire évoluer l&rsquo;application ?</h3>
        <p>
          Oui, et c&rsquo;est même la meilleure approche pour une TPE : démarrer par le processus le plus douloureux
          (celui qui vous coûte le plus de temps ou d&rsquo;erreurs), le rôder, puis étendre. Cela lisse
          l&rsquo;investissement et évite de payer des fonctionnalités imaginées mais jamais utilisées.
        </p>
        <h3>Une application mobile coûte-t-elle plus cher qu&rsquo;une application web ?</h3>
        <p>
          Généralement oui, car il faut développer et maintenir des versions par plateforme, et passer par les
          validations des stores. Pour la plupart des usages de TPE, une <strong>application web</strong> — utilisable
          depuis n&rsquo;importe quel navigateur, téléphone compris — couvre le besoin pour un coût nettement
          inférieur.
        </p>
        <h3>Combien de temps dure un projet d&rsquo;application ?</h3>
        <p>
          Un outil ciblé se livre en quelques semaines ; une application TPE/PME complète, en deux à quatre mois selon
          la disponibilité des deux côtés. Méfiez-vous des délais irréalistes dans les deux sens : trop court, la
          conception est bâclée ; interminable, le projet s&rsquo;essouffle.
        </p>

        <h2>En résumé</h2>
        <p>
          Le prix d&rsquo;une application métier reflète la <strong>complexité de votre logique métier</strong>, pas le
          nombre d&rsquo;écrans : comptez 3 000 à 8 000 € pour un outil ciblé, 8 000 à 25 000 € pour une application
          complète de TPE/PME. Avant de signer : vérifiez qu&rsquo;un logiciel existant ne suffit pas, exigez une phase
          de cadrage, la propriété du code et des données, et un devis qui dit ce qui se passe <em>après</em> la
          livraison. Une application bien conçue se rembourse en temps gagné — une application mal cadrée coûte deux
          fois : à la construction, puis à la reconstruction.
        </p>
      </ArticleShell>
    </>
  )
}
