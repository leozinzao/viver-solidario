import { createClient } from "@supabase/supabase-js";

// Fornecer valores padrão para desenvolvimento, estes não funcionarão para chamadas reais da API
// mas impedirão que o aplicativo trave durante o desenvolvimento
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON || 'placeholder-anon-key';

// Para depuração
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

// Criação do cliente Supabase com opções específicas
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    // A propriedade 'enabled' não existe em RealtimeClientOptions
    // Removemos essa opção para resolver o erro
  }
});

// Funções auxiliares para operações comuns do Supabase
export const supabaseAuth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
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
