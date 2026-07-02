# 25 - Development Guide

Welcome to the team. This guide outlines how to build and maintain the Vivaha backend.

## Project Setup
1. **Clone the Repo.**
2. **Environment Variables:** Copy `.env.example` to `.env.local` and populate your local Supabase keys.
3. **Database Local Dev:** 
   ```bash
   supabase start
   supabase db reset
   ```
4. **Install & Run:** `npm install`, `npm run dev`.

## Coding Standards
- **Strict Typing:** Avoid `any`. Rely on `Database` types exported from `src/shared/lib/supabase/database.types.ts`.
- **Validation First:** Never trust client data. Always define a Zod schema in `src/shared/validation` before writing a Server Action.
- **Errors:** Throw standard JS `Error` objects in services; catch them in Server Actions and return standardized `{ error: string }` objects to the client. Do not crash the React render cycle with unhandled Server Action promises.

## How to add a new Feature (e.g., "Bookmarks")

1. **Database:**
   - Create a migration: `supabase migration new create_bookmarks`.
   - Write SQL: `CREATE TABLE bookmarks (...)`.
   - Add RLS: `CREATE POLICY ...`.
   - Apply: `supabase db push`.
   - Update Types: `supabase gen types typescript --local > src/shared/lib/supabase/database.types.ts`.

2. **Validation:**
   - Create `src/shared/validation/bookmark-schemas.ts`.

3. **Server Action:**
   - Create `src/app/actions/bookmarks.ts`.
   - Validate input.
   - Fetch session.
   - Execute insert via Supabase client.

## Debugging Tips
- If RLS is failing silently (returning 0 rows instead of an error), double-check that your Server Action is using `createServerClient` and that the cookie contains a valid JWT.
- Use `supabase db pull` if the remote schema has drifted from your local migrations.
