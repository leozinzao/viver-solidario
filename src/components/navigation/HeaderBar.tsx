
import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Permission, hasPermission } from "@/lib/permissions";

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
      <div className="flex items-center">
        {/* Logo da ONG Viver */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/644dc858-b963-4312-a22e-38983c64e833.png" 
            alt="ONG Viver" 
            className="h-9 w-auto" 
          />
          <span className="ml-2 font-medium text-lg hidden sm:block">ONG Viver</span>
        </div>
      </div>
      
      <div className="flex justify-end">
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
