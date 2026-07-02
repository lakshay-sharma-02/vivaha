# 04 - Authentication

## Overview
Vivaha relies on Supabase Auth (GoTrue), which provides a secure, JWT-based authentication system.

## Mechanisms
1. **JWT (JSON Web Tokens):** Short-lived access tokens containing user identity and roles.
2. **Cookies:** Tokens are securely stored in HTTP-only, SameSite cookies via `@supabase/ssr`, preventing XSS attacks from extracting the JWT.
3. **SSR (Server-Side Rendering):** Next.js middleware intercepts requests, validates the JWT cookie, and protects routes before rendering.

## Request Lifecycle: Login

```text
User 
 ├─> Submits Email/Password 
 │
[ Server Action: login(data) ]
 ├─> Validates input via Zod
 ├─> Calls Supabase auth.signInWithPassword()
 │
[ Supabase GoTrue API ]
 ├─> Verifies hash
 ├─> Returns Access Token & Refresh Token
 │
[ @supabase/ssr ]
 ├─> Sets secure HTTP-only cookies in the browser response
 │
[ Next.js Middleware ]
 ├─> Future requests include the cookie
 ├─> Middleware verifies cookie, allows access to /dashboard
```

## Session Lifecycle
- **Access Token:** Expires rapidly (usually 1 hour).
- **Refresh Token:** Long-lived. Used silently by the Supabase client to fetch a new Access Token.
- **Session Expiration:** If the Refresh Token is revoked (e.g., password change, explicit logout across devices), the user is forced to re-authenticate.

## Server Actions Authentication
Every protected Server Action must explicitly fetch the user session:
```typescript
const supabase = createServerClient();
const { data: { user }, error } = await supabase.auth.getUser();

if (error || !user) throw new Error("Unauthorized");
```
*Design Decision:* We do not rely solely on Middleware to protect Server Actions. Middleware protects routing; Server Actions protect data operations.

## OAuth Flow
- Handled via `src/app/auth/callback/route.ts`.
- Implements PKCE (Proof Key for Code Exchange).
- User authenticates with Google/Apple -> redirected to `/auth/callback?code=...` -> Server exchanges code for session cookies -> redirects to `/dashboard`.
