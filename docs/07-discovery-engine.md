# 07 - Discovery Engine

## Overview
The Discovery Engine (`src/app/actions/discover.ts`) is responsible for serving the feed of potential matches to a user.

## How Data Flows
1. **Fetch Preferences:** System reads the current user's `preferences` (age bounds, religion filters).
2. **Filter Query:** Constructs a PostgreSQL query filtering `profiles`.
3. **Exclusions:**
   - Filters out users already in the `matches` table (liked, passed, or matched).
   - Filters out users in the `blocks` table.
4. **Pagination:** Returns a cursor-based paginated list to the client.

## Request Lifecycle
```text
Client Request (Page 1)
 ├─> Validate Auth
 ├─> Query DB (apply preferences & exclusions)
 ├─> Log to `profile_views` (Future Enhancement: track impressions)
 └─> Response (Array of profiles)
```

## Performance Considerations
- This is the heaviest read query in the system.
- **Indexes:** Multi-column indexes on `(gender, is_active)` and B-Trees on age/religion are critical.
- **Bottlenecks:** Using `NOT IN (SELECT viewed_id FROM matches)` becomes slow at scale. We use `LEFT JOIN matches ... WHERE matches.id IS NULL` or anti-joins for performance.
