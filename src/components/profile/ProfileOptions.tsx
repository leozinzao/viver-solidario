
import React from 'react';
import ProfileOption from './ProfileOption';
import { Switch } from "@/components/ui/switch";
import { History, Edit, Lock, Shield, Settings, Moon, LogOut } from '@/components/icons';
import { UserRole } from '@/lib/permissions';

interface ProfileOptionsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

const ProfileOptions: React.FC<ProfileOptionsProps> = ({
  isDarkMode,
  toggleTheme,
  hasPermission,
  onEditProfile,
  onChangePassword,
  onLogout
}) => {
  return (
    <div className="space-y-3">
      <ProfileOption
        icon={<History className="w-5 h-5" />}
        title="Histórico de Ações"
        description="Visualize suas atividades recentes"
      />
      
      <ProfileOption
        icon={<Edit className="w-5 h-5" />}
        title="Editar Dados"
        description="Atualize suas informações pessoais"
        onClick={onEditProfile}
        highlight
      />
      
      <ProfileOption
        icon={<Lock className="w-5 h-5" />}
        title="Alterar Senha"
        description="Atualize sua senha de acesso"
        onClick={onChangePassword}
      />
      
      {hasPermission(UserRole.internal) && (
        <ProfileOption
          icon={<Shield className="w-5 h-5" />}
          title="Painel Administrativo"
          description="Acesso às funções administrativas"
          highlight
        />
      )}
      
      {hasPermission([UserRole.internal, UserRole.volunteer]) && (
        <ProfileOption
          icon={<Lock className="w-5 h-5" />}
          title="Área Restrita"
          description="Acesso a documentos e informações restritas"
          highlight
        />
      )}
      
      {hasPermission(UserRole.internal) && (
        <ProfileOption
          icon={<Settings className="w-5 h-5" />}
          title="Configurações do Sistema"
          description="Ajustes e parametrizações internas"
        />
      )}
      
      <ProfileOption
        icon={<Moon className="w-5 h-5" />}
        title="Modo Escuro"
        description="Alternar tema de exibição"
        rightElement={
          <Switch 
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-viver-yellow"
          />
        }
      />
      
      <ProfileOption
        icon={<LogOut className="w-5 h-5" />}
        title="Sair"
        description="Encerrar sessão no aplicativo"
        onClick={onLogout}
        danger
      />
    </div>
  );
};

export default ProfileOptions;
