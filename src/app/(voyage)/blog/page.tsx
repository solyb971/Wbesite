import { Metadata } from "next"
import Link from "next/link"
import Breadcrumbs from "@/components/site/Breadcrumbs"
import { voyageFonts } from "@/components/voyage/fonts"
import Stage, { SharedShapes } from "@/components/voyage/Stage"
import Nav from "@/components/voyage/Nav"
import Footer from "@/components/voyage/Footer"
import PaysageVivant from "@/components/voyage/anim/PaysageVivant"

export const metadata: Metadata = {
  title: "Blog Création Site Web Guadeloupe — Conseils & Actualités",
  description:
    "Guides pratiques et conseils pour créer votre site web en Guadeloupe. Prix, comparatifs, tutoriels pour entrepreneurs guadeloupéens.",
  keywords: ["blog web Guadeloupe", "création site web conseils", "prix site web 971", "guide entrepreneur Guadeloupe"],
  alternates: { canonical: "https://solyb.fr/blog" },
  openGraph: {
    title: "Blog Création Site Web Guadeloupe | SolYB",
    description: "Guides et conseils pour entrepreneurs guadeloupéens souhaitant créer leur site web.",
    url: "https://solyb.fr/blog",
    type: "website",
    locale: "fr_FR",
    siteName: "SolYB — Agence Digitale Guadeloupe",
  },
}

type Categorie = "Guides" | "Prix & Tarifs" | "Secteurs" | "Conformité 2026"

/**
 * Étiquette de catégorie aux couleurs de la charte : turquoise et or toujours en
 * fond avec du texte encre (jamais en couleur de texte), rouille avec du crème.
 */
const ETIQUETTE: Record<Categorie, string> = {
  Guides: "tag tag--live",
  "Prix & Tarifs": "tag tag--brand",
  Secteurs: "tag tag--rust",
  "Conformité 2026": "tag",
}

const articles: { slug: string; title: string; excerpt: string; date: string; readTime: string; category: Categorie }[] = [
  {
    slug: "prix-application-metier-guadeloupe",
    title: "Combien coûte une application métier ? Le guide des prix 2026",
    excerpt:
      "De l’outil ciblé au système complet : ce qui fait vraiment le prix d’un logiciel sur-mesure, quand un logiciel existant suffit, et comment lire un devis.",
    date: "2026-07-24",
    readTime: "10 min",
    category: "Prix & Tarifs",
  },
  {
    slug: "etre-visible-sur-google-guadeloupe",
    title: "Être visible sur Google en Guadeloupe : le guide de la fiche d’établissement",
    excerpt:
      "La fiche Google est gratuite et c’est le levier de visibilité locale le plus rentable. Création, photos, avis, erreurs à éviter : la méthode complète, pas à pas.",
    date: "2026-07-15",
    readTime: "10 min",
    category: "Guides",
  },
  {
    slug: "restaurant-guadeloupe-clients-google",
    title: "Restaurateurs en Guadeloupe : vos clients vous cherchent avant d’atterrir",
    excerpt:
      "Touristes et croisiéristes choisissent leurs restaurants sur Google avant d’arriver. Fiche, menu en ligne, avis : ce qui fait qu’on vous trouve, ou pas.",
    date: "2026-07-15",
    readTime: "8 min",
    category: "Secteurs",
  },
  {
    slug: "site-invisible-sur-google-raisons",
    title: "Mon site n’apparaît pas sur Google : les 7 vraies raisons",
    excerpt:
      "Indexation, site trop récent, blocage technique, contenu trop maigre… Les 7 causes les plus fréquentes, avec pour chacune une vérification gratuite à faire soi-même.",
    date: "2026-07-15",
    readTime: "9 min",
    category: "Guides",
  },
  {
    slug: "facturation-electronique-2026-guadeloupe",
    title: "Facturation Électronique 2026 en Guadeloupe : le guide TPE/PME",
    excerpt:
      "Dates, entreprises concernées, TVA DOM (8,5 % / 2,1 %), Chorus Pro, sanctions… Tout ce que les TPE/PME guadeloupéennes doivent savoir sur la réforme 2026.",
    date: "2026-06-17",
    readTime: "9 min",
    category: "Conformité 2026",
  },
  {
    slug: "prix-site-web-guadeloupe",
    title: "Prix Création Site Web en Guadeloupe : le guide complet 2026",
    excerpt:
      "Découvrez les vrais prix du marché guadeloupéen. Comparatif complet des agences, freelances et solutions DIY. De 599€ à 15 000€.",
    date: "2026-05-12",
    readTime: "12 min",
    category: "Prix & Tarifs",
  },
  {
    slug: "application-web-vs-site-web-guadeloupe",
    title: "Application web vs site web : quelle différence en Guadeloupe ?",
    excerpt:
      "Site web ou application web ? Découvrez les différences, avantages et inconvénients pour faire le bon choix pour votre entreprise.",
    date: "2026-04-22",
    readTime: "10 min",
    category: "Guides",
  },
]

const dateLongue = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })

/** Index du blog : au style de l'accueil, sur le paysage de la plage. Les articles gardent leur mise en page. */
export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog SolYB - Création Site Web Guadeloupe",
    description: "Conseils et guides pour créer son site web en Guadeloupe",
    url: "https://solyb.fr/blog",
    publisher: {
      "@type": "Organization",
      name: "SolYB",
      address: { "@type": "PostalAddress", addressLocality: "Petit-Bourg", addressRegion: "Guadeloupe", addressCountry: "GP" },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Fil d'Ariane : les données structurées ici, la version visible dans la carte. */}
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} visual={false} />
      <div className={`voyage ${voyageFonts}`}>
        <SharedShapes />
        <Stage paysages={["plage"]} />
        <Nav page="blog" />
        <main id="top">
          <section className="page-hero">
            <div className="wrap">
              <div className="card">
                <nav className="crumbs" aria-label="Fil d'Ariane">
                  <ol>
                    <li>
                      <Link prefetch={false} href="/">Accueil</Link>
                    </li>
                    <li aria-current="page">Blog</li>
                  </ol>
                </nav>
                <h1>
                  Blog création site web <em>en Guadeloupe</em>
                </h1>
                <p className="lede">
                  Guides pratiques, comparatifs et conseils pour les entrepreneurs guadeloupéens qui souhaitent se lancer
                  sur le web.
                </p>
              </div>
            </div>
          </section>

          <section className="posts" aria-label="Articles">
            <div className="wrap">
              <ul className="post-grid">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <article className="card post">
                      <div className="tags">
                        <span className={ETIQUETTE[a.category]}>{a.category}</span>
                      </div>
                      <h2>
                        <Link prefetch={false} href={`/blog/${a.slug}`}>{a.title}</Link>
                      </h2>
                      <p className="muted">{a.excerpt}</p>
                      <p className="post-meta">
                        <time dateTime={a.date}>{dateLongue(a.date)}</time> · {a.readTime} de lecture
                      </p>
                      <Link prefetch={false} className="link" href={`/blog/${a.slug}`} aria-label={`Lire l'article : ${a.title}`}>
                        Lire l&apos;article →
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="cta-final">
            <div className="wrap">
              <div className="card">
                <h2>
                  Prêt à créer <em>votre site web ?</em>
                </h2>
                <p className="lede muted">Site professionnel livré en 2 semaines, à partir de 599€.</p>
                <div className="cta">
                  <Link prefetch={false} className="btn btn--brand" href="/#contact">
                    Demander un devis gratuit →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer page="blog" />
        <PaysageVivant />
      </div>
    </>
  )
}
