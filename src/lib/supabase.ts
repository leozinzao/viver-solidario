import { createClient } from "@supabase/supabase-js";

// Use the Supabase project configuration directly
const supabaseUrl = "https://pwqhjgobwnzyegvqmpdm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cWhqZ29id256eWVndnFtcGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NzI2MjAsImV4cCI6MjA2MjE0ODYyMH0.C2S1JiAFBL3X7b8UoeCGpdU9UVEocbHKRZIMwFvi4EQ";

// For debugging
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

// Criação do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções auxiliares para operações comuns do Supabase
export const supabaseAuth = {
  signUp: async (email: string, password: string, data?: Record<string, any>) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: data ? { data } : undefined
    });
  },
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },
  getCurrentSession: async () => {
    return await supabase.auth.getSession();
  }
};

// Função para verificar o status da conexão com o Supabase
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('voluntarios').select('count', { count: 'exact', head: true });
    return { connected: !error, error: error ? error.message : null };
  } catch (err) {
    return { connected: false, error: err instanceof Error ? err.message : 'Erro desconhecido' };
  }
};
