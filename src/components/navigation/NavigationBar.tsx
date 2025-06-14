
import React from "react";
import { Home, Calendar, Heart, Handshake, User, Settings, BarChart3, Package, Users, MessageSquare, Bell } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { hasPermission, Permission } from "@/lib/permissions";

interface NavigationBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentScreen, onNavigate }) => {
  const { isAuthenticated, user } = useAuth();

  // Verificar se o usuário tem permissões administrativas
  const hasAdminAccess = user && hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL);
  const canManageUsers = user && hasPermission(user.role, Permission.MANAGE_USERS);

  // Se for admin, mostrar navegação administrativa
  if (hasAdminAccess) {
    return (
      <div className="flutter-bottom-nav">
        <button
          className={`nav-item ${currentScreen === "admin-dashboard" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => onNavigate("admin-dashboard")}
        >
          <BarChart3 className="h-6 w-6 mb-1" />
          <span>Dashboard</span>
        </button>

        <button
          className={`nav-item ${currentScreen === "admin-doacoes" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => onNavigate("admin-doacoes")}
        >
          <Package className="h-6 w-6 mb-1" />
          <span>Doações</span>
        </button>

        <button
          className={`nav-item ${currentScreen === "admin-depoimentos" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => onNavigate("admin-depoimentos")}
        >
          <MessageSquare className="h-6 w-6 mb-1" />
          <span>Depoimentos</span>
        </button>

        {canManageUsers && (
          <button
            className={`nav-item ${currentScreen === "admin-usuarios" ? "text-viver-yellow" : "text-muted-foreground"}`}
            onClick={() => onNavigate("admin-usuarios")}
          >
            <Users className="h-6 w-6 mb-1" />
            <span>Usuários</span>
          </button>
        )}

        <button
          className={`nav-item ${currentScreen === "admin-configuracoes" ? "text-viver-yellow" : "text-muted-foreground"}`}
          onClick={() => onNavigate("admin-configuracoes")}
        >
          <Settings className="h-6 w-6 mb-1" />
          <span>Configurações</span>
        </button>
      </div>
    );
  }

  // Navegação padrão para usuários normais
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
