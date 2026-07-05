"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { registerSchema, RegisterFormValues } from "@/shared/validation/auth-schemas";

import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setAuthError(null);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        }
      }
    });

    if (error) {
      setAuthError(error.message);
    } else {
      router.push("/apply");
    }
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      
      {/* 
        ENVIRONMENT: The Registration Desk 
      */}
      <div className="relative w-full h-[35vh] md:h-screen">
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivah Registration Room"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Application Paper
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
              Begin your<br/>introduction.
            </h1>
            <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
              Step 1 of the Estate Application
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-12"
          >
            {/* First Name & Last Name (Side by Side) */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-2">
                <label htmlFor="firstName" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">First Name</label>
                <input 
                  id="firstName"
                  type="text" 
                  {...register("firstName")}
                  className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                  placeholder="e.g. Ananya"
                />
                {errors.firstName && (
                  <p className="text-[10px] text-red-900/60 font-medium italic pt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <label htmlFor="lastName" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Last Name</label>
                <input 
                  id="lastName"
                  type="text" 
                  {...register("lastName")}
                  className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                  placeholder="e.g. Sharma"
                />
                {errors.lastName && (
                  <p className="text-[10px] text-red-900/60 font-medium italic pt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Email Address</label>
              <input 
                id="email"
                type="email" 
                {...register("email")}
                className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-[10px] text-red-900/60 font-medium italic pt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Secure Password</label>
              <input 
                id="password"
                type="password" 
                {...register("password")}
                className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-[10px] text-red-900/60 font-medium italic pt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-8 space-y-4">
              {authError && (
                <div className="text-[10px] text-red-900/80 font-bold uppercase tracking-widest bg-red-50/50 p-3 rounded-sm border border-red-900/10 text-center">
                  {authError}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
                <Link 
                  href="/login" 
                  className="text-[10px] font-bold text-[#8C7A6B] hover:text-[#2A2621] uppercase tracking-[0.2em] transition-colors"
                >
                  Already a member?
                </Link>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50"
                >
                  <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                    {isSubmitting ? 'Authenticating...' : 'Continue Application'}
                  </span>
                  <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
                </button>
              </div>
            </div>
          </motion.form>
          
        </div>
      </div>
      
    </main>
  );
}
