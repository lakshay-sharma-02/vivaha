"use client"

import { useState, useEffect } from "react"
import { getPendingProfiles, adminUpdateProfileStatus, adminSearchProfiles, adminDeleteProfile } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { CheckCircle2, XCircle, Clock, AlertCircle, FileText, User, Search, RefreshCw, Trash2 } from "lucide-react"

export default function AdminVerificationPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectionReason, setRejectionReason] = useState<{ [key: string]: string }>({})
  const [activeTab, setActiveTab] = useState<"queue" | "search">("queue")

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    loadProfiles()
  }, [])

  async function loadProfiles() {
    try {
      const data = await getPendingProfiles()
      setProfiles(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(profileId: string, status: 'VERIFIED' | 'REJECTED') {
    try {
      await adminUpdateProfileStatus(
        profileId, 
        status, 
        status === 'REJECTED' ? rejectionReason[profileId] : undefined
      )
      await loadProfiles()
    } catch (err) {
      alert("Error updating profile")
    }
  }

  useEffect(() => {
    if (activeTab === 'search') {
      handleSearch()
    }
  }, [activeTab])

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault()

    setIsSearching(true)
    try {
      const results = await adminSearchProfiles(searchTerm)
      setSearchResults(results)
    } catch (err) {
      alert("Error searching profiles")
    } finally {
      setIsSearching(false)
    }
  }

  async function handleDelete(profileId: string) {
    if (!confirm("Are you sure you want to completely delete this profile? This cannot be undone.")) return

    try {
      await adminDeleteProfile(profileId)
      setSearchResults(prev => prev.filter(p => p.id !== profileId))
      alert("Profile deleted successfully")
    } catch (err) {
      alert("Error deleting profile")
    }
  }

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="text-xl font-medium animate-pulse">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <div className="flex bg-background/50 border border-border rounded-full p-1">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'queue' ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("queue")}
            >
              Verification Queue ({profiles.length})
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'search' ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("search")}
            >
              Search & Manage
            </button>
          </div>
        </div>

        {activeTab === "queue" && (
          <>
            {profiles.length === 0 ? (
          <div className="max-w-md mx-auto mt-20">
            <div className="bg-card border border-border shadow-sm p-12 text-center rounded-xl">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
              <p className="text-muted-foreground">There are no pending profiles to verify right now.</p>
            </div>
          </div>
        ) : (
          <motion.div className="grid gap-8" layout>
            <AnimatePresence>
              {profiles.map((profile) => {
                const doc = profile.verification_documents?.[0]
                return (
                <motion.div 
                  key={profile.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border shadow-sm rounded-xl overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Left side: Profile Summary */}
                    <div className="w-full lg:w-1/3 p-8 bg-muted/30 border-r border-border/50">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-background border-2 border-primary/20 shrink-0">
                          {profile.profile_photo_path ? (
                            <Image src={profile.profile_photo_path} alt="" width={64} height={64} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-full h-full p-3 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{profile.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.town} • {profile.date_of_birth}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Aadhaar</p>
                          <p className="font-mono bg-background/50 px-3 py-2 rounded-lg border border-border/50">
                            xxxx xxxx {doc?.aadhaar_last4 || "----"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bio</p>
                          <p className="text-sm bg-background/50 p-3 rounded-lg border border-border/50 line-clamp-4">
                            {profile.about_me || "No bio"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Verification Document & Actions */}
                    <div className="w-full lg:w-2/3 p-8 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" /> Submitted Document
                        </h4>
                        <div className="bg-background/50 rounded-2xl border border-border/50 p-4 aspect-video relative overflow-hidden flex items-center justify-center group cursor-pointer"
                             onClick={() => window.open(doc?.aadhaar_photo_path, '_blank')}>
                          {doc?.aadhaar_photo_path ? (
                            <Image 
                              src={doc.aadhaar_photo_path} 
                              alt="Aadhaar Document" 
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <p className="text-muted-foreground">No document uploaded</p>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Click to view full size</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border/50">
                        <div className="flex flex-col sm:flex-row items-end gap-4">
                          <div className="flex-1 w-full space-y-2">
                            <label className="text-sm font-medium">Rejection Reason <span className="text-muted-foreground font-normal">(required if rejecting)</span></label>
                            <Input 
                              placeholder="e.g. Document is blurry, name mismatch..." 
                              value={rejectionReason[profile.id] || ""}
                              onChange={(e) => setRejectionReason({...rejectionReason, [profile.id]: e.target.value})}
                              className="bg-background/50 h-11"
                            />
                          </div>
                          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
                            <Button 
                              variant="outline"
                              onClick={() => handleUpdate(profile.id, 'REJECTED')}
                              disabled={!rejectionReason[profile.id]}
                              className="flex-1 sm:flex-none border-destructive text-destructive hover:bg-destructive hover:text-white h-11"
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Reject
                            </Button>
                            <Button 
                              onClick={() => handleUpdate(profile.id, 'VERIFIED')}
                              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white h-11"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </motion.div>
        )}
          </>
        )}

        {activeTab === "search" && (
          <div className="bg-card border border-border shadow-sm p-8 rounded-xl space-y-6">
            <h2 className="text-2xl font-bold">Search & Manage Profiles</h2>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or phone number..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-background/50 text-lg"
                />
              </div>
              <Button type="submit" disabled={isSearching} className="h-12 px-8">
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>

            {searchResults.length > 0 && (
              <div className="mt-8 border border-border/50 rounded-2xl overflow-hidden bg-background/50">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Phone Number</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Joined</th>
                      <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {searchResults.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                        <td className="p-4 font-medium">{p.full_name || "Unknown"}</td>
                        <td className="p-4 font-mono">{p.phone_number || "N/A"}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.status === 'VERIFIED' ? 'bg-green-500/20 text-green-500' :
                            p.status === 'PENDING_VERIFICATION' ? 'bg-yellow-500/20 text-yellow-500' :
                            p.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(p.id)}
                            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {searchResults.length === 0 && searchTerm && !isSearching && (
              <div className="text-center py-12 text-muted-foreground">
                No profiles found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
