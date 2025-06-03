
import { supabase } from '@/lib/supabase';
import { ErrorHandler } from '@/lib/errorHandler';
import type { ContadoresDoacoes } from '@/types/doacoesFisicas';

export const estatisticasService = {
  // Contar doações por status
  async contarDoacoesPorStatus(doadorId?: string): Promise<ContadoresDoacoes> {
    try {
      let query = supabase
        .from('doacoes_fisicas_novas')
        .select('status');

      if (doadorId) {
        query = query.eq('doador_id', doadorId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao contar doações:', error);
        throw ErrorHandler.handleApiError(error);
      }

      const contadores: ContadoresDoacoes = {
        total: data?.length || 0,
        disponivel: data?.filter(d => d.status === 'disponivel').length || 0,
        reservada: data?.filter(d => d.status === 'reservada').length || 0,
        entregue: data?.filter(d => d.status === 'entregue').length || 0,
        cancelada: data?.filter(d => d.status === 'cancelada').length || 0
      };

      return contadores;
    } catch (err) {
      console.error('Erro no serviço de estatísticas:', err);
      // Retornar contadores zerados em caso de erro
      return {
        total: 0,
        disponivel: 0,
        reservada: 0,
        entregue: 0,
        cancelada: 0
      };
    }
  }
};
