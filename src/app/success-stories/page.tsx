import Link from "next/link"
import { Heart } from "lucide-react"

export const metadata = {
  title: "Success Stories | Vivah",
  description: "Real love stories that began on Vivah.",
}

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-maroon-deep">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-32 text-center">
        <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-8" />
        <h1 className="font-display text-4xl md:text-6xl text-cream tracking-tight leading-tight mb-6">
          Stories are being<br />written here.
        </h1>
        <p className="text-gold-light/70 font-body text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed italic">
          We&apos;re collecting the beautiful journeys that began on Vivah. 
          This space will soon be filled with real stories of trust, discovery, and lifelong connection.
        </p>
        <div className="flex justify-center">
          <div className="bg-maroon border border-gold/30 rounded-2xl p-8 inline-flex flex-col items-center gap-4">
            <Heart size={32} className="text-gold" strokeWidth={1} />
            <p className="text-cream font-display text-lg">Coming soon</p>
            <p className="text-gold-light/60 text-xs italic">Your story could be here.</p>
          </div>
        </div>
        <div className="mt-16">
          <Link
            href="/"
            className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-gold/30 hover:border-gold transition-all pb-1"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}
