-- Phase 2 only AFTER preview and production confirm the new RPC works.
-- Stops the obsolete unauthenticated RPC; preserves existing event rows.
begin;
revoke execute on function public.event_yaz(text,text,text,text) from public, anon, authenticated;
-- Restrict manual cleanup to the same administrator as posts/settings.
-- Replace ADMIN_UUID with the existing administrator UUID from the RLS policy.
create or replace function public.event_temizle(p_gun integer default 30)
returns integer language plpgsql security definer set search_path=pg_catalog,public as $fn$
declare n integer;
begin
  if session_user not in ('postgres','supabase_admin')
     and auth.uid() is distinct from 'ADMIN_UUID'::uuid then
    raise exception 'Not authorized' using errcode='42501';
  end if;
  if p_gun is distinct from 30 then raise exception 'Only 30-day retention is allowed'; end if;
  with deleted as (delete from public.events where gun<current_date-30 returning 1)
    select count(*)::integer into n from deleted;
  return n;
end;
$fn$;
revoke execute on function public.event_temizle(integer) from public, anon;
grant execute on function public.event_temizle(integer) to authenticated;
commit;
