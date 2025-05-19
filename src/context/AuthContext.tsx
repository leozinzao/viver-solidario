
import React, { createContext, useState, useEffect } from 'react';
import { supabase, supabaseAuth } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '@/lib/permissions';
import { Theme } from '@/context/ThemeContext';
import { UserInfo, AuthContextType } from '@/types/auth';
import { 
  determineRole, 
  fetchUserProfile, 
  loginUser, 
  logoutUser, 
  updateProfile, 
  updateUserPassword,
  applyTheme 
} from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial user state
  useEffect(() => {
    const loadInitialState = async () => {
      // Check existing Supabase session
      const { data: sessionData } = await supabaseAuth.getCurrentSession();
      
      if (sessionData?.session) {
        setSession(sessionData.session);
        const { data: userData } = await supabaseAuth.getCurrentUser();
        setSupabaseUser(userData.user);
        
        if (userData.user) {
          const profile = await fetchUserProfile(userData.user.id);
          
          if (profile) {
            setUser(profile);
            setIsAuthenticated(true);
            
            // Apply theme from user preferences
            applyTheme(profile.theme || 'light');
          }
        }
      } else {
        // Fallback: Try loading from localStorage for compatibility
        const savedUser = localStorage.getItem('viverUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          if (parsedUser.theme) {
            applyTheme(parsedUser.theme);
          }
        }
      }
      
      setLoading(false);
    };

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setSupabaseUser(session?.user || null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          
          if (profile) {
            setUser(profile);
            setIsAuthenticated(true);
            localStorage.setItem('viverUser', JSON.stringify(profile));
            
            // Apply user theme preference
            applyTheme(profile.theme || 'light');
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
      
      // Try to login with Supabase
      const { data, error } = await loginUser(email, password);
      
      if (error) throw error;
      
      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
          localStorage.setItem('viverUser', JSON.stringify(profile));
          
          // Apply user theme preference
          applyTheme(profile.theme || 'light');
          
          toast({
            title: "Login realizado com sucesso",
            description: `Bem-vindo, ${profile.name}!`
          });
          
          return;
        }
        
        // Fallback if profile not found
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
      await logoutUser();
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
      
      const updatedData = await updateProfile(user.id, data);
      
      if (updatedData) {
        const updatedUser = {
          ...user,
          name: data.name || user.name,
          email: data.email || user.email,
          theme: data.theme || user.theme
        };
        
        setUser(updatedUser);
        localStorage.setItem('viverUser', JSON.stringify(updatedUser));
        
        // Apply theme if updated
        if (data.theme) {
          applyTheme(data.theme);
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
      
      await updateUserPassword(user.email, currentPassword, newPassword);
      
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
