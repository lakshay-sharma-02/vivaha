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
  ChevronLeft,
  Heart,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- Decorative Background Elements (Shared aesthetic with Matches) ---

const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
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
  </div>
);

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => {
      const type = i % 5 === 0 ? 'petal' : (i % 3 === 0 ? 'bokeh' : 'dust');
      return {
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -20}%`,
        delay: Math.random() * 20,
        duration: 30 + Math.random() * 40,
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

const AbstractArch = () => (
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1000px] pointer-events-none z-0 opacity-10 flex justify-center fixed">
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-t-[500px] border-b-0 relative">
      <div className="absolute inset-3 border border-[#8C7A6B]/50 rounded-t-[480px] border-b-0" />
    </div>
  </div>
);

// --- Page Component ---

export default function ProfilePreviewPage() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Mock Profile Data representing what is visible before premium
  const profile = {
    firstName: "Aanya",
    age: 27,
    city: "Mumbai, India",
    profession: "Architect",
    compatibility: 94,
    verified: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] font-sans selection:bg-[#E5D9CC]/50 relative overflow-x-hidden">
      
      {/* Background Texture & Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      </div>
      <SunlightRays />
      <AbstractArch />
      <FloatingParticles />

      {/* Floral Installations */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-10 opacity-90 mix-blend-multiply">
        <Image src="/images/floral_top_left.jpg" alt="" fill className="object-contain object-top-left drop-shadow-xl" priority />
      </div>
      <div className="fixed top-0 right-0 w-[650px] h-[650px] pointer-events-none z-10 opacity-90 mix-blend-multiply transform translate-x-12 -translate-y-4">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-contain object-top-right drop-shadow-xl" priority />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F7F5EF]/60 backdrop-blur-3xl px-10 py-6 flex justify-between items-center transition-all border-b border-[#E6D5C3]/40">
        <div className="flex items-center gap-6">
          <Link href="/matches" className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6D5C3] bg-white text-[#8C7A6B] hover:text-[#2A2621] hover:shadow-md transition-all duration-300 group">
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#8C7A6B] flex items-center justify-center relative">
              <span className="font-serif text-[#8C7A6B] text-lg leading-none pt-1">V</span>
            </div>
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#8C7A6B] hidden sm:block">Vivaha</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <button onClick={() => setShowPremiumModal(true)} className="group flex items-center gap-2 bg-[#FDF5E6]/80 border border-[#E6D5C3] text-[#8C7A6B] px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#2A2621] hover:border-[#D4C4B7] hover:shadow-lg transition-all duration-300">
            <Crown size={14} className="transition-colors" />
            <span className="hidden sm:inline transition-colors">Premium</span>
          </button>
        </div>
      </header>

      <main className="relative z-20 pb-40 pt-16 max-w-[1200px] mx-auto px-6">
        
        {/* HERO SECTION: Large Portrait */}
        <section className="relative w-full max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-[600px] rounded-[2.5rem] overflow-hidden bg-[#F0EBE1] shadow-[0_30px_60px_-20px_rgba(140,122,107,0.3)] border border-[#E6D5C3] flex items-end"
          >
            {/* Image with Blur Overlay for anticipation */}
            <div className="absolute inset-0">
              <Image src={profile.image} alt={profile.firstName} fill className="object-cover object-top blur-[12px] scale-105" priority />
              <div className="absolute inset-0 bg-[#2A2621]/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2621]/90 via-[#2A2621]/40 to-transparent" />
            </div>

            {/* Subtle Floral Frame SVG overlay */}
            <div className="absolute inset-4 border border-[#FDF5E6]/30 rounded-[2rem] pointer-events-none flex justify-center items-center">
                <div className="w-full h-full border border-[#FDF5E6]/10 rounded-[1.8rem] m-2"></div>
            </div>

            {/* Visible Info Overlay */}
            <div className="relative z-20 w-full p-12 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-[#FBF9F6]/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#FDF5E6]/30 flex items-center gap-2">
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FDF5E6" strokeWidth="3" strokeDasharray={`${profile.compatibility}, 100`} />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-[#FDF5E6] tracking-[0.2em] uppercase">{profile.compatibility}% Match</span>
                </div>
              </div>

              <h1 className="font-serif text-[4rem] text-white tracking-wide font-light flex items-center justify-center gap-4 mb-2 drop-shadow-lg">
                {profile.firstName}, {profile.age}
                {profile.verified && <CheckCircle size={28} className="text-[#FDF5E6] opacity-90" fill="none" strokeWidth={1.5} />}
              </h1>
              
              <div className="flex items-center gap-4 text-[#FDF5E6] text-sm font-light tracking-[0.2em] uppercase opacity-90 drop-shadow-md">
                <span>{profile.profession}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                <span>{profile.city}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Locked Details & Timeline */}
          <div className="lg:col-span-7 space-y-8">
            
            <LockedSection title="About" onUnlock={() => setShowPremiumModal(true)} height="h-32" />
            
            <div className="bg-[#FBF9F6] rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden group cursor-pointer" onClick={() => setShowPremiumModal(true)}>
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              <h3 className="font-serif text-2xl text-[#2A2621] mb-10 tracking-wide relative z-10">Life Journey</h3>
              
              <div className="space-y-8 relative z-10 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E6D5C3] before:via-[#E6D5C3]/50 before:to-transparent">
                {["Education", "Career Progression", "Family Background", "Lifestyle Values", "Marriage Expectations"].map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#E6D5C3] bg-white text-[#8C7A6B] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Lock size={10} strokeWidth={2} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#E6D5C3]/40 bg-white/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-[#2A2621] text-lg blur-[2px] opacity-70 group-hover:blur-[1px] transition-all">{item}</span>
                      </div>
                      <div className="h-2 w-2/3 bg-[#E6D5C3]/30 rounded mt-3 blur-[2px]"></div>
                      <div className="h-2 w-1/2 bg-[#E6D5C3]/30 rounded mt-2 blur-[2px]"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#FBF9F6]/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                <span className="bg-[#2A2621] text-white px-6 py-3 rounded-full text-xs font-serif tracking-widest uppercase shadow-xl flex items-center gap-2">
                  <Lock size={12} /> Unlock Timeline
                </span>
              </div>
            </div>

            <LockedSection title="Interests & Hobbies" onUnlock={() => setShowPremiumModal(true)} height="h-24" />

          </div>

          {/* RIGHT COLUMN: Premium Card & Compatibility */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* The Premium Membership Card (Centerpiece) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-[#FFFFFF] to-[#FBF9F6] rounded-[2rem] p-10 border border-[#E6D5C3] shadow-[0_20px_50px_-15px_rgba(230,213,195,0.8)] relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform translate-x-4 -translate-y-4 pointer-events-none">
                 <Image src="/images/floral_top_right.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 transform -translate-x-4 translate-y-4 pointer-events-none rotate-180">
                 <Image src="/images/floral_top_right.jpg" alt="" fill className="object-cover" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-[#D4C4B7] bg-[#FDF5E6] flex items-center justify-center mb-6 shadow-inner">
                  <Crown size={20} className="text-[#8C7A6B]" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-serif text-[2rem] text-[#2A2621] leading-tight mb-4 tracking-wide">Continue Your<br/><span className="italic font-light text-[#8C7A6B]">Journey</span></h3>
                
                <p className="text-[#8C7A6B] text-[13px] font-light leading-relaxed mb-8 px-2">
                  Unlock complete profiles, discover genuine compatibility, start meaningful conversations, and build lifelong relationships.
                </p>

                <div className="w-full bg-[#FDF5E6]/50 rounded-xl p-5 border border-[#E6D5C3]/50 mb-8">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif text-lg text-[#2A2621]">Lifetime Membership</span>
                    <span className="font-serif text-xl text-[#2A2621]">₹5,000</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[#8C7A6B] text-[9px] uppercase tracking-widest font-semibold">One-time Investment</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-10 w-full text-left px-2">
                  {[
                    "View complete profiles",
                    "Unlimited profile access",
                    "Unlimited interests & chats",
                    "Full image gallery",
                    "Compatibility insights",
                    "Priority recommendations"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-[#8C7A6B]" strokeWidth={2} />
                      <span className="text-[#2A2621] font-light text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => setShowPremiumModal(true)} className="w-full bg-[#2A2621] text-white py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(42,38,33,0.5)] hover:bg-[#1A1815] hover:shadow-[0_15px_25px_-10px_rgba(42,38,33,0.6)] transition-all duration-500 font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
                  Become a Member
                </button>
              </div>
            </motion.div>

            {/* Compatibility Section */}
            <div className="bg-[#FBF9F6] rounded-[2rem] p-8 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden group cursor-pointer" onClick={() => setShowPremiumModal(true)}>
              <h3 className="font-serif text-xl text-[#2A2621] mb-6 tracking-wide">Compatibility Insights</h3>
              
              {/* Visible Overall Compatibility */}
              <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-[#E6D5C3]/40">
                <div className="w-12 h-12 flex items-center justify-center relative shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E6D5C3" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8C7A6B" strokeWidth="3" strokeDasharray={`${profile.compatibility}, 100`} />
                  </svg>
                  <span className="absolute font-serif text-[#2A2621] text-sm">{profile.compatibility}%</span>
                </div>
                <div>
                  <h4 className="font-serif text-[#2A2621] text-lg">Overall Match</h4>
                  <p className="text-[#8C7A6B] text-[11px] uppercase tracking-widest mt-0.5">Highly Compatible</p>
                </div>
              </div>

              {/* Locked Details */}
              <div className="space-y-4">
                {["Communication Style", "Family Compatibility", "Lifestyle Match", "Career Match", "Love Language"].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-[#2A2621] font-light text-sm blur-[2px] opacity-70 group-hover:blur-[1px] transition-all">{item}</span>
                    <Lock size={12} className="text-[#8C7A6B]" />
                  </div>
                ))}
              </div>
              
              <div className="absolute inset-0 bg-[#FBF9F6]/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                <span className="bg-[#2A2621] text-white px-6 py-3 rounded-full text-xs font-serif tracking-widest uppercase shadow-xl flex items-center gap-2">
                  <Lock size={12} /> View Insights
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* FULL WIDTH GALLERY */}
        <section className="mt-20">
          <h3 className="font-serif text-3xl text-[#2A2621] mb-8 text-center tracking-wide">Photo Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} onClick={() => setShowPremiumModal(true)} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E6D5C3]/20 cursor-pointer group">
                <Image src={profile.image} alt="Gallery image locked" fill className="object-cover blur-xl scale-110 group-hover:blur-lg group-hover:scale-105 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-[#2A2621]/10 group-hover:bg-[#2A2621]/0 transition-colors duration-500" />
                
                {/* Lock Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 shadow-xl">
                    <Lock size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
// Reusable Locked Section Component
// ------------------------------------------------
function LockedSection({ title, onUnlock, height }: { title: string; onUnlock: () => void; height: string }) {
  return (
    <div 
      className="bg-[#FBF9F6] rounded-[2rem] p-8 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden group cursor-pointer"
      onClick={onUnlock}
    >
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <h3 className="font-serif text-2xl text-[#2A2621] mb-6 tracking-wide relative z-10">{title}</h3>
      
      <div className={`relative w-full ${height} overflow-hidden`}>
        {/* Fake blurred content */}
        <div className="space-y-3 opacity-60">
          <div className="h-3 w-full bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
          <div className="h-3 w-5/6 bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
          <div className="h-3 w-4/6 bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
          {height !== "h-24" && (
            <>
              <div className="h-3 w-full bg-[#E6D5C3]/40 rounded blur-[3px] mt-6"></div>
              <div className="h-3 w-3/4 bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
            </>
          )}
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#FBF9F6] via-[#FBF9F6]/80 to-transparent">
          <div className="flex items-center gap-2 text-[#8C7A6B] bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#E6D5C3] shadow-sm transform group-hover:scale-105 group-hover:text-[#2A2621] group-hover:border-[#D4C4B7] transition-all duration-300">
            <Lock size={14} strokeWidth={2} />
            <span className="text-xs font-serif tracking-widest uppercase">Premium Members Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------
// Premium Modal Component (Shared)
// ------------------------------------------------
function PremiumModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
