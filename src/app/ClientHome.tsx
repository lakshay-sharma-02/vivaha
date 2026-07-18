"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Lock, Shield, Crown, Search, MessageCircle, Heart, Star, Plus, Minus, ArrowRight, User, CheckCircle } from "lucide-react";

// --- Decorative Elements ---

function MarigoldGarland() {
  return (
    <div className="w-full relative z-20 my-0">
      <div className="gold-hairline" />
      <div className="marigold-garland mx-auto max-w-7xl" />
      <div className="gold-hairline" />
    </div>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const generated = Array.from({ length: window.innerWidth < 768 ? 15 : 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 25 + Math.random() * 45,
      size: 2 + Math.random() * 3,
      xOffset: Math.random() * 100 - 50,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-light opacity-20"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: ["-20vh", "120vh"], x: [0, p.xOffset, p.xOffset * -1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// --- Diya SVG component ---
function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" width="28" height="42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="diya-flame" d="M20 2 C18 10, 12 18, 12 24 C12 28, 16 32, 20 32 C24 32, 28 28, 28 24 C28 18, 22 10, 20 2Z" fill="#d4af37" opacity="0.9" />
      <path d="M20 6 C19 12, 15 18, 15 22 C15 25, 17 28, 20 28 C23 28, 25 25, 25 22 C25 18, 21 12, 20 6Z" fill="#f3d889" opacity="0.7" />
      {/* Diya base */}
      <path d="M10 32 L30 32 L28 38 L12 38 Z" fill="#8f1522" stroke="#d4af37" strokeWidth="0.8" />
      <rect x="14" y="38" width="12" height="6" rx="1" fill="#4a0e14" stroke="#d4af37" strokeWidth="0.5" />
    </svg>
  );
}

// --- Mandap Arch SVG ---
function MandapArch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" width="400" height="200" fill="none" xmlns="http://www.w3.org/2000/svg" className={`mandap-arch ${className}`}>
      {/* Outer arch */}
      <path d="M20 180 L20 80 Q20 10, 200 10 Q380 10, 380 80 L380 180" stroke="url(#archGold)" strokeWidth="2.5" fill="none" opacity="0.6" />
      {/* Inner arch */}
      <path d="M40 180 L40 90 Q40 25, 200 25 Q360 25, 360 90 L360 180" stroke="url(#archGold)" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Peacock/ornament at apex */}
      <circle cx="200" cy="18" r="6" stroke="#d4af37" strokeWidth="1.5" fill="#4a0e14" />
      <circle cx="200" cy="18" r="2.5" fill="#d4af37" />
      {/* Dangling ornaments */}
      <circle cx="60" cy="180" r="3" fill="#d4af37" opacity="0.5" />
      <circle cx="340" cy="180" r="3" fill="#d4af37" opacity="0.5" />
      <defs>
        <linearGradient id="archGold" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f3d889" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// --- Sections ---

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep">
      {/* Gold radial glow behind arch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        <MandapArch className="mb-4 w-72 md:w-96" />

        <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold/40 rounded-full bg-maroon-deep/80 backdrop-blur-sm mb-6">
          <Crown size={14} className="text-gold" />
          <span className="label text-gold-light">Exclusively by Invitation & Application</span>
        </div>

        <h1 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.15] mb-6">
          <span className="gold-text">Where Meaningful</span><br />
          <span className="gold-text">Journeys Begin.</span>
        </h1>

        <p className="text-gold-light/80 text-[clamp(0.95rem,1.3vw,1.15rem)] font-light leading-relaxed mb-10 max-w-xl mx-auto italic">
          An exclusive matrimony platform where trust, authenticity, and meaningful introductions create lifelong relationships.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/register" className="w-full sm:w-auto border border-gold text-gold px-8 py-4 rounded-xl hover:bg-gold hover:text-maroon-deep transition-all duration-300 font-display tracking-widest uppercase text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-gold/10">
            Create Your Profile <ArrowRight size={14} />
          </Link>
          <Link href="/matches" className="w-full sm:w-auto border border-gold/50 text-gold-light/80 px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-colors font-body tracking-widest uppercase text-xs text-center italic">
            Explore Matches
          </Link>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-maroon-deep to-transparent pointer-events-none z-10" />
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
        <Crown size={32} className="mx-auto text-gold mb-12" strokeWidth={1} />
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-cream leading-tight mb-12">
          &ldquo;We believe marriage begins long before the wedding—it begins with the right introduction.&rdquo;
        </h2>
        <p className="text-gold-light/70 font-light text-[clamp(0.95rem,1.2vw,1.125rem)] leading-loose max-w-3xl mx-auto italic">
          In a world of fleeting connections, Vivah stands as an institution of permanence. We meticulously curate every aspect of your journey, ensuring that your privacy is protected, your preferences are honored, and your introductions are profoundly meaningful.
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
    <section className="py-24 bg-cream border-y border-gold/30 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">The Vivah Journey</h2>
          <p className="text-maroon/70 font-body italic">A meticulous path to your lifetime partner.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between relative">
          <div className="absolute left-1/2 lg:left-0 lg:top-8 w-0.5 lg:w-full h-full lg:h-0.5 bg-gold/30 -translate-x-1/2 lg:translate-x-0 hidden md:block" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-row lg:flex-col items-center gap-6 lg:gap-4 w-full lg:w-auto relative z-10 mb-10 lg:mb-0 group"
              >
                <div className="w-16 h-16 rounded-full bg-cream border border-gold shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} className="text-maroon" strokeWidth={1.5} />
                </div>
                <div className="text-left lg:text-center w-full lg:w-32">
                  <span className="label text-maroon/60 block mb-1">Step 0{idx + 1}</span>
                  <h3 className="font-display text-lg text-ink">{step.title}</h3>
                </div>
              </motion.div>
            );
          })}
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
    { name: "Vikram", age: 33, prof: "Entrepreneur", city: "Bangalore", match: 96 },
  ];

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">Curated Estates</h2>
          <p className="text-gold-light/60 font-body italic">A glimpse into our exclusive community.</p>
        </div>
        <Link href="/matches" className="label text-gold hover:text-gold-light transition-colors border-b border-gold pb-1">
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
            <div className="aspect-[3/4] bg-cream border border-gold rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-cream flex items-center justify-center">
                 <User size={60} className="text-maroon/20" strokeWidth={1} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/95 via-maroon/60 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 text-cream">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-2xl">{member.name}</span>
                  <div className="w-4 h-4 bg-gold/20 rounded-full flex items-center justify-center">
                    <Shield size={8} className="text-gold" />
                  </div>
                </div>
                <p className="text-gold-light/70 font-body text-sm mb-4 italic">{member.age} &bull; {member.prof} &bull; {member.city}</p>
                <div className="flex items-center justify-between">
                  <span className="label text-gold">{member.match}% Match</span>
                  <div className="bg-gold/20 hover:bg-gold/30 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                    <Lock size={14} className="text-gold" />
                  </div>
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
      icon: Shield,
    },
    {
      title: "Privacy First",
      desc: "Control who sees your photographs and details. Incognito mode ensures you only interact when you choose to.",
      icon: Lock,
    },
    {
      title: "Curated Matching",
      desc: "Our algorithms respect your deepest preferences, delivering matches that align with your lifestyle and family values.",
      icon: Heart,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-cream text-ink relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl md:text-5xl text-ink mb-6">Why Families Trust Vivah</h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {topics.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="border border-gold/40 bg-cream rounded-2xl p-10 hover:shadow-lg transition-shadow outline outline-1 outline-maroon/10 -outline-offset-[3px]"
              >
                <Icon size={32} className="text-maroon mb-8" strokeWidth={1} />
                <h3 className="font-display text-2xl text-ink mb-4">{t.title}</h3>
                <p className="text-maroon/70 font-body leading-relaxed italic">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PremiumSection() {
  return (
    <section className="py-24 md:py-40 px-6 relative z-20">
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-maroon to-maroon-deep border border-gold/40 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        {/* Gold glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full md:w-1/2 relative z-10 text-center md:text-left">
          <Crown size={40} className="text-gold mb-8 mx-auto md:mx-0" strokeWidth={1} />
          <h2 className="font-display text-3xl md:text-5xl text-cream mb-6 leading-tight">A Lifetime Commitment.<br/>No Subscriptions.</h2>
          <p className="text-gold-light/70 font-body text-lg mb-8 leading-relaxed italic">
            We don&apos;t monetize your time. Pay once, and gain permanent access to full profiles, unlimited messaging, and premium privacy controls until you find your forever.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <span className="font-display text-4xl gold-text">₹5,000</span>
            <span className="label text-gold-light">One-Time</span>
          </div>
          <Link href="/premium" className="inline-block border border-gold text-gold px-10 py-4 rounded-xl hover:bg-gold hover:text-maroon-deep transition-all font-display tracking-widest uppercase text-xs shadow-lg shadow-gold/10">
            Unlock Lifetime Access
          </Link>
        </div>

        <div className="w-full md:w-1/2 relative z-10">
          <div className="bg-maroon-deep/80 border border-gold/30 rounded-2xl p-8 shadow-sm backdrop-blur-sm">
            <div className="flex justify-between border-b border-gold/20 pb-4 mb-4">
              <span className="text-gold-light/70 font-body">Features</span>
              <span className="text-gold font-display flex items-center gap-1"><Crown size={14} /> Premium</span>
            </div>
            {[
              "View Complete Profiles",
              "Unrestricted Image Gallery",
              "Send Unlimited Messages",
              "Incognito Privacy Mode",
              "Priority Support",
            ].map((f, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gold/10 last:border-0">
                <span className="text-cream/80 font-body text-sm">{f}</span>
                <CheckCircle size={16} className="text-gold" />
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
    { q: "How is Vivah different from other platforms?", a: "Vivah is built on exclusivity, privacy, and a one-time lifetime membership model. We do not use ads or recurring subscriptions, ensuring our goals align entirely with your success." },
    { q: "What does the verification process involve?", a: "Every member must submit a valid government ID. Our team manually reviews each profile to ensure absolute authenticity before granting access." },
    { q: "Is my data secure?", a: "Yes. Your privacy is paramount. Premium members can completely hide their profiles and only reveal them to accepted interests." },
  ];

  return (
    <section className="py-24 bg-cream border-t border-gold/30 relative z-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-ink text-center mb-16">Inquiries</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gold/40 rounded-2xl bg-cream overflow-hidden transition-all duration-300 outline outline-1 outline-maroon/10 -outline-offset-[3px]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-display text-lg text-ink">{question}</span>
        <span className="text-maroon">{open ? <Minus size={18} /> : <Plus size={18} />}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-maroon/70 font-body leading-relaxed italic">
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FinalCTASection() {
  return (
    <section className="py-32 md:py-48 px-6 text-center relative z-20 overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative z-10">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-tight mb-10 max-w-4xl mx-auto">
          <span className="gold-text">Every lifelong story begins</span><br />
          with a single <span className="gold-text italic">introduction.</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/register" className="w-full sm:w-auto border border-gold text-gold px-10 py-5 rounded-xl hover:bg-gold hover:text-maroon-deep transition-all font-display tracking-widest uppercase text-sm shadow-lg shadow-gold/10">
            Create Your Profile
          </Link>
          <Link href="/matches" className="w-full sm:w-auto border border-gold/40 text-gold-light/80 px-10 py-5 rounded-xl hover:border-gold hover:text-gold transition-colors font-body tracking-widest uppercase text-sm italic">
            Browse Members
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-maroon-deep text-cream py-16 px-6 relative z-20 border-t border-gold/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-display text-2xl tracking-[0.2em] uppercase gold-text mb-6">Vivah</div>
          <p className="text-gold-light/60 font-body max-w-sm leading-relaxed italic">
            An exclusive matrimony platform designed for privacy, authenticity, and lifelong commitments.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg text-cream mb-6">Platform</h4>
          <ul className="space-y-4 text-gold-light/60 font-body text-sm italic">
            <li><Link href="/matches" className="hover:text-gold transition-colors">Matches</Link></li>
            <li><Link href="/premium" className="hover:text-gold transition-colors">Membership</Link></li>
            <li><Link href="/dashboard" className="hover:text-gold transition-colors">Member Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-cream mb-6">Legal</h4>
          <ul className="space-y-4 text-gold-light/60 font-body text-sm italic">
            <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-gold transition-colors">Contact Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-6 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="diya-group"><Diya /></div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gold-light/50 text-xs font-body italic">&copy; {new Date().getFullYear()} Vivah Matrimony. All rights reserved.</p>
        <p className="text-gold-light/50 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 font-body">Crafted with <Heart size={10} /> for Eternity</p>
      </div>
    </footer>
  );
}

export default function ClientHome() {
  return (
    <main className="w-full bg-background text-text-primary font-body relative">
      <HeroSection />
      <MarigoldGarland />
      <PhilosophySection />
      <MarigoldGarland />
      <JourneySection />
      <MarigoldGarland />
      <FeaturedMembersSection />
      <MarigoldGarland />
      <TrustSection />
      <MarigoldGarland />
      <PremiumSection />
      <MarigoldGarland />
      <FAQSection />
      <MarigoldGarland />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
