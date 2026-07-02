"use client";

import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="relative w-full flex flex-col bg-[#0A1015]">
      
      {/* 
        ENVIRONMENT: The Garden Exit (Top 50%)
        Untouched blue hour photograph.
      */}
      <div className="w-full h-[50vh] relative">
        <Image 
          src="/images/architecture/footer.jpg"
          alt="Vivaha Garden Evening"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Stone Wall (Bottom 50%)
        A solid, opaque, dark stone wall holding the navigation.
      */}
      <div className="relative w-full bg-[#0A1015] flex flex-col items-center pt-24 pb-16 px-8 md:px-16 z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border-t border-white/5">
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16 border-b border-white/10 pb-16">
          
          {/* Brand */}
          <div className="space-y-6 max-w-[280px]">
            <div className="text-2xl font-display text-[#FDFBF7] tracking-widest uppercase">
              Vivaha
            </div>
            <p className="text-sm text-[#FDFBF7]/60 font-medium leading-relaxed">
              Building meaningful relationships with trust, respect, and family values at the heart.
            </p>
          </div>

          {/* Links naturally existing on the wall */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Our Story', 'Careers'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Safety Tips', 'Privacy Policy'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase">Connect</h4>
              <ul className="space-y-4">
                {['Instagram', 'Twitter', 'LinkedIn'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30 font-bold uppercase tracking-widest">
          <p>© 2026 Vivaha. All rights reserved.</p>
          <p>A Thoughtfully Designed Space.</p>
        </div>
      </div>
    </footer>
  );
}
