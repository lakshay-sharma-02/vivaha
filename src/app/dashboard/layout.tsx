import type { Metadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Home",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2A2621] font-sans selection:bg-[#8C7A6B]/30 relative">
      {/* 
        Quiet Navigation Bar 
        Drop-shadow ensures it stays visible over the image (top)
      */}
      <header className="absolute top-0 w-full z-20 px-6 py-8 flex justify-between items-center text-[#F5F2EB]">
        <Link 
          href="/dashboard" 
          className="font-serif text-2xl tracking-wide opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
        >
          Vivaha
        </Link>
        <nav className="flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase opacity-90 drop-shadow-md">
          <Link href="/dashboard" className="hover:opacity-100 transition-opacity">Home</Link>
          <Link href="/dashboard/discover" className="hover:opacity-100 transition-opacity">Introductions</Link>
          <Link href="/dashboard/messages" className="hover:opacity-100 transition-opacity">Letters</Link>
          <Link href="/dashboard/profile" className="hover:opacity-100 transition-opacity">Me</Link>
        </nav>
      </header>

      {/* Main Home Environment */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}
