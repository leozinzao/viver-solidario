
import React from "react";
import { Home, Calendar, Heart, Handshake, User, Settings } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";

interface NavigationBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentScreen, onNavigate }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flutter-bottom-nav">
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

      {/* Show profile for authenticated users, admin for admin users */}
      <button
        className={`nav-item ${["profile", "admin"].includes(currentScreen) ? "text-viver-yellow" : "text-muted-foreground"}`}
        onClick={() => onNavigate(isAuthenticated ? "profile" : "login")}
      >
        {isAuthenticated ? (
          <>
            <User className="h-6 w-6 mb-1" />
            <span>Perfil</span>
          </>
        ) : (
          <>
            <User className="h-6 w-6 mb-1" />
            <span>Login</span>
          </>
        )}
      </button>
    </div>
  );
};

export default NavigationBar;
