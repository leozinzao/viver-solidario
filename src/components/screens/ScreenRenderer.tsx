
import React from "react";
import { useAuth } from "@/context/AuthContext";

// Import real screen components
import WelcomeScreen from "@/screens/WelcomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import HomeScreen from "@/screens/HomeScreen";
import EventsScreen from "@/screens/EventsScreen";
import DonationsScreen from "@/screens/DonationsScreen";
import VolunteerScreen from "@/screens/VolunteerScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import DoacoesFisicasScreen from "@/screens/DoacoesFisicasScreen";
import AdminScreen from "@/screens/AdminScreen";
import HistoricoAcoesScreen from "@/screens/HistoricoAcoesScreen";
import ConfiguracoesScreen from "@/screens/ConfiguracoesScreen";

// Import new admin screens
import AdminDashboardScreen from "@/screens/AdminDashboardScreen";
import AdminDoacoesScreen from "@/screens/AdminDoacoesScreen";
import AdminUsuariosScreen from "@/screens/AdminUsuariosScreen";
import AdminDepoimentosScreen from "@/screens/AdminDepoimentosScreen";
import AdminConfiguracoesScreen from "@/screens/AdminConfiguracoesScreen";

import { hasPermission, Permission } from "@/lib/permissions";

type ScreenType =
  | "welcome"
  | "login"
  | "signup"
  | "home"
  | "donations"
  | "doacoes-fisicas"
  | "profile"
  | "volunteer"
  | "events"
  | "impact"
  | "admin"
  | "admin-dashboard"
  | "admin-doacoes"
  | "admin-usuarios"
  | "admin-depoimentos"
  | "admin-eventos"
  | "admin-configuracoes"
  | "admin-notificacoes"
  | "historico-acoes"
  | "configuracoes";

interface ScreenRendererProps {
  currentScreen: ScreenType;
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onGoToSignUp: () => void;
  onBackToWelcome: () => void;
  onLoginSuccess: () => void;
}

// Simple placeholder component for missing screens
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center min-h-screen p-6">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-viver-yellow mb-4">{title}</h1>
      <p className="text-muted-foreground">Esta tela está em desenvolvimento</p>
    </div>
  </div>
);

const ScreenRenderer: React.FC<ScreenRendererProps> = ({
  currentScreen,
  onEnterApp,
  onGoToLogin,
  onGoToSignUp,
  onBackToWelcome,
  onLoginSuccess,
}) => {
  const { isAuthenticated, user } = useAuth();

  // Render screens based on current screen
  switch (currentScreen) {
    case "welcome":
      return (
        <WelcomeScreen 
          onEnterApp={onEnterApp} 
          onLogin={onGoToLogin} 
          onSignUp={onGoToSignUp}
        />
      );

    case "login":
      return (
        <LoginScreen 
          onBackToWelcome={onBackToWelcome}
          onLoginSuccess={onLoginSuccess}
        />
      );
      
    case "signup":
      return (
        <SignUpScreen 
          onBackToWelcome={onBackToWelcome}
          onSignUpSuccess={onLoginSuccess}
        />
      );

    case "home":
      return <HomeScreen />;

    case "donations":
      return <DonationsScreen />;

    case "doacoes-fisicas":
      return <DoacoesFisicasScreen />;

    case "events":
      return <EventsScreen />;

    case "volunteer":
      return <VolunteerScreen />;
      
    case "profile":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <ProfileScreen />;

    // Admin screens - new dedicated screens
    case "admin-dashboard":
      if (!isAuthenticated || !user || !hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL)) {
        return <PlaceholderScreen title="Acesso Restrito - Permissões Administrativas Necessárias" />;
      }
      return <AdminDashboardScreen />;

    case "admin-doacoes":
      if (!isAuthenticated || !user || !hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL)) {
        return <PlaceholderScreen title="Acesso Restrito - Permissões Administrativas Necessárias" />;
      }
      return <AdminDoacoesScreen />;

    case "admin-usuarios":
      if (!isAuthenticated || !user || !hasPermission(user.role, Permission.MANAGE_USERS)) {
        return <PlaceholderScreen title="Acesso Restrito - Permissões de Gestão de Usuários Necessárias" />;
      }
      return <AdminUsuariosScreen />;

    case "admin-depoimentos":
      if (!isAuthenticated || !user || !hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL)) {
        return <PlaceholderScreen title="Acesso Restrito - Permissões Administrativas Necessárias" />;
      }
      return <AdminDepoimentosScreen />;

    case "admin-configuracoes":
      if (!isAuthenticated || !user || !hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL)) {
        return <PlaceholderScreen title="Acesso Restrito - Permissões Administrativas Necessárias" />;
      }
      return <AdminConfiguracoesScreen />;

    // Legacy admin screen (mantido por compatibilidade)
    case "admin":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <AdminScreen />;

    case "historico-acoes":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <HistoricoAcoesScreen />;

    case "configuracoes":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <ConfiguracoesScreen />;

    case "impact":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <PlaceholderScreen title="Impacto" />;

    default:
      return <PlaceholderScreen title="Página não encontrada" />;
  }
};

export default ScreenRenderer;
