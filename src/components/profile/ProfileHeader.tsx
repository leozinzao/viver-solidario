
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
    <div className="bg-card border rounded-xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-viver-yellow/20 flex items-center justify-center shadow-md">
            <User className="w-10 h-10 text-viver-yellow" />
          </div>
          <button 
            className="absolute -bottom-1 -right-1 bg-viver-yellow rounded-full p-2 border-2 border-background shadow-sm hover:bg-viver-yellow/90 transition-colors"
            onClick={onEditProfile}
            aria-label="Editar perfil"
          >
            <Edit className="w-4 h-4 text-black" />
          </button>
        </div>
        
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl font-bold mb-1">{user?.name || 'leonardo leo'}</h2>
          <p className="text-muted-foreground mb-3">{user?.email || 'leoyuri024@gmail.com'}</p>
          <div>{getUserRoleBadge()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
