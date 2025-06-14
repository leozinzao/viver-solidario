
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';

export const useProfileNavigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { navigateToScreen } = useNavigation();
  
  const goToProfile = () => {
    if (isAuthenticated) {
      navigateToScreen('profile');
    } else {
      navigateToScreen('login');
    }
  };
  
  const goToAdmin = () => {
    if (isAuthenticated) {
      navigateToScreen('admin-dashboard');
    } else {
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
    goToProfile,
    goToAdmin,
    handleLogout
  };
};

export default useProfileNavigation;
