import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Lock, CheckCircle, MapPin, Briefcase, GraduationCap, Users, Heart } from "lucide-react"
import Link from "next/link"
import SendInterestButton from "./send-interest-button"
import SubscribeButton from "./subscribe-button"

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Resolve params promise (Next.js 15+ breaking change)
  const resolvedParams = await params
  const profileId = resolvedParams.id

  // We are removing the strict redirect here so pending users can still test and view profiles.
  // We'll just fetch their profile to have it, but not block them.
  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('status, subscription_ends_at')
    .eq('id', user.id)
    .single()

  // Validate UUID to prevent Supabase 22P02 errors
  const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(profileId);
  if (!isValidUUID) {
    redirect("/browse")
  }

  // Fetch the target profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()

  if (error || !profile || profile.status !== 'VERIFIED') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Profile not found</p>
          <p className="text-muted-foreground mb-4">This profile may have been removed or hasn't been verified yet.</p>
          <Link href="/browse">
            <Button variant="outline">Back to Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check if current user has an active subscription
  const isSubscribed = currentUserProfile?.subscription_ends_at 
    ? new Date(currentUserProfile.subscription_ends_at) > new Date() 
    : false;

  // SECURITY: Strip premium data if not subscribed
  if (!isSubscribed) {
    delete profile.family_type;
    delete profile.father_occupation;
    delete profile.siblings_count;
    delete profile.income_range;
    delete profile.manglik_status;
    delete profile.horoscope_details;
    delete profile.diet;
    delete profile.smoking;
    delete profile.drinking;
    delete profile.hobbies;
  }
  // Always strip phone number from the profile page
  delete profile.phone_number;

  const dob = new Date(profile.date_of_birth)
  const ageDifMs = Date.now() - dob.getTime()
  const ageDate = new Date(ageDifMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)

  // Check existing interest
  const { data: existingInterest } = await supabase
    .from('interests')
    .select('status')
    .eq('sender_profile_id', user.id)
    .eq('receiver_profile_id', profileId)
    .single()

  return (
    <div className="min-h-screen bg-background relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">
        <Link href="/browse" className="text-muted-foreground hover:text-foreground text-sm font-medium mb-8 inline-block transition-colors">
          &larr; Back to Matches
        </Link>

        <div className="glass-panel rounded-3xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64 sm:h-80 bg-muted">
            {profile.profile_photo_path ? (
              <img 
                src={profile.profile_photo_path} 
                alt={profile.full_name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary/5">
                <Heart className="w-16 h-16 text-primary/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white w-full flex flex-col sm:flex-row items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{profile.full_name}, {age}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.town}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {profile.profession}</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> Verified Profile
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 relative">
            
            {/* Additional Photos */}
            {profile.photos && profile.photos.length > 1 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {profile.photos.slice(1, 4).map((photo: string, idx: number) => (
                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-muted relative shadow-md">
                      <img src={photo} alt={`${profile.full_name} photo ${idx + 2}`} className="w-full h-full object-cover transition-transform hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={cn("space-y-12", !isSubscribed && "blur-md select-none opacity-40")}>
            {/* Lifestyle & Hobbies */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Lifestyle & Hobbies
                {!isSubscribed && <Lock className="w-5 h-5 text-muted-foreground ml-2" />}
              </h2>
              <div className="bg-background/50 p-6 rounded-2xl border border-border/50 relative overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Diet</p>
                    <p className="font-medium capitalize">{profile.diet?.replace('_', ' ') || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Smoking</p>
                    <p className="font-medium capitalize">{profile.smoking || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Drinking</p>
                    <p className="font-medium capitalize">{profile.drinking || "Not specified"}</p>
                  </div>
                </div>

                <div className="mt-6 relative z-10">
                  <p className="text-sm text-muted-foreground mb-2">Hobbies & Interests</p>
                  {profile.hobbies ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.hobbies.split(',').map((hobby: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {hobby.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="font-medium">Not specified</p>
                  )}
                </div>

                {!isSubscribed && (
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-20 flex items-center justify-center">
                    <span className="text-sm font-semibold bg-white/80 dark:bg-black/80 px-4 py-2 rounded-full text-muted-foreground shadow-sm">
                      Premium
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Public Information */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                About Me
              </h2>
              <div className="bg-background/50 p-6 rounded-2xl border border-border/50">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {profile.about_me || "No bio provided."}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Religion</p>
                    <p className="font-medium">{profile.religion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Caste</p>
                    <p className="font-medium">{profile.caste}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Height</p>
                    <p className="font-medium">{profile.height_cm} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Education</p>
                    <p className="font-medium">{profile.education}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium / Locked Information */}
            <section className="relative">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Premium Details
              </h2>

              <div className="bg-background/50 p-6 rounded-2xl border border-border/50 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2">
                    <Users className="w-5 h-5 text-muted-foreground" /> Family Background
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Family Type</p>
                      <p className="font-medium capitalize">{isSubscribed ? profile.family_type || "Not provided" : "Hidden Details"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Father's Occupation</p>
                      <p className="font-medium">{isSubscribed ? profile.father_occupation || "Not provided" : "Hidden Details"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Siblings</p>
                      <p className="font-medium">{isSubscribed ? (profile.siblings_count !== null ? profile.siblings_count : "Not provided") : "Hidden Details"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Income</p>
                      <p className="font-medium">{isSubscribed ? profile.income_range || "Not provided" : "Hidden Details"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2">
                    <Heart className="w-5 h-5 text-muted-foreground" /> Horoscope & Match
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Manglik Status</p>
                      <p className="font-medium capitalize">{isSubscribed ? profile.manglik_status || "Not provided" : "Hidden Details"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Horoscope Details</p>
                      <p className="font-medium">{isSubscribed ? profile.horoscope_details || "Not provided" : "Hidden Details"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {isSubscribed && (
              <div className="pt-8 border-t border-border/50 flex justify-center">
                <SendInterestButton receiverId={profileId} initialStatus={existingInterest?.status as any} />
              </div>
            )}
            
            </div>

              {!isSubscribed && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-card/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl max-w-sm w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                    
                    <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Subscribe to View Full Profile</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Get unlimited access to view all profiles and send interests for 30 days!
                    </p>
                    <SubscribeButton />
                    <p className="text-xs text-muted-foreground mt-4">Secured by Razorpay</p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
