
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useProfileActions = () => {
  const { user, updateUserProfile, updatePassword } = useAuth();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        name: editName,
        email: editEmail,
      });
      
      setIsEditingProfile(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil",
        variant: "destructive"
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não conferem",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await updatePassword(currentPassword, newPassword);
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a senha",
        variant: "destructive"
      });
    }
  };

  const openEditProfile = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setIsEditingProfile(true);
  };

  return {
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
    openEditProfile
  };
};
