"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { loginSchema, LoginFormValues } from "@/shared/validation/auth-schemas";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"password" | "magic_link">("password");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    const supabase = createClient();
    
    if (loginMethod === "password") {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setAuthError("Incorrect email or password. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setMagicLinkSent(true);
      }
    }
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      
      {/* 
        ENVIRONMENT: The Estate Foyer
      */}
      <div className="relative w-full h-[35vh] md:h-screen">
        {/* We reuse the architecture asset but style it to feel like returning home */}
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivah Estate Foyer"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#2A2621]/10 mix-blend-multiply" />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Login Interface
      */}
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
              Welcome back.
            </h1>
            <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
              Return to your introductions
            </p>
          </motion.div>

          {magicLinkSent ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="bg-[#FDF5E6] border border-[#E6D5C3] p-6 rounded-xl">
                <p className="text-sm text-[#2A2621] font-light leading-relaxed">
                  A magic link has been sent to your email. Click the link to instantly securely log into your account.
                </p>
              </div>
              <button 
                onClick={() => setMagicLinkSent(false)}
                className="inline-block text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] border-b border-[#2A2621]/30 pb-1 hover:border-[#2A2621] transition-colors"
              >
                Use a different method
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-10"
            >
              {/* Login Method Toggle */}
              <div className="flex gap-4 border-b border-[#2A2621]/10 pb-4">
                <button
                  type="button"
                  onClick={() => setLoginMethod("password")}
                  className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${loginMethod === "password" ? "text-[#2A2621]" : "text-[#8C7A6B]/50 hover:text-[#8C7A6B]"}`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("magic_link")}
                  className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${loginMethod === "magic_link" ? "text-[#2A2621]" : "text-[#8C7A6B]/50 hover:text-[#8C7A6B]"}`}
                >
                  Magic Link
                </button>
              </div>

              {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Email Address</label>
              <input 
                id="email"
                type="email" 
                {...register("email")}
                className="block w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-[10px] text-red-900/60 font-medium italic pt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            {loginMethod === "password" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Secure Password</label>
                  <Link href="/forgot-password" className="text-[9px] font-bold text-[#8C7A6B]/70 hover:text-[#2A2621] uppercase tracking-widest transition-colors">
                    Lost Key?
                  </Link>
                </div>
                <input 
                  id="password"
                  type="password" 
                  {...register("password", { required: loginMethod === "password" })}
                  className="block w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                  placeholder="••••••••"
                />
                {errors.password && loginMethod === "password" && (
                  <p className="text-[10px] text-red-900/60 font-medium italic pt-1">{errors.password.message}</p>
                )}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-8 space-y-4">
              {authError && (
                <div className="text-[10px] text-red-900/80 font-bold uppercase tracking-widest bg-red-50/50 p-3 rounded-sm border border-red-900/10 text-center">
                  {authError}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
                <Link 
                  href="/register"
                  className="text-[10px] font-bold text-[#8C7A6B] hover:text-[#2A2621] uppercase tracking-[0.2em] transition-colors"
                >
                  No account? Apply
                </Link>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 w-fit"
                >
                  <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                    {isSubmitting ? 'Unlocking...' : 'Enter Estate'}
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
