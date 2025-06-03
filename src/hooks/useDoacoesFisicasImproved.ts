
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
      console.log('Hook: Criando doação com dados:', dadosDoacao);
      
      await doacoesFisicasService.criarDoacao(dadosDoacao);
      
      toast({
        title: "Sucesso",
        description: "Doação criada com sucesso!",
        variant: "default"
      });
      
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
  }, [user, toast]);

  return {
    criarDoacao,
    loading
  };
};
