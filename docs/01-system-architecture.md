# 01 - System Architecture

## Technology Stack
- **Compute / Routing:** Next.js (App Router)
- **Database:** PostgreSQL 15+ (via Supabase)
- **Authentication:** Supabase GoTrue (JWT-based)
- **Real-time Sync:** Supabase Realtime (WebSockets)
- **Storage:** Supabase Storage (S3-compatible)
- **Schema Validation:** Zod
- **Type Generation:** Supabase CLI / OpenAPI

## Application Layers

### 1. Presentation Layer (Client)
Responsible strictly for UI rendering and state management. Communicates with the backend exclusively via Next.js Server Actions for mutations and Supabase Realtime for live updates.

### 2. Transport & Controller Layer (Next.js Server Actions / API Routes)
- **Server Actions (`src/app/actions`):** The primary entry point for the frontend. Handles parsing FormData, validating inputs via Zod, extracting the user session, and routing the request to the Service Layer.
- **API Routes (`src/app/api`):** Used only for external ingress, such as payment gateway webhooks or third-party OAuth callbacks.

### 3. Service Layer (`src/services`)
Contains pure business logic and external provider integrations.
- Isolates the controllers from provider-specific SDKs.
- Orchestrates complex workflows spanning multiple database tables or external services.

### 4. Data Access Layer (Supabase Client)
- `src/shared/lib/supabase/server.ts`: Configures the Supabase client with Next.js cookies, forwarding the user's JWT to PostgreSQL.

### 5. Persistence & Security Layer (PostgreSQL)
- The absolute source of truth.
- **Row Level Security (RLS):** Policies defined here ensure that even if a Server Action has a bug, a user cannot read or modify data they don't own.

## Request Lifecycle (Architecture View)

```text
      [ Browser ]
           │
           │ 1. User clicks "Save Profile" (React Server Action Invoked)
           ▼
[ Next.js Edge / Node.js ]
   │
   ├─> 2. Auth: Extract JWT from Next.js Cookies
   │
   ├─> 3. Validate: Zod Schema validates payload
   │
   ├─> 4. Service: Call ProfileService.updateProfile()
   │
   └─> [ Supabase Client ]
           │
           │ 5. Execute SQL (with JWT context)
           ▼
[ PostgreSQL / Supabase ]
   │
   ├─> 6. RLS: Database verifies JWT claims against RLS policies
   │
   └─> 7. Commit: Update `profiles` table
           │
           │ 8. Trigger: Supabase Realtime detects change
           ▼
      [ Browser ] (Receives WebSocket update if subscribed)
```

## Why this Architecture?

### Advantages
1. **Reduced Boilerplate:** Server Actions eliminate the need to write standard REST controllers, fetch calls, and React Query mutations for simple tasks.
2. **Deep Security:** By passing the JWT to PostgreSQL and relying on RLS, we achieve defense-in-depth. A compromised application server layer still faces the database RLS wall.
3. **Type Safety:** End-to-end type safety from the DB schema to the client UI.

### Tradeoffs
- **Vendor Lock-in:** Heavy reliance on Supabase specific features (Realtime, GoTrue, Storage). Migrating away would require rewriting the auth and realtime layers.
- **Cold Starts:** Serverless architecture can incur cold start penalties, mitigated by edge caching and connection pooling.

## Future Evolution
As the system scales, the Service Layer will likely be extracted into separate microservices (e.g., an independent Matchmaking Go/Rust service) connected via gRPC or message queues (RabbitMQ/Kafka) while keeping Next.js as the API Gateway/BFF (Backend-for-Frontend).
