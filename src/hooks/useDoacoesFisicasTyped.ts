
import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  DadosDoacaoForm, 
  DadosDoacaoCompleta, 
  DoacaoComRelacoes,
  ResultadoCriacaoDoacao 
} from '@/types/doacaoForm';

export const useDoacoesFisicasTyped = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const criarDoacao = useCallback(async (dadosDoacao: DadosDoacaoForm): Promise<boolean> => {
    if (!user?.id) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer uma doação",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmitting(true);
    console.log('🚀 Hook Typed: Iniciando criação de doação');

    try {
      // Preparar dados com tipagem forte
      const dadosCompletos: Omit<DadosDoacaoCompleta, 'id' | 'created_at' | 'updated_at'> = {
        titulo: dadosDoacao.titulo.trim(),
        descricao: dadosDoacao.descricao?.trim() || '',
        categoria_id: dadosDoacao.categoria_id,
        quantidade: Number(dadosDoacao.quantidade),
        unidade: dadosDoacao.unidade,
        localizacao: dadosDoacao.localizacao?.trim() || '',
        endereco_coleta: dadosDoacao.endereco_coleta?.trim() || '',
        tipo_entrega: dadosDoacao.tipo_entrega,
        endereco_entrega: dadosDoacao.endereco_entrega?.trim() || '',
        observacoes: dadosDoacao.observacoes?.trim() || '',
        observacoes_entrega: dadosDoacao.observacoes_entrega?.trim() || '',
        doador_id: user.id,
        status: 'cadastrada'
      };

      console.log('📝 Hook Typed: Dados preparados:', dadosCompletos);

      // Inserção com tipagem específica
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .insert([dadosCompletos])
        .select(`
          *,
          categoria:categorias_doacoes(nome, cor, icone),
          doador:doadores(nome, email)
        `)
        .single();

      if (error) {
        console.error('❌ Hook Typed: Erro na inserção:', error);
        throw new Error(error.message);
      }

      console.log('✅ Hook Typed: Doação criada:', data);

      // Invalidar queries com tipagem
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['minhas-doacoes-fisicas'] }),
        queryClient.invalidateQueries({ queryKey: ['doacoes-fisicas'] }),
        queryClient.invalidateQueries({ queryKey: ['estatisticas-doacoes'] })
      ]);

      toast({
        title: "🎉 Doação cadastrada!",
        description: "Sua doação foi registrada. A ONG Viver entrará em contato em breve.",
        variant: "default"
      });

      return true;

    } catch (error: unknown) {
      console.error('❌ Hook Typed: Erro geral:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Ocorreu um erro desconhecido. Tente novamente.";
      
      toast({
        title: "Erro ao cadastrar",
        description: errorMessage,
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [user, toast, queryClient]);

  return {
    criarDoacao,
    isSubmitting
  };
};
