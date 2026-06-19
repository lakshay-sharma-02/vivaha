import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { createClient } from "@/lib/supabase/server"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_stub",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "stub_secret",
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fixed price for subscription: ₹5000 in paise
    const amount = 500000 

    const options = {
      amount,
      currency: "INR",
      receipt: `rcpt_${user.id.substring(0,8)}_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error("Razorpay order error:", error)
    return NextResponse.json({ error: "Error creating order" }, { status: 500 })
  }
}
