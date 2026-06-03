# Live Chat / Chatbot - Best Practices

## Overview
A chatbot or live chat can significantly increase conversions by answering questions instantly and capturing leads 24/7. Here's how to implement it effectively.

---

## 1. Options Comparison

| Solution | Cost | Ease | AI | Best For |
|----------|------|------|-----|----------|
| **Crisp** | Free-€25/mo | Easy | Yes | Small business, budget-friendly |
| **Intercom** | €74+/mo | Medium | Yes | Growing business, full features |
| **Tidio** | Free-€29/mo | Easy | Yes | E-commerce, simple setup |
| **Drift** | €2500+/mo | Complex | Yes | B2B, enterprise |
| **Custom AI** | Dev time | Hard | Yes | Full control, unique needs |

### Recommended: **Crisp** or **Tidio**
- Free tier available
- Easy Next.js integration
- AI chatbot included
- French language support

---

## 2. Crisp Integration (Recommended)

### Step 1: Create Crisp Account
1. Go to [crisp.chat](https://crisp.chat)
2. Create free account
3. Get your Website ID from Settings > Website Settings

### Step 2: Install in Next.js

```bash
npm install crisp-sdk-web
```

### Step 3: Create Component

```typescript
// src/components/site/CrispChat.tsx
"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("YOUR_WEBSITE_ID")

    // Optional: Set user info if logged in
    // Crisp.user.setEmail("user@email.com")
    // Crisp.user.setNickname("John Doe")
  }, [])

  return null
}
```

### Step 4: Add to Layout

```typescript
// src/app/(public)/layout.tsx
import CrispChat from "@/components/site/CrispChat"

export default function Layout({ children }) {
  return (
    <>
      {children}
      <CrispChat />
    </>
  )
}
```

---

## 3. Tidio Integration (Alternative)

### Installation

```bash
npm install @tidio/tidio-chat
```

### Component

```typescript
// src/components/site/TidioChat.tsx
"use client"

import { useEffect } from "react"

export default function TidioChat() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//code.tidio.co/YOUR_PUBLIC_KEY.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
```

---

## 4. Custom AI Chatbot (Advanced)

If you want full control, build a custom chatbot using OpenAI.

### Architecture

```
User Message
    ↓
API Route (/api/chat)
    ↓
OpenAI GPT-4 with Context
    ↓
Response to User
```

### Implementation

```typescript
// src/app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de SolYB, une agence de création de sites web en Guadeloupe.

Informations clés:
- Site vitrine à partir de 599€
- E-commerce à partir de 999€
- Livraison en 10-14 jours
- Basé en Guadeloupe
- Contact: contact@solyb.gp

Réponds de manière concise, professionnelle et amicale.
Si on te pose une question technique complexe, propose de prendre contact.
Toujours en français sauf si l'utilisateur parle anglais.`

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur du chatbot" },
      { status: 500 }
    )
  }
}
```

### Frontend Component

```typescript
// src/components/site/AIChatbot.tsx
"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant SolYB. Comment puis-je vous aider ?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10), // Keep last 10 messages for context
        }),
      })

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une erreur est survenue. Contactez-nous directement !",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <span className="font-semibold">Assistant SolYB</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Votre message..."
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-primary text-white p-2 rounded-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 transition"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
```

---

## 5. Chatbot Best Practices

### Do's ✅
- Respond within 1-2 seconds
- Use friendly, conversational tone
- Offer to connect with human for complex questions
- Capture email/phone for follow-up
- Show typing indicator
- Keep responses concise (2-3 sentences max)
- Provide quick reply buttons for common questions

### Don'ts ❌
- Don't pretend to be human
- Don't give incorrect pricing/info
- Don't be pushy about sales
- Don't leave users hanging without escalation path
- Don't store sensitive data in chat logs

---

## 6. Pre-configured Responses (FAQ Bot)

For simpler needs, create a FAQ-based chatbot:

```typescript
const FAQ_RESPONSES = {
  keywords: {
    prix: "Nos prix commencent à 599€ pour un site vitrine et 999€ pour un e-commerce. Voulez-vous un devis personnalisé ?",
    délai: "Un site vitrine est livré en 10-14 jours, un e-commerce en 14-21 jours. Besoin d'un projet urgent ?",
    contact: "Vous pouvez me joindre à contact@solyb.gp ou via WhatsApp au +590 690 XX XX XX.",
    paiement: "Le paiement se fait en 2 fois : 50% à la commande, 50% à la livraison. Paiement en 3-4 fois possible pour les projets > 1000€.",
    hébergement: "L'hébergement et le nom de domaine sont inclus la première année. Ensuite, c'est 29€/mois ou 290€/an.",
  },
  fallback: "Je n'ai pas compris votre question. Voulez-vous parler à Yacine directement ? Contactez-le à contact@solyb.gp",
}

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  for (const [keyword, response] of Object.entries(FAQ_RESPONSES.keywords)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  return FAQ_RESPONSES.fallback
}
```

---

## 7. Analytics & Optimization

Track these metrics:
- Chat initiation rate
- Response time
- Resolution rate
- Lead capture rate
- Customer satisfaction (add thumbs up/down)

### A/B Test Ideas
- Different welcome messages
- Proactive chat triggers (after 30s on pricing page)
- Chat position (left vs right)
- Avatar vs no avatar

---

## 8. Implementation Checklist

### Phase 1: Basic Setup
- [ ] Choose solution (Crisp recommended)
- [ ] Create account and get credentials
- [ ] Install component in Next.js
- [ ] Test on all pages
- [ ] Configure business hours

### Phase 2: Customization
- [ ] Customize colors to match brand
- [ ] Add welcome message
- [ ] Configure FAQ responses
- [ ] Set up email notifications
- [ ] Add avatar/logo

### Phase 3: Optimization
- [ ] Add proactive triggers
- [ ] Create saved replies
- [ ] Set up chatbot flows
- [ ] Enable AI features
- [ ] Connect to CRM

---

## 9. Cost Considerations

### Free Options
- Crisp (2 agents, basic features)
- Tidio (50 chats/month)
- tawk.to (unlimited, ads-supported)

### Budget for AI Chatbot
- OpenAI API: ~$0.01-0.05 per conversation
- Estimate: 100 chats/month = $1-5/month
- Much cheaper than third-party AI plans

---

## Resources

- [Crisp Documentation](https://docs.crisp.chat/)
- [Tidio Setup Guide](https://www.tidio.com/blog/add-live-chat-to-website/)
- [OpenAI Chat API](https://platform.openai.com/docs/guides/chat)
- [Chatbot UX Best Practices](https://www.nngroup.com/articles/chatbots/)
