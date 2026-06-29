"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/shared/ui/button/button"

export function FinalCTA() {
  return (
    <section className="relative py-40 overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-playfair text-5xl md:text-7xl font-medium mb-8 leading-tight">
          Your legacy begins with the right partner.
        </h2>
        <p className="text-xl text-muted-foreground mb-12 font-light">
          Join the waitlist. Membership is strictly limited to preserve exclusivity.
        </p>
        <Link href="/register">
          <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-2xl hover:scale-105 transition-transform duration-500 bg-primary text-primary-foreground">
            Request an Invitation
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
