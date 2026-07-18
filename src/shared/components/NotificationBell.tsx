"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, Trash2, ArrowRight } from "lucide-react";
import { useNotifications } from "@/shared/providers/NotificationProvider";
import Link from "next/link";
import { archiveNotification } from "@/app/actions/notifications";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchInitial } = useNotifications();

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-cream/50 hover:text-cream transition-colors p-2"
      >
        <Bell size={20} strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gold-light/70 rounded-full ring-2 ring-maroon-deep flex items-center justify-center">
            {/* Can show count if we want, but a dot is more elegant */}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 mt-2 w-[380px] bg-maroon-deep border border-gold/30 rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              
              <div className="p-4 border-b border-gold/30 flex justify-between items-center bg-maroon/50 backdrop-blur-md relative z-10">
                <h3 className="font-display text-cream text-lg">Notifications</h3>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[10px] uppercase tracking-widest font-semibold text-gold-light/70 hover:text-cream transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="text-cream/50 hover:text-cream transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto relative z-10 custom-scrollbar bg-maroon-deep">
                {notifications.length === 0 ? (
                  <div className="p-10 text-center">
                    <Bell size={24} className="mx-auto text-gold/30 mb-3" strokeWidth={1} />
                    <p className="text-gold-light/70 font-light text-sm">All caught up. The estate is quiet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gold/30">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-4 transition-colors hover:bg-maroon flex gap-3 group ${!notif.is_read ? 'bg-maroon/60' : 'bg-transparent'}`}
                      >
                        <div className="shrink-0 mt-1">
                          {!notif.is_read && <div className="w-1.5 h-1.5 rounded-full bg-gold-light/70" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notif.is_read ? 'font-medium text-cream' : 'font-light text-cream'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-gold-light/70 mt-0.5 font-light leading-relaxed">
                            {notif.body}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] text-cream/50 uppercase tracking-widest">
                              {new Date(notif.created_at).toLocaleDateString()}
                            </span>
                            {notif.action_url && (
                              <Link 
                                href={notif.action_url}
                                onClick={() => markAsRead(notif.id)}
                                className="text-[10px] text-gold-light/70 hover:text-cream uppercase tracking-widest font-semibold flex items-center gap-1"
                              >
                                View <ArrowRight size={10} />
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                          {!notif.is_read && (
                            <button onClick={() => markAsRead(notif.id)} className="text-cream/50 hover:text-gold-light/70" title="Mark as read">
                              <Check size={14} />
                            </button>
                          )}
                          <button 
                            onClick={async () => {
                              await archiveNotification(notif.id);
                              fetchInitial();
                            }} 
                            className="text-cream/50 hover:text-red-900/60" title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
