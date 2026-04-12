-- =====================================================
-- Agrega la columna currency a packages para multidivisa
-- =====================================================

begin;

alter table if exists public.packages
  add column if not exists currency text not null default 'MXN';

update public.packages
set currency = 'MXN'
where currency is null or currency = '';

comment on column public.packages.currency is 'Divisa del paquete (MXN, USD, COP, ARS, CLP, PEN)';

commit;

-- Verificacion rapida
-- select id, gig_id, type, price, currency from public.packages limit 10;
