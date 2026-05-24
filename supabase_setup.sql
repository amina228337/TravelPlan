-- =============================================
-- TravelPlan Supabase setup
-- 1) Supabase Dashboard -> SQL Editor -> New query
-- 2) Вставь весь этот файл
-- 3) Нажми Run
-- =============================================

create extension if not exists "pgcrypto";

-- ---------- REVIEWS ----------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('destination', 'hotel', 'flight', 'place')),
  entity_id text not null,
  city text,
  country text,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists reviews_entity_idx on public.reviews (entity_type, entity_id);
create index if not exists reviews_city_idx on public.reviews (city);

-- ---------- BOOKINGS ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_type text not null check (booking_type in ('flight', 'hotel')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'expired', 'departed')),
  customer_name text,
  customer_email text,
  customer_phone text,
  city_from text,
  city_to text,
  country_to text,
  airline text,
  flight_key text,
  departure_time text,
  arrival_time text,
  return_departure_time text,
  return_arrival_time text,
  duration text,
  travel_class text,
  hotel_name text,
  hotel_key text,
  check_in date,
  check_out date,
  guests int default 1 check (guests >= 1),
  passengers int default 1 check (passengers >= 1),
  total_price int not null default 0 check (total_price >= 0),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists bookings_type_status_idx on public.bookings (booking_type, status);
create index if not exists bookings_flight_key_idx on public.bookings (flight_key);
create index if not exists bookings_hotel_key_idx on public.bookings (hotel_key);

-- ---------- PLACES ----------
create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  country text not null,
  category text not null check (category in ('attraction', 'beauty')),
  name text not null,
  description text,
  location text,
  photo_url text,
  created_at timestamptz not null default now()
);

create index if not exists places_city_idx on public.places (city);
create index if not exists places_category_idx on public.places (category);

-- ---------- RLS ----------
alter table public.reviews enable row level security;
alter table public.bookings enable row level security;
alter table public.places enable row level security;

-- Чтобы повторный запуск файла не ругался на уже созданные политики
drop policy if exists "Anyone can read reviews" on public.reviews;
drop policy if exists "Anyone can create reviews" on public.reviews;
drop policy if exists "Anyone can create bookings" on public.bookings;
drop policy if exists "Anyone can read bookings for demo" on public.bookings;
drop policy if exists "Anyone can update booking status for demo" on public.bookings;
drop policy if exists "Anyone can read places" on public.places;

-- ---------- POLICIES: REVIEWS ----------
create policy "Anyone can read reviews"
on public.reviews
for select
to anon, authenticated
using (true);

create policy "Anyone can create reviews"
on public.reviews
for insert
to anon, authenticated
with check (
  author_name is not null
  and rating between 1 and 5
);

-- ---------- POLICIES: BOOKINGS ----------
create policy "Anyone can create bookings"
on public.bookings
for insert
to anon, authenticated
with check (
  booking_type in ('flight', 'hotel')
  and total_price >= 0
);

-- Демо-доступ: для дипломного/учебного сайта можно.
-- Для настоящего сайта нужно делать авторизацию и показывать только свои брони.
create policy "Anyone can read bookings for demo"
on public.bookings
for select
to anon, authenticated
using (true);

-- Демо-оплата: браузеру разрешено менять статус.
-- Для реальной оплаты статус paid должен ставить только backend/webhook.
create policy "Anyone can update booking status for demo"
on public.bookings
for update
to anon, authenticated
using (true)
with check (
  status in ('pending', 'paid', 'cancelled', 'expired', 'departed')
);

-- ---------- POLICIES: PLACES ----------
create policy "Anyone can read places"
on public.places
for select
to anon, authenticated
using (true);

-- ---------- TEST DATA ----------
insert into public.places (city, country, category, name, description, location, photo_url)
values
('Севилья', 'Испания', 'attraction', 'Севильский Алькасар', 'Королевский дворец с мавританской архитектурой, садами и залами.', 'Patio de Banderas, s/n, Casco Antiguo, Sevilla, Spain', 'https://images.unsplash.com/photo-1558642084-fd07fae5282e'),
('Севилья', 'Испания', 'attraction', 'Площадь Испании', 'Одна из самых красивых площадей Испании с каналами, мостами и керамикой.', 'Plaza de España, Sevilla, Spain', 'https://images.unsplash.com/photo-1561319800-5d2d14059026'),
('Ларнака', 'Кипр', 'beauty', 'Солёное озеро Ларнаки', 'Красивое солёное озеро, где зимой часто можно увидеть фламинго.', 'Larnaca Salt Lake, Larnaca, Cyprus', 'https://images.unsplash.com/photo-1564518098558-7b0423aab4e1')
on conflict do nothing;

-- =============================================
-- ACCOUNTS / PROFILES UPDATE
-- Run this too if your project was created before profile/account support.
-- =============================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  nickname text,
  display_name_updated_at timestamptz,
  nickname_updated_at timestamptz,
  avatar_url text,
  avatar_updated_at timestamptz,
  country text,
  city text default 'Алматы',
  travel_style text default 'Комфортно и красиво',
  budget_level text default 'Средний',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;


alter table public.profiles add column if not exists avatar_updated_at timestamptz;
alter table public.profiles add column if not exists display_name_updated_at timestamptz;
alter table public.profiles add column if not exists nickname_updated_at timestamptz;
alter table public.profiles add column if not exists country text;

alter table public.bookings add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.bookings add column if not exists user_email text;

create index if not exists bookings_user_id_idx on public.bookings(user_id);
create index if not exists profiles_city_idx on public.profiles(city);

-- recreate policies safely
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can read own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Anyone can read bookings for demo" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can update booking status for demo" ON public.bookings;
DROP POLICY IF EXISTS "Users can read own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;

CREATE POLICY "Users can read own bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
ON public.bookings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
ON public.bookings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =============================================
-- REVIEWS UPDATE: user + image support
-- Run this too if project was created before review images.
-- =============================================

alter table public.reviews add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.reviews add column if not exists image_url text;

create index if not exists reviews_user_id_idx on public.reviews(user_id);

DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Everyone can read reviews" ON public.reviews;

CREATE POLICY "Everyone can read reviews"
ON public.reviews FOR SELECT
TO anon, authenticated
USING (true);

-- Отзывы можно оставлять и гостем, и аккаунтом.
-- Если пользователь вошёл, user_id должен совпадать с auth.uid().
CREATE POLICY "Users can create reviews"
ON public.reviews FOR INSERT
TO anon, authenticated
WITH CHECK (
  author_name is not null
  and rating between 1 and 5
  and (user_id is null or auth.uid() = user_id)
);
