
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

  // Cria mapeamento de telas para permissões necessárias
  const screenPermissions: Partial<Record<ScreenType, Permission>> = {
    admin: Permission.ACCESS_ADMIN_PANEL,
    impact: Permission.VIEW_ANALYTICS
  };

  // Define which screens require authentication
  const requiresAuthentication: ScreenType[] = [
    "profile",
    "admin"
  ];
  
  // Sistema de navegação entre telas
  useEffect(() => {
    // Event listener para gerenciar navegação interna
    const handleNavigate = (e: CustomEvent) => {
      if (e.detail && e.detail.screen) {
        navigateToScreen(e.detail.screen as ScreenType);
      }
    };

    // Registrar o evento personalizado
    window.addEventListener('navigate' as any, handleNavigate);
    
    return () => {
      window.removeEventListener('navigate' as any, handleNavigate);
    };
  }, [isAuthenticated, user]); // Re-attach quando autenticação ou usuário mudar

  // Função segura para navegação com verificação de permissões
  const navigateToScreen = (screen: ScreenType) => {
    // Verifica se a tela requer autenticação e o usuário não está autenticado
    if (requiresAuthentication.includes(screen) && !isAuthenticated) {
      setAttemptedScreen(screen);
      setCurrentScreen("login");
      return;
    }
    
    // Verifica se a tela requer permissão específica
    const requiredPermission = screenPermissions[screen];
    
    if (requiredPermission && user?.role) {
      // Verifica se o usuário tem a permissão para acessar essa tela
      const userCanAccess = hasPermission(user.role as any, requiredPermission);
      
      if (!userCanAccess) {
        // Se não tem permissão, salva a tela tentada e mostra diálogo
        setAttemptedScreen(screen);
        setShowPermissionDenied(true);
        return;
      }
    }
    
    // Se não precisa de permissão ou tem permissão, navega normalmente
    setCurrentScreen(screen);
  };

  // Função para navegar entre telas que pode ser chamada de qualquer lugar
  const navigateTo = (screen: ScreenType) => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { screen } 
    }));
  };

  // -------- handlers de navegação ----------
  const handleEnterApp = () => navigateToScreen("home");
  const handleGoToLogin = () => navigateToScreen("login");
  const handleGoToSignUp = () => navigateToScreen("signup");
  const handleBackToWelcome = () => navigateToScreen("welcome");
  const handleLoginSuccess = () => {
    // If user tried to access a specific screen before login, navigate there after login
    if (attemptedScreen) {
      const destination = attemptedScreen;
      setAttemptedScreen(null);
      navigateToScreen(destination);
    } else {
      // Default destination after login
      navigateToScreen("home");
    }
  };

  // Expor função globalmente (para botões em outros componentes)
  useEffect(() => {
    (window as any).navigateTo = navigateTo;
  }, []);

  // redireciona anônimos para Welcome apenas para algumas telas específicas
  useEffect(() => {
    if (!isAuthenticated && 
        requiresAuthentication.includes(currentScreen)) {
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
