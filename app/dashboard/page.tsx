import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Clock, CheckCircle, AlertCircle, Search, LogOut, ShieldCheck, Heart, User } from "lucide-react"
import InterestResponseButtons from "./interest-response-buttons"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect("/onboarding")
  }

  // Check if user is an admin
  const { data: adminCheck } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()
  
  const isAdmin = !!adminCheck

  // Fetch received interests
  const { data: receivedInterests } = await supabase
    .from('interests')
    .select(`
      id,
      status,
      created_at,
      sender:profiles!sender_profile_id (
        id,
        full_name,
        profile_photo_path,
        gender,
        phone_number
      )
    `)
    .eq('receiver_profile_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch sent interests
  const { data: sentInterests } = await supabase
    .from('interests')
    .select(`
      id,
      status,
      created_at,
      receiver:profiles!receiver_profile_id (
        id,
        full_name,
        profile_photo_path,
        gender,
        phone_number
      )
    `)
    .eq('sender_profile_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Your Dashboard</h1>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link 
                href="/admin/verify"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10")}
              >
                <ShieldCheck className="w-4 h-4" /> Admin Panel
              </Link>
            )}
            <form action="/auth/signout" method="post">
              <Button variant="outline" type="submit" className="rounded-full gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </form>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome back, {profile.full_name || user.email}!</h2>
              <p className="text-muted-foreground">Manage your profile and find your perfect match.</p>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm font-medium",
              profile.status === 'VERIFIED' ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" :
              profile.status === 'PENDING_VERIFICATION' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400" :
              profile.status === 'REJECTED' ? "bg-destructive/10 border-destructive/20 text-destructive" :
              "bg-muted border-border"
            )}>
              {profile.status === 'VERIFIED' && <CheckCircle className="w-5 h-5" />}
              {profile.status === 'PENDING_VERIFICATION' && <Clock className="w-5 h-5" />}
              {profile.status === 'REJECTED' && <AlertCircle className="w-5 h-5" />}
              Profile Status: {profile.status.replace('_', ' ')}
            </div>
          </div>

          <div className="bg-background/50 rounded-2xl p-6 border border-border/50">
            {profile.status === 'PENDING_VERIFICATION' && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-400 mt-1">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Verification in Progress</h3>
                  <p className="text-muted-foreground">
                    Your profile and Aadhaar details are currently under manual review by our team. This usually takes 24-48 hours. Once approved, you will be able to browse other verified profiles.
                  </p>
                </div>
              </div>
            )}

            {profile.status === 'REJECTED' && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-destructive/10 rounded-full text-destructive mt-1">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-destructive">Verification Failed</h3>
                  <p className="text-muted-foreground mb-4">
                    Unfortunately, we could not verify your profile. Reason: <strong className="text-foreground">{profile.rejection_reason || 'Information mismatch.'}</strong>
                  </p>
                  <Link 
                    href="/onboarding"
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
                  >
                    Update Profile Details
                  </Link>
                </div>
              </div>
            )}

            {profile.status === 'VERIFIED' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full text-green-600 dark:text-green-400 mt-1">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">You're all set!</h3>
                    <p className="text-muted-foreground">
                      Your profile is verified and active. You can now browse our premium community of verified matches.
                    </p>
                  </div>
                </div>
                <Link 
                  href="/browse"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full shadow-md shadow-primary/20 shrink-0 gap-2 w-full sm:w-auto")}
                >
                  <Search className="w-5 h-5" /> Browse Matches
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Received Interests Section */}
        {profile.status === 'VERIFIED' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" /> Received Interests
              </h2>
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full font-medium">
                {receivedInterests?.length || 0} Requests
              </span>
            </div>

            {receivedInterests && receivedInterests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {receivedInterests.map((interest: any) => {
                  const sender = Array.isArray(interest.sender) ? interest.sender[0] : interest.sender;
                  if (!sender) return null;
                  
                  return (
                  <div key={interest.id} className="glass-panel p-4 rounded-2xl flex flex-col justify-between gap-4">
                    <Link href={sender.id ? `/profile/${sender.id}` : "#"} className="group flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                        {sender.profile_photo_path ? (
                          <img 
                            src={sender.profile_photo_path} 
                            alt={sender.full_name || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/5">
                            <User className="w-6 h-6 text-primary/20" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold truncate group-hover:text-primary transition-colors">
                          {sender.full_name || "Unknown User"}
                        </h3>
                        <p className="text-xs text-muted-foreground capitalize">
                          {sender.gender || "Unknown"}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(interest.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="bg-background/50 p-3 rounded-xl border border-border/50 flex flex-wrap items-center justify-between gap-2">
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        interest.status === 'PENDING' ? "bg-yellow-500/10 text-yellow-600" :
                        interest.status === 'ACCEPTED' ? "bg-green-500/10 text-green-600" :
                        "bg-destructive/10 text-destructive"
                      )}>
                        {interest.status}
                      </span>
                      
                      {interest.status === 'PENDING' && (
                        <InterestResponseButtons interestId={interest.id} />
                      )}
                      
                      {interest.status === 'ACCEPTED' && (
                        <p className="text-sm font-semibold select-all text-primary">
                          📞 {interest.sender.phone_number || "No phone provided"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-3xl text-center border-dashed border-2">
                <p className="text-muted-foreground">You haven't received any interests yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Sent Interests Section */}
        {profile.status === 'VERIFIED' && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-muted-foreground" /> Sent Interests
              </h2>
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full font-medium">
                {sentInterests?.length || 0} Sent
              </span>
            </div>

            {sentInterests && sentInterests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sentInterests.map((interest: any) => {
                  const receiver = Array.isArray(interest.receiver) ? interest.receiver[0] : interest.receiver;
                  if (!receiver) return null;
                  
                  return (
                  <div key={interest.id} className="glass-panel p-4 rounded-2xl">
                    <Link href={receiver.id ? `/profile/${receiver.id}` : "#"} className="group flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                        {receiver.profile_photo_path ? (
                          <img 
                            src={receiver.profile_photo_path} 
                            alt={receiver.full_name || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/5">
                            <User className="w-5 h-5 text-primary/20" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                          {receiver.full_name || "Unknown User"}
                        </h3>
                        <span className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                          interest.status === 'PENDING' ? "bg-yellow-500/10 text-yellow-600" :
                          interest.status === 'ACCEPTED' ? "bg-green-500/10 text-green-600" :
                          "bg-destructive/10 text-destructive"
                        )}>
                          {interest.status}
                        </span>
                      </div>
                    </Link>
                    
                    {interest.status === 'ACCEPTED' && (
                      <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20 text-center">
                        <p className="text-xs text-green-700 font-medium mb-1">Contact Number</p>
                        <p className="text-sm font-bold text-green-800 select-all">
                          {interest.receiver.phone_number || "No phone provided"}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
