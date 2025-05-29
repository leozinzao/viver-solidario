
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export interface DoacaoFisica {
  id: string;
  doador_id?: string;
  beneficiario_id?: string;
  categoria_id?: string;
  titulo: string;
  descricao?: string;
  quantidade: number;
  unidade: string;
  localizacao?: string;
  endereco_coleta?: string;
  status: 'disponivel' | 'reservado' | 'em_transito' | 'entregue' | 'cancelado';
  data_disponivel?: string;
  data_reserva?: string;
  data_entrega?: string;
  fotos?: string[];
  observacoes?: string;
  avaliacao_doador?: number;
  avaliacao_beneficiario?: number;
  comentario_avaliacao?: string;
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

  // Buscar todas as doações disponíveis
  const { data: doacoes = [], isLoading: isLoadingDoacoes } = useQuery({
    queryKey: ['doacoes-fisicas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categorias_doacoes (
            nome,
            icone,
            cor
          )
        `)
        .eq('status', 'disponivel')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DoacaoFisica[];
    },
  });

  // Buscar categorias
  const { data: categorias = [], isLoading: isLoadingCategorias } = useQuery({
    queryKey: ['categorias-doacoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categorias_doacoes')
        .select('*')
        .order('nome');

      if (error) throw error;
      return data as CategoriaDoacao[];
    },
  });

  // Criar nova doação
  const createDoacao = useMutation({
    mutationFn: async (doacao: Partial<DoacaoFisica>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .insert([{
          ...doacao,
          doador_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] });
      toast({
        title: "Sucesso",
        description: "Doação cadastrada com sucesso!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: `Não foi possível cadastrar a doação: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Reservar doação
  const reservarDoacao = useMutation({
    mutationFn: async (doacaoId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .update({
          beneficiario_id: user.id,
          status: 'reservado',
          data_reserva: new Date().toISOString(),
        })
        .eq('id', doacaoId)
        .eq('status', 'disponivel')
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] });
      toast({
        title: "Sucesso",
        description: "Doação reservada com sucesso!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: `Não foi possível reservar a doação: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Confirmar entrega
  const confirmarEntrega = useMutation({
    mutationFn: async (doacaoId: string) => {
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .update({
          status: 'entregue',
          data_entrega: new Date().toISOString(),
        })
        .eq('id', doacaoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] });
      toast({
        title: "Sucesso",
        description: "Entrega confirmada com sucesso!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: `Não foi possível confirmar a entrega: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    doacoes,
    categorias,
    loading: loading || isLoadingDoacoes || isLoadingCategorias,
    error,
    createDoacao: createDoacao.mutate,
    reservarDoacao: reservarDoacao.mutate,
    confirmarEntrega: confirmarEntrega.mutate,
    isCreating: createDoacao.isPending,
    isReserving: reservarDoacao.isPending,
    isConfirming: confirmarEntrega.isPending,
  };
}
