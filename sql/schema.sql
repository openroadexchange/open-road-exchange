
-- schema.sql
create extension if not exists pgcrypto;

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  price numeric not null,
  year int,
  miles bigint,
  description text,
  featured boolean default false,
  status text default 'available',
  created_at timestamptz default now()
);

create table if not exists images (
  id uuid primary key default gen_random_uuid(),
  inventory_id uuid references inventory(id) on delete cascade,
  url text not null,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  created_at timestamptz default now()
);

insert into inventory (title, type, price, year, miles, description, featured) values
('2021 Winnebago View 24V','RV',89900,2021,12000,'Compact Class C with modern layout', true),
('2019 Ford F-350 Super Duty','Truck',45900,2019,68000,'Work-ready dually with towing package', false),
('2022 Featherlite 20'' Enclosed','Trailer',19900,2022,0,'Lightweight aluminum enclosed trailer', false);
