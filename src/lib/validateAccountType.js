import { supabase } from '@/lib/customSupabaseClient';

/**
 * Validates if an account type exists in the database.
 * 
 * @param {string} slug - The account type slug to validate
 * @returns {Promise<{isValid: boolean, error?: string, details?: any}>}
 */
export async function validateAccountType(slug) {
  if (!slug) {
    return { isValid: false, error: "No account type slug provided" };
  }

  try {
    console.log(`[validateAccountType] Validating slug: ${slug}`);
    
    // Check against account_types table which is the source of truth for the FK
    const { data, error } = await supabase
      .from('account_types')
      .select('slug, title')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('[validateAccountType] Database error:', error);
      return { isValid: false, error: error.message };
    }

    if (!data) {
      console.warn(`[validateAccountType] Slug '${slug}' not found in active account_types.`);
      return { isValid: false, error: "Account type not found or inactive" };
    }

    console.log('[validateAccountType] Validation successful:', data);
    return { isValid: true, details: data };
  } catch (err) {
    console.error('[validateAccountType] Unexpected error:', err);
    return { isValid: false, error: err.message || "Unknown validation error" };
  }
}