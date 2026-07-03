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
      
      {/* 
        THE ROOM
        A massive CSS grid that establishes the spatial coordinates of the room.
      */}
      <div className="max-w-[1400px] mx-auto w-full px-12 grid grid-cols-12 gap-8 relative">
        
        {/* 
          THE WINDOW (Left Side)
          Tall, narrow, occupying 3 columns. 
          Gives the illusion of light and space without dominating the UI.
        */}
        <div className="col-span-3 h-[60vh] relative hidden md:block mt-8">
           {/* The physical 'frame' of the window carved into the travertine */}
           <div className="absolute inset-0 bg-[#E8E3D9] shadow-inner rounded-t-full overflow-hidden">
              <Image 
                src="/estate_window.jpg"
                alt="Morning light entering the estate"
                fill
                className="object-cover object-bottom opacity-80 mix-blend-multiply"
                priority
              />
           </div>
        </div>

        {/* 
          THE WALL (Right Side)
          The typography rests directly on the travertine wall, bathed in the implied light from the window.
        */}
        <div className="col-span-12 md:col-span-8 md:col-start-5 pt-24 pb-32 flex flex-col justify-center">
          <h1 className="font-serif text-5xl lg:text-7xl text-[#2A2621] mb-8 leading-tight drop-shadow-sm">
            Good Morning, <br/><span className="text-[#8C7A6B]">{profile?.first_name || 'Guest'}</span>.
          </h1>
          <p className="text-xl text-[#5C5449] font-serif italic leading-relaxed max-w-xl">
            {insightText}
          </p>
        </div>

      </div>

      {/* 
        THE OAK CONSOLE & LINEN PANELS (Depth Creation)
        Foreground -> Midground -> Background
      */}
      <div className="relative w-full mt-12">
        {/* The Midground: A solid architectural band representing an oak console or wainscoting */}
        <div className="absolute top-24 left-0 w-full h-[300px] bg-[#2A2621] border-t border-[#4A423A] shadow-2xl z-0" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-8">
            <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8C7A6B] pl-4">Today's Journey</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* The Foreground: Thick Linen cards overlapping the console */}
              {profile?.verification_status !== 'verified' && (
                <Link href="/credentials" className="group bg-[#F5F2EB] p-10 border border-[#2A2621]/10 shadow-xl hover:shadow-2xl transition-all flex flex-col gap-4 transform hover:-translate-y-1 duration-500">
                  <span className="font-serif text-3xl text-[#2A2621]">Establish Trust</span>
                  <span className="text-sm text-[#5C5449] leading-relaxed">Your education verification is almost complete. A verified profile gives families confidence.</span>
                  <div className="mt-4 w-12 h-[1px] bg-[#8C7A6B]/50 group-hover:w-24 transition-all duration-500" />
                </Link>
              )}
              
              <Link href="/dashboard/profile" className="group bg-[#F5F2EB] p-10 border border-[#2A2621]/10 shadow-xl hover:shadow-2xl transition-all flex flex-col gap-4 transform hover:-translate-y-1 duration-500">
                <span className="font-serif text-3xl text-[#2A2621]">Continue your story</span>
                <span className="text-sm text-[#5C5449] leading-relaxed">Adding your family values helps create deeper, more meaningful connections.</span>
                <div className="mt-4 w-12 h-[1px] bg-[#8C7A6B]/50 group-hover:w-24 transition-all duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 
        THE STONE NICHES (Introductions)
        Recessed deeply into the travertine wall.
      */}
      <div className="w-full max-w-[1400px] mx-auto px-12 py-48 mt-12">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8C7A6B]">Prepared Introductions</h2>
          <Link href="/dashboard/discover" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2A2621] hover:text-[#8C7A6B] transition-colors border-b border-[#2A2621]/20 pb-1">Open Portfolio</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {topIntroductions.length > 0 ? topIntroductions.map((intro) => (
            <div key={intro.id} className="group flex flex-col cursor-pointer">
              {/* Recessed Niche */}
              <div className="relative w-full aspect-[3/4] bg-[#E8E3D9] overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)] border border-[#2A2621]/5 p-3">
                <div className="relative w-full h-full overflow-hidden">
                  {intro.image ? (
                    <Image 
                      src={intro.image} 
                      alt={intro.name}
                      fill
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-6xl text-[#8C7A6B]/20 bg-[#F1EFE7]">
                      {intro.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              {/* Typography engraved below the niche */}
              <div className="pt-6 flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl text-[#2A2621]">{intro.name}</h3>
                  <span className="text-xs font-bold tracking-widest text-[#8C7A6B]">{intro.age}</span>
                </div>
                <p className="text-sm text-[#5C5449] font-serif italic truncate">{intro.profession}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-3 py-24 flex items-center justify-center bg-[#E8E3D9] shadow-inner">
              <span className="text-sm text-[#8C7A6B] font-medium tracking-widest uppercase">The portfolio is currently empty.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
