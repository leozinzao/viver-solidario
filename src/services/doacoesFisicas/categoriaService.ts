
import { supabase } from '@/lib/supabase';
import { ErrorHandler } from '@/lib/errorHandler';
import type { Categoria } from '@/types/doacoesFisicas';

export const categoriaService = {
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
  }
};
