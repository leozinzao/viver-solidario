
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
  tipo_entrega: 'retirada' | 'entrega_doador';
  endereco_entrega?: string;
  observacoes?: string;
  observacoes_entrega?: string;
  doador_id: string;
  doador?: {
    nome: string;
    email: string;
  };
  beneficiario_id?: string;
  reservado_por?: {
    nome: string;
    email: string;
  };
  localizacao?: string;
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

    // Preparar dados para inserção
    const dadosParaInserir = {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao || null,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: Number(dadosDoacao.quantidade),
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta,
      tipo_entrega: dadosDoacao.tipo_entrega || 'retirada',
      endereco_entrega: dadosDoacao.endereco_entrega || null,
      observacoes: dadosDoacao.observacoes || null,
      observacoes_entrega: dadosDoacao.observacoes_entrega || null,
      doador_id: dadosDoacao.doador_id,
      localizacao: dadosDoacao.localizacao || null,
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
        reservado_por:doadores!beneficiario_id(nome, email)
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
      console.error('Erro ao listar doações:', error);
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
        reservado_por:doadores!beneficiario_id(nome, email)
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
        reservado_por:doadores!beneficiario_id(nome, email)
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
