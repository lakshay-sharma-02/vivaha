"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone, AtSign, MessageCircle, ArrowUpRight, CheckCircle2, ShieldCheck,
  MapPin, Briefcase, Calendar, X, MessageSquare,
} from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import ChatDrawer to avoid SSR issues with Supabase Realtime
const ChatDrawer = dynamic(() => import("@/features/messaging/components/chat-drawer"), {
  ssr: false,
})

interface Connection {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  profession: string;
  city: string;
  phone: string;
  instagram: string;
  matched_on: string;
  photo_url?: string | null;
}

type DrawerMode = "contact" | "chat" | null

interface ActiveDrawer {
  connection: Connection
  mode: DrawerMode
}

export default function ConnectionsClient({
  connections,
  currentUserId,
}: {
  connections: Connection[]
  currentUserId: string
}) {
  const [activeDrawer, setActiveDrawer] = React.useState<ActiveDrawer | null>(null)

  const openDrawer = (connection: Connection, mode: DrawerMode) => {
    setActiveDrawer({ connection, mode })
  }
  const closeDrawer = () => setActiveDrawer(null)

  const formatWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/[^\d+]/g, "")
    return `https://wa.me/${cleanPhone.startsWith("+") ? cleanPhone.replace("+", "") : `91${cleanPhone}`}`
  }

  const formatInstagramLink = (handle: string) => {
    const cleanHandle = handle.replace("@", "")
    return `https://instagram.com/${cleanHandle}`
  }

  return (
    <div className="space-y-12 pb-24 relative min-h-screen">

      {/* Header */}
      <section className="pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-playfair font-medium">Your Connections</h1>
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-bold text-primary">
              {connections.length}
            </span>
          </div>
          <p className="text-white/60 text-lg max-w-xl">
            These are your mutually accepted matches. Contact details are unlocked, and you can message them directly.
          </p>
        </motion.div>
      </section>

      {/* Empty state */}
      {connections.length === 0 && (
        <section className="flex flex-col items-center justify-center py-32 text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-white/20" />
          </div>
          <div>
            <h2 className="text-2xl font-playfair font-medium text-white/80">No connections yet</h2>
            <p className="text-white/40 mt-2 max-w-xs mx-auto">
              When you and another member both accept an introduction, they'll appear here.
            </p>
          </div>
        </section>
      )}

      {/* Grid */}
      {connections.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {connections.map((conn, i) => (
              <motion.div
                key={conn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-96 rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all"
              >
                {/* Image / Gradient bg */}
                {conn.photo_url ? (
                  <img
                    src={conn.photo_url}
                    alt={conn.first_name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-950 group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Mutual Match</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-4">
                  <div>
                    <h3 className="font-playfair text-3xl font-medium text-white mb-2">
                      {conn.first_name}, {conn.age}
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Briefcase className="w-4 h-4 text-white/40" />
                        {conn.profession}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <MapPin className="w-4 h-4 text-white/40" />
                        {conn.city}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openDrawer(conn, "chat")}
                      className="py-2.5 rounded-xl bg-primary/90 text-black text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message
                    </button>
                    <button
                      onClick={() => openDrawer(conn, "contact")}
                      className="py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-white/20 transition-colors"
                    >
                      View Contact <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Drawer Overlay */}
      <AnimatePresence>
        {activeDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
            onClick={(e) => { if (e.target === e.currentTarget) closeDrawer() }}
          >
            {activeDrawer.mode === "chat" ? (
              <ChatDrawer
                matchId={activeDrawer.connection.id}
                currentUserId={currentUserId}
                otherUserName={activeDrawer.connection.first_name}
                otherUserPhotoUrl={activeDrawer.connection.photo_url}
                onClose={closeDrawer}
              />
            ) : (
              /* Contact Details Drawer */
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 overflow-y-auto flex flex-col"
              >
                <div className={`relative h-64 shrink-0 overflow-hidden`}>
                  {activeDrawer.connection.photo_url ? (
                    <img
                      src={activeDrawer.connection.photo_url}
                      alt={activeDrawer.connection.first_name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-950" />
                  )}
                  <div className="absolute top-6 left-6">
                    <button
                      onClick={closeDrawer}
                      className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h1 className="font-playfair text-4xl font-medium">
                      {activeDrawer.connection.first_name} {activeDrawer.connection.last_name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Verified Connection
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col gap-6">
                  {/* Matched on */}
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-primary">Matched On</h4>
                      <p className="text-xs text-primary/70 mt-1">
                        {new Date(activeDrawer.connection.matched_on).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Quick message button */}
                  <button
                    onClick={() => setActiveDrawer({ connection: activeDrawer.connection, mode: "chat" })}
                    className="w-full py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open In-App Chat
                  </button>

                  {/* Contact details */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Private Contact Details</h3>

                    {/* WhatsApp */}
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-[#25D366]" />
                        </div>
                        <div>
                          <div className="text-xs text-white/50">Phone Number</div>
                          <div className="font-medium">{activeDrawer.connection.phone}</div>
                        </div>
                      </div>
                      <a
                        href={formatWhatsAppLink(activeDrawer.connection.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl bg-[#25D366] text-black font-medium flex items-center justify-center gap-2 hover:bg-[#25D366]/90 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" /> Message on WhatsApp
                      </a>
                    </div>

                    {/* Instagram */}
                    {activeDrawer.connection.instagram && (
                      <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                            <AtSign className="w-4 h-4 text-pink-500" />
                          </div>
                          <div>
                            <div className="text-xs text-white/50">Instagram</div>
                            <div className="font-medium">@{activeDrawer.connection.instagram.replace("@", "")}</div>
                          </div>
                        </div>
                        <a
                          href={formatInstagramLink(activeDrawer.connection.instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        >
                          <AtSign className="w-5 h-5" /> View Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
