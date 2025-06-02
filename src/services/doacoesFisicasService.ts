
import { supabase } from '@/lib/supabase';
import { validateData, doacaoFisicaSchema, statusDoacaoSchema } from '@/lib/validation';
import { STATUS_DOACAO, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

export interface DoacaoFisica {
  id: string;
  titulo: string;
  descricao?: string;
  categoria_id: string;
  quantidade: number;
  unidade: string;
  endereco_coleta: string;
  status: string;
  doador_id: string;
  beneficiario_id?: string;
  observacoes?: string;
  fotos?: string[];
  data_disponivel: string;
  data_reserva?: string;
  data_entrega?: string;
  created_at: string;
  updated_at: string;
}

export class DoacoesFisicasService {
  // Criar nova doação física
  static async criarDoacao(dadosDoacao: any, doadorId: string) {
    try {
      // Validar dados de entrada
      const validation = validateData(doacaoFisicaSchema, dadosDoacao);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .insert({
          ...validation.data,
          doador_id: doadorId,
          status: STATUS_DOACAO.DISPONIVEL
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: SUCCESS_MESSAGES.CREATED
      };
    } catch (error) {
      console.error('Erro ao criar doação:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR
      };
    }
  }

  // Listar doações com filtros e paginação
  static async listarDoacoes(filtros: {
    status?: string;
    categoria_id?: string;
    page?: number;
    limit?: number;
  } = {}) {
    try {
      const { status, categoria_id, page = 1, limit = 10 } = filtros;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categorias_doacoes (nome, cor, icone),
          voluntarios:doador_id (nome, email)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status) {
        query = query.eq('status', status);
      }

      if (categoria_id) {
        query = query.eq('categoria_id', categoria_id);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      console.error('Erro ao listar doações:', error);
      return {
        success: false,
        error: ERROR_MESSAGES.SERVER_ERROR,
        data: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 }
      };
    }
  }

  // Atualizar status da doação
  static async atualizarStatus(doacaoId: string, novoStatus: string, usuarioId: string) {
    try {
      // Validar status
      const validation = validateData(statusDoacaoSchema, { status: novoStatus });
      if (!validation.success) {
        throw new Error(validation.error);
      }

      const updateData: any = { 
        status: novoStatus,
        updated_at: new Date().toISOString()
      };

      // Adicionar campos específicos baseado no status
      if (novoStatus === STATUS_DOACAO.RESERVADA) {
        updateData.beneficiario_id = usuarioId;
        updateData.data_reserva = new Date().toISOString();
      } else if (novoStatus === STATUS_DOACAO.ENTREGUE) {
        updateData.data_entrega = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .update(updateData)
        .eq('id', doacaoId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: SUCCESS_MESSAGES.UPDATED
      };
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR
      };
    }
  }

  // Buscar doações do usuário
  static async buscarDoacoesUsuario(usuarioId: string, tipo: 'doadas' | 'reservadas' = 'doadas') {
    try {
      const campo = tipo === 'doadas' ? 'doador_id' : 'beneficiario_id';
      
      const { data, error } = await supabase
        .from('doacoes_fisicas_novas')
        .select(`
          *,
          categorias_doacoes (nome, cor, icone)
        `)
        .eq(campo, usuarioId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Erro ao buscar doações do usuário:', error);
      return {
        success: false,
        error: ERROR_MESSAGES.SERVER_ERROR,
        data: []
      };
    }
  }
}
