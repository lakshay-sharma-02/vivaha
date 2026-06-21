-- Security boundary for member data.
-- Members may read their own complete row. Other profiles are only exposed
-- through the curated RPCs below, preventing direct access to private columns.

drop policy if exists "Public view verified profiles" on public.profiles;
drop policy if exists "Members view own profile" on public.profiles;

create policy "Members view own profile"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()));

alter table public.profiles
  add column if not exists gotra text,
  add column if not exists mothers_gotra text,
  add column if not exists grandmothers_gotra text;

create or replace function public.browse_profiles(
  page_number integer default 1,
  search_text text default null,
  religion_filter text default null,
  caste_filter text default null,
  town_filter text default null,
  age_min integer default null,
  age_max integer default null
)
returns jsonb
language plpgsql
security definer
stable
set search_path = ''
as $$
declare
  viewer public.profiles%rowtype;
  safe_page integer := greatest(coalesce(page_number, 1), 1);
  page_size constant integer := 20;
  result jsonb;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into viewer from public.profiles where id = auth.uid();
  if viewer.status <> 'VERIFIED' then
    raise exception 'Verified profile required' using errcode = '42501';
  end if;

  with matching as (
    select p.*
    from public.profiles p
    where p.status = 'VERIFIED'
      and p.is_visible is true
      and p.id <> auth.uid()
      and (viewer.gender is null or p.gender <> viewer.gender)
      and (nullif(trim(search_text), '') is null
        or p.full_name ilike '%' || left(trim(search_text), 100) || '%'
        or p.about_me ilike '%' || left(trim(search_text), 100) || '%')
      and (nullif(trim(religion_filter), '') is null or p.religion ilike '%' || left(trim(religion_filter), 100) || '%')
      and (nullif(trim(caste_filter), '') is null or p.caste ilike '%' || left(trim(caste_filter), 100) || '%')
      and (nullif(trim(town_filter), '') is null or p.town ilike '%' || left(trim(town_filter), 100) || '%')
      and (age_min is null or extract(year from age(current_date, p.date_of_birth)) >= age_min)
      and (age_max is null or extract(year from age(current_date, p.date_of_birth)) <= age_max)
  ), paged as (
    select * from matching
    order by updated_at desc, id
    offset (safe_page - 1) * page_size
    limit page_size
  )
  select jsonb_build_object(
    'profiles', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'profile_photo_path', p.profile_photo_path,
          'date_of_birth', p.date_of_birth,
          'town', p.town,
          'religion', p.religion,
          'caste', p.caste,
          'education', p.education,
          'profession', p.profession,
          'about_me', p.about_me
        ) order by p.updated_at desc, p.id
      ) from paged p
    ), '[]'::jsonb),
    'page', safe_page,
    'pageSize', page_size,
    'totalCount', (select count(*) from matching),
    'hasMore', (select count(*) from matching) > safe_page * page_size
  ) into result;

  return result;
end;
$$;

create or replace function public.get_profile_detail(target_profile_id uuid)
returns jsonb
language plpgsql
security definer
stable
set search_path = ''
as $$
declare
  viewer public.profiles%rowtype;
  target public.profiles%rowtype;
  subscribed boolean;
  result jsonb;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into viewer from public.profiles where id = auth.uid();
  if viewer.status <> 'VERIFIED' then
    raise exception 'Verified profile required' using errcode = '42501';
  end if;

  select * into target
  from public.profiles
  where id = target_profile_id and status = 'VERIFIED' and is_visible is true;

  if target.id is null then return null; end if;

  subscribed := viewer.subscription_ends_at is not null
    and viewer.subscription_ends_at > now();

  result := to_jsonb(target)
    - array['phone_number', 'subscription_ends_at', 'rejection_reason',
            'onboarding_step', 'created_at', 'updated_at', 'status', 'is_visible'];

  if not subscribed then
    result := result - array['income_range', 'family_type', 'father_occupation',
      'mother_occupation', 'siblings_count', 'manglik_status', 'horoscope_details',
      'diet', 'smoking', 'drinking', 'hobbies', 'gotra', 'mothers_gotra',
      'grandmothers_gotra', 'preferred_age_min', 'preferred_age_max',
      'preferred_town', 'preferred_religion', 'preferred_caste'];
  end if;

  return jsonb_build_object('profile', result, 'isSubscribed', subscribed);
end;
$$;

create or replace function public.get_interest_dashboard()
returns jsonb
language sql
security definer
stable
set search_path = ''
as $$
  select jsonb_build_object(
    'received', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id, 'status', i.status, 'created_at', i.created_at,
        'person', jsonb_build_object(
          'id', p.id, 'full_name', p.full_name, 'gender', p.gender,
          'profile_photo_path', p.profile_photo_path,
          'phone_number', case when i.status = 'ACCEPTED' then p.phone_number else null end
        )
      ) order by i.created_at desc)
      from public.interests i join public.profiles p on p.id = i.sender_profile_id
      where i.receiver_profile_id = auth.uid()
    ), '[]'::jsonb),
    'sent', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id, 'status', i.status, 'created_at', i.created_at,
        'person', jsonb_build_object(
          'id', p.id, 'full_name', p.full_name, 'gender', p.gender,
          'profile_photo_path', p.profile_photo_path,
          'phone_number', case when i.status = 'ACCEPTED' then p.phone_number else null end
        )
      ) order by i.created_at desc)
      from public.interests i join public.profiles p on p.id = i.receiver_profile_id
      where i.sender_profile_id = auth.uid()
    ), '[]'::jsonb)
  )
  where auth.uid() is not null;
$$;

revoke all on function public.browse_profiles(integer, text, text, text, text, integer, integer) from public;
revoke all on function public.get_profile_detail(uuid) from public;
revoke all on function public.get_interest_dashboard() from public;
grant execute on function public.browse_profiles(integer, text, text, text, text, integer, integer) to authenticated;
grant execute on function public.get_profile_detail(uuid) to authenticated;
grant execute on function public.get_interest_dashboard() to authenticated;

drop policy if exists "Sender insert interests" on public.interests;
drop policy if exists "Receiver update interests" on public.interests;

create or replace function public.send_interest(receiver_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  sender public.profiles%rowtype;
  receiver public.profiles%rowtype;
begin
  select * into sender from public.profiles where id = auth.uid();
  select * into receiver from public.profiles where id = receiver_id;
  if sender.id is null then return 'UNAUTHORIZED'; end if;
  if sender.id = receiver_id then return 'SELF_INTEREST'; end if;
  if sender.status <> 'VERIFIED' then return 'NOT_VERIFIED'; end if;
  if sender.subscription_ends_at is null or sender.subscription_ends_at <= now() then return 'SUBSCRIPTION_REQUIRED'; end if;
  if receiver.id is null or receiver.status <> 'VERIFIED' or receiver.is_visible is not true then return 'NOT_FOUND'; end if;

  insert into public.interests(sender_profile_id, receiver_profile_id, status)
  values (sender.id, receiver.id, 'PENDING')
  on conflict (sender_profile_id, receiver_profile_id) do nothing;
  if not found then return 'ALREADY_SENT'; end if;
  return 'OK';
end;
$$;

create or replace function public.respond_to_interest(interest_id uuid, response text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if response not in ('ACCEPTED', 'DECLINED') then return false; end if;
  update public.interests
  set status = response, responded_at = now()
  where id = interest_id and receiver_profile_id = auth.uid() and status = 'PENDING';
  return found;
end;
$$;

revoke all on function public.send_interest(uuid) from public;
revoke all on function public.respond_to_interest(uuid, text) from public;
grant execute on function public.send_interest(uuid) to authenticated;
grant execute on function public.respond_to_interest(uuid, text) to authenticated;

-- One payment can only be fulfilled once.
create unique index if not exists payments_razorpay_order_id_key on public.payments(razorpay_order_id);
create unique index if not exists payments_razorpay_payment_id_key
  on public.payments(razorpay_payment_id) where razorpay_payment_id is not null;

create or replace function public.fulfil_subscription_payment(
  order_id text,
  payment_id text,
  payment_signature text,
  expected_user_id uuid default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  payment public.payments%rowtype;
  current_end timestamptz;
begin
  select * into payment
  from public.payments
  where razorpay_order_id = order_id
    and (expected_user_id is null or payer_profile_id = expected_user_id)
  for update;

  if payment.id is null then return false; end if;
  if payment.amount_inr <> 5000 then return false; end if;
  if payment.status = 'PAID' then return true; end if;
  if payment.status <> 'CREATED' then return false; end if;

  select subscription_ends_at into current_end
  from public.profiles where id = payment.payer_profile_id for update;

  update public.profiles
  set subscription_ends_at = greatest(coalesce(current_end, now()), now()) + interval '30 days'
  where id = payment.payer_profile_id;

  update public.payments
  set status = 'PAID', razorpay_payment_id = payment_id,
      razorpay_signature = payment_signature, paid_at = now()
  where id = payment.id;

  return true;
end;
$$;

revoke all on function public.fulfil_subscription_payment(text, text, text, uuid) from public, anon, authenticated;
grant execute on function public.fulfil_subscription_payment(text, text, text, uuid) to service_role;

-- Storage writes must stay inside the authenticated user's folder and be <= 5 MB.
drop policy if exists "Users can upload profile photos" on storage.objects;
drop policy if exists "Users can upload verification docs" on storage.objects;
drop policy if exists "Owners update profile photos" on storage.objects;
drop policy if exists "Owners delete profile photos" on storage.objects;
drop policy if exists "Owners update verification docs" on storage.objects;
drop policy if exists "Owners delete verification docs" on storage.objects;

create policy "Users upload own profile photos" on storage.objects for insert to authenticated
with check (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((metadata->>'size')::bigint, 0) <= 5242880
  and lower(coalesce(metadata->>'mimetype', '')) in ('image/jpeg', 'image/png', 'image/webp')
);
create policy "Owners update profile photos" on storage.objects for update to authenticated
using (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Owners delete profile photos" on storage.objects for delete to authenticated
using (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users upload own verification docs" on storage.objects for insert to authenticated
with check (
  bucket_id = 'verification-docs'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((metadata->>'size')::bigint, 0) <= 5242880
  and lower(coalesce(metadata->>'mimetype', '')) in ('image/jpeg', 'image/png', 'application/pdf')
);
create policy "Owners update verification docs" on storage.objects for update to authenticated
using (bucket_id = 'verification-docs' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Owners delete verification docs" on storage.objects for delete to authenticated
using (bucket_id = 'verification-docs' and (storage.foldername(name))[1] = auth.uid()::text);

-- A member may replace their verification-document row, but never read another's.
drop policy if exists "Owners delete own docs" on public.verification_documents;
create policy "Owners delete own docs" on public.verification_documents for delete to authenticated
using (profile_id = auth.uid());
