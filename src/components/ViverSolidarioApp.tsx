
import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import WelcomeScreen from '@/screens/WelcomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import DonationsScreen from '@/screens/DonationsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ProgramsScreen from '@/screens/ProgramsScreen';
import VolunteerScreen from '@/screens/VolunteerScreen';
import EventsScreen from '@/screens/EventsScreen';
import ImpactScreen from '@/screens/ImpactScreen';
import { Home, Heart, User, Plus, Calendar, GraduationCap, Handshake, Impact } from '@/components/icons';

type ScreenType = 'welcome' | 'login' | 'home' | 'donations' | 'profile' | 'programs' | 'volunteer' | 'events' | 'impact';

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const { isAuthenticated, hasPermission } = useAuth();
  
  const handleEnterApp = () => {
    setCurrentScreen('home');
  };
  
  const handleGoToLogin = () => {
    setCurrentScreen('login');
  };
  
  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };
  
  if (!isAuthenticated && currentScreen !== 'welcome' && currentScreen !== 'login') {
    setCurrentScreen('welcome');
  }
  
  return (
    <div className="flutter-app border border-border">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onEnterApp={handleEnterApp} onLogin={handleGoToLogin} />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen onBackToWelcome={handleBackToWelcome} />
      )}
      
      {isAuthenticated && (
        <>
          {currentScreen === 'home' && <DashboardScreen />}
          {currentScreen === 'donations' && <DonationsScreen />}
          {currentScreen === 'profile' && <ProfileScreen />}
          {currentScreen === 'programs' && <ProgramsScreen />}
          {currentScreen === 'volunteer' && <VolunteerScreen />}
          {currentScreen === 'events' && <EventsScreen />}
          {currentScreen === 'impact' && <ImpactScreen />}
          
          {/* FAB for Donations screen */}
          {currentScreen === 'donations' && hasPermission('internal') && (
            <button 
              className="absolute bottom-20 right-4 p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
              aria-label="Add donation"
            >
              <Plus className="h-6 w-6" />
            </button>
          )}
          
          <div className="flutter-bottom-nav">
            <button 
              className={`nav-item ${currentScreen === 'home' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
              onClick={() => setCurrentScreen('home')}
            >
              <Home className="h-6 w-6 mb-1" />
              <span>Início</span>
            </button>
            
            <button 
              className={`nav-item ${currentScreen === 'programs' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
              onClick={() => setCurrentScreen('programs')}
            >
              <GraduationCap className="h-6 w-6 mb-1" />
              <span>Programas</span>
            </button>
            
            <button 
              className={`nav-item ${currentScreen === 'donations' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
              onClick={() => setCurrentScreen('donations')}
            >
              <Heart className="h-6 w-6 mb-1" />
              <span>Doações</span>
            </button>
            
            <button 
              className={`nav-item ${currentScreen === 'volunteer' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
              onClick={() => setCurrentScreen('volunteer')}
            >
              <Handshake className="h-6 w-6 mb-1" />
              <span>Voluntariado</span>
            </button>
            
            {hasPermission('internal') ? (
              <button 
                className={`nav-item ${currentScreen === 'impact' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('impact')}
              >
                <Impact className="h-6 w-6 mb-1" />
                <span>Impacto</span>
              </button>
            ) : (
              <button 
                className={`nav-item ${currentScreen === 'profile' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('profile')}
              >
                <User className="h-6 w-6 mb-1" />
                <span>Perfil</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ViverSolidarioApp: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ViverSolidarioApp;
