
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { User, Edit } from '@/components/icons';
import { UserRole } from '@/lib/permissions';
import { UserInfo } from '@/types/auth';

interface ProfileHeaderProps {
  user: UserInfo | null;
  onEditProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditProfile }) => {
  const getUserRoleBadge = () => {
    if (!user) return null;
    
    switch (user.role) {
      case UserRole.internal:
        return <Badge className="bg-viver-yellow text-black">Acesso Interno</Badge>;
      case UserRole.volunteer:
        return <Badge className="bg-green-500">Voluntário</Badge>;
      case UserRole.donor:
        return <Badge className="bg-blue-500">Doador</Badge>;
      default:
        return <Badge className="bg-gray-500">Visitante</Badge>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 p-4 border border-border rounded-lg bg-card/50">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-viver-yellow/20 flex items-center justify-center shadow-md">
          <User className="w-12 h-12 text-viver-yellow" />
        </div>
        <button 
          className="absolute bottom-0 right-0 bg-viver-yellow rounded-full p-1.5 border-2 border-background shadow-sm hover:bg-viver-yellow/90 transition-colors"
          onClick={onEditProfile}
          aria-label="Editar perfil"
        >
          <Edit className="w-4 h-4 text-black" />
        </button>
      </div>
      <div className="text-center sm:text-left sm:ml-4">
        <h2 className="text-xl font-semibold">{user?.name || 'Nome do Usuário'}</h2>
        <p className="text-sm text-muted-foreground">{user?.email || 'usuario@email.com'}</p>
        <div className="mt-2">{getUserRoleBadge()}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
