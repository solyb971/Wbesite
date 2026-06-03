import { Mail, Phone, MapPin, Clock } from "lucide-react"
import ContactFormMultiStep from "./ContactFormMultiStep"

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-20 md:scroll-mt-36" style={{ background: '#F5F2ED' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal text-center mb-10 md:mb-16" data-reveal-index="0">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl mx-auto">
            Remplissez le formulaire — nous vous recontactons sous 24h maximum, où que vous soyez en Guadeloupe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="reveal lg:col-span-1 space-y-6" data-reveal-index="1">
            <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 card-elevation">
              <h3 className="font-display text-xl font-bold text-[#F0EDE8] mb-6">
                Informations Contact
              </h3>

              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "contact@solyb.fr",
                    href: "mailto:contact@solyb.fr",
                  },
                  {
                    icon: Phone,
                    label: "Téléphone",
                    value: "+590 690 71 17 69",
                    href: "tel:+590690711769",
                  },
                  {
                    icon: MapPin,
                    label: "Localisation",
                    value: "Baie-Mahault, Guadeloupe 971",
                    href: null,
                  },
                  {
                    icon: Clock,
                    label: "Disponibilité",
                    value: "Lun-Ven 9h-18h · Sam 10h-17h",
                    href: null,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-coral/10 border border-coral/20 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-wide mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#F0EDE8] hover:text-coral transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-[#F0EDE8]">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone couverte */}
            <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-6 card-shadow">
              <h4 className="font-semibold text-[#F0EDE8] mb-4 text-sm">Zone d'intervention</h4>
              <div className="flex flex-wrap gap-2">
                {["Grande-Terre", "Basse-Terre", "Les Abymes", "Pointe-à-Pitre", "Baie-Mahault", "Marie-Galante", "Saint-Martin", "Saint-Barthélemy"].map((city) => (
                  <span key={city} className="text-xs bg-[#1C1C26] border border-[#2A2A38] text-[#8B8B9E] px-3 py-1 rounded-full">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-6 card-shadow">
              <ul className="space-y-3">
                {[
                  "Réponse garantie sous 24h",
                  "Aucun engagement",
                  "Devis gratuit personnalisé",
                  "Ancré en Guadeloupe",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#8B8B9E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-turquoise flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="reveal lg:col-span-2" data-reveal-index="2">
            <ContactFormMultiStep />
          </div>
        </div>
      </div>
    </section>
  )
}
