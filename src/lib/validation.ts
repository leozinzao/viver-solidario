
import { z } from 'zod';

// Schemas de validação para doações físicas
export const doacaoFisicaSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter pelo menos 3 caracteres').max(100, 'Título muito longo'),
  descricao: z.string().optional(),
  categoria_id: z.string().min(1, 'Categoria é obrigatória'),
  quantidade: z.number().min(1, 'Quantidade deve ser maior que 0'),
  unidade: z.string().min(1, 'Unidade é obrigatória'),
  endereco_coleta: z.string().optional(),
  observacoes: z.string().optional(),
});

// Schema para validação de endereços
export const enderecoSchema = z.object({
  logradouro: z.string().min(5, 'Logradouro deve ter pelo menos 5 caracteres'),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  estado: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP deve ter formato válido (ex: 12345-678)')
});

// Schema para atualização de status de doação
export const statusDoacaoSchema = z.object({
  status: z.enum(['disponivel', 'reservada', 'entregue', 'cancelada'], {
    errorMap: () => ({ message: 'Status inválido' })
  })
});

// Schema para perfil de usuário
export const perfilUsuarioSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  theme: z.enum(['light', 'dark']).optional()
});

// Schema para eventos
export const eventoSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter pelo menos 3 caracteres').max(200, 'Título muito longo'),
  resumo: z.string().optional(),
  data_inicio: z.string().datetime('Data de início inválida'),
  data_fim: z.string().datetime('Data de fim inválida').optional(),
  link: z.string().url('Link inválido').optional()
});

// Função utilitária para validar dados
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Dados inválidos' };
  }
};
