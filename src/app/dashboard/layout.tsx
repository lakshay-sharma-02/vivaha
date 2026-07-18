import type { Metadata } from "next"
import { ReactNode } from "react"
import ClientSidebar from "./ClientSidebar"

export const metadata: Metadata = {
  title: "Dashboard | Vivah",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-maroon-deep text-cream font-body selection:bg-gold/30 flex overflow-hidden">
      <ClientSidebar />
      <main className="flex-1 relative h-screen overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  )
}
