"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  CheckCircle,
  Lock,
  X,
  ChevronLeft,
  Heart,
  MessageCircle,
  Send,
  Flag,
  Ban,
  Camera
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FullProfile, toggleShortlist, sendInterest } from "@/app/actions/profile";

// --- Decorative Background Elements ---
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

const AbstractArch = () => (
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1000px] pointer-events-none z-0 opacity-10 flex justify-center fixed">
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-t-[500px] border-b-0 relative">
      <div className="absolute inset-3 border border-[#8C7A6B]/50 rounded-t-[480px] border-b-0" />
    </div>
  </div>
);

export default function ClientProfilePreview({ initialProfile }: { initialProfile: FullProfile }) {
  const router = useRouter();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [isSending, setIsSending] = useState(false);

  const isPremium = profile.viewer_is_premium;
  const isLocked = !isPremium;

  const handleShortlist = async () => {
    const newVal = !profile.is_shortlisted;
    setProfile({ ...profile, is_shortlisted: newVal });
    const res = await toggleShortlist(profile.id, !newVal);
    if (!res.success) {
      setProfile({ ...profile, is_shortlisted: !newVal }); // revert
    }
  };

  const handleSendInterest = async () => {
    if (isSending || profile.interaction_status !== "none") return;
    setIsSending(true);
    const res = await sendInterest(profile.id);
    if (res.success) {
      setProfile({ ...profile, interaction_status: "pending_sent" });
    }
    setIsSending(false);
  };

  const primaryAction = () => {
    if (profile.interaction_status === "none") {
      return (
        <button onClick={handleSendInterest} disabled={isSending} className="flex-1 bg-[#2A2621] text-white py-4 rounded-xl shadow-xl hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-70">
          <Send size={16} /> {isSending ? "Sending..." : "Send Interest"}
        </button>
      );
    }
    if (profile.interaction_status === "pending_sent") {
      return (
        <button disabled className="flex-1 bg-[#FDF5E6] border border-[#D4C4B7] text-[#8C7A6B] py-4 rounded-xl shadow-sm font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2 opacity-80">
          Interest Pending
        </button>
      );
    }
    if (profile.interaction_status === "pending_received") {
      return (
        <Link href="/dashboard/interests" className="flex-1 bg-[#2A2621] text-white py-4 rounded-xl shadow-xl hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
          Respond to Interest
        </Link>
      );
    }
    if (profile.interaction_status === "accepted") {
      return (
        <Link href={`/dashboard/messages?chat=${profile.id}`} className="flex-1 bg-[#2A2621] text-white py-4 rounded-xl shadow-xl hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
          <MessageCircle size={16} /> Send Message
        </Link>
      );
    }
    return (
      <button disabled className="flex-1 bg-[#FBF9F6] border border-[#E6D5C3] text-[#A3998D] py-4 rounded-xl font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
        <Ban size={16} /> Not Available
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] font-sans selection:bg-[#E5D9CC]/50 relative overflow-x-hidden">
      
      {/* Background Texture & Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      </div>
      <SunlightRays />
      <AbstractArch />

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
          <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6D5C3] bg-white text-[#8C7A6B] hover:text-[#2A2621] hover:shadow-md transition-all duration-300 group">
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#8C7A6B] flex items-center justify-center relative">
              <span className="font-serif text-[#8C7A6B] text-lg leading-none pt-1">V</span>
            </div>
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#8C7A6B] hidden sm:block">Vivaha</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          {!isPremium && (
            <button onClick={() => setShowPremiumModal(true)} className="group flex items-center gap-2 bg-[#FDF5E6]/80 border border-[#E6D5C3] text-[#8C7A6B] px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#2A2621] hover:border-[#D4C4B7] hover:shadow-lg transition-all duration-300">
              <Crown size={14} className="transition-colors" />
              <span className="hidden sm:inline transition-colors">Premium</span>
            </button>
          )}
        </div>
      </header>

      <main className="relative z-20 pb-40 pt-16 max-w-[1200px] mx-auto px-6">
        
        {/* HERO SECTION */}
        <section className="relative w-full max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-[700px] rounded-[2.5rem] overflow-hidden bg-[#F0EBE1] shadow-[0_30px_60px_-20px_rgba(140,122,107,0.3)] border border-[#E6D5C3] flex items-end"
          >
            <div className="absolute inset-0">
              <Image src={profile.images[0]} alt={profile.first_name} fill className={`object-cover object-top scale-105 ${isLocked ? 'blur-[8px]' : ''}`} priority />
              <div className="absolute inset-0 bg-[#2A2621]/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2621]/90 via-[#2A2621]/40 to-transparent" />
            </div>

            <div className="absolute inset-4 border border-[#FDF5E6]/30 rounded-[2rem] pointer-events-none flex justify-center items-center">
                <div className="w-full h-full border border-[#FDF5E6]/10 rounded-[1.8rem] m-2"></div>
            </div>

            <div className="relative z-20 w-full p-12 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-[#FBF9F6]/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#FDF5E6]/30 flex items-center gap-2">
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FDF5E6" strokeWidth="3" strokeDasharray={`${profile.compatibility_score}, 100`} />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-[#FDF5E6] tracking-[0.2em] uppercase">{profile.compatibility_score}% Match</span>
                </div>
              </div>

              <h1 className="font-serif text-[4rem] text-white tracking-wide font-light flex items-center justify-center gap-4 mb-2 drop-shadow-lg">
                {profile.first_name}, {profile.age}
                {profile.verification_status === 'verified' && <CheckCircle size={28} className="text-[#FDF5E6] opacity-90" fill="none" strokeWidth={1.5} />}
              </h1>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-[#FDF5E6] text-sm font-light tracking-[0.2em] uppercase opacity-90 drop-shadow-md">
                <span>{profile.profession}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                <span>{profile.city}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                <span>{profile.religion}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Interaction Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4 mt-8"
          >
            {primaryAction()}
            
            <button 
              onClick={handleShortlist} 
              className={`w-16 h-16 rounded-xl border flex items-center justify-center transition-colors shadow-sm ${profile.is_shortlisted ? 'bg-[#FDF5E6] border-[#D4C4B7] text-[#8C7A6B]' : 'bg-white border-[#E6D5C3] text-[#A3998D] hover:text-[#2A2621] hover:border-[#8C7A6B]'}`}
            >
              <Heart size={20} className={profile.is_shortlisted ? "fill-[#8C7A6B]" : ""} />
            </button>
            <div className="relative group">
              <button className="w-16 h-16 rounded-xl border border-[#E6D5C3] bg-white text-[#A3998D] hover:text-[#2A2621] hover:border-[#8C7A6B] flex items-center justify-center transition-colors shadow-sm">
                <Flag size={20} />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-white rounded-lg shadow-xl border border-[#E6D5C3] p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C7A6B]">Report</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Details */}
          <div className="lg:col-span-7 space-y-8">
            
            <LockedSection title="About Me" isLocked={isLocked} onUnlock={() => setShowPremiumModal(true)} height="auto">
              <p className="text-[#2A2621] font-light leading-relaxed whitespace-pre-wrap">
                {profile.bio || "No biography provided."}
              </p>
            </LockedSection>

            <LockedSection title="Education & Career" isLocked={isLocked} onUnlock={() => setShowPremiumModal(true)} height="auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Education</h4>
                  <p className="text-[#2A2621] text-lg font-serif">{profile.education || "Not specified"}</p>
                  {profile.university && <p className="text-[#8C7A6B] font-light mt-1">{profile.university}</p>}
                </div>
                <div>
                  <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Profession</h4>
                  <p className="text-[#2A2621] text-lg font-serif">{profile.profession}</p>
                  {profile.company && <p className="text-[#8C7A6B] font-light mt-1">{profile.company}</p>}
                </div>
              </div>
            </LockedSection>

            <LockedSection title="Background" isLocked={isLocked} onUnlock={() => setShowPremiumModal(true)} height="auto">
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Height</h4>
                  <p className="text-[#2A2621] font-serif">{profile.height_cm ? `${profile.height_cm} cm` : "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Religion</h4>
                  <p className="text-[#2A2621] font-serif">{profile.religion}</p>
                </div>
                <div>
                  <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Location</h4>
                  <p className="text-[#2A2621] font-serif">{profile.city}</p>
                </div>
              </div>
            </LockedSection>

          </div>

          {/* RIGHT COLUMN: Insights */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Compatibility Section */}
            <div className={`bg-[#FBF9F6] rounded-[2rem] p-8 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden ${isLocked ? 'cursor-pointer group' : ''}`} onClick={() => isLocked && setShowPremiumModal(true)}>
              <h3 className="font-serif text-xl text-[#2A2621] mb-6 tracking-wide">Compatibility Insights</h3>
              
              <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-[#E6D5C3]/40 shadow-inner">
                <div className="w-12 h-12 flex items-center justify-center relative shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E6D5C3" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8C7A6B" strokeWidth="3" strokeDasharray={`${profile.compatibility_score}, 100`} />
                  </svg>
                  <span className="absolute font-serif text-[#2A2621] text-sm">{profile.compatibility_score}%</span>
                </div>
                <div>
                  <h4 className="font-serif text-[#2A2621] text-lg">Overall Match</h4>
                  <p className="text-[#8C7A6B] text-[11px] uppercase tracking-widest mt-0.5">Highly Compatible</p>
                </div>
              </div>

              {/* Locked Details */}
              <div className="space-y-4">
                {[
                  { label: "Values & Beliefs", score: 92 },
                  { label: "Lifestyle Match", score: 85 },
                  { label: "Career Alignment", score: 88 },
                  { label: "Family Orientation", score: 95 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[#2A2621] font-light text-sm ${isLocked ? 'blur-[2px] opacity-70 group-hover:blur-[1px]' : ''} transition-all`}>{item.label}</span>
                      {isLocked ? <Lock size={12} className="text-[#8C7A6B]" /> : <span className="text-[#8C7A6B] font-serif">{item.score}%</span>}
                    </div>
                    {!isLocked && (
                      <div className="w-full bg-[#E6D5C3]/30 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#8C7A6B] h-full" style={{ width: `${item.score}%` }}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {isLocked && (
                <div className="absolute inset-0 bg-[#FBF9F6]/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                  <span className="bg-[#2A2621] text-white px-6 py-3 rounded-full text-xs font-serif tracking-widest uppercase shadow-xl flex items-center gap-2">
                    <Lock size={12} /> View Insights
                  </span>
                </div>
              )}
            </div>

            {/* Premium Teaser (if locked) */}
            {isLocked && (
              <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FBF9F6] rounded-[2rem] p-8 border border-[#E6D5C3] shadow-[0_20px_50px_-15px_rgba(230,213,195,0.8)] relative overflow-hidden text-center">
                <Crown size={24} className="text-[#8C7A6B] mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-[#2A2621] mb-2 tracking-wide">Continue Your<br/><span className="italic font-light text-[#8C7A6B]">Journey</span></h3>
                <p className="text-[#8C7A6B] text-[12px] font-light leading-relaxed mb-6">
                  Unlock complete profiles, genuine compatibility, and start meaningful conversations.
                </p>
                <button onClick={() => setShowPremiumModal(true)} className="w-full bg-[#2A2621] text-white py-3.5 rounded-xl shadow-lg hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs">
                  Become a Member
                </button>
              </div>
            )}

          </div>
        </div>

        {/* FULL WIDTH GALLERY */}
        <section className="mt-20 border-t border-[#E6D5C3]/40 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide">Portfolio</h3>
            <div className="flex items-center gap-2 text-[#8C7A6B]">
              <Camera size={16} /> <span className="text-xs uppercase tracking-widest font-semibold">{profile.images.length} Captures</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {profile.images.map((img, idx) => (
              <div key={idx} onClick={() => isLocked && setShowPremiumModal(true)} className={`relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E6D5C3]/20 ${isLocked ? 'cursor-pointer group' : ''}`}>
                <Image src={img} alt="Gallery" fill className={`object-cover transition-all duration-700 ease-out ${isLocked && idx > 0 ? 'blur-xl scale-110 group-hover:blur-lg group-hover:scale-105' : 'hover:scale-105'}`} />
                
                {isLocked && idx > 0 && (
                  <>
                    <div className="absolute inset-0 bg-[#2A2621]/10 group-hover:bg-[#2A2621]/0 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 shadow-xl">
                        <Lock size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </>
                )}
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
function LockedSection({ title, isLocked, onUnlock, height, children }: { title: string; isLocked: boolean; onUnlock: () => void; height: string; children: React.ReactNode }) {
  if (!isLocked) {
    return (
      <div className="bg-[#FBF9F6] rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
        <h3 className="font-serif text-2xl text-[#2A2621] mb-8 tracking-wide relative z-10">{title}</h3>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F6] rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden group cursor-pointer" onClick={onUnlock}>
      <h3 className="font-serif text-2xl text-[#2A2621] mb-6 tracking-wide relative z-10">{title}</h3>
      <div className={`relative w-full ${height === 'auto' ? 'h-32' : height} overflow-hidden`}>
        <div className="space-y-3 opacity-60">
          <div className="h-3 w-full bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
          <div className="h-3 w-5/6 bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
          <div className="h-3 w-4/6 bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
          <div className="h-3 w-full bg-[#E6D5C3]/40 rounded blur-[3px] mt-6"></div>
          <div className="h-3 w-3/4 bg-[#E6D5C3]/40 rounded blur-[3px]"></div>
        </div>
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

function PremiumModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div className="absolute inset-0 bg-[#F7F5EF]/90 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg bg-[#FBF9F6] rounded-[1.5rem] shadow-2xl border border-[#E6D5C3] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-[#A3998D] hover:text-[#2A2621] z-30"><X size={20} strokeWidth={1.5} /></button>
        <div className="pt-14 pb-10 px-10 text-center border-b border-[#F4E9D8] bg-white">
          <div className="w-14 h-14 mx-auto border border-[#E6D5C3] bg-[#FBF9F6] rounded-full flex items-center justify-center shadow-sm mb-6"><Crown size={20} className="text-[#8C7A6B]" /></div>
          <h2 className="font-serif text-3xl text-[#2A2621] mb-3 tracking-wide">Your Journey Begins Here</h2>
          <p className="text-[#8C7A6B] text-sm leading-relaxed font-light max-w-xs mx-auto">Unlock verified profiles, send unlimited interests, and discover your perfect life partner.</p>
        </div>
        <div className="p-10 bg-[#FBF9F6]">
          <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl border border-[#E6D5C3]/50 shadow-sm">
            <div><p className="text-[#2A2621] font-serif text-lg tracking-wide">Lifetime Premium</p><p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest mt-1">One-time investment</p></div>
            <p className="font-serif text-2xl text-[#2A2621]">₹5,000</p>
          </div>
          <Link href="/premium" className="w-full block text-center bg-[#2A2621] text-white py-4 rounded-xl shadow-md hover:bg-[#1A1815] transition-all duration-300 font-serif tracking-widest uppercase text-xs mb-3">Become a Lifetime Member</Link>
          <button onClick={onClose} className="w-full text-[#8C7A6B] hover:text-[#2A2621] py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">Maybe Later</button>
        </div>
      </motion.div>
    </div>
  );
}
