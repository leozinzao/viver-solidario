
import React from "react";
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
  
  // If user tries to access the profile screen but is not authenticated,
  // redirect them to login
  React.useEffect(() => {
    if (currentScreen === "profile" && !isAuthenticated) {
      navigateToScreen("login");
    }
  }, [currentScreen, isAuthenticated, navigateToScreen]);
  
  // Screens that require authentication to be rendered
  const authenticatedScreens: ScreenType[] = ["profile", "admin"];
  
  // Check if current screen should be rendered based on authentication
  const shouldRenderScreen = (screen: ScreenType) => {
    if (authenticatedScreens.includes(screen)) {
      return isAuthenticated;
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
      
      {/* Authenticated screens - only render if user is authenticated */}
      {currentScreen === "profile" && shouldRenderScreen("profile") && <ProfileScreen />}
      {currentScreen === "impact" && <ImpactScreen />}
      {currentScreen === "admin" && shouldRenderScreen("admin") && <AdminScreen />}

      {/* FAB exclusivo para tela Eventos para usuários com permissão */}
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
