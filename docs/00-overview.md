# 00 - Overview

## What Exists
The Vivaha backend is a fully realized, production-ready foundation for a premium matchmaking application. It consists of a robust PostgreSQL schema managed via Supabase, a Next.js Server Action abstraction layer, a dedicated service tier for third-party integrations, and strict validation pipelines.

## Why it Exists
Traditional monolithic architectures struggle with the real-time demands (chat, notifications) and complex vector/geographic queries required for modern matchmaking. By decoupling the database (Supabase) from the compute layer (Next.js), we achieve:
1. **Real-time out of the box:** Supabase Realtime handles WebSockets natively based on DB triggers.
2. **Edge Computing:** Next.js Server Actions can run near the user, minimizing latency.
3. **Security:** PostgreSQL Row Level Security (RLS) guarantees data privacy at the lowest OSI layer possible for our app.

## How it Works
The application follows a strictly unidirectional data flow for mutations and real-time subscriptions for state sync:
1. **Mutation:** Client calls a Server Action -> Validation (Zod) -> Auth Check -> Service Layer -> Database (Insert/Update).
2. **State Sync:** Database triggers a Realtime event -> Supabase WebSocket broadcasts to authorized clients -> Client UI updates.

## Scaling the System
The system is designed to scale horizontally on the compute tier (Vercel/Next.js) while scaling vertically on the database tier initially, with a roadmap to connection pooling (Supavisor) and read replicas as we surpass 10,000 concurrent users. 

## Future Extension Points
The architecture specifically anticipates:
- **AI Matchmaking:** The `compatibility_profiles` table is pre-structured to accept vector embeddings (`pgvector`) for ML-driven compatibility scoring.
- **Global Expansion:** `countries` and `cities` lookup tables support PostGIS integration for geospatial radius search.
- **Advanced Monetization:** The `memberships` and `payments` tables are decoupled to support credits, consumable boosts, and tiered subscriptions.
