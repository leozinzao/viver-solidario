
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
  
  // Public screens that show navigation even for unauthenticated users
  const publicScreensWithNavigation = ["home", "events", "donations", "volunteer"];
  
  // Authentication screens that don't show navigation
  const authScreens = ["welcome", "login", "signup"];
  
  // Determine whether to show navigation
  const shouldShowNavigation = 
    (isAuthenticated || publicScreensWithNavigation.includes(currentScreen)) && 
    !authScreens.includes(currentScreen);

  // Check if user has admin access
  const hasAdminAccess = user && hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL);
  
  // Show header only for authenticated admin users outside of auth screens
  const shouldShowHeader = isAuthenticated && 
                          hasAdminAccess && 
                          !authScreens.includes(currentScreen);

  return (
    <div className="flutter-app border border-border">
      {/* Header bar for admin users */}
      {shouldShowHeader && (
        <HeaderBar
          isAuthenticated={isAuthenticated}
          isAdminUser={hasAdminAccess}
          onLogin={handleGoToLogin}
          onAdminNavigate={() => navigateToScreen("admin")}
        />
      )}
      
      {/* Screen content */}
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

      {/* Bottom Navigation */}
      {shouldShowNavigation && (
        <NavigationBar
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
        />
      )}
      
      {/* Permission Denied Dialog */}
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
