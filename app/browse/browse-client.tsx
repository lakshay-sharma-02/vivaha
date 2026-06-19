"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Search, MapPin, Briefcase, GraduationCap, Loader2 } from "lucide-react"
import { getProfilesPage } from "./actions"

type Profile = any; // We'll type this better later or let it infer

export default function BrowseClient({ initialProfiles }: { initialProfiles: Profile[] }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialProfiles.length === 20)
  const [loadingMore, setLoadingMore] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [religionFilter, setReligionFilter] = useState("")
  const [casteFilter, setCasteFilter] = useState("")
  const [cityFilter, setCityFilter] = useState("")

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          profile.about_me?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesReligion = religionFilter === "" || profile.religion?.toLowerCase().includes(religionFilter.toLowerCase())
    const matchesCaste = casteFilter === "" || profile.caste?.toLowerCase().includes(casteFilter.toLowerCase())
    const matchesCity = cityFilter === "" || profile.town?.toLowerCase().includes(cityFilter.toLowerCase())

    return matchesSearch && matchesReligion && matchesCaste && matchesCity
  })

  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);
    
    try {
      const newProfiles = await getProfilesPage(page);
      if (newProfiles.length > 0) {
        setProfiles(prev => [...prev, ...newProfiles]);
        setPage(p => p + 1);
        if (newProfiles.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more profiles", error);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search names, bio..." 
              className="pl-9 bg-background/50 border-white/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Input 
            placeholder="Religion" 
            className="bg-background/50 border-white/20"
            value={religionFilter}
            onChange={(e) => setReligionFilter(e.target.value)}
          />
          <Input 
            placeholder="Caste" 
            className="bg-background/50 border-white/20"
            value={casteFilter}
            onChange={(e) => setCasteFilter(e.target.value)}
          />
          <Input 
            placeholder="City" 
            className="bg-background/50 border-white/20"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <p className="text-muted-foreground text-lg">No profiles match your filters.</p>
          <Button 
            variant="link" 
            onClick={() => { setSearchTerm(""); setReligionFilter(""); setCasteFilter(""); setCityFilter(""); }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          layout
        >
          <AnimatePresence>
            {filteredProfiles.map((profile, i) => {
              const age = new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()
              
              return (
                <motion.div
                  key={profile.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-2xl overflow-hidden group hover:shadow-2xl transition-all"
                >
                  <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                    {profile.profile_photo_path ? (
                      <img 
                        src={profile.profile_photo_path} 
                        alt={profile.full_name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground bg-primary/5">
                        No Photo
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-2xl font-bold">{profile.full_name}, {age}</h3>
                      <div className="flex items-center gap-2 text-sm text-white/80 mt-1">
                        <MapPin className="w-4 h-4" /> {profile.town || "Unknown"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="space-y-2 mb-6">
                      {profile.profession && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4 text-primary" /> {profile.profession}
                        </div>
                      )}
                      {profile.education && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="w-4 h-4 text-primary" /> {profile.education}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {profile.religion && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {profile.religion}
                        </span>
                      )}
                      {profile.caste && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {profile.caste}
                        </span>
                      )}
                    </div>

                    <Link 
                      href={profile.id ? `/profile/${profile.id}` : "#"}
                      className={cn(buttonVariants({ variant: "default" }), "w-full rounded-full shadow-md shadow-primary/20")}
                    >
                      View Full Profile
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination Load More */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 shadow-sm"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Profiles"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
