import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@/shared/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!secret) {
      return NextResponse.json({ error: "Payment gateway misconfigured." }, { status: 500 })
    }

    // Cryptographic verification
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex")

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Payment is authentic! Now activate the membership in the database.
    
    // Calculate a far future date for "lifetime" membership. 
    // In PostgreSQL, we can just add an interval of 100 years.
    const endsAt = new Date()
    endsAt.setFullYear(endsAt.getFullYear() + 100)

    const { error: dbError } = await supabase
      .from('memberships')
      .insert({
        profile_id: user.id,
        tier: 'premium',
        provider_subscription_id: razorpay_payment_id, // Store payment ID for tracing
        status: 'active',
        ends_at: endsAt.toISOString(),
      })

    if (dbError) {
      console.error("Database error activating membership:", dbError)
      return NextResponse.json({ error: "Payment successful, but failed to activate plan. Please contact support." }, { status: 500 })
    }

    // Log the successful upgrade
    await supabase.from('audit_logs').insert({
      action: 'membership_upgraded',
      actor_id: user.id,
      metadata: { payment_id: razorpay_payment_id, order_id: razorpay_order_id }
    })

    return NextResponse.json({ success: true, message: "Membership upgraded successfully!" })

  } catch (err: any) {
    console.error("Razorpay Verification Error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred during verification." },
      { status: 500 }
    )
  }
}
