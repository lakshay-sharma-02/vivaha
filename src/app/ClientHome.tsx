"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Lock, Shield, Crown, Search, MessageCircle, Heart, Star, Plus, Minus, ArrowRight, User, CheckCircle } from "lucide-react";

// --- Decorative Elements ---

const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
    <motion.div 
      className="absolute top-[-10%] w-[150vw] h-[100vh] bg-gradient-radial from-[#FDF5E6]/60 via-[#FDF5E6]/10 to-transparent blur-[80px]"
      animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    // Only generate on client to prevent hydration errors
    const generated = Array.from({ length: window.innerWidth < 768 ? 10 : 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 30 + Math.random() * 40,
      size: 2 + Math.random() * 3,
      xOffset: Math.random() * 100 - 50
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 fixed">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#E6D5C3] opacity-30 blur-[1px]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: ["-20vh", "120vh"], x: [0, p.xOffset, p.xOffset * -1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const FloralCorners = () => (
  <>
    <div className="absolute top-0 left-0 w-[40vw] md:w-[30vw] max-w-[400px] aspect-square pointer-events-none z-10 opacity-70 mix-blend-multiply">
      <Image src="/images/floral_top_left.jpg" alt="" fill className="object-contain object-top-left drop-shadow-xl" priority />
    </div>
    <div className="absolute top-0 right-0 w-[45vw] md:w-[35vw] max-w-[450px] aspect-square pointer-events-none z-10 opacity-70 mix-blend-multiply">
      <Image src="/images/floral_top_right.jpg" alt="" fill className="object-contain object-top-right drop-shadow-xl" priority />
    </div>
  </>
);

// --- Sections ---

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-24 pt-24 md:pt-0 overflow-hidden">
      <FloralCorners />
      <div className="w-full md:w-1/2 relative z-20 flex flex-col justify-center text-center md:text-left mt-12 md:mt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#E6D5C3] rounded-full bg-white/50 backdrop-blur-md mb-8 mx-auto md:mx-0">
            <Crown size={14} className="text-[#8C7A6B]" />
            <span className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold">Exclusively by Invitation & Application</span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-[#2A2621] leading-[1.1] mb-6 drop-shadow-sm">
            Where Meaningful<br />Journeys <span className="italic font-light text-[#8C7A6B]">Begin.</span>
          </h1>
          <p className="text-[#8C7A6B] text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
            Vivaha is an exclusive premium matrimony platform where trust, authenticity, and meaningful introductions create lifelong relationships.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link href="/register" className="w-full sm:w-auto bg-[#2A2621] text-white px-8 py-4 rounded-xl shadow-xl hover:bg-[#1A1815] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-serif tracking-widest uppercase text-xs text-center flex items-center justify-center gap-2">
              Create Your Profile <ArrowRight size={14} />
            </Link>
            <Link href="/matches" className="w-full sm:w-auto bg-transparent border border-[#2A2621] text-[#2A2621] px-8 py-4 rounded-xl hover:bg-[#2A2621]/5 transition-colors font-serif tracking-widest uppercase text-xs text-center">
              Explore Matches
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 h-[50vh] md:h-[100svh] relative z-10 flex items-center justify-center mt-12 md:mt-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full max-w-[400px] md:max-w-[500px] aspect-[3/4] md:aspect-auto md:h-[80vh]"
        >
          {/* Architectural Arch Frame */}
          <div className="absolute inset-0 border-[1.5px] border-[#E6D5C3] rounded-t-full border-b-0 overflow-hidden shadow-2xl bg-[#FBF9F6] flex items-end justify-center pb-12">
            <div className="absolute inset-2 border border-[#E6D5C3]/40 rounded-t-full border-b-0" />
            
            {/* Elegant Illustration / Silhouette */}
            <div className="relative z-10 text-center opacity-80 mix-blend-multiply">
              <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto w-1/2 md:w-auto">
                <path d="M100 0C44.7715 0 0 44.7715 0 100V300H200V100C200 44.7715 155.228 0 100 0Z" fill="url(#paint0_linear)"/>
                <path d="M100 150C116.569 150 130 136.569 130 120C130 103.431 116.569 90 100 90C83.4315 90 70 103.431 70 120C70 136.569 83.4315 150 100 150Z" fill="#F7F5EF"/>
                <path d="M140 220C140 197.909 122.091 180 100 180C77.9086 180 60 197.909 60 220V300H140V220Z" fill="#F7F5EF"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="100" y1="0" x2="100" y2="300" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E6D5C3" />
                    <stop offset="1" stopColor="#D4C4B7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="py-24 md:py-40 px-6 max-w-5xl mx-auto text-center relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <Crown size={32} className="mx-auto text-[#E6D5C3] mb-12" strokeWidth={1} />
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-[#2A2621] leading-tight mb-12 italic tracking-wide">
          "We believe marriage begins long before the wedding—it begins with the right introduction."
        </h2>
        <p className="text-[#8C7A6B] font-light text-[clamp(1rem,1.2vw,1.125rem)] leading-loose max-w-3xl mx-auto">
          In a world of fleeting connections, Vivaha stands as an institution of permanence. We meticulously curate every aspect of your journey, ensuring that your privacy is protected, your preferences are honored, and your introductions are profoundly meaningful.
        </p>
      </motion.div>
    </section>
  );
}

function JourneySection() {
  const steps = [
    { title: "Create Profile", icon: User },
    { title: "Get Verified", icon: Shield },
    { title: "Browse Members", icon: Search },
    { title: "Express Interest", icon: Heart },
    { title: "Mutual Acceptance", icon: CheckCircle },
    { title: "Private Conversations", icon: MessageCircle },
    { title: "Begin Forever", icon: Star },
  ];

  return (
    <section className="py-24 bg-[#FBF9F6] border-y border-[#E6D5C3]/40 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2A2621] mb-4">The Vivaha Journey</h2>
          <p className="text-[#8C7A6B] font-light">A meticulous path to your lifetime partner.</p>
        </div>

        {/* Desktop Horizontal, Mobile Vertical */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 lg:left-0 lg:top-8 w-0.5 lg:w-full h-full lg:h-0.5 bg-[#E6D5C3]/50 -translate-x-1/2 lg:translate-x-0 hidden md:block" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-row lg:flex-col items-center gap-6 lg:gap-4 w-full lg:w-auto relative z-10 mb-10 lg:mb-0 group"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-[#E6D5C3] shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:border-[#8C7A6B]">
                <step.icon size={20} className="text-[#8C7A6B]" strokeWidth={1.5} />
              </div>
              <div className="text-left lg:text-center w-full lg:w-32">
                <span className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold block mb-1">Step 0{idx + 1}</span>
                <h3 className="font-serif text-lg text-[#2A2621]">{step.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedMembersSection() {
  const members = [
    { name: "Aisha", age: 28, prof: "Architect", city: "Mumbai", match: 94 },
    { name: "Rohan", age: 31, prof: "Investment Banker", city: "London", match: 91 },
    { name: "Meera", age: 27, prof: "Surgeon", city: "Delhi", match: 88 },
    { name: "Vikram", age: 33, prof: "Entrepreneur", city: "Bangalore", match: 96 }
  ];

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2A2621] mb-4">Curated Estates</h2>
          <p className="text-[#8C7A6B] font-light">A glimpse into our exclusive community.</p>
        </div>
        <Link href="/matches" className="text-[#2A2621] text-xs uppercase tracking-widest font-semibold hover:text-[#8C7A6B] transition-colors border-b border-[#2A2621] pb-1">
          Explore All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {members.map((member, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="aspect-[3/4] bg-[#FBF9F6] border border-[#E6D5C3] rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500">
              {/* Blurred silhouette placeholder to represent premium lock */}
              <div className="absolute inset-0 bg-[#E6D5C3]/20 flex items-center justify-center">
                 <User size={60} className="text-[#8C7A6B]/30" strokeWidth={1} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2621]/90 via-[#2A2621]/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-serif text-2xl">{member.name}</span>
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><Shield size={8} className="text-white" /></div>
                </div>
                <p className="text-white/80 font-light text-sm mb-4">{member.age} • {member.prof} • {member.city}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#E6D5C3]">{member.match}% Match</span>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                    <Lock size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  const topics = [
    {
      title: "Verified Identity",
      desc: "Every profile undergoes rigorous government ID verification. Authenticity is the cornerstone of our community.",
      icon: Shield
    },
    {
      title: "Privacy First",
      desc: "Control who sees your photographs and details. Incognito mode ensures you only interact when you choose to.",
      icon: Lock
    },
    {
      title: "Curated Matching",
      desc: "Our algorithms respect your deepest preferences, delivering matches that align with your lifestyle and family values.",
      icon: Heart
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#2A2621] text-[#F7F5EF] relative z-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Why Families Trust Vivaha</h2>
          <div className="w-16 h-[1px] bg-[#8C7A6B] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {topics.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="border border-[#8C7A6B]/30 rounded-2xl p-10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <t.icon size={32} className="text-[#E6D5C3] mb-8" strokeWidth={1} />
              <h3 className="font-serif text-2xl text-white mb-4">{t.title}</h3>
              <p className="text-[#D4C4B7] font-light leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function PremiumSection() {
  return (
    <section className="py-24 md:py-40 px-6 relative z-20">
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-[#FBF9F6] to-white border border-[#E6D5C3] rounded-[3rem] p-10 md:p-20 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        <div className="w-full md:w-1/2 relative z-10 text-center md:text-left">
          <Crown size={40} className="text-[#8C7A6B] mb-8 mx-auto md:mx-0" strokeWidth={1} />
          <h2 className="font-serif text-3xl md:text-5xl text-[#2A2621] mb-6 leading-tight">A Lifetime Commitment.<br/>No Subscriptions.</h2>
          <p className="text-[#8C7A6B] font-light text-lg mb-8 leading-relaxed">
            We don't monetize your time. Pay once, and gain permanent access to full profiles, unlimited messaging, and premium privacy controls until you find your forever.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <span className="font-serif text-4xl text-[#2A2621]">₹5,000</span>
            <span className="text-[#8C7A6B] text-xs uppercase tracking-widest font-semibold">One-Time</span>
          </div>
          <Link href="/premium" className="inline-block bg-[#2A2621] text-white px-10 py-4 rounded-xl shadow-lg hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs">
            Unlock Lifetime Access
          </Link>
        </div>

        <div className="w-full md:w-1/2 relative z-10">
          <div className="bg-white border border-[#E6D5C3]/60 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between border-b border-[#E6D5C3]/40 pb-4 mb-4">
              <span className="text-[#8C7A6B] font-serif">Features</span>
              <span className="text-[#2A2621] font-serif flex items-center gap-1"><Crown size={14}/> Premium</span>
            </div>
            {[
              "View Complete Profiles", 
              "Unrestricted Image Gallery", 
              "Send Unlimited Messages", 
              "Incognito Privacy Mode", 
              "Priority Support"
            ].map((f, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-[#E6D5C3]/20 last:border-0">
                <span className="text-[#2A2621] font-light text-sm">{f}</span>
                <CheckCircle size={16} className="text-[#8C7A6B]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "How is Vivaha different from other platforms?", a: "Vivaha is built on exclusivity, privacy, and a one-time lifetime membership model. We do not use ads or recurring subscriptions, ensuring our goals align entirely with your success." },
    { q: "What does the verification process involve?", a: "Every member must submit a valid government ID. Our team manually reviews each profile to ensure absolute authenticity before granting access." },
    { q: "Is my data secure?", a: "Yes. Your privacy is paramount. Premium members can completely hide their profiles and only reveal them to accepted interests." }
  ];

  return (
    <section className="py-24 bg-[#FBF9F6] border-t border-[#E6D5C3]/40 relative z-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-[#2A2621] text-center mb-16">Inquiries</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E6D5C3] rounded-2xl bg-white overflow-hidden transition-all duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-serif text-lg text-[#2A2621]">{question}</span>
        <span className="text-[#8C7A6B]">{open ? <Minus size={18} /> : <Plus size={18} />}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-[#8C7A6B] font-light leading-relaxed">
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FinalCTASection() {
  return (
    <section className="py-32 md:py-48 px-6 text-center relative z-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative z-10">
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-[#2A2621] leading-tight mb-10 max-w-4xl mx-auto">
          Every lifelong story begins with a single <span className="italic font-light text-[#8C7A6B]">introduction.</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/register" className="w-full sm:w-auto bg-[#2A2621] text-white px-10 py-5 rounded-xl shadow-xl hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-sm">
            Create Your Profile
          </Link>
          <Link href="/matches" className="w-full sm:w-auto bg-transparent border border-[#2A2621] text-[#2A2621] px-10 py-5 rounded-xl hover:bg-[#2A2621]/5 transition-colors font-serif tracking-widest uppercase text-sm">
            Browse Members
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2A2621] text-[#F7F5EF] py-16 px-6 relative z-20 border-t border-[#8C7A6B]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl tracking-[0.2em] uppercase text-[#E6D5C3] mb-6">Vivaha</div>
          <p className="text-[#8C7A6B] font-light max-w-sm leading-relaxed">
            An exclusive matrimonial estate designed for privacy, authenticity, and lifelong commitments.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-white mb-6">Platform</h4>
          <ul className="space-y-4 text-[#8C7A6B] font-light text-sm">
            <li><Link href="/matches" className="hover:text-white transition-colors">Matches</Link></li>
            <li><Link href="/premium" className="hover:text-white transition-colors">Membership</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Member Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-white mb-6">Legal</h4>
          <ul className="space-y-4 text-[#8C7A6B] font-light text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#8C7A6B]/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#8C7A6B] text-xs font-light">© {new Date().getFullYear()} Vivaha Matrimony. All rights reserved.</p>
        <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2">Crafted with <Heart size={10}/> for Eternity</p>
      </div>
    </footer>
  );
}

export default function ClientHome() {
  return (
    <main className="w-full bg-[#F7F5EF] text-[#2A2621] selection:bg-[#E5D9CC]/50 font-sans relative">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none fixed z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <SunlightRays />
      <FloatingParticles />
      
      <HeroSection />
      <PhilosophySection />
      <JourneySection />
      <FeaturedMembersSection />
      <TrustSection />
      <PremiumSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
