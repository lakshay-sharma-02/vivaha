import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StepFamilyDetails({ 
  form 
}: { 
  form: UseFormReturn<OnboardingData>
}) {
  return (
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
  )
}
