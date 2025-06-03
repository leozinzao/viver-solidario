
import { supabase } from '@/lib/supabase';
import { ErrorHandler } from '@/lib/errorHandler';
import type { ContadoresDoacoes } from '@/types/doacoesFisicas';

export const estatisticasService = {
  // Contar doações por status
  async contarDoacoesPorStatus(doadorId?: string): Promise<ContadoresDoacoes> {
    let query = supabase
      .from('doacoes_fisicas_novas')
      .select('status');

    if (doadorId) {
      query = query.eq('doador_id', doadorId);
    }

    const { data, error } = await query;

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    const contadores = {
      total: data?.length || 0,
      disponivel: 0,
      reservada: 0,
      entregue: 0,
      cancelada: 0
    };

    data?.forEach(item => {
      if (item.status in contadores) {
        contadores[item.status as keyof typeof contadores]++;
      }
    });

    return contadores;
  }
};
