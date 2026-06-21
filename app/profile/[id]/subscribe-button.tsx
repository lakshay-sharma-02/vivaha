"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => setRazorpayLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleSubscribe = async () => {
    if (!razorpayLoaded) {
      alert("Payment system is still loading. Please try again in a few seconds.")
      return
    }

    setLoading(true)
    try {
      // 1. Create order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST"
      })
      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order")
      }

      // 2. Initialize Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Sahachar Matrimony",
        description: "30-day Sahachar membership",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 3. Verify payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          })

          const verifyData = await verifyRes.json()

          if (verifyRes.ok && verifyData.success) {
            router.refresh()
            alert("Subscription successful! You now have premium access.")
          } else {
            alert("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#E11D48" // matches primary color
        }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description)
      })
      rzp.open()

    } catch (error: any) {
      console.error(error)
      alert(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      size="lg" 
      onClick={handleSubscribe} 
      disabled={loading || !razorpayLoaded}
      className="w-full rounded-full shadow-lg shadow-primary/20 h-12 text-lg"
    >
      {loading ? "Processing..." : "Join for ₹5,000 / 30 days"}
    </Button>
  )
}
