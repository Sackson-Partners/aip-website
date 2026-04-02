import { createClient } from '@supabase/supabase-js';
import { validateEnv } from './validateEnv';

const validation = validateEnv();

if (!validation.isValid) {
  console.error('Supabase Configuration Error:', validation.error);
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize client even if validation fails to prevent immediate crash on import
// but functionality will likely fail if env vars are missing.
// We use fallbacks only to allow the ConfigurationValidator to render the error.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      flowType: 'implicit',
    }
  }
);