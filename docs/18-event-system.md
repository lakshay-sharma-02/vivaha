# 18 - Event System

## Overview
Vivaha relies on an implicit, database-driven event system rather than a heavy message broker (like Kafka/RabbitMQ) for its current scale.

## Core Mechanism: Postgres Triggers & Realtime
State changes in the database act as the source of truth for events.

### Event: `Match Created`
- **Trigger:** An `UPDATE` to the `matches` table where `status` changes from `pending` to `accepted`.
- **Producer:** PostgreSQL.
- **Consumers:**
  1. **Supabase Realtime:** Detects the row change and broadcasts the `Match` event to the connected WebSockets of `user_a` and `user_b`.
  2. **Database Trigger (Future):** A Postgres function catches the `UPDATE` and `INSERT`s a row into the `notifications` table.
  3. **Edge Function (Future):** Supabase Webhooks can listen to this row change and call an external Edge Function to dispatch an email via Resend.

### Event: `Message Sent`
- **Trigger:** `INSERT` into `messages`.
- **Consumer:** Broadcasted via Realtime to the specific `match_id` channel.

## Engineering Decisions
Why use Database Triggers over Application-level events?
If we emit an event in the Next.js Server Action *before* the database commits, and the database fails, we have a ghost event. If we emit *after* the database commits, and the Next.js process dies immediately, we drop the event.
By using PostgreSQL triggers and Supabase Realtime/Webhooks (the Outbox Pattern), we guarantee that if the data is committed, the event is emitted.
