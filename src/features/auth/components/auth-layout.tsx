"use client"

import { motion } from "framer-motion"
import { CanvasParticles } from "@/features/landing/components/experience/canvas-particles"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function AuthLayout({ children, quote, author }: { children: React.ReactNode, quote: string, author: string }) {
  return (
    <div className="min-h-screen w-full flex bg-black overflow-hidden relative">
      {/* Mobile Back Button */}
      <Link href="/" className="absolute top-6 left-6 z-50 md:hidden text-white/50 hover:text-white transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Left Column - Visual (Hidden on mobile) */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-between p-12 border-r border-white/5 bg-zinc-950/50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Subtle atmospheric glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4" />
          <CanvasParticles />
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href="/" className="font-playfair text-2xl font-medium tracking-widest text-white">
            VIVAHA
          </Link>
        </div>

        {/* Floating Identity Cards Animation */}
        <div className="relative z-10 h-64 w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20, rotateZ: -5 }}
            animate={{ opacity: 1, y: 0, rotateZ: -2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-1/4 w-48 h-64 glass rounded-2xl border-white/10 p-2 shadow-2xl"
          >
             <div className="w-full h-full rounded-xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop')] bg-cover opacity-60 mix-blend-overlay" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20, rotateZ: 5 }}
            animate={{ opacity: 1, y: 0, rotateZ: 2 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute right-1/4 w-48 h-64 glass rounded-2xl border-white/10 p-2 shadow-2xl"
          >
             <div className="w-full h-full rounded-xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop')] bg-cover opacity-60 mix-blend-overlay" />
          </motion.div>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <p className="font-playfair text-2xl text-white/90 leading-snug">
            "{quote}"
          </p>
          <p className="text-sm text-white/50 tracking-widest uppercase">
            — {author}
          </p>
        </div>
      </div>

      {/* Right Column - Auth Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md relative">
          {/* Subtle glow behind form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />
          {children}
        </div>
      </div>
    </div>
  )
}
