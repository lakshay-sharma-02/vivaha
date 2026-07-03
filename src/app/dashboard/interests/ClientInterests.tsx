"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  Search, 
  ShieldCheck, 
  Clock, 
  MessageCircle, 
  Eye, 
  Ban, 
  HeartCrack,
  Sparkles,
  Inbox,
  Send,
  UserCheck,
  XCircle,
  Undo2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InterestProfile, updateInterestStatus } from "@/app/actions/interests";
import { formatDistanceToNow } from "date-fns";

// --- Shared Elements ---
const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
    <motion.div 
      className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-[#FDF5E6]/40 via-[#FDF5E6]/5 to-transparent blur-[80px]"
      animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const AbstractArch = () => (
  <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0 opacity-[0.05] flex justify-end transform translate-x-1/4 -translate-y-1/4 fixed">
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-full relative">
      <div className="absolute inset-4 border border-[#8C7A6B]/50 rounded-full" />
    </div>
  </div>
);

// --- Simple Toast System ---
type Toast = { id: number; message: string; type: 'success' | 'error' };

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`px-6 py-4 rounded-xl shadow-lg border backdrop-blur-md flex items-center gap-3 ${
              t.type === 'success' 
              ? 'bg-[#FBF9F6]/90 border-[#E6D5C3] text-[#2A2621]' 
              : 'bg-white/90 border-red-200 text-red-800'
            }`}
          >
            {t.type === 'success' ? <Check size={18} className="text-[#8C7A6B]" /> : <X size={18} />}
            <p className="font-serif text-sm tracking-wide">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Main Component ---
export default function ClientInterests({
  initialReceived,
  initialSent,
  initialAccepted,
  initialDeclined
}: {
  initialReceived: InterestProfile[];
  initialSent: InterestProfile[];
  initialAccepted: InterestProfile[];
  initialDeclined: InterestProfile[];
}) {
  const [activeTab, setActiveTab] = useState<"received" | "sent" | "accepted" | "declined">("received");
  
  // State for optimistic UI
  const [lists, setLists] = useState({
    received: initialReceived,
    sent: initialSent,
    accepted: initialAccepted,
    declined: initialDeclined
  });

  // State for Filters and Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"newest" | "oldest" | "compatibility" | "verified">("newest");
  
  // Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // --- Actions ---
  const handleAction = async (item: InterestProfile, action: "accepted" | "rejected" | "withdrawn") => {
    // 1. Optimistic Update
    const previousLists = { ...lists };
    setLists(prev => {
      const newLists = { ...prev };
      
      // Remove from current list
      if (activeTab === "received") {
        newLists.received = newLists.received.filter(i => i.id !== item.id);
      } else if (activeTab === "sent") {
        newLists.sent = newLists.sent.filter(i => i.id !== item.id);
      }

      // Add to new list based on action
      const newItem = { ...item, status: action, updated_at: new Date().toISOString() };
      if (action === "accepted") {
        newLists.accepted = [newItem, ...newLists.accepted];
      } else if (action === "rejected") {
        newLists.declined = [newItem, ...newLists.declined];
      }
      // If withdrawn, it just disappears

      return newLists;
    });

    // 2. Call Backend
    const res = await updateInterestStatus(item.id, action);
    
    if (res.success) {
      if (action === "accepted") addToast("Introduction accepted. You can now message them.");
      if (action === "rejected") addToast("Introduction respectfully declined.");
      if (action === "withdrawn") addToast("Interest successfully withdrawn.");
    } else {
      // 3. Revert if fail
      setLists(previousLists);
      addToast(res.error || "Action failed. Please try again.", "error");
    }
  };

  // --- Derived Data ---
  const filteredList = useMemo(() => {
    let currentList = lists[activeTab];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      currentList = currentList.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.profession.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q)
      );
    }

    // Filter
    let sortedList = [...currentList];
    if (filterType === "newest") {
      sortedList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (filterType === "oldest") {
      sortedList.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (filterType === "compatibility") {
      sortedList.sort((a, b) => b.compatibility - a.compatibility);
    } else if (filterType === "verified") {
      sortedList = sortedList.filter(item => item.verified);
    }

    return sortedList;
  }, [lists, activeTab, searchQuery, filterType]);


  return (
    <div className="min-h-full relative px-10 py-12 pb-32 flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <SunlightRays />
      <AbstractArch />

      {/* Hero Floral (Top Right only) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none z-0 opacity-40 mix-blend-multiply transform translate-x-10 -translate-y-10">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-contain object-top-right" priority />
      </div>

      <ToastContainer toasts={toasts} />

      <div className="relative z-20 max-w-5xl mx-auto w-full flex-1 flex flex-col">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12">
          <h1 className="font-serif text-4xl text-[#2A2621] tracking-wide mb-2">My Interests</h1>
          <p className="text-[#8C7A6B] text-sm tracking-wide font-light">Manage every meaningful connection from one place.</p>
        </motion.div>

        {/* TABS & CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          
          {/* Tabs */}
          <div className="flex bg-[#FBF9F6] border border-[#E6D5C3]/60 p-1.5 rounded-2xl shadow-inner w-full md:w-auto">
            {[
              { id: "received", label: "Received", count: lists.received.length },
              { id: "sent", label: "Sent", count: lists.sent.length },
              { id: "accepted", label: "Accepted", count: lists.accepted.length },
              { id: "declined", label: "Declined", count: lists.declined.length },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isActive ? "text-[#2A2621]" : "text-[#A3998D] hover:text-[#8C7A6B]"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-white border border-[#E6D5C3] shadow-sm rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${isActive ? "bg-[#FDF5E6] text-[#8C7A6B]" : "bg-transparent text-[#A3998D]"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3998D]" strokeWidth={1.5} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, city..." 
                className="w-full bg-[#FBF9F6] border border-[#E6D5C3]/60 rounded-xl py-3 pl-10 pr-4 text-sm font-light text-[#2A2621] placeholder-[#A3998D] focus:outline-none focus:border-[#8C7A6B] focus:bg-white transition-all shadow-inner"
              />
            </div>
            
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-[#FBF9F6] border border-[#E6D5C3]/60 rounded-xl py-3 px-4 text-xs tracking-wide text-[#2A2621] focus:outline-none focus:border-[#8C7A6B] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="compatibility">Highest Compatibility</option>
              <option value="verified">Verified Only</option>
            </select>
          </div>
        </div>

        {/* LIST */}
        <div className="flex-1 relative">
          <AnimatePresence mode="popLayout">
            {filteredList.length === 0 ? (
              /* EMPTY STATE */
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 bg-[#FBF9F6]/40 border border-[#E6D5C3]/30 rounded-[2rem] border-dashed"
              >
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#FDF5E6] to-[#FBF9F6] border border-[#E6D5C3]/50 flex items-center justify-center shadow-inner">
                  {activeTab === 'received' && <Inbox size={32} className="text-[#8C7A6B]" strokeWidth={1} />}
                  {activeTab === 'sent' && <Send size={32} className="text-[#8C7A6B]" strokeWidth={1} />}
                  {activeTab === 'accepted' && <UserCheck size={32} className="text-[#8C7A6B]" strokeWidth={1} />}
                  {activeTab === 'declined' && <HeartCrack size={32} className="text-[#8C7A6B]" strokeWidth={1} />}
                </div>
                <h3 className="font-serif text-2xl text-[#2A2621] mb-2">No {activeTab} interests yet.</h3>
                <p className="text-[#8C7A6B] font-light max-w-sm">
                  {activeTab === 'received' && "When someone expresses interest in your profile, it will elegantly appear here."}
                  {activeTab === 'sent' && "Profiles you express interest in will be listed here while awaiting their response."}
                  {activeTab === 'accepted' && "Meaningful connections begin with mutual interest. Your accepted matches will appear here."}
                  {activeTab === 'declined' && "History of gracefully declined introductions will be kept here privately."}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-4 pb-10">
                <AnimatePresence>
                  {filteredList.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between border border-[#E6D5C3]/60 hover:shadow-[0_15px_40px_-15px_rgba(230,213,195,0.7)] hover:border-[#D4C4B7] transition-all duration-500 group"
                    >
                      {/* Left: Profile Info */}
                      <div className="flex items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
                        <Link href={`/matches/${item.profile_id}`} className="relative shrink-0 block">
                          <div className="w-24 h-24 rounded-full overflow-hidden border border-[#E6D5C3]/60 bg-[#F0EBE1] group-hover:shadow-md transition-all">
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1 border border-[#E6D5C3] shadow-sm">
                            <Sparkles size={10} className="text-[#8C7A6B]" />
                            <span className="text-[9px] font-bold text-[#2A2621]">{item.compatibility}%</span>
                          </div>
                        </Link>
                        
                        <div>
                          <h4 className="font-serif text-2xl text-[#2A2621] tracking-wide flex items-center gap-2 mb-1">
                            {item.name}, {item.age}
                            {item.verified && <ShieldCheck size={16} className="text-[#8C7A6B]" strokeWidth={1.5} />}
                          </h4>
                          <p className="text-[#8C7A6B] text-sm font-light mb-2 flex items-center gap-2">
                            {item.profession} <span className="w-1 h-1 rounded-full bg-[#E6D5C3]"></span> {item.city}
                          </p>
                          <p className="text-[#A3998D] text-[10px] uppercase tracking-widest flex items-center gap-1 font-semibold">
                            <Clock size={12} /> 
                            {activeTab === 'received' && `Received ${formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}`}
                            {activeTab === 'sent' && `Sent ${formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}`}
                            {(activeTab === 'accepted' || activeTab === 'declined') && `Updated ${formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}`}
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                        
                        <Link href={`/matches/${item.profile_id}`} className="flex-1 md:flex-none text-center bg-[#FBF9F6] border border-[#E6D5C3] text-[#8C7A6B] px-5 py-3 rounded-xl hover:bg-white hover:text-[#2A2621] transition-colors text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                          <Eye size={14} /> Profile
                        </Link>

                        {activeTab === "received" && (
                          <>
                            <button 
                              onClick={() => handleAction(item, "rejected")}
                              className="bg-white border border-[#E6D5C3] text-[#A3998D] px-5 py-3 rounded-xl hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
                            >
                              <X size={14} /> Decline
                            </button>
                            <button 
                              onClick={() => handleAction(item, "accepted")}
                              className="bg-[#2A2621] text-white px-6 py-3 rounded-xl hover:bg-[#1A1815] transition-all shadow-md hover:shadow-lg text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
                            >
                              <Check size={14} /> Accept
                            </button>
                          </>
                        )}

                        {activeTab === "sent" && (
                          <button 
                            onClick={() => handleAction(item, "withdrawn")}
                            className="bg-white border border-[#E6D5C3] text-[#A3998D] px-5 py-3 rounded-xl hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
                          >
                            <Undo2 size={14} /> Withdraw
                          </button>
                        )}

                        {activeTab === "accepted" && (
                          <Link 
                            href={`/dashboard/messages`}
                            className="bg-[#2A2621] text-white px-6 py-3 rounded-xl hover:bg-[#1A1815] transition-all shadow-md hover:shadow-lg text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
                          >
                            <MessageCircle size={14} /> Message
                          </Link>
                        )}

                        {activeTab === "declined" && (
                          <div className="bg-[#FBF9F6] border border-[#E6D5C3] text-[#A3998D] px-5 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 cursor-not-allowed opacity-70">
                            <Ban size={14} /> Declined
                          </div>
                        )}

                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
