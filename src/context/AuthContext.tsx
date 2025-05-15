
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

type UserRole = 'visitor' | 'donor' | 'volunteer' | 'internal';
type Theme = 'light' | 'dark';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  theme?: Theme;
}

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user data from localStorage on init
  useEffect(() => {
    const savedUser = localStorage.getItem('viverUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      
      // Apply theme from saved preferences
      if (parsedUser.theme) {
        if (parsedUser.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real implementation, this would make an API call
      // For this demo, we'll use mock data based on email
      
      let mockUser: User;
      
      // Determine the type of user based on email for demonstration
      if (email.includes('interno') || email.includes('admin')) {
        mockUser = {
          id: '1',
          name: 'Usuário Interno',
          email,
          role: 'internal',
          theme: 'light'
        };
      } else if (email.includes('voluntario')) {
        mockUser = {
          id: '2',
          name: 'Voluntário',
          email,
          role: 'volunteer',
          theme: 'light'
        };
      } else {
        mockUser = {
          id: '3',
          name: 'Doador',
          email,
          role: 'donor',
          theme: 'light'
        };
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('viverUser', JSON.stringify(mockUser));
      
      // Apply theme from user preferences
      if (mockUser.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('viverUser');
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
      if (!user) throw new Error('User not authenticated');
      
      // In a real implementation, this would make an API call
      // For this demo, we'll update the mock user directly
      const updatedUser = {
        ...user,
        name: data.name || user.name,
        email: data.email || user.email,
        theme: data.theme || user.theme
      };
      
      setUser(updatedUser);
      localStorage.setItem('viverUser', JSON.stringify(updatedUser));
      
      // Apply theme if it was updated
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
    } catch (error) {
      console.error('Failed to update profile:', error);
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
      if (!user) throw new Error('User not authenticated');
      
      // In a real implementation, this would make an API call
      // For this demo, we'll just simulate success
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso!"
      });
    } catch (error) {
      console.error('Failed to update password:', error);
      toast({
        title: "Erro ao atualizar senha",
        description: "Não foi possível atualizar sua senha.",
        variant: "destructive"
      });
      throw error;
    }
  };

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
