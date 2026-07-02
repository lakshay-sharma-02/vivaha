"use client"

import { CinematicSection } from "../experience"
import { CheckCircle2, ScanFace, FileSignature } from "lucide-react"

export function VerificationSection() {
  return (
    <CinematicSection>
      <div className="relative flex flex-col items-center justify-center w-full h-full py-20 px-4">
        <h2 
          className="font-playfair text-4xl md:text-5xl mb-16 font-light text-zinc-300 text-center drop-shadow-md"
        >
          Uncompromising Standards
        </h2>

        <div
          className="flex items-center gap-4 md:gap-12 scale-75 md:scale-100"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <FileSignature className="w-8 h-8 text-zinc-400" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">
              Identity
            </span>
          </div>

          <div className="w-12 md:w-16 h-[2px] bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />

          <div className="flex flex-col items-center gap-4 relative">
            <div className="w-20 h-20 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden shadow-xl">
              <ScanFace className="w-8 h-8 text-zinc-400" />
              <div className="absolute left-0 right-0 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)] scan-line" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">
              Biometric
            </span>
          </div>

          <div className="w-12 md:w-16 h-[2px] bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />

          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-green-500">
              Verified
            </span>
          </div>
        </div>

        <style jsx>{`
          @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
          }
          .scan-line {
            animation: scan 2s ease-in-out 1 forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .scan-line { animation: none; top: 50%; }
          }
        `}</style>
      </div>
    </CinematicSection>
  )
}
