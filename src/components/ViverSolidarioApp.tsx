
import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import WelcomeScreen from '@/screens/WelcomeScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import DonationsScreen from '@/screens/DonationsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import CampaignsScreen from '@/screens/CampaignsScreen';
import EventsScreen from '@/screens/EventsScreen';
import { Home, Heart, User, Calendar, Campaign, Plus } from '@/components/icons';

type ScreenType = 'welcome' | 'home' | 'donations' | 'profile' | 'campaigns' | 'events';

const ViverSolidarioApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  
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
            {currentScreen === 'campaigns' && <CampaignsScreen />}
            {currentScreen === 'events' && <EventsScreen />}
            
            {/* FAB for Donations screen */}
            {currentScreen === 'donations' && (
              <button 
                className="absolute bottom-20 right-4 p-4 rounded-full bg-solidario-purple text-white shadow-lg hover:bg-solidario-purple/90 transition-colors"
                aria-label="Add donation"
              >
                <Plus className="h-6 w-6" />
              </button>
            )}
            
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
              
              <button 
                className={`nav-item ${currentScreen === 'campaigns' ? 'text-solidario-purple' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('campaigns')}
              >
                <Campaign className="h-6 w-6 mb-1" />
                <span>Campanhas</span>
              </button>
              
              <button 
                className={`nav-item ${currentScreen === 'events' ? 'text-solidario-purple' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('events')}
              >
                <Calendar className="h-6 w-6 mb-1" />
                <span>Eventos</span>
              </button>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ViverSolidarioApp;
