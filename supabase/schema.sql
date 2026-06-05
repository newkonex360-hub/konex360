create extension if not exists "pgcrypto";

do $$ begin
  create type review_status as enum ('pendiente', 'aprobado', 'publicado', 'archivado');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type transport_type as enum ('Tram', 'Bus', 'S-Bahn', 'Zug');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type transport_reason as enum ('obra', 'retraso', 'desvío', 'suspensión', 'evento');
exception
  when duplicate_object then null;
end $$;

create table if not exists news_items (
  id uuid primary key default gen_random_uuid(),
  title_original text not null,
  title_translated text not null,
  summary_es text not null,
  summary_de text not null,
  summary_en text not null,
  translations jsonb not null default '{}'::jsonb,
  source text not null,
  original_url text not null unique,
  published_at timestamptz,
  category text not null,
  status review_status not null default 'pendiente',
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists transport_alerts (
  id uuid primary key default gen_random_uuid(),
  affected_line text not null,
  type transport_type not null,
  reason transport_reason not null,
  starts_at timestamptz,
  ends_at timestamptz,
  summary_simple text not null,
  translations jsonb not null default '{}'::jsonb,
  source text not null,
  original_url text not null unique,
  status review_status not null default 'pendiente',
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_items_status_created_idx on news_items (status, created_at desc);
create index if not exists news_items_category_idx on news_items (category);
create index if not exists transport_alerts_status_created_idx on transport_alerts (status, created_at desc);
create index if not exists transport_alerts_line_idx on transport_alerts (affected_line);

alter table news_items enable row level security;
alter table transport_alerts enable row level security;

drop policy if exists "Public can read published news" on news_items;
create policy "Public can read published news"
  on news_items
  for select
  using (status = 'publicado');

drop policy if exists "Public can read published transport alerts" on transport_alerts;
create policy "Public can read published transport alerts"
  on transport_alerts
  for select
  using (status = 'publicado');
