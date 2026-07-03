"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ShieldCheck, 
  Video, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Smile, 
  Mic, 
  Send,
  User,
  Ban,
  Flag,
  Trash2,
  Check,
  CheckCheck,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Conversation, sendMessage, markMessagesAsRead } from "@/app/actions/messages";
import { createClient } from "@/shared/lib/supabase/client";

// --- Decorative Background Elements ---
const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
    <motion.div 
      className="absolute top-[-10%] left-[30%] w-[600px] h-[600px] bg-gradient-radial from-[#FDF5E6]/40 via-[#FDF5E6]/5 to-transparent blur-[60px]"
      animate={{ opacity: [0.5, 0.7, 0.5], scale: [1, 1.05, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const AbstractArch = () => (
  <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none z-0 opacity-[0.05] flex justify-end transform translate-x-1/3 -translate-y-1/3 fixed">
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-full relative">
      <div className="absolute inset-4 border border-[#8C7A6B]/50 rounded-full" />
    </div>
  </div>
);

export default function ClientMessages({ initialConversations }: { initialConversations: Conversation[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeChat, setActiveChat] = useState<string | null>(searchParams.get("match") || null);
  const [filter, setFilter] = useState("All");
  const [composerText, setComposerText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();
  const chat = conversations.find(c => c.id === activeChat);

  // Fetch current user ID for real-time checks
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, [supabase.auth]);

  // Handle marking messages as read when opening a chat
  useEffect(() => {
    if (activeChat && chat && chat.unread > 0) {
      markMessagesAsRead(activeChat).then(() => {
        setConversations(prev => prev.map(c => 
          c.id === activeChat ? { 
            ...c, 
            unread: 0,
            messages: c.messages.map(m => m.status === 'sent' && m.sender === 'them' ? { ...m, status: 'read' as const } : m)
          } : c
        ));
      });
    }
  }, [activeChat, chat?.unread]);

  // Supabase Real-time Subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("chat-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages"
        },
        (payload) => {
          const newDbMsg = payload.new;
          
          // Only process if it belongs to one of our conversations
          setConversations(prev => {
            const convoIndex = prev.findIndex(c => c.id === newDbMsg.match_id);
            if (convoIndex === -1) return prev; // Not our conversation

            // If we sent it, we already optimistically added it, skip.
            if (newDbMsg.sender_id === userId) return prev;

            const newMsg = {
              id: newDbMsg.id,
              sender: "them" as const,
              text: newDbMsg.content || "",
              time: new Date(newDbMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: "sent" as const
            };

            const updated = [...prev];
            const convo = { ...updated[convoIndex] };
            
            convo.messages = [...convo.messages, newMsg];
            convo.lastMessage = newMsg.text;
            convo.time = newMsg.time;
            
            // If it's the active chat, mark as read automatically (handled by the other useEffect when unread changes, but we can do it here too)
            if (activeChat !== newDbMsg.match_id) {
              convo.unread += 1;
            } else {
              markMessagesAsRead(newDbMsg.match_id);
              newMsg.status = "read" as any;
            }

            updated[convoIndex] = convo;
            
            // Move updated conversation to top
            const [moved] = updated.splice(convoIndex, 1);
            return [moved, ...updated];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages"
        },
        (payload) => {
          const updatedDbMsg = payload.new;
          // Handle read receipts
          if (updatedDbMsg.read_at && updatedDbMsg.sender_id === userId) {
            setConversations(prev => prev.map(c => {
              if (c.id === updatedDbMsg.match_id) {
                return {
                  ...c,
                  messages: c.messages.map(m => m.id === updatedDbMsg.id ? { ...m, status: 'read' as const } : m)
                };
              }
              return c;
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase, activeChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const handleSendMessage = async () => {
    if (!composerText.trim() || !chat || isSending) return;
    
    setIsSending(true);
    const textToSend = composerText;
    setComposerText("");

    // Optimistic Update
    const tempId = `temp-${Date.now()}`;
    const newMsg = {
      id: tempId,
      sender: "me" as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent" as const
    };

    setConversations(prev => prev.map(c => {
      if (c.id === chat.id) {
        return { 
          ...c, 
          messages: [...c.messages, newMsg],
          lastMessage: textToSend,
          time: newMsg.time
        };
      }
      return c;
    }));

    // Backend call
    const res = await sendMessage(chat.id, textToSend);
    
    if (res.success && res.message) {
      setConversations(prev => prev.map(c => {
        if (c.id === chat.id) {
          return {
            ...c,
            messages: c.messages.map(m => m.id === tempId ? res.message : m)
          };
        }
        return c;
      }));
    } else {
      // Revert if failed
      setConversations(prev => prev.map(c => {
        if (c.id === chat.id) {
          return {
            ...c,
            messages: c.messages.filter(m => m.id !== tempId)
          };
        }
        return c;
      }));
    }
    setIsSending(false);
  };

  return (
    <div className="h-full relative bg-[#F7F5EF] flex overflow-hidden">
      {/* Global Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <SunlightRays />
      <AbstractArch />

      {/* --- LEFT PANEL: Conversation List --- */}
      <div className="w-[340px] shrink-0 border-r border-[#E6D5C3]/60 bg-[#FBF9F6]/50 backdrop-blur-md relative z-10 flex flex-col">
        {/* Header & Search */}
        <div className="p-6 pb-4 border-b border-[#E6D5C3]/40">
          <h2 className="font-serif text-2xl text-[#2A2621] tracking-wide mb-6">Letters</h2>
          
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3998D]" strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white/60 border border-[#E6D5C3] rounded-full py-2.5 pl-10 pr-4 text-sm font-light text-[#2A2621] placeholder-[#A3998D] focus:outline-none focus:border-[#8C7A6B] focus:bg-white transition-all shadow-inner"
            />
          </div>

          <div className="flex gap-4">
            {["All", "Unread", "Recent"].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[10px] uppercase tracking-widest font-semibold transition-colors pb-1 ${filter === f ? 'text-[#2A2621] border-b border-[#2A2621]' : 'text-[#A3998D] hover:text-[#8C7A6B]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-3 space-y-1">
          {conversations.map((c) => (
            <div 
              key={c.id} 
              onClick={() => {
                setActiveChat(c.id);
                // Optionally clear the URL parameter so it's clean
                router.replace('/dashboard/messages', { scroll: false });
              }}
              className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${activeChat === c.id ? 'bg-[#FDF5E6] shadow-sm border border-[#E6D5C3]/50' : 'hover:bg-[#FDF5E6]/50 border border-transparent'}`}
            >
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#E6D5C3]/40 bg-[#F0EBE1]">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#A3998D] rounded-full border-2 border-[#FBF9F6]"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-serif text-[15px] truncate ${c.unread > 0 ? 'text-[#2A2621] font-medium' : 'text-[#2A2621]'}`}>{c.name}</h3>
                  <span className={`text-[10px] shrink-0 ${c.unread > 0 ? 'text-[#8C7A6B] font-medium' : 'text-[#A3998D]'}`}>{c.time}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className={`text-xs truncate font-light ${c.unread > 0 ? 'text-[#2A2621]' : 'text-[#8C7A6B]'}`}>
                    {c.lastMessage}
                  </p>
                  {c.unread > 0 && (
                    <span className="shrink-0 w-4 h-4 bg-[#8C7A6B] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CENTER PANEL: Conversation --- */}
      <div className="flex-1 flex flex-col relative z-10 bg-transparent">
        {chat ? (
          <>
            {/* Top Bar */}
            <div className="h-20 px-8 border-b border-[#E6D5C3]/40 flex items-center justify-between bg-[#FBF9F6]/80 backdrop-blur-md shrink-0 relative">
              <div className="absolute top-0 right-10 w-[200px] h-[200px] pointer-events-none opacity-20 mix-blend-multiply">
                <Image src="/images/floral_top_right.jpg" alt="" fill className="object-cover" />
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E6D5C3]">
                  <Image src={chat.image} alt={chat.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#2A2621] flex items-center gap-2">
                    {chat.name} {chat.verified && <ShieldCheck size={14} className="text-[#8C7A6B]" strokeWidth={1.5} />}
                  </h3>
                  <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2">
                    {chat.online ? 'Online' : 'Offline'} <span className="w-1 h-1 bg-[#E6D5C3] rounded-full"></span> {chat.compatibility}% Match
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <button className="w-10 h-10 rounded-full bg-white border border-[#E6D5C3] flex items-center justify-center text-[#8C7A6B] hover:text-[#2A2621] hover:shadow-sm transition-all">
                  <User size={16} strokeWidth={1.5} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-[#E6D5C3] flex items-center justify-center text-[#8C7A6B] hover:text-[#2A2621] hover:shadow-sm transition-all">
                  <Video size={16} strokeWidth={1.5} />
                </button>
                <button className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-[#8C7A6B] hover:text-[#2A2621] transition-colors">
                  <MoreHorizontal size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
              <div className="text-center my-6">
                <span className="bg-[#FDF5E6] border border-[#E6D5C3]/50 text-[#8C7A6B] text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold">
                  Today
                </span>
              </div>

              <AnimatePresence>
                {chat.messages.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[70%] px-6 py-4 text-[15px] font-light leading-relaxed shadow-sm ${
                        isMe 
                        ? 'bg-[#2A2621] text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm' 
                        : 'bg-white border border-[#E6D5C3]/60 text-[#2A2621] rounded-t-2xl rounded-br-2xl rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1.5 px-1">
                        <span className="text-[#A3998D] text-[10px]">{msg.time}</span>
                        {isMe && msg.status === "read" && <CheckCheck size={12} className="text-[#8C7A6B]" strokeWidth={2} />}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="p-6 bg-[#FBF9F6]/80 backdrop-blur-md border-t border-[#E6D5C3]/40 shrink-0">
              <div className="bg-white border border-[#E6D5C3] rounded-3xl p-2 flex items-center shadow-inner">
                <button className="w-10 h-10 flex items-center justify-center text-[#A3998D] hover:text-[#8C7A6B] transition-colors">
                  <Smile size={20} strokeWidth={1.5} />
                </button>
                <input 
                  type="text" 
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Compose a letter..." 
                  className="flex-1 bg-transparent border-none focus:outline-none px-2 text-[#2A2621] font-light placeholder-[#A3998D]"
                />
                <button className="w-10 h-10 flex items-center justify-center text-[#A3998D] hover:text-[#8C7A6B] transition-colors">
                  <ImageIcon size={18} strokeWidth={1.5} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#A3998D] hover:text-[#8C7A6B] transition-colors">
                  <Mic size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={isSending || !composerText.trim()}
                  className="w-10 h-10 ml-2 rounded-full bg-[#2A2621] flex items-center justify-center text-white hover:bg-[#1A1815] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-md">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#FDF5E6] to-[#FBF9F6] border border-[#E6D5C3]/50 flex items-center justify-center shadow-inner">
                <MessageCircle size={32} className="text-[#8C7A6B]" strokeWidth={1} />
              </div>
              <h2 className="font-serif text-3xl text-[#2A2621] mb-4">The Lounge</h2>
              <p className="text-[#8C7A6B] font-light leading-relaxed">
                Meaningful conversations begin with genuine connections. Select an introduction from the left to begin your correspondence.
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* --- RIGHT PANEL: Profile Preview --- */}
      {chat && (
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-[280px] shrink-0 border-l border-[#E6D5C3]/60 bg-[#FBF9F6]/50 backdrop-blur-md relative z-10 p-6 flex flex-col"
        >
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border border-[#E6D5C3] mb-4 shadow-sm">
              <Image src={chat.image} alt={chat.name} fill className="object-cover" />
            </div>
            <h3 className="font-serif text-2xl text-[#2A2621] mb-1">{chat.name}</h3>
            <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold">{chat.profession}</p>
            <p className="text-[#8C7A6B] text-xs font-light mt-1">{chat.age} yrs • {chat.city}</p>
          </div>

          <div className="bg-white border border-[#E6D5C3] rounded-2xl p-4 text-center mb-8 shadow-sm">
            <p className="text-[#8C7A6B] text-[9px] uppercase tracking-widest font-semibold mb-2">Compatibility</p>
            <p className="font-serif text-3xl text-[#2A2621]">{chat.compatibility}%</p>
          </div>

          <div className="space-y-2 mt-auto">
            <Link href={`/matches/${chat.id}`} className="w-full bg-[#2A2621] text-white py-3.5 rounded-xl font-serif text-[11px] uppercase tracking-widest flex items-center justify-center hover:bg-[#1A1815] transition-colors shadow-md">
              View Profile
            </Link>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="bg-transparent border border-[#E6D5C3] text-[#8C7A6B] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors text-[10px] uppercase tracking-widest font-semibold">
                <Ban size={12} /> Block
              </button>
              <button className="bg-transparent border border-[#E6D5C3] text-[#8C7A6B] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors text-[10px] uppercase tracking-widest font-semibold">
                <Flag size={12} /> Report
              </button>
            </div>
            <button className="w-full mt-2 text-[#A3998D] py-3 rounded-xl flex items-center justify-center gap-2 hover:text-[#2A2621] transition-colors text-[10px] uppercase tracking-widest font-semibold">
              <Trash2 size={12} /> Clear Chat
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
