
import React from "react";
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
  
  console.log('ViverSolidarioApp - Current screen:', currentScreen, 'Authenticated:', isAuthenticated);
  
  // Telas públicas que mostram navegação mesmo para usuários não autenticados
  const publicScreensWithNavigation = ["home", "events", "donations", "volunteer"];
  
  // Telas de autenticação que não mostram navegação
  const authScreens = ["welcome", "login", "signup"];
  
  // Determinar se deve mostrar navegação
  const shouldShowNavigation = 
    (isAuthenticated || publicScreensWithNavigation.includes(currentScreen)) && 
    !authScreens.includes(currentScreen);

  return (
    <div className="flutter-app border border-border">
      {/* Conteúdo da tela */}
      <div className={`flutter-screen ${shouldShowNavigation ? 'pb-14' : ''}`}>
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

const ViverSolidarioApp: React.FC = () => (
  <AuthProvider>
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default ViverSolidarioApp;
