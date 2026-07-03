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

// Mock Data
const MOCK_MATCHES = [
  {
    id: 1,
    firstName: "Aanya",
    age: 27,
    city: "Mumbai, India",
    profession: "Architect",
    compatibility: 94,
    verified: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    firstName: "Priya",
    age: 26,
    city: "London, UK",
    profession: "Investment Banker",
    compatibility: 89,
    verified: true,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    firstName: "Riya",
    age: 28,
    city: "New York, USA",
    profession: "Software Engineer",
    compatibility: 91,
    verified: true,
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    firstName: "Meera",
    age: 25,
    city: "Delhi, India",
    profession: "Doctor",
    compatibility: 87,
    verified: false,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  }
];

const FILTERS = ["Age", "Religion", "Community", "City", "Profession", "Education", "Height"];

// --- Decorative Background Elements ---

// Volumetric sunlight passing through canopy
const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start">
    <motion.div 
      className="absolute top-[-10%] w-[1200px] h-[800px] bg-gradient-radial from-[#FDF5E6]/40 via-[#FDF5E6]/5 to-transparent blur-[80px]"
      animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-[-20%] left-[40%] w-[400px] h-[1000px] bg-gradient-to-b from-[#FFF8E7]/30 to-transparent blur-[60px] origin-top transform rotate-12"
      animate={{ opacity: [0.2, 0.4, 0.2], rotate: [12, 15, 12] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-[-20%] right-[40%] w-[300px] h-[900px] bg-gradient-to-b from-[#FFF8E7]/20 to-transparent blur-[60px] origin-top transform -rotate-15"
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
                <path d="M12 2C8 2 2 6 2 12C2 18 8 22 12 22C16 22 22 18 22 12C22 6 16 2 12 2Z" fill="#FDF5E6" stroke="#E6D5C3" strokeWidth="0.5" />
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
              className="absolute rounded-full bg-[#E6D5C3] opacity-20 blur-[1px]"
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
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-t-[400px] border-b-0 relative">
      <div className="absolute inset-3 border border-[#8C7A6B]/50 rounded-t-[380px] border-b-0" />
    </div>
  </div>
);

const SoftCurtains = () => (
  <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0 flex justify-between opacity-10 mix-blend-multiply">
    <motion.svg viewBox="0 0 400 800" fill="none" className="w-1/3 h-full object-cover origin-top-left" animate={{ skewX: [-2, 2, -2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M0 0 H400 Q200 400 100 800 H0 Z" fill="url(#curtain-grad-left)" />
      <defs>
        <linearGradient id="curtain-grad-left" x1="0" y1="0" x2="400" y2="800">
          <stop stopColor="#8C7A6B" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8C7A6B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
    <motion.svg viewBox="0 0 400 800" fill="none" className="w-1/3 h-full object-cover origin-top-right transform scale-x-[-1]" animate={{ skewX: [-2, 2, -2] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
      <path d="M0 0 H400 Q200 400 100 800 H0 Z" fill="url(#curtain-grad-right)" />
      <defs>
        <linearGradient id="curtain-grad-right" x1="0" y1="0" x2="400" y2="800">
          <stop stopColor="#8C7A6B" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8C7A6B" stopOpacity="0" />
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
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 100]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  const displayedMatches = MOCK_MATCHES.filter(match => match.firstName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] font-sans selection:bg-[#E5D9CC]/50 relative overflow-x-hidden">
      
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
      <header className="sticky top-0 z-50 bg-[#F7F5EF]/60 backdrop-blur-3xl px-10 py-6 flex justify-between items-center transition-all border-b border-[#E6D5C3]/40">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#8C7A6B] flex items-center justify-center relative">
            <span className="font-serif text-[#8C7A6B] text-lg leading-none pt-1">V</span>
          </div>
          <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#8C7A6B]">Vivaha</span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center gap-8">
          <button className="group flex items-center gap-2 bg-[#FDF5E6]/80 border border-[#E6D5C3] text-[#8C7A6B] px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#2A2621] hover:border-[#D4C4B7] hover:shadow-lg transition-all duration-300">
            <Crown size={14} className="transition-colors" />
            <span className="hidden sm:inline transition-colors">Premium</span>
          </button>
          <button className="relative text-[#A3998D] hover:text-[#2A2621] transition-colors">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#8C7A6B] rounded-full ring-2 ring-[#F7F5EF]"></span>
          </button>
          <button className="w-10 h-10 rounded-full border border-[#E6D5C3] bg-white flex items-center justify-center text-[#A3998D] hover:text-[#2A2621] hover:shadow-md transition-all duration-300">
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
              className="font-serif text-[4rem] md:text-[5.5rem] text-[#2A2621] tracking-normal leading-[1.1] mb-8"
            >
              Discover Meaningful<br/>
              <span className="italic font-light text-[#8C7A6B] tracking-wide">Connections</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[#8C7A6B] text-[13px] font-medium tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed"
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
            <div className="bg-[#FBF9F6] rounded-[2rem] p-8 shadow-[0_20px_50px_-15px_rgba(230,213,195,0.6),inset_0_2px_10px_rgba(255,255,255,1)] border border-[#E6D5C3]/80 relative overflow-hidden flex flex-col items-center">
              {/* Subtle Paper Texture */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              
              {/* Search Bar */}
              <div className="relative w-full max-w-[600px] mb-8 z-10">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="text-[#A3998D]" size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, city, or profession..."
                  className="w-full bg-white border border-[#E6D5C3]/60 rounded-full py-4 pl-14 pr-6 text-lg focus:outline-none focus:ring-1 focus:ring-[#8C7A6B] placeholder-[#A3998D] text-[#2A2621] shadow-sm font-light transition-all"
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
                        ? "border-[#8C7A6B] bg-[#2A2621] text-white shadow-md"
                        : "border-[#E6D5C3] bg-[#FDF5E6]/50 text-[#8C7A6B] hover:border-[#D4C4B7] hover:text-[#2A2621] hover:shadow-sm"
                      }`}
                    >
                      {/* Champagne Glow on Hover (only if not active) */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F4E9D8]/0 via-[#FDF5E6] to-[#F4E9D8]/0 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />
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
        <section className="max-w-[1400px] mx-auto px-8 relative z-40 bg-[#F7F5EF]">
          {displayedMatches.length > 0 ? (
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
      className="group relative bg-[#FBF9F6] rounded-2xl shadow-sm border border-[#E6D5C3]/80 hover:shadow-[0_20px_40px_-15px_rgba(140,122,107,0.15)] hover:border-[#D4C4B7] transition-all duration-700 cursor-pointer overflow-hidden flex flex-col"
      whileHover={{ y: -8 }}
    >
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      {/* Image Section */}
      <div className="relative h-[380px] overflow-hidden bg-[#F0EBE1] m-2 rounded-xl">
        <Image src={match.image} alt={match.firstName} fill className="object-cover object-center blur-[4px] scale-105 group-hover:scale-110 group-hover:blur-[2px] transition-all duration-1000 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2621]/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Compatibility Ring */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#FBF9F6]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-[#E6D5C3]">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E6D5C3" strokeWidth="2.5" />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#8C7A6B" strokeWidth="2.5" strokeDasharray={`${match.compatibility}, 100`}
                initial={{ pathLength: 0 }} whileInView={{ pathLength: match.compatibility / 100 }} transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-[8px] font-serif font-bold text-[#2A2621]">{match.compatibility}%</span>
          </div>
          <span className="text-[9px] font-semibold text-[#8C7A6B] tracking-[0.2em] uppercase">Match</span>
        </div>

        {/* Typography inside Image */}
        <div className="absolute bottom-0 left-0 w-full p-5 z-20 text-white">
          <h2 className="font-serif text-2xl font-light tracking-wide flex items-center gap-2 drop-shadow-md">
            {match.firstName}, {match.age}
            {match.verified && <CheckCircle size={16} className="text-[#FDF5E6]" fill="none" strokeWidth={1.5} />}
          </h2>
          <div className="flex items-center gap-3 mt-1.5 text-[#FDF5E6] text-xs font-light tracking-wider opacity-90">
            <span>{match.profession}</span>
            <span className="w-1 h-1 rounded-full bg-white/40"></span>
            <span>{match.city}</span>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="px-5 pb-5 pt-4 space-y-2.5 relative z-20 bg-[#FBF9F6]">
        <button onClick={(e) => { e.stopPropagation(); onUnlock(); }} className="w-full flex items-center justify-center gap-2 bg-[#2A2621] text-white py-3.5 rounded-lg shadow-sm hover:bg-[#1A1815] transition-colors duration-300">
          <Lock size={14} className="text-[#E6D5C3]" strokeWidth={1.5} />
          <span className="font-serif tracking-widest text-[11px] uppercase">View Full Profile</span>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onUnlock(); }} className="w-full flex items-center justify-center gap-2 bg-transparent text-[#2A2621] border border-[#E6D5C3] py-3.5 rounded-lg hover:bg-white hover:border-[#D4C4B7] transition-all duration-300">
          <Lock size={14} className="text-[#8C7A6B]" strokeWidth={1.5} />
          <span className="font-serif tracking-widest text-[11px] uppercase">Send Interest</span>
        </button>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------
// Empty State Component
// ------------------------------------------------
function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center bg-[#FBF9F6] rounded-[2rem] border border-[#E6D5C3]/50">
      <div className="w-32 h-48 mb-8 relative border border-[#E6D5C3] rounded-t-full flex items-center justify-center bg-white shadow-sm">
        <Crown className="text-[#E6D5C3] w-12 h-12" strokeWidth={1} />
      </div>
      <h3 className="font-serif text-2xl text-[#2A2621] mb-3 tracking-wide">Awaiting New Connections</h3>
      <p className="text-[#8C7A6B] max-w-sm mx-auto font-light text-sm leading-relaxed">
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
      <motion.div className="absolute inset-0 bg-[#F7F5EF]/90 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg bg-[#FBF9F6] rounded-[1.5rem] shadow-2xl border border-[#E6D5C3] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-[#A3998D] hover:text-[#2A2621] transition-colors z-30">
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="pt-14 pb-10 px-10 text-center border-b border-[#F4E9D8] relative overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
          <div className="w-14 h-14 mx-auto border border-[#E6D5C3] bg-[#FBF9F6] rounded-full flex items-center justify-center shadow-sm mb-6 relative z-20">
            <Crown size={20} className="text-[#8C7A6B]" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl text-[#2A2621] mb-3 relative z-20 tracking-wide">Your Journey Begins Here</h2>
          <p className="text-[#8C7A6B] text-sm leading-relaxed relative z-20 font-light max-w-xs mx-auto">
            Unlock verified profiles, send unlimited interests, and discover your perfect life partner.
          </p>
        </div>

        <div className="p-10 bg-[#FBF9F6] relative z-20">
          <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl border border-[#E6D5C3]/50 shadow-sm">
            <div>
              <p className="text-[#2A2621] font-serif text-lg tracking-wide">Lifetime Premium</p>
              <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest mt-1">One-time investment</p>
            </div>
            <p className="font-serif text-2xl text-[#2A2621]">₹5,000</p>
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
                <CheckCircle size={16} className="text-[#8C7A6B] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#2A2621] font-light text-[13px] tracking-wide">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <button className="w-full bg-[#2A2621] text-white py-4 rounded-xl shadow-md hover:bg-[#1A1815] transition-all duration-300 font-serif tracking-widest uppercase text-xs">
              Become a Lifetime Member
            </button>
            <button onClick={onClose} className="w-full text-[#8C7A6B] hover:text-[#2A2621] py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
