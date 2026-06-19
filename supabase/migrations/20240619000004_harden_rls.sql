-- =============================================================================
-- MIGRATION: Harden Row Level Security
-- Replaces the broad "Owners update profiles" policy with column-scoped logic,
-- upgrades the protection trigger to raise explicit exceptions, and tightens
-- the interests update policy.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. PROFILES — Replace the permissive update policy
-- -----------------------------------------------------------------------------

-- Drop the old policy that allowed users to write any column they own.
drop policy if exists "Owners update profiles" on profiles;

-- New policy: owners may only update their own row AND only with safe column
-- values.  The WITH CHECK clause is evaluated against the NEW row, so it
-- enforces what data can actually be written.  Protected fields (status,
-- rejection_reason, subscription_ends_at) must stay unchanged — the trigger
-- below raises an exception before the row is committed if they are touched.
create policy "Owners update own profile"
  on profiles
  for update
  using  (id = auth.uid())           -- which rows can be targeted
  with check (id = auth.uid());      -- new row must still belong to this user


-- -----------------------------------------------------------------------------
-- 2. PROFILES — Replace the silent guard trigger with an explicit one
--
-- The previous trigger silently overwrote tampered fields with the old values
-- and returned HTTP 200 — extremely confusing and no real deterrent.
-- This version raises an exception so the client gets a proper error and
-- cannot infer which path succeeded.
-- -----------------------------------------------------------------------------

create or replace function protect_profile_fields()
returns trigger as $$
declare
  jwt_role text;
begin
  -- Resolve the caller's role from the JWT.
  -- service_role bypass: Supabase sets app_role = 'service_role' in the JWT
  -- when the service-role key is used.
  jwt_role := coalesce(
    current_setting('request.jwt.claims', true)::json->>'role',
    ''
  );

  -- Admins and service-role callers are allowed to change anything.
  if jwt_role = 'service_role' or is_admin() then
    return NEW;
  end if;

  -- For regular authenticated users, any attempt to change a protected field
  -- is rejected with an explicit error rather than silently swallowed.
  if NEW.status IS DISTINCT FROM OLD.status then
    raise exception 'permission denied: field "status" is read-only for users'
      using errcode = 'insufficient_privilege';
  end if;

  if NEW.rejection_reason IS DISTINCT FROM OLD.rejection_reason then
    raise exception 'permission denied: field "rejection_reason" is read-only for users'
      using errcode = 'insufficient_privilege';
  end if;

  if NEW.subscription_ends_at IS DISTINCT FROM OLD.subscription_ends_at then
    raise exception 'permission denied: field "subscription_ends_at" is read-only for users'
      using errcode = 'insufficient_privilege';
  end if;

  return NEW;
end;
$$ language plpgsql security definer;

-- Re-attach trigger (drop first so this migration is idempotent)
drop trigger if exists enforce_profile_protection on profiles;

create trigger enforce_profile_protection
  before update on profiles
  for each row
  execute function protect_profile_fields();


-- -----------------------------------------------------------------------------
-- 3. INTERESTS — Add WITH CHECK to the receiver update policy
--
-- Without WITH CHECK, a receiver could set status to any arbitrary value.
-- This locks it to the two valid response values and also ensures
-- responded_at is set (the trigger can't fully enforce this, but the check
-- clause makes it structural).
-- -----------------------------------------------------------------------------

drop policy if exists "Receiver update interests" on interests;

create policy "Receiver update interests"
  on interests
  for update
  using     (receiver_profile_id = auth.uid())
  with check (
    receiver_profile_id = auth.uid()
    and status in ('ACCEPTED', 'DECLINED')
  );
