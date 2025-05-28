
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '@/lib/permissions';
import { Theme } from '@/context/ThemeContext';
import { UserInfo, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const determineRole = (email: string): UserRole => {
  if (email.includes('interno') || email.includes('admin')) {
    return UserRole.internal;
  } else if (email.includes('voluntario')) {
    return UserRole.volunteer;
  }
  return UserRole.donor;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial user state
  useEffect(() => {
    // Subscribe to auth state changes first
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        setSession(session);
        setSupabaseUser(session?.user || null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchUserProfile(session.user);
          
          if (profile) {
            setUser(profile);
            setIsAuthenticated(true);
            localStorage.setItem('viverUser', JSON.stringify(profile));
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('viverUser');
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    const loadInitialState = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session) {
        const profile = await fetchUserProfile(sessionData.session.user);
        
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
          localStorage.setItem('viverUser', JSON.stringify(profile));
        }
      }
      
      setLoading(false);
    };

    loadInitialState();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (supabaseUser: User): Promise<UserInfo | null> => {
    try {
      // Primeiro tenta buscar na tabela voluntarios
      const { data: voluntarioData } = await supabase
        .from('voluntarios')
        .select('nome, email, telefone')
        .eq('id', supabaseUser.id)
        .single();
      
      if (voluntarioData) {
        return {
          id: supabaseUser.id,
          name: voluntarioData.nome || supabaseUser.user_metadata?.nome || supabaseUser.email || '',
          email: voluntarioData.email || supabaseUser.email || '',
          role: UserRole.volunteer,
          theme: 'light'
        };
      }
      
      // Se não encontrar, tenta buscar na tabela doadores
      const { data: doadorData } = await supabase
        .from('doadores')
        .select('nome, email, telefone')
        .eq('id', supabaseUser.id)
        .single();
      
      if (doadorData) {
        return {
          id: supabaseUser.id,
          name: doadorData.nome || supabaseUser.user_metadata?.nome || supabaseUser.email || '',
          email: doadorData.email || supabaseUser.email || '',
          role: UserRole.donor,
          theme: 'light'
        };
      }
      
      // Fallback caso não encontre em nenhuma tabela
      return {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.nome || supabaseUser.email || '',
        email: supabaseUser.email || '',
        role: determineRole(supabaseUser.email || ''),
        theme: 'light'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      // Fallback para dados do Supabase Auth
      return {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.nome || supabaseUser.email || '',
        email: supabaseUser.email || '',
        role: determineRole(supabaseUser.email || ''),
        theme: 'light'
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Tentando fazer login com email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Resposta do login:', { data, error });
      
      if (error) {
        console.error('Erro no login:', error);
        
        // Mensagens de erro mais específicas
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email ou senha incorretos. Verifique suas credenciais e tente novamente.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada e spam.');
        } else if (error.message.includes('Too many requests')) {
          throw new Error('Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.');
        } else if (error.message.includes('signup_disabled')) {
          throw new Error('O cadastro está temporariamente desabilitado. Tente novamente mais tarde.');
        } else {
          throw new Error(error.message);
        }
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        console.log('Email não confirmado para o usuário:', data.user.email);
        throw new Error('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada e spam.');
      }
      
      if (data.user) {
        console.log('Login bem-sucedido, buscando perfil...');
        const profile = await fetchUserProfile(data.user);
        
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
          localStorage.setItem('viverUser', JSON.stringify(profile));
          
          toast({
            title: "Login realizado com sucesso",
            description: `Bem-vindo, ${profile.name}!`
          });
        }
      }
    } catch (error: any) {
      console.error('Falha no login:', error);
      toast({
        title: "Erro de login",
        description: error.message || "Email ou senha inválidos",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('viverUser');
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: "Erro ao desconectar",
        description: "Houve um problema ao fazer logout.",
        variant: "destructive"
      });
    }
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  const updateUserProfile = async (data: { name?: string; email?: string; theme?: Theme }) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      // Atualizar no Supabase Auth se necessário
      if (data.email && data.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: data.email,
        });
        if (error) throw error;
      }
      
      // Atualizar na tabela apropriada
      const tableName = user.role === UserRole.volunteer ? 'voluntarios' : 'doadores';
      
      const { error } = await supabase
        .from(tableName)
        .update({
          nome: data.name,
          email: data.email,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      const updatedUser = {
        ...user,
        name: data.name || user.name,
        email: data.email || user.email,
        theme: data.theme || user.theme
      };
      
      setUser(updatedUser);
      localStorage.setItem('viverUser', JSON.stringify(updatedUser));
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!"
      });
    } catch (error) {
      console.error('Falha ao atualizar perfil:', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar suas informações.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso!"
      });
    } catch (error) {
      console.error('Falha ao atualizar senha:', error);
      toast({
        title: "Erro ao atualizar senha",
        description: "Não foi possível atualizar sua senha.",
        variant: "destructive"
      });
      throw error;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasPermission,
      updateUserProfile,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
