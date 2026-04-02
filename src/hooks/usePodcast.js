import { useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const usePodcast = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPodcastShow = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch the first published show. 
      // We use maybeSingle() instead of single() to avoid errors when 0 rows are returned.
      const { data, error } = await supabase
        .from('podcast_show')
        .select('*')
        .eq('is_published', true)
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      console.error('Error fetching podcast show:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublishedPodcastShow = fetchPodcastShow;

  const fetchPodcastEpisodes = useCallback(async (showId) => {
    // If no showId is provided, we can't fetch episodes for a specific show.
    // However, if the design allows fetching all published episodes regardless of show, we can skip the check.
    // Based on previous logic, it seems to filter by showId if present.
    
    setLoading(true);
    try {
      let query = supabase
        .from('podcast_episodes')
        .select('*')
        .eq('is_published', true)
        .order('episode_number', { ascending: false });
        
      if (showId) {
        query = query.eq('show_id', showId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      setError(err);
      console.error('Error fetching episodes:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublishedEpisodes = fetchPodcastEpisodes;

  return {
    loading,
    error,
    fetchPodcastShow,
    getPublishedPodcastShow,
    fetchPodcastEpisodes,
    getPublishedEpisodes
  };
};