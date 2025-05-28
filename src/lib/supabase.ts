import { createClient } from "@supabase/supabase-js";

// Use the correct environment variable names from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

// For debugging
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

// Validation to ensure both values exist
if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is required");
}

if (!supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_KEY is required");
}

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
