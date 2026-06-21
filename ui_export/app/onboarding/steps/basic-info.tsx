import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function StepBasicInfo({ 
  form, 
  handleFileUpload 
}: { 
  form: UseFormReturn<OnboardingData>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "avatar_url" | "photo_2" | "photo_3" | "aadhaar_photo_path") => Promise<void> 
}) {
  return (
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
          <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-background/30">
            <span className="text-sm font-medium">Main Photo</span>
            <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "avatar_url")} />
            {form.watch("avatar_url") && (
              <div className="relative h-24 w-24 rounded-full overflow-hidden shrink-0 border-2 border-primary">
                <Image src={form.watch("avatar_url") as string} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-background/30">
            <span className="text-sm font-medium text-muted-foreground">Photo 2 (Optional)</span>
            <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "photo_2")} />
            {form.watch("photo_2") && (
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 border-2 border-muted">
                <Image src={form.watch("photo_2") as string} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-background/30">
            <span className="text-sm font-medium text-muted-foreground">Photo 3 (Optional)</span>
            <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "photo_3")} />
            {form.watch("photo_3") && (
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 border-2 border-muted">
                <Image src={form.watch("photo_3") as string} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
