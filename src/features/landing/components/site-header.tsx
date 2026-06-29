"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Button } from "@/shared/ui/button/button"

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 flex justify-center px-6 py-4 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-6"
      }`}
    >
      <div 
        className={`flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-500 ${
          isScrolled 
            ? "glass px-6 py-3 shadow-2xl border-white/10 dark:border-white/5 bg-background/40" 
            : "px-2 py-2 bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair text-xl font-bold tracking-tight">Vivaha</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">Experience</Link>
          <Link href="#features" className="hover:text-foreground transition-colors">Exclusivity</Link>
          <Link href="#privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="#membership" className="hover:text-foreground transition-colors">Membership</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/register">
            <Button size="sm" className="rounded-full px-5 h-9 text-xs tracking-wide">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
