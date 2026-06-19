-- Protect critical profile fields from being modified by standard users
create or replace function protect_profile_fields()
returns trigger as $$
begin
  -- Check if the current user is NOT a service_role (meaning it's a regular user request)
  if current_setting('request.jwt.claims', true)::json->>'role' != 'service_role' and not is_admin() then
    -- Force the protected fields to remain the same as the old values
    NEW.status = OLD.status;
    NEW.rejection_reason = OLD.rejection_reason;
    NEW.subscription_ends_at = OLD.subscription_ends_at;
  end if;
  
  return NEW;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if any
drop trigger if exists enforce_profile_protection on profiles;

-- Create the BEFORE UPDATE trigger
create trigger enforce_profile_protection
  before update on profiles
  for each row
  execute function protect_profile_fields();
