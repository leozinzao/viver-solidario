
import { supabase } from '@/lib/supabase';
import { validateData, doacaoFisicaSchema, statusDoacaoSchema } from '@/lib/validation';
import { ErrorHandler } from '@/lib/errorHandler';

export interface DoacaoFisica {
  id: string;
  titulo: string;
  descricao?: string;
  categoria_id: string;
  categoria?: {
    nome: string;
  };
  quantidade: number;
  unidade: string;
  status: 'disponivel' | 'reservada' | 'entregue' | 'cancelada';
  endereco_coleta: string;
  observacoes?: string;
  doador_id: string;
  doador?: {
    nome: string;
    email: string;
  };
  reservado_por_id?: string;
  reservado_por?: {
    nome: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export const doacoesFisicasService = {
  // Criar nova doação física
  async criarDoacao(dadosDoacao: any): Promise<DoacaoFisica> {
    // Validar dados
    const validation = validateData(doacaoFisicaSchema, dadosDoacao);
    if (!validation.success) {
      throw new Error('Dados de doação inválidos');
    }

    const { data, error } = await supabase
      .from('doacoes_fisicas')
      .insert([validation.data])
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:profiles(nome, email)
      `)
      .single();

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    return data;
  },

  // Listar doações físicas
  async listarDoacoes(filtros?: {
    status?: string;
    categoria_id?: string;
    doador_id?: string;
  }): Promise<DoacaoFisica[]> {
    let query = supabase
      .from('doacoes_fisicas')
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:profiles(nome, email),
        reservado_por:profiles(nome, email)
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

    const { data, error } = await query;

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    return data || [];
  },

  // Buscar doação por ID
  async buscarPorId(id: string): Promise<DoacaoFisica | null> {
    const { data, error } = await supabase
      .from('doacoes_fisicas')
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:profiles(nome, email),
        reservado_por:profiles(nome, email)
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
      updateData.reservado_por_id = usuarioId;
    } else if (status === 'disponivel') {
      updateData.reservado_por_id = null;
    }

    const { data, error } = await supabase
      .from('doacoes_fisicas')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:profiles(nome, email),
        reservado_por:profiles(nome, email)
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
      .from('doacoes_fisicas')
      .delete()
      .eq('id', id);

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }
  },

  // Listar categorias de doações
  async listarCategorias(): Promise<{ id: string; nome: string }[]> {
    const { data, error } = await supabase
      .from('categorias_doacoes')
      .select('id, nome')
      .order('nome');

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    return data || [];
  }
};
