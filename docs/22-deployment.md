# 22 - Deployment

## Infrastructure Components

### 1. Compute: Vercel (Next.js)
- Hosts the React frontend, Server Actions, and API routes.
- **Edge Functions:** Middleware runs at the edge for latency-free JWT validation and rate limiting.
- **Serverless Functions:** Server actions run in specific regions (e.g., `ap-south-1` for India) close to the database.

### 2. Database & Auth: Supabase (Managed Cloud)
- **PostgreSQL:** The core DB, deployed in the same region as the Vercel serverless functions to minimize connection latency.
- **GoTrue:** Handles Auth.
- **Storage:** Backed by AWS S3 internally.

### 3. External Services
- **Razorpay/Stripe:** Payment gateways.
- **Resend:** Transactional emails.

## Environment Variables
Deployment requires the following strictly configured variables:
```env
NEXT_PUBLIC_SUPABASE_URL=...       # Safe for client
NEXT_PUBLIC_SUPABASE_ANON_KEY=...  # Safe for client
SUPABASE_SERVICE_ROLE_KEY=...      # SECURE: Never expose to client
RAZORPAY_KEY_ID=...                # Configured in Vercel
RAZORPAY_KEY_SECRET=...            # Configured in Vercel
```

## CI/CD Workflow
1. **PR Created:** GitHub Actions run Type Checking (`tsc --noEmit`), Linting (`eslint`), and Zod validation tests.
2. **Merge to Main:** Vercel automatically deploys the `main` branch to the production domain.
3. **Database Migrations:** Supabase migrations (`supabase/migrations/*`) are applied manually via the Supabase CLI (`supabase db push`) during the CI/CD deployment phase before Vercel swaps the build.

## Disaster Recovery
- **Database Backups:** Supabase performs automatic daily backups (Point-in-Time Recovery enabled for Pro plans).
- **Storage Backups:** Media is highly durable (S3 SLA).
