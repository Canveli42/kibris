-- Run in Supabase SQL Editor as the database administrator.
-- Phase 1: set SHA256 of the SAME randomly generated 32+ byte secret stored
-- as TRAFFIC_WRITE_SECRET in Vercel. Never commit the actual secret.
begin;
create schema if not exists traffic_private;
revoke all on schema traffic_private from public, anon, authenticated;
create table if not exists traffic_private.config (
  singleton boolean primary key default true check(singleton),
  secret_hash text not null check(secret_hash ~ '^[0-9a-f]{64}$')
);
create table if not exists traffic_private.rate (
  bucket timestamptz not null,
  scope text not null,
  adet integer not null check(adet > 0),
  primary key(bucket,scope)
);
revoke all on all tables in schema traffic_private from public, anon, authenticated;
-- Replace the placeholder with a SHA-256 hex digest before running.
insert into traffic_private.config(singleton,secret_hash)
values(true,'REPLACE_WITH_SHA256_HEX')
on conflict(singleton) do update set secret_hash=excluded.secret_hash;

create or replace function public.event_yaz_v2(
  p_yol text,p_kaynak text,p_tur text,p_etiket text,p_secret text,p_ip_hash text
) returns boolean language plpgsql security definer
set search_path=pg_catalog,public,traffic_private
as $fn$
declare t timestamptz:=date_trunc('minute',clock_timestamp());
  accepted integer;
begin
  if p_secret is null or length(p_secret)<32 or length(p_secret)>256
     or not exists(select 1 from traffic_private.config
       where singleton and secret_hash=encode(sha256(convert_to(p_secret,'UTF8')),'hex')) then
    return false;
  end if;
  if p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$'
     or p_tur is null or p_tur not in ('sayfa','tik') or p_yol is null
     or p_yol !~ '^/[^?#]*$' or length(p_yol)>200 then return false; end if;
  -- Shared per-minute budget, no raw IP is kept. Expired counters are removed.
  insert into traffic_private.rate as r(bucket,scope,adet) values(t,'global',1)
  on conflict(bucket,scope) do update set adet=r.adet+1
  where r.adet<1200 returning adet into accepted;
  if not found then return false; end if;
  if accepted=1 then delete from traffic_private.rate where bucket<t-interval '5 minutes'; end if;
  insert into traffic_private.rate as r(bucket,scope,adet) values(t,p_ip_hash,1)
  on conflict(bucket,scope) do update set adet=r.adet+1
  where r.adet<30 returning adet into accepted;
  if not found then return false; end if;
  insert into public.events(gun,yol,kaynak,tur,etiket,adet)
  values(current_date,left(p_yol,200),left(coalesce(p_kaynak,'direkt'),60),p_tur,left(coalesce(p_etiket,''),120),1)
  on conflict(gun,yol,kaynak,tur,etiket) do update set adet=events.adet+1;
  return true;
end;
$fn$;
revoke all on function public.event_yaz_v2(text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.event_yaz_v2(text,text,text,text,text,text) to anon;
commit;


