"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema, type OnboardingData } from "@/lib/validations/onboarding"
import { saveOnboardingProgress, getOnboardingProgress } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { StepBasicInfo } from "./steps/basic-info"
import { StepLocationCommunity } from "./steps/location-community"
import { StepEducationProfession } from "./steps/education-profession"
import { StepFamilyDetails } from "./steps/family-details"
import { StepLifestyle } from "./steps/lifestyle"
import { StepPartnerPreferences } from "./steps/partner-preferences"
import { StepIdentityVerification } from "./steps/identity-verification"

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
      family_type: "" as any,
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
      diet: "" as any,
      smoking: "" as any,
      drinking: "" as any,
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

    const isVerificationDocument = field === "verification_doc_url"
    const allowedTypes = isVerificationDocument
      ? ["image/jpeg", "image/png", "application/pdf"]
      : ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      window.alert("Choose a supported JPG, PNG, WebP or PDF file smaller than 5 MB.")
      e.target.value = ""
      return
    }

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const bucket = isVerificationDocument ? "verification-docs" : "profile-photos"
    const fileExt = file.name.split(".").pop()
    const filePath = `${user.id}/${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) {
      console.error("Upload error details:", uploadError)
      alert("Image upload failed: " + uploadError.message)
    } else {
      form.setValue(field, filePath, { shouldValidate: true })
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
        if (isLastStep && !editMode) {
          // Status field is RLS-protected — update it via secure server-side API route
          const res = await fetch("/api/onboarding/complete", { method: "POST" })
          if (!res.ok) {
            const body = await res.json().catch(() => ({}))
            throw new Error(body.error || "Failed to finalise profile status.")
          }
          router.push("/dashboard")
        } else if (isLastStep) {
          router.push("/dashboard")
        } else {
          setStep(s => s + 1)
        }
      } catch (error: any) {
        console.error("Save error:", error)
        window.alert(error.message || "An error occurred while saving your profile.")
      } finally {
        setSaving(false)
      }
    } else {
      // Surface validation errors so the user knows exactly what's missing
      const errors = form.formState.errors
      const errorMessages = Object.values(errors)
        .map((e: any) => e?.message)
        .filter(Boolean)
      if (errorMessages.length > 0) {
        window.alert("Please fix the following before continuing:\n\n• " + errorMessages.join("\n• "))
      } else {
        window.alert("Please fill in all required fields before continuing.")
      }
      console.log("Validation failed:", errors)
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
          className="bg-card border border-border shadow-sm p-8 sm:p-12 rounded-xl"
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
                {step === 1 && <StepBasicInfo form={form} handleFileUpload={handleFileUpload as any} />}
                {step === 2 && <StepLocationCommunity form={form} />}
                {step === 3 && <StepEducationProfession form={form} />}
                {step === 4 && <StepFamilyDetails form={form} />}
                {step === 5 && <StepLifestyle form={form} />}
                {step === 6 && <StepPartnerPreferences form={form} />}
                {step === 7 && <StepIdentityVerification form={form} handleFileUpload={handleFileUpload as any} />}
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
