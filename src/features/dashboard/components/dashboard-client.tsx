"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bell, Search, Sparkles, ChevronRight, CheckCircle2, Clock, MapPin, Briefcase, UserPlus, Eye, ShieldCheck } from "lucide-react"

import { Database } from "@/shared/lib/supabase/database.types"

type ProfileRow = Database['public']['Tables']['profiles']['Row']

export interface MatchType extends Partial<ProfileRow> {
  profession?: { name: string } | { name: string }[] | null
  city?: { name: string } | { name: string }[] | null
}

interface DashboardClientProps {
  userProfile: ProfileRow;
  recommendedMatches: MatchType[];
  completionScore: number;
  updates: { id: string; type: string; title: string; desc: string; time: string; iconType: string }[];
  timeline: { id: string; title: string; desc: string; time: string; iconType: string }[];
}

export default function DashboardClient({ userProfile, recommendedMatches, completionScore, updates, timeline }: DashboardClientProps) {
  // Generate dynamic AI insights based on actual match data
  const generateInsight = () => {
    if (recommendedMatches.length === 0) {
      return "Complete your profile to receive personalized match recommendations and insights."
    }

    // Analyze professions in matches
    const professions = recommendedMatches
      .map(m => {
        if (!m.profession) return null
        return Array.isArray(m.profession) ? m.profession[0]?.name : m.profession.name
      })
      .filter(Boolean)

    const professionCounts = professions.reduce((acc, p) => {
      acc[p] = (acc[p] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topProfession = Object.entries(professionCounts).sort((a, b) => b[1] - a[1])[0]

    // Analyze cities in matches
    const cities = recommendedMatches
      .map(m => {
        if (!m.city) return null
        return Array.isArray(m.city) ? m.city[0]?.name : m.city.name
      })
      .filter(Boolean)

    const cityCounts = cities.reduce((acc, c) => {
      acc[c] = (acc[c] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topCity = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]

    // Generate personalized insight
    if (topProfession && topCity) {
      const profPercentage = Math.round((topProfession[1] / recommendedMatches.length) * 100)
      return `${profPercentage}% of your curated matches are ${topProfession[0].toLowerCase()}s, with the highest concentration in ${topCity[0]}.`
    } else if (topProfession) {
      const profPercentage = Math.round((topProfession[1] / recommendedMatches.length) * 100)
      return `${profPercentage}% of your curated matches are ${topProfession[0].toLowerCase()}s based on your preferences.`
    } else {
      return `You have ${recommendedMatches.length} curated matches based on your preferences and profile.`
    }
  }

  return (
    <div className="space-y-12 pb-24">
      
      {/* Header Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl md:text-4xl font-playfair font-medium">
            Good afternoon, {userProfile.first_name}.
          </h1>
          <p className="text-white/60">Your journey to finding the one is progressing beautifully.</p>
        </motion.div>
      </section>

      {/* The Journey Card (Centerpiece) */}
      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10 shadow-2xl"
        >
          {/* Subtle glow effect behind */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs font-medium text-white/80">
                <Sparkles className="w-3 h-3 text-primary" />
                Your Journey
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-playfair font-medium">{completionScore}%</span>
                  <span className="text-sm text-white/50 uppercase tracking-widest">Complete</span>
                </div>
                {/* Beautiful Progress Bar */}
                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${completionScore}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30" />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <div className="space-y-4">
                <p className="text-sm text-white/50 uppercase tracking-widest">Next Step</p>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Verify your identity</h3>
                    <p className="text-sm text-white/60 mt-1">Stand out with a verified badge. Takes 2 mins.</p>
                  </div>
                </div>
                <button className="w-full py-3 mt-2 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Start Verification
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid: Updates & Insights */}
      <section className="grid lg:grid-cols-3 gap-6">
        
        {/* Today's Updates */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-playfair font-medium">Today's Updates</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {updates.length > 0 ? updates.map(update => (
              <UpdateCard 
                key={update.id}
                icon={update.iconType === 'view' ? <Eye className="w-5 h-5 text-blue-400" /> : <UserPlus className="w-5 h-5 text-primary" />}
                title={update.title}
                desc={update.desc}
                time={update.time}
              />
            )) : (
              <div className="text-white/50 py-4 col-span-2">No new updates today.</div>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-playfair font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> 
              Vivaha AI
            </h2>
          </div>
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 space-y-4 h-[calc(100%-2rem)]"
          >
            <p className="text-sm text-white/80 leading-relaxed">
              {generateInsight()}
            </p>
            <button className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1 group">
              View Analytics <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Recommended Matches Carousel */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-playfair font-medium">Curated for You</h2>
          <button className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {recommendedMatches.length > 0 ? (
            recommendedMatches.map((match, i) => (
              <MatchCard key={match.id} match={match} delay={i * 0.1} />
            ))
          ) : (
            <div className="text-white/50 py-8">No curated matches available yet. Our curators are working on it.</div>
          )}
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-playfair font-medium">Activity Timeline</h2>
        </div>
        
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 max-w-3xl">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            {timeline.length > 0 ? timeline.map((item, i) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {item.iconType === 'success' ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Clock className="w-4 h-4 text-white/50" />}
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl ${i === 0 ? 'bg-white/5 border border-white/5' : 'bg-transparent'}`}>
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className={`font-bold ${i === 0 ? 'text-white/90' : 'text-white/60'}`}>{item.title}</div>
                    <time className={`text-[10px] uppercase tracking-wider ${i === 0 ? 'text-white/40' : 'text-white/30'}`}>{item.time}</time>
                  </div>
                  <div className={`text-sm ${i === 0 ? 'text-white/60' : 'text-white/40'}`}>{item.desc}</div>
                </div>
              </div>
            )) : (
              <div className="text-white/50 py-4 pl-12 text-center w-full">No activity yet. Your journey is just beginning.</div>
            )}

          </div>
        </div>
      </section>
      
    </div>
  )
}

function UpdateCard({ icon, title, desc, time }: { icon: React.ReactNode, title: string, desc: string, time: string }) {
  return (
    <motion.div 
      whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
      className="p-5 rounded-2xl bg-white/5 border border-white/5 cursor-pointer transition-colors"
    >
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">{desc}</p>
          <p className="text-[10px] text-white/30 mt-3 uppercase tracking-wider">{time}</p>
        </div>
      </div>
    </motion.div>
  )
}
const MatchCard = ({ delay, match }: { delay: number; match?: MatchType }) => {
  const profName = match?.profession
    ? Array.isArray(match.profession) ? match.profession[0]?.name : (match.profession as { name: string }).name
    : "Professional"
  const cityName = match?.city
    ? Array.isArray(match.city) ? match.city[0]?.name : (match.city as { name: string }).name
    : "City"

  let displayAge: number | string = '28'
  if (match?.date_of_birth) {
    const birth = new Date(match.date_of_birth)
    const today = new Date()
    displayAge = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) displayAge--
  }

  return (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="min-w-[280px] md:min-w-[320px] h-[400px] rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group cursor-pointer snap-start shadow-xl shrink-0"
  >
    {/* Image Placeholder with Gradients */}
    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-black/80" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
    
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Highly Compatible</span>
      </div>
    </div>

    <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
      <h3 className="font-playfair text-2xl font-medium text-white">{match?.first_name || "Match Name"}, {displayAge}</h3>
      <p className="text-sm text-white/70">{profName} • {cityName}</p>
    </div>
  </motion.div>
  )
}
