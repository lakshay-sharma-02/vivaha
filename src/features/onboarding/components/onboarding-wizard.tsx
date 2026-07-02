"use client"

import * as React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import { Label } from "@/shared/ui/label/label"
import { Slider } from "@/shared/ui/slider"
import { useRouter } from "next/navigation"
import { Camera, ShieldCheck, UploadCloud, CheckCircle2, Search, Heart, MapPin, Briefcase, Loader2 } from "lucide-react"
import { saveOnboardingData } from "@/app/actions/onboarding"
import { createClient } from "@/shared/lib/supabase/client"
import { toast } from "sonner"
import { useReducedMotion } from "@/shared/animations"

const STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "identity", title: "Basic Identity" },
  { id: "location", title: "Location" },
  { id: "education", title: "Education" },
  { id: "culture", title: "Religion & Culture" },
  { id: "family", title: "Family" },
  { id: "lifestyle", title: "Lifestyle" },
  { id: "preferences", title: "Partner Preferences" },
  { id: "photos", title: "Photos" },
  { id: "verification", title: "Verification" },
  { id: "review", title: "Review" },
  { id: "completion", title: "Completion" },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = React.useState(false)
  const [primaryPhotoUrl, setPrimaryPhotoUrl] = React.useState("")
  const [isUploadingDoc, setIsUploadingDoc] = React.useState(false)
  const [documentUploaded, setDocumentUploaded] = React.useState(false)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingPhoto(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-primary-${Math.random()}.${fileExt}`
      const { error: storageError } = await supabase.storage.from('profile_photos').upload(fileName, file)
      if (storageError) throw storageError
      
      await supabase.from('profile_media').update({ is_primary: false }).eq('profile_id', user.id)
      const { error: dbError } = await supabase.from('profile_media').insert({
        profile_id: user.id,
        type: 'image',
        bucket_path: fileName,
        is_primary: true,
        display_order: 0
      })
      if (dbError) throw dbError

      // Fetch the public URL to display immediately
      const { data: urlData } = supabase.storage.from('profile_photos').getPublicUrl(fileName)
      setPrimaryPhotoUrl(urlData.publicUrl)
    } catch (err) {
      toast.error("Failed to upload photo: " + (err as Error).message)
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingDoc(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const { error: storageError } = await supabase.storage.from('verification_documents').upload(fileName, file)
      if (storageError) throw storageError

      const { error: dbError } = await supabase.from('verification_documents').insert({
        profile_id: user.id,
        document_type: 'government_id',
        bucket_path: fileName,
        status: 'pending'
      })
      if (dbError) throw dbError
      
      await supabase.from('profiles').update({ verification_status: 'pending' }).eq('id', user.id)
      setDocumentUploaded(true)
    } catch (err) {
      toast.error("Failed to upload document: " + (err as Error).message)
    } finally {
      setIsUploadingDoc(false)
    }
  }

  const [formData, setFormData] = React.useState({
    firstName: "", lastName: "", gender: "", dateOfBirth: "", height: "",
    country: "", state: "", city: "", phone: "", instagram: "",
    highestQual: "", university: "", occupation: "", company: "", income: "",
    religion: "", community: "", motherTongue: "", gotra: "", maternalGotra: "", grandmotherGotra: "",
    fatherOccupation: "", motherOccupation: "", familyType: "", familyValues: "", siblings: "",
    minAge: 18, maxAge: 60, minHeight: 140, maxHeight: 220, hobbies: ""
  })
  const [selections, setSelections] = React.useState<Record<string, string[]>>({
    lifestyle: [],
    prefReligion: []
  })
  const router = useRouter()

  const getRangeValues = (value: number | readonly number[]) => {
    if (Array.isArray(value)) {
      return [value[0] ?? 0, value[1] ?? value[0] ?? 0] as const
    }

    return [value, value] as const
  }

  const nextStep = async () => {
    if (currentStep === 10) {
      setIsSaving(true)
      await saveOnboardingData({
        ...formData,
        gender: formData.gender === "male" || formData.gender === "female" ? formData.gender : undefined,
        lifestyleChips: selections.lifestyle,
        prefReligionChips: selections.prefReligion
      })
      setIsSaving(false)
    }

    if (currentStep < STEPS.length - 1) {
      setDirection(1)
      setCurrentStep(c => c + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(c => c - 1)
    }
  }

  const toggleChip = (category: string, value: string) => {
    setSelections(prev => {
      const current = prev[category] || []
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) }
      }
      return { ...prev, [category]: [...current, value] }
    })
  }

  const reducedMotion = useReducedMotion()

  const variants: Variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: reducedMotion ? 0.01 : 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden h-screen w-full">
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 bg-black pointer-events-none">
        <motion.div
          animate={reducedMotion ? {} : { opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={reducedMotion ? {} : { opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Progress Bar (Hidden on Welcome and Completion) */}
      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-amber-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (STEPS.length - 2)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="w-full max-w-2xl px-6 relative z-10 flex flex-col items-center h-full justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-h-[80vh] overflow-y-auto hide-scrollbar pb-24"
          >
            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <div className="text-center space-y-8 flex flex-col items-center justify-center h-[60vh]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                  className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30 shadow-[0_0_50px_rgba(232,185,108,0.3)]"
                >
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </motion.div>
                <div className="space-y-4">
                  <h1 className="font-playfair text-5xl md:text-6xl font-medium tracking-tight">
                    Welcome to Vivaha
                  </h1>
                  <p className="text-lg text-white/60 max-w-md mx-auto leading-relaxed">
                    Your journey begins here. We will now build your profile, verify your identity, and uncover exactly what you are looking for.
                  </p>
                </div>
                <div className="pt-8 w-full max-w-xs">
                  <Button onClick={nextStep} size="lg" className="w-full h-14 rounded-full text-md shadow-2xl shadow-primary/20">
                    Begin Journey
                  </Button>
                </div>
              </div>
            )}

            {/* Step 1: Basic Identity */}
            {currentStep === 1 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Basic Identity</h2>
                  <p className="text-white/50">Let's start with the essentials.</p>
                </div>
                
                <div className="flex flex-col items-center mb-10">
                  <div className="w-32 h-32 rounded-full border border-dashed border-white/30 flex flex-col items-center justify-center bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer group">
                    <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">Add Photo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">First Name</Label>
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Last Name</Label>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Gender</Label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="male" className="bg-zinc-900">Male</option>
                      <option value="female" className="bg-zinc-900">Female</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Date of Birth</Label>
                    <Input 
                      type="date" 
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" 
                    />
                  </div>
                  <div className="space-y-3 col-span-2 md:col-span-1">
                    <Label className="text-white/70 ml-1">Height (cm)</Label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 175"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" 
                    />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <Label className="text-white/70 ml-1">Private Phone Number</Label>
                    <Input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" 
                    />
                    <p className="text-[10px] text-white/40 ml-1">Only revealed to matches you accept.</p>
                  </div>
                  <div className="space-y-3 col-span-2">
                    <Label className="text-white/70 ml-1">Instagram Handle (Optional)</Label>
                    <Input 
                      type="text" 
                      placeholder="@username"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" 
                    />
                    <p className="text-[10px] text-white/40 ml-1">Helps verify your identity. Only shown to mutual matches.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Location</h2>
                  <p className="text-white/50">Where are you currently based?</p>
                </div>
                
                <div className="w-full max-w-md mx-auto h-40 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 overflow-hidden relative group cursor-pointer">
                  <MapPin className="w-8 h-8 text-white/20 absolute group-hover:scale-125 group-hover:text-primary transition-all duration-500" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity" />
                  <span className="relative z-10 text-sm font-medium text-white/50 mt-16 group-hover:text-white transition-colors">Detect Current Location</span>
                </div>

                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Country</Label>
                    <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} placeholder="e.g. United States" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">State / Region</Label>
                      <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} placeholder="e.g. California" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">City</Label>
                      <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="e.g. San Francisco" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education & Career */}
            {currentStep === 3 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Education & Career</h2>
                  <p className="text-white/50">Your academic and professional journey.</p>
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Highest Qualification</Label>
                    <Input value={formData.highestQual} onChange={(e) => setFormData({ ...formData, highestQual: e.target.value })} placeholder="e.g. Masters in Computer Science" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">University</Label>
                    <Input value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} placeholder="e.g. Stanford University" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Occupation</Label>
                    <Input value={formData.occupation} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} placeholder="e.g. Lead Product Designer" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Company</Label>
                      <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. Apple" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Income Range</Label>
                      <select 
                        value={formData.income}
                        onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                        className="flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                      >
                        <option value="" disabled>Select...</option>
                        <option value="1" className="bg-zinc-900">Prefer not to say</option>
                        <option value="2" className="bg-zinc-900">₹5L - ₹10L</option>
                        <option value="3" className="bg-zinc-900">₹10L - ₹20L</option>
                        <option value="4" className="bg-zinc-900">₹20L - ₹50L</option>
                        <option value="5" className="bg-zinc-900">₹50L - ₹1Cr</option>
                        <option value="6" className="bg-zinc-900">₹1Cr+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Religion & Culture */}
            {currentStep === 4 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Religion & Culture</h2>
                  <p className="text-white/50">Your cultural background and roots.</p>
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Religion</Label>
                      <Input value={formData.religion} onChange={(e) => setFormData({ ...formData, religion: e.target.value })} placeholder="e.g. Hindu" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Community / Caste</Label>
                      <Input value={formData.community} onChange={(e) => setFormData({ ...formData, community: e.target.value })} placeholder="e.g. Brahmin (Optional)" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Mother Tongue</Label>
                    <Input value={formData.motherTongue} onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })} placeholder="e.g. Hindi, English" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Your Gotra</Label>
                      <Input value={formData.gotra} onChange={(e) => setFormData({ ...formData, gotra: e.target.value })} placeholder="e.g. Kashyap" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Mother's Gotra</Label>
                      <Input value={formData.maternalGotra} onChange={(e) => setFormData({ ...formData, maternalGotra: e.target.value })} placeholder="Optional" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Dadi's Gotra</Label>
                      <Input value={formData.grandmotherGotra} onChange={(e) => setFormData({ ...formData, grandmotherGotra: e.target.value })} placeholder="Optional" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Family */}
            {currentStep === 5 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Family</h2>
                  <p className="text-white/50">A brief overview of your family.</p>
                </div>
                
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Father's Occupation</Label>
                      <Input value={formData.fatherOccupation} onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })} placeholder="e.g. Doctor" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Mother's Occupation</Label>
                      <Input value={formData.motherOccupation} onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })} placeholder="e.g. Teacher" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Family Type</Label>
                      <select value={formData.familyType} onChange={(e) => setFormData({ ...formData, familyType: e.target.value })} className="flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/30 appearance-none focus:outline-none focus:ring-1 focus:ring-primary">
                        <option value="" disabled>Select...</option>
                        <option value="nuclear" className="bg-zinc-900">Nuclear</option>
                        <option value="joint" className="bg-zinc-900">Joint</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70 ml-1">Family Values</Label>
                      <select value={formData.familyValues} onChange={(e) => setFormData({ ...formData, familyValues: e.target.value })} className="flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/30 appearance-none focus:outline-none focus:ring-1 focus:ring-primary">
                        <option value="" disabled>Select...</option>
                        <option value="orthodox" className="bg-zinc-900">Orthodox</option>
                        <option value="traditional" className="bg-zinc-900">Traditional</option>
                        <option value="moderate" className="bg-zinc-900">Moderate</option>
                        <option value="liberal" className="bg-zinc-900">Liberal</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Siblings</Label>
                    <Input value={formData.siblings} onChange={(e) => setFormData({ ...formData, siblings: e.target.value })} placeholder="e.g. 1 Brother, 1 Sister" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Lifestyle */}
            {currentStep === 6 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Lifestyle</h2>
                  <p className="text-white/50">Select all that apply to you.</p>
                </div>
                
                <div className="max-w-xl mx-auto space-y-8">
                  <div className="space-y-4">
                    <Label className="text-white/70 ml-1 block">Diet</Label>
                    <div className="flex flex-wrap gap-3">
                      {["Vegetarian", "Non-Vegetarian", "Vegan", "Pescatarian"].map(item => (
                        <button
                          key={item}
                          onClick={() => toggleChip("lifestyle", item)}
                          className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                            selections.lifestyle.includes(item) 
                              ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(232,185,108,0.4)]" 
                              : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-white/70 ml-1 block">Habits</Label>
                    <div className="flex flex-wrap gap-3">
                      {["Never Smoke", "Occasional Smoker", "Never Drink", "Social Drinker", "Fitness Enthusiast", "Pet Lover"].map(item => (
                        <button
                          key={item}
                          onClick={() => toggleChip("lifestyle", item)}
                          className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                            selections.lifestyle.includes(item) 
                              ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(232,185,108,0.4)]" 
                              : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <Label className="text-white/70 ml-1 block">Other Hobbies & Interests</Label>
                    <Input 
                      value={formData.hobbies} 
                      onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })} 
                      placeholder="e.g. Reading, Traveling, Photography" 
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Preferences */}
            {currentStep === 7 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Partner Preferences</h2>
                  <p className="text-white/50">What are you looking for in a partner?</p>
                </div>
                
                <div className="max-w-md mx-auto space-y-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <Label className="text-white/70 ml-1">Age Range</Label>
                      <span className="text-primary font-medium">{formData.minAge} - {formData.maxAge} years</span>
                    </div>
                    <Slider 
                      value={[formData.minAge, formData.maxAge]} 
                      onValueChange={(val) => {
                        const [minAge, maxAge] = getRangeValues(val)
                        setFormData({ ...formData, minAge, maxAge })
                      }}
                      max={60} 
                      min={18} 
                      step={1} 
                      className="w-full" 
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <Label className="text-white/70 ml-1">Height Range</Label>
                      <span className="text-primary font-medium">{formData.minHeight}cm - {formData.maxHeight}cm</span>
                    </div>
                    <Slider 
                      value={[formData.minHeight, formData.maxHeight]} 
                      onValueChange={(val) => {
                        const [minHeight, maxHeight] = getRangeValues(val)
                        setFormData({ ...formData, minHeight, maxHeight })
                      }}
                      max={220} 
                      min={140} 
                      step={1} 
                      className="w-full" 
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <Label className="text-white/70 ml-1 block">Preferred Religions</Label>
                    <div className="flex flex-wrap gap-3">
                      {["Open to All", "Hindu", "Christian", "Sikh", "Jain"].map(item => (
                        <button
                          key={item}
                          onClick={() => toggleChip("prefReligion", item)}
                          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                            selections.prefReligion.includes(item) 
                              ? "bg-white text-black" 
                              : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Photos */}
            {currentStep === 8 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Gallery</h2>
                  <p className="text-white/50">Upload high-quality, clear photos of yourself.</p>
                </div>
                
                <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4">
                  {/* Primary Photo Slot */}
                  <div className="col-span-2 row-span-2 relative rounded-3xl border-2 border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-primary/10 transition-colors aspect-square md:aspect-auto overflow-hidden">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {isUploadingPhoto ? (
                      <div className="flex flex-col items-center justify-center text-primary">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="font-medium text-lg">Uploading...</p>
                      </div>
                    ) : primaryPhotoUrl ? (
                      <img src={primaryPhotoUrl} className="absolute inset-0 w-full h-full object-cover" alt="Primary" />
                    ) : (
                      <>
                        <UploadCloud className="w-10 h-10 text-primary mb-4" />
                        <p className="text-white font-medium text-lg">Primary Photo</p>
                        <p className="text-white/50 text-sm mt-2 text-center">Drag & drop or click to upload<br/>(Max 5MB)</p>
                      </>
                    )}
                  </div>
                  
                  {/* Additional Slots */}
                  {[1, 2].map(i => (
                    <div key={i} className="relative rounded-3xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors aspect-square">
                      <Camera className="w-6 h-6 text-white/40 mb-2" />
                      <span className="text-white/40 text-xs">Add Photo</span>
                    </div>
                  ))}
                  {[3, 4, 5].map(i => (
                    <div key={i} className="relative rounded-3xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors aspect-square">
                      <Camera className="w-6 h-6 text-white/40 mb-2" />
                      <span className="text-white/40 text-xs">Add Photo</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Verification */}
            {currentStep === 9 && (
              <div className="space-y-10">
                <div className="text-center space-y-3 mb-12">
                  <h2 className="font-playfair text-4xl font-medium">Verification</h2>
                  <p className="text-white/50">Vivaha is a trusted community. We require basic identity verification.</p>
                </div>
                
                <div className="max-w-md mx-auto space-y-6">
                  <div className="glass rounded-3xl p-6 border-white/10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Selfie Verification</h3>
                      <p className="text-white/50 text-sm mb-4">Take a quick selfie to prove you're a real person. It won't be shown on your profile.</p>
                      <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10">Start Camera</Button>
                    </div>
                  </div>
                  
                  <div className="glass rounded-3xl p-6 border-white/10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Government ID</h3>
                      <p className="text-white/50 text-sm mb-4">Upload a secure copy of your Passport, Driver's License, or National ID.</p>
                      <div className="relative">
                        <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleDocUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10" disabled={isUploadingDoc}>
                          {isUploadingDoc ? "Uploading..." : documentUploaded ? "Document Uploaded ✓" : "Upload Document"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 10: Review */}
            {currentStep === 10 && (() => {
              const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(" ") || "—"
              let age: number | null = null
              if (formData.dateOfBirth) {
                const birth = new Date(formData.dateOfBirth)
                const today = new Date()
                age = today.getFullYear() - birth.getFullYear()
                const m = today.getMonth() - birth.getMonth()
                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
              }
              const locationStr = [formData.city, formData.state].filter(Boolean).join(", ") || "—"
              const jobStr = [formData.occupation, formData.company].filter(Boolean).join(" at ") || "—"
              const diet = selections.lifestyle.find(s => ["Vegetarian", "Non-Vegetarian", "Vegan", "Pescatarian"].includes(s)) || "—"
              return (
                <div className="space-y-10">
                  <div className="text-center space-y-3 mb-12">
                    <h2 className="font-playfair text-4xl font-medium">Review Profile</h2>
                    <p className="text-white/50">Your profile is 98% complete.</p>
                  </div>
                  
                  <div className="max-w-lg mx-auto glass rounded-[2.5rem] p-8 border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                    
                    <div className="flex items-center gap-6 mb-8 relative z-10">
                      <div className="w-24 h-24 rounded-full bg-zinc-800 shrink-0 border-2 border-primary/50 overflow-hidden">
                        {primaryPhotoUrl ? (
                          <img src={primaryPhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-3xl font-playfair text-white/30">
                            {formData.firstName?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-playfair font-medium text-white flex items-center gap-2">
                          {fullName}
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </h3>
                        <p className="text-white/60">{age ? `${age}` : "—"} • {locationStr}</p>
                        {jobStr !== "—" && <p className="text-primary mt-1 text-sm font-medium">{jobStr}</p>}
                      </div>
                    </div>

                    <div className="space-y-4 relative z-10 border-t border-white/10 pt-6">
                      <div className="flex justify-between">
                        <span className="text-white/50 text-sm">Religion</span>
                        <span className="text-white text-sm font-medium">{formData.religion || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50 text-sm">Community</span>
                        <span className="text-white text-sm font-medium">{formData.community || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50 text-sm">Height</span>
                        <span className="text-white text-sm font-medium">{formData.height ? `${formData.height} cm` : "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50 text-sm">Diet</span>
                        <span className="text-white text-sm font-medium">{diet}</span>
                      </div>
                      {formData.motherTongue && (
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Mother Tongue</span>
                          <span className="text-white text-sm font-medium">{formData.motherTongue}</span>
                        </div>
                      )}
                      {selections.lifestyle.length > 0 && (
                        <div className="flex justify-between items-start gap-4 pt-2">
                          <span className="text-white/50 text-sm shrink-0">Lifestyle</span>
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {selections.lifestyle.slice(0, 4).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Step 11: Completion */}
            {currentStep === 11 && (
              <div className="text-center space-y-8 flex flex-col items-center justify-center h-[60vh]">
                <motion.div
                  initial={{ scale: 0, rotateZ: -180 }}
                  animate={{ scale: 1, rotateZ: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4 shadow-[0_0_80px_rgba(232,185,108,0.6)] relative"
                >
                  <CheckCircle2 className="w-12 h-12 text-black" />
                  
                  {/* Celebration Particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1, 0], 
                        x: Math.cos((i * 60) * (Math.PI / 180)) * 100, 
                        y: Math.sin((i * 60) * (Math.PI / 180)) * 100 
                      }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="absolute w-3 h-3 bg-white rounded-full"
                    />
                  ))}
                </motion.div>
                <div className="space-y-4">
                  <h1 className="font-playfair text-5xl md:text-6xl font-medium tracking-tight">
                    Application Submitted
                  </h1>
                  <p className="text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
                    Your profile is now live in the verification queue. Welcome to the world's most exclusive matrimony platform.
                  </p>
                </div>
                <div className="pt-8 w-full max-w-xs">
                  <Button onClick={() => router.push('/dashboard')} size="lg" className="w-full h-14 rounded-full text-md shadow-2xl shadow-primary/20">
                    Enter Dashboard
                  </Button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Global Navigation Controls */}
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="fixed bottom-8 w-full flex justify-between items-center px-6 md:px-12 max-w-4xl left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-md py-4 rounded-full border border-white/10"
          >
            <Button variant="ghost" onClick={prevStep} disabled={isSaving} className="text-white/50 hover:text-white hover:bg-white/10 px-6 rounded-full">
              Back
            </Button>
            
            <div className="text-sm font-medium text-white/40 hidden md:block">
              Step {currentStep} of {STEPS.length - 2} • <span className="text-white/80">{STEPS[currentStep].title}</span>
            </div>

            <Button onClick={nextStep} disabled={isSaving} className="rounded-full px-8 shadow-[0_0_20px_rgba(232,185,108,0.2)]">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : currentStep === 10 ? "Submit Application" : "Continue"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
