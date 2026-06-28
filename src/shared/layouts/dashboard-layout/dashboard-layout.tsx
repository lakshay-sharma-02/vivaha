import * as React from "react"
import Link from "next/link"
import { Home, Compass, MessageSquare, UserCircle } from "lucide-react"
import { cn } from "@/shared/utils/cn"

const NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Discover", href: "/discover", icon: Compass },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: UserCircle },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex h-20 items-center px-8">
          <span className="font-playfair text-3xl font-semibold tracking-tight text-primary">
            Vivaha
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 rounded-md px-4 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      
      <div className="flex flex-1 flex-col">
        {/* Mobile Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md md:hidden sticky top-0 z-50">
          <span className="font-playfair text-2xl font-semibold text-primary">Vivaha</span>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:py-12">
            {children}
          </div>
        </main>
        
        {/* Mobile Bottom Nav */}
        <nav className="flex h-20 items-center justify-around border-t border-border/50 bg-background/80 backdrop-blur-md pb-4 pt-2 md:hidden sticky bottom-0 z-50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center space-y-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
