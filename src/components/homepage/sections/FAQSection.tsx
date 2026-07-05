"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FAQSection() {
  const faqs = [
    {
      question: "How do you verify profiles?",
      answer: "Every member provides government-issued identification and educational credentials. Our trust team manually reviews each application to ensure authenticity before granting access.",
    },
    {
      question: "Can families participate?",
      answer: "Yes. We have designed specific, respectful pathways for families to collaborate in the journey, ensuring transparency while maintaining the dignity of the individuals involved.",
    },
    {
      question: "How is privacy maintained?",
      answer: "Your portrait and details are only visible to approved, verified members. We do not allow public indexing, and our architecture is built around absolute discretion.",
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#1A1814]">
      
      {/* 
        ENVIRONMENT: The Reading Lounge (Top 40%) 
        Completely unobstructed photograph.
      */}
      <div className="w-full h-[40vh] relative">
        <Image 
          src="/images/architecture/faq.jpg"
          alt="Vivah Reading Lounge"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Leather Book (Bottom 60%)
        A solid, opaque, dark leather-colored surface containing the text on cream 'paper' lines.
      */}
      <div className="relative w-full bg-[#0A0806] flex flex-col items-center pt-24 pb-32 px-6 z-10 shadow-[0_-30px_60px_rgba(0,0,0,0.4)] border-t border-[#3A2E24]/30">
        
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          
          <div className="w-full md:w-1/3 space-y-6 md:border-r border-[#D5C5B5]/10 pr-8">
            <h2 className="text-3xl md:text-4xl text-[#EAE4DD] font-display tracking-tight">
              Peace of mind.
            </h2>
            <p className="text-xs text-[#D5C5B5]/60 font-medium tracking-widest uppercase">
              Clear answers for a meaningful journey.
            </p>
          </div>
          
          {/* Physical FAQs */}
          <div className="w-full md:w-2/3 space-y-12">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group space-y-3"
              >
                <h3 className="text-lg md:text-xl font-display text-[#EAE4DD] tracking-tight">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#D5C5B5]/70 leading-loose font-medium max-w-[480px]">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
