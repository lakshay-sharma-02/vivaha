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
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#FBF9F6]/90 backdrop-blur-md border-b border-[#E6D5C3]/60 z-50 flex items-center justify-between px-6">
        <span className="font-serif text-xl tracking-[0.15em] uppercase text-[#8C7A6B]">Vivaha</span>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#8C7A6B]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-[#2A2621]/40 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 md:w-64 bg-[#FBF9F6]/95 md:bg-[#FBF9F6]/80 backdrop-blur-xl border-r border-[#E6D5C3]/60 flex flex-col justify-between py-10 z-50 md:z-40 transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      
      <div className="relative z-10 px-8">
        <div className="flex items-center justify-between mb-16 hidden md:flex">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#8C7A6B] flex items-center justify-center relative">
               <span className="font-serif text-[#8C7A6B] text-xl leading-none pt-1">V</span>
            </div>
            <span className="font-serif text-2xl tracking-[0.15em] uppercase text-[#8C7A6B] group-hover:text-[#2A2621] transition-colors">Vivaha</span>
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
                    className="absolute inset-0 bg-[#FDF5E6] border border-[#E6D5C3] rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-[#FDF5E6] opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl -z-10" />
                )}
                <Icon size={18} className={isActive ? "text-[#8C7A6B]" : "text-[#A3998D] group-hover:text-[#8C7A6B]"} strokeWidth={isActive ? 2 : 1.5} />
                <span className={`text-sm tracking-wide font-medium transition-colors ${isActive ? "text-[#2A2621]" : "text-[#8C7A6B] group-hover:text-[#2A2621]"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="relative z-10 px-8">
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FBF9F6] border border-[#E6D5C3] rounded-2xl p-5 text-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
          <Crown size={24} className="text-[#8C7A6B] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-serif text-[#2A2621] text-lg leading-tight mb-1">Lifetime</p>
          <p className="text-[#8C7A6B] text-[9px] uppercase tracking-[0.2em] font-semibold mb-4">Member</p>
          <Link href="/premium" className="block w-full py-2 bg-[#2A2621] text-white rounded-lg text-[10px] uppercase tracking-widest font-serif hover:bg-[#1A1815] transition-colors shadow-md">
            View Benefits
          </Link>
        </div>
      </div>
    </aside>
    </>
  );
}
