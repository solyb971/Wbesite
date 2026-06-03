"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Replace with real testimonials when available
const testimonials = [
  {
    id: 1,
    name: "Marie-Claire D.",
    role: "Gérante",
    company: "Salon de Coiffure Karibéa",
    location: "Pointe-à-Pitre",
    image: null, // Add image URL when available
    rating: 5,
    text: "Yacine a parfaitement compris mes besoins. Mon site est magnifique et mes clientes peuvent maintenant prendre rendez-vous en ligne. Je recommande à 100% !",
    projectType: "Site Vitrine",
  },
  {
    id: 2,
    name: "Jean-Philippe R.",
    role: "Fondateur",
    company: "Ti Délices Créoles",
    location: "Sainte-Anne",
    image: null,
    rating: 5,
    text: "Grâce à ma boutique en ligne, je vends maintenant mes produits dans toute la France. Le site est rapide, beau et facile à gérer. Excellent travail !",
    projectType: "E-commerce",
  },
  {
    id: 3,
    name: "Stéphanie L.",
    role: "Auto-entrepreneur",
    company: "SL Consulting",
    location: "Baie-Mahault",
    image: null,
    rating: 5,
    text: "Professionnalisme et réactivité au rendez-vous. Mon site a été livré en moins de 2 semaines et le résultat dépasse mes attentes. Merci SolYB !",
    projectType: "Site Vitrine",
  },
  {
    id: 4,
    name: "Olivier M.",
    role: "Gérant",
    company: "OM Électricité",
    location: "Le Gosier",
    image: null,
    rating: 5,
    text: "Enfin un prestataire local qui comprend nos besoins ! Le site génère des demandes de devis chaque semaine. Investissement rentabilisé en 2 mois.",
    projectType: "Site Vitrine",
  },
]

const stats = [
  { value: "30+", label: "Clients satisfaits" },
  { value: "100%", label: "Projets livrés à temps" },
  { value: "4.9/5", label: "Note moyenne" },
  { value: "24h", label: "Temps de réponse" },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="temoignages" className="py-20 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-4">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-xl text-[#8B8B9E] max-w-2xl mx-auto">
            Découvrez les retours de nos clients en Guadeloupe
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 reveal" data-reveal-index="0">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-coral mb-1">{stat.value}</p>
              <p className="text-[#8B8B9E] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative reveal" data-reveal-index="1">
          {/* Main testimonial */}
          <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-coral/10" />

            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-coral/20 rounded-full flex items-center justify-center">
                  {testimonials[currentIndex].image ? (
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-coral">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? "text-[#F5A623] fill-[#F5A623]"
                          : "text-[#2A2A38]"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-lg md:text-xl text-[#8B8B9E] mb-6 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-bold text-[#F0EDE8]">{testimonials[currentIndex].name}</p>
                  <p className="text-[#8B8B9E] text-sm">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                  <p className="text-[#8B8B9E]/70 text-sm">{testimonials[currentIndex].location}</p>
                </div>

                {/* Project badge */}
                <span className="inline-block mt-4 bg-coral/10 text-coral text-sm px-3 py-1 rounded-full">
                  {testimonials[currentIndex].projectType}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-[#13131A] border border-[#2A2A38] rounded-full flex items-center justify-center hover:border-coral/50 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 text-[#8B8B9E]" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-coral"
                      : "w-2 bg-[#2A2A38] hover:bg-[#2A2A38]/70"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-[#13131A] border border-[#2A2A38] rounded-full flex items-center justify-center hover:border-coral/50 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 text-[#8B8B9E]" />
            </button>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#8B8B9E] mb-4">Vous êtes client ? Laissez-nous un avis !</p>
          <a
            href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#13131A] border border-[#2A2A38] text-[#8B8B9E] px-6 py-3 rounded-lg hover:border-coral hover:text-coral transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Laisser un avis Google
          </a>
        </div>
      </div>
    </section>
  )
}
