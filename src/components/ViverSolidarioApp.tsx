
import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import WelcomeScreen from '@/screens/WelcomeScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import DonationsScreen from '@/screens/DonationsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ProgramsScreen from '@/screens/ProgramsScreen';
import VolunteerScreen from '@/screens/VolunteerScreen';
import EventsScreen from '@/screens/EventsScreen';
import ImpactScreen from '@/screens/ImpactScreen';
import { Home, Heart, User, Plus, Calendar, GraduationCap, Handshake, Impact } from '@/components/icons';

type ScreenType = 'welcome' | 'home' | 'donations' | 'profile' | 'programs' | 'volunteer' | 'events' | 'impact';

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
            {currentScreen === 'programs' && <ProgramsScreen />}
            {currentScreen === 'volunteer' && <VolunteerScreen />}
            {currentScreen === 'events' && <EventsScreen />}
            {currentScreen === 'impact' && <ImpactScreen />}
            
            {/* FAB for Donations screen */}
            {currentScreen === 'donations' && (
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
              
              <button 
                className={`nav-item ${currentScreen === 'impact' ? 'text-viver-yellow' : 'text-muted-foreground'}`}
                onClick={() => setCurrentScreen('impact')}
              >
                <Impact className="h-6 w-6 mb-1" />
                <span>Impacto</span>
              </button>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ViverSolidarioApp;
