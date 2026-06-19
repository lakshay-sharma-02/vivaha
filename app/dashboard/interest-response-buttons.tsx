"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { respondToInterest } from "@/app/actions/interests"

export default function InterestResponseButtons({ interestId }: { interestId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleAction(action: 'ACCEPTED' | 'DECLINED') {
    setLoading(true)
    try {
      await respondToInterest(interestId, action)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        size="sm" 
        onClick={() => handleAction('ACCEPTED')} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white gap-1"
      >
        <Check className="w-4 h-4" /> Accept
      </Button>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => handleAction('DECLINED')} 
        disabled={loading}
        className="gap-1 hover:text-destructive hover:border-destructive"
      >
        <X className="w-4 h-4" /> Decline
      </Button>
    </div>
  )
}
