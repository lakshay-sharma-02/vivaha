# 27 - Future Roadmap

This document outlines architectural enhancements planned as the platform scales.

## Q1: Trust & Safety AI Integration
- **Feature:** Automated Image Moderation and Bio scanning.
- **Implementation:** Utilize a Background Queue (e.g., Inngest). When an image is uploaded to `profile_media`, an event triggers a Cloudflare Worker to pass the image through AWS Rekognition. If NSFW, automatically update `verification_status = 'rejected'` and suspend the profile.

## Q2: Advanced Semantic Matchmaking (pgvector)
- **Feature:** Moving beyond hard-filters (Age/Location) to personality and lifestyle matching.
- **Implementation:** 
  1. User fills out compatibility questionnaire.
  2. Edge function passes text to OpenAI `text-embedding-3-small`.
  3. Store the 1536-dimensional vector in `compatibility_profiles.embedding`.
  4. Discovery query utilizes Cosine Distance (`<=>`) in Postgres to surface the most compatible users.

## Q3: High-Performance Caching Layer
- **Feature:** Sub-50ms Discovery Feeds.
- **Implementation:** Integrate Redis. The Discovery Engine will pre-compute a user's potential matches nightly based on preferences and cache the list of `profile_id`s in Redis. The runtime action simply pops IDs from Redis and fetches the corresponding DB rows.

## Q4: Internal Admin Dashboard Extraction
- **Feature:** Move the Admin moderation tools out of the main Next.js app to prevent the core bundle from bloating.
- **Implementation:** Create a separate Next.js app (e.g., `admin.vivaha.com`) connecting to the same Supabase instance, but utilizing the Service Role Key with strict custom RBAC (Role Based Access Control) on top of Google Workspace SSO.
