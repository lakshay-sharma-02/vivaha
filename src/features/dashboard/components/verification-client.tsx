"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, UploadCloud, Lock, FileText, CheckCircle2 } from "lucide-react"

export default function VerificationClient({ status }: { status: string }) {
  const [isUploading, setIsUploading] = React.useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      // Fake success for UI
    }, 2000)
  }

  return (
    <div className="space-y-12 pb-24 max-w-4xl">
      <section className="pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-playfair font-medium">Trust & Verification</h1>
            {status === 'verified' && (
              <span className="px-3 py-1 bg-[#25D366]/20 border border-[#25D366]/30 rounded-full text-xs font-bold text-[#25D366] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            )}
            {status !== 'verified' && (
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1">
                Pending
              </span>
            )}
          </div>
          <p className="text-white/60 text-lg max-w-2xl">
            Vivaha is an exclusive community. To ensure the highest quality of matches and prevent fake profiles, we require government ID verification.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <h3 className="text-xl font-playfair">Upload Identity Proof</h3>
            <p className="text-sm text-white/50">
              Please upload a clear picture of your Aadhar Card, Passport, or Driver's License. The details must match your profile.
            </p>

            <div 
              className="border-2 border-dashed border-white/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-medium text-lg mb-1">Click to upload document</h4>
              <p className="text-xs text-white/40">PNG, JPG or PDF (Max 5MB)</p>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="px-8 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {isUploading ? "Uploading Securely..." : "Submit for Verification"}
              </button>
            </div>
          </div>
        </div>

        {/* Security Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/20">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-[#25D366]" />
            </div>
            <h4 className="font-medium text-[#25D366] mb-2">Bank-Grade Security</h4>
            <p className="text-xs text-[#25D366]/70 leading-relaxed">
              Your documents are encrypted using AES-256 and transmitted via secure TLS channels. They are used strictly for identity verification and are NEVER stored publicly or shared with other members.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="font-medium font-playfair text-lg">Why verify?</h4>
            
            <div className="flex gap-3">
              <div className="mt-1"><ShieldCheck className="w-4 h-4 text-primary" /></div>
              <div>
                <h5 className="text-sm font-medium text-white/90">Verified Badge</h5>
                <p className="text-xs text-white/50 mt-1">Get the coveted gold checkmark on your profile.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1"><FileText className="w-4 h-4 text-primary" /></div>
              <div>
                <h5 className="text-sm font-medium text-white/90">Higher Trust</h5>
                <p className="text-xs text-white/50 mt-1">Verified profiles receive 300% more mutual matches.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
