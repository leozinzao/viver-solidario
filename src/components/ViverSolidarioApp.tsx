
import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import WelcomeScreen from '@/screens/WelcomeScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import DonationsScreen from '@/screens/DonationsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { Home, Heart, User } from '@/components/icons';

const ViverSolidarioApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'home' | 'donations' | 'profile'>('welcome');
  
  const handleEnterApp = () => {
    setCurrentScreen('home');
  };
  
  return (
    <ThemeProvider>
      <div className="flutter-app border border-border">
        {currentScreen === 'welcome' ? (
          <WelcomeScreen onEnterApp={handleEnterApp} />
        ) : (
          <>
            {currentScreen === 'home' && <DashboardScreen />}
            {currentScreen === 'donations' && <DonationsScreen />}
            {currentScreen === 'profile' && <ProfileScreen />}
            
            <div className="flutter-bottom-nav">
              <button 
                className={`nav-item ${currentScreen === 'home' ? 'text-solidario-purple' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('home')}
              >
                <Home className="h-6 w-6 mb-1" />
                <span>Início</span>
              </button>
              
              <button 
                className={`nav-item ${currentScreen === 'donations' ? 'text-solidario-purple' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('donations')}
              >
                <Heart className="h-6 w-6 mb-1" />
                <span>Doações</span>
              </button>
              
              <button 
                className={`nav-item ${currentScreen === 'profile' ? 'text-solidario-purple' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('profile')}
              >
                <User className="h-6 w-6 mb-1" />
                <span>Perfil</span>
              </button>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ViverSolidarioApp;
