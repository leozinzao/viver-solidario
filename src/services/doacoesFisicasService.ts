
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
    // Validar dados básicos
    const validation = validateData(doacaoFisicaSchema, {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: dadosDoacao.quantidade,
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta,
      observacoes: dadosDoacao.observacoes
    });
    
    if (!validation.success) {
      throw new Error('Dados de doação inválidos');
    }

    // Preparar dados para inserção - usar apenas campos que existem na tabela
    const dadosParaInserir = {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: Number(dadosDoacao.quantidade),
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta,
      observacoes: dadosDoacao.observacoes,
      doador_id: dadosDoacao.doador_id,
      localizacao: dadosDoacao.localizacao,
      status: 'disponivel'
    };

    console.log('Dados para inserir:', dadosParaInserir);

    const { data, error } = await supabase
      .from('doacoes_fisicas_novas')
      .insert([dadosParaInserir])
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:doadores(nome, email)
      `)
      .single();

    if (error) {
      console.error('Erro ao criar doação:', error);
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
      .from('doacoes_fisicas_novas')
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:doadores(nome, email),
        reservado_por:doadores(nome, email)
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
      .from('doacoes_fisicas_novas')
      .select(`
        *,
        categoria:categorias_doacoes(nome),
        doador:doadores(nome, email),
        reservado_por:doadores(nome, email)
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
        categoria:categorias_doacoes(nome),
        doador:doadores(nome, email),
        reservado_por:doadores(nome, email)
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
