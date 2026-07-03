import { createClient } from "@/shared/lib/supabase/server"
import { fetchDiscoverProfiles } from "@/app/actions/discover"
import Image from "next/image"
import Link from "next/link"

export default async function DashboardHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return <div>Not authenticated</div>
  }

  // Fetch basic profile info
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, verification_status')
    .eq('id', user.id)
    .single()

  // Fetch Discover Profiles (Introductions)
  const { profiles: introductions } = await fetchDiscoverProfiles(1)
  const topIntroductions = introductions.slice(0, 3) 

  // Fetch recent audit logs for the Journal insight
  const { data: recentLogs } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('actor_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)

  // Construct a quiet, conversational insight
  let insightText = "There are new families waiting to meet you."
  if (recentLogs && recentLogs.length > 0) {
    const log = recentLogs[0]
    if (log.action === 'profile_completed' || log.action === 'update_profile') {
      insightText = "You updated your story recently. Families can now better understand the people who matter most to you."
    } else if (log.action === 'verification_submitted') {
      insightText = "Your verification documents are under review. We appreciate your patience."
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 20% ENVIRONMENT - The Welcome Area */}
      <section className="relative h-[45vh] min-h-[400px] w-full bg-[#1A1814] flex flex-col justify-end p-8 md:p-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <Image 
            src="/estate_06_desk.jpg" 
            alt="A quiet reading corner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EB] via-transparent to-transparent opacity-100" />
        
        <div className="relative z-10 max-w-3xl pt-20">
          <h1 className="font-serif text-4xl md:text-5xl text-[#2A2621] mb-6">
            Good Morning, {profile?.first_name || 'Guest'}.
          </h1>
          <p className="text-lg md:text-xl text-[#5C5449] font-serif italic leading-relaxed max-w-2xl">
            {insightText}
          </p>
        </div>
      </section>

      {/* 50% CONTENT - The Architectural Surfaces */}
      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 flex flex-col gap-24 relative z-20">
        
        {/* TODAY'S JOURNEY - Guidance */}
        <div className="flex flex-col gap-8">
          <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8C7A6B]">Today's Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile?.verification_status !== 'verified' && (
              <Link href="/credentials" className="group bg-white p-8 border border-[#2A2621]/5 hover:border-[#8C7A6B]/30 transition-colors shadow-sm flex flex-col gap-3">
                <span className="font-serif text-2xl text-[#2A2621]">Establish Trust</span>
                <span className="text-sm text-[#5C5449] leading-relaxed">Your education verification is almost complete. A verified profile gives families confidence.</span>
              </Link>
            )}
            <Link href="/dashboard/profile" className="group bg-white p-8 border border-[#2A2621]/5 hover:border-[#8C7A6B]/30 transition-colors shadow-sm flex flex-col gap-3">
              <span className="font-serif text-2xl text-[#2A2621]">Continue your story</span>
              <span className="text-sm text-[#5C5449] leading-relaxed">Adding your family values helps create deeper, more meaningful connections.</span>
            </Link>
          </div>
        </div>

        {/* INTRODUCTIONS - Editorial Cards */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-[#2A2621]/10 pb-4">
            <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8C7A6B]">Prepared Introductions</h2>
            <Link href="/dashboard/discover" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2A2621] hover:text-[#8C7A6B] transition-colors">View all</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topIntroductions.length > 0 ? topIntroductions.map((intro) => (
              <div key={intro.id} className="group flex flex-col bg-white shadow-sm border border-[#2A2621]/5 hover:shadow-md transition-all cursor-pointer">
                {/* Image Surface */}
                <div className="relative w-full aspect-[4/5] bg-[#E8E3D9] overflow-hidden">
                  {intro.image_url ? (
                    <Image 
                      src={intro.image_url} 
                      alt={intro.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-[#8C7A6B]/20">
                      {intro.name.charAt(0)}
                    </div>
                  )}
                </div>
                {/* Typography Surface */}
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl text-[#2A2621]">{intro.name}</h3>
                    <span className="text-sm font-medium text-[#8C7A6B]">{intro.age}</span>
                  </div>
                  <p className="text-sm text-[#5C5449] truncate">{intro.profession}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-3 py-12 flex items-center justify-center border border-dashed border-[#8C7A6B]/30 bg-white/50">
                <span className="text-sm text-[#5C5449] font-medium">No new introductions today. We are preparing more matches for you.</span>
              </div>
            )}
          </div>
        </div>
        
      </section>
    </div>
  )
}
