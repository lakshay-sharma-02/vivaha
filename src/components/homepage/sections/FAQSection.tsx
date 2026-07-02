"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    q: "Is Vivaha free to join?",
    a: "Yes. Our Basic membership allows you to create a verified profile, discover other profiles, send interest requests, and use secure messaging at no cost. Premium options exist only for added convenience.",
  },
  {
    q: "How are profiles verified?",
    a: "Every profile undergoes a mandatory verification process involving official government ID checks and education credential reviews by our trust and safety team before becoming visible to others.",
  },
  {
    q: "Can my family participate?",
    a: "Absolutely. Vivaha is designed to support both independent journeys and family-supported matchmaking. You can choose how and when your family is involved in the process.",
  },
  {
    q: "Is my personal information private?",
    a: "Your privacy is our priority. We employ strict data protection controls, and you have complete authority over who sees your full profile, photographs, and contact information.",
  },
  {
    q: "How does Vivaha recommend profiles?",
    a: "We emphasize thoughtful compatibility based on shared values, lifestyle preferences, and relationship goals, allowing you to discover profiles that align with what truly matters to you.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center bg-[#F8F7F4] overflow-hidden">
      {/* Material Suggestion: Printed wedding invitation booklet (fine paper texture) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-16 w-full pt-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight">
            Questions We Often Hear.
          </h2>
          <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[500px] mx-auto leading-relaxed">
            We've answered the questions most visitors ask before beginning their journey.
          </p>
        </div>

        {/* Editorial Accordion - No heavy boxes, just elegant typography and fine lines */}
        <div className="w-full text-left">
          {questions.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-black/[0.06] last:border-0"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between py-8 text-left focus-visible:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-display text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-700)] transition-colors pr-8">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[var(--color-text-secondary)] shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 stroke-[1.5]" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-[var(--color-text-secondary)] text-md leading-relaxed max-w-[600px]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continuity Transition: Fades into the warm courtyard stone of the footer */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F2F1EC] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
