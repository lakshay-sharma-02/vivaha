"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, UserPlus } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMsg(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccessMsg("Account created! You can now sign in.")
        setIsLogin(true)
        setPassword("")
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Decorative premium background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-20 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-overlay" />
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glassmorphism Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl p-8 sm:p-10 rounded-3xl relative overflow-hidden">
          
          {/* Subtle shine effect on card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

          <div className="text-center mb-8">
            <motion.div 
              className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              key={isLogin ? "login-icon" : "register-icon"}
            >
              {isLogin ? <ShieldCheck className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
            </motion.div>
            <h2 className="text-3xl font-serif font-semibold tracking-tight mb-2">
              {isLogin ? "Welcome to Vivaha" : "Create Account"}
            </h2>
            <p className="text-muted-foreground text-sm px-4">
              {isLogin 
                ? "Sign in to access your dashboard and matches."
                : "Join the most trusted local matrimony network."
              }
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 rounded-xl bg-destructive/10 p-4 text-sm text-destructive text-center overflow-hidden"
              >
                {error}
              </motion.div>
            )}
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 rounded-xl bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400 text-center overflow-hidden"
              >
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80 font-medium ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namaste@example.com"
                  className="pl-12 h-14 rounded-2xl bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/80 font-medium ml-1">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-12 h-14 rounded-2xl bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-base font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group mt-2" 
              disabled={loading || !email || !password}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              type="button" 
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
                setSuccessMsg(null)
              }}
              className="ml-2 font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
