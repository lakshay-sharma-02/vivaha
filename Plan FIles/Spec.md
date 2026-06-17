# Vivaha — Technical Specification

Companion to `plan.md` (product PRD). `plan.md` defines *what* the product does; this file defines *how* it's built — schema, security, APIs, and contracts an engineer or coding agent should build against without guessing. Where this spec makes a decision plan.md didn't cover, it's marked **[ASSUMPTION]** — change it freely, just change it in this file so the rest stays consistent.

---

## 1. Stack

- **Framework**: Next.js (App Router), TypeScript
- **Styling/UI**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Postgres, Auth, Storage, Row Level Security)
- **Payments**: Razorpay
- **Email**: Resend **[ASSUMPTION — swap freely; chosen for simple Next.js integration]**
- **Hosting**: Vercel **[ASSUMPTION]**

---

## 2. Auth model

Two separate, non-overlapping auth flows on the same Supabase Auth instance:

- **Members** — `supabase.auth.signInWithOtp({ email })`, passwordless. First successful OTP verification triggers creation of a `profiles` row if one doesn't exist (status `DRAFT`).
- **Admins** — `supabase.auth.signInWithPassword({ email, password })`. Admin accounts are **never created through public signup** — they're created by an existing admin via an internal "Add Admin" action, or seeded directly in Supabase. There is no public admin registration route.

A user is an admin if and only if their `auth.users.id` has a row in the `admins` table. The app never lets the same person use both flows interchangeably — middleware checks which table the `auth.uid()` belongs to and routes accordingly. If neither table has a row for an authenticated session, treat as member with no profile yet.

```sql
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admins where id = auth.uid());
$$ language sql security definer stable;
```

---

## 3. Database schema (Postgres / Supabase)

All tables use `uuid` primary keys. Timestamps are `timestamptz default now()`.

### `profiles`
| column | type | notes |
|---|---|---|
| id | uuid pk | = `auth.users.id` |
| full_name | text | |
| date_of_birth | date | |
| gender | text | enum: `male`, `female` (final, locked) |
| height_cm | int | |
| profile_photo_path | text | path in `profile-photos` bucket |
| town | text | free text, no fixed list — see §7 for filter implications |
| religion | text | free text, no enum — see §7 |
| caste | text | free text, no enum — see §7 |
| sub_caste | text | nullable, free text |
| education | text | |
| profession | text | |
| income_range | text | enum bucket, see §7 (final) |
| about_me | text | |
| family_type | text | enum: `nuclear`, `joint` (final, binary — no third bucket) |
| father_occupation | text | |
| mother_occupation | text | |
| siblings_count | int | |
| manglik_status | text | nullable, enum: `manglik`, `non_manglik`, `anshik`, `unknown` (final) |
| horoscope_details | text | nullable |
| preferred_age_min | int | |
| preferred_age_max | int | |
| preferred_town | text | nullable |
| preferred_religion | text | nullable |
| preferred_caste | text | nullable |
| status | text | enum: `DRAFT`, `PENDING_VERIFICATION`, `VERIFIED`, `REJECTED` |
| rejection_reason | text | nullable |
| onboarding_step | int | 1–7, tracks furthest completed step |
| created_at, updated_at | timestamptz | |

### `verification_documents`
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| profile_id | uuid fk → profiles.id | |
| aadhaar_photo_path | text | path in private `verification-docs` bucket |
| aadhaar_last4 | char(4) | |
| submitted_at | timestamptz | |
| reviewed_by | uuid fk → admins.id | nullable |
| reviewed_at | timestamptz | nullable |

### `admins`
| column | type | notes |
|---|---|---|
| id | uuid pk | = `auth.users.id` |
| full_name | text | |
| created_at | timestamptz | |

### `payments`
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| payer_profile_id | uuid fk → profiles.id | who is paying |
| target_profile_id | uuid fk → profiles.id | whose profile is being unlocked |
| razorpay_order_id | text | |
| razorpay_payment_id | text | nullable until paid |
| razorpay_signature | text | nullable until paid |
| amount_inr | int | default 5000 |
| status | text | enum: `CREATED`, `PAID`, `FAILED` |
| created_at, paid_at | timestamptz | |

### `unlocks`
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| unlocker_profile_id | uuid fk → profiles.id | |
| unlocked_profile_id | uuid fk → profiles.id | |
| payment_id | uuid fk → payments.id | |
| created_at | timestamptz | |
| | | unique (unlocker_profile_id, unlocked_profile_id) |

### `admin_notes`
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| unlock_id | uuid fk → unlocks.id | the "Vivaha Recommendation" tied to a specific unlock pairing |
| written_by | uuid fk → admins.id | |
| note | text | |
| created_at, updated_at | timestamptz | |

### `interests`
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| sender_profile_id | uuid fk → profiles.id | |
| receiver_profile_id | uuid fk → profiles.id | |
| status | text | enum: `PENDING`, `ACCEPTED`, `DECLINED` |
| created_at, responded_at | timestamptz | |
| | | unique (sender_profile_id, receiver_profile_id) |

### `verification_audit_log` **[ASSUMPTION — added for compliance, not in plan.md]**
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| admin_id | uuid fk → admins.id | |
| profile_id | uuid fk → profiles.id | |
| action | text | `viewed`, `approved`, `rejected` |
| created_at | timestamptz | |

Given Aadhaar images are sensitive government ID data, log every admin view/approve/reject of a verification document. This isn't legal advice — Aadhaar collection and storage carries real compliance obligations under Indian law (UIDAI regulations), and you've indicated you're accepting that responsibility; an audit trail is a baseline safeguard, not a substitute for proper legal review of your data handling before launch.

---

## 4. Storage buckets

| bucket | visibility | contents |
|---|---|---|
| `profile-photos` | **public** | profile photos — needed for fast image loads on the browse grid |
| `verification-docs` | **private** | Aadhaar photos — accessible only via server-generated signed URLs, never a public path. No client-side code ever gets direct access; only server actions using the service-role key generate short-lived signed URLs when an admin opens the verification queue. |

---

## 5. Row Level Security

RLS is **on** for every table. Policies (conceptual — implement as actual Postgres policies):

- **profiles**: `select` allowed for any authenticated user where `status = 'VERIFIED'`, OR where `id = auth.uid()` (own profile, any status). `insert`/`update` allowed only where `id = auth.uid()`. Full delete: disabled (soft-handle via status if needed).
- **verification_documents**: `select`/`insert`/`update` — owner (`profile_id = auth.uid()`) can insert their own; only `is_admin()` can select/update (review). Never publicly readable.
- **admins**: `select` — `is_admin()` only. No public insert (admin creation happens via a privileged server action using the service-role key, never client-side).
- **payments**: `select` — `payer_profile_id = auth.uid()` OR `is_admin()`. `insert`/`update` — only via server-side route using service role (client never writes payment status directly).
- **unlocks**: `select` — `unlocker_profile_id = auth.uid()` OR `is_admin()`. `insert` — only via server-side payment-verification route.
- **admin_notes**: `select` — visible to the unlock's `unlocker_profile_id` (via join) OR `is_admin()`. `insert`/`update` — `is_admin()` only.
- **interests**: `select` — `sender_profile_id = auth.uid()` OR `receiver_profile_id = auth.uid()`. `insert` — `sender_profile_id = auth.uid()`. `update` (accept/decline) — `receiver_profile_id = auth.uid()` only.
- **verification_audit_log**: `select`/`insert` — `is_admin()` only.

**Test every policy by actually querying as a non-privileged user**, not just by reading the policy text — e.g. confirm a logged-in member genuinely cannot `select` another member's `verification_documents` row or an unrelated `payments` row.

---

## 6. API surface

Use Next.js Server Actions for anything mutating data; Route Handlers where a stable HTTP endpoint is needed (webhooks, anything called from outside Next.js).

| Action | Type | Auth | Notes |
|---|---|---|---|
| `requestOtp(email)` | server action | public | rate-limited, see §8 |
| `verifyOtp(email, token)` | server action | public | creates `profiles` row if missing |
| `saveOnboardingStep(step, data)` | server action | member | validates per-step, updates `onboarding_step` |
| `submitForVerification()` | server action | member | requires steps 1–7 complete; sets status → `PENDING_VERIFICATION` |
| `getBrowseProfiles(filters, page)` | server action | member | only `status = 'VERIFIED'`, excludes self |
| `getProfileDetail(id)` | server action | member | returns full row but server strips hidden fields unless caller has an `unlocks` row for it — **gate server-side, not with client-side blur** |
| `createUnlockOrder(targetProfileId)` | server action | member | creates Razorpay order + `payments` row (`CREATED`) |
| `POST /api/webhooks/razorpay` | route handler | Razorpay only | verifies signature, flips `payments.status` → `PAID`, creates `unlocks` row |
| `sendInterest(receiverProfileId)` | server action | member | |
| `respondToInterest(interestId, accept\|decline)` | server action | member (receiver only) | |
| `getVerificationQueue()` | server action | admin | |
| `approveProfile(profileId)` | server action | admin | logs to audit table, emails member |
| `rejectProfile(profileId, reason)` | server action | admin | logs to audit table, emails member with reason |
| `writeAdminNote(unlockId, note)` | server action | admin | |
| `getAdminAnalytics()` | server action | admin | counts + revenue |

### 6.1 Server action return contract

Every server action returns a discriminated union, never throws across the client/server boundary for expected failure cases (validation, auth, not-found). Reserve thrown exceptions for genuinely unexpected errors (DB connection loss, etc.), which Next.js will surface as a generic 500 — do not rely on try/catch in the client component to extract a useful message from those.

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; field?: string } };
```

- `code` is a stable machine-readable string (`UNAUTHORIZED`, `NOT_VERIFIED`, `ALREADY_UNLOCKED`, `VALIDATION_ERROR`, `RATE_LIMITED`, `NOT_FOUND`, `FORBIDDEN`) — the client switches on `code`, never on `message` text.
- `message` is the human-readable string safe to show in UI.
- `field` is present only for `VALIDATION_ERROR` and names the offending input (e.g. `"date_of_birth"`), so the client can highlight the right form field instead of showing a generic banner.
- Every server action validates its own auth/role check internally (member vs admin vs owner-of-record) even though middleware also gates routes — **never rely on middleware alone**, since server actions can be invoked directly.

### 6.2 `getBrowseProfiles` pagination & filter contract

```ts
type BrowseFilters = {
  ageMin?: number;
  ageMax?: number;
  religion?: string;   // case-insensitive partial match (ilike '%value%')
  caste?: string;      // case-insensitive partial match
  town?: string;       // case-insensitive partial match
  gender?: 'male' | 'female'; // typically the opposite of caller's own gender, but not enforced server-side — caller decides
};

type BrowsePage = {
  profiles: ProfileSummary[]; // id, full_name, age (derived), town, photo_url, profession — never hidden fields
  page: number;       // 1-indexed
  pageSize: number;   // fixed at 20, not client-configurable
  totalCount: number; // for "Page X of Y" UI; one extra count(*) query, acceptable at this scale
  hasMore: boolean;
};
```

- `pageSize` is server-fixed at 20 — the client passes `page` only, never `pageSize`, to prevent a caller requesting the entire table in one call.
- Free-text filters (`religion`, `caste`, `town`) use Postgres `ilike` with the value wrapped in `%...%` server-side; never interpolate raw user input into a query string — use the Supabase client's parameterized filter builder (`.ilike('religion', \`%${value}%\`)` via the query builder, not raw SQL).
- Sanitize free-text filter inputs: trim whitespace, cap length (e.g. 100 chars), reject if it contains only wildcard/special characters that would defeat the `%...%` wrap (e.g. an empty string after trim should be treated as "no filter," not passed through).
- Sort order: `[ASSUMPTION]` newest-`VERIFIED`-first (`updated_at desc`) unless plan.md specifies otherwise — adjust if you want randomized/boosted ordering later.
- `excludes self`: filter `id != auth.uid()` server-side in the query itself, not as a post-fetch array filter, so it doesn't cost one of the 20 page slots for nothing.

### 6.3 Rate limiting (`requestOtp` and beyond)

No built-in rate limiter ships with Supabase Auth for OTP requests beyond its own internal abuse protection, so implement an explicit check:

- Add a lightweight table (or reuse `verification_audit_log`-style pattern) — e.g. `otp_requests(email text, requested_at timestamptz)` — and on each `requestOtp` call, count rows for that email in the last hour before calling `supabase.auth.signInWithOtp`. If count ≥ 5, return `{ ok: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Try again in an hour.' } }` without calling Supabase Auth at all.
- Key the limit by email, not by IP — IP-based limiting is a **[ASSUMPTION — add later]** secondary layer if you see abuse from a single source hitting many emails, but isn't required for MVP.
- This table needs its own RLS: no client access at all (`insert`/`select` only via the server action using the server-side Supabase client, never the anon client).
- Prune old rows periodically (a cron-style Supabase Edge Function or simple `delete where requested_at < now() - interval '24 hours'` on each insert) so the table doesn't grow unbounded.

---

## 7. Validation & business rules

- **Legal marriageable age**: India sets statutory minimum marriage ages that currently differ by gender (historically 21 for men, 18 for women), and this is an area of active legal debate. This isn't legal advice — verify the current figures and any regional nuance with counsel before launch, and store the minimums as a configurable constant rather than hardcoding them, since they may change.
- **Profile photo**: required before submission for verification. JPG/PNG, max 5MB (final).
- **Aadhaar photo**: required before submission. JPG/PNG/PDF, max 5MB, uploaded directly to the private bucket (final).
- **Income range**: stored as a bucket enum: `<3L`, `3-6L`, `6-10L`, `10-20L`, `20L+` (₹ per annum, final).
- **Resubmission**: a `REJECTED` profile can be edited and resubmitted → status returns to `PENDING_VERIFICATION`.
- **Re-verification on edit**: per plan.md, "major changes may require re-verification" — define "major" explicitly: changes to name, DOB, gender, photo, or town on a `VERIFIED` profile flip status back to `PENDING_VERIFICATION`. Edits to bio text, profession, or preferences do not. **[ASSUMPTION — adjust the field list as needed]**
- **Unlock uniqueness**: a user can only unlock a given profile once (enforced by the unique constraint on `unlocks`); attempting to pay again for an already-unlocked profile should be blocked before hitting Razorpay.
- **Self-interaction**: a user cannot send interest to, or unlock, their own profile.

---

## 8. Payment flow (Razorpay)

1. Member clicks "Unlock" → `createUnlockOrder(targetProfileId)` server action checks no existing unlock, creates a Razorpay order, inserts a `payments` row with `status = 'CREATED'`.
2. Client opens Razorpay Checkout with the order ID.
3. On success, Razorpay calls your webhook (`/api/webhooks/razorpay`) — **this is the only place that should ever flip a payment to `PAID`**, never a client-side success callback alone (a client callback firing doesn't prove the payment is real).
4. Webhook handler verifies the signature using HMAC-SHA256 with your Razorpay webhook secret before trusting the payload at all.
5. On verified success: update `payments.status = 'PAID'`, insert the `unlocks` row, send a receipt email.
6. On failure/mismatch: update `payments.status = 'FAILED'`, do not create an unlock, do not treat the profile as accessible.

Test this with Razorpay's test-mode keys end-to-end — including a deliberately invalid signature — before going live.

---

## 9. Email notifications (MVP scope)

Triggered server-side only, never client-side:
- Profile approved → "You're verified" email
- Profile rejected → email including `rejection_reason`
- Payment success → receipt with amount and unlocked profile's first name

No SMS, no push, no in-app notification center for MVP (per plan.md Phase 2/3).

---

## 10. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, never exposed to client
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## 11. State machines

**Profile**: `DRAFT → PENDING_VERIFICATION → VERIFIED | REJECTED`; `REJECTED → PENDING_VERIFICATION` (on resubmit); `VERIFIED → PENDING_VERIFICATION` (on major edit, see §7).

**Payment**: `CREATED → PAID | FAILED` (terminal both ways; a failed payment requires a fresh order to retry).

**Interest**: `PENDING → ACCEPTED | DECLINED` (terminal both ways).

---

## 12. Security checklist (verify, don't assume)

- [ ] `SUPABASE_SERVICE_ROLE_KEY` never appears in any client bundle or client component
- [ ] RLS enabled on every table (including ones added later — easy to forget)
- [ ] Hidden profile fields (contact, family, horoscope, preferences) confirmed absent from the raw API/server-action response for a non-unlocking user — checked at the network/response level, not just hidden by CSS
- [ ] Razorpay webhook signature verified before any DB write
- [ ] Admin routes check `is_admin()` server-side on every request, not just hidden in the UI
- [ ] File uploads validated server-side (type, size) — client-side validation alone is not enough
- [ ] Aadhaar documents never reachable via a public/guessable URL
- [ ] OTP requests rate-limited per email (e.g. max 5/hour) to prevent abuse, per the mechanism in §6.3
- [ ] Server actions return the `ActionResult<T>` shape from §6.1 on every path, including validation/auth failures — not a thrown error the client has to guess the shape of

---

## 13. Open items for you to confirm

The following are now **resolved and final** (do not re-litigate or treat as adjustable): gender (male/female only), income brackets, manglik status options, family type (binary), and religion/caste/sub_caste/town as free text fields.

Still genuinely open:
- "Major edit" field list for forcing re-verification (§7: name, DOB, gender, photo, town) is a starting guess — tune it if a different field should trigger re-verification.
- Legal marriageable age minimums need confirmation from current Indian law/counsel before launch, not from this document.
- Browse sort order (§6.2: defaults to newest-verified-first) — confirm or change.
- IP-based OTP rate limiting (§6.3) is flagged as a later addition, not MVP-required — confirm this is acceptable for launch.
