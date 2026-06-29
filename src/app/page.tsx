"use client"

import { Orchestrator } from "@/features/landing/components/experience/orchestrator"
import { SiteHeader } from "@/features/landing/components/site-header"

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-500/30 selection:text-amber-200">
      <SiteHeader />
      
      <main className="w-full flex flex-col">
        {/* The entire page is a sequence of scroll-driven cinematic scenes inside one global orchestrator */}
        <Orchestrator />
      </main>
    </div>
  )
}
