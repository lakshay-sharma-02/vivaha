# 26 - Design Decisions

This document archives the "Why" behind major architectural choices, preventing future teams from repeating historical debates.

## Decision 1: Next.js Server Actions vs tRPC / REST
**Context:** We needed a way for the React client to mutate the database securely.
**Why Server Actions?**
- They eliminate network fetching boilerplate (e.g., `fetch('/api/...')`).
- They integrate natively with React 19 / Next 15 `useActionState` and `<form>`.
**Tradeoffs:** Server Actions abstract the network layer heavily, making it slightly harder to debug raw HTTP headers or use standard tools like Postman for testing internal APIs. We mitigate this by keeping logic in `services/`, which can be tested in isolation.

## Decision 2: Heavy reliance on PostgreSQL RLS
**Context:** Authorization can be done in the application code (Node.js) or the database.
**Why RLS?**
- Security in Depth. If a developer accidentally writes `supabase.from('messages').select('*')` without a `.eq('user_id', my_id)` filter in a Server Action, RLS will intercept the query and apply the filter at the DB engine level automatically.
**Tradeoffs:** RLS policies can be complex to write and debug. They also incur a slight performance penalty on every query, though Postgres 15+ has heavily optimized this.

## Decision 3: Splitting Profile Data into 1-to-1 Tables
**Context:** A user profile contains 50+ attributes (Basic info, Family, Preferences, Personality).
**Why Split?**
- PostgreSQL loads entire rows into memory (buffer cache). If the `discovery` engine only needs Age, Gender, and City to render a feed card, pulling a monolithic row containing 4kb of family history wastes memory bandwidth.
- **Tradeoffs:** Requires `JOIN`s when the full profile is needed. Given that full profile views are less frequent than discovery feed scans, this tradeoff is highly favorable.
