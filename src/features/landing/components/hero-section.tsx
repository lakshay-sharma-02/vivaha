"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background depth and ambient glow handled by layout.tsx AmbientBackground, but we add a specific spotlight here */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 dark:bg-primary/30 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
      
      <div className="container relative z-10 flex flex-col items-center text-center px-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
          Accepting applications for the 2026 cohort
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-foreground max-w-5xl leading-[1.1] mb-8"
        >
          Love, <span className="italic text-muted-foreground">Elevated.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-12"
        >
          The most exclusive matrimonial network for ambitious, cultured, and high-net-worth individuals. Where privacy meets profound connection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/register">
            <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-2xl hover:scale-105 transition-transform duration-300">
              Apply for Membership
            </Button>
          </Link>
          <Link href="#experience">
            <Button variant="ghost" size="lg" className="h-14 px-8 text-base rounded-full hover:bg-white/5">
              Explore the Experience
            </Button>
          </Link>
        </motion.div>

        {/* Abstract Floating UI Elements representing connection */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] w-32 h-48 rounded-2xl glass border-white/10 opacity-30 rotate-12"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[10%] w-40 h-56 rounded-2xl glass border-white/10 opacity-20 -rotate-12"
          />
        </div>
      </div>
    </section>
  )
}
