import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  description_en: string | null;
  description_ar: string | null;
  category: string | null;
  cover_image: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  media?: ProjectMedia[];
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption_en: string | null;
  caption_ar: string | null;
  sort_order: number;
  created_at: string;
}

export const CATEGORIES = [
  'custom-furniture',
  'kitchen-cabinets',
  'restoration',
  'interior-woodwork',
  'outdoor-furniture',
  'commercial',
] as const;
