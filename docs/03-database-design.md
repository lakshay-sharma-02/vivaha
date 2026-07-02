# 03 - Database Design

The database is the beating heart of Vivaha. Designed for PostgreSQL 15+, it prioritizes referential integrity and strict normalization.

## Core Tables

### 1. `auth.users` (Supabase Managed)
- **Purpose:** Identity provider. Stores email, password hashes, and MFA factors.
- **Note:** Never queried directly by application logic; we query `public.profiles`.

### 2. `public.profiles`
- **Purpose:** The central identity table for a user.
- **Columns:** `id` (UUID, references auth.users), `first_name`, `last_name`, `gender`, `date_of_birth`, `height_cm`, `bio`, `verification_status`, `is_active`.
- **Relationships:** Links to `religions`, `professions`, `cities`, `countries`.
- **Indexes:** Indexed heavily on `gender`, `city_id`, `religion_id` for fast discovery queries.

## 1-to-1 Profile Extensions
To avoid an excessively wide `profiles` table, domain-specific data is split into 1-to-1 tables sharing the same Primary Key (`profile_id`).

### `profile_completion`
- **Purpose:** Gamification and gating. Tracks a 0-100 `score`.

### `family_details`
- **Purpose:** Stores cultural and family background, critical for traditional matchmaking.

### `preferences`
- **Purpose:** Stores the user's hard filters for partners.
- **Columns:** `min_age`, `max_age`, `min_height_cm`, `preferred_religions[]`, `preferred_cities[]`.
- **Constraints:** `CHECK (min_age <= max_age)`.

### `compatibility_profiles`
- **Purpose:** "AI Readiness". Stores psychometric data.
- **Columns:** `personality_type`, `values[]`, `interests[]`, `relationship_goals`.
- **Future Expansion:** A `vector` column will be added here to store embeddings for cosine-similarity AI matching.

## Media & Assets

### `profile_media`
- **Purpose:** Tracks user photos and videos stored in Supabase Storage.
- **Columns:** `type` (image/video), `bucket_path`, `display_order`, `is_primary`, `is_verified`.
- **Constraints:** `UNIQUE INDEX` ensuring only one `is_primary = TRUE` per profile.

## Matchmaking & Social

### `matches`
- **Purpose:** Represents the edge between two nodes (users) in the social graph.
- **Columns:** `user_a_id`, `user_b_id`, `status` (pending, accepted, rejected).
- **Constraints:** `CHECK (user_a_id < user_b_id)` prevents duplicate match permutations (e.g., Alice->Bob and Bob->Alice are represented by a single row).

### `messages`
- **Purpose:** Real-time chat.
- **Columns:** `match_id`, `sender_id`, `content`, `message_type` (text, image).
- **Indexes:** Indexed on `match_id` for fast loading of chat histories.

## Trust, Safety & Analytics

### `blocks` & `reports`
- **Purpose:** Abuse prevention.
- **Constraints:** `UNIQUE(blocker_id, blocked_id)`, `CHECK (reporter_id <> reported_id)`.

### `profile_views` & `search_history`
- **Purpose:** Feeds the recommendation algorithm by tracking implicit interests.

## Performance Considerations
- **Indexes:** B-Tree indexes exist on all foreign keys. Partial indexes are used (e.g., `WHERE is_active = TRUE` on profiles) to speed up active user searches.
- **Read Patterns:** Usually localized to a specific user's perspective. Discovery queries join `profiles`, `profile_media`, and `compatibility_profiles`.
- **Write Patterns:** Heavy on `messages` and `profile_views`. These tables are candidates for partitioning by date if they grow beyond 10M rows.

## Future Expansion
- **Partitioning:** `messages` will require partitioning by month/year.
- **pgvector:** Introducing vector embeddings for semantic matching based on bios and messaging styles.
