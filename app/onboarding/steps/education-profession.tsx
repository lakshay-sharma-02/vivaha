import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function StepEducationProfession({ 
  form 
}: { 
  form: UseFormReturn<OnboardingData>
}) {
  return (
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
  )
}
