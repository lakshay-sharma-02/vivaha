import { Input } from "@/shared/ui/input/input"
import { Button } from "@/shared/ui/button/button"
import { SlidersHorizontal, Search } from "lucide-react"
import { DiscoverGrid } from "./discover-grid"

export default function DiscoverPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col space-y-6 md:flex-row md:items-end md:justify-between md:space-y-0">
        <div>
          <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
            Discover
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Explore the Vivaha community based on your preferences.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search profession, city..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DiscoverGrid is 'use client' so framer-motion only runs in the browser,
          preventing React #418 hydration mismatch */}
      <DiscoverGrid />
    </div>
  )
}
