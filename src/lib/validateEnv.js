/**
 * Validates that the required Supabase environment variables are present and correctly formatted.
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateEnv = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    return {
      isValid: false,
      error: 'VITE_SUPABASE_URL is missing from environment variables.',
    };
  }

  if (!supabaseAnonKey) {
    return {
      isValid: false,
      error: 'VITE_SUPABASE_ANON_KEY is missing from environment variables.',
    };
  }

  // Basic format validation for URL
  try {
    new URL(supabaseUrl);
  } catch (e) {
    return {
      isValid: false,
      error: `VITE_SUPABASE_URL is not a valid URL: ${supabaseUrl}`,
    };
  }

  // Check if URL is the dashboard URL instead of API URL (common mistake)
  if (supabaseUrl.includes('supabase.com/dashboard')) {
    return {
      isValid: false,
      error: 'VITE_SUPABASE_URL appears to be a dashboard URL. It should be the Project API URL (e.g., https://your-project-ref.supabase.co).',
    };
  }

  return { isValid: true, error: null };
};