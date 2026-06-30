"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import { Label } from "@/shared/ui/label/label"
import Link from "next/link"
import { createClient } from "@/shared/lib/supabase/client"
import { CheckCircle2, ArrowLeft } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/settings`,
    })

    if (resetError) {
      setError(resetError.message)
    } else {
      setIsSuccess(true)
    }
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(232,185,108,0.3)]">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h2 className="font-playfair text-3xl font-medium">Check your inbox</h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
              We&apos;ve sent a password reset link to <strong className="text-white">{email}</strong>. 
              The link expires in 1 hour.
            </p>
          </div>
          <Link href="/login" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="glass rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      
      <div className="flex flex-col space-y-3 text-center mb-12 relative z-10">
        <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
          Forgot Password?
        </h1>
        <p className="text-[15px] text-muted-foreground">
          No worries. Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="forgot-email">Email Address</Label>
          <Input
            id="forgot-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <Button className="w-full" type="submit" disabled={isLoading || !email}>
          {isLoading ? "Sending Link..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </motion.div>
  )
}
