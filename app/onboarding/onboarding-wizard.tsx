"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema, type OnboardingData } from "@/lib/validations/onboarding"
import { saveOnboardingProgress, getOnboardingProgress } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  "Basic Information",
  "Location & Community",
  "Personal Details",
  "Family Background",
  "Horoscope",
  "Partner Preferences",
  "Verification"
]

export default function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema) as any,
    mode: "onChange",
    defaultValues: {
      full_name: "",
      date_of_birth: "",
      gender: "other",
      height_cm: 160,
      avatar_url: "",
      city: "",
      religion: "",
      caste: "",
      sub_caste: "",
      education: "",
      occupation: "",
      income_annual: 0,
      bio: "",
      family_type: "",
      father_occupation: "",
      siblings: "",
      manglik: "no",
      horoscope_details: "",
      partner_age_min: 18,
      partner_age_max: 50,
      partner_location: "",
      partner_religion: "",
      partner_caste: "",
      aadhaar_last_four: "",
      verification_doc_url: ""
    }
  })

  useEffect(() => {
    async function loadProgress() {
      const progress = await getOnboardingProgress()
      if (progress) {
        if (progress.onboarding_completed) {
          router.push("/dashboard")
          return
        }
        
        setStep(progress.onboarding_step || 1)
        
        // Populate form
        const details = progress.profile_details
        form.reset({
          full_name: progress.full_name || "",
          date_of_birth: progress.date_of_birth || "",
          gender: progress.gender || "other",
          avatar_url: progress.avatar_url || "",
          city: details?.city || "",
          religion: details?.religion || "",
          caste: details?.caste || "",
          sub_caste: details?.sub_caste || "",
          education: details?.education || "",
          occupation: details?.occupation || "",
          income_annual: details?.income_annual || 0,
          bio: details?.bio || "",
          family_type: details?.family_type || "",
          father_occupation: details?.father_occupation || "",
          siblings: details?.siblings || "",
          manglik: details?.manglik || "no",
          horoscope_details: details?.horoscope_details || "",
          partner_age_min: details?.partner_age_min || 18,
          partner_age_max: details?.partner_age_max || 50,
          partner_location: details?.partner_location || "",
          partner_religion: details?.partner_religion || "",
          partner_caste: details?.partner_caste || "",
          aadhaar_last_four: details?.aadhaar_last_four || ""
        })
      }
      setLoading(false)
    }
    loadProgress()
  }, [form, router])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, field: "avatar_url" | "verification_doc_url") {
    const file = e.target.files?.[0]
    if (!file) return

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const bucket = field === "avatar_url" ? "profile-photos" : "verification-docs"
    const fileExt = file.name.split(".").pop()
    const filePath = `${user.id}/${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) {
      console.error("Upload error details:", uploadError)
      alert("Image upload failed: " + uploadError.message)
    } else {
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath)
      form.setValue(field, publicUrl)
    }
    setSaving(false)
  }

  async function onNext() {
    const fieldsByStep: (keyof OnboardingData)[][] = [
      [], // placeholder for step 0
      ["full_name", "date_of_birth", "gender", "height_cm", "avatar_url"],
      ["city", "religion", "caste", "sub_caste"],
      ["education", "occupation", "income_annual", "bio"],
      ["family_type", "father_occupation", "siblings"],
      ["manglik", "horoscope_details"],
      ["partner_age_min", "partner_age_max", "partner_location", "partner_religion", "partner_caste"],
      ["aadhaar_last_four", "verification_doc_url"]
    ]

    const stepFields = fieldsByStep[step]
    const isValid = await form.trigger(stepFields as any)

    if (isValid) {
      setSaving(true)
      const isLastStep = step === STEPS.length
      try {
        await saveOnboardingProgress(step + (isLastStep ? 0 : 1), form.getValues(), isLastStep)
        if (isLastStep) {
          router.push("/dashboard")
        } else {
          setStep(s => s + 1)
        }
      } catch (error) {
        console.error("Save error:", error)
      } finally {
        setSaving(false)
      }
    }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10" />
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-xl font-medium"
      >
        Loading your profile...
      </motion.div>
    </div>
  )

  const progressValue = (step / STEPS.length) * 100

  return (
    <div className="min-h-screen relative overflow-hidden pt-12 pb-24 px-4 sm:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="mx-auto max-w-2xl relative z-10">
        <div className="mb-12">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4">
            <span>Step {step} of {STEPS.length}</span>
            <span>{Math.round(progressValue)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <motion.h1 
            key={`title-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mt-6 text-center"
          >
            {STEPS[step - 1]}
          </motion.h1>
        </div>

        <motion.div 
          className="glass-panel p-8 sm:p-12 rounded-3xl"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input {...form.register("full_name")} placeholder="Your full name" className="h-12 bg-background/50" />
                      {form.formState.errors.full_name && <p className="text-sm text-destructive">{form.formState.errors.full_name.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input type="date" {...form.register("date_of_birth")} className="h-12 bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("gender")}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Height (cm)</Label>
                      <Input type="number" {...form.register("height_cm")} className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Profile Photo</Label>
                      <div className="flex items-center gap-4">
                        <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "avatar_url")} className="flex-1 bg-background/50" />
                        {form.watch("avatar_url") && (
                          <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 border-2 border-primary">
                            <img src={form.watch("avatar_url")} alt="Preview" className="h-full w-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Town/City</Label>
                      <Input {...form.register("city")} placeholder="e.g. Mumbai" className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Religion</Label>
                      <Input {...form.register("religion")} placeholder="e.g. Hindu" className="h-12 bg-background/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Caste</Label>
                        <Input {...form.register("caste")} placeholder="e.g. Brahmin" className="h-12 bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Sub-Caste (Optional)</Label>
                        <Input {...form.register("sub_caste")} className="h-12 bg-background/50" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Education</Label>
                      <Input {...form.register("education")} placeholder="e.g. B.Tech, MBA" className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession</Label>
                      <Input {...form.register("occupation")} placeholder="e.g. Software Engineer" className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Annual Income (INR)</Label>
                      <Input type="number" {...form.register("income_annual")} className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>About Me</Label>
                      <Textarea {...form.register("bio")} placeholder="Write a few lines about yourself..." className="min-h-[120px] bg-background/50" />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Family Type</Label>
                      <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("family_type")}>
                        <option value="">Select...</option>
                        <option value="nuclear">Nuclear</option>
                        <option value="joint">Joint</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Father's Occupation</Label>
                      <Input {...form.register("father_occupation")} className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Siblings</Label>
                      <Input {...form.register("siblings")} placeholder="e.g. 1 Brother, 2 Sisters" className="h-12 bg-background/50" />
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Manglik</Label>
                      <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("manglik")}>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="dont_know">Don't Know</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Horoscope Details (Optional)</Label>
                      <Textarea {...form.register("horoscope_details")} placeholder="Time of birth, Place of birth etc" className="min-h-[120px] bg-background/50" />
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Partner Min Age</Label>
                        <Input type="number" {...form.register("partner_age_min")} className="h-12 bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Partner Max Age</Label>
                        <Input type="number" {...form.register("partner_age_max")} className="h-12 bg-background/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location Preference</Label>
                      <Input {...form.register("partner_location")} placeholder="e.g. Any, Same City" className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Religion Preference</Label>
                      <Input {...form.register("partner_religion")} className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Caste Preference</Label>
                      <Input {...form.register("partner_caste")} className="h-12 bg-background/50" />
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Aadhaar Last 4 Digits</Label>
                      <Input {...form.register("aadhaar_last_four")} maxLength={4} placeholder="1234" className="h-12 bg-background/50 text-xl tracking-widest" />
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Aadhaar Image</Label>
                      <div className="p-4 border-2 border-dashed border-primary/20 rounded-xl bg-background/30 text-center hover:bg-background/50 transition-colors">
                        <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "verification_doc_url")} className="mx-auto" />
                      </div>
                      {form.watch("verification_doc_url") && <p className="text-sm text-green-600 font-medium text-center mt-2">Document uploaded successfully ✓</p>}
                    </div>
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <p className="text-sm text-muted-foreground text-center">
                        Your Aadhaar details are only used for human verification by our team and are <strong className="text-foreground">never</strong> shared with other users.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-between pt-6 border-t border-border/50">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1 || saving}
            >
              Back
            </Button>
            <Button 
              onClick={onNext} 
              disabled={saving}
              size="lg"
              className="rounded-full px-8 shadow-md shadow-primary/20"
            >
              {saving ? "Saving..." : step === STEPS.length ? "Complete Profile" : "Continue"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
