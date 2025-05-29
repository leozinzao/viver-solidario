
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
    <div className="flutter-screen bg-background p-5">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Perfil</h1>
      
      {/* Profile Header */}
      <ProfileHeader 
        user={user} 
        onEditProfile={openEditProfile} 
      />
      
      {/* Profile Options */}
      <ProfileOptions 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        hasPermission={hasPermission}
        onEditProfile={openEditProfile}
        onChangePassword={() => setIsChangingPassword(true)}
        onLogout={handleLogout}
      />
      
      <div className="mt-10 text-center">
        <p className="text-xs text-muted-foreground">Viver Solidário v1.0.0</p>
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
  );
};

export default ProfileScreen;
