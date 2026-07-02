# 09 - Chat System

## Overview
The messaging architecture provides real-time, 1-on-1 chat for users with an `accepted` match status.

## Data Flow: Sending a Message
```text
[ Client (Sender) ]
   │
   ├─> Server Action: sendMessage(matchId, content)
   │     ├─> Auth & RLS check (Is sender part of match_id? Is match accepted?)
   │     ├─> INSERT INTO `messages`
   │     └─> Return success
   │
[ PostgreSQL Trigger ]
   │
[ Supabase Realtime ]
   │
   └─> WebSocket Broadcast -> [ Client (Recipient) ]
```

## Read Patterns
- The client subscribes to a Supabase Realtime channel specific to their `match_id` (`channel('public:messages:match_id=eq.123')`).
- Initial load fetches the last 50 messages via REST, paginating backwards via cursor.

## Security Model
- **RLS Policy on `messages`:** 
  `SELECT/INSERT: auth.uid() IN (SELECT user_a_id FROM matches WHERE id = match_id UNION SELECT user_b_id FROM matches WHERE id = match_id) AND status = 'accepted'`
- **Abuse:** If a match is unmatched or blocked, the RLS policy immediately prevents further inserts.

## Engineering Decisions
Why not use a third-party chat SDK like Sendbird?
1. **Cost:** Supabase Realtime provides sufficient scale for our current needs without per-MAU chat licensing costs.
2. **Data Ownership:** All chat logs reside in our own Postgres instance, crucial for moderation, compliance, and AI training (safety filters).
