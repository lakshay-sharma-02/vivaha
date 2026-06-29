"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X, Sparkles, MapPin, Briefcase, Check, ShieldCheck } from "lucide-react"
import { getPendingRequests, respondToRequest } from "@/app/actions/matches"

export default function MatchesClient() {
  const [requests, setRequests] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [processingId, setProcessingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function loadRequests() {
      setIsLoading(true)
      const res = await getPendingRequests()
      if (res.success && res.requests) {
        setRequests(res.requests)
      }
      setIsLoading(false)
    }
    loadRequests()
  }, [])

  const handleRespond = async (id: string, accept: boolean) => {
    setProcessingId(id)
    const res = await respondToRequest(id, accept)
    
    if (res.success) {
      // Remove from list
      setRequests(prev => prev.filter(req => req.introduction_id !== id))
    } else {
      alert(res.error || "Failed to respond to request")
    }
    setProcessingId(null)
  }

  return (
    <div className="space-y-12 pb-24 max-w-5xl">
      <section className="pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-playfair font-medium">Interested in You</h1>
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-bold text-primary flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {requests.length} New
            </span>
          </div>
          <p className="text-white/60 text-lg max-w-xl">
            These members have expressed interest in your profile. Accept to unlock contact details and move them to Connections.
          </p>
        </motion.div>
      </section>

      <section className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="font-playfair text-lg">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white/5 rounded-3xl border border-white/10">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="font-playfair text-2xl font-medium mb-2">No new requests</h3>
            <p className="text-white/50 max-w-sm">
              When someone sends you an interest, it will appear here. For now, keep exploring in Discover.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {requests.map((req) => (
                <motion.div
                  key={req.introduction_id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col group relative"
                >
                  <div className="h-64 bg-gradient-to-br from-zinc-800 to-zinc-950 relative">
                    <div className="absolute top-4 left-4 z-20">
                      {req.verified && (
                        <div className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5 text-white/80">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="font-playfair text-2xl font-medium text-white">{req.name}, {req.age}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/70 mt-1">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {req.profession}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <p className="text-sm text-white/60 line-clamp-3 italic">
                      "{req.bio}"
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <button 
                        onClick={() => handleRespond(req.introduction_id, false)}
                        disabled={processingId === req.introduction_id}
                        className="flex-1 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" /> Pass
                      </button>
                      <button 
                        onClick={() => handleRespond(req.introduction_id, true)}
                        disabled={processingId === req.introduction_id}
                        className="flex-1 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" /> Accept
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  )
}
