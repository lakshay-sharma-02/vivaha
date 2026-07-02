"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { registerSchema, RegisterFormValues } from "@/shared/validation/auth-schemas";

import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import { useState } from "react";

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
    <main className="relative w-full h-screen flex flex-col md:flex-row bg-[#FDFBF7] overflow-hidden">
      
      {/* 
        ENVIRONMENT: The Registration Desk (Left 50%) 
        Untouched architectural photograph.
      */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivaha Registration Room"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Application Paper (Right 50%) 
        Solid opaque surface acting as the physical document.
      */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-24 z-10 bg-[#FDFBF7] relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] overflow-y-auto">
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
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">First Name</label>
                <input 
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
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Last Name</label>
                <input 
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
              <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Email Address</label>
              <input 
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
              <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Secure Password</label>
              <input 
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
              
              <div className="flex items-center justify-between">
                <button 
                  type="button" 
                  className="text-[10px] font-bold text-[#8C7A6B] hover:text-[#2A2621] uppercase tracking-[0.2em] transition-colors"
                >
                  Return to Estate
                </button>
                
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
