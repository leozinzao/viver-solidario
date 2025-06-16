
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { EstatisticasImpacto } from '@/types/doacoesFisicas';

export const useEstatisticasImpacto = () => {
  const { data: estatisticas, isLoading, error } = useQuery({
    queryKey: ['estatisticas-impacto'],
    queryFn: async (): Promise<EstatisticasImpacto> => {
      console.log('Buscando estatísticas de impacto...');
      
      const { data, error } = await supabase
        .rpc('get_estatisticas_impacto');

      if (error) {
        console.error('Erro ao buscar estatísticas de impacto:', error);
        throw error;
      }

      console.log('Estatísticas de impacto recebidas:', data);
      return data as EstatisticasImpacto;
    },
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });

  return {
    estatisticas: estatisticas || {
      total_doacoes_entregues: 0,
      total_pessoas_impactadas: 0,
      total_localidades_atendidas: 0,
      por_categoria: [],
      por_tipo_beneficiario: []
    },
    loading: isLoading,
    error
  };
};
