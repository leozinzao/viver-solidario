
import React, { createContext } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AuthContextType } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useAuthPermissions } from '@/hooks/useAuthPermissions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, isAuthenticated, loading } = useAuthState();
  const authActions = useAuthActions(user, setUser);
  const { hasPermission } = useAuthPermissions(user);

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
      hasPermission,
      ...authActions
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
