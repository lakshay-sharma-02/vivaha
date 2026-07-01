"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Filter, Search, MapPin, Briefcase, GraduationCap,
  Heart, X, Check, Info, ShieldCheck, ChevronDown,
  Lock, AtSign, Phone, Crown, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Bookmark
} from "lucide-react"
import { requestIntroduction } from "@/app/actions/matchmaking"
import { fetchDiscoverProfiles } from "@/app/actions/discover"
import { saveProfile, unsaveProfile, getSavedProfileIds } from "@/app/actions/saved"
import { toast } from "sonner"

declare global {
  interface Window { Razorpay: any }
}

interface ProfileType {
  id: string
  name: string
  age: string | number
  location: string
  profession: string
  education: string
  bio: string
  compatibility: number
  verified: boolean
  image: string
  tags: string[]
  family: string
  income: string
}

export default function DiscoverPage() {
  const [profiles, setProfiles] = React.useState<ProfileType[]>([])
  const [isLoadingProfiles, setIsLoadingProfiles] = React.useState(true)
  const [activeProfileIndex, setActiveProfileIndex] = React.useState(0)
  const [showFilters, setShowFilters] = React.useState(false)
  const [selectedProfile, setSelectedProfile] = React.useState<ProfileType | null>(null)
  
  // Paywall Logic
  const [interestsSent, setInterestsSent] = React.useState(0)
  const [showPaywall, setShowPaywall] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)
  const [savedProfileIds, setSavedProfileIds] = React.useState<string[]>([])

  const loadProfiles = async (pageToLoad: number) => {
    setIsLoadingProfiles(true)
    const res = await fetchDiscoverProfiles(pageToLoad)
    if (res.success && res.profiles) {
      if (res.profiles.length < 20) {
        setHasMore(false)
      }
      if (pageToLoad === 1) {
        setProfiles(res.profiles)
      } else {
        setProfiles(prev => [...prev, ...res.profiles])
      }
    }
    setIsLoadingProfiles(false)
  }

  React.useEffect(() => {
    loadProfiles(1)
    loadSavedProfileIds()
  }, [])

  const loadSavedProfileIds = async () => {
    const result = await getSavedProfileIds()
    if (result.success && result.ids) {
      setSavedProfileIds(result.ids)
    }
  }

  const handleToggleSave = async (profileId: string) => {
    const isSaved = savedProfileIds.includes(profileId)

    if (isSaved) {
      const result = await unsaveProfile(profileId)
      if (result.success) {
        setSavedProfileIds(prev => prev.filter(id => id !== profileId))
        setToastMessage("Removed from saved")
        setTimeout(() => setToastMessage(null), 2000)
      }
    } else {
      const result = await saveProfile(profileId)
      if (result.success) {
        setSavedProfileIds(prev => [...prev, profileId])
        setToastMessage("Saved for later")
        setTimeout(() => setToastMessage(null), 2000)
      }
    }
  }

  const activeProfile = profiles[activeProfileIndex]

  const handleNextProfile = async () => {
    const nextIndex = activeProfileIndex + 1
    
    if (nextIndex >= profiles.length - 3 && hasMore && !isLoadingProfiles) {
      const nextPage = page + 1
      setPage(nextPage)
      setIsLoadingProfiles(true)
      const res = await fetchDiscoverProfiles(nextPage)
      if (res.success && res.profiles) {
        if (res.profiles.length < 20) setHasMore(false)
        setProfiles(prev => [...prev, ...res.profiles])
      }
      setIsLoadingProfiles(false)
    }
    
    setActiveProfileIndex(nextIndex)
  }

  const [isSending, setIsSending] = React.useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false)

  const handlePaywallUpgrade = async () => {
    setIsProcessingPayment(true)
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "premium_lifetime" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create order")

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Vivaha Premium",
        description: "Lifetime Premium Matchmaking Access",
        order_id: data.orderId,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          const verifyData = await verifyRes.json()
          if (verifyRes.ok) {
            setShowPaywall(false)
            setToastMessage("Welcome to Vivaha Premium! 🎉")
            setTimeout(() => setToastMessage(null), 4000)
          } else {
            toast.error("Verification Failed: " + verifyData.error)
          }
        },
        theme: { color: "#E8B96C" },
      }
      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (r: { error: { description: string } }) => {
        toast.error("Payment failed: " + r.error.description)
      })
      rzp.open()
    } catch (err) {
      toast.error("Error: " + (err as Error).message)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const handleSendInterest = async (profileId: string) => {
    setIsSending(true)
    
    // Call our robust backend RPC via Server Action
    const res = await requestIntroduction(profileId)
    
    setIsSending(false)

    if (!res.success) {
      if (res.error === 'PAYWALL_REACHED') {
        setShowPaywall(true)
      } else {
        setToastMessage(res.error || "Something went wrong.")
        setTimeout(() => setToastMessage(null), 3000)
      }
      return
    }

    setToastMessage(res.message === 'MUTUAL_MATCH' ? "It's a Mutual Match!" : "Introduction Requested!")
    setTimeout(() => setToastMessage(null), 3000)
    
    // Move to next profile after sending interest
    setTimeout(() => {
      handleNextProfile()
      setSelectedProfile(null) // Close modal if open
    }, 600)
  }

  return (
    <>
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] flex flex-col relative overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-50 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-[0_0_20px_rgba(232,185,108,0.4)] flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between py-4 z-20">
        <div className="flex items-center gap-4">
          <h1 className="font-playfair text-3xl font-medium tracking-tight">Discover</h1>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/50 hidden md:block">
            {profiles.length} Curated Matches
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              showFilters 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">Preferences</span>
          </button>
        </div>
      </div>

      {/* Main Discover Area (Card Stack) */}
      <div className="flex-1 relative flex items-center justify-center py-4">
        {isLoadingProfiles ? (
          <div className="flex flex-col items-center justify-center text-white/50 space-y-4">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="font-playfair text-lg">Finding your perfect matches...</p>
          </div>
        ) : !activeProfile ? (
          <div className="flex flex-col items-center justify-center text-white/50 space-y-4">
            <Heart className="w-12 h-12 text-white/10" />
            <p className="font-playfair text-xl">You've seen everyone!</p>
            <p className="text-sm">Check back later for more profiles.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
          <motion.div
            key={activeProfile.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl h-full max-h-[800px] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl"
          >
            {/* Image Section */}
            <div 
              className="relative h-[60%] overflow-hidden cursor-pointer group bg-cover bg-center" 
              onClick={() => setSelectedProfile(activeProfile)}
              style={activeProfile.image ? { backgroundImage: `url('${activeProfile.image}')` } : { background: 'linear-gradient(to top right, #27272a, #09090b)' }}
            >
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
              
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
              
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 pointer-events-none">
                <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {activeProfile.compatibility}% Match
                  </span>
                </div>
                {activeProfile.verified && (
                  <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5 text-white/80">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleToggleSave(activeProfile.id); }}
                className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors pointer-events-auto"
              >
                <Bookmark
                  className={`w-5 h-5 transition-colors ${
                    savedProfileIds.includes(activeProfile.id)
                      ? 'fill-primary text-primary'
                      : 'text-white'
                  }`}
                />
              </button>

              {/* View Profile Indicator */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-2 shadow-2xl">
                  <Info className="w-5 h-5" />
                  View Full Profile
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                <h2 className="font-playfair text-4xl md:text-5xl font-medium tracking-tight text-white mb-2">
                  {activeProfile.name}, {activeProfile.age}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {activeProfile.profession}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {activeProfile.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Bottom Half) */}
            <div className="flex-1 bg-black flex flex-col justify-center px-10 relative">
              <p className="text-white/60 text-center text-lg italic font-playfair px-4 line-clamp-2">
                "{activeProfile.bio}"
              </p>
            </div>

            {/* Floating Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-center gap-8 z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); handleNextProfile(); }}
                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                <X className="w-7 h-7" />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleSendInterest(activeProfile.id); }}
                disabled={isSending}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-primary-foreground transition-all shadow-[0_0_30px_rgba(232,185,108,0.3)] ${
                  isSending 
                    ? "bg-primary/50 cursor-not-allowed scale-95" 
                    : "bg-primary hover:shadow-[0_0_50px_rgba(232,185,108,0.5)] hover:scale-110"
                }`}
              >
                <Heart className="w-10 h-10 fill-current" />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
        )}
      </div>

      {/* Full Detailed Profile Modal (Progressive Disclosure) */}
      <AnimatePresence>
        {selectedProfile && (
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
              className="w-full max-w-2xl h-full bg-zinc-950 border-l border-white/10 overflow-y-auto"
            >
              <div
                className="relative h-96 bg-cover bg-center"
                style={selectedProfile.image ? { backgroundImage: `url('${selectedProfile.image}')` } : { background: 'linear-gradient(to top right, #27272a, #09090b)' }}
              >
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <button onClick={() => setSelectedProfile(null)} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleSave(selectedProfile.id); }}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <Bookmark
                      className={`w-5 h-5 transition-colors ${
                        savedProfileIds.includes(selectedProfile.id)
                          ? 'fill-primary text-primary'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h1 className="font-playfair text-5xl font-medium tracking-tight">{selectedProfile.name}, {selectedProfile.age}</h1>
                  <p className="text-white/60 text-lg mt-2">{selectedProfile.profession} • {selectedProfile.location}</p>
                </div>
              </div>

              <div className="p-8 space-y-12 pb-32">
                
                {/* Public Details */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">About</h3>
                  <p className="text-white/80 leading-relaxed text-lg font-light">"{selectedProfile.bio}"</p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Background</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-white/40 uppercase mb-1">Education</div>
                      <div className="text-sm">{selectedProfile.education}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-white/40 uppercase mb-1">Income Range</div>
                      <div className="text-sm">{selectedProfile.income}</div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Family Details</h3>
                  <p className="text-white/80 leading-relaxed text-sm">{selectedProfile.family}</p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Lifestyle</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Progressive Disclosure: Private Contact Info */}
                <section className="relative mt-8">
                  <div className="p-6 rounded-3xl border border-white/10 bg-white/5 overflow-hidden relative">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5" /> Private Contact Details
                    </h3>
                    
                    {/* Blurred Content */}
                    <div className="space-y-4 blur-md opacity-40 select-none pointer-events-none">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                        <div>
                          <div className="text-xs text-white/50">Phone Number</div>
                          <div className="text-sm font-medium">+91 98765 43210</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><AtSign className="w-4 h-4" /></div>
                        <div>
                          <div className="text-xs text-white/50">Instagram</div>
                          <div className="text-sm font-medium">@ananya_sharma</div>
                        </div>
                      </div>
                    </div>

                    {/* Lock Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/40 text-center p-6">
                      <div className="w-12 h-12 rounded-full bg-black/80 border border-white/10 flex items-center justify-center mb-3">
                        <Lock className="w-5 h-5 text-white/70" />
                      </div>
                      <p className="text-sm font-medium text-white max-w-xs">
                        Private details unlock mutually upon acceptance of interest.
                      </p>
                    </div>
                  </div>
                </section>

              </div>
              
              {/* Fixed Bottom Action in Modal */}
              <div className="sticky bottom-0 p-6 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 flex items-center gap-4 justify-between">
                <button 
                  onClick={() => handleSendInterest(selectedProfile.id)}
                  disabled={isSending}
                  className={`w-full h-14 font-medium rounded-full flex items-center justify-center gap-2 transition-all ${
                    isSending 
                      ? "bg-primary/50 text-primary-foreground/70 cursor-not-allowed" 
                      : "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(232,185,108,0.2)] hover:shadow-[0_0_30px_rgba(232,185,108,0.4)] hover:scale-[1.02]"
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current" /> {isSending ? "Sending..." : "Send Interest"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ₹5000 Premium Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowPaywall(false)}
                className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
              
              <div className="p-10 flex flex-col items-center text-center relative z-10 space-y-6">
                
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-amber-600 p-[1px] shadow-[0_0_40px_rgba(232,185,108,0.3)]">
                  <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary">Vivaha Premium</div>
                  <h2 className="font-playfair text-3xl font-medium">Unlock Unlimited Interests</h2>
                  <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
                    You have used your complimentary interest. Upgrade to Vivaha Premium to connect with unlimited highly curated profiles and get priority placement.
                  </p>
                </div>

                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4 my-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Send unlimited interests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">See who viewed your profile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Priority placement in Discover</span>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <button
                    onClick={handlePaywallUpgrade}
                    disabled={isProcessingPayment}
                    className="w-full h-14 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(232,185,108,0.2)] text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessingPayment ? "Initializing Secure Gateway..." : <>Upgrade for ₹5,000 <span className="text-xs opacity-80 font-normal">/ lifetime</span></>}
                    {!isProcessingPayment && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setShowPaywall(false)} className="text-sm text-white/50 hover:text-white transition-colors">
                    Maybe later
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </>
  )
}
