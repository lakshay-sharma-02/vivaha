# 14 - Server Actions

## Overview
Server Actions (`src/app/actions/*`) are the primary mutation mechanism in Vivah. They run securely on the server and are callable directly from React Client Components.

## Anatomy of a Server Action

Every Server Action follows a strict template:

```typescript
"use server";

import { z } from "zod";
import { createServerClient } from "@/shared/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 1. Zod Schema
const inputSchema = z.object({ ... });

export async function exampleAction(formData: FormData) {
  try {
    // 2. Auth Check
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // 3. Validation
    const parsed = inputSchema.parse(Object.fromEntries(formData));

    // 4. Business Logic / DB Operation
    const { error } = await supabase.from('table').insert({ ...parsed, user_id: user.id });
    if (error) throw error;

    // 5. Cache Invalidation
    revalidatePath('/dashboard');

    return { success: true };
  } catch (err) {
    // 6. Error Handling
    return { success: false, error: err.message };
  }
}
```

## Core Server Actions

### `onboarding.ts`
- **Purpose:** Handles the multi-step profile creation.
- **Dependencies:** `profiles`, `family_details`, `preferences`.

### `matches.ts`
- **Purpose:** Handles liking/passing profiles.
- **Business Logic:** Checks for existing pending matches to upgrade to 'accepted'.

### `discover.ts`
- **Purpose:** (Read Action) Fetches the feed based on preferences.
- **Note:** While mostly a read operation, it's exposed as an action to easily handle pagination logic securely.

## Engineering Decisions
Why use Server Actions over tRPC or REST?
- **Zero-API approach:** Next.js compiles Server Actions into secure POST endpoints automatically. We avoid writing boilerplate route handlers and fetch calls.
- **Progressive Enhancement:** Server Actions work natively with HTML `<form action={...}>`, allowing the app to function even before JS fully hydrates.
