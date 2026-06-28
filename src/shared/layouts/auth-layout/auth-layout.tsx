import * as React from "react"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-12">
            <span className="font-playfair text-4xl font-semibold text-primary">Vivaha</span>
          </div>
          {children}
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-muted/30">
          {/* 
            Placeholder for high-end editorial photography. 
            Will use a slow crossfade image loading technique here.
          */}
        </div>
      </div>
    </div>
  )
}
