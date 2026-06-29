"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Lock, EyeOff, UserCheck } from "lucide-react"

export function BentoFeatures() {
  const features = [
    {
      title: "Military-Grade Privacy",
      description: "Your profile is completely hidden from search engines and public directories. Only approved members can view your details.",
      icon: <EyeOff className="w-6 h-6 text-primary" />,
      className: "col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-background to-secondary/20",
    },
    {
      title: "100% Verified",
      description: "Every member undergoes strict KYC and background verification.",
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      className: "col-span-1 row-span-1 bg-card",
    },
    {
      title: "Encrypted Chat",
      description: "End-to-end encrypted messaging ensuring complete confidentiality.",
      icon: <Lock className="w-6 h-6 text-primary" />,
      className: "col-span-1 row-span-1 bg-card",
    },
    {
      title: "Concierge Matchmaking",
      description: "Dedicated human matchmakers working alongside our AI to find your perfect alignment.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      className: "col-span-1 md:col-span-3 row-span-1 bg-primary/5 border-primary/20",
    }
  ]

  return (
    <section id="features" className="py-32 px-6 container mx-auto">
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-4">Uncompromising Standards.</h2>
        <p className="text-muted-foreground text-lg max-w-2xl font-light">
          We have engineered Vivaha from the ground up to protect your privacy while delivering the most sophisticated matchmaking experience in the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`glass rounded-3xl p-8 flex flex-col justify-between overflow-hidden group relative hover:border-primary/30 transition-colors ${feature.className}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-12 h-12 rounded-2xl bg-background/50 flex items-center justify-center border border-white/5 mb-4 shadow-sm">
              {feature.icon}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
