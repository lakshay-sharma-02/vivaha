# 20 - Sequence Diagrams

## Sequence: Like a Profile & Mutual Match

```text
User A (Client)         Next.js (Action)        Supabase (DB)          User B (Client)
      │                        │                      │                      │
      ├─> 1. likeProfile(B) ──>│                      │                      │
      │                        ├─> 2. Check Match A->B│                      │
      │                        │                      │                      │
      │                        ├─> 3. Insert/Update ─>│                      │
      │                        │                      │                      │
      │                        │<─ 4. Status:'accepted'                      │
      │<─ 5. Return Success ───┤                      │                      │
      │                        │                      ├─> 6. Realtime Event ─> (If online)
      │                        │                      │                      │
      │                        ├─> 7. triggerNotify() │                      │
      │                        │                      │                      │
      │                        │                      ├─> 8. Push Notify ────> (If offline)
```

## Sequence: Payment Webhook

```text
User (Client)        Next.js (API/Action)       Razorpay             Supabase
     │                       │                     │                    │
     ├─> 1. "Upgrade" ──────>│                     │                    │
     │                       ├─> 2. createOrder() ─>                    │
     │                       │<─ 3. order_id ──────┤                    │
     │<─ 4. return order_id ─┤                     │                    │
     │                       │                     │                    │
     ├─> 5. Checkout UI ──────────────────────────>│                    │
     │                       │                     │                    │
     │                       │<─ 6. webhook POST ──┤                    │
     │                       ├─> 7. verify sig     │                    │
     │                       ├─> 8. Insert Payment ────────────────────>│
     │                       ├─> 9. Update Member ─────────────────────>│
     │                       │                     │                    │
     │                       │── 10. 200 OK ──────>│                    │
```
