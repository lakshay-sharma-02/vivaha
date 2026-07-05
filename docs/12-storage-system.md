# 12 - Storage System

## Overview
Vivah relies on Supabase Storage (an abstraction over AWS S3) to handle user-generated media (avatars, verification documents, chat images).

## Buckets
1. **`avatars` (Public):** Stores profile images. Readable by anyone, writable only by the authenticated owner.
2. **`verification_docs` (Private):** Stores sensitive ID documents. Readable only by admins, writable only by the authenticated owner.
3. **`chat_media` (Private):** Stores images sent in messages. Readable only by participants of the specific `match_id`.

## Request Lifecycle: Image Upload

```text
[ Client ]
   ├─> 1. Selects image (e.g., avatar.jpg)
   │
[ Next.js Server Action ]
   ├─> 2. Generates Signed Upload URL for `avatars` bucket
   └─> 3. Returns URL & Token to client
   │
[ Client ]
   ├─> 4. Uploads bytes directly to Supabase Storage via Signed URL
   │
[ Next.js Server Action ]
   ├─> 5. ConfirmUpload(path)
   └─> 6. INSERT into `profile_media` (path, type)
```

## Security Model
- **Direct Uploads:** By using Signed URLs, we prevent the Next.js edge functions from buffering large image payloads, saving bandwidth and memory.
- **Storage RLS:** Supabase Storage buckets support RLS. For `avatars`, the policy is `INSERT: auth.uid() = owner_id`.
- **Validation:** Files are validated on the client (MIME type, size) and enforced on the Storage bucket settings (e.g., max 5MB, `.jpg`/`.png` only).

## Engineering Decisions
We maintain a relational link via the `profile_media` table rather than just referencing a URL string in the `profiles` table. This allows us to track metadata (is_verified, is_primary, display_order) and handle multiple images robustly.
