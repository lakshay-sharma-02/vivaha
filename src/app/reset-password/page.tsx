"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/shared/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setErrorMessage("Your reset link has expired or is invalid. Please request a new one.");
        setStatus("error");
      }
    };
    checkSession();
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setStatus("error");
      return;
    }
    
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      
      <div className="relative w-full h-[35vh] md:h-screen">
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivaha Estate Foyer"
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
              Craft a new key.
            </h1>
            <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
              Enter your new secure password below.
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
                  Your password has been successfully updated. Escorting you back to the Estate...
                </p>
              </div>
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
                <label htmlFor="password" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">New Password</label>
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Confirm Password</label>
                <input 
                  id="confirmPassword"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-8 space-y-4">
                {status === "error" && (
                  <div className="flex flex-col gap-4 items-center">
                    <div className="w-full text-[10px] text-red-900/80 font-bold uppercase tracking-widest bg-red-50/50 p-3 rounded-sm border border-red-900/10 text-center">
                      {errorMessage}
                    </div>
                    {errorMessage.includes("expired") && (
                       <Link href="/forgot-password" className="text-xs font-bold text-[#8C7A6B] border-b border-[#8C7A6B] pb-1 hover:text-[#2A2621] hover:border-[#2A2621] transition-colors">
                         Request new link
                       </Link>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={status === "loading" || !password || !confirmPassword || errorMessage.includes("expired")}
                    className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 w-fit"
                  >
                    <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                      {status === "loading" ? 'Updating...' : 'Update Password'}
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
