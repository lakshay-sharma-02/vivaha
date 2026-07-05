"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/shared/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const supabase = createClient();
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      
      <div className="relative w-full h-[35vh] md:h-screen">
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivah Estate Foyer"
          fill
          className="object-cover object-center grayscale opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-[#2A2621]/20 mix-blend-multiply" />
      </div>

      <div className="w-full min-h-[65vh] md:h-screen flex flex-col justify-center px-6 py-12 md:p-12 lg:p-24 bg-[#FDFBF7] relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 mb-16"
          >
            <div className="w-8 h-[1px] bg-[#8C7A6B]/30 mb-6" />
            <h1 className="text-3xl md:text-4xl text-[#2A2621] font-display tracking-tight leading-tight">
              Lost your key?
            </h1>
            <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
              We will send you a link to reset your password.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="bg-[#FDF5E6] border border-[#E6D5C3] p-6 rounded-xl">
                <p className="text-sm text-[#2A2621] font-light leading-relaxed">
                  If an account exists for <span className="font-medium">{email}</span>, you will receive an email shortly with instructions to reset your password.
                </p>
              </div>
              <Link 
                href="/login"
                className="inline-block text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] border-b border-[#2A2621]/30 pb-1 hover:border-[#2A2621] transition-colors"
              >
                Return to Login
              </Link>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit} 
              className="space-y-10"
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="pt-8 space-y-4">
                {status === "error" && (
                  <div className="text-[10px] text-red-900/80 font-bold uppercase tracking-widest bg-red-50/50 p-3 rounded-sm border border-red-900/10 text-center">
                    {errorMessage}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
                  <Link 
                    href="/login"
                    className="text-[10px] font-bold text-[#8C7A6B] hover:text-[#2A2621] uppercase tracking-[0.2em] transition-colors"
                  >
                    Back to Login
                  </Link>
                  
                  <button 
                    type="submit" 
                    disabled={status === "loading" || !email}
                    className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 w-fit"
                  >
                    <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                      {status === "loading" ? 'Sending...' : 'Send Link'}
                    </span>
                    <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
                  </button>
                </div>
              </div>
            </motion.form>
          )}
          
        </div>
      </div>
      
    </main>
  );
}
