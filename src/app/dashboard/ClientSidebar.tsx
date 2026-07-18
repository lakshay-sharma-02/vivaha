"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Search, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  ShieldAlert,
  Crown,
  Settings,
  Menu,
  X
} from "lucide-react";
import { NotificationBell } from "@/shared/components/NotificationBell";
import { checkIsAdmin } from "@/app/actions/admin";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Browse Matches", href: "/matches", icon: Search },
  { label: "Interests", href: "/dashboard/interests", icon: Heart },
  { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { label: "Shortlisted", href: "/dashboard/shortlisted", icon: Bookmark },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function ClientSidebar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    checkIsAdmin().then(res => setIsAdmin(res.isAdmin));
  }, []);

  const items = [...NAV_ITEMS];
  if (isAdmin) {
    items.push({ label: "Admin Queue", href: "/dashboard/admin/verifications", icon: ShieldAlert });
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-maroon-deep/95 backdrop-blur-md border-b border-gold/20 z-50 flex items-center justify-between px-6">
        <span className="font-display text-xl tracking-[0.15em] uppercase gold-text">Vivah</span>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button onClick={() => setIsOpen(!isOpen)} className="text-gold">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-ink/60 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 md:w-64 bg-maroon-deep/95 md:bg-maroon-deep/90 backdrop-blur-xl border-r border-gold/20 flex flex-col justify-between py-10 z-50 md:z-40 transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <div className="relative z-10 px-8">
        <div className="flex items-center justify-between mb-16 hidden md:flex">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center relative">
               <span className="font-display text-gold text-xl leading-none pt-1">V</span>
            </div>
            <span className="font-display text-2xl tracking-[0.15em] uppercase gold-text group-hover:text-gold-light transition-colors">Vivah</span>
          </Link>
          <NotificationBell />
        </div>

        <nav className="space-y-3">
          {items.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="relative flex items-center gap-4 px-4 py-3 rounded-xl group overflow-hidden"
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-maroon border border-gold/30 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-maroon opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl -z-10" />
                )}
                <Icon size={18} className={isActive ? "text-gold" : "text-cream/40 group-hover:text-gold/70"} strokeWidth={isActive ? 2 : 1.5} />
                <span className={`text-sm tracking-wide font-body transition-colors italic ${isActive ? "text-cream" : "text-cream/60 group-hover:text-cream/90"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="relative z-10 px-8">
        <div className="bg-gradient-to-b from-maroon to-maroon-deep border border-gold/30 rounded-2xl p-5 text-center shadow-sm relative overflow-hidden">
          <Crown size={24} className="text-gold mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-display text-cream text-lg leading-tight mb-1">Lifetime</p>
          <p className="label text-gold-light mb-4">Member</p>
          <Link href="/premium" className="block w-full py-2 bg-gold text-maroon-deep rounded-lg text-[10px] uppercase tracking-widest font-display hover:bg-gold-light transition-colors shadow-md">
            View Benefits
          </Link>
        </div>
      </div>
    </aside>
    </>
  );
}
