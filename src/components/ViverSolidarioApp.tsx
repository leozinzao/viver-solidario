
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Permission, hasPermission } from '@/lib/permissions';

// Screens
import WelcomeScreen from "@/screens/WelcomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import DonationsScreen from "@/screens/DonationsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import VolunteerScreen from "@/screens/VolunteerScreen";
import EventsScreen from "@/screens/EventsScreen";
import ImpactScreen from "@/screens/ImpactScreen";
import AdminScreen from "@/screens/AdminScreen";

// UI Components
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { LogIn, Settings, ShieldAlert } from "lucide-react";

// Icons
import {
  Home,
  Heart,
  User,
  Plus,
  Calendar,
  Handshake,
  Impact,
} from "@/components/icons";

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
  | "admin"; // New admin screen

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");
  const { isAuthenticated, user, logout } = useAuth();
  
  // Estado para exibir diálogo de permissão negada
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);
  const [attemptedScreen, setAttemptedScreen] = useState<ScreenType | null>(null);
  
  // Cria mapeamento de telas para permissões necessárias
  const screenPermissions: Partial<Record<ScreenType, Permission>> = {
    admin: Permission.ACCESS_ADMIN_PANEL,
    impact: Permission.VIEW_ANALYTICS
  };

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

  // -------- handlers de navegação ----------
  const handleEnterApp = () => navigateToScreen("home");
  const handleGoToLogin = () => navigateToScreen("login");
  const handleGoToSignUp = () => navigateToScreen("signup");
  const handleBackToWelcome = () => navigateToScreen("welcome");
  const handleLoginSuccess = () => navigateToScreen("home");

  // Função para navegar entre telas que pode ser chamada de qualquer lugar
  const navigateTo = (screen: ScreenType) => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { screen } 
    }));
  };

  // Expor função globalmente (para botões em outros componentes)
  useEffect(() => {
    (window as any).navigateTo = navigateTo;
  }, []);

  // redireciona anônimos para Welcome
  useEffect(() => {
    if (!isAuthenticated && 
        currentScreen !== "welcome" && 
        currentScreen !== "login" && 
        currentScreen !== "signup" &&
        currentScreen !== "home") {
      setCurrentScreen("welcome");
    }
  }, [isAuthenticated, currentScreen]);

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
      {/* telas públicas -------------------------------------------------- */}
      {currentScreen === "welcome" && (
        <WelcomeScreen 
          onEnterApp={handleEnterApp} 
          onLogin={handleGoToLogin} 
          onSignUp={handleGoToSignUp}
        />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onBackToWelcome={handleBackToWelcome}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {currentScreen === "signup" && (
        <SignUpScreen
          onBackToWelcome={handleBackToWelcome}
          onSignUpSuccess={handleLoginSuccess}
        />
      )}

      {/* telas internas -------------------------------------------------- */}
      {(isAuthenticated || currentScreen === "home") && (
        <>
          {/* Barra superior com botão de login para visitantes ou admin para usuários avançados */}
          {shouldShowNavigation && (
            <div className="w-full h-14 bg-white dark:bg-background border-b flex items-center justify-between px-4">
              {!isAuthenticated && (
                <div className="flex-1"></div> {/* Espaçador esquerdo */}
              )}
              
              <div className="flex-1 text-center">
                <h1 className="text-lg font-semibold text-viver-yellow">ONG Viver</h1>
              </div>
              
              <div className="flex-1 flex justify-end">
                {!isAuthenticated && (
                  <Button 
                    onClick={handleGoToLogin}
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 text-viver-yellow border-viver-yellow hover:bg-viver-yellow/10"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Entrar</span>
                  </Button>
                )}
                
                {isAuthenticated && isAdminUser && (
                  <Button 
                    onClick={() => navigateToScreen("admin")}
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    <span>Admin</span>
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Telas principais */}
          {currentScreen === "home" && <DashboardScreen />}
          {currentScreen === "donations" && <DonationsScreen />}
          {currentScreen === "events" && <EventsScreen />}
          {currentScreen === "volunteer" && <VolunteerScreen />}
          {currentScreen === "impact" && <ImpactScreen />}
          {currentScreen === "profile" && <ProfileScreen />}
          {currentScreen === "admin" && <AdminScreen />}

          {/* FAB exclusivo para tela Eventos para usuários com permissão */}
          {currentScreen === "events" && isAuthenticated && 
           hasPermission(user?.role as any, Permission.CREATE_EVENT) && (
            <button
              className="fixed bottom-20 right-4 p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
              aria-label="Adicionar evento"
            >
              <Plus className="h-6 w-6" />
            </button>
          )}

          {/* Bottom Navigation - Agora só aparece quando appropriado */}
          {shouldShowNavigation && (
            <div className="flutter-bottom-nav">
              {/* Início */}
              <button
                className={`nav-item ${currentScreen === "home" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => navigateToScreen("home")}
              >
                <Home className="h-6 w-6 mb-1" />
                <span>Início</span>
              </button>

              {/* Eventos */}
              <button
                className={`nav-item ${currentScreen === "events" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => navigateToScreen("events")}
              >
                <Calendar className="h-6 w-6 mb-1" />
                <span>Eventos</span>
              </button>

              {/* Doações */}
              <button
                className={`nav-item ${currentScreen === "donations" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => navigateToScreen("donations")}
              >
                <Heart className="h-6 w-6 mb-1" />
                <span>Doações</span>
              </button>

              {/* Voluntariado */}
              <button
                className={`nav-item ${currentScreen === "volunteer" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => navigateToScreen("volunteer")}
              >
                <Handshake className="h-6 w-6 mb-1" />
                <span>Voluntariado</span>
              </button>

              {/* Impacto (somente usuários internos) ou Perfil */}
              {hasPermission(user?.role as any, Permission.VIEW_ANALYTICS) ? (
                <button
                  className={`nav-item ${currentScreen === "impact" ? "text-viver-yellow" : "text-muted-foreground"}`}
                  onClick={() => navigateToScreen("impact")}
                >
                  <Impact className="h-6 w-6 mb-1" />
                  <span>Impacto</span>
                </button>
              ) : (
                <button
                  className={`nav-item ${currentScreen === "profile" ? "text-viver-yellow" : "text-muted-foreground"}`}
                  onClick={() => navigateToScreen("profile")}
                >
                  <User className="h-6 w-6 mb-1" />
                  <span>Perfil</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Diálogo de Permissão Negada */}
      <AlertDialog open={showPermissionDenied} onOpenChange={setShowPermissionDenied}>
        <AlertDialogContent>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <AlertDialogTitle>Acesso Negado</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Você não possui permissão para acessar esta área do aplicativo.
            Entre em contato com um administrador se você acredita que deveria ter acesso.
          </AlertDialogDescription>
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowPermissionDenied(false)}
              variant="outline"
            >
              Entendido
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ViverSolidarioApp: React.FC = () => (
  <AuthProvider>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </AuthProvider>
);

export default ViverSolidarioApp;
