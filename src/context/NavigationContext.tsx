
import React, { createContext, useContext, useState, useEffect } from "react";
import { Permission, hasPermission } from '@/lib/permissions';
import { useAuth } from "@/context/AuthContext";

type ScreenType =
  | "welcome"
  | "login"
  | "signup"
  | "home"
  | "donations"
  | "profile"
  | "volunteer"
  | "events"
  | "impact"
  | "admin";

interface NavigationContextType {
  currentScreen: ScreenType;
  navigateToScreen: (screen: ScreenType) => void;
  handleEnterApp: () => void;
  handleGoToLogin: () => void;
  handleGoToSignUp: () => void;
  handleBackToWelcome: () => void;
  handleLoginSuccess: () => void;
  showPermissionDenied: boolean;
  setShowPermissionDenied: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);
  const [attemptedScreen, setAttemptedScreen] = useState<ScreenType | null>(null);
  const { isAuthenticated, user } = useAuth();

  // Screen permission configuration
  const screenPermissions: Partial<Record<ScreenType, Permission>> = {
    admin: Permission.ACCESS_ADMIN_PANEL,
    impact: Permission.VIEW_ANALYTICS
  };

  // Screens that require authentication
  const requiresAuthentication: ScreenType[] = [
    "profile",
    "admin"
  ];
  
  // Public screens that show navigation even for unauthenticated users
  const publicScreensWithNavigation: ScreenType[] = [
    "home",
    "events",
    "donations",
    "volunteer"
  ];
  
  // Navigation event listener
  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      if (e.detail && e.detail.screen) {
        navigateToScreen(e.detail.screen as ScreenType);
      }
    };

    window.addEventListener('navigate' as any, handleNavigate);
    
    return () => {
      window.removeEventListener('navigate' as any, handleNavigate);
    };
  }, [isAuthenticated, user]);

  // Safe navigation with permission checking
  const navigateToScreen = (screen: ScreenType) => {
    // Check if screen requires authentication
    if (requiresAuthentication.includes(screen) && !isAuthenticated) {
      setAttemptedScreen(screen);
      setCurrentScreen("login");
      return;
    }
    
    // Check for required permissions
    const requiredPermission = screenPermissions[screen];
    
    if (requiredPermission && user?.role) {
      const userCanAccess = hasPermission(user.role as any, requiredPermission);
      
      if (!userCanAccess) {
        setAttemptedScreen(screen);
        setShowPermissionDenied(true);
        return;
      }
    }
    
    // Navigate to screen if all checks passed
    setCurrentScreen(screen);
  };

  // Global navigation function
  const navigateTo = (screen: ScreenType) => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { screen } 
    }));
  };

  // Navigation handlers
  const handleEnterApp = () => navigateToScreen("home");
  const handleGoToLogin = () => navigateToScreen("login");
  const handleGoToSignUp = () => navigateToScreen("signup");
  const handleBackToWelcome = () => navigateToScreen("welcome");
  
  // Handle post-login navigation
  const handleLoginSuccess = () => {
    if (attemptedScreen) {
      const destination = attemptedScreen;
      setAttemptedScreen(null);
      navigateToScreen(destination);
    } else {
      navigateToScreen("home");
    }
  };

  // Expose navigation globally
  useEffect(() => {
    (window as any).navigateTo = navigateTo;
  }, []);

  // Redirect unauthenticated users from restricted screens
  useEffect(() => {
    if (!isAuthenticated && requiresAuthentication.includes(currentScreen)) {
      setCurrentScreen("login");
    }
  }, [isAuthenticated, currentScreen]);

  return (
    <NavigationContext.Provider value={{
      currentScreen,
      navigateToScreen,
      handleEnterApp,
      handleGoToLogin,
      handleGoToSignUp,
      handleBackToWelcome,
      handleLoginSuccess,
      showPermissionDenied,
      setShowPermissionDenied
    }}>
      {children}
    </NavigationContext.Provider>
  );
};
