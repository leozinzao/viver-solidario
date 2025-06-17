
import { supabase } from '@/lib/supabase';
import type { ContadoresDoacoes } from '@/types/doacoesFisicas';

export const estatisticasService = {
  // Contar doações por status
  async contarDoacoesPorStatus(doadorId?: string): Promise<ContadoresDoacoes> {
    console.log('Estatisticas: Contando doações por status para doador:', doadorId);

    try {
      let query = supabase
        .from('doacoes_fisicas_novas')
        .select('status');

      if (doadorId) {
        query = query.eq('doador_id', doadorId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Estatisticas: Erro ao contar doações:', error);
        throw new Error(`Erro ao carregar estatísticas: ${error.message}`);
      }

      // Contar por status
      const contadores: ContadoresDoacoes = {
        total: data?.length || 0,
        disponivel: data?.filter(d => d.status === 'disponivel').length || 0,
        reservada: data?.filter(d => d.status === 'reservada').length || 0,
        entregue: data?.filter(d => d.status === 'entregue').length || 0,
        cancelada: data?.filter(d => d.status === 'cancelada').length || 0,
      };

      console.log('Estatisticas: Contadores calculados:', contadores);
      return contadores;
    } catch (err) {
      console.error('Estatisticas: Erro na execução:', err);
      throw err;
    }
  }
};
