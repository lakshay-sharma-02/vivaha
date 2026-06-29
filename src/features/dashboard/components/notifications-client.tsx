"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"

export default function NotificationsClient() {
  return (
    <div className="space-y-12 pb-24">
      <section className="pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">Notifications</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Updates and alerts about your profile and matches.
          </p>
        </motion.div>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Bell className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="font-playfair text-2xl font-medium mb-2">You're all caught up!</h3>
          <p className="text-white/50 max-w-sm">
            We will notify you when you receive new matches, profile views, or system updates.
          </p>
        </div>
      </section>
    </div>
  )
}
