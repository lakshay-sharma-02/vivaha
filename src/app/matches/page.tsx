"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Bell,
  User,
  Crown,
  Search,
  CheckCircle,
  Lock,
  X,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { fetchDiscoverProfiles } from "@/app/actions/discover";
import { sendInterest } from "@/app/actions/interests";
import { NotificationBell } from "@/shared/components/NotificationBell";

const FILTERS = ["Age", "Religion", "Community", "City", "Profession", "Education", "Height"];

// --- Decorative Background Elements ---

// Volumetric sunlight passing through canopy
const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start">
    <motion.div 
      className="absolute top-[-10%] w-[1200px] h-[800px] bg-gradient-radial from-gold/40 via-gold/5 to-transparent blur-[80px]"
      animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-[-20%] left-[40%] w-[400px] h-[1000px] bg-gradient-to-b from-gold/5 to-transparent blur-[60px] origin-top transform rotate-12"
      animate={{ opacity: [0.2, 0.4, 0.2], rotate: [12, 15, 12] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-[-20%] right-[40%] w-[300px] h-[900px] bg-gradient-to-b from-gold/5 to-transparent blur-[60px] origin-top transform -rotate-15"
      animate={{ opacity: [0.1, 0.3, 0.1], rotate: [-15, -12, -15] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
  </div>
);

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate petals, dust, and bokeh only on client to avoid hydration mismatch
    const generated = Array.from({ length: 30 }).map((_, i) => {
      const type = i % 5 === 0 ? 'petal' : (i % 3 === 0 ? 'bokeh' : 'dust');
      return {
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -20}%`,
        delay: Math.random() * 20,
        duration: 20 + Math.random() * 40,
        size: type === 'petal' ? 8 + Math.random() * 12 : type === 'bokeh' ? 40 + Math.random() * 60 : 2 + Math.random() * 4,
        xOffset: Math.random() * 200 - 100
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 fixed">
      {particles.map((p) => {
        if (p.type === 'petal') {
          return (
            <motion.div
              key={p.id}
              className="absolute opacity-40 mix-blend-multiply"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{
                y: ["0vh", "120vh"],
                x: [0, p.xOffset, p.xOffset * 1.5],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8 2 2 6 2 12C2 18 8 22 12 22C16 22 22 18 22 12C22 6 16 2 12 2Z" fill="#f7ecd3" stroke="#d4af37" strokeWidth="0.5" />
              </svg>
            </motion.div>
          );
        } else if (p.type === 'bokeh') {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white opacity-[0.02] mix-blend-overlay blur-md"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: ["0vh", "120vh"], x: [0, p.xOffset] }}
              transition={{ duration: p.duration * 1.5, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          );
        } else {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-gold/30 opacity-20 blur-[1px]"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: ["0vh", "120vh"], x: [0, p.xOffset / 2, p.xOffset] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          );
        }
      })}
    </div>
  );
};

// Extremely abstract wedding arch behind the hero
const AbstractArch = () => (
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[900px] pointer-events-none z-0 opacity-10 flex justify-center">
    <div className="w-full h-full border-[1.5px] border-gold-light/70 rounded-t-[400px] border-b-0 relative">
      <div className="absolute inset-3 border border-gold-light/70 rounded-t-[380px] border-b-0" />
    </div>
  </div>
);

const SoftCurtains = () => (
  <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0 flex justify-between opacity-10 mix-blend-multiply">
    <motion.svg viewBox="0 0 400 800" fill="none" className="w-1/3 h-full object-cover origin-top-left" animate={{ skewX: [-2, 2, -2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M0 0 H400 Q200 400 100 800 H0 Z" fill="url(#curtain-grad-left)" />
      <defs>
        <linearGradient id="curtain-grad-left" x1="0" y1="0" x2="400" y2="800">
          <stop stopColor="#f3d889" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f3d889" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
    <motion.svg viewBox="0 0 400 800" fill="none" className="w-1/3 h-full object-cover origin-top-right transform scale-x-[-1]" animate={{ skewX: [-2, 2, -2] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
      <path d="M0 0 H400 Q200 400 100 800 H0 Z" fill="url(#curtain-grad-right)" />
      <defs>
        <linearGradient id="curtain-grad-right" x1="0" y1="0" x2="400" y2="800">
          <stop stopColor="#f3d889" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f3d889" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  </div>
);

// --- Main Page ---

export default function BrowseMatchesPage() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 100]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    async function loadMatches() {
      setIsLoading(true);
      const result = await fetchDiscoverProfiles(1);
      if (result.success) {
        setMatches(result.profiles || []);
      }
      setIsLoading(false);
    }
    loadMatches();
  }, []);

  const displayedMatches = matches.filter(match => match.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-maroon-deep text-cream font-body selection:bg-gold/50 relative overflow-x-hidden">
      
      {/* BACKGROUND: Pure base + paper texture only */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      </div>

      {/* DEPTH ELEMENTS */}
      <SoftCurtains />
      <SunlightRays />
      <AbstractArch />
      <FloatingParticles />

      {/* FLORAL INSTALLATIONS (Mix-blend multiply dissolves the white bg seamlessly) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-10 opacity-90 mix-blend-multiply">
        <Image src="/images/floral_top_left.jpg" alt="" fill className="object-contain object-top-left drop-shadow-xl" priority />
      </div>
      <div className="absolute top-0 right-0 w-[650px] h-[650px] pointer-events-none z-10 opacity-90 mix-blend-multiply transform translate-x-12 -translate-y-4">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-contain object-top-right drop-shadow-xl" priority />
      </div>
      
      {/* Very subtle bottom florals */}
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] pointer-events-none z-0 opacity-15 mix-blend-multiply transform -scale-y-100">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-cover object-bottom-left" />
      </div>
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] pointer-events-none z-0 opacity-15 mix-blend-multiply transform -scale-y-100 scale-x-[-1]">
        <Image src="/images/floral_top_left.jpg" alt="" fill className="object-cover object-bottom-right" />
      </div>

      {/* 1. Header (Clean & Minimal) */}
      <header className="sticky top-0 z-50 bg-maroon-deep/60 backdrop-blur-3xl px-10 py-6 flex justify-between items-center transition-all border-b border-gold/30">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold-light/70 flex items-center justify-center relative">
            <span className="font-display text-gold-light/70 text-lg leading-none pt-1">V</span>
          </div>
          <span className="font-display text-xl tracking-[0.2em] uppercase text-gold-light/70">Vivah</span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center gap-8">
          <button className="group flex items-center gap-2 bg-maroon border-gold/30 text-gold-light/70 px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-maroon-deep hover:text-cream hover:border-gold/40 hover:shadow-lg transition-all duration-300">
            <Crown size={14} className="transition-colors" />
            <span className="hidden sm:inline transition-colors">Premium</span>
          </button>
          <NotificationBell />
          <button className="w-10 h-10 rounded-full border border-gold/30 bg-maroon flex items-center justify-center text-cream/50 hover:text-cream hover:shadow-md transition-all duration-300">
            <User size={18} strokeWidth={1.5} />
          </button>
        </motion.div>
      </header>

      <main className="relative z-20 pb-40">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 flex flex-col items-center text-center">
          <motion.div style={{ y: yParallax, opacity: opacityFade }} className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-display text-[4rem] md:text-[5.5rem] text-cream tracking-normal leading-[1.1] mb-8"
            >
              Discover Meaningful<br/>
              <span className="italic font-light text-gold-light/70 tracking-wide">Connections</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-gold-light/70 text-[13px] font-medium tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed"
            >
              Curated introductions meticulously<br/>tailored for your timeless journey.
            </motion.p>
          </motion.div>
        </section>

        {/* SEARCH & FILTERS (Elegant Architectural Container) */}
        <section className="relative z-30 mb-24 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-[900px] mx-auto relative"
          >
            {/* The Container */}
            <div className="bg-maroon rounded-[2rem] p-8 shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15),inset_0_2px_10px_rgba(247,236,211,0.3)] border border-gold/30 relative overflow-hidden flex flex-col items-center">
              {/* Subtle Paper Texture */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              
              {/* Search Bar */}
              <div className="relative w-full max-w-[600px] mb-8 z-10">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="text-cream/50" size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, city, or profession..."
                  className="w-full bg-maroon-deep border border-gold/30 rounded-full py-4 pl-14 pr-6 text-lg focus:outline-none focus:ring-1 focus:ring-gold-light/70 placeholder-cream/50 text-cream shadow-sm font-light transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3.5 z-10">
                {FILTERS.map((filter) => {
                  const isActive = activeFilters.includes(filter);
                  return (
                    <motion.button
                      key={filter}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => setActiveFilters(prev => isActive ? prev.filter(f => f !== filter) : [...prev, filter])}
                      className={`relative overflow-hidden px-6 py-2 rounded-full text-[13px] tracking-wide transition-all duration-300 border-[0.5px] ${
                        isActive 
                        ? "border-gold-light/70 bg-cream text-ink shadow-md"
                        : "border-gold/30 bg-maroon/50 text-gold-light/70 hover:border-gold/40 hover:text-cream hover:shadow-sm"
                      }`}
                    >
                      {/* Champagne Glow on Hover (only if not active) */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />
                      )}
                      <span className="relative z-10 font-medium">{filter}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROFILE GRID */}
        <section className="max-w-[1400px] mx-auto px-8 relative z-40 bg-maroon-deep">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-2 border-gold/30 border-t-gold-light/70 rounded-full animate-spin"></div>
            </div>
          ) : displayedMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {displayedMatches.map((match, idx) => (
                <motion.div key={match.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 * idx, ease: "easeOut" }}>
                  <MatchCard match={match} onUnlock={() => setShowPremiumModal(true)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </main>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------
// Profile Card Component
// ------------------------------------------------
function MatchCard({ match, onUnlock }: { match: any; onUnlock: () => void }) {
  return (
    <motion.div
      className="group relative bg-maroon rounded-2xl shadow-sm border border-gold/30 hover:shadow-[0_20px_40px_-15px_rgba(243,216,137,0.15)] hover:border-gold/40 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col"
      whileHover={{ y: -8 }}
    >
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      {/* Image Section */}
      <div className="relative h-[380px] overflow-hidden bg-maroon-deep m-2 rounded-xl">
        <Image src={match.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"} alt={match.name} fill className="object-cover object-center blur-[4px] scale-105 group-hover:scale-110 group-hover:blur-[2px] transition-all duration-1000 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Compatibility Ring */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-maroon/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-gold/30">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d4af37" strokeWidth="2.5" />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#f3d889" strokeWidth="2.5" strokeDasharray={`${match.compatibility}, 100`}
                initial={{ pathLength: 0 }} whileInView={{ pathLength: match.compatibility / 100 }} transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-[8px] font-display font-bold text-cream">{match.compatibility}%</span>
          </div>
          <span className="text-[9px] font-semibold text-gold-light/70 tracking-[0.2em] uppercase">Match</span>
        </div>

        {/* Typography inside Image */}
        <div className="absolute bottom-0 left-0 w-full p-5 z-20 text-white">
          <h2 className="font-display text-2xl font-light tracking-wide flex items-center gap-2 drop-shadow-md">
            {match.name.split(' ')[0]}, {match.age}
            {match.verified && <CheckCircle size={16} className="text-cream" fill="none" strokeWidth={1.5} />}
          </h2>
          <div className="flex items-center gap-3 mt-1.5 text-cream text-xs font-light tracking-wider opacity-90">
            <span>{match.profession}</span>
            <span className="w-1 h-1 rounded-full bg-white/40"></span>
            <span>{match.location}</span>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="px-5 pb-5 pt-4 space-y-2.5 relative z-20 bg-maroon">
        <button onClick={(e) => { e.stopPropagation(); onUnlock(); }} className="w-full flex items-center justify-center gap-2 bg-[#2A2621] text-white py-3.5 rounded-lg shadow-sm hover:bg-[#1A1815] transition-colors duration-300">
          <Lock size={14} className="text-gold/30" strokeWidth={1.5} />
          <span className="font-display tracking-widest text-[11px] uppercase">View Full Profile</span>
        </button>
        <SendInterestButton matchId={match.id} onUnlock={onUnlock} />
      </div>
    </motion.div>
  );
}

function SendInterestButton({ matchId, onUnlock }: { matchId: string; onUnlock: () => void }) {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSending || sent) return;
    
    // First we would check if they are premium, for now we will just simulate it
    // Wait, the prompt says "Messaging is enabled ONLY when both users have accepted"
    // "Send Interest" is free for some? Let's just fire sendInterest action!
    setIsSending(true);
    const result = await sendInterest(matchId);
    if (result.success) {
      setSent(true);
    } else {
      // If error (like not premium, we could call onUnlock())
      console.error(result.error);
      if (result.error === "Not authenticated") {
         onUnlock();
      }
    }
    setIsSending(false);
  };

  return (
    <button 
      onClick={handleSend}
      disabled={isSending || sent}
      className={`w-full flex items-center justify-center gap-2 border py-3.5 rounded-lg transition-all duration-300 ${sent ? 'bg-maroon border-gold/40 text-gold-light/70' : 'bg-transparent text-cream border-gold/30 hover:bg-maroon-deep hover:border-gold/40'}`}
    >
      {sent ? (
        <>
          <CheckCircle size={14} className="text-gold-light/70" strokeWidth={1.5} />
          <span className="font-display tracking-widest text-[11px] uppercase text-gold-light/70">Interest Sent</span>
        </>
      ) : (
        <>
          <Lock size={14} className="text-gold-light/70" strokeWidth={1.5} />
          <span className="font-display tracking-widest text-[11px] uppercase">{isSending ? 'Sending...' : 'Send Interest'}</span>
        </>
      )}
    </button>
  );
}

// ------------------------------------------------
// Empty State Component
// ------------------------------------------------
function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center bg-maroon rounded-[2rem] border border-gold/30">
      <div className="w-32 h-48 mb-8 relative border border-gold/30 rounded-t-full flex items-center justify-center bg-maroon shadow-sm">
        <Crown className="text-gold/30 w-12 h-12" strokeWidth={1} />
      </div>
      <h3 className="font-display text-2xl text-cream mb-3 tracking-wide">Awaiting New Connections</h3>
      <p className="text-gold-light/70 max-w-sm mx-auto font-light text-sm leading-relaxed">
        The estate is quiet for now. Try adjusting your preferences or check back later as we curate new introductions.
      </p>
    </motion.div>
  );
}

// ------------------------------------------------
// Premium Modal Component
// ------------------------------------------------
function PremiumModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div className="absolute inset-0 bg-maroon-deep/90 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg bg-maroon rounded-[1.5rem] shadow-2xl border border-gold/30 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-cream/50 hover:text-cream transition-colors z-30">
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="pt-14 pb-10 px-10 text-center border-b border-gold/30 relative overflow-hidden bg-maroon">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
          <div className="w-14 h-14 mx-auto border border-gold/30 bg-maroon rounded-full flex items-center justify-center shadow-sm mb-6 relative z-20">
            <Crown size={20} className="text-gold-light/70" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-3xl text-cream mb-3 relative z-20 tracking-wide">Your Journey Begins Here</h2>
          <p className="text-gold-light/70 text-sm leading-relaxed relative z-20 font-light max-w-xs mx-auto">
            Unlock verified profiles, send unlimited interests, and discover your perfect life partner.
          </p>
        </div>

        <div className="p-10 bg-maroon relative z-20">
          <div className="flex justify-between items-center mb-8 bg-maroon-deep p-5 rounded-xl border border-gold/30 shadow-sm">
            <div>
              <p className="text-cream font-display text-lg tracking-wide">Lifetime Premium</p>
              <p className="text-gold-light/70 text-[10px] uppercase tracking-widest mt-1">One-time investment</p>
            </div>
            <p className="font-display text-2xl text-cream">₹5,000</p>
          </div>

          <ul className="space-y-4 mb-10">
            {[
              "View complete profiles and full galleries",
              "Send unlimited interests and messages",
              "Advanced AI compatibility insights",
              "Priority recommendations to top matches",
              "Verified trust badge on your profile"
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold-light/70 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-cream font-light text-[13px] tracking-wide">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <button className="w-full bg-[#2A2621] text-white py-4 rounded-xl shadow-md hover:bg-[#1A1815] transition-all duration-300 font-display tracking-widest uppercase text-xs">
              Become a Lifetime Member
            </button>
            <button onClick={onClose} className="w-full text-gold-light/70 hover:text-cream py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
