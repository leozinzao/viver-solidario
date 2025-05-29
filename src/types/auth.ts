
import { Theme } from '@/context/ThemeContext';
import { UserRole } from '@/lib/permissions';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  theme?: Theme;
}

export interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  updateUserProfile: (data: { name?: string; email?: string; theme?: Theme }) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  checkAdminAccess: () => Promise<boolean>;
  refreshUserRole: () => Promise<void>;
}
