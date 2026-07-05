# Vivah Backend Architecture & Documentation

This document outlines the architecture, data models, and workflows for the backend of the Vivah platform.

## 1. High-Level Architecture

The Vivah backend is built on a modern, serverless architecture utilizing:
- **Framework:** Next.js (App Router) for Server Actions and API endpoints.
- **Database & Auth:** Supabase (PostgreSQL, GoTrue for Auth, Realtime, Storage).
- **Validation:** Zod for strong schema validation across inputs.
- **Typing:** Strict TypeScript with generated types from the Supabase schema.

### Core Philosophy
- **Server Actions First:** Most mutations and form submissions are handled via Next.js Server Actions (e.g., `src/app/actions/*`), keeping the client thin and secure.
- **API Routes for Webhooks/External:** Traditional API routes (`src/app/api/*`) are reserved for external webhooks (like payment gateways) or realtime endpoints.
- **Service Layer Pattern:** Complex business logic (payments, analytics, email) is abstracted into `src/services/*` to keep actions/controllers clean.
- **Row Level Security (RLS):** Security is enforced at the database level using PostgreSQL RLS policies ensuring users can only access their own data or authorized matches.

---

## 2. Database Schema Design (Supabase / PostgreSQL)

The database is highly normalized and relational, designed to support complex matchmaking algorithms and rich profiles.

### Core Identity & Profiles
- **`auth.users`:** (Supabase managed) Handles credentials, emails, phones, and passwords.
- **`public.profiles`:** The central entity linked 1-to-1 with `auth.users`. Contains basic info (name, gender, DOB, height, location IDs, bio, verification status).
- **Lookup Tables:** `countries`, `cities`, `religions`, `professions` for structured and indexable foreign keys.

### Profile Extensions (1-to-1)
To prevent table bloat, profile details are split into logical 1-to-1 tables:
- **`profile_completion`:** Tracks onboarding score (0-100).
- **`family_details`:** Father/Mother occupation, family type, values, siblings.
- **`preferences`:** The user's ideal match criteria (min/max age, height, preferred religions, cities).
- **`compatibility_profiles`:** Stores AI-ready data (personality types, values, interests, relationship goals) for advanced matchmaking.

### Media & Verification
- **`profile_media`:** User photos/videos linked to Supabase Storage buckets. Tracks primary status, verification status, and display order.
- **`verification_documents`:** Government IDs submitted for manual or automated verification (`pending`, `verified`, `rejected`).

### Matchmaking & Realtime
- **`matches`:** Represents a connection between `user_a` and `user_b`. Statuses include `pending`, `accepted`, `rejected`. Enforces rules like `user_a < user_b` to prevent duplicates.
- **`messages`:** Realtime chat table linked to a specific `match_id`. Supports text, images, videos, voice, and system messages.

### Engagement & Security
- **`profile_views` & `search_history`:** Used for analytics and AI algorithm tuning.
- **`blocks` & `reports`:** Trust and safety tables.
- **`notifications`:** In-app notification delivery (match, message, system).
- **`user_sessions` & `otp_logs`:** Security auditing.

### Monetization
- **`memberships`:** Tracks active subscriptions (`basic`, `premium`, `elite`) and gateway links.
- **`payments`:** Immutable ledger of transactions (Stripe, Razorpay, etc.), amount, currency, and gateway references.

---

## 3. Server Actions & API Layer

### Server Actions (`src/app/actions/`)
- **`onboarding.ts`:** Handles multi-step profile creation, populating `profiles`, `family_details`, and `preferences` sequentially.
- **`matchmaking.ts` / `discover.ts`:** Executes complex PostGIS/Vector queries against preferences and compatibility models to serve potential matches.
- **`matches.ts`:** Handles swiping/liking logic, creating match records, and triggering notifications when mutual matches occur.
- **`saved.ts`:** Logic for bookmarking/saving profiles for later review.
- **`admin.ts`:** Privileged actions for verifying documents and moderating reports.

### API Routes (`src/app/api/`)
- **`payment/create-order` & `payment/verify`:** Secure endpoints handling Razorpay/Stripe order generation and webhook signature verification to prevent tampering.
- **`messages/route.ts`:** Fallback/sync endpoint for messages if Realtime channels need REST fetching.
- **`auth/callback/route.ts`:** OAuth PKCE callback handler to exchange secure tokens and establish a server-side session.

---

## 4. Service Layer (`src/services/`)

The `src/services/` directory abstracts external integrations and complex internal workflows:
- **`supabase/`:** Contains initialized clients for server (`server.ts`) and client components (`client.ts`), ensuring proper cookie/auth management in Next.js.
- **`payments/`:** Abstraction over payment providers. Generates orders and verifies signatures without leaking provider-specific logic into the API routes.
- **`security/`:** Utilities for rate limiting, input sanitization, and IP tracking.
- **`email/`:** Connects to Resend/SendGrid for transactional emails (OTP, Match alerts).
- **`analytics/`:** Server-side event tracking.

---

## 5. Security & Validation

- **Zod Schemas (`src/shared/validation/`)**: Every server action validates `FormData` or JSON bodies against strict Zod schemas before executing logic.
- **Supabase RLS**: 
  - Profiles are publicly viewable (if active), but sensitive fields (like preferences) are restricted.
  - Messages can only be read/inserted by users who are part of the `match_id`.
  - Admin tables are strictly locked behind `auth.jwt() -> 'role' = 'admin'` policies.
- **Server-Side Auth**: We utilize `@supabase/ssr` to securely read cookies on the server, ensuring users cannot spoof their `user_id` when making requests.

---

## 6. How to Start / Next Steps

Since the frontend has been flushed, you can build a new client consuming this backend by:
1. Creating new pages in `src/app/`.
2. Using Next.js Client Components (e.g., `"use client"`) to import and invoke the Server Actions from `src/app/actions/`.
3. Subscribing to Supabase Realtime for the `messages` table on the client side for live chat.
4. Using the generated types in `src/shared/lib/supabase/database.types.ts` to ensure type safety between your new frontend and this backend.
