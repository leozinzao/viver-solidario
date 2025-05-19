
import React from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import HeaderBar from "@/components/navigation/HeaderBar";
import NavigationBar from "@/components/navigation/NavigationBar";
import ScreenRenderer from "@/components/screens/ScreenRenderer";
import PermissionDialog from "@/components/permissions/PermissionDialog";

const AppContent: React.FC = () => {
  const { currentScreen, navigateToScreen, handleEnterApp, handleGoToLogin, handleGoToSignUp, 
    handleBackToWelcome, handleLoginSuccess, showPermissionDenied, setShowPermissionDenied } = useNavigation();
  const { isAuthenticated, user } = useAuth();
  
  // Verifica se deve mostrar a navegação - apenas para telas pós-login/visitante
  const shouldShowNavigation = 
    (isAuthenticated || currentScreen === "home") && 
    currentScreen !== "welcome" && 
    currentScreen !== "login" &&
    currentScreen !== "signup";

  // Verifica se o usuário é interno ou admin para mostrar botão de admin
  const isAdminUser = user?.role === 'admin' || user?.role === 'internal';

  return (
    <div className="flutter-app border border-border">
      {/* telas públicas e internas */}
      {(isAuthenticated || currentScreen === "home") && (
        <>
          {/* Barra superior com botão de login para visitantes ou admin para usuários avançados */}
          {shouldShowNavigation && (
            <HeaderBar
              isAuthenticated={isAuthenticated}
              isAdminUser={isAdminUser}
              onLogin={handleGoToLogin}
              onAdminNavigate={() => navigateToScreen("admin")}
            />
          )}
          
          {/* Renderizador de telas */}
          <ScreenRenderer
            currentScreen={currentScreen}
            onEnterApp={handleEnterApp}
            onGoToLogin={handleGoToLogin}
            onGoToSignUp={handleGoToSignUp}
            onBackToWelcome={handleBackToWelcome}
            onLoginSuccess={handleLoginSuccess}
          />

          {/* Bottom Navigation - Agora só aparece quando appropriado */}
          {shouldShowNavigation && (
            <NavigationBar
              currentScreen={currentScreen}
              onNavigate={navigateToScreen}
            />
          )}
        </>
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
