
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import ScreenRenderer from '@/components/screens/ScreenRenderer';
import NavigationBar from '@/components/navigation/NavigationBar';
import HeaderBar from '@/components/navigation/HeaderBar';
import { hasPermission, Permission } from '@/lib/permissions';

const ViverSolidarioApp: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { 
    currentScreen, 
    handleEnterApp, 
    handleGoToLogin, 
    handleGoToSignUp, 
    handleBackToWelcome, 
    handleLoginSuccess 
  } = useNavigation();

  const isAdminUser = user ? hasPermission(user, Permission.ADMIN_ACCESS) : false;

  console.log('🚀 ViverSolidarioApp: Renderizando app principal');
  console.log('🔐 ViverSolidarioApp: Autenticado:', isAuthenticated);
  console.log('📱 ViverSolidarioApp: Tela atual:', currentScreen);
  console.log('👤 ViverSolidarioApp: É admin:', isAdminUser);

  const showNavigation = isAuthenticated && 
    !['welcome', 'login', 'signup'].includes(currentScreen);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-white relative">
      {/* Header fixo no topo */}
      <HeaderBar 
        isAuthenticated={isAuthenticated}
        isAdminUser={isAdminUser}
        onLogin={handleGoToLogin}
        onAdminNavigate={() => {}} // Implementar se necessário
      />

      {/* Conteúdo principal com scroll */}
      <div className="flex-1 overflow-y-auto pb-16">
        <ScreenRenderer
          currentScreen={currentScreen}
          onEnterApp={handleEnterApp}
          onGoToLogin={handleGoToLogin}
          onGoToSignUp={handleGoToSignUp}
          onBackToWelcome={handleBackToWelcome}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>

      {/* Navegação inferior fixa */}
      {showNavigation && (
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={() => {}} // A navegação é gerenciada pelo contexto
        />
      )}
    </div>
  );
};

export default ViverSolidarioApp;
