# 24 - Observability

A mature backend requires deep visibility into errors and performance.

## Current Setup

### 1. Error Monitoring (Sentry - Future Enhancement)
Server Actions currently catch errors and return them as `{ success: false, error: message }`. 
*Roadmap:* Integrate `@sentry/nextjs`. Wrap all Server Actions in a higher-order function that captures the error, the `user_id`, and the request payload, forwarding it to Sentry before returning the safe error to the client.

### 2. Logging
- Standard `console.log` and `console.error` are captured by Vercel's runtime logs.
- Sensitive PII (passwords, specific emails, exact coordinates) must NEVER be logged.

### 3. Database Analytics
Supabase provides built-in observability:
- **pg_stat_statements:** Used to identify slow queries (e.g., discovery queries taking > 500ms).
- **API Metrics:** Tracks 4xx and 5xx errors originating from PostgREST/GoTrue.

### 4. Audit Logs
Security-critical operations (password resets, payment webhook failures, admin actions) insert rows into the `admin_notes` or a dedicated `audit_logs` table for compliance review.

## Future Roadmap: OpenTelemetry
As we move to microservices, we will implement OpenTelemetry to trace requests across the Next.js API, the Payment Service, and the Database to identify exact latency bottlenecks in the request lifecycle.
