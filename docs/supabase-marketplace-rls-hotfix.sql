-- =====================================================
-- TAZZKY Marketplace RLS Hotfix
-- Objetivo: garantizar lectura publica (anon/authenticated)
-- para /servicios y /servicios/[slug]
-- =====================================================

begin;

-- 1) Asegurar RLS en todas las tablas del marketplace
alter table if exists public.service_categories enable row level security;
alter table if exists public.marketplace_pros enable row level security;
alter table if exists public.gigs enable row level security;
alter table if exists public.gig_gallery enable row level security;
alter table if exists public.packages enable row level security;
alter table if exists public.portfolio_items enable row level security;
alter table if exists public.hero_banners enable row level security;

-- 2) Permisos base de lectura para roles publicos
-- (Supabase suele tenerlos, pero esto evita configuraciones rotas)
grant usage on schema public to anon, authenticated;
grant select on table public.service_categories to anon, authenticated;
grant select on table public.marketplace_pros to anon, authenticated;
grant select on table public.gigs to anon, authenticated;
grant select on table public.gig_gallery to anon, authenticated;
grant select on table public.packages to anon, authenticated;
grant select on table public.portfolio_items to anon, authenticated;
grant select on table public.hero_banners to anon, authenticated;

-- 3) Policies de lectura publica (idempotentes)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'service_categories' and policyname = 'public_read_service_categories'
  ) then
    create policy public_read_service_categories
      on public.service_categories
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'marketplace_pros' and policyname = 'public_read_marketplace_pros'
  ) then
    create policy public_read_marketplace_pros
      on public.marketplace_pros
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gigs' and policyname = 'public_read_gigs'
  ) then
    create policy public_read_gigs
      on public.gigs
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gig_gallery' and policyname = 'public_read_gig_gallery'
  ) then
    create policy public_read_gig_gallery
      on public.gig_gallery
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'packages' and policyname = 'public_read_packages'
  ) then
    create policy public_read_packages
      on public.packages
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'portfolio_items' and policyname = 'public_read_portfolio_items'
  ) then
    create policy public_read_portfolio_items
      on public.portfolio_items
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'hero_banners' and policyname = 'public_read_hero_banners'
  ) then
    create policy public_read_hero_banners
      on public.hero_banners
      for select
      using (true);
  end if;
end $$;

-- 4) Policies de escritura solo admin (idempotentes)
-- Ajusta el email si cambia el admin principal.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'marketplace_pros' and policyname = 'admin_write_marketplace_pros'
  ) then
    create policy admin_write_marketplace_pros
      on public.marketplace_pros
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
    create policy admin_write_gigs
      on public.gigs
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
    create policy admin_write_gig_gallery
      on public.gig_gallery
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
    create policy admin_write_packages
      on public.packages
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
    create policy admin_write_portfolio_items
      on public.portfolio_items
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
    create policy admin_write_hero_banners
      on public.hero_banners
      for all
      using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com')
      with check (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'joral1004@gmail.com');
  end if;
end $$;

commit;

-- =====================================================
-- Verificacion rapida (ejecutar despues si quieres)
-- select count(*) from public.gigs;
-- select count(*) from public.marketplace_pros;
-- select count(*) from public.packages;
-- =====================================================
