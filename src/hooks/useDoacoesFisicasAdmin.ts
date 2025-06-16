
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { logAdminAction } from '@/services/adminService';

export function useDoacoesFisicasAdmin() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar todas as doações para admin
  const { data: doacoes = [], isLoading: isLoadingDoacoes } = useQuery({
    queryKey: ['doacoes-fisicas-admin'],
    queryFn: async () => {
      console.log('Buscando doações para admin...');
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categorias_doacoes (
            nome,
            icone,
            cor
          ),
          doadores (
            nome,
            email,
            telefone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar doações para admin:', error);
        throw error;
      }
      console.log('Doações encontradas para admin:', data);
      return data;
    },
  });

  // Buscar categorias
  const { data: categorias = [] } = useQuery({
    queryKey: ['categorias-doacoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categorias_doacoes')
        .select('*')
        .order('nome');

      if (error) throw error;
      return data;
    },
  });

  // Calcular estatísticas com novos status
  const stats = {
    total: doacoes.length,
    cadastrada: doacoes.filter(d => d.status === 'cadastrada').length,
    aceita: doacoes.filter(d => d.status === 'aceita').length,
    recebida: doacoes.filter(d => d.status === 'recebida').length,
    entregue: doacoes.filter(d => d.status === 'entregue').length,
    cancelada: doacoes.filter(d => d.status === 'cancelada').length,
  };

  // Atualizar status da doação
  const updateStatus = useMutation({
    mutationFn: async ({ 
      doacaoId, 
      newStatus, 
      observacoes,
      dadosImpacto
    }: { 
      doacaoId: string; 
      newStatus: string; 
      observacoes?: string;
      dadosImpacto?: {
        tipo_beneficiario?: string;
        pessoas_impactadas?: number;
        localidade_entrega?: string;
        observacoes_impacto?: string;
      };
    }) => {
      console.log('Atualizando status da doação:', { doacaoId, newStatus, observacoes, dadosImpacto });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      // Adicionar campos específicos baseado no status
      if (newStatus === 'aceita') {
        updateData.data_aceita = new Date().toISOString();
        updateData.responsavel_ong_id = user.id;
      } else if (newStatus === 'entregue') {
        updateData.data_entrega = new Date().toISOString();
        
        // Adicionar dados de impacto se fornecidos
        if (dadosImpacto) {
          updateData.tipo_beneficiario = dadosImpacto.tipo_beneficiario;
          updateData.pessoas_impactadas = dadosImpacto.pessoas_impactadas || 1;
          updateData.localidade_entrega = dadosImpacto.localidade_entrega;
          updateData.observacoes_impacto = dadosImpacto.observacoes_impacto;
        }
      }

      // Adicionar observações se fornecidas
      if (observacoes) {
        updateData.observacoes_ong = observacoes;
      }

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .update(updateData)
        .eq('id', doacaoId)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar status:', error);
        throw error;
      }
      
      console.log('Status atualizado:', data);

      // Registrar ação administrativa
      await logAdminAction(
        user.id,
        'update_donation_status',
        'doacao_fisica',
        `Status da doação alterado para: ${newStatus}`,
        doacaoId,
        { oldStatus: data.status, newStatus, observacoes, dadosImpacto }
      );
      
      return data;
    },
    onSuccess: (_, { newStatus }) => {
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas-admin'] });
      
      const statusLabels = {
        aceita: 'aceita',
        recebida: 'recebida',  
        entregue: 'entregue',
        cancelada: 'cancelada'
      };
      
      toast({
        title: "Status atualizado",
        description: `Doação marcada como ${statusLabels[newStatus as keyof typeof statusLabels] || newStatus}.`,
      });
    },
    onError: (error: Error) => {
      console.error('Erro na mutação de status:', error);
      toast({
        title: "Erro",
        description: `Não foi possível atualizar o status: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Deletar doação
  const deleteDonation = useMutation({
    mutationFn: async (doacaoId: string) => {
      console.log('Deletando doação:', doacaoId);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('doacoes_fisicas_novas')
        .delete()
        .eq('id', doacaoId);

      if (error) {
        console.error('Erro ao deletar doação:', error);
        throw error;
      }

      // Registrar ação administrativa
      await logAdminAction(
        user.id,
        'delete_donation',
        'doacao_fisica',
        `Doação deletada permanentemente`,
        doacaoId
      );
      
      return doacaoId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas-admin'] });
      toast({
        title: "Doação deletada",
        description: "A doação foi removida permanentemente do sistema.",
      });
    },
    onError: (error: Error) => {
      console.error('Erro na mutação de delete:', error);
      toast({
        title: "Erro",
        description: `Não foi possível deletar a doação: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Buscar estatísticas de impacto
  const { data: estatisticasImpacto } = useQuery({
    queryKey: ['estatisticas-impacto'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_estatisticas_impacto');

      if (error) {
        console.error('Erro ao buscar estatísticas de impacto:', error);
        throw error;
      }
      
      return data;
    },
  });

  return {
    doacoes,
    categorias,
    loading: loading || isLoadingDoacoes,
    updateStatus: (doacaoId: string, newStatus: string, observacoes?: string, dadosImpacto?: any) =>
      updateStatus.mutate({ doacaoId, newStatus, observacoes, dadosImpacto }),
    deleteDonation: (doacaoId: string) => deleteDonation.mutate(doacaoId),
    isUpdating: updateStatus.isPending,
    isDeleting: deleteDonation.isPending,
    stats,
    estatisticasImpacto,
  };
}
