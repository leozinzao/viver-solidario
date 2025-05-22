
import React, { useEffect } from "react";
import { Plus } from "@/components/icons";
import { Permission, hasPermission } from '@/lib/permissions';
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@/context/NavigationContext";

// Screens
import WelcomeScreen from "@/screens/WelcomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import DonationsScreen from "@/screens/DonationsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import VolunteerScreen from "@/screens/VolunteerScreen";
import EventsScreen from "@/screens/EventsScreen";
import ImpactScreen from "@/screens/ImpactScreen";
import AdminScreen from "@/screens/AdminScreen";

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

interface ScreenRendererProps {
  currentScreen: ScreenType;
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onGoToSignUp: () => void;
  onBackToWelcome: () => void;
  onLoginSuccess: () => void;
}

const ScreenRenderer: React.FC<ScreenRendererProps> = ({
  currentScreen,
  onEnterApp,
  onGoToLogin,
  onGoToSignUp,
  onBackToWelcome,
  onLoginSuccess,
}) => {
  const { isAuthenticated, user } = useAuth();
  const { navigateToScreen } = useNavigation();
  
  // Screens that require authentication
  const authenticatedScreens: ScreenType[] = ["profile", "admin", "impact"];
  
  // Screens that require specific permissions
  const permissionRequiredScreens: Record<ScreenType, Permission | null> = {
    admin: Permission.ACCESS_ADMIN_PANEL,
    impact: Permission.VIEW_ANALYTICS,
    profile: null,
    welcome: null,
    login: null,
    signup: null,
    home: null,
    donations: null,
    volunteer: null,
    events: null
  };
  
  // Redirect unauthenticated users or users without proper permissions
  useEffect(() => {
    // Skip redirect for auth-related screens
    if (["welcome", "login", "signup"].includes(currentScreen)) {
      return;
    }
    
    // Redirect unauthenticated users for protected screens
    if (authenticatedScreens.includes(currentScreen as ScreenType) && !isAuthenticated) {
      navigateToScreen("login");
      return;
    }
    
    // Redirect users without required permissions
    const requiredPermission = permissionRequiredScreens[currentScreen as ScreenType];
    if (
      requiredPermission && 
      isAuthenticated && 
      user && 
      !hasPermission(user.role as any, requiredPermission)
    ) {
      navigateToScreen("home");
      return;
    }
  }, [currentScreen, isAuthenticated, user, navigateToScreen]);
  
  // Check if current screen should be rendered based on authentication and permissions
  const shouldRenderScreen = (screen: ScreenType): boolean => {
    if (authenticatedScreens.includes(screen) && !isAuthenticated) {
      return false;
    }
    
    const requiredPermission = permissionRequiredScreens[screen];
    if (
      requiredPermission && 
      isAuthenticated && 
      user && 
      !hasPermission(user.role as any, requiredPermission)
    ) {
      return false;
    }
    
    return true;
  };

  return (
    <>
      {/* Public screens */}
      {currentScreen === "welcome" && (
        <WelcomeScreen 
          onEnterApp={onEnterApp} 
          onLogin={onGoToLogin} 
          onSignUp={onGoToSignUp}
        />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onBackToWelcome={onBackToWelcome}
          onLoginSuccess={onLoginSuccess}
        />
      )}
      
      {currentScreen === "signup" && (
        <SignUpScreen
          onBackToWelcome={onBackToWelcome}
          onSignUpSuccess={onLoginSuccess}
        />
      )}

      {/* Public accessible screens */}
      {currentScreen === "home" && <DashboardScreen />}
      {currentScreen === "donations" && <DonationsScreen />}
      {currentScreen === "events" && <EventsScreen />}
      {currentScreen === "volunteer" && <VolunteerScreen />}
      
      {/* Authenticated screens - only render if user is authenticated and has right permissions */}
      {currentScreen === "profile" && shouldRenderScreen("profile") && <ProfileScreen />}
      {currentScreen === "impact" && shouldRenderScreen("impact") && <ImpactScreen />}
      {currentScreen === "admin" && shouldRenderScreen("admin") && <AdminScreen />}

      {/* FAB exclusive for Events screen for users with event creation permission */}
      {currentScreen === "events" && isAuthenticated && 
        hasPermission(user?.role as any, Permission.CREATE_EVENT) && (
          <button
            className="fixed bottom-20 right-4 p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
            aria-label="Adicionar evento"
          >
            <Plus className="h-6 w-6" />
          </button>
        )
      }
    </>
  );
};

export default ScreenRenderer;
