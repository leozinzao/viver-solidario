
import React from "react";
import { useAuth } from "@/context/AuthContext";

// Simplified screen imports - using basic components for now
import WelcomeScreen from "@/screens/WelcomeScreen";

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
  | "admin";

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
  const { isAuthenticated } = useAuth();

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
      return <PlaceholderScreen title="Login" />;
      
    case "signup":
      return <PlaceholderScreen title="Cadastro" />;

    case "home":
      return <PlaceholderScreen title="Início" />;

    case "donations":
      return <PlaceholderScreen title="Doações" />;

    case "events":
      return <PlaceholderScreen title="Eventos" />;

    case "volunteer":
      return <PlaceholderScreen title="Voluntariado" />;
      
    case "profile":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <PlaceholderScreen title="Perfil" />;

    case "impact":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <PlaceholderScreen title="Impacto" />;

    case "admin":
      if (!isAuthenticated) {
        return <PlaceholderScreen title="Acesso Restrito - Faça Login" />;
      }
      return <PlaceholderScreen title="Administração" />;

    default:
      return <PlaceholderScreen title="Página não encontrada" />;
  }
};

export default ScreenRenderer;
