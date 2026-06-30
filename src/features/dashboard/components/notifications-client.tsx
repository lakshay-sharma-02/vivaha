"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bell, ShieldCheck, Star } from "lucide-react"

export default function NotificationsClient({ notifications }: { notifications?: any[] }) {
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
        {notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif, i) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-2xl border flex gap-4 ${notif.is_read ? 'bg-white/5 border-white/5 opacity-70' : 'bg-primary/10 border-primary/20'}`}
              >
                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center shrink-0">
                  {notif.type === 'verification' ? <ShieldCheck className="w-5 h-5 text-green-400" /> : <Star className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-white">{notif.title}</h4>
                  <p className="text-xs text-white/70 mt-1">{notif.body}</p>
                  <p className="text-[10px] text-white/40 mt-2 uppercase tracking-wider">{new Date(notif.created_at).toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Bell className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="font-playfair text-2xl font-medium mb-2">You're all caught up!</h3>
            <p className="text-white/50 max-w-sm">
              We will notify you when you receive new matches, profile views, or system updates.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
