
import { useState, useEffect } from 'react';
import { categoriaService } from '@/services/doacoesFisicas/categoriaService';
import { useToast } from '@/hooks/use-toast';
import type { Categoria } from '@/types/doacoesFisicas';

export const useCategoriasDoacoes = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const carregarCategorias = async () => {
    setLoading(true);
    try {
      const categoriasData = await categoriaService.listarCategorias();
      setCategorias(categoriasData);
    } catch (err: any) {
      console.error('Erro ao carregar categorias:', err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias",
        variant: "destructive"
      });
      
      // Fallback para categorias padrão em caso de erro
      setCategorias([
        { id: '123e4567-e89b-12d3-a456-426614174001', nome: 'Alimentos', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174002', nome: 'Roupas', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174003', nome: 'Móveis', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174004', nome: 'Eletrônicos', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174005', nome: 'Livros', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174006', nome: 'Brinquedos', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174007', nome: 'Materiais de Construção', descricao: '', cor: '', icone: '' },
        { id: '123e4567-e89b-12d3-a456-426614174008', nome: 'Outros', descricao: '', cor: '', icone: '' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return {
    categorias,
    loading,
    carregarCategorias
  };
};
