import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const FALLBACK_TYPES = [
  { slug: "customer", title: "Project Developer", code: "customer" },
  { slug: "investor", title: "Impact Investor", code: "investor" },
  { slug: "partner", title: "Strategic Partner", code: "partner" },
  { slug: "vendor", title: "Technology Provider", code: "vendor" },
  { slug: "government", title: "Government Agency", code: "government" },
  { slug: "epc", title: "EPC Contractor", code: "epc" },
  { slug: "sponsor", title: "Project Sponsor", code: "sponsor" }
];

export const useRegistrationProfileTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTypes = async (retryCount = 0) => {
    try {
      setLoading(true);
      console.log(`[useRegistrationProfileTypes] Fetching types (Attempt ${retryCount + 1})...`);
      
      // Try calling the RPC function first
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_account_types_list');

      if (!rpcError && rpcData && rpcData.length > 0) {
        console.log('[useRegistrationProfileTypes] RPC Success:', rpcData);
        setTypes(rpcData);
        setLoading(false);
        return;
      }

      if (rpcError) {
        console.warn('[useRegistrationProfileTypes] RPC failed, trying direct table select:', rpcError);
      }

      // Fallback to direct table select if RPC fails
      const { data: tableData, error: tableError } = await supabase
        .from('account_types')
        .select('slug, title, code, sort_order')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (tableError) throw tableError;

      if (tableData && tableData.length > 0) {
        console.log('[useRegistrationProfileTypes] Table select Success:', tableData);
        setTypes(tableData);
      } else {
        // If DB is empty or fails silently, use hardcoded fallback
        console.warn('[useRegistrationProfileTypes] No data found in DB, using fallback hardcoded list.');
        setTypes(FALLBACK_TYPES);
      }

    } catch (err) {
      console.error('[useRegistrationProfileTypes] Error fetching types:', err);
      
      // Retry logic (once)
      if (retryCount < 1) {
        console.log('[useRegistrationProfileTypes] Retrying...');
        setTimeout(() => fetchTypes(retryCount + 1), 1000);
        return;
      }

      setError(err.message);
      // Ensure we always have something to show
      setTypes(FALLBACK_TYPES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return { types, loading, error, refetch: () => fetchTypes(0) };
};