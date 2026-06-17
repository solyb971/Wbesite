"use client"

import { useState } from "react"
import Sidebar from "@/components/admin/Shared/Sidebar"
import Navbar from "@/components/admin/Shared/Navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-shell dark min-h-screen bg-[#120F0B]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6 max-w-[1600px]">
          {children}
        </main>
      </div>
    </div>
  )
}
