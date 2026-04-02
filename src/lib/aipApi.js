import { supabase } from '@/lib/customSupabaseClient';

const EDGE_FN = 'https://evpbetmgmhwhhhgwvnfb.supabase.co/functions/v1';

/**
 * Centralized API for fetching AIP data.
 * Handles error logging, Supabase connection, and data transformation.
 */
export const aipApi = {
  /**
   * Fetches the catalog of sectors.
   * Merges database data with static fallbacks if needed.
   */
  fetchSectorsCatalog: async () => {
    try {
      console.log('Fetching sectors catalog...');
      const { data, error } = await supabase
        .from('sectors')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error in fetchSectorsCatalog:', err);
      return [];
    }
  },

  /**
   * Fetches projects for a specific sector using the Edge Function.
   * @param {string} sectorSlug - e.g. 'energy', 'transport'
   */
  fetchProjectsBySector: async (sectorSlug) => {
    try {
      const res = await fetch(
        `${EDGE_FN}/aip-projects?sector=${encodeURIComponent(sectorSlug)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch projects`);
      const data = await res.json();
      return (data.projects || []).map(p => ({
        ...p,
        sector: p.sector_top_slug || sectorSlug,
      }));
    } catch (err) {
      console.error('Error in fetchProjectsBySector:', err);
      throw err;
    }
  },

  /**
   * Fetches latest insights/articles.
   * @param {number} limit
   */
  fetchInsights: async (limit = 4) => {
    try {
      const { data, error } = await supabase
        .from('insights_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error in fetchInsights:', err);
      return [];
    }
  },

  /**
   * Fetches recent podcast episodes.
   * @param {number} limit
   */
  fetchPodcastEpisodes: async (showId = null, limit = 10) => {
    try {
      let query = supabase
        .from('podcast_episodes')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (showId) {
        query = query.eq('show_id', showId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error in fetchPodcastEpisodes:', err);
      return [];
    }
  },

  /**
   * Fetches the primary podcast show details.
   */
  fetchPrimaryPodcastShow: async () => {
    try {
      const { data, error } = await supabase
        .from('podcast_shows')
        .select('*')
        .eq('is_primary', true)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error in fetchPrimaryPodcastShow:', err);
      return null;
    }
  }
};