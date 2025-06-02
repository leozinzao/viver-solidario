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
      console.log('Hook: Carregando doações com filtros:', filtros);
      const doacoesList = await doacoesFisicasService.listarDoacoes(filtros);
      console.log('Hook: Doações carregadas:', doacoesList);
      setDoacoes(doacoesList);
      
      // Simular paginação básica
      setPagination({
        page: filtros?.page || 1,
        limit: filtros?.limit || 10,
        total: doacoesList.length,
        pages: Math.ceil(doacoesList.length / (filtros?.limit || 10))
      });
    } catch (err: any) {
      console.error('Hook: Erro ao carregar doações:', err);
      const errorMessage = err?.message || 'Erro ao carregar doações';
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
      console.log('Hook: Criando doação com dados:', dadosDoacao);
      
      // Preparar dados com validações extras
      const dadosCompletos = {
        ...dadosDoacao,
        doador_id: user.id,
        // Garantir que campos obrigatórios estejam presentes
        titulo: dadosDoacao.titulo?.trim(),
        categoria_id: dadosDoacao.categoria_id,
        quantidade: Number(dadosDoacao.quantidade) || 1,
        unidade: dadosDoacao.unidade || 'unidade',
        tipo_entrega: dadosDoacao.tipo_entrega || 'retirada'
      };

      // Validar campos obrigatórios
      if (!dadosCompletos.titulo) {
        throw new Error('Título é obrigatório');
      }
      
      if (!dadosCompletos.categoria_id) {
        throw new Error('Categoria é obrigatória');
      }

      // Validar endereços baseado no tipo de entrega
      if (dadosCompletos.tipo_entrega === 'retirada' && !dadosCompletos.endereco_coleta?.trim()) {
        throw new Error('Endereço para retirada é obrigatório');
      }
      
      if (dadosCompletos.tipo_entrega === 'entrega_doador' && !dadosCompletos.endereco_entrega?.trim()) {
        throw new Error('Endereço de entrega é obrigatório');
      }

      console.log('Hook: Dados preparados para envio:', dadosCompletos);
      
      const novaDoacao = await doacoesFisicasService.criarDoacao(dadosCompletos);
      
      console.log('Hook: Doação criada com sucesso:', novaDoacao);
      
      toast({
        title: "Sucesso",
        description: "Doação criada com sucesso!",
        variant: "default"
      });
      
      // Recarregar a lista
      await carregarDoacoes();
      return true;
    } catch (err: any) {
      console.error('Hook: Erro ao criar doação:', err);
      const errorMessage = err?.message || 'Erro ao criar doação. Verifique os dados e tente novamente.';
      toast({
        title: "Erro",
        description: errorMessage,
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
          ? { ...doacao, status: 'reservada' as const, beneficiario_id: user.id }
          : doacao
      ));
      return true;
    } catch (err) {
      console.error('Erro ao reservar doação:', err);
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
      console.error('Erro ao confirmar entrega:', err);
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
