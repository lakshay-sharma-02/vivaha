"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bookmark } from "lucide-react"

export default function SavedClient() {
  return (
    <div className="space-y-12 pb-24">
      <section className="pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">Saved Profiles</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Profiles you've bookmarked for later review.
          </p>
        </motion.div>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Bookmark className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="font-playfair text-2xl font-medium mb-2">No saved profiles</h3>
          <p className="text-white/50 max-w-sm">
            When you bookmark a profile in Discover, it will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}
