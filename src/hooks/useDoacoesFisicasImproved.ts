
import { useState, useEffect } from 'react';
import { doacoesFisicasService, DoacaoFisica } from '@/services/doacoesFisicasService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const useDoacoesFisicasImproved = () => {
  const [doacoes, setDoacoes] = useState<DoacaoFisica[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Carregar doações com filtros
  const carregarDoacoes = async (filtros?: {
    status?: string;
    categoria_id?: string;
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const doacoesList = await doacoesFisicasService.listarDoacoes(filtros);
      setDoacoes(doacoesList);
      
      // Simular paginação básica
      setPagination({
        page: filtros?.page || 1,
        limit: filtros?.limit || 10,
        total: doacoesList.length,
        pages: Math.ceil(doacoesList.length / (filtros?.limit || 10))
      });
    } catch (err) {
      const errorMessage = 'Erro ao carregar doações';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Criar nova doação
  const criarDoacao = async (dadosDoacao: any) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);

    try {
      await doacoesFisicasService.criarDoacao({ ...dadosDoacao, doador_id: user.id });
      
      toast({
        title: "Sucesso",
        description: "Doação criada com sucesso!",
        variant: "default"
      });
      
      // Recarregar a lista
      await carregarDoacoes();
      return true;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar doação",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reservar doação
  const reservarDoacao = async (doacaoId: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);

    try {
      await doacoesFisicasService.atualizarStatus(doacaoId, 'reservada', user.id);
      
      toast({
        title: "Sucesso",
        description: "Doação reservada com sucesso!",
        variant: "default"
      });
      
      // Atualizar a lista local
      setDoacoes(prev => prev.map(doacao => 
        doacao.id === doacaoId 
          ? { ...doacao, status: 'reservada' as const, reservado_por_id: user.id }
          : doacao
      ));
      return true;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao reservar doação",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Confirmar entrega
  const confirmarEntrega = async (doacaoId: string) => {
    setLoading(true);

    try {
      await doacoesFisicasService.atualizarStatus(doacaoId, 'entregue', user?.id || '');
      
      toast({
        title: "Sucesso",
        description: "Entrega confirmada com sucesso!",
        variant: "default"
      });
      
      // Atualizar a lista local
      setDoacoes(prev => prev.map(doacao => 
        doacao.id === doacaoId 
          ? { ...doacao, status: 'entregue' as const }
          : doacao
      ));
      return true;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao confirmar entrega",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Carregar na inicialização
  useEffect(() => {
    carregarDoacoes();
  }, []);

  return {
    doacoes,
    loading,
    error,
    pagination,
    carregarDoacoes,
    criarDoacao,
    reservarDoacao,
    confirmarEntrega
  };
};
