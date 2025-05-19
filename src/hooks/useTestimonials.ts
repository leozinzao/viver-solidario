
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

interface Testimonial {
  id: string;
  titulo: string;
  conteudo: string;
  autor_nome: string;
  autor_cargo?: string;
  publicado: boolean;
  criado_em: string;
  atualizado_em?: string;
}

interface TestimonialInput {
  titulo: string;
  conteudo: string;
  autor_nome: string;
  autor_cargo?: string;
  publicado?: boolean;
}

export function useTestimonials(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['testimonials', page, pageSize],
    queryFn: async () => {
      try {
        const result = await api(`/api/testimonials?page=${page}&pageSize=${pageSize}`);
        return result;
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os depoimentos.',
          variant: 'destructive',
        });
        throw error;
      }
    }
  });
}

export function useTestimonial(id: string | undefined) {
  return useQuery({
    queryKey: ['testimonial', id],
    queryFn: async () => {
      if (!id) return null;
      try {
        return await api(`/api/testimonials/${id}`);
      } catch (error) {
        console.error(`Error fetching testimonial ${id}:`, error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o depoimento.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    enabled: !!id
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (testimonial: TestimonialInput) => {
      try {
        const result = await api('/api/testimonials', {
          method: 'POST',
          body: JSON.stringify(testimonial)
        });
        
        toast({
          title: 'Depoimento enviado',
          description: 'Seu depoimento foi enviado com sucesso e será analisado pela equipe.',
        });
        
        return result;
      } catch (error) {
        console.error('Error creating testimonial:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível enviar o depoimento.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    }
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, testimonial }: { id: string, testimonial: Partial<TestimonialInput> }) => {
      try {
        const result = await api(`/api/testimonials/${id}`, {
          method: 'PUT',
          body: JSON.stringify(testimonial)
        });
        
        toast({
          title: 'Depoimento atualizado',
          description: 'O depoimento foi atualizado com sucesso.',
        });
        
        return result;
      } catch (error) {
        console.error(`Error updating testimonial ${id}:`, error);
        toast({
          title: 'Erro',
          description: 'Não foi possível atualizar o depoimento.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonial', variables.id] });
    }
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await api(`/api/testimonials/${id}`, {
          method: 'DELETE'
        });
        
        toast({
          title: 'Depoimento excluído',
          description: 'O depoimento foi excluído com sucesso.',
        });
      } catch (error) {
        console.error(`Error deleting testimonial ${id}:`, error);
        toast({
          title: 'Erro',
          description: 'Não foi possível excluir o depoimento.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    }
  });
}

export function useToggleTestimonialPublish() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, publicado }: { id: string, publicado: boolean }) => {
      try {
        const result = await api(`/api/testimonials/${id}/publish`, {
          method: 'PATCH',
          body: JSON.stringify({ publicado })
        });
        
        toast({
          title: publicado ? 'Depoimento publicado' : 'Depoimento despublicado',
          description: publicado ? 
            'O depoimento agora está visível para todos.' : 
            'O depoimento não está mais visível para os usuários.',
        });
        
        return result;
      } catch (error) {
        console.error(`Error toggling testimonial ${id} publish status:`, error);
        toast({
          title: 'Erro',
          description: 'Não foi possível alterar o status de publicação do depoimento.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonial', variables.id] });
    }
  });
}
