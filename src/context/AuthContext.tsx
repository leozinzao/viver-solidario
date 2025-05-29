
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '@/lib/permissions';
import { Theme } from '@/context/ThemeContext';
import { UserInfo, AuthContextType } from '@/types/auth';
import { checkUserRole, hasAdminAccess } from '@/services/adminService';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUserRole = async () => {
    if (!user) return;
    
    try {
      const role = await checkUserRole(user.id);
      if (role && role !== user.role) {
        setUser(prev => prev ? { ...prev, role } : null);
        console.log('Role do usuário atualizado:', role);
      }
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
    }
  };

  const checkAdminAccess = async (): Promise<boolean> => {
    if (!user) return false;
    return await hasAdminAccess(user.id);
  };

  // Função para criar/atualizar perfil do usuário
  const ensureUserProfile = async (authUser: User) => {
    try {
      console.log('Verificando perfil do usuário:', authUser.email);
      
      // Primeiro, verificar se o usuário já existe na tabela voluntarios
      const { data: existingProfile, error: fetchError } = await supabase
        .from('voluntarios')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil:', fetchError);
        throw fetchError;
      }

      let userProfile;

      if (!existingProfile) {
        // Usuário não existe, criar perfil
        console.log('Criando novo perfil para:', authUser.email);
        
        const newProfile = {
          id: authUser.id,
          nome: authUser.user_metadata?.full_name || 
                authUser.user_metadata?.nome || 
                authUser.email?.split('@')[0] || 'Usuário',
          email: authUser.email || '',
          role: determineRole(authUser.email || ''),
          theme: 'light' as Theme
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('voluntarios')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar perfil:', createError);
          throw createError;
        }

        userProfile = createdProfile;
        console.log('Perfil criado com sucesso:', userProfile);
      } else {
        userProfile = existingProfile;
        console.log('Perfil existente encontrado:', userProfile);
      }

      return {
        id: authUser.id,
        name: userProfile.nome || authUser.email?.split('@')[0] || 'Usuário',
        email: authUser.email || '',
        role: (userProfile.role as UserRole) || UserRole.donor,
        theme: (userProfile.theme as Theme) || 'light'
      };

    } catch (error) {
      console.error('Erro ao garantir perfil do usuário:', error);
      
      // Fallback: criar perfil básico mesmo com erro
      return {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || 
              authUser.user_metadata?.nome || 
              authUser.email?.split('@')[0] || 'Usuário',
        email: authUser.email || '',
        role: determineRole(authUser.email || ''),
        theme: 'light' as Theme
      };
    }
  };

  useEffect(() => {
    console.log('AuthContext: Inicializando...');
    
    // Configurar listener primeiro
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthContext: Auth state change:', event, session?.user?.email);
        
        try {
          if (session?.user) {
            // Garantir que o usuário tem perfil e buscar role real
            const userProfile = await ensureUserProfile(session.user);
            
            setUser(userProfile);
            setIsAuthenticated(true);
            console.log('AuthContext: Usuário autenticado com role:', userProfile);
            
            if (event === 'SIGNED_IN') {
              toast({
                title: "Login realizado com sucesso",
                description: `Bem-vindo, ${userProfile.name}!`
              });
            }
          } else {
            setUser(null);
            setIsAuthenticated(false);
            console.log('AuthContext: Usuário desconectado');
            
            if (event === 'SIGNED_OUT') {
              toast({
                title: "Logout realizado",
                description: "Você foi desconectado com sucesso."
              });
            }
          }
        } catch (error) {
          console.error('AuthContext: Erro no processamento de auth:', error);
          // Em caso de erro, ainda definir loading como false
          setUser(null);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      }
    );

    // Verificar sessão inicial
    const checkInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('AuthContext: Sessão inicial verificada:', session?.user?.email);
        // O onAuthStateChange vai processar isso
      } catch (error) {
        console.error('AuthContext: Erro ao verificar sessão inicial:', error);
        setLoading(false);
      }
    };

    checkInitialSession();

    return () => {
      console.log('AuthContext: Cleanup');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Tentando login:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('AuthContext: Erro no login:', error);
        throw new Error('Email ou senha incorretos');
      }
      
      console.log('AuthContext: Login bem-sucedido:', data.user?.email);
      // O onAuthStateChange vai processar o resto automaticamente
      
    } catch (error: any) {
      console.error('AuthContext: Falha no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext: Fazendo logout...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('AuthContext: Logout realizado com sucesso');
    } catch (error) {
      console.error('AuthContext: Erro ao fazer logout:', error);
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
      
      const updatedUser = {
        ...user,
        name: data.name || user.name,
        email: data.email || user.email,
        theme: data.theme || user.theme
      };
      
      setUser(updatedUser);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!"
      });
    } catch (error) {
      console.error('AuthContext: Falha ao atualizar perfil:', error);
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
      console.error('AuthContext: Falha ao atualizar senha:', error);
      throw error;
    }
  };

  console.log('AuthContext: Renderizando - loading:', loading, 'isAuthenticated:', isAuthenticated);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-viver-yellow mx-auto mb-2"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasPermission,
      updateUserProfile,
      updatePassword,
      checkAdminAccess,
      refreshUserRole
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
