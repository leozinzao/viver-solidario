
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, supabaseAuth } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '@/lib/permissions';
import { Theme } from '@/context/ThemeContext';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  theme?: Theme;
}

interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  updateUserProfile: (data: { name?: string; email?: string; theme?: Theme }) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega os dados do usuário do localStorage na inicialização
  useEffect(() => {
    const loadInitialState = async () => {
      // Verifica sessão existente no Supabase
      const { data: sessionData } = await supabaseAuth.getCurrentSession();
      
      if (sessionData?.session) {
        setSession(sessionData.session);
        const { data: userData } = await supabaseAuth.getCurrentUser();
        setSupabaseUser(userData.user);
        
        // Busca mais dados do usuário do banco (role, theme, etc)
        try {
          const { data: profile } = await supabase
            .from('voluntarios')
            .select('nome, email, role, theme')
            .eq('id', userData.user?.id)
            .single();
          
          if (profile) {
            const userInfo: UserInfo = {
              id: userData.user?.id || '',
              name: profile.nome || userData.user?.user_metadata?.name || '',
              email: profile.email || userData.user?.email || '',
              role: (profile.role as UserRole) || UserRole.donor,
              theme: (profile.theme as Theme) || 'light'
            };
            
            setUser(userInfo);
            setIsAuthenticated(true);
            
            // Aplica o tema das preferências salvas
            if (userInfo.theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        } catch (error) {
          console.error('Erro ao buscar perfil do usuário:', error);
        }
      } else {
        // Fallback: Tenta carregar do localStorage para compatibilidade
        const savedUser = localStorage.getItem('viverUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          if (parsedUser.theme) {
            if (parsedUser.theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      }
      
      setLoading(false);
    };

    // Inscreve-se para mudanças de estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setSupabaseUser(session?.user || null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const { data: profile } = await supabase
              .from('voluntarios')
              .select('nome, email, role, theme')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              const userInfo: UserInfo = {
                id: session.user?.id || '',
                name: profile.nome || session.user?.user_metadata?.name || '',
                email: profile.email || session.user?.email || '',
                role: (profile.role as UserRole) || UserRole.donor,
                theme: (profile.theme as Theme) || 'light'
              };
              
              setUser(userInfo);
              setIsAuthenticated(true);
              localStorage.setItem('viverUser', JSON.stringify(userInfo));
              
              // Aplica tema das preferências do usuário
              if (userInfo.theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
          } catch (error) {
            console.error('Erro ao buscar perfil do usuário após login:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('viverUser');
        }
      }
    );

    loadInitialState();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Tenta fazer login no Supabase
      const { data, error } = await supabaseAuth.signIn(email, password);
      
      if (error) throw error;
      
      if (data.user) {
        try {
          const { data: profile } = await supabase
            .from('voluntarios')
            .select('nome, email, role, theme')
            .eq('id', data.user.id)
            .single();
          
          if (profile) {
            const userInfo: UserInfo = {
              id: data.user.id,
              name: profile.nome || data.user.user_metadata?.name || '',
              email: profile.email || data.user.email || '',
              role: (profile.role as UserRole) || UserRole.donor,
              theme: (profile.theme as Theme) || 'light'
            };
            
            setUser(userInfo);
            setIsAuthenticated(true);
            localStorage.setItem('viverUser', JSON.stringify(userInfo));
            
            // Aplica tema das preferências do usuário
            if (userInfo.theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            
            toast({
              title: "Login realizado com sucesso",
              description: `Bem-vindo, ${userInfo.name}!`
            });
            
            return;
          }
        } catch (dbError) {
          console.error('Erro ao buscar perfil:', dbError);
        }
        
        // Fallback para dados básicos se o perfil não for encontrado
        const userInfo: UserInfo = {
          id: data.user.id,
          name: data.user.user_metadata?.name || '',
          email: data.user.email || '',
          role: determineRole(email),
          theme: 'light'
        };
        
        setUser(userInfo);
        setIsAuthenticated(true);
        localStorage.setItem('viverUser', JSON.stringify(userInfo));
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo!`
        });
      }
    } catch (error) {
      console.error('Falha no login:', error);
      toast({
        title: "Erro de login",
        description: "Email ou senha inválidos",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabaseAuth.signOut();
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
      
      // Atualiza no Supabase
      if (data.email && data.email !== user.email) {
        // Atualize o email no Supabase Auth
        const { error: authUpdateError } = await supabase.auth.updateUser({
          email: data.email,
        });
        
        if (authUpdateError) throw authUpdateError;
      }
      
      // Atualiza na tabela de perfil
      const { data: updateData, error: updateError } = await supabase
        .from('voluntarios')
        .update({
          nome: data.name || user.name,
          email: data.email || user.email,
          theme: data.theme || user.theme,
        })
        .eq('id', user.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      
      if (updateData) {
        const updatedUser = {
          ...user,
          name: data.name || user.name,
          email: data.email || user.email,
          theme: data.theme || user.theme
        };
        
        setUser(updatedUser);
        localStorage.setItem('viverUser', JSON.stringify(updatedUser));
        
        // Aplica tema se foi atualizado
        if (data.theme) {
          if (data.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram atualizadas com sucesso!"
        });
      }
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
      
      // Primeiro reautentica com a senha atual
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      
      if (signInError) {
        toast({
          title: "Erro de autenticação",
          description: "Senha atual incorreta",
          variant: "destructive"
        });
        throw signInError;
      }
      
      // Atualiza a senha
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (updateError) throw updateError;
      
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

  // Função auxiliar para determinar o papel do usuário com base no email
  const determineRole = (email: string): UserRole => {
    if (email.includes('interno') || email.includes('admin')) {
      return UserRole.internal;
    } else if (email.includes('voluntario')) {
      return UserRole.volunteer;
    }
    return UserRole.donor;
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

export default AuthContext;
