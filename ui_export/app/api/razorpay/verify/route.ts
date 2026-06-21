import { createHmac, timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { env } from "@/lib/env"
import { fulfilSubscriptionPayment } from "@/lib/payments"

function signaturesMatch(expected: string, received: string) {
  const a = Buffer.from(expected, "utf8")
  const b = Buffer.from(received, "utf8")
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 503 })
  }

  const body = await request.json().catch(() => null) as null | Record<string, unknown>
  const orderId = typeof body?.razorpay_order_id === "string" ? body.razorpay_order_id : ""
  const paymentId = typeof body?.razorpay_payment_id === "string" ? body.razorpay_payment_id : ""
  const signature = typeof body?.razorpay_signature === "string" ? body.razorpay_signature : ""
  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Invalid payment response" }, { status: 400 })
  }

  const expected = createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex")
  if (!signaturesMatch(expected, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    const result = await fulfilSubscriptionPayment({
      orderId,
      paymentId,
      signature,
      expectedUserId: user.id,
    })
    if (!result.ok) return NextResponse.json({ error: "Payment order not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment fulfilment failed", error)
    return NextResponse.json({ error: "Could not activate membership" }, { status: 500 })
  }
}
