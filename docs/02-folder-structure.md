# 02 - Folder Structure

The Vivah backend adopts a domain-driven folder structure within the Next.js App Router paradigm.

```text
vivaha/
├── src/
│   ├── app/
│   │   ├── actions/          # Next.js Server Actions (Internal API)
│   │   │   ├── admin.ts
│   │   │   ├── discover.ts
│   │   │   ├── matches.ts
│   │   │   ├── matchmaking.ts
│   │   │   ├── onboarding.ts
│   │   │   └── saved.ts
│   │   ├── api/              # Route Handlers (External Ingress)
│   │   │   ├── messages/     
│   │   │   └── payment/      # Webhooks (create-order, verify)
│   │   └── auth/             
│   │       └── callback/     # OAuth / Magic Link resolution
│   ├── config/               # Global environment and constants
│   ├── services/             # Business Logic & Integrations
│   │   ├── analytics/        # Event tracking logic
│   │   ├── email/            # Transactional email dispatcher
│   │   ├── payments/         # Payment gateway abstraction
│   │   ├── security/         # Rate limiting, auditing
│   │   └── supabase/         # Core DB interaction logic
│   └── shared/               
│       ├── lib/              
│       │   └── supabase/     # Supabase client singletons & Types
│       ├── utils/            # Pure helper functions
│       └── validation/       # Zod Schemas (e.g., auth-schemas.ts)
├── database/                 # Raw SQL for seeds, views, functions (Archival)
└── supabase/
    └── migrations/           # The authoritative Database Schema
```

## Engineering Decisions

### Why separate `actions` and `api`?
- **Actions** are RPC (Remote Procedure Calls) natively integrated with React. They are inherently tied to our frontend application and share authentication context automatically.
- **API** routes are traditional HTTP endpoints. They are reserved exclusively for machine-to-machine communication (webhooks, external CRON jobs, etc.) where standard HTTP status codes and headers are required.

### Why a `services` folder?
If all logic lived in `actions/`, testing would be difficult, and reusing logic between a Server Action and an API Route (e.g., fulfilling a membership via a user click vs. fulfilling via a Stripe webhook) would lead to code duplication. The `services/` directory is the reusable core.

### Where is the domain logic?
Domain logic sits heavily in the PostgreSQL database (via constraints, functions, and triggers defined in `supabase/migrations`) and is orchestrated by the `src/services` layer.
