import type { Metadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Home",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F1EFE7] text-[#2A2621] font-sans selection:bg-[#8C7A6B]/30 relative overflow-hidden">
      {/* 
        The Nav rests delicately on the travertine surface.
        No drop shadows, just pure ink on stone.
      */}
      <header className="absolute top-0 w-full z-20 px-12 py-10 flex justify-between items-center text-[#2A2621]">
        <Link 
          href="/dashboard" 
          className="font-serif text-2xl tracking-wide opacity-80 hover:opacity-100 transition-opacity"
        >
          Vivaha
        </Link>
        <nav className="flex gap-12 text-[10px] font-bold tracking-[0.25em] uppercase opacity-70">
          <Link href="/dashboard" className="hover:opacity-100 transition-opacity">Home</Link>
          <Link href="/dashboard/discover" className="hover:opacity-100 transition-opacity">Introductions</Link>
          <Link href="/dashboard/messages" className="hover:opacity-100 transition-opacity">Letters</Link>
          <Link href="/dashboard/profile" className="hover:opacity-100 transition-opacity">Me</Link>
        </nav>
      </header>

      {/* Main Architectural Space */}
      <main className="min-h-screen pt-32">
        {children}
      </main>
    </div>
  )
}
