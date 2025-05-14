import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import WelcomeScreen   from "@/screens/WelcomeScreen";
import LoginScreen     from "@/screens/LoginScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import DonationsScreen from "@/screens/DonationsScreen";
import ProfileScreen   from "@/screens/ProfileScreen";
import VolunteerScreen from "@/screens/VolunteerScreen";
import EventsScreen    from "@/screens/EventsScreen";
import ImpactScreen    from "@/screens/ImpactScreen";

import {
  Home,
  Heart,
  User,
  Plus,
  Calendar,      // ícone da nova aba
  Handshake,
  Impact,
} from "@/components/icons";

type ScreenType =
  | "welcome"
  | "login"
  | "home"
  | "donations"
  | "profile"
  | "volunteer"
  | "events"
  | "impact";

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");
  const { isAuthenticated, hasPermission } = useAuth();

  // -------- handlers de navegação ----------
  const handleEnterApp     = () => setCurrentScreen("home");
  const handleGoToLogin    = () => setCurrentScreen("login");
  const handleBackToWelcome= () => setCurrentScreen("welcome");
  const handleLoginSuccess = () => setCurrentScreen("home");

  // redireciona anônimos para Welcome
  if (!isAuthenticated && currentScreen !== "welcome" && currentScreen !== "login") {
    setCurrentScreen("welcome");
  }

  // Verifica se deve mostrar a navegação - apenas para telas pós-login/visitante
  const shouldShowNavigation = isAuthenticated || 
                              (currentScreen !== "welcome" && 
                               currentScreen !== "login");

  return (
    <div className="flutter-app border border-border">
      {/* telas públicas -------------------------------------------------- */}
      {currentScreen === "welcome" && (
        <WelcomeScreen onEnterApp={handleEnterApp} onLogin={handleGoToLogin} />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onBackToWelcome={handleBackToWelcome}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* telas internas -------------------------------------------------- */}
      {(isAuthenticated || currentScreen === "home") && (
        <>
          {currentScreen === "home"      && <DashboardScreen />}
          {currentScreen === "donations" && <DonationsScreen />}
          {currentScreen === "events"    && <EventsScreen />}
          {currentScreen === "volunteer" && <VolunteerScreen />}
          {currentScreen === "impact"    && <ImpactScreen />}
          {currentScreen === "profile"   && <ProfileScreen />}

          {/* FAB exclusivo da tela Doações */}
          {currentScreen === "donations" && hasPermission("internal") && (
            <button
              className="absolute bottom-20 right-4 p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
              aria-label="Add donation"
            >
              <Plus className="h-6 w-6" />
            </button>
          )}

          {/* Bottom Navigation - Agora só aparece quando appropriado */}
          {shouldShowNavigation && currentScreen !== "welcome" && currentScreen !== "login" && (
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
