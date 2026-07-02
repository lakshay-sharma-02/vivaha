"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/client"
import { useReducedMotion } from "@/shared/animations"
import { 
  LayoutDashboard, Compass, Users, MessageSquare, 
  Bookmark, Bell, ShieldCheck, User, Settings, 
  LifeBuoy, LogOut, Menu, X, Crown
} from "lucide-react"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Discover", href: "/dashboard/discover", icon: Compass },
  { label: "Matches", href: "/dashboard/matches", icon: Users },
  { label: "Connections", href: "/dashboard/connections", icon: MessageSquare },
  { label: "Saved", href: "/dashboard/saved", icon: Bookmark },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
]

const SETTINGS_ITEMS = [
  { label: "Membership", href: "/dashboard/membership", icon: Crown, premium: true },
  { label: "Verification", href: "/dashboard/verification", icon: ShieldCheck },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState<{ name: string; isPremium: boolean } | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isSearching, setIsSearching] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const reducedMotion = useReducedMotion()

  React.useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, memberships(tier)")
        .eq("id", user.id)
        .maybeSingle()
      if (profile) {
        const membershipArr = (profile as any).memberships
        const tier = Array.isArray(membershipArr) ? membershipArr[0]?.tier : membershipArr?.tier
        setUserInfo({
          name: `${profile.first_name} ${profile.last_name}`.trim() || "Member",
          isPremium: tier === "premium",
        })
      }
    }
    loadUser()
  }, [])

  // Search functionality with debouncing
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsSearchOpen(false)
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, bio, city_id, profession_id, cities(name), professions(name)')
        .neq('id', user.id)
        .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`)
        .limit(5)

      setSearchResults(profiles || [])
      setIsSearching(false)
      setIsSearchOpen(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Keyboard shortcut for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setSearchQuery("")
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  // Ambient animated background
  const AmbientBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <motion.div
        animate={reducedMotion ? {} : {
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div
        animate={reducedMotion ? {} : {
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[100px] mix-blend-screen"
      />
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" />
    </div>
  )

  const NavLink = ({ item }: { item: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; premium?: boolean } }) => {
    const isActive = pathname === item.href
    return (
      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
            isActive 
              ? "bg-white/10 text-white shadow-lg border border-white/5" 
              : "text-white/50 hover:text-white hover:bg-white/5"
          }`}
        >
          {isActive && (
            <motion.div 
              layoutId="activeNav" 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl z-0" 
            />
          )}
          <item.icon className={`w-5 h-5 relative z-10 ${isActive ? "text-primary" : "group-hover:text-white"}`} />
          <span className="font-medium text-sm relative z-10">{item.label}</span>
          {item.premium && (
            <span className="absolute right-4 text-[10px] uppercase tracking-wider font-bold text-primary/80 bg-primary/10 px-2 py-0.5 rounded-sm">
              Pro
            </span>
          )}
        </motion.div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex selection:bg-primary/30">
      <AmbientBackground />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-white/5 bg-black/20 backdrop-blur-3xl z-40">
        <div className="p-8 pb-4">
          <Link href="/dashboard" className="inline-block">
            <h1 className="font-playfair text-3xl font-medium tracking-tight text-white group relative">
              Vivaha
              <div className="absolute -bottom-2 left-0 w-1/2 h-px bg-gradient-to-r from-primary to-transparent" />
            </h1>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-10 scrollbar-hide">
          <div className="space-y-1">
            <h2 className="text-xs uppercase tracking-widest text-white/30 font-semibold px-4 mb-4">Menu</h2>
            {NAV_ITEMS.map(item => <NavLink key={item.href} item={item} />)}
          </div>

          <div className="space-y-1">
            <h2 className="text-xs uppercase tracking-widest text-white/30 font-semibold px-4 mb-4">Account</h2>
            {SETTINGS_ITEMS.map(item => <NavLink key={item.href} item={item} />)}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 mt-auto">
          <button onClick={handleSignOut} className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-black/50 backdrop-blur-2xl border-b border-white/5 z-50 flex items-center justify-between px-6">
        <Link href="/dashboard">
          <h1 className="font-playfair text-2xl font-medium text-white">Vivaha</h1>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col"
          >
            <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
              <h1 className="font-playfair text-2xl font-medium text-white">Menu</h1>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
              <div className="space-y-2">
                {NAV_ITEMS.map(item => <NavLink key={item.href} item={item} />)}
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="space-y-2">
                {SETTINGS_ITEMS.map(item => <NavLink key={item.href} item={item} />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full min-h-screen pt-20 lg:pt-0">
        {/* Top Glass Bar for Desktop (Optional, maybe search bar and profile widget) */}
        <header className="hidden lg:flex sticky top-0 h-24 items-center justify-between px-10 z-30 bg-gradient-to-b from-zinc-950 to-transparent">
          <div className="relative">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-3 w-96 backdrop-blur-md focus-within:bg-white/10 focus-within:border-primary/50 transition-all">
              <SearchIcon className="w-5 h-5 text-white/30" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setIsSearchOpen(true)}
                placeholder="Search people, messages..."
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 w-full ml-3"
              />
              <div className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/50 border border-white/5">⌘K</div>
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50"
              >
                {isSearching ? (
                  <div className="p-6 text-center text-white/50 text-sm">Searching...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-6 text-center text-white/50 text-sm">No results found</div>
                ) : (
                  <div className="py-2">
                    {searchResults.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => {
                          router.push(`/dashboard/discover`)
                          setIsSearchOpen(false)
                          setSearchQuery("")
                        }}
                        className="w-full px-6 py-3 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                          {profile.first_name?.[0]}{profile.last_name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {profile.first_name} {profile.last_name}
                          </div>
                          <div className="text-xs text-white/50 truncate">
                            {profile.professions?.name} • {profile.cities?.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </button>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-1.5 pr-6 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-white/20">
                {/* Profile Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary/40 to-transparent" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userInfo?.name ?? "Loading..."}</span>
                {userInfo?.isPremium && (
                  <span className="text-[10px] text-primary uppercase tracking-wider font-bold">Premium</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation (Optional, for quick access to primary tabs) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 z-40 flex items-center justify-around px-4 pb-safe">
        {NAV_ITEMS.slice(0, 4).map(item => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1.5 p-2">
              <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-white/40"}`} />
              <span className={`text-[10px] font-medium ${isActive ? "text-white" : "text-white/40"}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  )
}
