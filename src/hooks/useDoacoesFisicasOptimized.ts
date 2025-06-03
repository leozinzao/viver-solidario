
import { useState, useCallback } from 'react';
import { doacoesFisicasService } from '@/services/doacoesFisicasService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const useDoacoesFisicasOptimized = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const criarDoacao = useCallback(async (dadosDoacao: any) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer uma doação",
        variant: "destructive"
      });
      return false;
    }

    setSubmitting(true);

    try {
      console.log('Hook Optimized: Criando doação com dados:', dadosDoacao);
      
      // Preparar dados completos
      const dadosCompletos = {
        ...dadosDoacao,
        doador_id: user.id,
        titulo: dadosDoacao.titulo?.trim(),
        quantidade: Number(dadosDoacao.quantidade) || 1,
        unidade: dadosDoacao.unidade || 'unidade',
        status: 'disponivel'
      };

      console.log('Hook Optimized: Dados preparados:', dadosCompletos);
      
      const novaDoacao = await doacoesFisicasService.criarDoacao(dadosCompletos);
      console.log('Hook Optimized: Doação criada:', novaDoacao);
      
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
  }, [user, toast]);

  return {
    criarDoacao,
    loading,
    submitting
  };
};
