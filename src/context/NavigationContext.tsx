import React, { createContext, useState, useCallback, useContext } from 'react';

interface NavigationContextProps {
  currentScreen: string;
  navigateToScreen: (screen: string) => void;
  handleEnterApp: () => void;
  handleGoToLogin: () => void;
  handleGoToSignUp: () => void;
  handleBackToWelcome: () => void;
  handleLoginSuccess: () => void;
  showPermissionDenied: boolean;
  setShowPermissionDenied: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);

  console.log('NavigationContext: Current screen:', currentScreen);

  const navigateToScreen = useCallback((screen: string) => {
    console.log('NavigationContext: Navegando para:', screen);
    setCurrentScreen(screen);
  }, []);

  const handleEnterApp = useCallback(() => {
    console.log('NavigationContext: Entrando no app');
    setCurrentScreen('home');
  }, []);

  const handleGoToLogin = useCallback(() => {
    console.log('NavigationContext: Indo para login');
    setCurrentScreen('login');
  }, []);

  const handleGoToSignUp = useCallback(() => {
    console.log('NavigationContext: Indo para signup');
    setCurrentScreen('signup');
  }, []);

  const handleBackToWelcome = useCallback(() => {
    console.log('NavigationContext: Voltando para welcome');
    setCurrentScreen('welcome');
  }, []);

  const handleLoginSuccess = useCallback(() => {
    console.log('NavigationContext: Login bem-sucedido, indo para home');
    setCurrentScreen('home');
  }, []);

  const value: NavigationContextProps = {
    currentScreen,
    navigateToScreen,
    handleEnterApp,
    handleGoToLogin,
    handleGoToSignUp,
    handleBackToWelcome,
    handleLoginSuccess,
    showPermissionDenied,
    setShowPermissionDenied,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextProps => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
