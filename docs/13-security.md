# 13 - Security

## Threat Model
Vivah handles highly sensitive PII (Personally Identifiable Information) and communication. The primary threats are:
1. **Unauthorized Data Access (BOLA/IDOR):** User A accessing User B's private preferences or chat.
2. **Abuse/Harassment:** Malicious actors spamming or harassing users.
3. **Financial Tampering:** Bypassing the payment gateway to grant premium access.

## Mitigation Strategies

### 1. Row Level Security (RLS)
The bedrock of our security. Every query executed by the Supabase Client contains the user's JWT. Postgres policies enforce BOLA protection:
- `UPDATE public.profiles SET ... WHERE id = auth.uid();`
Even if a Server Action neglects to check permissions, the database will silently reject the operation.

### 2. Input Validation (Zod)
Every Server Action and API Route validates the `FormData` or JSON payload against strict Zod schemas. This prevents SQL Injection (already mitigated by Postgres parameterization) and XSS (by sanitizing inputs).

### 3. Rate Limiting
(Future Enhancement) To be implemented at the Next.js Middleware layer using Redis (Upstash) to prevent brute-force OTP attempts and API abuse.

### 4. Signed URLs & Storage Policies
Files are never served via open directories if they are private. Verification documents are strictly locked.

## Abuse Prevention
- **Blocks:** The `blocks` table instantly prevents the blocked user from appearing in discovery or sending messages. RLS policies explicitly join against the `blocks` table.
- **Reports:** The `reports` table flags users for Admin review.
- **Spam:** (Future) Integrating AI text analysis on the `messages` table via Postgres triggers to flag unsolicited inappropriate content.

## Secrets Management
All secrets (Supabase Service Role Key, Payment Gateway Secrets) are stored securely in Vercel Environment Variables. The Next.js application only exposes `NEXT_PUBLIC_` variables to the client bundle. The Service Role key is NEVER exposed to the client.
