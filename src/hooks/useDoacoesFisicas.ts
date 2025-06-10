
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export interface DoacaoFisica {
  id: string;
  doador_id?: string;
  categoria_id?: string;
  titulo: string;
  descricao?: string;
  quantidade: number;
  unidade: string;
  localizacao?: string;
  endereco_coleta?: string;
  status: 'cadastrada' | 'aceita' | 'recebida' | 'cancelada';
  data_disponivel?: string;
  data_aceita?: string;
  data_entrega?: string;
  fotos?: string[];
  observacoes?: string;
  observacoes_ong?: string;
  responsavel_ong_id?: string;
  created_at: string;
  updated_at: string;
  categorias_doacoes?: {
    nome: string;
    icone: string;
    cor: string;
  };
}

export interface CategoriaDoacao {
  id: string;
  nome: string;
  descricao?: string;
  icone?: string;
  cor?: string;
}

export function useDoacoesFisicas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar doações do usuário atual
  const { data: minhasDoacoes = [], isLoading: isLoadingDoacoes } = useQuery({
    queryKey: ['minhas-doacoes-fisicas'],
    queryFn: async () => {
      console.log('useDoacoesFisicas: Buscando minhas doações físicas...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('useDoacoesFisicas: Usuário não logado, retornando array vazio');
        return [];
      }

      console.log('useDoacoesFisicas: Usuário logado com ID:', user.id);

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categorias_doacoes!doacoes_fisicas_novas_categoria_id_fkey (
            nome,
            icone,
            cor
          )
        `)
        .eq('doador_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('useDoacoesFisicas: Erro ao buscar minhas doações:', error);
        throw error;
      }
      
      console.log('useDoacoesFisicas: Minhas doações encontradas:', data);
      console.log('useDoacoesFisicas: Quantidade de doações retornadas:', data?.length || 0);
      
      return data as DoacaoFisica[];
    },
  });

  // Buscar categorias
  const { data: categorias = [], isLoading: isLoadingCategorias } = useQuery({
    queryKey: ['categorias-doacoes'],
    queryFn: async () => {
      console.log('useDoacoesFisicas: Buscando categorias...');
      const { data, error } = await supabase
        .from('categorias_doacoes')
        .select('*')
        .order('nome');

      if (error) {
        console.error('useDoacoesFisicas: Erro ao buscar categorias:', error);
        throw error;
      }
      console.log('useDoacoesFisicas: Categorias encontradas:', data);
      return data as CategoriaDoacao[];
    },
  });

  // Criar nova doação
  const createDoacao = useMutation({
    mutationFn: async (doacao: Partial<DoacaoFisica>) => {
      console.log('useDoacoesFisicas: Iniciando criação de doação:', doacao);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('useDoacoesFisicas: Usuário não autenticado');
        throw new Error('Usuário não autenticado');
      }

      console.log('useDoacoesFisicas: ID do usuário para doador_id:', user.id);

      const dadosParaInserir = {
        ...doacao,
        doador_id: user.id, // GARANTIR que sempre seja preenchido
        status: 'cadastrada',
      };

      console.log('useDoacoesFisicas: Dados completos para inserção:', dadosParaInserir);

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .insert([dadosParaInserir])
        .select()
        .single();

      if (error) {
        console.error('useDoacoesFisicas: Erro ao criar doação:', error);
        throw error;
      }
      
      console.log('useDoacoesFisicas: Doação criada com sucesso:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('useDoacoesFisicas: Doação criada, invalidando queries...');
      // Invalidar imediatamente para forçar re-fetch
      queryClient.invalidateQueries({ queryKey: ['minhas-doacoes-fisicas'] });
      toast({
        title: "Sucesso",
        description: "Doação cadastrada com sucesso! A ONG Viver analisará sua doação em breve.",
      });
    },
    onError: (error: Error) => {
      console.error('useDoacoesFisicas: Erro na mutação de criação:', error);
      toast({
        title: "Erro",
        description: `Não foi possível cadastrar a doação: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    minhasDoacoes,
    categorias,
    loading: loading || isLoadingDoacoes || isLoadingCategorias,
    error,
    createDoacao: createDoacao.mutate,
    isCreating: createDoacao.isPending,
  };
}
