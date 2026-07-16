-- Schéma Supabase — ProClean Auto & Textil
-- À exécuter dans le SQL Editor du dashboard Supabase.

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id           uuid primary key default gen_random_uuid(),
  service_id   text        not null,
  booking_date date        not null,
  booking_time time        not null,
  first_name   text        not null,
  last_name    text        not null,
  phone        text        not null,
  email        text        not null,
  address      text        not null,
  notes        text,
  status       text        not null default 'confirmed'
               check (status in ('confirmed', 'cancelled')),
  created_at   timestamptz not null default now()
);

-- Verrou anti double-réservation : un seul rendez-vous confirmé par créneau.
-- L'insertion concurrente d'un même créneau échoue avec le code 23505,
-- intercepté par l'API qui répond alors 409 au client.
create unique index if not exists bookings_unique_active_slot
  on public.bookings (booking_date, booking_time)
  where status = 'confirmed';

create index if not exists bookings_by_date on public.bookings (booking_date);

-- RLS : la table n'est accessible que via la clé service_role (utilisée par
-- les routes API côté serveur). Aucune policy publique n'est nécessaire.
alter table public.bookings enable row level security;
