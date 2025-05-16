
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export function useSupabase<T>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Função para buscar todos os registros
  const getAll = async (options?: { 
    limit?: number; 
    page?: number; 
    orderBy?: string; 
    orderDirection?: 'asc' | 'desc';
    filter?: Record<string, any>;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase.from(tableName).select('*');
      
      // Aplicar filtros
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query = query.eq(key, value);
          }
        });
      }
      
      // Aplicar ordenação
      if (options?.orderBy) {
        query = query.order(options.orderBy, { 
          ascending: options.orderDirection !== 'desc' 
        });
      }
      
      // Aplicar paginação
      if (options?.limit) {
        query = query.limit(options.limit);
        
        if (options.page && options.page > 1) {
          const offset = (options.page - 1) * options.limit;
          query = query.range(offset, offset + options.limit - 1);
        }
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data as T[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar dados';
      setError(errorMessage);
      console.error(`Erro ao buscar ${tableName}:`, err);
      toast({
        title: "Erro",
        description: `Não foi possível buscar os dados: ${errorMessage}`,
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar um registro específico por ID
  const getById = async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar dados';
      setError(errorMessage);
      console.error(`Erro ao buscar ${tableName} com id ${id}:`, err);
      toast({
        title: "Erro",
        description: `Não foi possível buscar o registro: ${errorMessage}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para criar um novo registro
  const create = async (values: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(tableName)
        .insert([values])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Registro criado com sucesso!"
      });
      
      return data?.[0] as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar registro';
      setError(errorMessage);
      console.error(`Erro ao criar ${tableName}:`, err);
      toast({
        title: "Erro",
        description: `Não foi possível criar o registro: ${errorMessage}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar um registro existente
  const update = async (id: string | number, values: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(tableName)
        .update(values)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Registro atualizado com sucesso!"
      });
      
      return data?.[0] as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar registro';
      setError(errorMessage);
      console.error(`Erro ao atualizar ${tableName} com id ${id}:`, err);
      toast({
        title: "Erro",
        description: `Não foi possível atualizar o registro: ${errorMessage}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um registro
  const remove = async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Registro excluído com sucesso!"
      });
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir registro';
      setError(errorMessage);
      console.error(`Erro ao excluir ${tableName} com id ${id}:`, err);
      toast({
        title: "Erro",
        description: `Não foi possível excluir o registro: ${errorMessage}`,
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para contar registros
  const count = async (filter?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase.from(tableName).select('*', { count: 'exact', head: true });
      
      // Aplicar filtros
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query = query.eq(key, value);
          }
        });
      }
      
      const { count, error } = await query;
      
      if (error) throw error;
      
      return count || 0;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao contar registros';
      setError(errorMessage);
      console.error(`Erro ao contar ${tableName}:`, err);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
    count
  };
}
