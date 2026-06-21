import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function StepLifestyle({ 
  form 
}: { 
  form: UseFormReturn<OnboardingData>
}) {
  return (
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
  )
}
