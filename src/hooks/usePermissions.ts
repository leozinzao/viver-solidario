
import { useContext } from 'react';
import { UserRole } from '@/lib/permissions';
import { UserInfo } from '@/types/auth';
import AuthContext from '@/context/AuthContext';

export const usePermissions = () => {
  const { user } = useContext(AuthContext);
  
  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  return { hasPermission };
};
