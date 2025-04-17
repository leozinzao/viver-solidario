
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'visitor' | 'donor' | 'volunteer' | 'internal';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
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

  // Simulação de verificação de autenticação ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('viverUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de autenticação
    // Em um caso real, isso seria uma chamada à API
    
    let mockUser: User;
    
    // Determinar o tipo de usuário com base no email para demonstração
    if (email.includes('interno') || email.includes('admin')) {
      mockUser = {
        id: '1',
        name: 'Usuário Interno',
        email,
        role: 'internal'
      };
    } else if (email.includes('voluntario')) {
      mockUser = {
        id: '2',
        name: 'Voluntário',
        email,
        role: 'volunteer'
      };
    } else {
      mockUser = {
        id: '3',
        name: 'Doador',
        email,
        role: 'donor'
      };
    }
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('viverUser', JSON.stringify(mockUser));
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
