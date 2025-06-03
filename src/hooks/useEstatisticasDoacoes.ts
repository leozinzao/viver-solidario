
import { useState, useEffect } from 'react';
import { estatisticasService } from '@/services/doacoesFisicas/estatisticasService';
import { useAuth } from '@/context/AuthContext';

export const useEstatisticasDoacoes = () => {
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    disponivel: 0,
    reservada: 0,
    entregue: 0,
    cancelada: 0
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const carregarEstatisticas = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const stats = await estatisticasService.contarDoacoesPorStatus(user.id);
      setEstatisticas(stats);
    } catch (err: any) {
      console.error('Erro ao carregar estatísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEstatisticas();
  }, [user]);

  return {
    estatisticas,
    loading,
    carregarEstatisticas
  };
};
