
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
      if (!user?.id) {
        console.log('Hook: Usuário não logado, retornando array vazio');
        return [];
      }
      
      console.log('Hook: Buscando minhas doações físicas para usuário:', user.id);
      
      // Usar relacionamento específico para evitar ambiguidade
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categoria:categorias_doacoes!doacoes_fisicas_novas_categoria_id_fkey(*)
        `)
        .eq('doador_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Hook: Erro ao buscar minhas doações:', error);
        throw error;
      }

      console.log('Hook: Minhas doações encontradas:', data);
      console.log('Hook: Quantidade de doações:', data?.length || 0);
      
      // Log detalhado dos doador_id para debug
      if (data && data.length > 0) {
        data.forEach((doacao, index) => {
          console.log(`Hook: Doação ${index + 1} - ID: ${doacao.id}, doador_id: ${doacao.doador_id}, título: ${doacao.titulo}`);
        });
      } else {
        console.log('Hook: Nenhuma doação encontrada para o usuário:', user.id);
      }

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
      console.log('Hook: Buscando todas as doações físicas...');
      
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categoria:categorias_doacoes!doacoes_fisicas_novas_categoria_id_fkey(*),
          doador:doadores(nome, email),
          reservado_por:doadores!doacoes_fisicas_novas_beneficiario_id_fkey(nome, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Hook: Erro ao buscar todas as doações:', error);
        throw error;
      }

      console.log('Hook: Todas as doações carregadas:', data?.length || 0);
      return data || [];
    }
  });

  // Mutation para reservar doação
  const reservarDoacaoMutation = useMutation({
    mutationFn: async (doacaoId: string) => {
      if (!user?.id) {
        console.error('Hook: Tentativa de reservar sem usuário logado');
        throw new Error('Usuário não autenticado');
      }

      console.log('Hook: Reservando doação:', doacaoId, 'para usuário:', user.id);

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
          categoria:categorias_doacoes!doacoes_fisicas_novas_categoria_id_fkey(*),
          doador:doadores(nome, email),
          reservado_por:doadores!doacoes_fisicas_novas_beneficiario_id_fkey(nome, email)
        `)
        .single();

      if (error) {
        console.error('Hook: Erro ao reservar doação:', error);
        throw error;
      }

      console.log('Hook: Doação reservada com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      console.log('Hook: Invalidando queries após reserva');
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] });
      queryClient.invalidateQueries({ queryKey: ['minhas-doacoes-fisicas'] });
      toast({
        title: "Doação reservada!",
        description: "A doação foi reservada para você.",
        variant: "default"
      });
    },
    onError: (error: any) => {
      console.error('Hook: Erro na mutation de reserva:', error);
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
