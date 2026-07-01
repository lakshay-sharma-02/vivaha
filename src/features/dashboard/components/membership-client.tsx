"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Crown, CheckCircle2, Star, ShieldCheck, ArrowRight, Lock } from "lucide-react"
import { toast } from "sonner"

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface MembershipClientProps {
  userEmail?: string;
  userProfile?: {
    first_name: string;
    last_name: string;
    phone: string | null;
  } | null;
}

export default function MembershipClient({ userEmail, userProfile }: MembershipClientProps) {
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handleUpgrade = async () => {
    setIsProcessing(true)
    
    try {
      // 1. Create order on our backend
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "premium_lifetime" })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      // 2. Initialize Razorpay Options
      const options = {
        key: data.keyId, 
        amount: data.amount,
        currency: data.currency,
        name: "Vivaha Premium",
        description: "Lifetime Premium Matchmaking Access",
        order_id: data.orderId,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          // 3. Verify payment on our backend
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          })
          
          const verifyData = await verifyRes.json()
          if (verifyRes.ok) {
            toast.success("Welcome to Vivaha Premium!")
            window.location.reload()
          } else {
            toast.error("Verification Failed: " + verifyData.error)
          }
        },
        prefill: {
          name: userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "Vivaha Member",
          email: userEmail || "member@example.com",
          contact: userProfile?.phone || "9999999999"
        },
        theme: {
          color: "#E8B96C" // Our primary brand color
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function (response: { error: { description: string } }) {
        toast.error("Payment failed: " + response.error.description)
      })
      
      rzp.open()

    } catch (err) {
      toast.error("Error: " + (err as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
    <div className="space-y-12 pb-24 max-w-5xl">
      <section className="pt-8 text-center max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">Vivaha Premium</h1>
          <p className="text-white/60 text-lg">
            Invest in your future. Unlock unlimited interests, priority matchmaking, and complete privacy control.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
        
        {/* Free Tier Card */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 opacity-70">
          <h3 className="text-xl font-playfair mb-1">Standard Membership</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-medium">₹0</span>
            <span className="text-white/40 text-sm">/ forever</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0" />
              <span className="text-sm text-white/70">Create a beautiful profile</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0" />
              <span className="text-sm text-white/70">Browse curated Discover feed</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0" />
              <span className="text-sm text-white/70">Send 1 Free Interest</span>
            </div>
            <div className="flex items-start gap-3">
              <XIcon className="w-5 h-5 text-white/20 shrink-0" />
              <span className="text-sm text-white/40 line-through">Unlimited Interests</span>
            </div>
          </div>

          <div className="w-full py-3 rounded-full bg-white/10 text-white/50 text-center font-medium text-sm">
            Current Plan
          </div>
        </div>

        {/* Premium Tier Card */}
        <div className="p-10 rounded-3xl bg-gradient-to-b from-primary/20 to-zinc-950 border border-primary/30 relative overflow-hidden shadow-2xl shadow-primary/10">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="absolute top-0 right-8 px-4 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-wider rounded-b-lg">
            Recommended
          </div>

          <h3 className="text-2xl font-playfair text-primary mb-1 relative z-10">Premium Matchmaking</h3>
          <div className="flex items-baseline gap-1 mb-2 relative z-10">
            <span className="text-5xl font-medium text-white">₹5,000</span>
            <span className="text-white/60 text-sm">/ lifetime</span>
          </div>
          <p className="text-xs text-primary/70 mb-8 relative z-10">One-time payment until you find your partner.</p>

          <div className="space-y-5 mb-10 relative z-10">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Send unlimited interests</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Unlock Phone/Instagram upon mutual match</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Priority placement in Discover feed</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Dedicated luxury concierge support</span>
            </div>
          </div>

          <button 
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="w-full py-4 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 relative z-10"
          >
            {isProcessing ? "Initializing Secure Gateway..." : "Upgrade to Premium"} <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-4 flex justify-center items-center gap-2 text-[10px] text-white/40 relative z-10">
            <Lock className="w-3 h-3" /> Secure payment powered by Razorpay
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
