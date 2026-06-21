import { createHmac, timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"
import { fulfilSubscriptionPayment } from "@/lib/payments"

export async function POST(request: NextRequest) {
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 })
  }

  const rawBody = await request.text()
  const received = request.headers.get("x-razorpay-signature") ?? ""
  const expected = createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest("hex")
  const a = Buffer.from(expected)
  const b = Buffer.from(received)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const event = JSON.parse(rawBody) as {
    event?: string
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } }
  }
  if (event.event !== "payment.captured") return NextResponse.json({ received: true })

  const entity = event.payload?.payment?.entity
  if (!entity?.id || !entity.order_id) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 })
  }

  try {
    await fulfilSubscriptionPayment({
      orderId: entity.order_id,
      paymentId: entity.id,
      signature: received,
    })
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Razorpay webhook fulfilment failed", error)
    return NextResponse.json({ error: "Fulfilment failed" }, { status: 500 })
  }
}
