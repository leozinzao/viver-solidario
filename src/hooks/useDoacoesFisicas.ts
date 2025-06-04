
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useDoacoesFisicas = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar minhas doações físicas
  const {
    data: minhasDoacoes = [],
    isLoading: isLoadingMinhas,
    error: errorMinhas
  } = useQuery({
    queryKey: ['minhas-doacoes-fisicas', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      console.log('Buscando minhas doações físicas...');
      
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categoria:categorias_doacoes(*)
        `)
        .eq('doador_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar minhas doações:', error);
        throw error;
      }

      console.log('Minhas doações carregadas:', data);
      return data || [];
    },
    enabled: !!user?.id
  });

  // Query para buscar todas as doações físicas
  const {
    data: todasDoacoes = [],
    isLoading: isLoadingTodas,
    error: errorTodas
  } = useQuery({
    queryKey: ['doacoes-fisicas'],
    queryFn: async () => {
      console.log('Buscando todas as doações físicas...');
      
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categoria:categorias_doacoes(*),
          doador:doadores(nome, email),
          reservado_por:doadores!doacoes_fisicas_novas_beneficiario_id_fkey(nome, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar todas as doações:', error);
        throw error;
      }

      console.log('Todas as doações carregadas:', data);
      return data || [];
    }
  });

  // Mutation para reservar doação
  const reservarDoacaoMutation = useMutation({
    mutationFn: async (doacaoId: string) => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .update({
          status: 'reservada',
          beneficiario_id: user.id,
          data_reserva: new Date().toISOString()
        })
        .eq('id', doacaoId)
        .select(`
          *,
          categoria:categorias_doacoes(*),
          doador:doadores(nome, email),
          reservado_por:doadores!doacoes_fisicas_novas_beneficiario_id_fkey(nome, email)
        `)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] });
      queryClient.invalidateQueries({ queryKey: ['minhas-doacoes-fisicas'] });
      toast({
        title: "Doação reservada!",
        description: "A doação foi reservada para você.",
        variant: "default"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao reservar doação",
        description: error.message || "Tente novamente.",
        variant: "destructive"
      });
    }
  });

  return {
    minhasDoacoes,
    todasDoacoes,
    isLoading: isLoadingMinhas || isLoadingTodas,
    error: errorMinhas || errorTodas,
    reservarDoacao: reservarDoacaoMutation.mutate,
    isReservando: reservarDoacaoMutation.isPending
  };
};
