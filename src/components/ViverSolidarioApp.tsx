
import React from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import HeaderBar from "@/components/navigation/HeaderBar";
import NavigationBar from "@/components/navigation/NavigationBar";
import ScreenRenderer from "@/components/screens/ScreenRenderer";
import PermissionDialog from "@/components/permissions/PermissionDialog";
import { UserRole, Permission, hasPermission } from "@/lib/permissions";

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

  // Verifica se o usuário tem acesso ao painel admin
  const hasAdminAccess = user && hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL);
  
  // Verifica se deve mostrar o header - SOMENTE para usuários autenticados com permissão de admin
  const shouldShowHeader = isAuthenticated && hasAdminAccess;

  return (
    <div className="flutter-app border border-border">
      {/* telas públicas e internas */}
      {(isAuthenticated || currentScreen === "home") && (
        <>
          {/* Barra superior apenas para usuários com acesso admin */}
          {shouldShowHeader && (
            <HeaderBar
              isAuthenticated={isAuthenticated}
              isAdminUser={hasAdminAccess}
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
