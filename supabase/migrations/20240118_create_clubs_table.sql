-- Create clubs table
create table if not exists public.clubs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  committee_id uuid references public.committees(id),
  siret text not null,
  rna text not null,
  email text not null,
  phone text not null,
  address jsonb not null default '{}'::jsonb,
  tags text[] default array[]::text[],
  stats jsonb not null default '{}'::jsonb,
  features jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.clubs enable row level security;

create policy "Enable read access for all users" on public.clubs
  for select using (true);

create policy "Enable insert access for authenticated users" on public.clubs
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users" on public.clubs
  for update using (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users" on public.clubs
  for delete using (auth.role() = 'authenticated');

-- Create indexes
create index if not exists clubs_name_idx on public.clubs (name);
create index if not exists clubs_committee_id_idx on public.clubs (committee_id);
create index if not exists clubs_siret_idx on public.clubs (siret);
create index if not exists clubs_rna_idx on public.clubs (rna);
create index if not exists clubs_tags_idx on public.clubs using gin (tags);

-- Add triggers for updated_at
create trigger handle_clubs_updated_at
  before update on public.clubs
  for each row
  execute function public.handle_updated_at();
