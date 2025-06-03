
import { useState, useEffect, useCallback } from 'react';
import { doacoesFisicasService, DoacaoFisica, Categoria } from '@/services/doacoesFisicasService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface UseDoacoesFisicasProps {
  filtrosIniciais?: {
    status?: string;
    categoria_id?: string;
    page?: number;
    limit?: number;
  };
}

export const useDoacoesFisicasRefactored = (props?: UseDoacoesFisicasProps) => {
  const [doacoes, setDoacoes] = useState<DoacaoFisica[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: props?.filtrosIniciais?.page || 1,
    limit: props?.filtrosIniciais?.limit || 10,
    total: 0,
    pages: 0
  });
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    disponivel: 0,
    reservada: 0,
    entregue: 0,
    cancelada: 0
  });
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Carregar categorias
  const carregarCategorias = useCallback(async () => {
    try {
      console.log('Carregando categorias...');
      const categoriasData = await doacoesFisicasService.listarCategorias();
      console.log('Categorias carregadas:', categoriasData);
      setCategorias(categoriasData);
    } catch (err: any) {
      console.error('Erro ao carregar categorias:', err);
    }
  }, []);

  // Carregar estatísticas
  const carregarEstatisticas = useCallback(async (doadorId?: string) => {
    try {
      console.log('Carregando estatísticas para doador:', doadorId);
      const stats = await doacoesFisicasService.contarDoacoesPorStatus(doadorId);
      console.log('Estatísticas carregadas:', stats);
      setEstatisticas(stats);
    } catch (err: any) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  }, []);

  // Carregar doações com filtros
  const carregarDoacoes = useCallback(async (filtros?: {
    status?: string;
    categoria_id?: string;
    doador_id?: string;
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
      
      setPagination(prev => ({
        ...prev,
        page: filtros?.page || 1,
        limit: filtros?.limit || 10,
        total: doacoesList.length,
        pages: Math.ceil(doacoesList.length / (filtros?.limit || 10))
      }));
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
  }, [toast]);

  // Criar nova doação
  const criarDoacao = useCallback(async (dadosDoacao: any) => {
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
      
      const dadosCompletos = {
        ...dadosDoacao,
        doador_id: user.id,
        titulo: dadosDoacao.titulo?.trim(),
        categoria_id: dadosDoacao.categoria_id,
        quantidade: Number(dadosDoacao.quantidade) || 1,
        unidade: dadosDoacao.unidade || 'unidade',
        tipo_entrega: dadosDoacao.tipo_entrega || 'retirada'
      };

      // Validações
      if (!dadosCompletos.titulo) {
        throw new Error('Título é obrigatório');
      }
      
      if (!dadosCompletos.categoria_id) {
        throw new Error('Categoria é obrigatória');
      }

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
      
      // Recarregar dados
      await Promise.all([
        carregarDoacoes({ doador_id: user.id }),
        carregarEstatisticas(user.id)
      ]);
      
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
  }, [user, toast, carregarDoacoes, carregarEstatisticas]);

  // Reservar doação
  const reservarDoacao = useCallback(async (doacaoId: string) => {
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
      
      // Atualizar lista local
      setDoacoes(prev => prev.map(doacao => 
        doacao.id === doacaoId 
          ? { ...doacao, status: 'reservada' as const, beneficiario_id: user.id }
          : doacao
      ));
      
      return true;
    } catch (err: any) {
      console.error('Erro ao reservar doação:', err);
      toast({
        title: "Erro",
        description: err?.message || "Erro ao reservar doação",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Confirmar entrega
  const confirmarEntrega = useCallback(async (doacaoId: string) => {
    setLoading(true);

    try {
      await doacoesFisicasService.atualizarStatus(doacaoId, 'entregue', user?.id || '');
      
      toast({
        title: "Sucesso",
        description: "Entrega confirmada com sucesso!",
        variant: "default"
      });
      
      // Atualizar lista local
      setDoacoes(prev => prev.map(doacao => 
        doacao.id === doacaoId 
          ? { ...doacao, status: 'entregue' as const }
          : doacao
      ));
      
      return true;
    } catch (err: any) {
      console.error('Erro ao confirmar entrega:', err);
      toast({
        title: "Erro",
        description: err?.message || "Erro ao confirmar entrega",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Inicialização
  useEffect(() => {
    const inicializar = async () => {
      console.log('Inicializando hook com usuário:', user);
      await carregarCategorias();
      
      if (user) {
        await Promise.all([
          carregarDoacoes(props?.filtrosIniciais || { doador_id: user.id }),
          carregarEstatisticas(user.id)
        ]);
      }
    };

    inicializar();
  }, [user, carregarCategorias, carregarDoacoes, carregarEstatisticas, props?.filtrosIniciais]);

  return {
    // Estados
    doacoes,
    categorias,
    loading,
    error,
    pagination,
    estatisticas,
    
    // Ações
    carregarDoacoes,
    carregarCategorias,
    carregarEstatisticas,
    criarDoacao,
    reservarDoacao,
    confirmarEntrega
  };
};
