# 15 - Service Layer

## Overview
The `src/services/` directory contains bounded contexts for complex logic that spans multiple domains or integrates with third-party vendors. It abstracts this complexity away from the Next.js routing layer.

## Services

### 1. `PaymentService` (`src/services/payments/`)
- **Responsibilities:** Creating orders, verifying webhook signatures, fulfilling memberships.
- **Why Abstraction exists:** We may switch from Razorpay to Stripe depending on regional launch requirements. The Controllers (`api/payment`) only call `PaymentService.createOrder()`, ignorant of the underlying provider.

### 2. `EmailService` (`src/services/email/`)
- **Responsibilities:** Dispatching transactional emails (OTP, Match Notifications).
- **Dependencies:** Resend SDK / SendGrid SDK.
- **Error Handling:** Should never fail a critical path (e.g., a match creation should not fail if the notification email fails). Must swallow non-critical errors and log them.

### 3. `AnalyticsService` (`src/services/analytics/`)
- **Responsibilities:** Server-side tracking (e.g., tracking a successful payment or profile completion).

### 4. `SupabaseService` (`src/services/supabase/`)
- **Responsibilities:** Provides heavily typed, pre-configured clients for specific admin tasks that bypass RLS (using the Service Role Key). *Use with extreme caution.*

## Engineering Decisions
The service layer implements a loose dependency injection pattern. By keeping services as modular classes or distinct modules, we can easily mock them during testing (e.g., mocking the `PaymentService` to avoid hitting Razorpay APIs in CI).
