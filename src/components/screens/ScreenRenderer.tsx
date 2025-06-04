
import React from "react";
import WelcomeScreen from "@/screens/WelcomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import HomeScreen from "@/screens/HomeScreen";
import DonationsScreen from "@/screens/DonationsScreen";
import DoacoesFisicasScreenStreamlined from "@/screens/DoacoesFisicasScreenStreamlined";
import EventsScreen from "@/screens/EventsScreen";
import VolunteerScreen from "@/screens/VolunteerScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import AdminScreen from "@/screens/AdminScreen";

interface ScreenRendererProps {
  currentScreen: string;
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onGoToSignUp: () => void;
  onBackToWelcome: () => void;
  onLoginSuccess: () => void;
}

const ScreenRenderer: React.FC<ScreenRendererProps> = ({
  currentScreen,
  onEnterApp,
  onGoToLogin,
  onGoToSignUp,
  onBackToWelcome,
  onLoginSuccess,
}) => {
  console.log('ScreenRenderer: Renderizando tela:', currentScreen);

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
          onLoginSuccess={onLoginSuccess}
          onBackToWelcome={onBackToWelcome}
        />
      );
    case "signup":
      return (
        <SignUpScreen
          onSignUpSuccess={onLoginSuccess}
          onBackToWelcome={onBackToWelcome}
        />
      );
    case "home":
      return <HomeScreen />;
    case "donations":
      return <DonationsScreen />;
    case "doacoes-fisicas":
      console.log('ScreenRenderer: Renderizando DoacoesFisicasScreenStreamlined');
      return <DoacoesFisicasScreenStreamlined />;
    case "events":
      return <EventsScreen />;
    case "volunteer":
      return <VolunteerScreen />;
    case "profile":
      return <ProfileScreen />;
    case "admin":
      return <AdminScreen />;
    default:
      console.log('ScreenRenderer: Tela não encontrada, renderizando home');
      return <HomeScreen />;
  }
};

export default ScreenRenderer;
