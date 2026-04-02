import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evpbetmgmhwhhhgwvnfb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cGJldG1nbWh3aGhoZ3d2bmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NTk5NTYsImV4cCI6MjA4NTAzNTk1Nn0.hfOyt0P-LOQ-t6MNMMCmF9dzAedSf1HNhG3BI9aPQ8E';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
