"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Camera, Edit2, ShieldCheck, MapPin, Briefcase, Calendar, AtSign, Phone } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/shared/lib/supabase/client"

import { Database } from "@/shared/lib/supabase/database.types"

type ProfileMedia = Database['public']['Tables']['profile_media']['Row']

interface ProfileProps {
  profile: Database['public']['Tables']['profiles']['Row'] & {
    profession?: { name: string }[] | { name: string } | null
    city?: { name: string }[] | { name: string } | null
    profile_media?: ProfileMedia[]
    family_details?: { gotra: string | null }[] | { gotra: string | null } | null
    compatibility_profiles?: { lifestyle: string[] | null }[] | { lifestyle: string[] | null } | null
    education?: string | null
    income_range?: string | null
  }
}

export default function ProfileClient({ profile }: ProfileProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingPhoto(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`

      const { error: storageError } = await supabase.storage
        .from('profile_photos')
        .upload(fileName, file)

      if (storageError) throw storageError

      // Insert into profile_media
      // First clear any existing primary flags
      await supabase.from('profile_media').update({ is_primary: false } as any).eq('profile_id', user.id)
      const { error: dbError } = await supabase
        .from('profile_media')
        .insert({
          profile_id: user.id,
          type: 'image',
          bucket_path: fileName,
          is_primary: true,
          display_order: 0
        } as any)

      if (dbError) throw dbError

      alert("Photo uploaded successfully!")
      // Normally we would refresh the page or state here
      window.location.reload()
    } catch (err) {
      alert("Failed to upload photo: " + (err as Error).message)
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  // Fallback for null/undefined nested objects
  const professionRaw = profile?.profession
  const professionName = professionRaw 
    ? (Array.isArray(professionRaw) ? professionRaw[0]?.name : (professionRaw as { name: string }).name) ?? "Not specified"
    : "Not specified"
  const cityRaw = profile?.city
  const cityName = cityRaw
    ? (Array.isArray(cityRaw) ? cityRaw[0]?.name : (cityRaw as { name: string }).name) ?? "Not specified"
    : "Not specified"
  
  // Calculate Age
  let age: number | string = '?'
  if (profile?.date_of_birth) {
    const birth = new Date(profile.date_of_birth)
    const today = new Date()
    age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  }

  // Get primary photo
  const primaryMedia = profile?.profile_media?.find((m) => m.is_primary) || profile?.profile_media?.[0]
  const photoUrl = primaryMedia ? createClient().storage.from('profile_photos').getPublicUrl(primaryMedia.bucket_path).data.publicUrl : null

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
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-950 opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors flex items-center gap-2"
            >
              <Camera className="w-5 h-5" /> {isUploadingPhoto ? "Uploading..." : "Change Photos"}
            </button>
          </div>

          <div className="absolute bottom-8 left-8 z-10">
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
                <div className="text-sm">{profile?.height_cm ? `${profile.height_cm} cm` : 'Not added'}</div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Gotra</label>
                <div className="text-sm">{
                  Array.isArray(profile?.family_details) ? profile?.family_details[0]?.gotra : profile?.family_details?.gotra || 'Not added'
                }</div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Income Range</label>
                <div className="text-sm">{profile?.income_range || 'Not added'}</div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Diet</label>
                <div className="text-sm">{(() => {
                  const lifestyle = Array.isArray(profile?.compatibility_profiles) 
                    ? profile?.compatibility_profiles[0]?.lifestyle 
                    : profile?.compatibility_profiles?.lifestyle;
                  const diets = ["Vegetarian", "Non-Vegetarian", "Vegan", "Pescatarian"];
                  const found = lifestyle?.find((l) => diets.includes(l));
                  return found || 'Not added';
                })()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
