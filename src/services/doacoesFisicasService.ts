
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
    cor?: string;
    icone?: string;
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
  data_entrega?: string;
  data_reserva?: string;
  created_at: string;
  updated_at: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  cor?: string;
  icone?: string;
}

export const doacoesFisicasService = {
  // Criar nova doação física
  async criarDoacao(dadosDoacao: any): Promise<DoacaoFisica> {
    console.log('Service: Dados recebidos para criação:', dadosDoacao);

    // Validar dados básicos
    const dadosParaValidacao = {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: dadosDoacao.quantidade,
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta,
      observacoes: dadosDoacao.observacoes
    };

    console.log('Service: Dados para validação:', dadosParaValidacao);

    const validation = validateData(doacaoFisicaSchema, dadosParaValidacao);
    
    if (!validation.success) {
      console.error('Service: Erro de validação:', validation);
      throw new Error(`Dados de doação inválidos: ${validation.error}`);
    }

    // Preparar dados para inserção
    const dadosParaInserir = {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao || null,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: Number(dadosDoacao.quantidade),
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta || null,
      tipo_entrega: dadosDoacao.tipo_entrega || 'retirada',
      endereco_entrega: dadosDoacao.endereco_entrega || null,
      observacoes: dadosDoacao.observacoes || null,
      observacoes_entrega: dadosDoacao.observacoes_entrega || null,
      doador_id: dadosDoacao.doador_id,
      localizacao: dadosDoacao.localizacao || null,
      status: 'disponivel'
    };

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
  async listarDoacoes(filtros?: {
    status?: string;
    categoria_id?: string;
    doador_id?: string;
    page?: number;
    limit?: number;
  }): Promise<DoacaoFisica[]> {
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
  },

  // Listar categorias de doações
  async listarCategorias(): Promise<Categoria[]> {
    const { data, error } = await supabase
      .from('categorias_doacoes')
      .select('id, nome, descricao, cor, icone')
      .order('nome');

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    return data || [];
  },

  // Contar doações por status
  async contarDoacoesPorStatus(doadorId?: string): Promise<{
    total: number;
    disponivel: number;
    reservada: number;
    entregue: number;
    cancelada: number;
  }> {
    let query = supabase
      .from('doacoes_fisicas_novas')
      .select('status');

    if (doadorId) {
      query = query.eq('doador_id', doadorId);
    }

    const { data, error } = await query;

    if (error) {
      throw ErrorHandler.handleApiError(error);
    }

    const contadores = {
      total: data?.length || 0,
      disponivel: 0,
      reservada: 0,
      entregue: 0,
      cancelada: 0
    };

    data?.forEach(item => {
      if (item.status in contadores) {
        contadores[item.status as keyof typeof contadores]++;
      }
    });

    return contadores;
  }
};
