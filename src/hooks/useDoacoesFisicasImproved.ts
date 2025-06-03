
import { useState, useCallback } from 'react';
import { doacoesFisicasService } from '@/services/doacoesFisicasService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const useDoacoesFisicasImproved = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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
      console.log('Hook Improved: Criando doação com dados:', dadosDoacao);
      
      // Garantir que os dados essenciais estão presentes
      const dadosCompletos = {
        ...dadosDoacao,
        doador_id: user.id,
        titulo: dadosDoacao.titulo?.trim() || 'Doação sem título',
        quantidade: Number(dadosDoacao.quantidade) || 1,
        unidade: dadosDoacao.unidade || 'unidade',
        tipo_entrega: dadosDoacao.tipo_entrega || 'retirada',
        status: 'disponivel'
      };

      console.log('Hook Improved: Dados preparados:', dadosCompletos);
      
      const novaDoacao = await doacoesFisicasService.criarDoacao(dadosCompletos);
      console.log('Hook Improved: Doação criada:', novaDoacao);
      
      toast({
        title: "Sucesso",
        description: "Doação criada com sucesso!",
        variant: "default"
      });
      
      return true;
    } catch (err: any) {
      console.error('Hook Improved: Erro ao criar doação:', err);
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
  }, [user, toast]);

  return {
    criarDoacao,
    loading
  };
};
