
import { UserInfo } from '@/types/auth';
import { UserRole } from '@/lib/permissions';

export const useAuthPermissions = (user: UserInfo | null) => {
  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  return {
    hasPermission
  };
};
