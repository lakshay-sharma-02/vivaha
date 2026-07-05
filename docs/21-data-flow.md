# 21 - Data Flow

The macro data flow of the Vivah platform demonstrates how a user moves from an anonymous visitor to an engaged, paying member.

## The Funnel Data Flow

```text
[ 1. Account Creation ] (auth.users)
        │
        ▼
[ 2. Basic Profile ] (public.profiles) -> User becomes visible in system
        │
        ▼
[ 3. Background & Family ] (public.family_details)
        │
        ▼
[ 4. Preferences ] (public.preferences) -> Engine now knows who to serve
        │
        ▼
[ 5. Verification ] (verification_documents) -> Trust established (Admin approval)
        │
        ▼
[ 6. Discovery & Views ] (profile_views) -> System tracks implicit interest
        │
        ▼
[ 7. Matching ] (matches) -> Explicit interest logged
        │
        ▼
[ 8. Messaging ] (messages) -> Engagement locked
        │
        ▼
[ 9. Membership ] (memberships, payments) -> Monetization achieved
```

## AI / Analytics Data Loop (Future)
1. **Source:** `profile_views` (Who did they look at?) + `messages` (Did they converse well?)
2. **Processing:** Nightly CRON jobs export data to a Data Warehouse (e.g., Snowflake/BigQuery).
3. **Training:** ML models generate updated compatibility embeddings.
4. **Injection:** Embeddings pushed back into `compatibility_profiles.vector_embedding`.
5. **Consumption:** Next.js Discovery Action queries via `pgvector` for better recommendations.
