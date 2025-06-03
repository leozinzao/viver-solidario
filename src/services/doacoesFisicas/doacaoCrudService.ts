
import { supabase } from '@/lib/supabase';
import { ErrorHandler } from '@/lib/errorHandler';
import { validateData, statusDoacaoSchema } from '@/lib/validation';
import type { DoacaoFisica, FiltrosDoacoes } from '@/types/doacoesFisicas';

export const doacaoCrudService = {
  // Criar nova doação física
  async criarDoacao(dadosParaInserir: any): Promise<DoacaoFisica> {
    console.log('Service: Dados preparados para inserção:', dadosParaInserir);

    try {
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .insert([dadosParaInserir])
        .select(`
          *,
          categoria:categorias_doacoes(*),
          doador:doacoes_fisicas_novas_doador_fkey(nome, email)
        `)
        .single();

      if (error) {
        console.error('Service: Erro do Supabase:', error);
        throw new Error(`Erro do banco de dados: ${error.message}`);
      }

      console.log('Service: Doação criada com sucesso:', data);
      return data;
    } catch (err) {
      console.error('Service: Erro na execução:', err);
      throw err;
    }
  },

  // Listar doações físicas
  async listarDoacoes(filtros?: FiltrosDoacoes): Promise<DoacaoFisica[]> {
    console.log('Service: Carregando doações com filtros:', filtros);

    try {
      let query = supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categoria:categorias_doacoes(*),
          doador:doacoes_fisicas_novas_doador_fkey(nome, email),
          reservado_por:doacoes_fisicas_novas_beneficiario_fkey(nome, email)
        `)
        .order('created_at', { ascending: false });

      if (filtros?.status) {
        query = query.eq('status', filtros.status);
      }

      if (filtros?.categoria_id) {
        query = query.eq('categoria_id', filtros.categoria_id);
      }

      if (filtros?.doador_id) {
        query = query.eq('doador_id', filtros.doador_id);
      }

      // Implementar paginação
      if (filtros?.page && filtros?.limit) {
        const from = (filtros.page - 1) * filtros.limit;
        const to = from + filtros.limit - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Service: Erro ao listar doações:', error);
        throw new Error(`Erro ao carregar doações: ${error.message}`);
      }

      console.log('Service: Doações carregadas:', data);
      return data || [];
    } catch (err) {
      console.error('Service: Erro na listagem:', err);
      throw err;
    }
  },

  // Buscar doação por ID
  async buscarPorId(id: string): Promise<DoacaoFisica | null> {
    const { data, error } = await supabase
      .from('doacoes_fisicas_novas')
      .select(`
        *,
        categoria:categorias_doacoes(*),
        doador:doacoes_fisicas_novas_doador_fkey(nome, email),
        reservado_por:doacoes_fisicas_novas_beneficiario_fkey(nome, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw ErrorHandler.handleApiError(error);
    }

    return data;
  },

  // Atualizar status da doação
  async atualizarStatus(id: string, status: string, usuarioId?: string): Promise<DoacaoFisica> {
    // Validar status
    const validation = validateData(statusDoacaoSchema, { status });
    if (!validation.success) {
      throw new Error('Status inválido');
    }

    const updateData: any = { status };
    
    if (status === 'reservada' && usuarioId) {
      updateData.beneficiario_id = usuarioId;
      updateData.data_reserva = new Date().toISOString();
    } else if (status === 'disponivel') {
      updateData.beneficiario_id = null;
      updateData.data_reserva = null;
    } else if (status === 'entregue') {
      updateData.data_entrega = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('doacoes_fisicas_novas')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        categoria:categorias_doacoes(*),
        doador:doacoes_fisicas_novas_doador_fkey(nome, email),
        reservado_por:doacoes_fisicas_novas_beneficiario_fkey(nome, email)
      `)
      .single();

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    return data;
  },

  // Excluir doação
  async excluirDoacao(id: string): Promise<void> {
    const { error } = await supabase
      .from('doacoes_fisicas_novas')
      .delete()
      .eq('id', id);

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }
  }
};
