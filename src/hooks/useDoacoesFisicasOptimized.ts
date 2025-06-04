
import { useState, useCallback } from 'react';
import { doacoesFisicasService } from '@/services/doacoesFisicasService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';

export const useDoacoesFisicasOptimized = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const criarDoacao = useCallback(async (dadosDoacao: any) => {
    if (!user) {
      console.error('Hook Optimized: Usuário não logado');
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer uma doação",
        variant: "destructive"
      });
      return false;
    }

    setSubmitting(true);

    try {
      console.log('Hook Optimized: Iniciando criação de doação para usuário:', user.id);
      console.log('Hook Optimized: Dados recebidos:', dadosDoacao);
      
      // Preparar dados completos garantindo que o doador_id está correto
      const dadosCompletos = {
        ...dadosDoacao,
        doador_id: user.id, // GARANTIR que sempre seja o ID do usuário logado
        titulo: dadosDoacao.titulo?.trim(),
        quantidade: Number(dadosDoacao.quantidade) || 1,
        unidade: dadosDoacao.unidade || 'unidade',
        status: 'cadastrada', // Status inicial sempre cadastrada
        telefone_doador: dadosDoacao.telefone,
        email_doador: dadosDoacao.email
      };

      console.log('Hook Optimized: Dados preparados para inserção:', dadosCompletos);
      
      const novaDoacao = await doacoesFisicasService.criarDoacao(dadosCompletos);
      console.log('Hook Optimized: Doação criada com sucesso:', novaDoacao);
      
      // Invalidar todas as queries relacionadas para forçar atualização
      await queryClient.invalidateQueries({ queryKey: ['minhas-doacoes-fisicas'] });
      await queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] });
      
      toast({
        title: "Doação cadastrada! 🎉",
        description: "Sua doação foi registrada com sucesso. A ONG Viver entrará em contato em breve.",
        variant: "default"
      });
      
      return true;
    } catch (err: any) {
      console.error('Hook Optimized: Erro ao criar doação:', err);
      const errorMessage = err?.message || 'Erro ao cadastrar doação. Tente novamente.';
      toast({
        title: "Erro ao cadastrar",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [user, toast, queryClient]);

  return {
    criarDoacao,
    loading,
    submitting
  };
};
