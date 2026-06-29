"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Heart, X, Sparkles, MapPin, Briefcase } from "lucide-react"

export default function MatchesClient() {
  return (
    <div className="space-y-12 pb-24">
      <section className="pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-playfair font-medium">Interested in You</h1>
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-bold text-primary flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> New
            </span>
          </div>
          <p className="text-white/60 text-lg max-w-xl">
            These members have expressed interest in your profile. Accept to unlock contact details and move them to Connections.
          </p>
        </motion.div>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="font-playfair text-2xl font-medium mb-2">No new requests</h3>
          <p className="text-white/50 max-w-sm">
            When someone sends you an interest, it will appear here. For now, keep exploring in Discover.
          </p>
        </div>
      </section>
    </div>
  )
}
