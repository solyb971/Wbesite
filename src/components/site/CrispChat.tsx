"use client"

import { useEffect } from "react"
import { Crisp, ChatboxColors } from "crisp-sdk-web"

// Get your Website ID from Crisp Dashboard > Settings > Website Settings
const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || ""

export default function CrispChat() {
  useEffect(() => {
    if (!CRISP_WEBSITE_ID) {
      console.warn("Crisp: Missing NEXT_PUBLIC_CRISP_WEBSITE_ID in environment variables")
      return
    }

    // Configure Crisp
    Crisp.configure(CRISP_WEBSITE_ID)

    // Customize appearance (optional)
    Crisp.setColorTheme(ChatboxColors.DeepOrange)


    // Hide Crisp on specific pages if needed
    // Crisp.chat.hide()

  }, [])

  return null
}
