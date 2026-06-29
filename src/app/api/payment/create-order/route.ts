import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { createClient } from "@/shared/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Parse request
    const body = await req.json()
    const { planId } = body // e.g., 'premium_lifetime'

    // We hardcode the 5000 INR price here to prevent client-side tampering
    const amountInPaise = 5000 * 100 

    // 3. Initialize Razorpay
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay keys missing from environment.")
      return NextResponse.json({ error: "Payment gateway misconfigured." }, { status: 500 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // 4. Create the Razorpay Order
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
        planId: planId || "premium_lifetime",
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID // Safe to send public key to frontend
    })

  } catch (err: any) {
    console.error("Razorpay Order Creation Error:", err)
    return NextResponse.json(
      { error: "Failed to initialize payment gateway." },
      { status: 500 }
    )
  }
}
