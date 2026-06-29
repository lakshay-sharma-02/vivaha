"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Camera, Edit2, ShieldCheck, MapPin, Briefcase, Calendar, AtSign, Phone } from "lucide-react"
import Link from "next/link"

export default function ProfileClient({ profile }: { profile: any }) {
  const [isEditing, setIsEditing] = React.useState(false)

  // Fallback for null/undefined nested objects
  const professionName = profile?.profession?.[0]?.name || profile?.profession?.name || "Not specified"
  const cityName = profile?.city?.[0]?.name || profile?.city?.name || "Not specified"
  
  // Calculate Age
  const age = profile?.date_of_birth ? new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear() : '?'

  return (
    <div className="space-y-12 pb-24 max-w-4xl">
      <section className="pt-8 flex justify-between items-end">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">My Profile</h1>
          <p className="text-white/60 text-lg">
            This is how you appear to your matches.
          </p>
        </motion.div>
        
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Edit2 className="w-4 h-4" /> {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </section>

      <section className="space-y-8">
        {/* Hero Card */}
        <div className="h-80 w-full rounded-3xl bg-zinc-900 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-950 opacity-50" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
            <button className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors flex items-center gap-2">
              <Camera className="w-5 h-5" /> Change Photos
            </button>
          </div>

          <div className="absolute bottom-8 left-8">
            <h2 className="font-playfair text-4xl font-medium text-white mb-2">
              {profile?.first_name} {profile?.last_name}, {age}
            </h2>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <Link href="/dashboard/verification" className="hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30">
                Pending Verification - Complete Now
              </Link>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <h3 className="text-lg font-playfair text-primary">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Profession</label>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-white/50" />
                  <span className="text-sm">{professionName}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Location</label>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/50" />
                  <span className="text-sm">{cityName}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Date of Birth</label>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-white/50" />
                  <span className="text-sm">
                    {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Private Info */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-32 h-32" />
            </div>

            <h3 className="text-lg font-playfair text-primary relative z-10">Private Contact Details</h3>
            <p className="text-xs text-white/40 relative z-10">Only visible to your mutually accepted Connections.</p>

            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Phone Number</label>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white/50" />
                  <span className="text-sm font-medium">{profile?.phone || 'Not added'}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Instagram</label>
                <div className="flex items-center gap-3">
                  <AtSign className="w-4 h-4 text-white/50" />
                  <span className="text-sm font-medium">{profile?.instagram ? `@${profile.instagram.replace('@', '')}` : 'Not added'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced / Traditional Filters */}
          <div className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-playfair text-primary">Advanced Details</h3>
                <p className="text-xs text-white/40">Height, Gotra, Family Details, and Income</p>
              </div>
              <button className="text-xs font-bold text-primary hover:text-white transition-colors bg-primary/20 px-4 py-2 rounded-full">
                Complete Profile
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Height</label>
                <div className="text-sm">-</div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Gotra</label>
                <div className="text-sm">-</div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Income Range</label>
                <div className="text-sm">-</div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Diet</label>
                <div className="text-sm">-</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
