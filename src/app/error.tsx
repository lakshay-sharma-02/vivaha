"use client"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-maroon-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-[1px] bg-gold/40 mx-auto mb-8" />
        <h1 className="font-display text-3xl md:text-4xl text-cream tracking-tight mb-4">
          Something unexpected happened.
        </h1>
        <p className="text-gold-light/70 font-body text-sm leading-relaxed mb-8 italic">
          The estate encountered an unexpected disturbance. Please try again.
        </p>
        <button
          onClick={reset}
          className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-gold/30 pb-1 hover:border-gold transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
