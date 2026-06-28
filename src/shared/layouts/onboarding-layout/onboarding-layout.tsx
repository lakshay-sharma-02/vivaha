import * as React from "react"

export function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="flex h-20 items-center justify-center border-b border-border/50 bg-background/80 backdrop-blur-md">
        <span className="font-playfair text-2xl font-semibold text-primary tracking-wide">
          Vivaha
        </span>
      </header>
      <main className="flex flex-1 flex-col items-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  )
}
