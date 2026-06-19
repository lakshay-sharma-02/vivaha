"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Check } from "lucide-react"
import { sendInterest } from "@/app/actions/interests"

export default function SendInterestButton({ receiverId, initialStatus }: { receiverId: string, initialStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED' | null }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'PENDING' | 'ACCEPTED' | 'DECLINED' | null>(initialStatus || null)
  const [error, setError] = useState("")

  async function handleSend() {
    setLoading(true)
    setError("")
    try {
      const res = await sendInterest(receiverId)
      if (res.ok) {
        setStatus('PENDING')
      } else {
        setError(res.error || "Something went wrong")
      }
    } catch (err) {
      setError("Failed to send interest")
    }
    setLoading(false)
  }

  if (status === 'PENDING') {
    return (
      <Button size="lg" className="rounded-full shadow-lg h-14 px-12 text-lg" disabled variant="outline">
        <Check className="w-5 h-5 mr-2" /> Request Sent
      </Button>
    )
  }

  if (status === 'ACCEPTED') {
    return (
      <Button size="lg" className="rounded-full shadow-lg h-14 px-12 text-lg bg-green-600 hover:bg-green-700 text-white" disabled>
        <Heart className="w-5 h-5 mr-2 fill-current" /> Interest Accepted
      </Button>
    )
  }

  if (status === 'DECLINED') {
    return (
      <Button size="lg" className="rounded-full shadow-lg h-14 px-12 text-lg" disabled variant="outline">
        Request Declined
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button 
        onClick={handleSend} 
        disabled={loading}
        size="lg" 
        className="rounded-full shadow-lg shadow-primary/20 h-14 px-12 text-lg"
      >
        <Heart className="w-5 h-5 mr-2" /> {loading ? "Sending..." : "Send Interest"}
      </Button>
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  )
}
