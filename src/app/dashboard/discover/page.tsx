"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Filter, Search, MapPin, Briefcase, GraduationCap, 
  Heart, X, Check, Info, ShieldCheck, ChevronDown
} from "lucide-react"

export default function DiscoverPage() {
  const [activeProfile, setActiveProfile] = React.useState(0)
  const [showFilters, setShowFilters] = React.useState(false)

  // Dummy Profiles
  const profiles = [
    {
      id: 1,
      name: "Ananya Sharma",
      age: 28,
      location: "San Francisco, CA",
      profession: "Senior Architect",
      education: "M.Arch, UC Berkeley",
      bio: "Passionate about sustainable design and classical music. Looking for an equal partner to build a beautiful life with.",
      compatibility: 94,
      verified: true,
      image: "bg-gradient-to-tr from-zinc-800 to-zinc-950", // Placeholder
      tags: ["Vegetarian", "Never Drinks", "Hindu - Brahmin", "Nuclear Family"]
    },
    {
      id: 2,
      name: "Aditya Verma",
      age: 31,
      location: "New York, NY",
      profession: "Investment Banker",
      education: "MBA, Wharton",
      bio: "Ambitious but deeply rooted in family values. Weekend hiker and amateur chef.",
      compatibility: 88,
      verified: true,
      image: "bg-gradient-to-bl from-zinc-800 to-zinc-900", // Placeholder
      tags: ["Non-Vegetarian", "Occasional Drinker", "Hindu - Rajput", "Joint Family"]
    },
    {
      id: 3,
      name: "Riya Patel",
      age: 27,
      location: "London, UK",
      profession: "Product Designer",
      education: "B.Des, NID",
      bio: "Creative soul who loves art galleries and spontaneous road trips. Valuing honesty above all.",
      compatibility: 82,
      verified: false,
      image: "bg-gradient-to-tl from-zinc-900 to-black", // Placeholder
      tags: ["Vegan", "Never Smokes", "Hindu - Patel", "Nuclear Family"]
    }
  ]

  const nextProfile = () => {
    setActiveProfile((prev) => (prev + 1) % profiles.length)
  }

  const profile = profiles[activeProfile]

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] flex flex-col relative overflow-hidden">
      
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

      {/* Main Discover Area */}
      <div className="flex-1 relative flex items-center justify-center py-4">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl h-full max-h-[800px] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl"
          >
            {/* Image Section (Top Half) */}
            <div className={`relative h-[55%] ${profile.image} overflow-hidden`}>
              
              {/* Top gradient for badges */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />
              
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {profile.compatibility}% Match
                  </span>
                </div>
                {profile.verified && (
                  <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5 text-white/80">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>

              {/* Bottom gradient for text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h2 className="font-playfair text-4xl md:text-5xl font-medium tracking-tight text-white mb-2">
                  {profile.name}, {profile.age}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {profile.profession}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profile.location}</span>
                </div>
              </div>
            </div>

            {/* Content Section (Bottom Half) */}
            <div className="flex-1 bg-black p-6 md:p-8 overflow-y-auto scrollbar-hide space-y-8">
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/30">About</h3>
                <p className="text-white/80 leading-relaxed text-lg font-light">
                  "{profile.bio}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Education</h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <GraduationCap className="w-4 h-4 text-white/50" />
                    {profile.education}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Lifestyle & Culture</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {profile.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-xs text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar (Fixed Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-center gap-6 z-30">
              <button 
                onClick={nextProfile}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button 
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_30px_rgba(232,185,108,0.3)] hover:shadow-[0_0_40px_rgba(232,185,108,0.5)] transition-all hover:scale-105"
              >
                <Heart className="w-7 h-7 fill-current" />
              </button>

              <button 
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                <Info className="w-6 h-6" />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Filter Overlay (Slide In) */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40" 
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-playfair text-2xl font-medium">Preferences</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-white/5">
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Age Range</label>
                  <div className="flex items-center gap-4">
                    <input type="number" placeholder="Min" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    <span className="text-white/30">to</span>
                    <input type="number" placeholder="Max" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Location</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                    <input type="text" placeholder="Search cities..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Community</label>
                  <button className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between text-white/70">
                    Select Communities <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
