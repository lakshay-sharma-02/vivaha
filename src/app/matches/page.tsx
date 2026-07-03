"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function BrowseMatchesPage() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Filter functionality to show empty state if needed
  const displayedMatches = MOCK_MATCHES.filter(match => match.firstName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] font-sans selection:bg-[#D4C4B7]/30">
      {/* 1. Elegant Header */}
      <header className="sticky top-0 z-30 bg-[#F7F5EF]/80 backdrop-blur-md border-b border-[#E6E0D4] px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#2A2621] tracking-wide">
            Discover Meaningful Connections
          </h1>
          <p className="text-[#6B6358] text-sm md:text-base mt-2 font-light">
            Curated introductions tailored for your journey.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#D4C4B7] to-[#E5D9CC] text-[#2A2621] px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
            <Crown size={16} className="text-[#8C7A6B]" />
            <span className="hidden sm:inline">Premium</span>
          </button>
          
          <button className="relative text-[#6B6358] hover:text-[#2A2621] transition-colors">
            <Bell size={24} strokeWidth={1.5} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#8C7A6B] rounded-full"></span>
          </button>
          
          <button className="w-10 h-10 rounded-full bg-[#E6E0D4] flex items-center justify-center text-[#6B6358] hover:bg-[#D4C4B7] hover:text-[#2A2621] transition-colors">
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* 2. Search Section */}
        <section className="mb-16">
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="text-[#A3998D]" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by name, city, or profession..."
              className="w-full bg-white border border-[#E6E0D4] rounded-full py-4 pl-14 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#D4C4B7] shadow-sm transition-shadow placeholder-[#A3998D] text-[#2A2621]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 text-[#6B6358] mr-2">
              <Filter size={16} />
              <span className="text-sm font-medium uppercase tracking-wider">Refine</span>
            </div>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter])}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 border ${
                  activeFilters.includes(filter) 
                  ? "bg-[#2A2621] text-white border-[#2A2621] shadow-md"
                  : "bg-white text-[#6B6358] border-[#E6E0D4] hover:border-[#D4C4B7] hover:bg-[#FDFCFB] shadow-sm"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* 3. Match Gallery & 6. Empty State */}
        {displayedMatches.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedMatches.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onUnlock={() => setShowPremiumModal(true)} 
              />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Elegant Illustration Placeholder */}
            <div className="w-48 h-48 mb-8 relative opacity-80">
              <div className="absolute inset-0 bg-[#E6E0D4] rounded-full blur-3xl opacity-50"></div>
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D4C4B7]">
                <path d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M100 40C66.8629 40 40 66.8629 40 100C40 133.137 66.8629 160 100 160C133.137 160 160 133.137 160 100C160 66.8629 133.137 40 100 40Z" stroke="currentColor" strokeWidth="1"/>
                <path d="M125 85C125 98.8071 113.807 110 100 110C86.1929 110 75 98.8071 75 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="100" cy="100" r="4" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#2A2621] mb-3">Awaiting New Connections</h3>
            <p className="text-[#6B6358] max-w-md mx-auto">
              We couldn't find a perfect match yet. Try adjusting your preferences or check back later for new introductions.
            </p>
          </div>
        )}
      </main>

      {/* 5. Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <PremiumModal onClose={() => setShowPremiumModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------
// Match Card Component
// ------------------------------------------------
function MatchCard({ match, onUnlock }: { match: any; onUnlock: () => void }) {
  return (
    <motion.div
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E6E0D4]/50 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
    >
      {/* Subtle floral border glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4C4B7]/0 via-[#D4C4B7]/0 to-[#D4C4B7]/0 group-hover:from-[#D4C4B7]/15 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none rounded-[2rem]" />
      
      {/* Image Container with Zoom effect */}
      <div className="relative h-[440px] overflow-hidden bg-[#E6E0D4]">
        <Image
          src={match.image}
          alt={match.firstName}
          fill
          className="object-cover object-center blur-[2px] scale-105 group-hover:scale-110 group-hover:blur-[1px] transition-all duration-1000 ease-out brightness-[0.85] group-hover:brightness-100"
        />
        
        {/* Compatibility Ring */}
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-sm">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E6E0D4"
                strokeWidth="3"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#8C7A6B"
                strokeWidth="3"
                strokeDasharray={`${match.compatibility}, 100`}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: match.compatibility / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-[8px] font-bold text-[#2A2621]">{match.compatibility}%</span>
          </div>
          <span className="text-xs font-semibold text-[#2A2621] tracking-wide uppercase">Match</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 relative z-10 bg-white">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#2A2621] flex items-center gap-2">
              {match.firstName}, {match.age}
              {match.verified && (
                <CheckCircle size={18} className="text-[#8C7A6B]" fill="#F7F5EF" />
              )}
            </h2>
            <p className="text-[#6B6358] text-sm mt-1">{match.profession}</p>
            <p className="text-[#A3998D] text-sm mt-0.5">{match.city}</p>
          </div>
        </div>

        {/* 4. Locked Experience Buttons */}
        <div className="space-y-3 mt-6">
          <button 
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className="w-full flex items-center justify-center gap-2 bg-[#2A2621] text-white py-3.5 rounded-xl font-medium shadow-md hover:bg-[#1A1815] transition-colors"
          >
            <Lock size={16} className="text-[#D4C4B7]" />
            View Full Profile
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#2A2621] border border-[#E6E0D4] py-3.5 rounded-xl font-medium hover:bg-[#F7F5EF] transition-colors"
          >
            <Lock size={16} className="text-[#A3998D]" />
            Send Interest
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------
// Premium Modal Component
// ------------------------------------------------
function PremiumModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#2A2621]/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-lg bg-[#F7F5EF] rounded-[2rem] shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#A3998D] hover:text-[#2A2621] transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="px-10 pt-12 pb-8 text-center border-b border-[#E6E0D4]/60 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#D4C4B7]/40 to-transparent rounded-full blur-2xl" />
          
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#D4C4B7] to-[#E5D9CC] rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10">
            <Crown size={28} className="text-[#2A2621]" />
          </div>
          
          <h2 className="font-serif text-3xl text-[#2A2621] mb-4 relative z-10">Your Journey Begins Here</h2>
          <p className="text-[#6B6358] text-sm leading-relaxed relative z-10">
            Unlock complete verified profiles, send unlimited interests, start meaningful conversations, and discover your perfect life partner.
          </p>
        </div>

        <div className="p-10 bg-white">
          <div className="flex justify-between items-center mb-8 bg-[#F7F5EF] p-5 rounded-2xl border border-[#E6E0D4]">
            <div>
              <p className="text-[#2A2621] font-medium text-lg">Lifetime Premium</p>
              <p className="text-[#8C7A6B] text-sm mt-0.5">One-time investment</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-2xl text-[#2A2621]">₹5,000</p>
            </div>
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
                <CheckCircle size={20} className="text-[#8C7A6B] shrink-0 mt-0.5" />
                <span className="text-[#2A2621]">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <button className="w-full bg-[#2A2621] text-white py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:bg-[#1A1815] transition-all transform hover:-translate-y-0.5">
              Become a Lifetime Member
            </button>
            <button 
              onClick={onClose}
              className="w-full text-[#8C7A6B] hover:text-[#2A2621] py-3 text-sm font-medium transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
