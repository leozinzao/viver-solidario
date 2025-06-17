
import React, { createContext, useContext, useState } from "react";

type ScreenType =
  | "welcome"
  | "login"
  | "signup"
  | "home"
  | "donations"
  | "doacoes-fisicas"
  | "profile"
  | "volunteer"
  | "events"
  | "impact"
  | "admin-dashboard"
  | "admin-doacoes"
  | "admin-usuarios"
  | "admin-depoimentos"
  | "admin-eventos"
  | "admin-configuracoes"
  | "admin-notificacoes"
  | "historico-acoes"
  | "configuracoes";

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

  // Simple navigation without permission checks here
  const navigateToScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // Navigation handlers
  const handleEnterApp = () => navigateToScreen("home");
  const handleGoToLogin = () => navigateToScreen("login");
  const handleGoToSignUp = () => navigateToScreen("signup");
  const handleBackToWelcome = () => navigateToScreen("welcome");
  const handleLoginSuccess = () => navigateToScreen("home");

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
