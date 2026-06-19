import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    const secret = process.env.RAZORPAY_KEY_SECRET || "stub_secret"
    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      // Payment is verified
      // Add 30 days to current date
      const endsAt = new Date()
      endsAt.setDate(endsAt.getDate() + 30)

      const adminSupabase = createAdminClient()

      const { error } = await adminSupabase
        .from('profiles')
        .update({
          subscription_ends_at: endsAt.toISOString()
        })
        .eq('id', user.id)

      if (error) {
        console.error("Failed to update subscription:", error)
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }
  } catch (error) {
    console.error("Razorpay verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
