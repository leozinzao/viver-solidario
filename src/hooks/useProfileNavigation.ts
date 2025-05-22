
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import { Permission } from '@/lib/permissions';

export const useProfileNavigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { navigateToScreen } = useNavigation();
  
  // Check if user has specific permissions - simplified logic
  const hasAnalyticsAccess = isAuthenticated && 
    user?.role && 
    (user.role === 'internal' || user.role === 'admin');
  
  const hasAdminAccess = isAuthenticated && 
    user?.role && 
    (user.role === 'internal' || user.role === 'admin');
  
  // Navigation handlers with simplified logic
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
