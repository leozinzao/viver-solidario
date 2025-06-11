
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ScreenType = 
  | 'welcome' 
  | 'login' 
  | 'signup' 
  | 'home' 
  | 'donations' 
  | 'doacoes-fisicas'
  | 'events' 
  | 'volunteer' 
  | 'profile' 
  | 'impact' 
  | 'admin'
  | 'historico-acoes'
  | 'configuracoes'
  | 'presentation';

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

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);

  console.log('NavigationProvider: Current screen:', currentScreen);

  const navigateToScreen = (screen: ScreenType) => {
    console.log('NavigationProvider: Navigating to:', screen);
    setCurrentScreen(screen);
  };

  const handleEnterApp = () => {
    console.log('NavigationProvider: Entering app');
    setCurrentScreen('home');
  };

  const handleGoToLogin = () => {
    console.log('NavigationProvider: Going to login');
    setCurrentScreen('login');
  };

  const handleGoToSignUp = () => {
    console.log('NavigationProvider: Going to signup');
    setCurrentScreen('signup');
  };

  const handleBackToWelcome = () => {
    console.log('NavigationProvider: Going back to welcome');
    setCurrentScreen('welcome');
  };

  const handleLoginSuccess = () => {
    console.log('NavigationProvider: Login successful, going to home');
    setCurrentScreen('home');
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        currentScreen, 
        navigateToScreen,
        handleEnterApp,
        handleGoToLogin,
        handleGoToSignUp,
        handleBackToWelcome,
        handleLoginSuccess,
        showPermissionDenied,
        setShowPermissionDenied
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
