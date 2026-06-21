import { createAdminClient } from "@/lib/supabase/admin"

export async function fulfilSubscriptionPayment(input: {
  orderId: string
  paymentId: string
  signature: string
  expectedUserId?: string
}) {
  const admin = createAdminClient()
  const { data, error } = await admin.rpc("fulfil_subscription_payment", {
    order_id: input.orderId,
    payment_id: input.paymentId,
    payment_signature: input.signature,
    expected_user_id: input.expectedUserId ?? null,
  })
  if (error) throw error
  return data
    ? { ok: true as const }
    : { ok: false as const, reason: "ORDER_NOT_FOUND" }
}
