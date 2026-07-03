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

// --- Decorative Components ---

const SunlightRays = () => (
  <motion.div 
    className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 3 }}
  >
    <motion.div 
      className="absolute -top-[20%] -left-[10%] w-[80%] h-[120%] bg-gradient-to-br from-[#FFF8E7]/40 via-[#FDF5E6]/10 to-transparent blur-[100px] origin-top-left transform rotate-12"
      animate={{ 
        rotate: [12, 14, 12],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-0 right-0 w-[60%] h-[100%] bg-gradient-to-bl from-[#FFF8E7]/20 via-[#FDF5E6]/5 to-transparent blur-[120px] origin-top-right transform -rotate-12"
      animate={{ 
        rotate: [-12, -15, -12],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
  </motion.div>
);

const FloatingPetals = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    // Generate petals only on client to avoid hydration mismatch
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      size: 10 + Math.random() * 15,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 fixed">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute -top-10 opacity-40 mix-blend-multiply"
          style={{ left: petal.left, width: petal.size, height: petal.size }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8 2 2 6 2 12C2 18 8 22 12 22C16 22 22 18 22 12C22 6 16 2 12 2Z" fill="#F4E9D8" stroke="#E6D5C3" strokeWidth="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const ArchSilhouette = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[800px] pointer-events-none z-0 opacity-40">
    <svg viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M200 800V400C200 123.858 423.858 -100 700 -100C976.142 -100 1200 123.858 1200 400V800" stroke="url(#arch-gradient)" strokeWidth="1" />
      <path d="M300 800V400C300 179.086 479.086 0 700 0C920.914 0 1100 179.086 1100 400V800" stroke="url(#arch-gradient)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="arch-gradient" x1="700" y1="-100" x2="700" y2="800" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6D5C3" stopOpacity="0.8"/>
          <stop offset="1" stopColor="#E6D5C3" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const FloralCornerDecoration = ({ position = "top-left" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const rotation = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90"
  }[position];

  const posClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0"
  }[position];

  return (
    <div className={`absolute ${posClass} w-64 h-64 pointer-events-none opacity-20 ${rotation}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0C50 0 100 20 130 50C160 80 180 130 180 200" stroke="#8C7A6B" strokeWidth="0.5" fill="none" />
        <path d="M0 50C30 50 70 60 90 80C110 100 130 140 130 200" stroke="#8C7A6B" strokeWidth="0.5" fill="none" />
        {/* Subtle floral buds */}
        <circle cx="130" cy="50" r="2" fill="#8C7A6B" />
        <circle cx="90" cy="80" r="1.5" fill="#8C7A6B" />
        <circle cx="50" cy="120" r="1" fill="#8C7A6B" />
      </svg>
    </div>
  );
};

const HeaderCurtains = () => (
  <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none overflow-hidden z-10 flex justify-between opacity-30 mix-blend-multiply">
    <motion.div 
      className="w-1/3 h-full"
      animate={{ skewX: [-1, 1, -1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full bg-gradient-to-r from-[#F4E9D8] via-[#F4E9D8]/50 to-transparent blur-[30px]" />
    </motion.div>
    <motion.div 
      className="w-1/3 h-full"
      animate={{ skewX: [1, -1, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    >
      <div className="w-full h-full bg-gradient-to-l from-[#F4E9D8] via-[#F4E9D8]/50 to-transparent blur-[30px]" />
    </motion.div>
  </div>
);

// --- Main Page ---

export default function BrowseMatchesPage() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  // Filter functionality
  const displayedMatches = MOCK_MATCHES.filter(match => match.firstName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#2A2621] font-sans selection:bg-[#E5D9CC]/50 relative overflow-hidden">
      {/* --- Immersive Environment --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#F0EBE1]/40 mix-blend-multiply"></div>
      </div>
      
      <SunlightRays />
      <ArchSilhouette />
      <HeaderCurtains />
      <FloatingPetals />

      {/* 1. Cinematic Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F6]/40 backdrop-blur-2xl border-b border-[#E6D5C3]/30 px-8 py-5 flex justify-between items-center transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(230,213,195,0.2)]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          {/* Minimal Logo Mark */}
          <div className="w-8 h-8 rounded-full border border-[#8C7A6B] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8C7A6B]/5"></div>
            <span className="font-serif text-[#8C7A6B] text-lg leading-none pt-1">V</span>
          </div>
          <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#8C7A6B]">Vivaha</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex items-center gap-6"
        >
          <button className="group flex items-center gap-2 bg-white/50 border border-[#E6D5C3]/50 text-[#8C7A6B] px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(229,217,204,0.4)] transition-all duration-300">
            <Crown size={14} className="group-hover:text-[#2A2621] transition-colors" />
            <span className="hidden sm:inline group-hover:text-[#2A2621] transition-colors">Premium</span>
          </button>
          
          <button className="relative text-[#A3998D] hover:text-[#8C7A6B] transition-colors">
            <Bell size={22} strokeWidth={1.2} />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#8C7A6B] rounded-full ring-2 ring-[#FBF9F6]"></span>
          </button>
          
          <button className="w-10 h-10 rounded-full border border-[#E6D5C3]/50 bg-white/50 flex items-center justify-center text-[#A3998D] hover:text-[#8C7A6B] hover:bg-white hover:shadow-lg transition-all duration-300">
            <User size={18} strokeWidth={1.2} />
          </button>
        </motion.div>
      </header>

      <main className="relative z-20 pb-32">
        {/* Hero Area */}
        <section className="relative pt-24 pb-16 flex flex-col items-center text-center">
          <motion.div style={{ y: yParallax, opacity: opacityFade }} className="relative z-10 w-full max-w-4xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl text-[#2A2621] tracking-wide leading-tight mb-6"
            >
              Discover Meaningful
              <span className="block italic font-light text-[#8C7A6B]">Connections</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[#8C7A6B] text-lg font-light tracking-wide uppercase max-w-xl mx-auto"
            >
              Curated introductions meticulously tailored for your timeless journey.
            </motion.p>
          </motion.div>
        </section>

        {/* 2. Search Area inside Architectural Composition */}
        <section className="relative z-30 mb-20 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-4xl mx-auto relative"
          >
            {/* The Architectural Container */}
            <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-3 shadow-[0_20px_60px_-15px_rgba(230,213,195,0.4)] border border-[#E6D5C3]/40 relative overflow-hidden">
              {/* Subtle Marble/Texture layer */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }}></div>
              
              <div className="relative bg-white rounded-[2rem] p-6 shadow-sm border border-[#F4E9D8] flex flex-col items-center">
                {/* Search Bar */}
                <div className="relative w-full max-w-2xl mb-8">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="text-[#D4C4B7]" size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, city, or profession..."
                    className="w-full bg-[#FBF9F6] border-none rounded-full py-4 pl-14 pr-6 text-lg focus:outline-none focus:ring-1 focus:ring-[#E6D5C3] placeholder-[#A3998D] text-[#2A2621] shadow-inner font-light"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-2 text-[#8C7A6B] mr-2">
                    <Filter size={16} strokeWidth={1.5} />
                    <span className="text-xs font-semibold uppercase tracking-[0.15em]">Refine</span>
                  </div>
                  {FILTERS.map((filter) => {
                    const isActive = activeFilters.includes(filter);
                    return (
                      <button
                        key={filter}
                        onClick={() => setActiveFilters(prev => isActive ? prev.filter(f => f !== filter) : [...prev, filter])}
                        className={`relative overflow-hidden px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-500 border ${
                          isActive 
                          ? "border-[#8C7A6B] text-[#2A2621] shadow-md"
                          : "border-[#E6D5C3]/60 text-[#8C7A6B] hover:border-[#D4C4B7] hover:text-[#2A2621] hover:shadow-sm"
                        }`}
                      >
                        {/* Hover & Active Highlight background */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-[#FDF5E6] to-[#F4E9D8] transition-opacity duration-500 -z-10 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                        <span className="relative z-10">{filter}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Match Gallery */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-30">
          {displayedMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {displayedMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 * idx, ease: "easeOut" }}
                >
                  <MatchCard 
                    match={match} 
                    onUnlock={() => setShowPremiumModal(true)} 
                  />
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
        {showPremiumModal && (
          <PremiumModal onClose={() => setShowPremiumModal(false)} />
        )}
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
      className="group relative bg-white rounded-[2rem] shadow-[0_4px_20px_-10px_rgba(230,213,195,0.4)] hover:shadow-[0_20px_40px_-15px_rgba(140,122,107,0.2)] transition-all duration-700 cursor-pointer overflow-visible"
      whileHover={{ y: -12 }}
    >
      {/* Decorative Outer Frame */}
      <div className="absolute -inset-2 bg-gradient-to-br from-[#FDF5E6] via-transparent to-[#FDF5E6] rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 border border-[#E6D5C3]/30 blur-[2px]" />

      <div className="relative rounded-[2rem] overflow-hidden bg-white border border-[#F4E9D8]">
        {/* Paper texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        {/* Floral corner SVGs inside card */}
        <FloralCornerDecoration position="top-left" />
        <FloralCornerDecoration position="bottom-right" />

        {/* Image Container with Zoom & Vignette */}
        <div className="relative h-[480px] overflow-hidden bg-[#F0EBE1] m-3 rounded-[1.5rem]">
          <Image
            src={match.image}
            alt={match.firstName}
            fill
            className="object-cover object-center blur-[3px] scale-105 group-hover:scale-110 group-hover:blur-[1px] transition-all duration-1000 ease-out"
          />
          {/* Internal Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2621]/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Compatibility Ring */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-sm">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E6D5C3"
                  strokeWidth="2"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#8C7A6B"
                  strokeWidth="2"
                  strokeDasharray={`${match.compatibility}, 100`}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: match.compatibility / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-[9px] font-serif font-bold text-[#2A2621] tracking-tighter">{match.compatibility}%</span>
            </div>
            <span className="text-[10px] font-semibold text-[#8C7A6B] tracking-[0.2em] uppercase">Match</span>
          </div>

          {/* Details Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
            <h2 className="font-serif text-3xl font-light tracking-wide flex items-center gap-3 drop-shadow-md">
              {match.firstName}, {match.age}
              {match.verified && (
                <CheckCircle size={20} className="text-[#FDF5E6]" fill="none" strokeWidth={1.5} />
              )}
            </h2>
            <div className="flex gap-4 mt-2 text-[#FDF5E6] text-sm font-light tracking-wider opacity-90 drop-shadow-sm">
              <span>{match.profession}</span>
              <span className="w-1 h-1 rounded-full bg-white/50 self-center"></span>
              <span>{match.city}</span>
            </div>
          </div>
        </div>

        {/* 4. Locked Experience Buttons */}
        <div className="px-6 pb-6 pt-3 space-y-3 relative z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className="group/btn w-full flex items-center justify-center gap-3 bg-[#2A2621] text-white py-4 rounded-xl shadow-md hover:bg-[#1A1815] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
            <Lock size={16} className="text-[#E6D5C3]" strokeWidth={1.5} />
            <span className="font-serif tracking-wider text-sm">View Full Profile</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className="w-full flex items-center justify-center gap-3 bg-white text-[#2A2621] border border-[#E6D5C3] py-4 rounded-xl hover:bg-[#FDF5E6] transition-colors duration-300"
          >
            <Lock size={16} className="text-[#8C7A6B]" strokeWidth={1.5} />
            <span className="font-serif tracking-wider text-sm">Send Interest</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------
// Empty State Component
// ------------------------------------------------
function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      {/* Elegant Architectural Frame */}
      <div className="w-56 h-72 mb-10 relative overflow-hidden border border-[#E6D5C3] rounded-t-full p-2">
        <div className="w-full h-full border border-[#F4E9D8] rounded-t-full relative flex items-center justify-center bg-[#FDF5E6]/30">
          {/* Abstract floral illustration */}
          <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 text-[#8C7A6B] opacity-40">
            <path d="M50 20C50 20 20 40 20 60C20 76.5 33.5 90 50 90C66.5 90 80 76.5 80 60C80 40 50 20 50 20Z" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M50 20C50 20 35 45 35 60C35 68.3 41.7 75 50 75C58.3 75 65 68.3 65 60C65 45 50 20 50 20Z" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="55" r="5" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>
      <h3 className="font-serif text-3xl text-[#2A2621] mb-4 tracking-wide">Awaiting New Connections</h3>
      <p className="text-[#8C7A6B] max-w-md mx-auto font-light leading-relaxed">
        The garden is quiet for now. Try adjusting your preferences or check back later as we curate new introductions.
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
      {/* Backdrop with elegant blur */}
      <motion.div
        className="absolute inset-0 bg-[#FBF9F6]/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(42,38,33,0.15)] border border-[#E6D5C3] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#A3998D] hover:text-[#2A2621] transition-colors z-30 bg-white/50 rounded-full p-1 backdrop-blur-sm"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="relative pt-16 pb-12 px-10 text-center border-b border-[#F4E9D8] overflow-hidden bg-[#FDF5E6]/30">
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[150px] bg-gradient-to-b from-[#E6D5C3]/20 to-transparent blur-[40px] pointer-events-none rounded-b-[100%]" />
          
          <div className="w-16 h-16 mx-auto border border-[#8C7A6B] bg-white rounded-full flex items-center justify-center shadow-sm mb-8 relative z-20">
            <Crown size={24} className="text-[#8C7A6B]" strokeWidth={1.5} />
          </div>
          
          <h2 className="font-serif text-4xl text-[#2A2621] mb-4 relative z-20 tracking-wide">Your Journey Begins Here</h2>
          <p className="text-[#8C7A6B] text-sm leading-relaxed relative z-20 font-light max-w-xs mx-auto">
            Unlock verified profiles, send unlimited interests, and discover your perfect life partner.
          </p>
        </div>

        <div className="p-10 bg-white relative z-20">
          <div className="flex justify-between items-center mb-10 bg-[#FBF9F6] p-6 rounded-2xl border border-[#F4E9D8]">
            <div>
              <p className="text-[#2A2621] font-serif text-xl tracking-wide">Lifetime Premium</p>
              <p className="text-[#8C7A6B] text-xs uppercase tracking-widest mt-1">One-time investment</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-3xl text-[#2A2621]">₹5,000</p>
            </div>
          </div>

          <ul className="space-y-5 mb-12">
            {[
              "View complete profiles and full galleries",
              "Send unlimited interests and messages",
              "Advanced AI compatibility insights",
              "Priority recommendations to top matches",
              "Verified trust badge on your profile"
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle size={18} className="text-[#8C7A6B] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#2A2621] font-light text-sm">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <button className="group w-full bg-[#2A2621] text-white py-4 rounded-xl shadow-lg hover:bg-[#1A1815] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="font-serif tracking-widest uppercase text-sm">Become a Lifetime Member</span>
            </button>
            <button 
              onClick={onClose}
              className="w-full text-[#8C7A6B] hover:text-[#2A2621] py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
