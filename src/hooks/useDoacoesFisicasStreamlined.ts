
import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export const useDoacoesFisicasStreamlined = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const criarDoacao = useCallback(async (dadosDoacao: any) => {
    if (!user?.id) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer uma doação",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmitting(true);
    console.log('🚀 Hook Streamlined: Iniciando criação de doação');

    try {
      // Preparar dados mínimos e essenciais
      const dadosCompletos = {
        titulo: dadosDoacao.titulo.trim(),
        descricao: dadosDoacao.descricao?.trim() || '',
        categoria_id: dadosDoacao.categoria_id,
        quantidade: Number(dadosDoacao.quantidade),
        unidade: dadosDoacao.unidade || 'unidade',
        localizacao: dadosDoacao.localizacao?.trim() || '',
        endereco_coleta: dadosDoacao.endereco_coleta?.trim() || '',
        tipo_entrega: dadosDoacao.tipo_entrega,
        endereco_entrega: dadosDoacao.endereco_entrega?.trim() || '',
        observacoes: dadosDoacao.observacoes?.trim() || '',
        observacoes_entrega: dadosDoacao.observacoes_entrega?.trim() || '',
        doador_id: user.id, // GARANTIR sempre o ID correto
        status: 'cadastrada'
      };

      console.log('📝 Hook Streamlined: Dados preparados:', dadosCompletos);

      // Inserção direta e eficiente
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
        console.error('❌ Hook Streamlined: Erro na inserção:', error);
        throw new Error(error.message);
      }

      console.log('✅ Hook Streamlined: Doação criada:', data);

      // Invalidar queries específicas para atualização imediata
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

    } catch (error: any) {
      console.error('❌ Hook Streamlined: Erro geral:', error);
      
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro. Tente novamente.",
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
