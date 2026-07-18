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
      password: password,
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
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-maroon-deep">
      <div className="relative w-full h-[35vh] md:h-screen">
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivah Estate Foyer"
          fill
          className="object-cover object-center grayscale opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon/30 to-transparent" />
      </div>

      <div className="w-full min-h-[65vh] md:h-screen flex flex-col justify-center px-6 py-12 md:p-12 lg:p-24 bg-maroon-deep relative overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 mb-16"
          >
            <div className="w-8 h-[1px] bg-gold/40 mb-6" />
            <h1 className="text-3xl md:text-4xl font-display text-cream tracking-tight leading-tight">
              Craft a new key.
            </h1>
            <p className="label text-gold-light">
              Enter your new secure password below.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="bg-maroon border border-gold/30 p-6 rounded-xl">
                <p className="text-sm text-cream/80 font-body leading-relaxed italic">
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
                <label htmlFor="password" className="label text-gold">New Password</label>
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full bg-transparent border-b border-gold/30 pb-2 text-sm text-cream font-medium placeholder-gold-light/30 focus:outline-none focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="label text-gold">Confirm Password</label>
                <input 
                  id="confirmPassword"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full bg-transparent border-b border-gold/30 pb-2 text-sm text-cream font-medium placeholder-gold-light/30 focus:outline-none focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-8 space-y-4">
                {status === "error" && (
                  <div className="flex flex-col gap-4 items-center">
                    <div className="w-full text-[10px] text-cream/80 font-bold uppercase tracking-widest bg-red/20 p-3 rounded-sm border border-red/30 text-center">
                      {errorMessage}
                    </div>
                    {errorMessage.includes("expired") && (
                       <Link href="/forgot-password" className="text-xs font-bold text-gold border-b border-gold pb-1 hover:text-gold-light hover:border-gold-light transition-colors">
                         Request new link
                       </Link>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={status === "loading" || !password || !confirmPassword || errorMessage.includes("expired")}
                    className="group flex items-center gap-4 text-xs font-bold text-gold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 w-fit"
                  >
                    <span className="border-b border-gold/30 pb-1 group-hover:border-gold transition-colors">
                      {status === "loading" ? "Updating..." : "Update Password"}
                    </span>
                    <span className="w-8 h-[1px] bg-gold/30 group-hover:bg-gold group-hover:w-12 transition-all duration-500" />
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
