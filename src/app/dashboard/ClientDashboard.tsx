"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ChevronRight, 
  Heart, 
  MessageCircle, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Eye,
  Bookmark,
  TrendingUp,
  Sparkles,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

// --- Shared Decorative Elements ---

const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
    <motion.div 
      className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-gradient-radial from-[#FDF5E6]/30 via-[#FDF5E6]/5 to-transparent blur-[80px]"
      animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => {
      const type = i % 4 === 0 ? 'petal' : 'dust';
      return {
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -20}%`,
        delay: Math.random() * 20,
        duration: 30 + Math.random() * 40,
        size: type === 'petal' ? 6 + Math.random() * 8 : 2 + Math.random() * 3,
        xOffset: Math.random() * 100 - 50
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 fixed">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.type === 'petal' ? 'opacity-30 mix-blend-multiply' : 'rounded-full bg-[#E6D5C3] opacity-20 blur-[1px]'}`}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, p.xOffset, p.xOffset * 1.5],
            rotate: p.type === 'petal' ? [0, 180, 360] : 0,
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          {p.type === 'petal' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8 2 2 6 2 12C2 18 8 22 12 22C16 22 22 18 22 12C22 6 16 2 12 2Z" fill="#FDF5E6" stroke="#E6D5C3" strokeWidth="0.5" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const AbstractArch = () => (
  <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0 opacity-[0.07] flex justify-end transform translate-x-1/4 -translate-y-1/4 fixed">
    <div className="w-full h-full border-[2px] border-[#8C7A6B] rounded-full relative">
      <div className="absolute inset-4 border border-[#8C7A6B]/50 rounded-full" />
    </div>
  </div>
);

// --- Component ---

interface DashboardData {
  profile: {
    firstName: string;
    verificationStatus: string;
  };
  completionScore: number;
  stats: {
    received: number;
    sent: number;
    accepted: number;
    pending: number;
    views: number;
  };
  recentActivity: any[];
  recommendations: any[];
}

export default function ClientDashboard({ initialData }: { initialData: DashboardData }) {
  const { profile, completionScore, stats, recentActivity, recommendations } = initialData;
  const isVerified = profile.verificationStatus === 'verified';
  const progressPathLength = (completionScore || 0) / 100;

  return (
    <div className="min-h-screen relative px-4 md:px-10 py-8 md:py-12 pb-32">
      {/* Background Elements */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <SunlightRays />
      <AbstractArch />
      <FloatingParticles />

      {/* Hero Floral (Subtle, Top Right only) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none z-0 opacity-40 mix-blend-multiply transform translate-x-10 -translate-y-10">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-contain object-top-right" priority />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto space-y-10">
        
        {/* TOP GREETING */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-serif text-4xl text-[#2A2621] tracking-wide mb-1">
            Good Evening, <span className="italic font-light">{profile.firstName}</span>
          </h1>
          <p className="text-[#8C7A6B] text-sm tracking-[0.1em] font-light">Your journey continues here.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN COLUMN (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* LARGE HERO CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-[#FBF9F6] to-[#F7F5EF] rounded-[2rem] p-6 md:p-10 border border-[#E6D5C3]/80 shadow-[0_20px_50px_-15px_rgba(230,213,195,0.6)] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8"
            >
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              
              <div className="relative z-10 w-full md:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                  {isVerified ? (
                    <>
                      <ShieldCheck size={18} className="text-[#8C7A6B]" strokeWidth={1.5} />
                      <span className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold">Identity Verified</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={18} className="text-[#A3998D]" strokeWidth={1.5} />
                      <span className="text-[#A3998D] text-[10px] uppercase tracking-widest font-semibold">Verification Pending</span>
                    </>
                  )}
                </div>
                <h2 className="font-serif text-3xl text-[#2A2621] leading-tight mb-4 tracking-wide">
                  {completionScore >= 100 ? "Your profile is beautifully crafted." : "Your story is unfolding."}
                </h2>
                <p className="text-[#8C7A6B] text-sm font-light leading-relaxed mb-8">
                  {recommendations.length > 0 
                    ? `We've curated new introductions that align with your lifestyle and values. Ready to discover?`
                    : `Enhance your profile to unlock more curated introductions.`
                  }
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/matches" className="bg-[#2A2621] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#1A1815] transition-all duration-300 font-serif tracking-widest uppercase text-[11px] flex items-center gap-2">
                    <Search size={14} /> Continue Browsing
                  </Link>
                  <Link href="/dashboard/interests" className="bg-white text-[#2A2621] border border-[#E6D5C3] px-6 py-3 rounded-xl shadow-sm hover:border-[#D4C4B7] transition-all duration-300 font-serif tracking-widest uppercase text-[11px] flex items-center gap-2">
                    <Heart size={14} /> View Interests
                  </Link>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="relative z-10 w-32 h-32 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-sm">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E6D5C3" strokeWidth="1.5" />
                  <motion.path 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" stroke="#8C7A6B" strokeWidth="2.5" strokeDasharray={`${progressPathLength * 100}, 100`} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: progressPathLength }} transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-serif text-[#2A2621] text-2xl">{completionScore}%</span>
                  <span className="text-[#8C7A6B] text-[8px] uppercase tracking-widest">Complete</span>
                </div>
              </div>
            </motion.div>

            {/* RECOMMENDED MATCHES */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="flex justify-between items-end mb-6">
                <h3 className="font-serif text-2xl text-[#2A2621] tracking-wide">Curated For You</h3>
                <Link href="/matches" className="text-[#8C7A6B] text-[10px] uppercase tracking-[0.2em] hover:text-[#2A2621] transition-colors flex items-center gap-1">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-4">
                {recommendations.length > 0 ? recommendations.map((match) => (
                  <Link href={`/matches/${match.id}`} key={match.id} className="bg-white rounded-2xl p-4 flex items-center justify-between border border-[#E6D5C3]/50 hover:shadow-[0_10px_30px_-10px_rgba(230,213,195,0.6)] hover:border-[#D4C4B7] transition-all duration-500 group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F0EBE1]">
                        <Image src={match.image} alt={match.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-white/50">
                          <Sparkles size={8} className="text-[#8C7A6B]" />
                          <span className="text-[8px] font-bold text-[#2A2621]">{match.compatibility}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-serif text-xl text-[#2A2621] tracking-wide flex items-center gap-2">
                          {match.name}, {match.age}
                        </h4>
                        <p className="text-[#8C7A6B] text-xs font-light mt-1 flex items-center gap-2">
                          {match.profession} <span className="w-1 h-1 rounded-full bg-[#E6D5C3]"></span> {match.city}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-[#FDF5E6] border border-[#E6D5C3] flex items-center justify-center text-[#8C7A6B] group-hover:text-[#2A2621] group-hover:bg-white transition-all">
                        <ArrowRight size={16} strokeWidth={1.5} />
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="bg-white rounded-2xl p-8 border border-[#E6D5C3]/50 text-center">
                    <p className="text-[#8C7A6B] font-light">We are discovering new matches for you. Please check back later.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* QUICK INSIGHTS */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Eye, label: "Profile Views", val: stats.views.toString(), trend: "Recently" },
                  { icon: Search, label: "Search Appearances", val: (stats.views * 3 + 12).toString(), trend: "Estimated" }, // Mock calculation for now
                  { icon: TrendingUp, label: "Compatibility Avg", val: "88%", trend: "Top 10%" },
                  { icon: Bookmark, label: "Saved Profiles", val: "2", trend: "" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-[#FBF9F6] border border-[#E6D5C3]/60 rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
                      <Icon size={16} className="text-[#8C7A6B] mb-4" strokeWidth={1.5} />
                      <p className="font-serif text-2xl text-[#2A2621] mb-1">{stat.val}</p>
                      <p className="text-[#2A2621] text-[10px] uppercase tracking-wider font-semibold mb-1">{stat.label}</p>
                      <p className="text-[#8C7A6B] text-[9px] uppercase tracking-widest">{stat.trend}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* SIDE COLUMN (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* INTERESTS SUMMARY */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.01] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              <h3 className="font-serif text-xl text-[#2A2621] tracking-wide mb-6">Interests</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FDF5E6]/50 p-4 rounded-xl border border-[#E6D5C3]/40">
                  <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Received</p>
                  <p className="font-serif text-2xl text-[#2A2621]">{stats.received}</p>
                </div>
                <div className="bg-[#FDF5E6]/50 p-4 rounded-xl border border-[#E6D5C3]/40">
                  <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Sent</p>
                  <p className="font-serif text-2xl text-[#2A2621]">{stats.sent}</p>
                </div>
                <div className="bg-[#FDF5E6]/50 p-4 rounded-xl border border-[#E6D5C3]/40">
                  <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Accepted</p>
                  <p className="font-serif text-2xl text-[#2A2621]">{stats.accepted}</p>
                </div>
                <div className="bg-[#FDF5E6]/50 p-4 rounded-xl border border-[#E6D5C3]/40">
                  <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-1">Pending</p>
                  <p className="font-serif text-2xl text-[#2A2621]">{stats.pending}</p>
                </div>
              </div>
            </motion.div>

            {/* RECENT ACTIVITY */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[#FBF9F6] rounded-[2rem] p-6 md:p-8 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden"
            >
              <h3 className="font-serif text-xl text-[#2A2621] tracking-wide mb-6">Journey Timeline</h3>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-[#E6D5C3] before:via-[#E6D5C3]/50 before:to-transparent">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="relative flex gap-4 items-start">
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-[#E6D5C3] shrink-0 mt-1 relative z-10"></div>
                      <div>
                        <p className="text-[#2A2621] text-sm font-light leading-snug">{activity.title}</p>
                        <p className="text-[#8C7A6B] text-[9px] uppercase tracking-widest mt-1 flex items-center gap-1">
                          <Clock size={10} /> {activity.created_at ? formatDistanceToNow(new Date(activity.created_at), { addSuffix: true }) : "recently"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#8C7A6B] font-light text-sm italic">Your journey begins now. Activity will appear here soon.</p>
              )}
            </motion.div>

            {/* MESSAGES PREVIEW */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-end mb-6">
                <h3 className="font-serif text-xl text-[#2A2621] tracking-wide">Recent Letters</h3>
                <Link href="/dashboard/messages" className="text-[#8C7A6B] text-[10px] uppercase tracking-[0.2em] hover:text-[#2A2621] transition-colors">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {/* Fallback mock for messages as they aren't part of the direct dashboard action yet, or empty state */}
                <p className="text-[#8C7A6B] font-light text-sm italic">No recent letters. Express interest to start a conversation.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
