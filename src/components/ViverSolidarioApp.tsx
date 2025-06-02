
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import NavigationBar from "@/components/navigation/NavigationBar";
import ScreenRenderer from "@/components/screens/ScreenRenderer";
import PermissionDialog from "@/components/permissions/PermissionDialog";

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
  
  console.log('ViverSolidarioApp: Current screen:', currentScreen, 'Authenticated:', isAuthenticated);
  
  // Efeito para redirecionar usuário autenticado automaticamente
  useEffect(() => {
    if (isAuthenticated && (currentScreen === 'welcome' || currentScreen === 'login' || currentScreen === 'signup')) {
      console.log('ViverSolidarioApp: Usuário autenticado detectado, redirecionando para home');
      navigateToScreen('home');
    }
  }, [isAuthenticated, currentScreen, navigateToScreen]);
  
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
