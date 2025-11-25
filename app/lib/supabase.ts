import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// For client-side or public API routes
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// For server-side only (admin API routes)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
