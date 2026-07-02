# 17 - Validation

## Overview
All data entering the backend must be validated. We utilize [Zod](https://zod.dev/) for schema declaration and validation.

## Architecture
Schemas are centralized in `src/shared/validation/` (e.g., `auth-schemas.ts`, `profile-schemas.ts`). By placing them in `shared`, both the Client Components (React Hook Form) and Server Actions use the exact same validation rules.

## Example Flow
```typescript
// src/shared/validation/profile-schemas.ts
export const preferencesSchema = z.object({
  minAge: z.number().min(18).max(80),
  maxAge: z.number().min(18).max(80),
}).refine((data) => data.minAge <= data.maxAge, {
  message: "Min age cannot be greater than Max age",
  path: ["minAge"],
});

// src/app/actions/onboarding.ts
export async function updatePreferences(formData: FormData) {
  // Throws error if invalid, caught by standard error handler
  const validData = preferencesSchema.parse(Object.fromEntries(formData)); 
  // ... proceed to database
}
```

## Database Redundancy (Defense in Depth)
Zod validation is the first line of defense. The PostgreSQL database enforces the final line of defense using `CHECK` constraints.
- *Zod:* `z.number().min(100).max(250)` for height.
- *Postgres:* `height_cm INTEGER CHECK (height_cm BETWEEN 100 AND 250)`.

This ensures that even if a developer bypasses the Server Action and writes directly to the DB, invalid data cannot be persisted.
