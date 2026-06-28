'use client'
import { useState } from "react"
import { faqs } from "@/lib/faq-data"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 scroll-mt-20" style={{ background: 'var(--syb-warm)' }}>
      <div className="max-w-[780px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal mb-10">
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
          >
            Questions<br />
            <span style={{ fontWeight: 900, color: '#C4472A' }}>fréquentes</span>
          </h2>
        </div>

        {/* Items */}
        <div className="reveal">
          {faqs.slice(0, 7).map((faq, index) => (
            <div
              key={index}
              style={{ borderBottom: '0.5px solid #DDD5C8' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left py-6 flex items-center justify-between gap-4 transition-colors"
                style={{ color: openIndex === index ? '#C4472A' : '#0E0D0B', background: 'none', border: 'none' }}
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-normal leading-snug">{faq.question}</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-base transition-all duration-300"
                  style={{
                    border: '0.5px solid #DDD5C8',
                    color: openIndex === index ? '#F5F2ED' : 'var(--syb-stone)',
                    background: openIndex === index ? '#0E0D0B' : 'transparent',
                    transform: openIndex === index ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === index ? '300px' : '0', paddingBottom: openIndex === index ? '1.5rem' : 0 }}
              >
                <p className="text-sm font-light leading-relaxed" style={{ color: '#7A7268', lineHeight: 1.8 }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
