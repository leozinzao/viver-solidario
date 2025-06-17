
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { UserInfo } from '@/types/auth';
import { Theme } from '@/context/ThemeContext';

export const useAuthActions = (
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void
) => {
  const refreshUserRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('voluntarios')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (!error && data?.role && data.role !== user.role) {
        setUser({ ...user, role: data.role });
      }
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
    }
  };

  const checkAdminAccess = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .rpc('has_admin_access', { user_id: user.id });

      if (error) {
        console.error('Erro ao verificar acesso admin:', error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error('Erro na verificação de acesso admin:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new Error('Email ou senha incorretos');
      }
      
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
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
      
      try {
        await supabase
          .from('voluntarios')
          .update({
            nome: updatedUser.name,
            email: updatedUser.email,
            theme: updatedUser.theme
          })
          .eq('id', user.id);
      } catch (dbError) {
        console.warn('Erro ao atualizar perfil no banco (continuando):', dbError);
      }
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!"
      });
    } catch (error) {
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
