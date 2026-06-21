import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { env } from "@/lib/env"

const SUBSCRIPTION_AMOUNT_PAISE = 500_000

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: profile } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", user.id)
    .single()

  if (profile?.status !== "VERIFIED") {
    return NextResponse.json({ error: "A verified profile is required" }, { status: 403 })
  }

  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 503 })
  }

  try {
    const razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    })
    const order = await razorpay.orders.create({
      amount: SUBSCRIPTION_AMOUNT_PAISE,
      currency: "INR",
      receipt: `sub_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: { profile_id: user.id, product: "sahachar_30_day_membership" },
    })

    const admin = createAdminClient()
    const { error } = await admin.from("payments").insert({
      payer_profile_id: user.id,
      razorpay_order_id: order.id,
      amount_inr: SUBSCRIPTION_AMOUNT_PAISE / 100,
      status: "CREATED",
    })

    if (error) {
      console.error("Failed to persist Razorpay order", error)
      return NextResponse.json({ error: "Could not start payment" }, { status: 500 })
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Razorpay order creation failed", error)
    return NextResponse.json({ error: "Could not start payment" }, { status: 502 })
  }
}
