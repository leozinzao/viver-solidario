
import { supabase } from '@/lib/supabase';
import { UserRole } from '@/lib/permissions';

export interface AdminActionLog {
  id: string;
  admin_id: string;
  action_type: string;
  target_type: string;
  target_id?: string;
  description: string;
  metadata?: any;
  created_at: string;
}

export const checkUserRole = async (userId: string): Promise<UserRole | null> => {
  try {
    const { data, error } = await supabase
      .from('voluntarios')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erro ao verificar role do usuário:', error);
      return null;
    }

    return data?.role as UserRole || UserRole.donor;
  } catch (error) {
    console.error('Erro ao verificar role:', error);
    return null;
  }
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('is_admin', { user_id: userId });

    if (error) {
      console.error('Erro ao verificar se é admin:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Erro na verificação de admin:', error);
    return false;
  }
};

export const hasAdminAccess = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('has_admin_access', { user_id: userId });

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

export const logAdminAction = async (
  adminId: string,
  actionType: string,
  targetType: string,
  description: string,
  targetId?: string,
  metadata?: any
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('admin_actions')
      .insert({
        admin_id: adminId,
        action_type: actionType,
        target_type: targetType,
        target_id: targetId,
        description,
        metadata,
      });

    if (error) {
      console.error('Erro ao registrar ação admin:', error);
    }
  } catch (error) {
    console.error('Erro ao registrar log de ação:', error);
  }
};

export const getAdminLogs = async (limit = 50): Promise<AdminActionLog[]> => {
  try {
    const { data, error } = await supabase
      .from('admin_actions')
      .select(`
        *,
        voluntarios:admin_id (
          nome,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar logs admin:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    return [];
  }
};
