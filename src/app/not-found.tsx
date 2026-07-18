import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-maroon-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-[1px] bg-gold/40 mx-auto mb-8" />
        <h1 className="font-display text-3xl md:text-4xl text-cream tracking-tight mb-4">
          This path does not exist.
        </h1>
        <p className="text-gold-light/70 font-body text-sm leading-relaxed mb-8 italic">
          The page you are looking for has not been built yet or has been removed from the estate.
        </p>
        <Link
          href="/"
          className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-gold/30 pb-1 hover:border-gold transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
