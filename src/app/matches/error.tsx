"use client"

export default function MatchesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-maroon-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-6" />
        <h2 className="font-display text-2xl text-cream tracking-tight mb-3">
          Could not load matches
        </h2>
        <p className="text-gold-light/70 font-body text-sm leading-relaxed mb-6 italic">
          Something went wrong fetching profiles. Please try again.
        </p>
        <button
          onClick={reset}
          className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-gold/30 pb-1 hover:border-gold transition-all"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
