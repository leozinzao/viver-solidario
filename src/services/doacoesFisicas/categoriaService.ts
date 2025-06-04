
import { supabase } from '@/lib/supabase';
import type { Categoria } from '@/types/doacoesFisicas';

export const categoriaService = {
  // Listar todas as categorias de doações
  async listarCategorias(): Promise<Categoria[]> {
    console.log('Categoria: Carregando categorias de doações...');

    try {
      const { data, error } = await supabase
        .from('categorias_doacoes')
        .select('*')
        .order('nome');

      if (error) {
        console.error('Categoria: Erro ao carregar categorias:', error);
        throw new Error(`Erro ao carregar categorias: ${error.message}`);
      }

      console.log('Categoria: Categorias carregadas:', data);
      return data || [];
    } catch (err) {
      console.error('Categoria: Erro na execução:', err);
      throw err;
    }
  }
};
