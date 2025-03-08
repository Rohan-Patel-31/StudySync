import { createClient } from '@supabase/supabase-js';

// These environment variables will be set after clicking "Connect to Supabase"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Please click "Connect to Supabase" button to set up your project.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);