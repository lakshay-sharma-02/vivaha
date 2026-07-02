"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui";

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
  {
    q: "Can I cancel my membership anytime?",
    a: "Yes. If you choose to upgrade to a paid membership, you can cancel your subscription at any time through your account settings with complete transparency and no hidden fees.",
  },
  {
    q: "How do conversations begin?",
    a: "Conversations unlock only when there is mutual interest. Once an interest request is accepted, both individuals can communicate respectfully within our secure messaging platform.",
  },
  {
    q: "How can I contact support?",
    a: "Our dedicated support team is available via email and phone. You can find our contact details in the footer or visit our comprehensive Help Centre for immediate assistance.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-surface-secondary">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12 w-full">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl text-text-primary">
            Questions We Often Hear.
          </h2>
          <p className="text-md md:text-lg text-text-secondary max-w-[680px] mx-auto">
            We've answered the questions most visitors ask before beginning their journey.
          </p>
        </div>

        <div className="w-full text-left space-y-4">
          {questions.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-surface rounded-[var(--radius-lg)] shadow-[var(--shadow-low)] overflow-hidden transition-shadow duration-[var(--animate-fast)] hover:shadow-[var(--shadow-medium)]"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:bg-surface-secondary"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-text-primary">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-text-secondary shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-text-secondary text-md leading-relaxed border-t border-border mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="pt-4">
          <Button variant="ghost" size="lg">Still Have Questions?</Button>
        </div>
      </div>
    </section>
  );
}
