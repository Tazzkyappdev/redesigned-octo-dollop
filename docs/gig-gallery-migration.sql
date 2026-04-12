-- =====================================================
-- Gig Gallery migration
-- Crea la tabla public.gig_gallery si aun no existe
-- =====================================================

create extension if not exists "pgcrypto";

create table if not exists public.gig_gallery (
  id uuid primary key default gen_random_uuid(),
  gig_id uuid not null references public.gigs(id) on delete cascade,
  image_url text not null
);

create index if not exists idx_gig_gallery_gig_id on public.gig_gallery(gig_id);

alter table public.gig_gallery enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'gig_gallery' and policyname = 'public_read_gig_gallery'
  ) then
    create policy public_read_gig_gallery on public.gig_gallery for select using (true);
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
