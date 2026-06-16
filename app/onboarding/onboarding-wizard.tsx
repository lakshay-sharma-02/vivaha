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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

const STEPS = [
  "Basic Information",
  "Location & Community",
  "Personal Details",
  "Family Background",
  "Horoscope",
  "Partner Preferences",
  "Aadhaar Verification"
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

    const bucket = field === "avatar_url" ? "avatars" : "verification"
    const fileExt = file.name.split(".").pop()
    const filePath = `${user.id}/${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (!uploadError) {
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

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>

  const progressValue = (step / STEPS.length) * 100

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <div className="flex items-center justify-between text-sm font-medium">
          <span>Step {step} of {STEPS.length}</span>
          <span>{Math.round(progressValue)}% Complete</span>
        </div>
        <Progress value={progressValue} />
        <h1 className="text-2xl font-bold">{STEPS[step - 1]}</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <Input {...form.register("full_name")} placeholder="Your full name" />
                  {form.formState.errors.full_name && <p className="text-sm text-red-500">{form.formState.errors.full_name.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Date of Birth</Label>
                    <Input type="date" {...form.register("date_of_birth")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Gender</Label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" {...form.register("gender")}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Height (cm)</Label>
                  <Input type="number" {...form.register("height_cm")} />
                </div>
                <div className="space-y-1">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "avatar_url")} />
                  {form.watch("avatar_url") && (
                    <img src={form.watch("avatar_url")} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-1">
                  <Label>Town/City</Label>
                  <Input {...form.register("city")} placeholder="Mumbai" />
                </div>
                <div className="space-y-1">
                  <Label>Religion</Label>
                  <Input {...form.register("religion")} placeholder="Hindu" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Caste</Label>
                    <Input {...form.register("caste")} placeholder="Brahmin" />
                  </div>
                  <div className="space-y-1">
                    <Label>Sub-Caste (Optional)</Label>
                    <Input {...form.register("sub_caste")} />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-1">
                  <Label>Education</Label>
                  <Input {...form.register("education")} placeholder="B.Tech, MBA etc" />
                </div>
                <div className="space-y-1">
                  <Label>Profession</Label>
                  <Input {...form.register("occupation")} placeholder="Software Engineer" />
                </div>
                <div className="space-y-1">
                  <Label>Annual Income (INR)</Label>
                  <Input type="number" {...form.register("income_annual")} />
                </div>
                <div className="space-y-1">
                  <Label>About Me</Label>
                  <Textarea {...form.register("bio")} placeholder="Write a few lines about yourself..." />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="space-y-1">
                  <Label>Family Type</Label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" {...form.register("family_type")}>
                    <option value="">Select...</option>
                    <option value="nuclear">Nuclear</option>
                    <option value="joint">Joint</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Father's Occupation</Label>
                  <Input {...form.register("father_occupation")} />
                </div>
                <div className="space-y-1">
                  <Label>Siblings</Label>
                  <Input {...form.register("siblings")} placeholder="1 Brother, 2 Sisters etc" />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="space-y-1">
                  <Label>Manglik</Label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" {...form.register("manglik")}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="dont_know">Don't Know</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Horoscope Details (Optional)</Label>
                  <Textarea {...form.register("horoscope_details")} placeholder="Time of birth, Place of birth etc" />
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Partner Min Age</Label>
                    <Input type="number" {...form.register("partner_age_min")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Partner Max Age</Label>
                    <Input type="number" {...form.register("partner_age_max")} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Location Preference</Label>
                  <Input {...form.register("partner_location")} placeholder="Any, Same City, etc" />
                </div>
                <div className="space-y-1">
                  <Label>Religion Preference</Label>
                  <Input {...form.register("partner_religion")} />
                </div>
                <div className="space-y-1">
                  <Label>Caste Preference</Label>
                  <Input {...form.register("partner_caste")} />
                </div>
              </>
            )}

            {step === 7 && (
              <>
                <div className="space-y-1">
                  <Label>Aadhaar Last 4 Digits</Label>
                  <Input {...form.register("aadhaar_last_four")} maxLength={4} placeholder="1234" />
                </div>
                <div className="space-y-1">
                  <Label>Upload Aadhaar Image</Label>
                  <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "verification_doc_url")} />
                  {form.watch("verification_doc_url") && <p className="text-sm text-green-600">Document uploaded successfully!</p>}
                </div>
                <p className="text-xs text-muted-foreground">
                  Your Aadhaar details are only used for verification and are never shared with other users.
                </p>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1 || saving}
          >
            Previous
          </Button>
          <Button onClick={onNext} disabled={saving}>
            {saving ? "Saving..." : step === STEPS.length ? "Complete" : "Next Step"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
