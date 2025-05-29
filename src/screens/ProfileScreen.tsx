
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flutter-screen p-6 max-w-4xl mx-auto">
        {/* Header com gradiente */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-viver-yellow to-orange-500 bg-clip-text text-transparent mb-2">
            Meu Perfil
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>
        
        {/* Profile Header melhorado */}
        <div className="mb-8">
          <ProfileHeader 
            user={user} 
            onEditProfile={openEditProfile} 
          />
        </div>
        
        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-viver-yellow mb-1">0</div>
            <div className="text-sm text-muted-foreground">Doações Realizadas</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-green-500 mb-1">0</div>
            <div className="text-sm text-muted-foreground">Horas Voluntárias</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-blue-500 mb-1">0</div>
            <div className="text-sm text-muted-foreground">Eventos Participados</div>
          </div>
        </div>
        
        {/* Profile Options em cards organizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-viver-yellow rounded-full"></div>
              Conta & Segurança
            </h3>
            <ProfileOptions 
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              hasPermission={hasPermission}
              onEditProfile={openEditProfile}
              onChangePassword={() => setIsChangingPassword(true)}
              onLogout={handleLogout}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              Configurações
            </h3>
            {/* Área para configurações futuras */}
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="text-muted-foreground text-sm">
                Configurações adicionais em breve...
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer melhorado */}
        <div className="text-center pt-8 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="w-2 h-2 bg-viver-yellow rounded-full animate-pulse"></div>
            <span>Viver Solidário v1.0.0</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Desenvolvido com ❤️ para a ONG Viver
          </p>
        </div>
        
        {/* Edit Profile Dialog */}
        <EditProfileDialog 
          isOpen={isEditingProfile}
          onOpenChange={setIsEditingProfile}
          editName={editName}
          setEditName={setEditName}
          editEmail={editEmail}
          setEditEmail={setEditEmail}
          onSave={handleSaveProfile}
        />
        
        {/* Change Password Dialog */}
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
