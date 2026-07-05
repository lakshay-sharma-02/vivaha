# 16 - API Reference

## Overview
While Vivah uses Server Actions for 90% of internal mutations, traditional API Routes (`src/app/api`) are required for external machine-to-machine communication.

## Endpoints

### `POST /api/payment/create-order`
- **Purpose:** Initializes a payment intent with the gateway.
- **Auth:** Requires active user session cookie.
- **Input:** `{ tier: "premium", currency: "INR" }`
- **Output:** `{ orderId: "ord_123", amount: 5000 }`

### `POST /api/payment/verify`
- **Purpose:** Webhook target for the payment gateway to confirm a transaction succeeded.
- **Auth:** Relies on cryptographic signature verification (e.g., `x-razorpay-signature` header), NOT cookies.
- **Business Logic:** Calls `PaymentService.verifyTransaction()`. Updates the `payments` and `memberships` tables via the Supabase Service Role key (bypassing RLS since there is no user session).

### `GET /api/messages`
- **Purpose:** Fetches message history for a given `match_id`.
- **Note:** Mostly handled by Realtime initial fetch, but exists as a fallback REST endpoint for deep pagination.
- **Auth:** Requires user session cookie.

## Engineering Decisions
Why bypass RLS in the webhook?
Webhooks originate from external servers (Stripe/Razorpay) and do not possess the user's JWT. To write to the database (which is locked down by RLS), the webhook endpoint must use the `SERVICE_ROLE_KEY` to securely bypass RLS, trusting the cryptographic signature of the webhook payload instead of a JWT.
