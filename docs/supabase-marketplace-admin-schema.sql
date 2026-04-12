-- =====================================================
-- TAZZKY Marketplace Admin Schema
-- Crea las tablas esperadas por /admin-secret-tazzky
-- =====================================================

create extension if not exists "pgcrypto";

-- Si no existe service_categories en este proyecto, se crea una version minima
create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketplace_pros (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  avatar_url text,
  is_top_talent boolean not null default false,
  is_verified boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gigs (
  id uuid primary key default gen_random_uuid(),
  pro_id uuid not null references public.marketplace_pros(id) on delete cascade,
  category_id uuid references public.service_categories(id) on delete set null,
  title text not null,
  description text not null,
  cover_image text,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gig_gallery (
  id uuid primary key default gen_random_uuid(),
  gig_id uuid not null references public.gigs(id) on delete cascade,
  image_url text not null
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  gig_id uuid not null references public.gigs(id) on delete cascade,
  type text not null,
  description text not null,
  price numeric(12,2) not null check (price >= 0),
  delivery_days integer not null check (delivery_days > 0),
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint packages_features_is_array check (jsonb_typeof(features) = 'array')
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  gig_id uuid not null references public.gigs(id) on delete cascade,
  title text not null,
  description text,
  image_url text not null,
  work_date date,
  price_range text,
  duration text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text not null,
  subtitle text,
  cta_link text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_gigs_pro_id on public.gigs(pro_id);
create index if not exists idx_gigs_category_id on public.gigs(category_id);
create index if not exists idx_gigs_slug on public.gigs(slug);
create index if not exists idx_gig_gallery_gig_id on public.gig_gallery(gig_id);
create index if not exists idx_packages_gig_id on public.packages(gig_id);
create index if not exists idx_portfolio_items_gig_id on public.portfolio_items(gig_id);
create index if not exists idx_hero_banners_active on public.hero_banners(is_active);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_marketplace_pros_updated_at on public.marketplace_pros;
create trigger trg_marketplace_pros_updated_at
before update on public.marketplace_pros
for each row execute function public.set_updated_at();

drop trigger if exists trg_gigs_updated_at on public.gigs;
create trigger trg_gigs_updated_at
before update on public.gigs
for each row execute function public.set_updated_at();

drop trigger if exists trg_packages_updated_at on public.packages;
create trigger trg_packages_updated_at
before update on public.packages
for each row execute function public.set_updated_at();

drop trigger if exists trg_portfolio_items_updated_at on public.portfolio_items;
create trigger trg_portfolio_items_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

drop trigger if exists trg_hero_banners_updated_at on public.hero_banners;
create trigger trg_hero_banners_updated_at
before update on public.hero_banners
for each row execute function public.set_updated_at();

-- =====================================================
-- RLS basico para admin por email
-- Cambia el email si hace falta.
-- =====================================================

alter table public.marketplace_pros enable row level security;
alter table public.gigs enable row level security;
alter table public.gig_gallery enable row level security;
alter table public.packages enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.hero_banners enable row level security;

-- Lectura publica opcional (puedes restringir despues)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gigs' and policyname = 'public_read_gigs'
  ) then
    create policy public_read_gigs on public.gigs for select using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gig_gallery' and policyname = 'public_read_gig_gallery'
  ) then
    create policy public_read_gig_gallery on public.gig_gallery for select using (true);
  end if;
end $$;

-- Escritura solo admin autenticado
-- Nota: depende de que el JWT incluya email (supabase auth normal)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'marketplace_pros' and policyname = 'admin_write_marketplace_pros'
  ) then
    create policy admin_write_marketplace_pros on public.marketplace_pros
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gigs' and policyname = 'admin_write_gigs'
  ) then
    create policy admin_write_gigs on public.gigs
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gig_gallery' and policyname = 'admin_write_gig_gallery'
  ) then
    create policy admin_write_gig_gallery on public.gig_gallery
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'packages' and policyname = 'admin_write_packages'
  ) then
    create policy admin_write_packages on public.packages
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'portfolio_items' and policyname = 'admin_write_portfolio_items'
  ) then
    create policy admin_write_portfolio_items on public.portfolio_items
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'hero_banners' and policyname = 'admin_write_hero_banners'
  ) then
    create policy admin_write_hero_banners on public.hero_banners
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;
