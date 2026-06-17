-- Function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Automatically create a profile with status 'DRAFT'
  insert into public.profiles (id, status)
  values (new.id, 'DRAFT');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
