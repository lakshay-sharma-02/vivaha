"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Crown,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Shield,
  MessageCircle,
  Eye,
  Lock,
  Heart,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";

// --- Shared Decorative Elements ---

const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
    <motion.div 
      className="absolute top-[-10%] w-[1200px] h-[800px] bg-gradient-radial from-[#FDF5E6]/40 via-[#FDF5E6]/5 to-transparent blur-[80px]"
      animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-[-20%] left-[40%] w-[400px] h-[1000px] bg-gradient-to-b from-[#FFF8E7]/30 to-transparent blur-[60px] origin-top transform rotate-12"
      animate={{ opacity: [0.2, 0.4, 0.2], rotate: [12, 15, 12] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => {
      const type = i % 5 === 0 ? 'petal' : (i % 3 === 0 ? 'bokeh' : 'dust');
      return {
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -20}%`,
        delay: Math.random() * 20,
        duration: 30 + Math.random() * 40,
        size: type === 'petal' ? 8 + Math.random() * 12 : type === 'bokeh' ? 40 + Math.random() * 60 : 2 + Math.random() * 4,
        xOffset: Math.random() * 200 - 100
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 fixed">
      {particles.map((p) => {
        if (p.type === 'petal') {
          return (
            <motion.div
              key={p.id}
              className="absolute opacity-40 mix-blend-multiply"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{
                y: ["0vh", "120vh"],
                x: [0, p.xOffset, p.xOffset * 1.5],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8 2 2 6 2 12C2 18 8 22 12 22C16 22 22 18 22 12C22 6 16 2 12 2Z" fill="#FDF5E6" stroke="#E6D5C3" strokeWidth="0.5" />
              </svg>
            </motion.div>
          );
        } else if (p.type === 'bokeh') {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white opacity-[0.02] mix-blend-overlay blur-md"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: ["0vh", "120vh"], x: [0, p.xOffset] }}
              transition={{ duration: p.duration * 1.5, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          );
        } else {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#E6D5C3] opacity-20 blur-[1px]"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: ["0vh", "120vh"], x: [0, p.xOffset / 2, p.xOffset] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          );
        }
      })}
    </div>
  );
};

const AbstractArch = () => (
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[1200px] pointer-events-none z-0 opacity-10 flex justify-center fixed">
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-t-[600px] border-b-0 relative">
      <div className="absolute inset-3 border border-[#8C7A6B]/50 rounded-t-[580px] border-b-0" />
    </div>
  </div>
);

// --- Content Data ---

const FEATURES = [
  {
    icon: <Shield size={24} className="text-[#8C7A6B]" strokeWidth={1.5} />,
    title: "Verified Members Only",
    desc: "Every profile undergoes rigorous verification. Engage only with authentic individuals who are equally committed.",
  },
  {
    icon: <MessageCircle size={24} className="text-[#8C7A6B]" strokeWidth={1.5} />,
    title: "Meaningful Conversations",
    desc: "Send and receive unlimited messages. We believe true connection starts with a conversation, unhindered by paywalls.",
  },
  {
    icon: <Eye size={24} className="text-[#8C7A6B]" strokeWidth={1.5} />,
    title: "Complete Profiles",
    desc: "Discover every nuance. Unlock full biographies, lifestyle choices, family details, and uncensored image galleries.",
  },
  {
    icon: <Lock size={24} className="text-[#8C7A6B]" strokeWidth={1.5} />,
    title: "Privacy First",
    desc: "Control who sees your photos and information. The estate remains a private space dedicated to respect and confidentiality.",
  }
];

const COMPARISON = [
  { feature: "Basic Profile Visibility", free: true, premium: true },
  { feature: "Curated Daily Matches", free: true, premium: true },
  { feature: "View Complete Profiles", free: false, premium: true },
  { feature: "Full Image Gallery Access", free: false, premium: true },
  { feature: "Send Unlimited Interests", free: false, premium: true },
  { feature: "Unlimited Secure Chat", free: false, premium: true },
  { feature: "Advanced Compatibility Insights", free: false, premium: true },
  { feature: "See Profile Visitors", free: false, premium: true },
  { feature: "Priority Search Ranking", free: false, premium: true },
];

const FAQS = [
  {
    q: "Why is Vivaha a single lifetime payment?",
    a: "We believe the journey to finding a life partner shouldn't be monetized by the month. A single payment aligns our goals with yours: helping you find a meaningful connection without the pressure of a recurring subscription."
  },
  {
    q: "What does the verification process involve?",
    a: "Every member submits government-issued identification which is verified against their profile. This ensures our community remains exclusive, authentic, and safe for all members."
  },
  {
    q: "Can I control who sees my photos?",
    a: "Absolutely. Privacy is our foundation. Premium members can choose to blur their photos to the general public, only revealing them to matches they have explicitly accepted."
  },
  {
    q: "Is my payment secure?",
    a: "Yes. All transactions are processed through enterprise-grade encrypted payment gateways. We do not store your financial information on our servers."
  }
];

// --- Page Component ---

export default function PremiumMembershipPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // 1. Create order
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "premium_lifetime" }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.error("Payment API Error Details:", data.details);
        alert(data.error + (data.details ? `\nDetails: ${data.details}` : ""));
        setIsProcessing(false);
        return;
      }

      // 2. Open Razorpay
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Vivaha",
        description: "Lifetime Premium Membership",
        order_id: data.orderId,
        handler: async function (response: any) {
          // 3. Verify payment
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              router.push("/dashboard?upgrade=success");
            } else {
              alert(verifyData.error || "Payment verification failed.");
            }
          } catch (err) {
            alert("Error verifying payment.");
          } finally {
            setIsProcessing(false);
          }
        },
        theme: {
          color: "#2A2621",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert("Payment failed: " + response.error.description);
        setIsProcessing(false);
      });
      rzp.open();

    } catch (err) {
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] font-sans selection:bg-[#E5D9CC]/50 relative overflow-x-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      {/* Background Texture & Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      </div>
      <SunlightRays />
      <AbstractArch />
      <FloatingParticles />

      {/* Floral Installations */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-10 opacity-70 mix-blend-multiply">
        <Image src="/images/floral_top_left.jpg" alt="" fill className="object-contain object-top-left drop-shadow-xl" priority />
      </div>
      <div className="fixed top-0 right-0 w-[550px] h-[550px] pointer-events-none z-10 opacity-70 mix-blend-multiply transform translate-x-12 -translate-y-4">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-contain object-top-right drop-shadow-xl" priority />
      </div>
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] pointer-events-none z-0 opacity-15 mix-blend-multiply transform -scale-y-100">
        <Image src="/images/floral_top_right.jpg" alt="" fill className="object-cover object-bottom-left" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F7F5EF]/60 backdrop-blur-3xl px-10 py-6 flex justify-between items-center transition-all border-b border-[#E6D5C3]/40">
        <div className="flex items-center gap-6">
          <Link href="/matches" className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6D5C3] bg-white text-[#8C7A6B] hover:text-[#2A2621] hover:shadow-md transition-all duration-300 group">
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#8C7A6B] flex items-center justify-center relative">
              <span className="font-serif text-[#8C7A6B] text-lg leading-none pt-1">V</span>
            </div>
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#8C7A6B] hidden sm:block">Vivaha</span>
          </div>
        </div>
      </header>

      <main className="relative z-20 pb-40">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 mx-auto border border-[#E6D5C3] bg-[#FBF9F6] rounded-full flex items-center justify-center shadow-sm mb-8 relative">
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply rounded-full" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              <Crown size={24} className="text-[#8C7A6B]" strokeWidth={1.5} />
            </div>

            <h1 className="font-serif text-[4rem] md:text-[5rem] text-[#2A2621] leading-tight mb-8 drop-shadow-md">
              Begin Your <span className="italic font-light text-[#8C7A6B]">Forever.</span>
            </h1>
            
            <p className="text-[#8C7A6B] text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl mx-auto tracking-wide">
              We believe meaningful relationships deserve privacy, authenticity, and commitment. Enter an exclusive estate curated for those seeking a lifelong connection.
            </p>

            <motion.button 
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-[#2A2621] text-white px-10 py-5 rounded-xl shadow-[0_20px_40px_-10px_rgba(42,38,33,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(42,38,33,0.5)] hover:bg-[#1A1815] transition-all duration-500 font-serif tracking-widest uppercase text-sm flex flex-col items-center justify-center gap-1 mx-auto relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span>{isProcessing ? "Processing..." : "Become a Lifetime Member"}</span>
              <span className="text-[10px] text-white/60 tracking-[0.2em]">One-Time Investment • ₹5,000</span>
            </motion.button>
          </motion.div>
        </section>

        {/* ALTERNATING CONTENT BLOCKS */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="space-y-32">
            {FEATURES.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-[2rem] bg-[#FBF9F6] border border-[#E6D5C3]/60 shadow-[0_20px_50px_-15px_rgba(230,213,195,0.5)] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
                    <div className="absolute inset-4 border border-[#FDF5E6]/50 rounded-[1.5rem]" />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FDF5E6] to-[#FBF9F6] shadow-inner border border-[#E6D5C3]/30 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="font-serif text-3xl md:text-4xl text-[#2A2621] mb-6 tracking-wide">{feature.title}</h3>
                  <p className="text-[#8C7A6B] font-light leading-relaxed text-lg max-w-md mx-auto md:mx-0">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TRUST NUMBERS */}
        <section className="py-24 relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-[#FBF9F6] rounded-[3rem] p-16 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                {[
                  { num: "10,000+", label: "Verified Members" },
                  { num: "98%", label: "Profile Authenticity" },
                  { num: "95%", label: "Satisfaction Rate" },
                  { num: "500+", label: "Successful Matches" }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <p className="font-serif text-4xl text-[#2A2621] mb-3">{stat.num}</p>
                    <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-24 px-6 max-w-4xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl text-[#2A2621] tracking-wide mb-4">An Exclusive Experience</h2>
            <p className="text-[#8C7A6B] font-light">Elevate your journey with uncompromising quality.</p>
          </motion.div>

          <div className="bg-[#FBF9F6] rounded-[2rem] border border-[#E6D5C3]/60 shadow-[0_30px_60px_-15px_rgba(230,213,195,0.4)] overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
            
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#FDF5E6]/80 border-b border-[#E6D5C3]/60 p-6 relative z-10 backdrop-blur-sm">
              <div className="font-serif text-[#8C7A6B] flex items-center">Features</div>
              <div className="text-center font-serif text-[#8C7A6B]">Guest</div>
              <div className="text-center font-serif text-[#2A2621] text-lg flex flex-col items-center justify-center">
                <Crown size={16} className="mb-1 text-[#8C7A6B]" />
                Lifetime
              </div>
            </div>

            {/* Rows */}
            <div className="relative z-10">
              {COMPARISON.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-3 p-6 border-b border-[#E6D5C3]/30 hover:bg-[#FDF5E6]/30 transition-colors ${idx === COMPARISON.length - 1 ? 'border-none' : ''}`}>
                  <div className="text-[#2A2621] font-light text-sm flex items-center">{row.feature}</div>
                  <div className="flex justify-center items-center">
                    {row.free ? <CheckCircle size={18} className="text-[#A3998D]" strokeWidth={1.5} /> : <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5C3]" />}
                  </div>
                  <div className="flex justify-center items-center">
                    {row.premium ? <CheckCircle size={20} className="text-[#2A2621]" strokeWidth={2} /> : <XCircle size={18} className="text-[#E6D5C3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS (Editorial Style) */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                quote: "Vivaha doesn't feel like a matrimonial site. It feels like a private club where respect and privacy are actually prioritized. I found my partner within three months.",
                author: "Ananya & Rohan",
                city: "Mumbai"
              },
              {
                quote: "The complete absence of monthly subscriptions allowed us to focus on the connection, rather than the clock ticking on a billing cycle. Worth every penny.",
                author: "Meera & Siddharth",
                city: "London"
              }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className="bg-transparent border border-[#E6D5C3] rounded-[2rem] p-12 relative group hover:bg-[#FBF9F6] transition-colors duration-500"
              >
                <div className="absolute -top-6 left-10 text-[6rem] font-serif text-[#E6D5C3] opacity-30 leading-none group-hover:text-[#D4C4B7] transition-colors">"</div>
                <p className="font-serif text-[#2A2621] text-xl leading-relaxed mb-8 relative z-10 italic">
                  {testimonial.quote}
                </p>
                <div className="relative z-10">
                  <p className="text-[#2A2621] text-sm uppercase tracking-widest font-semibold">{testimonial.author}</p>
                  <p className="text-[#8C7A6B] text-xs uppercase tracking-wider mt-1">{testimonial.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl text-[#2A2621] tracking-wide">Common Inquiries</h2>
          </motion.div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pt-20 pb-32 px-6 flex flex-col items-center text-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl bg-gradient-to-b from-[#FBF9F6] to-[#F7F5EF] border border-[#E6D5C3] rounded-[3rem] p-16 md:p-24 shadow-[0_20px_60px_-15px_rgba(230,213,195,0.6)] relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
            
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20 transform translate-x-10 -translate-y-10 pointer-events-none">
                <Image src="/images/floral_top_right.jpg" alt="" fill className="object-cover" />
            </div>
            
            <div className="relative z-10">
              <h2 className="font-serif text-[3rem] md:text-[4rem] text-[#2A2621] leading-tight mb-8">
                Your story deserves<br/><span className="italic font-light text-[#8C7A6B]">the right beginning.</span>
              </h2>
              
              <button onClick={handlePayment} disabled={isProcessing} className="bg-[#2A2621] text-white px-12 py-5 rounded-xl shadow-[0_20px_40px_-10px_rgba(42,38,33,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(42,38,33,0.5)] hover:bg-[#1A1815] transition-all duration-500 font-serif tracking-widest uppercase text-sm disabled:opacity-70">
                {isProcessing ? "Processing..." : "Unlock Lifetime Access"}
              </button>
            </div>
          </motion.div>
        </section>
        
      </main>
    </div>
  );
}

// ------------------------------------------------
// FAQ Accordion Component
// ------------------------------------------------
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#E6D5C3] rounded-2xl bg-[#FBF9F6] overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-serif text-lg text-[#2A2621]">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#8C7A6B]"
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-2 text-[#8C7A6B] font-light leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
