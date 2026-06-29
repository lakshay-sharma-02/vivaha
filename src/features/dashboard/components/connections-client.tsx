"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Phone, AtSign, MessageCircle, ArrowUpRight, CheckCircle2, ShieldCheck, MapPin, Briefcase, Calendar, X 
} from "lucide-react"

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
  image: string;
}

export default function ConnectionsClient({ connections }: { connections: Connection[] }) {
  const [selectedConnection, setSelectedConnection] = React.useState<Connection | null>(null)

  const formatWhatsAppLink = (phone: string) => {
    // Strip everything except numbers and +, default to +91 if no country code
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    return `https://wa.me/${cleanPhone.startsWith('+') ? cleanPhone.replace('+', '') : `91${cleanPhone}`}`
  }

  const formatInstagramLink = (handle: string) => {
    const cleanHandle = handle.replace('@', '')
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
            These are your mutually accepted matches. We have successfully verified both parties and unlocked private contact details.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {connections.map((conn, i) => (
            <motion.div
              key={conn.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedConnection(conn)}
              className="group relative h-96 rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all"
            >
              {/* Image Bg */}
              <div className={`absolute inset-0 ${conn.image} group-hover:scale-105 transition-transform duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Mutual Match</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="font-playfair text-3xl font-medium text-white mb-2">
                  {conn.first_name}, {conn.age}
                </h3>
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Briefcase className="w-4 h-4 text-white/40" />
                    {conn.profession}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <MapPin className="w-4 h-4 text-white/40" />
                    {conn.city}
                  </div>
                </div>

                <div className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 text-sm font-medium group-hover:bg-white/20 transition-colors">
                  View Contact Details <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Connection Detail Modal */}
      <AnimatePresence>
        {selectedConnection && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 overflow-y-auto flex flex-col"
            >
              <div className={`relative h-64 ${selectedConnection.image} shrink-0`}>
                <div className="absolute top-6 left-6">
                  <button onClick={() => setSelectedConnection(null)} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h1 className="font-playfair text-4xl font-medium">{selectedConnection.first_name} {selectedConnection.last_name}</h1>
                  <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Verified Connection
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="space-y-6 flex-1">
                  
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-primary">Matched On</h4>
                      <p className="text-xs text-primary/70 mt-1">
                        {new Date(selectedConnection.matched_on).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Private Contact Details</h3>
                    
                    {/* WhatsApp Block */}
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-[#25D366]" />
                          </div>
                          <div>
                            <div className="text-xs text-white/50">Phone Number</div>
                            <div className="font-medium">{selectedConnection.phone}</div>
                          </div>
                        </div>
                      </div>
                      <a 
                        href={formatWhatsAppLink(selectedConnection.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl bg-[#25D366] text-black font-medium flex items-center justify-center gap-2 hover:bg-[#25D366]/90 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" /> Message on WhatsApp
                      </a>
                    </div>

                    {/* Instagram Block */}
                    {selectedConnection.instagram && (
                      <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                              <AtSign className="w-4 h-4 text-pink-500" />
                            </div>
                            <div>
                              <div className="text-xs text-white/50">Instagram</div>
                              <div className="font-medium">@{selectedConnection.instagram.replace('@', '')}</div>
                            </div>
                          </div>
                        </div>
                        <a 
                          href={formatInstagramLink(selectedConnection.instagram)}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
