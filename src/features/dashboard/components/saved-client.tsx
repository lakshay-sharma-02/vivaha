"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bookmark, MapPin, Briefcase, Heart, X } from "lucide-react"
import { getSavedProfiles, unsaveProfile } from "@/app/actions/saved"
import Image from "next/image"
import { toast } from "sonner"

type SavedProfile = {
  id: string
  created_at: string
  saved_profile_id: string
  profiles: {
    id: string
    first_name: string
    last_name: string
    gender: string | null
    date_of_birth: string | null
    height_cm: number | null
    bio: string | null
    city_id: string | null
    profession_id: string | null
    religion_id: string | null
    verification_status: string | null
    cities: { name: string } | null
    professions: { name: string } | null
    religions: { name: string } | null
    profile_media: Array<{
      id: string
      bucket_path: string
      is_primary: boolean | null
    }>
  }
}

export default function SavedClient() {
  const [savedProfiles, setSavedProfiles] = React.useState<SavedProfile[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadSavedProfiles()
  }, [])

  async function loadSavedProfiles() {
    setLoading(true)
    const result = await getSavedProfiles()
    if (result.success && result.data) {
      setSavedProfiles(result.data as SavedProfile[])
    } else {
      toast.error(result.error || "Failed to load saved profiles")
    }
    setLoading(false)
  }

  async function handleUnsave(profileId: string) {
    const result = await unsaveProfile(profileId)
    if (result.success) {
      setSavedProfiles(prev => prev.filter(p => p.profiles.id !== profileId))
      toast.success("Profile removed from saved")
    } else {
      toast.error(result.error || "Failed to unsave profile")
    }
  }

  function calculateAge(dateOfBirth: string | null): number | null {
    if (!dateOfBirth) return null
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-12 pb-24">
      <section className="pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">Saved Profiles</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Profiles you've bookmarked for later review.
          </p>
        </motion.div>
      </section>

      <section>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : savedProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Bookmark className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="font-playfair text-2xl font-medium mb-2">No saved profiles</h3>
            <p className="text-white/50 max-w-sm">
              When you bookmark a profile in Discover, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProfiles.map((saved) => {
              const profile = saved.profiles
              const primaryMedia = profile.profile_media?.find(m => m.is_primary) || profile.profile_media?.[0]
              const age = calculateAge(profile.date_of_birth)

              return (
                <motion.div
                  key={saved.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                >
                  <button
                    onClick={() => handleUnsave(profile.id)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <div className="relative h-80 bg-white/5">
                    {primaryMedia ? (
                      <Image
                        src={primaryMedia.bucket_path}
                        alt={`${profile.first_name}'s photo`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Heart className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-playfair font-medium">
                        {profile.first_name} {profile.last_name}
                        {age && <span className="text-white/60">, {age}</span>}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-white/60">
                      {profile.cities && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.cities.name}</span>
                        </div>
                      )}
                      {profile.professions && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{profile.professions.name}</span>
                        </div>
                      )}
                    </div>

                    {profile.bio && (
                      <p className="text-white/60 text-sm line-clamp-3">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
