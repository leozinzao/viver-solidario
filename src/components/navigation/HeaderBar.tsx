
import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface HeaderBarProps {
  isAuthenticated: boolean;
  isAdminUser: boolean;
  onLogin: () => void;
  onAdminNavigate: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  isAuthenticated, 
  isAdminUser, 
  onLogin, 
  onAdminNavigate 
}) => {
  return (
    <div className="w-full h-14 bg-white dark:bg-background border-b flex items-center justify-between px-4">
      {!isAuthenticated && (
        <div className="flex-1"></div> /* Espaçador esquerdo */
      )}
      
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-viver-yellow">ONG Viver</h1>
      </div>
      
      <div className="flex-1 flex justify-end">
        {!isAuthenticated && (
          <Button 
            onClick={onLogin}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-viver-yellow border-viver-yellow hover:bg-viver-yellow/10"
          >
            <LogIn className="h-4 w-4" />
            <span>Entrar</span>
          </Button>
        )}
        
        {isAuthenticated && isAdminUser && (
          <Button 
            onClick={onAdminNavigate}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Settings className="h-4 w-4 mr-1" />
            <span>Admin</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
