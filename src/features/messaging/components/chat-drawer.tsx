"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Loader2, MessageCircle, ArrowLeft } from "lucide-react"
import { createClient } from "@/shared/lib/supabase/client"
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js"
import type { Database } from "@/shared/lib/supabase/database.types"

type Message = Database["public"]["Tables"]["messages"]["Row"]

interface ChatDrawerProps {
  matchId: string
  currentUserId: string
  otherUserName: string
  otherUserPhotoUrl?: string | null
  onClose: () => void
}

export default function ChatDrawer({
  matchId,
  currentUserId,
  otherUserName,
  otherUserPhotoUrl,
  onClose,
}: ChatDrawerProps) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputValue, setInputValue] = React.useState("")
  const [isSending, setIsSending] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Fetch existing messages on mount
  React.useEffect(() => {
    const supabase = createClient()

    async function fetchMessages() {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("match_id", matchId)
        .eq("is_active", true)
        .order("created_at", { ascending: true })
        .limit(200)

      setMessages(data ?? [])
      setIsLoading(false)
    }

    fetchMessages()

    // Subscribe to new messages via Realtime
    const channel = supabase
      .channel(`match-${matchId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `match_id=eq.${matchId}`,
        },
        (payload: RealtimePostgresInsertPayload<Message>) => {
          setMessages((prev) => {
            // Avoid duplicate if the INSERT was from our own send
            if (prev.some((m) => m.id === payload.new.id)) return prev
            return [...prev, payload.new]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [matchId])

  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when drawer opens
  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 400)
  }, [])

  const sendMessage = async () => {
    const text = inputValue.trim()
    if (!text || isSending) return

    setIsSending(true)
    setInputValue("")

    // Optimistic update
    const optimisticId = `optimistic-${Date.now()}`
    const optimistic: Message = {
      id: optimisticId,
      match_id: matchId,
      sender_id: currentUserId,
      content: text,
      message_type: "text",
      is_active: true,
      media_id: null,
      deleted_at: null,
      read_at: null,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimistic])

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id: matchId, content: text }),
      })

      if (!res.ok) {
        // Roll back optimistic message on failure
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId))
        setInputValue(text)
      } else {
        const { message } = await res.json()
        // Replace optimistic with real
        setMessages((prev) =>
          prev.map((m) => (m.id === optimisticId ? message : m))
        )
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId))
      setInputValue(text)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (iso: string | null) => {
    if (!iso) return ""
    const d = new Date(iso)
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  const formatDateGroup = (iso: string | null) => {
    if (!iso) return ""
    const d = new Date(iso)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === today.toDateString()) return "Today"
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday"
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric" })
  }

  // Group messages by date
  const grouped: { date: string; msgs: Message[] }[] = []
  for (const msg of messages) {
    const dateLabel = formatDateGroup(msg.created_at)
    const last = grouped[grouped.length - 1]
    if (last && last.date === dateLabel) {
      last.msgs.push(msg)
    } else {
      grouped.push({ date: dateLabel, msgs: [msg] })
    }
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10 shrink-0">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          {otherUserPhotoUrl ? (
            <img
              src={otherUserPhotoUrl}
              alt={otherUserName}
              className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-white/60 text-sm font-medium">
                {otherUserName[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <h2 className="font-playfair text-lg font-medium text-white truncate">{otherUserName}</h2>
            <p className="text-xs text-primary/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
              Mutual Match
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/40 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 scrollbar-hide">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-white font-medium">Start the conversation</p>
              <p className="text-white/40 text-sm mt-1">
                You and {otherUserName} are now connected. Say hello!
              </p>
            </div>
          </div>
        ) : (
          grouped.map(({ date, msgs }) => (
            <div key={date} className="space-y-3">
              {/* Date label */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">{date}</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Messages in this group */}
              {msgs.map((msg, idx) => {
                const isMine = msg.sender_id === currentUserId
                const isOptimistic = msg.id.startsWith("optimistic-")
                const prevMsg = msgs[idx - 1]
                const isFirstInRun = !prevMsg || prevMsg.sender_id !== msg.sender_id

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${isMine ? "justify-end" : "justify-start"} ${isFirstInRun ? "mt-4" : "mt-1"}`}
                  >
                    <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isMine
                            ? `bg-primary text-black font-medium ${
                                isFirstInRun ? "rounded-tr-sm" : ""
                              }`
                            : `bg-white/8 border border-white/10 text-white ${
                                isFirstInRun ? "rounded-tl-sm" : ""
                              }`
                        } ${isOptimistic ? "opacity-70" : ""}`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-white/30 px-1">
                        {formatTime(msg.created_at)}
                        {isOptimistic && " · sending"}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="px-4 py-4 border-t border-white/10 shrink-0 bg-zinc-950">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-primary/40 transition-colors">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${otherUserName}…`}
            className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none py-1"
            maxLength={2000}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isSending}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${
              inputValue.trim() && !isSending
                ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_12px_rgba(232,185,108,0.4)]"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-white/20 mt-2">
          Messages are private and transmitted securely
        </p>
      </div>
    </motion.div>
  )
}
