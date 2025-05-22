
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
  
  // Handle navigation based on authentication state
  const handleNavigation = (screen: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      navigateToScreen("login");
    } else {
      onNavigate(screen);
    }
  };

  return (
    <div className="flutter-bottom-nav">
      {/* Main navigation items - available to all users */}
      <button
        className={`nav-item ${currentScreen === "home" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => handleNavigation("home")}
      >
        <Home className="h-6 w-6 mb-1" />
        <span>Início</span>
      </button>

      <button
        className={`nav-item ${currentScreen === "events" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => handleNavigation("events")}
      >
        <Calendar className="h-6 w-6 mb-1" />
        <span>Eventos</span>
      </button>

      <button
        className={`nav-item ${currentScreen === "donations" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => handleNavigation("donations")}
      >
        <Heart className="h-6 w-6 mb-1" />
        <span>Doações</span>
      </button>

      <button
        className={`nav-item ${currentScreen === "volunteer" ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => handleNavigation("volunteer")}
      >
        <Handshake className="h-6 w-6 mb-1" />
        <span>Voluntariado</span>
      </button>

      {/* Show either Impact button for users with analytics permission or Profile button */}
      {hasAnalyticsPermission ? (
        <button
          className={`nav-item ${currentScreen === "impact" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => handleNavigation("impact")}
        >
          <Impact className="h-6 w-6 mb-1" />
          <span>Impacto</span>
        </button>
      ) : (
        <button
          className={`nav-item ${currentScreen === "profile" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => handleNavigation("profile", true)}
        >
          <User className="h-6 w-6 mb-1" />
          <span>Perfil</span>
        </button>
      )}
    </div>
  );
};

export default NavigationBar;
