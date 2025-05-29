
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { UserInfo } from '@/types/auth';
import { Theme } from '@/context/ThemeContext';
import { checkUserRole, hasAdminAccess } from '@/services/adminService';

export const useAuthActions = (
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void
) => {
  const refreshUserRole = async () => {
    if (!user) return;
    
    try {
      const role = await checkUserRole(user.id);
      if (role && role !== user.role) {
        setUser({ ...user, role });
        console.log('Role do usuário atualizado:', role);
      }
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
    }
  };

  const checkAdminAccess = async (): Promise<boolean> => {
    if (!user) return false;
    return await hasAdminAccess(user.id);
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthActions: Tentando login:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('AuthActions: Erro no login:', error);
        throw new Error('Email ou senha incorretos');
      }
      
      console.log('AuthActions: Login bem-sucedido:', data.user?.email);
      
    } catch (error: any) {
      console.error('AuthActions: Falha no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('AuthActions: Fazendo logout...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('AuthActions: Logout realizado com sucesso');
    } catch (error) {
      console.error('AuthActions: Erro ao fazer logout:', error);
      toast({
        title: "Erro ao desconectar",
        description: "Houve um problema ao fazer logout.",
        variant: "destructive"
      });
    }
  };

  const updateUserProfile = async (data: { name?: string; email?: string; theme?: Theme }) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      const updatedUser = {
        ...user,
        name: data.name || user.name,
        email: data.email || user.email,
        theme: data.theme || user.theme
      };
      
      setUser(updatedUser);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!"
      });
    } catch (error) {
      console.error('AuthActions: Falha ao atualizar perfil:', error);
      throw error;
    }
  };
  
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso!"
      });
    } catch (error) {
      console.error('AuthActions: Falha ao atualizar senha:', error);
      throw error;
    }
  };

  return {
    login,
    logout,
    updateUserProfile,
    updatePassword,
    refreshUserRole,
    checkAdminAccess
  };
};
