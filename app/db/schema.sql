-- Afrilayer Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Countries Table
create table afri_countries (
  id uuid primary key default uuid_generate_v4(),
  name varchar(100) not null,
  slug varchar(100) not null unique,
  code varchar(10) not null,
  flag_emoji varchar(10),
  region varchar(50),
  created_at timestamp with time zone default now()
);

-- Providers Table
create table afri_providers (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  slug varchar(255) not null unique,
  description text,
  website varchar(500),
  logo_url varchar(500),
  country_id uuid references afri_countries(id),
  founded_year integer,
  social_links jsonb,
  verification_status varchar(20) default 'pending' check (verification_status in ('verified', 'pending', 'unverified')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  archived_at timestamp with time zone
);

-- Categories Table
create table afri_categories (
  id uuid primary key default uuid_generate_v4(),
  name varchar(100) not null,
  slug varchar(100) not null unique,
  description text,
  icon varchar(50),
  sort_order integer default 0,
  created_at timestamp with time zone default now()
);

-- Tags Table
create table afri_tags (
  id uuid primary key default uuid_generate_v4(),
  name varchar(50) not null,
  slug varchar(50) not null unique,
  created_at timestamp with time zone default now()
);

-- APIs Table
create table afri_apis (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  slug varchar(255) not null unique,
  provider_id uuid references afri_providers(id) on delete cascade,
  description text,
  short_summary varchar(500),
  documentation_url varchar(500),
  official_website varchar(500),
  pricing_model text,
  auth_method varchar(100),
  sandbox_url varchar(500),
  status varchar(20) default 'active' check (status in ('active', 'deprecated', 'beta')),
  api_version varchar(50),
  rate_limit varchar(100),
  webhook_support boolean default false,
  support_email varchar(255),
  support_url varchar(500),
  last_verified timestamp with time zone,
  last_updated timestamp with time zone default now(),
  published_at timestamp with time zone,
  listing_status varchar(20) default 'draft' check (listing_status in ('draft', 'published', 'archived')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  archived_at timestamp with time zone
);

-- Junction Tables

-- API Countries (many-to-many)
create table afri_api_country (
  api_id uuid references afri_apis(id) on delete cascade,
  country_id uuid references afri_countries(id) on delete cascade,
  primary key (api_id, country_id)
);

-- API Categories (many-to-many)
create table afri_api_category (
  api_id uuid references afri_apis(id) on delete cascade,
  category_id uuid references afri_categories(id) on delete cascade,
  primary key (api_id, category_id)
);

-- API Tags (many-to-many)
create table afri_api_tag (
  api_id uuid references afri_apis(id) on delete cascade,
  tag_id uuid references afri_tags(id) on delete cascade,
  primary key (api_id, tag_id)
);

-- Collections Table
create table afri_collections (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  slug varchar(255) not null unique,
  description text,
  created_at timestamp with time zone default now()
);

-- Collection Items
create table afri_collection_items (
  collection_id uuid references afri_collections(id) on delete cascade,
  api_id uuid references afri_apis(id) on delete cascade,
  sort_order integer default 0,
  primary key (collection_id, api_id)
);

-- Updates/Changelog Table
create table afri_updates (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  slug varchar(255) not null unique,
  content text,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Change History
create table afri_change_history (
  id uuid primary key default uuid_generate_v4(),
  entity_type varchar(50) not null check (entity_type in ('api', 'provider', 'category', 'country', 'tag')),
  entity_id uuid not null,
  changed_by uuid references auth.users(id),
  changes jsonb,
  change_type varchar(20) default 'update' check (change_type in ('create', 'update', 'archive')),
  created_at timestamp with time zone default now()
);

-- Reviews (for future versions)
create table afri_reviews (
  id uuid primary key default uuid_generate_v4(),
  api_id uuid references afri_apis(id) on delete cascade,
  user_id uuid references auth.users(id),
  rating integer check (rating >= 1 and rating <= 5),
  title varchar(255),
  content text,
  created_at timestamp with time zone default now()
);

-- Provider Claims (for future versions)
create table afri_provider_claims (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid references afri_providers(id) on delete cascade,
  user_id uuid references auth.users(id),
  status varchar(20) default 'pending' check (status in ('pending', 'approved', 'rejected')),
  message text,
  created_at timestamp with time zone default now()
);

-- Organizations (for future versions)
create table afri_organizations (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  slug varchar(255) not null unique,
  description text,
  logo_url varchar(500),
  website varchar(500),
  created_at timestamp with time zone default now()
);

create table afri_organization_members (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references afri_organizations(id) on delete cascade,
  user_id uuid references auth.users(id),
  role varchar(20) default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamp with time zone default now()
);

-- Indexes for performance
create index idx_afri_apis_slug on afri_apis(slug);
create index idx_afri_providers_slug on afri_providers(slug);
create index idx_afri_categories_slug on afri_categories(slug);
create index idx_afri_countries_slug on afri_countries(slug);
create index idx_afri_apis_status on afri_apis(listing_status);
create index idx_afri_apis_published on afri_apis(published_at desc);
create index idx_afri_apis_updated on afri_apis(updated_at desc);

-- Full-text search indexes
create index idx_afri_apis_search on afri_apis using gin(to_tsvector('english', name || ' ' || coalesce(description, '')));
create index idx_afri_providers_search on afri_providers using gin(to_tsvector('english', name || ' ' || coalesce(description, '')));

-- Row Level Security Policies
alter table afri_apis enable row level security;
alter table afri_providers enable row level security;
alter table afri_categories enable row level security;
alter table afri_countries enable row level security;
alter table afri_tags enable row level security;
alter table afri_collections enable row level security;

-- Public read access for published APIs
create policy "Public read access" on afri_apis
  for select using (listing_status = 'published');

create policy "Public read access" on afri_providers
  for select using (true);

create policy "Public read access" on afri_categories
  for select using (true);

create policy "Public read access" on afri_countries
  for select using (true);

create policy "Public read access" on afri_tags
  for select using (true);

create policy "Public read access" on afri_collections
  for select using (true);

-- Admin write access
create policy "Admin write access" on afri_apis
  for all using (auth.uid() in (select id from afri_admins));

create policy "Admin write access" on afri_providers
  for all using (auth.uid() in (select id from afri_admins));

create policy "Admin write access" on afri_categories
  for all using (auth.uid() in (select id from afri_admins));

create policy "Admin write access" on afri_countries
  for all using (auth.uid() in (select id from afri_admins));

create policy "Admin write access" on afri_tags
  for all using (auth.uid() in (select id from afri_admins));

-- Trigger to update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_afri_apis_updated_at before update on afri_apis
  for each row execute procedure update_updated_at();

create trigger update_afri_providers_updated_at before update on afri_providers
  for each row execute procedure update_updated_at();