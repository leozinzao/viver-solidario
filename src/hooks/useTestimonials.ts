
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  nome: string;
  depoimento: string;
  aprovado: boolean;
  created_at: string;
}

type CreateTestimonialData = {
  nome: string;
  depoimento: string;
};

type UpdateTestimonialData = {
  id: string;
  nome?: string;
  depoimento?: string;
  aprovado?: boolean;
};

export const useTestimonials = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['testimonials', page, pageSize],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;

      return {
        testimonials: data as Testimonial[],
        pagination: {
          total: count || 0,
          page,
          pageSize,
          pages: count ? Math.ceil(count / pageSize) : 0
        }
      };
    },
    retry: 1
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateTestimonialData) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Depoimento enviado",
        description: "Seu depoimento foi enviado para análise!"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar depoimento",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateTestimonialData) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Depoimento atualizado",
        description: "O depoimento foi atualizado com sucesso!"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar depoimento",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Depoimento excluído",
        description: "O depoimento foi excluído com sucesso!"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir depoimento",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useToggleTestimonialPublish = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, publicado }: { id: string; publicado: boolean }) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .update({ aprovado: publicado })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: data.aprovado ? "Depoimento aprovado" : "Depoimento despublicado",
        description: `O depoimento foi ${data.aprovado ? 'aprovado' : 'despublicado'} com sucesso!`
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};
