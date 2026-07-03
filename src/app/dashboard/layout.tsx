import type { Metadata } from "next"
import { ReactNode } from "react"
import ClientSidebar from "./ClientSidebar"

export const metadata: Metadata = {
  title: "Dashboard | Vivaha",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] font-sans selection:bg-[#E5D9CC]/50 flex overflow-hidden">
      <ClientSidebar />
      <main className="flex-1 relative h-screen overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  )
}
