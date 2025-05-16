
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

import WelcomeScreen   from "@/screens/WelcomeScreen";
import LoginScreen     from "@/screens/LoginScreen";
import SignUpScreen    from "@/screens/SignUpScreen"; // Nova tela de cadastro
import DashboardScreen from "@/screens/DashboardScreen";
import DonationsScreen from "@/screens/DonationsScreen";
import ProfileScreen   from "@/screens/ProfileScreen";
import VolunteerScreen from "@/screens/VolunteerScreen";
import EventsScreen    from "@/screens/EventsScreen";
import ImpactScreen    from "@/screens/ImpactScreen";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

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
  | "signup" // Nova tela de cadastro
  | "home"
  | "donations"
  | "profile"
  | "volunteer"
  | "events"
  | "impact";

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");
  const { isAuthenticated, hasPermission, logout } = useAuth();

  // Sistema de navegação entre telas
  useEffect(() => {
    // Event listener para gerenciar navegação interna
    const handleNavigate = (e: CustomEvent) => {
      if (e.detail && e.detail.screen) {
        setCurrentScreen(e.detail.screen as ScreenType);
      }
    };

    // Registrar o evento personalizado
    window.addEventListener('navigate' as any, handleNavigate);
    
    return () => {
      window.removeEventListener('navigate' as any, handleNavigate);
    };
  }, []);

  // -------- handlers de navegação ----------
  const handleEnterApp = () => setCurrentScreen("home");
  const handleGoToLogin = () => setCurrentScreen("login");
  const handleGoToSignUp = () => setCurrentScreen("signup"); // Novo handler
  const handleBackToWelcome = () => setCurrentScreen("welcome");
  const handleLoginSuccess = () => setCurrentScreen("home");

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
  if (!isAuthenticated && currentScreen !== "welcome" && currentScreen !== "login" && currentScreen !== "signup") {
    setCurrentScreen("welcome");
  }

  // Verifica se deve mostrar a navegação - apenas para telas pós-login/visitante
  const shouldShowNavigation = isAuthenticated || 
                              (currentScreen !== "welcome" && 
                               currentScreen !== "login" &&
                               currentScreen !== "signup");

  return (
    <div className="flutter-app border border-border">
      {/* telas públicas -------------------------------------------------- */}
      {currentScreen === "welcome" && (
        <WelcomeScreen 
          onEnterApp={handleEnterApp} 
          onLogin={handleGoToLogin} 
          onSignUp={handleGoToSignUp} // Nova prop
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
          {/* Barra superior com botão de login para visitantes */}
          {!isAuthenticated && currentScreen === "home" && (
            <div className="w-full h-14 bg-white dark:bg-background border-b flex items-center justify-end px-4">
              <Button 
                onClick={handleGoToLogin}
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 text-viver-yellow border-viver-yellow hover:bg-viver-yellow/10"
              >
                <LogIn className="h-4 w-4" />
                <span>Entrar</span>
              </Button>
            </div>
          )}
          
          {currentScreen === "home" && (
            <DashboardScreen />
          )}
          {currentScreen === "donations" && <DonationsScreen />}
          {currentScreen === "events" && <EventsScreen />}
          {currentScreen === "volunteer" && <VolunteerScreen />}
          {currentScreen === "impact" && <ImpactScreen />}
          {currentScreen === "profile" && <ProfileScreen />}

          {/* FAB exclusivo para tela Eventos para usuários com permissão */}
          {currentScreen === "events" && hasPermission("internal") && (
            <button
              className="fixed bottom-20 right-4 p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
              aria-label="Adicionar evento"
            >
              <Plus className="h-6 w-6" />
            </button>
          )}

          {/* Bottom Navigation - Agora só aparece quando appropriado */}
          {shouldShowNavigation && currentScreen !== "welcome" && currentScreen !== "login" && currentScreen !== "signup" && (
            <div className="flutter-bottom-nav">
              {/* Início */}
              <button
                className={`nav-item ${currentScreen === "home" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => setCurrentScreen("home")}
              >
                <Home className="h-6 w-6 mb-1" />
                <span>Início</span>
              </button>

              {/* Eventos (nova aba) */}
              <button
                className={`nav-item ${currentScreen === "events" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => setCurrentScreen("events")}
              >
                <Calendar className="h-6 w-6 mb-1" />
                <span>Eventos</span>
              </button>

              {/* Doações */}
              <button
                className={`nav-item ${currentScreen === "donations" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => setCurrentScreen("donations")}
              >
                <Heart className="h-6 w-6 mb-1" />
                <span>Doações</span>
              </button>

              {/* Voluntariado */}
              <button
                className={`nav-item ${currentScreen === "volunteer" ? "text-viver-yellow" : "text-muted-foreground"}`}
                onClick={() => setCurrentScreen("volunteer")}
              >
                <Handshake className="h-6 w-6 mb-1" />
                <span>Voluntariado</span>
              </button>

              {/* Impacto (somente usuários internos) ou Perfil */}
              {hasPermission("internal") ? (
                <button
                  className={`nav-item ${currentScreen === "impact" ? "text-viver-yellow" : "text-muted-foreground"}`}
                  onClick={() => setCurrentScreen("impact")}
                >
                  <Impact className="h-6 w-6 mb-1" />
                  <span>Impacto</span>
                </button>
              ) : (
                <button
                  className={`nav-item ${currentScreen === "profile" ? "text-viver-yellow" : "text-muted-foreground"}`}
                  onClick={() => setCurrentScreen("profile")}
                >
                  <User className="h-6 w-6 mb-1" />
                  <span>Perfil</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
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
