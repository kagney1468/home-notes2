import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side client (uses anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface SavedReport {
  id: string;
  user_email: string;
  address: string;
  postcode: string;
  report_data: object;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}
