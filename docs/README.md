# Vivah Backend Engineering Knowledge Base

Welcome to the Vivah backend documentation. This `/docs` directory serves as the definitive reference for the system's architecture, design decisions, data models, and operational workflows.

## Purpose of Vivah
Vivah is a modern, high-performance matchmaking platform designed to handle complex compatibility algorithms, real-time communication, and robust trust & safety mechanisms. The backend must securely manage highly sensitive personal data while providing low-latency responses for a premium user experience.

## Backend Philosophy
- **Serverless & Edge-Ready:** Leverage Next.js App Router to move logic to the server edge where possible.
- **Fat Database, Thin Client:** Utilize PostgreSQL (Supabase) heavily, relying on Row Level Security (RLS), constraints, and triggers to enforce data integrity at the lowest level.
- **Server Actions over APIs:** Prefer Next.js Server Actions for internal mutations. API routes are strictly reserved for external integrations (webhooks) or specialized legacy clients.
- **Security by Default:** All inputs are validated via Zod. All database access is governed by strict RLS. 
- **Modular Services:** Abstract external dependencies (Payments, Emails, Analytics) into a dedicated Service Layer to prevent vendor lock-in.

## Technology Stack
- **Framework:** Next.js (App Router)
- **Database & Auth:** Supabase (PostgreSQL, GoTrue, Realtime, Storage)
- **Validation:** Zod
- **Typing:** Strict TypeScript (generated from DB schema)
- **Payments:** Razorpay / Stripe
- **Email:** Resend / SendGrid (Configurable)

## Folder Overview
```text
vivaha/
├── src/
│   ├── app/
│   │   ├── actions/      # Next.js Server Actions (Internal API)
│   │   └── api/          # Next.js Route Handlers (External Webhooks)
│   ├── services/         # Business logic and external provider integrations
│   ├── shared/           # Shared types, Zod schemas, and utils
│   └── config/           # Global configuration
├── supabase/
│   └── migrations/       # Source of truth for database schema
└── docs/                 # This documentation
```

## Quick Architecture
```text
[ Browser / Client ] 
        │
   (HTTPS / WSS)
        │
[ Next.js Server Actions ] ── [ Service Layer ] ──> [ External APIs (Payments, Email) ]
        │
 [ @supabase/ssr ]
        │
[ Supabase Gateway ]
        │
[ PostgreSQL Database ] ──> [ Realtime / Storage ]
```

## Development Setup
Please refer to `25-development-guide.md` for local setup instructions, coding standards, and testing procedures.

## Documentation Index
- [00. Overview](00-overview.md)
- [01. System Architecture](01-system-architecture.md)
- [02. Folder Structure](02-folder-structure.md)
- [03. Database Design](03-database-design.md)
- [04. Authentication](04-authentication.md)
- [05. User Onboarding](05-user-onboarding.md)
- [06. Profile System](06-profile-system.md)
- [07. Discovery Engine](07-discovery-engine.md)
- [08. Matchmaking Engine](08-matchmaking-engine.md)
- [09. Chat System](09-chat-system.md)
- [10. Notification System](10-notification-system.md)
- [11. Payment System](11-payment-system.md)
- [12. Storage System](12-storage-system.md)
- [13. Security](13-security.md)
- [14. Server Actions](14-server-actions.md)
- [15. Service Layer](15-service-layer.md)
- [16. API Reference](16-api-reference.md)
- [17. Validation](17-validation.md)
- [18. Event System](18-event-system.md)
- [19. State Machines](19-state-machines.md)
- [20. Sequence Diagrams](20-sequence-diagrams.md)
- [21. Data Flow](21-data-flow.md)
- [22. Deployment](22-deployment.md)
- [23. Scalability](23-scalability.md)
- [24. Monitoring](24-monitoring.md)
- [25. Development Guide](25-development-guide.md)
- [26. Design Decisions](26-design-decisions.md)
- [27. Future Roadmap](27-future-roadmap.md)

## How to Navigate the Docs
Start with **01-system-architecture.md** for a macro view, then dive into **03-database-design.md** as the database schema drives the entire application state. Role-specific deep dives are available (e.g., Security, Matchmaking, Services).
