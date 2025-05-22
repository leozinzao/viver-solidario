
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import { Permission, hasPermission } from '@/lib/permissions';

export const useProfileNavigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { navigateToScreen } = useNavigation();
  
  // Check if user has specific permissions
  const hasAnalyticsAccess = isAuthenticated && 
    user?.role && 
    hasPermission(user.role, Permission.VIEW_ANALYTICS);
  
  const hasAdminAccess = isAuthenticated && 
    user?.role && 
    hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL);
  
  // Navigation handlers
  const goToProfile = () => {
    if (isAuthenticated) {
      navigateToScreen('profile');
    } else {
      navigateToScreen('login');
    }
  };
  
  const goToImpact = () => {
    if (isAuthenticated && hasAnalyticsAccess) {
      navigateToScreen('impact');
    } else if (!isAuthenticated) {
      navigateToScreen('login');
    }
  };
  
  const goToAdmin = () => {
    if (isAuthenticated && hasAdminAccess) {
      navigateToScreen('admin');
    } else if (!isAuthenticated) {
      navigateToScreen('login');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigateToScreen('welcome');
  };
  
  return {
    isAuthenticated,
    user,
    hasAnalyticsAccess,
    hasAdminAccess,
    goToProfile,
    goToImpact,
    goToAdmin,
    handleLogout
  };
};

export default useProfileNavigation;
