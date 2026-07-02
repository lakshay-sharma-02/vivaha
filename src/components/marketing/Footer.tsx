"use client";
import { motion } from "framer-motion";

const footerLinks = [
  { title: "Institution", links: ["About Us", "Our Philosophy", "Matchmakers", "Careers"] },
  { title: "Experience", links: ["AI Compatibility", "Private Discovery", "Success Stories", "Pricing"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Trust & Safety", "Cookie Policy"] },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.05] bg-[#040405] pt-32 pb-16 px-6 relative z-10 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
        <div className="flex-1">
          <h3 className="text-3xl font-serif text-[#d4af37] tracking-widest mb-6">VIVAHA</h3>
          <p className="text-white/40 font-sans font-light text-sm max-w-sm leading-relaxed">
            The private institution of matchmaking. Where sophisticated alignment meets enduring legacy.
          </p>
        </div>
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-3 gap-12">
          {footerLinks.map((col, i) => (
            <div key={i} className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/70">{col.title}</h4>
              <div className="flex flex-col gap-4">
                {col.links.map((link, j) => (
                  <a key={j} href="#" className="text-white/40 text-sm font-sans font-light hover:text-[#d4af37] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.05]">
        <p className="text-white/30 text-xs font-sans tracking-wide">
          © {new Date().getFullYear()} Vivaha Institution. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>EN</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Dark Theme</span>
        </div>
      </div>
    </footer>
  );
}
