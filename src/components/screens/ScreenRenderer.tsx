
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
  console.log('🎬 ScreenRenderer: Renderizando tela:', currentScreen);
  console.log('🎬 ScreenRenderer: Timestamp:', new Date().toISOString());

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
      console.log('🏠 ScreenRenderer: Renderizando HomeScreen');
      return <HomeScreen />;
    case "donations":
      console.log('💝 ScreenRenderer: Renderizando DonationsScreen');
      return <DonationsScreen />;
    case "doacoes-fisicas":
      console.log('🎯 ScreenRenderer: Renderizando DoacoesFisicasScreenStreamlined');
      console.log('🎯 ScreenRenderer: NOVA TELA STREAMLINED SENDO CARREGADA!');
      return <DoacoesFisicasScreenStreamlined />;
    case "events":
      console.log('📅 ScreenRenderer: Renderizando EventsScreen');
      return <EventsScreen />;
    case "volunteer":
      console.log('🤝 ScreenRenderer: Renderizando VolunteerScreen');
      return <VolunteerScreen />;
    case "profile":
      console.log('👤 ScreenRenderer: Renderizando ProfileScreen');
      return <ProfileScreen />;
    case "admin":
      console.log('⚙️ ScreenRenderer: Renderizando AdminScreen');
      return <AdminScreen />;
    default:
      console.log('❓ ScreenRenderer: Tela não encontrada, renderizando home. Tela solicitada:', currentScreen);
      console.log('❓ ScreenRenderer: Telas disponíveis: welcome, login, signup, home, donations, doacoes-fisicas, events, volunteer, profile, admin');
      return <HomeScreen />;
  }
};

export default ScreenRenderer;
