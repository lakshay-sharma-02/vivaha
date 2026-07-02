# 23 - Scalability

The current architecture supports up to ~10,000 MAU without modification. Here is the evolution plan as traffic scales.

## 1. Up to 10,000 Users (Current State)
- **Architecture:** Next.js Server Actions connecting directly to Supabase Postgres via standard connection pooling (PgBouncer/Supavisor).
- **Bottlenecks:** None. Postgres on a standard instance easily handles 1k TPS.

## 2. 10,000 to 100,000 Users
- **Bottlenecks:** Discovery Engine query latency (`NOT IN` queries), and Database Connection limits due to Vercel Serverless cold starts.
- **Evolution:**
  - **Connection Pooling:** Ensure `Supavisor` (Supabase IPv4 connection pooler) is strictly utilized.
  - **Caching:** Implement Redis (Upstash) to cache the user's discovery feed and preferences.
  - **Search Optimization:** Switch from `NOT IN` to `NOT EXISTS` or materialized views for discovery exclusion logic.

## 3. 100,000 to 1 Million Users
- **Bottlenecks:** Real-time chat putting heavy load on a single Postgres instance; complex matchmaking scoring becoming too heavy for standard SQL.
- **Evolution:**
  - **Read Replicas:** Deploy Supabase Read Replicas. Route all heavy `discover.ts` traffic to read replicas, leaving the primary for `matches.ts` and `messages.ts` writes.
  - **Search Infrastructure:** Introduce an external search engine (Elasticsearch / Typesense) to offload complex geographic and semantic search from PostgreSQL. Postgres becomes purely transactional.
  - **Background Workers:** Move email dispatches and AI scoring from synchronous Next.js Server Actions to an asynchronous queue (e.g., Inngest or AWS SQS + Workers).

## 4. 1 Million+ Users
- **Evolution:** 
  - Microservices architecture. Extract the Chat system entirely from Postgres to a specialized NoSQL / XMPP / WebRTC solution.
  - Database sharding based on geographic regions.
