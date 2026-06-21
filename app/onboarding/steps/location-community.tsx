import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StepLocationCommunity({ 
  form 
}: { 
  form: UseFormReturn<OnboardingData>
}) {
  return (
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
  )
}
