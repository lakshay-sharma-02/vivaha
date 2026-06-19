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

export default function OnboardingWizard({ editMode = false }: { editMode?: boolean }) {
  const visibleSteps = editMode ? STEPS.slice(0, 6) : STEPS
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
      gender: "male",
      phone_number: "",
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
      gotra: "",
      mothers_gotra: "",
      grandmothers_gotra: "",
      manglik: "no",
      horoscope_details: "",
      partner_age_min: 18,
      partner_age_max: 50,
      partner_location: "",
      partner_religion: "",
      partner_caste: "",
      aadhaar_last_four: "",
      verification_doc_url: "",
      photo_2: "",
      photo_3: "",
      diet: "",
      smoking: "",
      drinking: "",
      hobbies: ""
    }
  })

  useEffect(() => {
    async function loadProgress() {
      const progress = await getOnboardingProgress()
      if (progress) {
        if (progress.status && progress.status !== 'DRAFT' && !editMode) {
          router.push("/dashboard")
          return
        }
        
        setStep(editMode ? 1 : progress.onboarding_step || 1)
        
        // Populate form (Progress is already mapped to frontend schema by actions.ts)
        form.reset({
          full_name: progress.full_name || "",
          date_of_birth: progress.date_of_birth || "",
          height_cm: progress.height_cm || 160,
          phone_number: progress.phone_number || "",
          gender: progress.gender || "male",
          avatar_url: progress.avatar_url || "",
          photo_2: progress.photo_2 || "",
          photo_3: progress.photo_3 || "",
          city: progress.city || "",
          religion: progress.religion || "",
          caste: progress.caste || "",
          sub_caste: progress.sub_caste || "",
          education: progress.education || "",
          occupation: progress.occupation || "",
          income_annual: progress.income_annual || 0,
          bio: progress.bio || "",
          family_type: progress.family_type || "",
          father_occupation: progress.father_occupation || "",
          siblings: progress.siblings || "",
          gotra: progress.gotra || "",
          mothers_gotra: progress.mothers_gotra || "",
          grandmothers_gotra: progress.grandmothers_gotra || "",
          manglik: progress.manglik || "no",
          diet: progress.diet || "",
          smoking: progress.smoking || "",
          drinking: progress.drinking || "",
          hobbies: progress.hobbies || "",
          horoscope_details: progress.horoscope_details || "",
          partner_age_min: progress.partner_age_min || 18,
          partner_age_max: progress.partner_age_max || 50,
          partner_location: progress.partner_location || "",
          partner_religion: progress.partner_religion || "",
          partner_caste: progress.partner_caste || "",
          aadhaar_last_four: progress.aadhaar_last_four || ""
        })
      }
      setLoading(false)
    }
    loadProgress()
  }, [form, router])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, field: "avatar_url" | "photo_2" | "photo_3" | "verification_doc_url") {
    const file = e.target.files?.[0]
    if (!file) return

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const bucket = field === "verification_doc_url" ? "verification-docs" : "profile-photos"
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
      ["full_name", "date_of_birth", "gender", "phone_number", "height_cm", "avatar_url", "photo_2", "photo_3"],
      ["city", "religion", "caste", "sub_caste"],
      ["education", "occupation", "income_annual", "bio"],
      ["family_type", "father_occupation", "siblings", "gotra", "mothers_gotra", "grandmothers_gotra"],
      ["manglik", "horoscope_details", "diet", "smoking", "drinking", "hobbies"],
      ["partner_age_min", "partner_age_max", "partner_location", "partner_religion", "partner_caste"],
      ["aadhaar_last_four", "verification_doc_url"]
    ]

    const stepFields = fieldsByStep[step]
    const isValid = await form.trigger(stepFields as any)

    if (isValid) {
      const isLastStep = step === visibleSteps.length
      if (isLastStep && !editMode) {
        const confirmSubmit = window.confirm("Are you sure you want to complete your profile? Your Aadhaar details will be submitted for manual verification.");
        if (!confirmSubmit) return;
      }
      
      setSaving(true)
      try {
        await saveOnboardingProgress(step + (isLastStep && !editMode ? 0 : 1), form.getValues(), isLastStep && !editMode)
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

  const progressValue = (step / visibleSteps.length) * 100

  return (
    <div className="min-h-screen relative overflow-hidden pt-12 pb-24 px-4 sm:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="mx-auto max-w-2xl relative z-10">
        <div className="mb-12">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4">
            <span>Step {step} of {visibleSteps.length}</span>
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
            {visibleSteps[step - 1]}
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
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input type="tel" {...form.register("phone_number")} placeholder="+91 9876543210" className="h-12 bg-background/50" />
                      {form.formState.errors.phone_number && <p className="text-sm text-destructive">{form.formState.errors.phone_number.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Height (cm)</Label>
                      <Input type="number" {...form.register("height_cm")} className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-4">
                      <Label>Profile Photos (Up to 3)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Photo 1 (Main) */}
                        <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-background/30">
                          <span className="text-sm font-medium">Main Photo</span>
                          <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "avatar_url")} />
                          {form.watch("avatar_url") && (
                            <div className="h-24 w-24 rounded-full overflow-hidden shrink-0 border-2 border-primary">
                              <img src={form.watch("avatar_url")} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                          )}
                        </div>
                        {/* Photo 2 */}
                        <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-background/30">
                          <span className="text-sm font-medium text-muted-foreground">Photo 2 (Optional)</span>
                          <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "photo_2")} />
                          {form.watch("photo_2") && (
                            <div className="h-24 w-24 rounded-xl overflow-hidden shrink-0 border-2 border-muted">
                              <img src={form.watch("photo_2")} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                          )}
                        </div>
                        {/* Photo 3 */}
                        <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-background/30">
                          <span className="text-sm font-medium text-muted-foreground">Photo 3 (Optional)</span>
                          <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "photo_3")} />
                          {form.watch("photo_3") && (
                            <div className="h-24 w-24 rounded-xl overflow-hidden shrink-0 border-2 border-muted">
                              <img src={form.watch("photo_3")} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                          )}
                        </div>
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
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-sm text-muted-foreground mb-4">Gotra information helps with compatibility matching.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Gotra <span className="text-xs text-muted-foreground">(Optional)</span></Label>
                          <Input {...form.register("gotra")} placeholder="Your Gotra" className="h-12 bg-background/50" />
                        </div>
                        <div className="space-y-2">
                          <Label>Mother's Gotra <span className="text-xs text-primary">(Ma)</span></Label>
                          <Input {...form.register("mothers_gotra")} placeholder="Mother's Gotra" className="h-12 bg-background/50" />
                        </div>
                        <div className="space-y-2">
                          <Label>Grandmother's Gotra <span className="text-xs text-primary">(Dadi)</span></Label>
                          <Input {...form.register("grandmothers_gotra")} placeholder="Dadi's Gotra" className="h-12 bg-background/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Manglik</Label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("manglik")}>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                          <option value="dont_know">Don't Know</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Diet (Optional)</Label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("diet")}>
                          <option value="">Select...</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="non_vegetarian">Non-Vegetarian</option>
                          <option value="eggetarian">Eggetarian</option>
                          <option value="vegan">Vegan</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Smoking (Optional)</Label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("smoking")}>
                          <option value="">Select...</option>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                          <option value="occasionally">Occasionally</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Drinking (Optional)</Label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent" {...form.register("drinking")}>
                          <option value="">Select...</option>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                          <option value="socially">Socially</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Hobbies & Interests (Optional)</Label>
                      <Input {...form.register("hobbies")} placeholder="e.g. Reading, Traveling, Cooking, Photography..." className="h-12 bg-background/50" />
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
              {saving ? "Saving..." : step === visibleSteps.length ? (editMode ? "Save Changes" : "Complete Profile") : "Continue"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
