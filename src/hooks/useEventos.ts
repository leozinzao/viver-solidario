
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

export interface Evento {
  id: string;
  titulo: string;
  resumo?: string | null;
  link?: string | null;
  data_inicio?: string | null;
  data_fim?: string | null;
  criado_em?: string;
  local?: string | null;
  participantes_max?: number | null;
  inscritos?: number | null;
  imagem_url?: string | null;
}

type NovoEvento = Omit<Evento, 'id' | 'criado_em'>;

export const useEventos = (options?: { 
  enabled?: boolean;
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}) => {
  const queryClient = useQueryClient();
  
  // Configurações padrão
  const limit = options?.limit || 10;
  const page = options?.page || 1;
  const orderBy = options?.orderBy || 'data_inicio';
  const orderDirection = options?.orderDirection || 'desc';
  const enabled = options?.enabled !== false;
  
  // Calcula o offset para paginação
  const offset = (page - 1) * limit;
  
  // Query para buscar eventos
  const eventosQuery = useQuery({
    queryKey: ['eventos', { page, limit, orderBy, orderDirection }],
    queryFn: async () => {
      try {
        const query = supabase
          .from('eventos')
          .select('*', { count: 'exact' })
          .order(orderBy, { ascending: orderDirection === 'asc' })
          .range(offset, offset + limit - 1);
        
        const { data, error, count } = await query;
        
        if (error) throw error;
        
        return {
          eventos: data as Evento[],
          total: count || 0,
          pageCount: count ? Math.ceil(count / limit) : 0,
          currentPage: page
        };
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        throw error;
      }
    },
    enabled
  });
  
  // Mutation para criar evento
  const criarEventoMutation = useMutation({
    mutationFn: async (novoEvento: NovoEvento) => {
      const { data, error } = await supabase
        .from('eventos')
        .insert([novoEvento])
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Evento;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      toast({
        title: "Evento criado",
        description: "O evento foi criado com sucesso!"
      });
    },
    onError: (error) => {
      console.error('Erro ao criar evento:', error);
      toast({
        title: "Erro ao criar evento",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao criar o evento",
        variant: "destructive"
      });
    }
  });
  
  // Mutation para atualizar evento
  const atualizarEventoMutation = useMutation({
    mutationFn: async ({ id, ...dadosEvento }: { id: string } & Partial<Evento>) => {
      const { data, error } = await supabase
        .from('eventos')
        .update(dadosEvento)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Evento;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({ queryKey: ['eventos', variables.id] });
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso!"
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar evento:', error);
      toast({
        title: "Erro ao atualizar evento",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao atualizar o evento",
        variant: "destructive"
      });
    }
  });
  
  // Mutation para excluir evento
  const excluirEventoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({ queryKey: ['eventos', id] });
      toast({
        title: "Evento excluído",
        description: "O evento foi excluído com sucesso!"
      });
    },
    onError: (error) => {
      console.error('Erro ao excluir evento:', error);
      toast({
        title: "Erro ao excluir evento",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao excluir o evento",
        variant: "destructive"
      });
    }
  });
  
  // Query para buscar um evento específico
  const useEvento = (id?: string) => {
    return useQuery({
      queryKey: ['eventos', id],
      queryFn: async () => {
        if (!id) return null;
        
        const { data, error } = await supabase
          .from('eventos')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        return data as Evento;
      },
      enabled: !!id
    });
  };
  
  return {
    eventosQuery,
    useEvento,
    criarEvento: criarEventoMutation.mutate,
    atualizarEvento: atualizarEventoMutation.mutate,
    excluirEvento: excluirEventoMutation.mutate,
    carregandoCriar: criarEventoMutation.isPending,
    carregandoAtualizar: atualizarEventoMutation.isPending,
    carregandoExcluir: excluirEventoMutation.isPending
  };
};
