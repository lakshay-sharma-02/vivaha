"use client"
import { motion } from "framer-motion"

export function AuthHeroImage() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-muted">
      <motion.div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583939411023-14783179e581?auto=format&fit=crop&q=80&w=2000")' }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.32, 0.72, 0, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
    </div>
  )
}
