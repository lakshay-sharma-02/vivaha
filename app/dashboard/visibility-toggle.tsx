"use client"

import { useState } from "react"
import { toggleProfileVisibility } from "./actions"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function VisibilityToggle({ initialVisibility }: { initialVisibility: boolean }) {
  const [isVisible, setIsVisible] = useState(initialVisibility)
  const [loading, setLoading] = useState(false)

  async function handleToggle(checked: boolean) {
    setLoading(true)
    setIsVisible(checked)
    try {
      await toggleProfileVisibility(checked)
    } catch (error) {
      console.error(error)
      setIsVisible(!checked) // revert on error
      alert("Failed to update visibility")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-3 bg-background/50 border border-border/50 p-4 rounded-xl">
      <div className={`p-2 rounded-full ${isVisible ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
        {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <Label htmlFor="visibility-toggle" className="text-base font-semibold block mb-0.5">
          {isVisible ? "Profile Visible" : "Profile Hidden"}
        </Label>
        <p className="text-sm text-muted-foreground">
          {isVisible 
            ? "Your profile is visible to other verified members."
            : "Your profile is hidden from the browse section."}
        </p>
      </div>
      <Switch 
        id="visibility-toggle"
        checked={isVisible}
        onCheckedChange={handleToggle}
        disabled={loading}
      />
    </div>
  )
}
