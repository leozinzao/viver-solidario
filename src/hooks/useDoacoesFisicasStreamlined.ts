
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
      console.error('Hook Streamlined: Tentativa de criar doação sem usuário logado');
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer uma doação",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmitting(true);
    console.log('🚀 Hook Streamlined: Iniciando criação de doação para usuário:', user.id);
    console.log('📝 Hook Streamlined: Dados recebidos:', dadosDoacao);

    try {
      // Preparar dados mínimos e essenciais - GARANTINDO que doador_id sempre seja preenchido
      const dadosCompletos = {
        titulo: dadosDoacao.titulo?.trim() || '',
        descricao: dadosDoacao.descricao?.trim() || '',
        categoria_id: dadosDoacao.categoria_id,
        quantidade: Number(dadosDoacao.quantidade) || 1,
        unidade: dadosDoacao.unidade || 'unidade',
        localizacao: dadosDoacao.localizacao?.trim() || '',
        endereco_coleta: dadosDoacao.endereco_coleta?.trim() || '',
        tipo_entrega: dadosDoacao.tipo_entrega || 'retirada',
        endereco_entrega: dadosDoacao.endereco_entrega?.trim() || '',
        observacoes: dadosDoacao.observacoes?.trim() || '',
        observacoes_entrega: dadosDoacao.observacoes_entrega?.trim() || '',
        doador_id: user.id, // <- ESSENCIAL! Sempre garantir que está preenchido
        status: 'cadastrada'
      };

      // Validação essencial
      if (!dadosCompletos.titulo) {
        throw new Error('Título da doação é obrigatório');
      }
      
      if (!dadosCompletos.categoria_id) {
        throw new Error('Categoria é obrigatória');
      }

      console.log('📝 Hook Streamlined: Dados preparados (com doador_id garantido):', dadosCompletos);
      console.log('🔍 Hook Streamlined: Confirmando doador_id:', dadosCompletos.doador_id);

      // Inserção com select específico para evitar erro de relacionamento
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .insert([dadosCompletos])
        .select(`
          *,
          categoria:categorias_doacoes!doacoes_fisicas_novas_categoria_id_fkey(nome, cor, icone),
          doador:doadores!doacoes_fisicas_novas_doador_id_fkey(nome, email)
        `)
        .single();

      if (error) {
        console.error('❌ Hook Streamlined: Erro na inserção:', error);
        throw new Error(error.message);
      }

      console.log('✅ Hook Streamlined: Doação criada com sucesso:', data);
      console.log('🔍 Hook Streamlined: Verificando doador_id salvo:', data.doador_id);

      // Invalidar queries específicas para atualização imediata
      console.log('🔄 Hook Streamlined: Invalidando queries...');
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
