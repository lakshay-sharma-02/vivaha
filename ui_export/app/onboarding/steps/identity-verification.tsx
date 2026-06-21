import { UseFormReturn } from "react-hook-form"
import { OnboardingData } from "@/lib/validations/onboarding"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StepIdentityVerification({ 
  form,
  handleFileUpload
}: { 
  form: UseFormReturn<OnboardingData>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "avatar_url" | "photo_2" | "photo_3" | "verification_doc_url") => Promise<void> 
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Aadhaar Last 4 Digits</Label>
        <Input {...form.register("aadhaar_last_four")} maxLength={4} placeholder="1234" className="h-12 bg-background/50 text-xl tracking-widest" />
        {form.formState.errors.aadhaar_last_four && <p className="text-sm text-destructive">{form.formState.errors.aadhaar_last_four.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Upload Aadhaar Image</Label>
        <div className="p-4 border-2 border-dashed border-primary/20 rounded-xl bg-background/30 text-center hover:bg-background/50 transition-colors">
          <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "verification_doc_url")} className="mx-auto" />
        </div>
        {form.watch("verification_doc_url") && <p className="text-sm text-green-600 font-medium text-center mt-2">Document uploaded successfully ✓</p>}
        {form.formState.errors.verification_doc_url && <p className="text-sm text-destructive">{form.formState.errors.verification_doc_url.message}</p>}
      </div>
      <div className="bg-muted p-4 rounded-xl text-sm text-muted-foreground border border-border/50">
        <p>Your Aadhaar details are only used for verification and are securely stored. They will never be shared with other users.</p>
      </div>
    </div>
  )
}
