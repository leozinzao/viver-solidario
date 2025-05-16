
import { createClient } from "@supabase/supabase-js";

// Provide default values for development, these won't work for actual API calls
// but will prevent the app from crashing during development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON || 'placeholder-anon-key';

// For debugging
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
