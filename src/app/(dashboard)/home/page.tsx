import { CuratedGrid } from "./curated-grid"

export default function HomePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
          Curated For You
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Your daily selection of highly compatible, verified matches.
        </p>
      </div>

      {/* CuratedGrid is 'use client' so framer-motion only runs in the browser,
          preventing React #418 hydration mismatch */}
      <CuratedGrid />
      
      <div className="pt-12 text-center text-sm font-medium text-muted-foreground">
        You have reviewed all curated matches for today. Quality takes time.
      </div>
    </div>
  )
}
