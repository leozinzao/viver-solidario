
import React from "react";
import { Home, Calendar, Heart, Handshake, User, Impact } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { Permission, hasPermission } from '@/lib/permissions';
import { useNavigation } from "@/context/NavigationContext";

interface NavigationBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentScreen, onNavigate }) => {
  const { isAuthenticated, user } = useAuth();
  const { navigateToScreen } = useNavigation();
  
  // Check if user has analytics permission
  const hasAnalyticsPermission = isAuthenticated && user && hasPermission(user.role as any, Permission.VIEW_ANALYTICS);
  
  // Handle profile navigation with proper authentication check
  const handleProfileClick = () => {
    if (isAuthenticated) {
      onNavigate("profile");
    } else {
      navigateToScreen("login");
    }
  };

  return (
    <div className="flutter-bottom-nav">
      {/* Main navigation items - available to all users */}
      <button
        className={`nav-item ${currentScreen === "home" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => onNavigate("home")}
      >
        <Home className="h-6 w-6 mb-1" />
        <span>Início</span>
      </button>

      <button
        className={`nav-item ${currentScreen === "events" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => onNavigate("events")}
      >
        <Calendar className="h-6 w-6 mb-1" />
        <span>Eventos</span>
      </button>

      <button
        className={`nav-item ${currentScreen === "donations" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => onNavigate("donations")}
      >
        <Heart className="h-6 w-6 mb-1" />
        <span>Doações</span>
      </button>

      <button
        className={`nav-item ${currentScreen === "volunteer" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => onNavigate("volunteer")}
      >
        <Handshake className="h-6 w-6 mb-1" />
        <span>Voluntariado</span>
      </button>

      {/* Show either Impact button for users with analytics permission or Profile button for everyone else */}
      {hasAnalyticsPermission ? (
        <button
          className={`nav-item ${currentScreen === "impact" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => onNavigate("impact")}
        >
          <Impact className="h-6 w-6 mb-1" />
          <span>Impacto</span>
        </button>
      ) : (
        <button
          className={`nav-item ${currentScreen === "profile" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={handleProfileClick}
        >
          <User className="h-6 w-6 mb-1" />
          <span>Perfil</span>
        </button>
      )}
    </div>
  );
};

export default NavigationBar;
