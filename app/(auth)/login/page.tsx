"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, KeyRound, MailOpen } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"email" | "sent">("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useOtp, setUseOtp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })

    if (error) {
      setError(error.message)
    } else {
      setStep("sent")
    }
    setLoading(false)
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    })

    if (error) {
      setError(error.message)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-background -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />

      <motion.div 
        className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome</h2>
                <p className="text-muted-foreground">Sign in or create an account with your email</p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl bg-destructive/10 p-4 text-sm text-destructive text-center">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSendOtp}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="ml-1">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 h-12 rounded-xl bg-background/50 border-white/20 focus:border-primary"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-base font-medium shadow-md shadow-primary/20" disabled={loading}>
                  {loading ? "Sending..." : "Continue with Email"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => { setStep("email"); setUseOtp(false); setError(null); }}
                className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>

              {!useOtp ? (
                // Magic link state
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <MailOpen className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Check your inbox</h2>
                  <p className="text-muted-foreground mb-2">
                    We sent a sign-in link to
                  </p>
                  <p className="font-semibold text-foreground mb-6">{email}</p>
                  <p className="text-sm text-muted-foreground mb-8 bg-muted/50 rounded-xl p-4">
                    Click the <strong>"Sign in"</strong> button in the email to be automatically signed in.
                  </p>

                  <div className="border-t border-border/50 pt-6">
                    <p className="text-sm text-muted-foreground mb-3">Received a 6-digit code instead?</p>
                    <Button variant="outline" className="rounded-full" onClick={() => setUseOtp(true)}>
                      <KeyRound className="w-4 h-4 mr-2" /> Enter code manually
                    </Button>
                  </div>
                </div>
              ) : (
                // OTP code entry state
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Enter Code</h2>
                    <p className="text-muted-foreground">Enter the 6-digit code sent to <br/><span className="font-medium text-foreground">{email}</span></p>
                  </div>

                  {error && (
                    <div className="mb-6 rounded-xl bg-destructive/10 p-4 text-sm text-destructive text-center">
                      {error}
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleVerifyOtp}>
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="ml-1">Verification Code</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="otp"
                          type="text"
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="000000"
                          className="pl-10 h-12 rounded-xl bg-background/50 border-white/20 focus:border-primary tracking-widest text-lg text-center"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 rounded-xl text-base font-medium shadow-md shadow-primary/20" disabled={loading}>
                      {loading ? "Verifying..." : "Verify & Sign In"}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

