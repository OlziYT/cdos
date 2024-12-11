-- Create committees table
create table if not exists public.committees (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  siret text not null,
  rna text not null,
  email text not null,
  phone text not null,
  street text not null,
  city text not null,
  postal_code text not null,
  stats jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.committees enable row level security;

create policy "Enable read access for all users" on public.committees
  for select using (true);

create policy "Enable insert access for authenticated users" on public.committees
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users" on public.committees
  for update using (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users" on public.committees
  for delete using (auth.role() = 'authenticated');

-- Create indexes
create index if not exists committees_name_idx on public.committees (name);
create index if not exists committees_siret_idx on public.committees (siret);
create index if not exists committees_rna_idx on public.committees (rna);

-- Add triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_committees_updated_at
  before update on public.committees
  for each row
  execute function public.handle_updated_at();