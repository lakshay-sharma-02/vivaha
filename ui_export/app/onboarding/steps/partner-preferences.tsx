import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StepPartnerPreferences({ 
  form 
}: { 
  form: UseFormReturn<OnboardingData>
}) {
  return (
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
  )
}
