# 08 - Matchmaking Engine

## The Match Lifecycle
The core interaction mechanism: Liking / Passing a profile.

### Workflow: Like Profile (Right Swipe)
1. **Request:** User A likes User B (`src/app/actions/matches.ts`).
2. **Validation:** Ensure User A is not blocked by User B, and User A has not exhausted daily limits.
3. **Database Operation (Transaction):**
   - Attempt to INSERT into `matches (user_a_id, user_b_id, status)` where `user_a < user_b`.
   - If row already exists (meaning User B previously liked User A), UPDATE `status = 'accepted'`.
   - Else, set `status = 'pending'`, `action_by_id = User A`.
4. **Event Emission:** If status becomes 'accepted', trigger a Match event.

## Match State Machine
```text
Unmatched ──> Pending (Liked by A) ──> Accepted (Mutual)
                                   └─> Rejected (Passed by B)
```

## Scoring & Compatibility (Future AI Integration)
Currently, matches are deterministic based on hard filters.
*Future Roadmap:* The `compatibility_profiles` table is designed to store NLP-processed tags and personality vectors. We will implement `pgvector` to compute the cosine distance between two compatibility vectors, sorting the Discovery feed by highest similarity score.

## Tie Breaking
When multiple profiles have the same compatibility score, results are tie-broken by:
1. Online status (last_seen in `user_sessions`).
2. Profile completion score.
3. Random salt to ensure feed variety.
