
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
    console.log('Verificando role do usuário:', userId);
    
    const { data, error } = await supabase
      .from('voluntarios')
      .select('role')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle ao invés de single para evitar erro quando não encontra

    if (error) {
      console.error('Erro ao verificar role do usuário:', error);
      return null;
    }

    const role = data?.role as UserRole;
    console.log('Role encontrado:', role);
    return role || UserRole.donor;
  } catch (error) {
    console.error('Erro ao verificar role:', error);
    return UserRole.donor; // Fallback para donor
  }
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    console.log('Verificando se é admin:', userId);
    
    const { data, error } = await supabase
      .rpc('is_admin', { user_id: userId });

    if (error) {
      console.error('Erro ao verificar se é admin:', error);
      return false;
    }

    console.log('Resultado is_admin:', data);
    return data || false;
  } catch (error) {
    console.error('Erro na verificação de admin:', error);
    return false;
  }
};

export const hasAdminAccess = async (userId: string): Promise<boolean> => {
  try {
    console.log('Verificando acesso admin:', userId);
    
    const { data, error } = await supabase
      .rpc('has_admin_access', { user_id: userId });

    if (error) {
      console.error('Erro ao verificar acesso admin:', error);
      return false;
    }

    console.log('Resultado has_admin_access:', data);
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
    console.log('Registrando ação admin:', { adminId, actionType, targetType, description });
    
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
    } else {
      console.log('Ação admin registrada com sucesso');
    }
  } catch (error) {
    console.error('Erro ao registrar log de ação:', error);
  }
};

export const getAdminLogs = async (limit = 50): Promise<AdminActionLog[]> => {
  try {
    console.log('Buscando logs admin...');
    
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

    console.log('Logs admin encontrados:', data?.length);
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    return [];
  }
};
