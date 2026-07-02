"use client";

import { HeroSection } from "../marketing/HeroSection";
import { TrustStrip } from "../marketing/TrustStrip";
import { EditorialWhy } from "../marketing/EditorialWhy";
import { FeatureBento } from "../marketing/FeatureBento";
import { CompatibilityEngine } from "../marketing/CompatibilityEngine";
import { FinalCTA } from "../marketing/FinalCTA";
import { Footer } from "../marketing/Footer";

export function HTMLOverlay() {
  return (
    <div className="relative z-10 w-full pointer-events-none text-white/90 font-sans">
      
      {/* HUD Borders / Fixed Marginalia */}
      <div className="fixed top-8 left-8 flex flex-col gap-2 z-50">
        <span className="text-white/40 font-serif text-lg tracking-[0.3em]">VIVAHA</span>
        <span className="text-[#d4af37] text-[10px] tracking-widest uppercase">LN: 01.000</span>
      </div>
      <div className="fixed top-8 right-8 text-right z-50">
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">AN INSTITUTION<br/>OF CONNECTION</span>
      </div>
      <div className="fixed bottom-8 left-8 flex items-center gap-4 z-50">
        <span className="w-12 h-[1px] bg-white/20 block"></span>
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">SYS // ALIGN</span>
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <span className="text-white/60 text-[10px] tracking-[0.2em] border-b border-white/20 pb-1 pointer-events-auto cursor-pointer hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 uppercase">
          INITIATE
        </span>
      </div>

      {/* Narrative Flow - We keep pointer-events-none on the wrapper so mouse events pass through to WebGL, and selectively use pointer-events-auto on buttons/interactive elements */}
      <div className="flex flex-col">
        <HeroSection />
        
        {/* We need massive vertical gaps so the 3D scroll animations can breathe and evolve behind the content */}
        <div className="h-[50vh]" />
        
        <TrustStrip />
        <EditorialWhy />
        
        <div className="h-[50vh]" />
        
        <CompatibilityEngine />
        
        <div className="h-[30vh]" />
        
        <FeatureBento />
        
        <div className="h-[30vh]" />
        
        <FinalCTA />
        <Footer />
      </div>

    </div>
  );
}
