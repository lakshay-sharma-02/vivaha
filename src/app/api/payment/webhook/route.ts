import { NextResponse } from "next/server"
import { createClient } from "@/shared/lib/supabase/server"
import crypto from "crypto"

// Razorpay webhook: verifies signature and activates membership
// Called async by Razorpay after payment.success event
export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!secret) {
      console.error("RAZORPAY_WEBHOOK_SECRET not set")
      return NextResponse.json({ error: "Webhook misconfigured" }, { status: 500 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Only process payment.captured events
    if (event.event !== "payment.captured") {
      return NextResponse.json({ status: "ignored" })
    }

    const payment = event.payload.payment.entity
    const notes = payment.notes || {}
    const userId = notes.userId

    if (!userId) {
      console.error("Webhook: missing userId in payment notes", payment.id)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const supabase = await createClient()

    const endsAt = new Date()
    endsAt.setFullYear(endsAt.getFullYear() + 100)

    // Activate membership idempotently
    const { error: membershipError } = await supabase
      .from("memberships")
      .upsert({
        profile_id: userId,
        tier: "premium",
        gateway_customer_id: payment.id,
        is_active: true,
        ends_at: endsAt.toISOString(),
      }, { onConflict: "profile_id" })

    if (membershipError) {
      console.error("Webhook: membership upsert error", membershipError)
      return NextResponse.json({ error: "Failed to activate membership" }, { status: 500 })
    }

    // Record payment
    await supabase
      .from("payments")
      .upsert({
        profile_id: userId,
        amount_cents: payment.amount,
        currency: payment.currency,
        status: "success",
        gateway: "razorpay",
        gateway_transaction_id: payment.id,
        gateway_reference: payment.order_id,
      }, { onConflict: "gateway_transaction_id" })

    // Audit log
    await supabase.from("audit_logs").insert({
      action: "membership_upgraded",
      actor_id: userId,
      metadata: { payment_id: payment.id, source: "webhook" },
    })

    return NextResponse.json({ status: "ok" })
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
