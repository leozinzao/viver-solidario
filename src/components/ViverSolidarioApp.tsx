
import React from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import NavigationBar from "@/components/navigation/NavigationBar";
import ScreenRenderer from "@/components/screens/ScreenRenderer";
import PermissionDialog from "@/components/permissions/PermissionDialog";
import { UserRole, Permission, hasPermission } from '@/lib/permissions';

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

  return (
    <div className="flutter-app border border-border">
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
