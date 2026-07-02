# 11 - Payment System

## Overview
The payment architecture abstracts gateway specifics (Stripe/Razorpay) behind the `PaymentService` to handle membership subscriptions and one-off purchases.

## Request Lifecycle: Purchase Membership

```text
[ Client ]
   ├─> 1. Request: "Upgrade to Premium"
   │
[ API / Action: create-order ]
   ├─> 2. Validation: Check if already premium
   ├─> 3. Gateway: Call Razorpay API -> receive order_id
   ├─> 4. Return order_id to Client
   │
[ Client ]
   ├─> 5. Opens Gateway UI, completes payment
   │
[ Gateway ]
   ├─> 6. Webhook POST to `/api/payment/verify`
   │
[ API: verify ]
   ├─> 7. Signature Validation (HMAC)
   ├─> 8. DB: INSERT into `payments` (immutable ledger)
   ├─> 9. DB: UPDATE/INSERT `memberships` (tier = premium, is_active = true)
   └─> 10. Return 200 OK
```

## Security Model
- Webhook endpoints (`/api/payment/verify`) do **not** rely on user session cookies (as they are called by the Gateway).
- They strictly validate the `x-razorpay-signature` or `stripe-signature` header using the secret key stored in environment variables.
- Idempotency: The webhook processor ensures a `gateway_transaction_id` is only processed once to prevent double-crediting.

## State Machine: Payment
```text
Pending ──> Successful ──> Refunded
      └─> Failed
```
