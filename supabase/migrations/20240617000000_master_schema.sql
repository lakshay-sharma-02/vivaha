-- 1. Setup Phase (Tables are created below)
create table profiles (
    id uuid primary key references auth.users on delete cascade,
    full_name text,
    date_of_birth date,
    gender text check (gender in ('male', 'female')),
    height_cm int,
    profile_photo_path text,
    town text,
    religion text,
    caste text,
    sub_caste text,
    education text,
    profession text,
    income_range text check (income_range in ('<3L', '3-6L', '6-10L', '10-20L', '20L+')),
    about_me text,
    family_type text check (family_type in ('nuclear', 'joint')),
    father_occupation text,
    mother_occupation text,
    siblings_count int,
    manglik_status text check (manglik_status in ('manglik', 'non_manglik', 'anshik', 'unknown')),
    horoscope_details text,
    preferred_age_min int,
    preferred_age_max int,
    preferred_town text,
    preferred_religion text,
    preferred_caste text,
    status text check (status in ('DRAFT', 'PENDING_VERIFICATION', 'VERIFIED', 'REJECTED')) default 'DRAFT',
    rejection_reason text,
    onboarding_step int default 1,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table admins (
    id uuid primary key references auth.users on delete cascade,
    full_name text,
    created_at timestamptz default now()
);

-- Admins Check Function (Must be created after the admins table)
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admins where id = auth.uid());
$$ language sql security definer stable;

create table verification_documents (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid references profiles(id) on delete cascade not null,
    aadhaar_photo_path text not null,
    aadhaar_last4 char(4) not null,
    submitted_at timestamptz default now(),
    reviewed_by uuid references admins(id),
    reviewed_at timestamptz
);

create table payments (
    id uuid primary key default gen_random_uuid(),
    payer_profile_id uuid references profiles(id) not null,
    target_profile_id uuid references profiles(id) not null,
    razorpay_order_id text not null,
    razorpay_payment_id text,
    razorpay_signature text,
    amount_inr int default 5000,
    status text check (status in ('CREATED', 'PAID', 'FAILED')) default 'CREATED',
    created_at timestamptz default now(),
    paid_at timestamptz
);

create table unlocks (
    id uuid primary key default gen_random_uuid(),
    unlocker_profile_id uuid references profiles(id) not null,
    unlocked_profile_id uuid references profiles(id) not null,
    payment_id uuid references payments(id) not null,
    created_at timestamptz default now(),
    unique(unlocker_profile_id, unlocked_profile_id)
);

create table admin_notes (
    id uuid primary key default gen_random_uuid(),
    unlock_id uuid references unlocks(id) not null,
    written_by uuid references admins(id) not null,
    note text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table interests (
    id uuid primary key default gen_random_uuid(),
    sender_profile_id uuid references profiles(id) not null,
    receiver_profile_id uuid references profiles(id) not null,
    status text check (status in ('PENDING', 'ACCEPTED', 'DECLINED')) default 'PENDING',
    created_at timestamptz default now(),
    responded_at timestamptz,
    unique(sender_profile_id, receiver_profile_id)
);

create table verification_audit_log (
    id uuid primary key default gen_random_uuid(),
    admin_id uuid references admins(id) not null,
    profile_id uuid references profiles(id) not null,
    action text check (action in ('viewed', 'approved', 'rejected')) not null,
    created_at timestamptz default now()
);

create table otp_requests (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    requested_at timestamptz default now()
);

-- 3. Row Level Security

alter table profiles enable row level security;
create policy "Public view verified profiles" on profiles for select using (status = 'VERIFIED' or id = auth.uid());
create policy "Owners insert profiles" on profiles for insert with check (id = auth.uid());
create policy "Owners update profiles" on profiles for update using (id = auth.uid());

alter table admins enable row level security;
create policy "Admins view admins" on admins for select using (is_admin());

alter table verification_documents enable row level security;
create policy "Owners insert own docs" on verification_documents for insert with check (profile_id = auth.uid());
create policy "Owners read own docs" on verification_documents for select using (profile_id = auth.uid());
create policy "Admins read docs" on verification_documents for select using (is_admin());
create policy "Admins update docs" on verification_documents for update using (is_admin());

alter table payments enable row level security;
create policy "Owners read payments" on payments for select using (payer_profile_id = auth.uid() or is_admin());
-- payments insert/update via service_role only

alter table unlocks enable row level security;
create policy "Owners read unlocks" on unlocks for select using (unlocker_profile_id = auth.uid() or is_admin());
-- unlocks insert via service_role only

alter table admin_notes enable row level security;
create policy "Unlockers read notes" on admin_notes for select using (
    is_admin() or 
    exists (select 1 from unlocks u where u.id = admin_notes.unlock_id and u.unlocker_profile_id = auth.uid())
);
create policy "Admins insert notes" on admin_notes for insert with check (is_admin());
create policy "Admins update notes" on admin_notes for update using (is_admin());

alter table interests enable row level security;
create policy "Involved read interests" on interests for select using (sender_profile_id = auth.uid() or receiver_profile_id = auth.uid());
create policy "Sender insert interests" on interests for insert with check (sender_profile_id = auth.uid());
create policy "Receiver update interests" on interests for update using (receiver_profile_id = auth.uid());

alter table verification_audit_log enable row level security;
create policy "Admins view audit" on verification_audit_log for select using (is_admin());
create policy "Admins insert audit" on verification_audit_log for insert with check (is_admin());

alter table otp_requests enable row level security;
-- Only service_role can read/write

-- 4. Storage Buckets (using standard SQL to insert into storage.buckets if available)
-- Note: This is a best effort. If the storage schema does not exist, this will fail.
-- Typically, buckets are created via the Supabase dashboard.
insert into storage.buckets (id, name, public) values ('profile-photos', 'profile-photos', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('verification-docs', 'verification-docs', false) on conflict do nothing;

create policy "Public can view profile photos" on storage.objects for select using (bucket_id = 'profile-photos');
create policy "Users can upload profile photos" on storage.objects for insert with check (bucket_id = 'profile-photos' and auth.uid() is not null);
create policy "Users can upload verification docs" on storage.objects for insert with check (bucket_id = 'verification-docs' and auth.uid() is not null);
create policy "Admins can view verification docs" on storage.objects for select using (bucket_id = 'verification-docs' and is_admin());
