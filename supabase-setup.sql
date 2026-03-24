-- Holly Wood Furniture - Supabase Database Setup
-- Run this in your Supabase SQL editor

-- ─── Projects table ───
create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  title_en      text not null,
  title_ar      text not null,
  slug          text unique not null,
  description_en text,
  description_ar text,
  category      text,
  cover_image   text not null default '',
  is_featured   boolean default false,
  is_published  boolean default true,
  display_order integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── Project media ───
create table if not exists project_media (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references projects(id) on delete cascade,
  media_url   text not null,
  media_type  text not null check (media_type in ('image', 'video')),
  caption_en  text,
  caption_ar  text,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ─── Storage buckets ───
-- Run these via Supabase dashboard or Storage API:
-- Create bucket: project-covers  (public)
-- Create bucket: project-media   (public)
-- Create bucket: project-videos  (public)

-- ─── Row Level Security (RLS) ───
alter table projects enable row level security;
alter table project_media enable row level security;

-- Public can read published projects
create policy "Public can read published projects"
  on projects for select
  using (is_published = true);

-- Public can read all project media
create policy "Public can read project media"
  on project_media for select
  using (true);

-- Authenticated users (admin) can do everything
create policy "Admin can manage projects"
  on projects for all
  using (auth.role() = 'authenticated');

create policy "Admin can manage media"
  on project_media for all
  using (auth.role() = 'authenticated');

-- ─── Sample data (optional) ───
insert into projects (title_en, title_ar, slug, description_en, description_ar, category, cover_image, is_featured, is_published, display_order)
values
  (
    'Walnut Dining Table',
    'طاولة طعام جوز',
    'walnut-dining-table',
    'A handcrafted live-edge walnut dining table for 8, with hand-finished oil treatment. Designed to be the centerpiece of any dining room.',
    'طاولة طعام بحافة طبيعية من خشب الجوز مصنوعة يدوياً لـ 8 أشخاص، مع معالجة زيتية يدوية. مصممة لتكون محور أي غرفة طعام.',
    'custom-furniture',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    true, true, 1
  ),
  (
    'Modern Kitchen Cabinets',
    'خزائن مطبخ عصرية',
    'modern-kitchen-cabinets',
    'Full kitchen fit-out with handleless cabinets in American white oak, integrated appliances, and Calacatta marble countertops.',
    'تجهيز مطبخ كامل بخزائن بدون مقابض من خشب البلوط الأمريكي الأبيض، أجهزة مدمجة، وأسطح رخام كالاكاتا.',
    'kitchen-cabinets',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    true, true, 2
  ),
  (
    'Restaurant Interior',
    'ديكور مطعم',
    'restaurant-interior',
    'Complete wood interior for a fine dining restaurant — custom booth seating, bar cladding, ceiling panels, and decorative wall features.',
    'ديكور خشبي كامل لمطعم راقٍ — مقاعد كابينة مخصصة، تكسية بار، ألواح سقف، وعناصر جدارية زخرفية.',
    'commercial',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    false, true, 3
  );
