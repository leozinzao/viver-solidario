
import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import NavigationBar from "@/components/navigation/NavigationBar";
import ScreenRenderer from "@/components/screens/ScreenRenderer";
import PermissionDialog from "@/components/permissions/PermissionDialog";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import OfflineIndicator from "@/components/pwa/OfflineIndicator";
import { usePWA } from "@/hooks/usePWA";

const AppContent: React.FC = () => {
  const { 
    currentScreen, 
    navigateToScreen, 
    handleEnterApp, 
    handleGoToLogin, 
    handleGoToSignUp, 
    handleBackToWelcome, 
    handleLoginSuccess, 
    showPermissionDenied, 
    setShowPermissionDenied 
  } = useNavigation();
  
  const { isAuthenticated } = useAuth();
  const { isInstallable, isInstalled } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  console.log('ViverSolidarioApp: Current screen:', currentScreen, 'Authenticated:', isAuthenticated);
  
  // Efeito para redirecionar usuário autenticado automaticamente
  useEffect(() => {
    if (isAuthenticated && (currentScreen === 'welcome' || currentScreen === 'login' || currentScreen === 'signup')) {
      console.log('ViverSolidarioApp: Usuário autenticado detectado, redirecionando para home');
      navigateToScreen('home');
    }
  }, [isAuthenticated, currentScreen, navigateToScreen]);

  // Mostrar prompt de instalação após um tempo
  useEffect(() => {
    if (isInstallable && !isInstalled && isAuthenticated) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 30000); // 30 segundos

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, isAuthenticated]);
  
  // Telas públicas que mostram navegação mesmo para usuários não autenticados
  const publicScreensWithNavigation = ["home", "events", "donations", "volunteer"];
  
  // Telas de autenticação que não mostram navegação
  const authScreens = ["welcome", "login", "signup"];
  
  // Determinar se deve mostrar navegação
  const shouldShowNavigation = 
    (isAuthenticated || publicScreensWithNavigation.includes(currentScreen)) && 
    !authScreens.includes(currentScreen);

  return (
    <div className="flutter-app border border-border bg-white min-h-screen">
      {/* Indicador de status offline */}
      <OfflineIndicator />
      
      {/* Conteúdo da tela */}
      <div className={`flutter-screen ${shouldShowNavigation ? 'pb-20' : ''}`}>
        <ScreenRenderer
          currentScreen={currentScreen}
          onEnterApp={handleEnterApp}
          onGoToLogin={handleGoToLogin}
          onGoToSignUp={handleGoToSignUp}
          onBackToWelcome={handleBackToWelcome}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>

      {/* Barra de Navegação Inferior */}
      {shouldShowNavigation && (
        <NavigationBar
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
        />
      )}
      
      {/* Prompt de instalação PWA */}
      {showInstallPrompt && isInstallable && !isInstalled && (
        <InstallPrompt onDismiss={() => setShowInstallPrompt(false)} />
      )}
      
      {/* Diálogo de Permissão Negada */}
      <PermissionDialog
        open={showPermissionDenied}
        onOpenChange={setShowPermissionDenied}
      />
    </div>
  );
};

const ViverSolidarioApp: React.FC = () => {
  console.log('ViverSolidarioApp: Iniciando aplicação...');
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default ViverSolidarioApp;
