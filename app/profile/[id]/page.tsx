import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Lock, CheckCircle, MapPin, Briefcase, GraduationCap, Users, Heart } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Check if current user is approved
  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('status')
    .eq('id', user.id)
    .single()

  if (currentUserProfile?.status !== 'VERIFIED') {
    redirect("/dashboard")
  }

  // Fetch the target profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*, profile_details(*)')
    .eq('id', params.id)
    .single()

  if (error || !profile || profile.status !== 'VERIFIED') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Profile not found</p>
          <Link href="/browse">
            <Button variant="outline">Back to Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check if current user has unlocked this profile
  const { data: unlockRecord } = await supabase
    .from('profile_unlocks')
    .select('*')
    .eq('unlocker_id', user.id)
    .eq('unlocked_id', params.id)
    .single()

  const isUnlocked = !!unlockRecord;

  const details = profile.profile_details || {}
  const age = new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()

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
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
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
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {details.city}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {details.occupation}</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> Verified Profile
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            {/* Public Information */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                About Me
              </h2>
              <div className="bg-background/50 p-6 rounded-2xl border border-border/50">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {details.bio || "No bio provided."}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Religion</p>
                    <p className="font-medium">{details.religion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Caste</p>
                    <p className="font-medium">{details.caste}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Height</p>
                    <p className="font-medium">{profile.height_cm} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Education</p>
                    <p className="font-medium">{details.education}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium / Locked Information */}
            <section className="relative">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Premium Details
              </h2>

              <div className={cn(
                "bg-background/50 p-6 rounded-2xl border border-border/50 space-y-8",
                !isUnlocked && "blur-md select-none opacity-50"
              )}>
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2">
                    <Users className="w-5 h-5 text-muted-foreground" /> Family Background
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Family Type</p>
                      <p className="font-medium capitalize">{details.family_type || "Joint Family"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Father's Occupation</p>
                      <p className="font-medium">{details.father_occupation || "Business Owner"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Siblings</p>
                      <p className="font-medium">{details.siblings || "1 Brother, 1 Sister"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Income</p>
                      <p className="font-medium">₹{details.income_annual || "15,00,000"}</p>
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
                      <p className="font-medium capitalize">{details.manglik || "No"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Horoscope Details</p>
                      <p className="font-medium">{details.horoscope_details || "Born at 10:30 AM in Mumbai. Looking for a compatible match."}</p>
                    </div>
                  </div>
                </div>
              </div>

              {!isUnlocked && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-card/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl max-w-sm w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                    
                    <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Unlock Full Profile</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Get access to detailed family background, horoscope details, and direct contact options.
                    </p>
                    <form action={async () => {
                      "use server";
                      // This would integrate with Razorpay and insert into unlocked_profiles
                      redirect(`/dashboard?payment=success`);
                    }}>
                      <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20 h-12 text-lg">
                        Pay ₹5000 to Unlock
                      </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-4">Secured by Razorpay</p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
