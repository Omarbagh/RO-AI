-- ============================================================================
-- CVhero — initial schema
-- Tables: profiles, resumes, resume_content, subscriptions, ai_usage
-- Row Level Security is enabled on every table; users can only ever touch
-- rows they own. Resume content is gated through ownership of the parent resume.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------
do $$ begin
  create type public.plan_tier as enum ('free', 'pro');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.subscription_status as enum (
    'active', 'trialing', 'past_due', 'canceled', 'incomplete', 'unpaid'
  );
exception when duplicate_object then null; end $$;

-- AI features we meter for rate limiting / analytics.
do $$ begin
  create type public.ai_feature as enum (
    'rewrite_bullets', 'generate_summary', 'ats_score', 'tailor_job', 'cover_letter'
  );
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- updated_at helper
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- profiles  (1:1 with auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- insert handled by trigger (security definer); no direct insert policy needed.

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- resumes
-- ----------------------------------------------------------------------------
create table if not exists public.resumes (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  title        text not null default 'Untitled resume',
  template_id  text not null default 'modern',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists resumes_user_id_idx on public.resumes(user_id);
create index if not exists resumes_updated_at_idx on public.resumes(updated_at desc);

alter table public.resumes enable row level security;

drop policy if exists "resumes_select_own" on public.resumes;
create policy "resumes_select_own" on public.resumes
  for select using (auth.uid() = user_id);

drop policy if exists "resumes_insert_own" on public.resumes;
create policy "resumes_insert_own" on public.resumes
  for insert with check (auth.uid() = user_id);

drop policy if exists "resumes_update_own" on public.resumes;
create policy "resumes_update_own" on public.resumes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "resumes_delete_own" on public.resumes;
create policy "resumes_delete_own" on public.resumes
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_resumes_updated_at on public.resumes;
create trigger trg_resumes_updated_at
  before update on public.resumes
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- resume_content  (1:1 with resumes; the full structured CV lives in `data`)
-- ----------------------------------------------------------------------------
create table if not exists public.resume_content (
  resume_id   uuid primary key references public.resumes(id) on delete cascade,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.resume_content enable row level security;

-- Ownership is derived from the parent resume.
drop policy if exists "resume_content_select_own" on public.resume_content;
create policy "resume_content_select_own" on public.resume_content
  for select using (
    exists (
      select 1 from public.resumes r
      where r.id = resume_content.resume_id and r.user_id = auth.uid()
    )
  );

drop policy if exists "resume_content_insert_own" on public.resume_content;
create policy "resume_content_insert_own" on public.resume_content
  for insert with check (
    exists (
      select 1 from public.resumes r
      where r.id = resume_content.resume_id and r.user_id = auth.uid()
    )
  );

drop policy if exists "resume_content_update_own" on public.resume_content;
create policy "resume_content_update_own" on public.resume_content
  for update using (
    exists (
      select 1 from public.resumes r
      where r.id = resume_content.resume_id and r.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.resumes r
      where r.id = resume_content.resume_id and r.user_id = auth.uid()
    )
  );

drop policy if exists "resume_content_delete_own" on public.resume_content;
create policy "resume_content_delete_own" on public.resume_content
  for delete using (
    exists (
      select 1 from public.resumes r
      where r.id = resume_content.resume_id and r.user_id = auth.uid()
    )
  );

drop trigger if exists trg_resume_content_updated_at on public.resume_content;
create trigger trg_resume_content_updated_at
  before update on public.resume_content
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- subscriptions  (Mollie). One row per user.
-- ----------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null unique references auth.users(id) on delete cascade,
  plan                    public.plan_tier not null default 'free',
  status                  public.subscription_status not null default 'active',
  provider                text not null default 'mollie',
  mollie_customer_id      text,
  mollie_subscription_id  text,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);

alter table public.subscriptions enable row level security;

-- Users may read their own subscription. Writes happen server-side only
-- (service role / webhook), so there is intentionally no write policy.
drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id);

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- ai_usage  (per-call ledger used for plan-based rate limiting)
-- ----------------------------------------------------------------------------
create table if not exists public.ai_usage (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  feature     public.ai_feature not null,
  input_tokens   integer not null default 0,
  output_tokens  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists ai_usage_user_created_idx on public.ai_usage(user_id, created_at desc);

alter table public.ai_usage enable row level security;

-- Users may read their own usage (e.g. to show "x of y left this month").
-- Inserts happen server-side after a successful AI call (service role).
drop policy if exists "ai_usage_select_own" on public.ai_usage;
create policy "ai_usage_select_own" on public.ai_usage
  for select using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- New-user bootstrap: create profile + a free subscription automatically.
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
