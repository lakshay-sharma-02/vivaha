"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MembershipSection() {
  const plans = [
    {
      name: "Basic",
      desc: "Begin your journey thoughtfully.",
      price: "Free",
      features: ["Verified Profile", "Profile Discovery", "Interest Requests", "Secure Messaging"],
      rotation: "-2deg",
      zIndex: 10,
    },
    {
      name: "Premium",
      desc: "Enhanced tools for meaningful discovery.",
      price: "₹2,499",
      features: ["Everything in Basic", "Advanced Filters", "Priority Discovery", "Read Receipts", "Profile Insights"],
      rotation: "0deg",
      zIndex: 20,
      featured: true,
    },
    {
      name: "Elite",
      desc: "Dedicated support for your family.",
      price: "₹9,999",
      features: ["Everything in Premium", "Relationship Consultant", "Priority Verification", "Dedicated Support", "Exclusive Events"],
      rotation: "1deg",
      zIndex: 10,
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#FDFBF7]">
      
      {/* 
        ENVIRONMENT: The Desk (Top 35%)
        Completely unobstructed photograph. 
      */}
      <div className="w-full h-[35vh] relative">
        <Image 
          src="/images/architecture/membership.jpg"
          alt="Vivaha Desk"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Massive Ivory Card (Bottom 65%)
        A solid, opaque paper surface containing the memberships.
      */}
      <div className="relative w-full bg-[#FDFBF7] flex flex-col items-center pt-24 pb-32 px-6 z-10 shadow-[0_-30px_60px_rgba(0,0,0,0.15)] border-t border-[#EBE6DF]">
        
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="space-y-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-[#2A2621] font-display tracking-tight">
              Membership that respects your journey.
            </h2>
          </div>
          
          {/* Individual Physical Paper Invitations resting on the main card surface */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 w-full pt-8">
            {plans.map((plan, idx) => (
              <motion.div 
                key={plan.name}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: plan.rotation }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col items-center text-center p-10 ${plan.featured ? 'w-[320px] lg:w-[340px] lg:-translate-y-8 bg-[#F4F1EA]' : 'w-[280px] lg:w-[300px] bg-[#FAF8F5]'}`}
                style={{
                  zIndex: plan.zIndex,
                  borderRadius: "1px",
                  border: "1px solid rgba(139,121,105,0.15)",
                  boxShadow: plan.featured 
                    ? "0 30px 50px -10px rgba(20,18,15,0.1), inset 0 2px 4px rgba(255,255,255,1)" 
                    : "0 15px 30px -10px rgba(20,18,15,0.05), inset 0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                <div className="space-y-3 mb-8">
                  <h3 className="text-2xl font-display text-[#2A2621] tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-[#8C7A6B] font-serif italic max-w-[160px] mx-auto">{plan.desc}</p>
                  <div className="text-3xl font-display text-[#2A2621] pt-4">{plan.price}</div>
                </div>
                
                <ul className="space-y-4 text-sm text-[#5A534B] w-full text-left font-medium mb-12">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-[#8C7A6B] text-xs font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="mt-auto text-xs font-bold text-[#2A2621] uppercase tracking-widest border-b border-[#2A2621]/30 pb-1 hover:border-[#2A2621] transition-colors">
                  Select {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
