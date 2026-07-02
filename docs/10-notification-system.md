# 10 - Notification System

## Overview
Notifications alert users to critical events: Matches, Messages, Verification Updates, and System alerts.

## Request Lifecycle (Match Notification)
1. **Trigger:** `matches` table is updated to `status = 'accepted'`.
2. **Producer:** Database Trigger (Postgres Function) OR Application Service Layer (Next.js).
3. **Write:** INSERT into `notifications (user_id, type, title, body)`.
4. **Push (Future):** Call APNS/FCM via edge function.
5. **Realtime:** Supabase broadcasts the new row to the client.

## State Machine
```text
Unread ──> Read ──> Deleted
```

## Polling vs Real-time
We utilize Supabase Realtime for in-app delivery. 
If the user is offline, the notification rests in the database. When the user logs in, the client fetches `WHERE is_read = false`.

## Engineering Decisions
By storing notifications in Postgres rather than a transient queue, we guarantee delivery and provide a historical "Activity Feed" for the user.
