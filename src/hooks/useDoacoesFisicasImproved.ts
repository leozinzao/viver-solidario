
import { useState, useEffect } from 'react';
import { DoacoesFisicasService, DoacaoFisica } from '@/services/doacoesFisicasService';
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
      const resultado = await DoacoesFisicasService.listarDoacoes(filtros);
      
      if (resultado.success) {
        setDoacoes(resultado.data);
        setPagination(resultado.pagination);
      } else {
        setError(resultado.error);
        toast({
          title: "Erro",
          description: resultado.error,
          variant: "destructive"
        });
      }
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
      const resultado = await DoacoesFisicasService.criarDoacao(dadosDoacao, user.id);
      
      if (resultado.success) {
        toast({
          title: "Sucesso",
          description: resultado.message,
          variant: "default"
        });
        
        // Recarregar a lista
        await carregarDoacoes();
        return true;
      } else {
        toast({
          title: "Erro",
          description: resultado.error,
          variant: "destructive"
        });
        return false;
      }
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
      const resultado = await DoacoesFisicasService.atualizarStatus(doacaoId, 'reservada', user.id);
      
      if (resultado.success) {
        toast({
          title: "Sucesso",
          description: "Doação reservada com sucesso!",
          variant: "default"
        });
        
        // Atualizar a lista local
        setDoacoes(prev => prev.map(doacao => 
          doacao.id === doacaoId 
            ? { ...doacao, status: 'reservada', beneficiario_id: user.id }
            : doacao
        ));
        return true;
      } else {
        toast({
          title: "Erro", 
          description: resultado.error,
          variant: "destructive"
        });
        return false;
      }
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
      const resultado = await DoacoesFisicasService.atualizarStatus(doacaoId, 'entregue', user?.id || '');
      
      if (resultado.success) {
        toast({
          title: "Sucesso",
          description: "Entrega confirmada com sucesso!",
          variant: "default"
        });
        
        // Atualizar a lista local
        setDoacoes(prev => prev.map(doacao => 
          doacao.id === doacaoId 
            ? { ...doacao, status: 'entregue' }
            : doacao
        ));
        return true;
      } else {
        toast({
          title: "Erro",
          description: resultado.error,
          variant: "destructive"
        });
        return false;
      }
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
