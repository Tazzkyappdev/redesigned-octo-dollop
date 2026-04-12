-- =====================================================
-- Agrega campos de perfil profesional para marketplace_pros
-- Soluciona: column marketplace_pros_1.location does not exist
-- =====================================================

begin;

alter table if exists public.marketplace_pros
  add column if not exists location text,
  add column if not exists languages text,
  add column if not exists bio text;

comment on column public.marketplace_pros.location is 'Ubicacion del profesional';
comment on column public.marketplace_pros.languages is 'Idiomas del profesional';
comment on column public.marketplace_pros.bio is 'Biografia del profesional';

commit;

-- Verificacion rapida
-- select id, full_name, location, languages, bio from public.marketplace_pros limit 10;
