"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { faqs } from "@/lib/faq-data"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-[#0D0D14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal text-center mb-12" data-reveal-index="0">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-coral/10 border border-coral/20 rounded-2xl mb-6" style={{ animation: 'float 3s ease-in-out alternate infinite' }}>
            <HelpCircle className="w-8 h-8 text-coral" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-[#8B8B9E]">
            Tout ce que vous devez savoir — y compris sur la facturation électronique 2026
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#13131A] border rounded-xl overflow-hidden transition-all duration-200 card-shadow ${
                openIndex === index ? "border-coral/40" : "border-[#2A2A38] hover:border-[#3A3A48]"
              }`}
            >
              {/* h3 wrapping button = pattern accessible accordéon WAI-ARIA */}
              <h3 className="m-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#1C1C26]/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-[#F0EDE8] text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-coral flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-[#8B8B9E] leading-relaxed text-sm border-t border-[#2A2A38] pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#8B8B9E] mb-4">Vous avez d'autres questions ?</p>
          <a
            href="#contact"
            className="btn-studio inline-flex items-center justify-center bg-coral hover:bg-coral-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-coral/20"
          >
            <span className="relative z-10">Contactez-moi directement</span>
          </a>
        </div>
      </div>
    </section>
  )
}
