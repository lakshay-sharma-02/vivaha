"use client";

import { motion, Variants } from "framer-motion";

const revealVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" } 
  },
};

export function HTMLOverlay() {
  return (
    <div className="relative z-10 w-full pointer-events-none text-white/90 font-sans tracking-[0.2em] text-[10px] uppercase">
      
      {/* HUD Borders / Fixed Marginalia */}
      <div className="fixed top-8 left-8 flex flex-col gap-2">
        <span className="text-white/40 font-serif text-lg tracking-[0.3em]">VIVAHA</span>
        <span className="text-[#d4af37]">LN: 01.000</span>
      </div>
      <div className="fixed top-8 right-8 text-right">
        <span className="text-white/40">AN INSTITUTION<br/>OF CONNECTION</span>
      </div>
      <div className="fixed bottom-8 left-8 flex items-center gap-4">
        <span className="w-12 h-[1px] bg-white/20 block"></span>
        <span className="text-white/40">SYS // ALIGN</span>
      </div>
      <div className="fixed bottom-8 right-8">
        <span className="text-white/60 border-b border-white/20 pb-1 pointer-events-auto cursor-pointer hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300">
          INITIATE
        </span>
      </div>

      {/* 1. Arrival */}
      <section className="h-[150vh] flex flex-col justify-center px-12 md:px-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-40%" }}>
          <motion.p variants={revealVariants} className="text-white/40">CH 01 // THE MONOLITH</motion.p>
          <motion.p variants={revealVariants} className="mt-2 text-white/80">OBSERVE THE STRUCTURE.</motion.p>
        </motion.div>
      </section>

      {/* 2. Discovery & Alignment */}
      <section className="h-[200vh] flex flex-col justify-center px-12 md:px-24 text-right">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-40%" }}>
          <motion.p variants={revealVariants} className="text-white/40">CH 02 // ALIGNMENT</motion.p>
          <motion.p variants={revealVariants} className="mt-2 text-[#d4af37]">SEEK THE FORM.</motion.p>
        </motion.div>
      </section>

      {/* 3. The Signature Moment */}
      <section className="h-[200vh] flex flex-col justify-center px-12 md:px-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-40%" }}>
          <motion.p variants={revealVariants} className="text-white/40">CH 03 // LEGACY</motion.p>
          <motion.p variants={revealVariants} className="mt-2 text-white/80">A PRIVATE CONTINUUM.</motion.p>
        </motion.div>
      </section>

      {/* 4. Request Membership */}
      <section className="min-h-[150vh] flex flex-col items-center justify-center pb-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-20%" }} className="pointer-events-auto text-center flex flex-col items-center">
           <h2 className="text-[#d4af37] text-xs tracking-[0.4em] mb-12">SUBMIT INQUIRY</h2>
           <form className="flex flex-col gap-10 w-72">
             <div className="relative group/input">
               <input 
                 type="email" 
                 id="email-req"
                 required
                 placeholder="EMAIL" 
                 className="peer w-full bg-transparent border-b border-white/20 pb-3 text-center text-white focus:outline-none focus:border-[#d4af37] placeholder-transparent transition-colors font-serif text-base tracking-widest" 
               />
               <label htmlFor="email-req" className="absolute left-0 right-0 top-0 text-center text-white/30 transition-all peer-focus:-top-6 peer-focus:text-[#d4af37] peer-focus:text-[9px] peer-valid:-top-6 peer-valid:text-[9px]">
                 EMAIL ADDRESS
               </label>
             </div>
             
             <button 
               type="button" 
               className="text-white/60 hover:text-[#0a0a0c] hover:bg-[#d4af37] hover:border-[#d4af37] transition-all duration-500 uppercase text-[10px] tracking-[0.3em] border border-white/10 py-4 backdrop-blur-md"
             >
               REQUEST ACCESS
             </button>
           </form>
           <p className="mt-8 text-[9px] text-white/30 font-light tracking-wide max-w-[200px] leading-loose">
             STRICTLY BY INVITATION.
           </p>
        </motion.div>
      </section>

    </div>
  );
}
