import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/supabase';

export function useProjects(options?: { featured?: boolean; limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });

        if (options?.featured) query = query.eq('is_featured', true);
        if (options?.limit) query = query.limit(options.limit);

        const { data, error } = await query;
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [options?.featured, options?.limit]);

  return { projects, loading, error };
}

export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, media:project_media(*)' )
          .eq('slug', slug)
          .eq('is_published', true)
          .single();
        if (error) throw error;
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Project not found');
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProject();
  }, [slug]);

  return { project, loading, error };
}

export function useAllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  return { projects, loading, refetch: fetch };
}
