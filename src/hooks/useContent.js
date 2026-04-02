import { useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

/**
 * Hook to fetch content from Supabase
 */
export const useContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublishedSectors = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sectors')
        .select(`
          *,
          sector_details (*)
        `)
        .eq('is_published', true)
        .order('name');
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      console.error('Error fetching sectors:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublishedSectors = fetchPublishedSectors;

  const fetchPublishedServices = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('title');
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      console.error('Error fetching services:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublishedServices = fetchPublishedServices;

  const fetchPublishedInsights = useCallback(async (limit = 10) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('insights_articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false }) // Fallback to created_at if published_at is null
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      console.error('Error fetching insights:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublishedAIPContent = useCallback(async () => {
      setLoading(true);
      try {
          const { data, error } = await supabase
            .from('aip_content')
            .select('*')
            .eq('is_published', true);
          if (error) throw error;
          return data;
      } catch (err) {
          setError(err);
          console.error('Error fetching AIP content:', err);
          return [];
      } finally {
          setLoading(false);
      }
  }, []);

  return {
    loading,
    error,
    fetchPublishedSectors,
    getPublishedSectors,
    fetchPublishedServices,
    getPublishedServices,
    fetchPublishedInsights,
    getPublishedAIPContent
  };
};