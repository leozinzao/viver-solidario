
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileOptions from '@/components/profile/ProfileOptions';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import ChangePasswordDialog from '@/components/profile/ChangePasswordDialog';
import { useProfileActions } from '@/hooks/useProfileActions';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, hasPermission } = useAuth();
  const {
    isEditingProfile,
    setIsEditingProfile,
    editName,
    setEditName,
    editEmail,
    setEditEmail,
    isChangingPassword,
    setIsChangingPassword,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSaveProfile,
    handleChangePassword,
    handleLogout,
    openEditProfile
  } = useProfileActions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-viver-yellow to-orange-500 bg-clip-text text-transparent mb-2">
            Meu Perfil
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>
        
        {/* Profile Header */}
        <ProfileHeader 
          user={user} 
          onEditProfile={openEditProfile} 
        />
        
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-viver-yellow mb-2">0</div>
            <div className="text-sm text-muted-foreground">Doações</div>
            <div className="text-sm text-muted-foreground">Realizadas</div>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-green-500 mb-2">0</div>
            <div className="text-sm text-muted-foreground">Horas</div>
            <div className="text-sm text-muted-foreground">Voluntárias</div>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-2">0</div>
            <div className="text-sm text-muted-foreground">Eventos</div>
            <div className="text-sm text-muted-foreground">Participados</div>
          </div>
        </div>
        
        {/* Opções do Perfil - Uma coluna única */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-viver-yellow rounded-full"></div>
            <h3 className="text-xl font-semibold text-foreground">Configurações da Conta</h3>
          </div>
          
          <ProfileOptions 
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            hasPermission={hasPermission}
            onEditProfile={openEditProfile}
            onChangePassword={() => setIsChangingPassword(true)}
            onLogout={handleLogout}
          />
        </div>
        
        {/* Footer */}
        <div className="text-center pt-8 border-t border-border mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="w-2 h-2 bg-viver-yellow rounded-full animate-pulse"></div>
            <span>Viver Solidário v1.0.0</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Desenvolvido com ❤️ para a ONG Viver
          </p>
        </div>
        
        {/* Dialogs */}
        <EditProfileDialog 
          isOpen={isEditingProfile}
          onOpenChange={setIsEditingProfile}
          editName={editName}
          setEditName={setEditName}
          editEmail={editEmail}
          setEditEmail={setEditEmail}
          onSave={handleSaveProfile}
        />
        
        <ChangePasswordDialog 
          isOpen={isChangingPassword}
          onOpenChange={setIsChangingPassword}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSave={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default ProfileScreen;
